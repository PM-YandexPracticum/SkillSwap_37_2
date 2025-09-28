// src\api\Api.ts

// import {
//   CATEGORIES_JSON_FILE,
//   LIKES_JSON_FILE,
//   OFFERS_JSON_FILE,
//   PLACES_JSON_FILE,
//   SUBCATEGORIES_JSON_FILE,
//   USERS_JSON_FILE
// } from "@const/paths";

import {
  TUser,
  TResponseUsers,
  TResponsePlaces,
  TResponseCategories,
  TResponseSubcategories,
  TResponseNotifications,
  TNotificationEvent,
} from "@api/types";

const BASE_URL = import.meta.env.VITE_MOCK_SERVER_API_URL;
const USERS_PAGE_SIZE = Number(import.meta.env.VITE_USERS_PAGE_SIZE);

type Meta = {
  page?: number;
  total_pages?: number;
  total_items?: number;
  limit?: number;
};
type ResponseWithMeta<T> = { items: T; meta?: Meta } | T;

// Универсальный fetch с безопасным разбором {items, meta} или "просто массив"
async function getFromMokky<T>(
  path: string
): Promise<{ data: T; meta?: Meta }> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const json: ResponseWithMeta<T> = await res.json();
  if (json && typeof json === "object" && "items" in (json as any)) {
    const { items, meta } = json as any;
    return { data: items as T, meta };
  }
  return { data: json as T };
}

// Хелпер "hasMore" — используем meta.total_pages, если Mokky его вернул,
// иначе оцениваем по длине текущей страницы (len === limit => потенциально есть еще)
function computeHasMore(
  currentLen: number,
  page: number,
  limit: number,
  meta?: Meta
) {
  if (meta?.total_pages != null && meta?.page != null) {
    return (meta.page as number) < (meta.total_pages as number);
  }
  return currentLen === limit; // эвристика
}

export const getUsersApi = async (page = 1): Promise<TResponseUsers> => {
  const limit = USERS_PAGE_SIZE;
  const { data, meta } = await getFromMokky<TUser[]>(
    `/users?page=${page}&limit=${limit}`
  );
  return {
    users: data,
    hasMore: computeHasMore(data.length, page, limit, meta),
  };
};

export const getPopularUsersApi = async (page = 1): Promise<TResponseUsers> => {
  const limit = USERS_PAGE_SIZE;
  const { data, meta } = await getFromMokky<TUser[]>(
    `/users?sortBy=-likes_received&page=${page}&limit=${limit}`
  ); // sortBy с минусом — убывание
  return {
    users: data,
    hasMore: computeHasMore(data.length, page, limit, meta),
  };
};

export const getUserByID = async (userId: number): Promise<TUser | null> => {
  const { data } = await getFromMokky<TUser>(`/users/${userId}`);
  return data ?? null;
};

export const getUsersBySubCategory = async (
  subCategoryId: number
): Promise<TUser[]> => {
  const { data } = await getFromMokky<TUser[]>(
    `/users?subCategoryId=${subCategoryId}`
  );
  return data;
};

export const getPlacesApi = async (): Promise<TResponsePlaces> => {
  const { data } = await getFromMokky<{ id: number; name: string }[]>(
    `/places`
  );
  return { places: data };
};

export const getSkillsCategoriesApi =
  async (): Promise<TResponseCategories> => {
    const { data } = await getFromMokky<
      { id: number; name: string; color: string; icon: string }[]
    >(`/skills_categories`);
    return { categories: data as any };
  };

export const getSkillsSubCategoriesApi =
  async (): Promise<TResponseSubcategories> => {
    const { data } = await getFromMokky<
      { id: number; categoryId: number; name: string; color: string }[]
    >(`/skills_subcategories`);
    return { subcategories: data as any };
  };

export const getNotificationsApi = async (
  userId: number
): Promise<TResponseNotifications> => {
  const [{ data: offers }, { data: users }] = await Promise.all([
    getFromMokky<
      Array<{
        offerUserId: number;
        skillOwnerId: number;
        accept: 0 | 1;
        daysSinceOffer?: number;
        daysSinceAccept?: number;
        sawOffer?: 0 | 1;
        sawAccept?: 0 | 1;
      }>
    >(`/offers`),
    getFromMokky<TUser[]>(`/users`),
  ]);

  const userMap = new Map<number, string>(users.map((u) => [u.id, u.name]));
  const today = new Date();

  const events = offers.flatMap((o) => {
    const arr: TNotificationEvent[] = [];
    if (o.skillOwnerId === userId) {
      arr.push({
        type: "offer",
        seen: (o.sawOffer as 0 | 1) ?? 0,
        fromUserId: o.offerUserId,
        fromUserName: userMap.get(o.offerUserId) || "Неизвестно",
        date: new Date(today.getTime() - (o.daysSinceOffer ?? 0) * 86400000)
          .toISOString()
          .split("T")[0],
      });
    }
    if (o.offerUserId === userId && o.accept === 1) {
      arr.push({
        type: "accept",
        seen: (o.sawAccept as 0 | 1) ?? 0,
        fromUserId: o.skillOwnerId,
        fromUserName: userMap.get(o.skillOwnerId) || "Неизвестно",
        date: new Date(today.getTime() - (o.daysSinceAccept ?? 0) * 86400000)
          .toISOString()
          .split("T")[0],
      });
    }
    return arr;
  });

  return { userId, events };
};

// получить список лайков текущего пользователя
export const getUserLikesApi = async (userId: number) => {
  const { data } = await getFromMokky<
    Array<{ id: number; liker_id: number; liked_id: number; timestamp: string }>
  >(`/likes?liker_id=${userId}`);
  return data;
};
