// src\api\Api.ts

import {
  CATEGORIES_JSON_FILE,
  LIKES_JSON_FILE,
  OFFERS_JSON_FILE,
  PLACES_JSON_FILE,
  SUBCATEGORIES_JSON_FILE,
  USERS_JSON_FILE,
} from "@const/paths";
import {
  TUser,
  TResponseUsers,
  TResponsePlaces,
  TResponseCategories,
  TResponseSubcategories,
  TResponseNotifications,
  TNotificationEvent,
  NotificationTypes,
  GENDERS,
  TGetFilteredUsersArgs,
  TResponseOffers,
  TOffer,
  TLikeType,
} from "@api/types";
import { SKILL_TYPES, TSkillType } from "../shared/types/filters";

const USERS_PAGE_SIZE = Number(import.meta.env.VITE_USERS_PAGE_SIZE);

// filtered
export const getFilteredUsersApi = async ({
  page,
  gender,
  places = [],
  skillType,
  subcategories = [],
  text_for_search,
}: TGetFilteredUsersArgs): Promise<TResponseUsers> => {
  try {
    const response = await fetch(USERS_JSON_FILE);
    const data = await response.json();

    // Фильтрация
    // фильтрация по полу
    let filtered = data.users;
    if (gender && gender !== GENDERS.UNSPECIFIED) {
      filtered = filtered.filter((u: TUser) => u.gender === gender);
    }

    // фильтрация по месту жительства
    if (places.length > 0) {
      filtered = filtered.filter((u: TUser) => places.includes(u.from));
    }
    const st = skillType as TSkillType;
    // SKILL_TYPES.CAN_TEACH as TSkillType

    // фильтрация по типу навыка
    if (st && subcategories && subcategories.length > 0) {
      switch (st) {
        // его навык есть среди переданных подкатегорий
        case SKILL_TYPES.CAN_TEACH:
          filtered = filtered.filter((u: TUser) =>
            subcategories.includes(u.subCategoryId)
          );
          break;

        case SKILL_TYPES.WANT_TO_LEARN:
          // хотя бы один навык из его списка need_subcat есть среди переданных подкатегорий
          filtered = filtered.filter((u: TUser) =>
            u.need_subcat.some((id) => subcategories.includes(id))
          );
          break;

        case SKILL_TYPES.ALL:
          // вариант 1 ИЛИ вариант 2
          filtered = filtered.filter(
            (u: TUser) =>
              subcategories.includes(u.subCategoryId) ||
              u.need_subcat.some((id) => subcategories.includes(id))
          );
          break;
      }
    }

    if (text_for_search && text_for_search.trim() !== '') {
      const q = text_for_search.trim().toLowerCase();
      filtered = filtered.filter((u: TUser) =>
        u.skill.toLowerCase().includes(q)
      );
    }

    // пагинация
    const start = (page - 1) * USERS_PAGE_SIZE;
    const end = start + USERS_PAGE_SIZE;
    const usersPage = filtered.slice(start, end);

    return {
      users: usersPage,
      hasMore: end < filtered.length,
    };
  } catch (error) {
    console.error("Ошибка в getFilteredUsersApi:", error);
    throw error;
  }
};

export const getUsersApi = async (page = 1): Promise<TResponseUsers> => {
  try {
    const response = await fetch(USERS_JSON_FILE);
    const data = await response.json();

    const startIndex = (page - 1) * USERS_PAGE_SIZE;
    const endIndex = startIndex + USERS_PAGE_SIZE;
    const paginated = data.users.slice(startIndex, endIndex);

    return {
      users: paginated,
      hasMore: endIndex < data.users.length,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPopularUsersApi = async (page = 1): Promise<TResponseUsers> => {
  try {
    const response = await fetch(USERS_JSON_FILE);
    const data = await response.json();

    // сортируем по likes_received (убывание)
    const sortedUsers: TUser[] = [...data.users].sort(
      (a, b) => b.likes_received - a.likes_received
    );

    // пагинация
    const startIndex = (page - 1) * USERS_PAGE_SIZE;
    const endIndex = startIndex + USERS_PAGE_SIZE;
    const pagedUsers = sortedUsers.slice(startIndex, endIndex);

    return {
      users: pagedUsers,
      hasMore: endIndex < sortedUsers.length,
    };
  } catch (error) {
    console.error("Ошибка загрузки популярных пользователей:", error);
    throw error;
  }
};

// добавляем функцию для created_at
export const getCreatedAtUsersApi = async (
  page: number
): Promise<TResponseUsers> => {
  try {
    const response = await fetch(USERS_JSON_FILE);
    const data = await response.json();

    // сортировка по created_at (новые выше) сравниваются строки!
    const sorted = data.users.sort((a: TUser, b: TUser) =>
      b.created_at.localeCompare(a.created_at)
    );

    // пагинация
    const start = (page - 1) * USERS_PAGE_SIZE;
    const end = start + USERS_PAGE_SIZE;
    const usersPage = sorted.slice(start, end);

    return {
      users: usersPage,
      hasMore: end < sorted.length,
    };
  } catch (error) {
    console.error("Ошибка в getUsersByCreatedAtApi:", error);
    throw error;
  }
};

export const getUsersByRandomApi = async (
  page: number
): Promise<{ users: TUser[]; hasMore: boolean }> => {
  try {
    const response = await fetch("/db/users.json");
    const data = await response.json();

    const sorted = data.users.sort((a: TUser, b: TUser) => b.random - a.random);

    const start = (page - 1) * USERS_PAGE_SIZE;
    const end = start + USERS_PAGE_SIZE;
    const paginated = sorted.slice(start, end);

    return {
      users: paginated,
      hasMore: end < sorted.length,
    };
  } catch (error) {
    console.error("Ошибка в getUsersByCreatedAtApi:", error);
    throw error;
  }
};

export const getUserByIdAPI = async (userId: number): Promise<TUser | null> => {
  try {
    const response = await fetch(USERS_JSON_FILE);
    const data = await response.json();
    return data.users.find((user: TUser) => user.id === userId);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUsersBySubCategory = async (
  subCategoryId: number
): Promise<TUser[]> => {
  try {
    const response = await fetch(USERS_JSON_FILE);
    const data = await response.json();

    const filtered = data.users.filter(
      (user: TUser) => user.subCategoryId === subCategoryId
    );

    return filtered;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPlacesApi = async (): Promise<TResponsePlaces> => {
  try {
    const response = await fetch(PLACES_JSON_FILE);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSkillsCategoriesApi =
  async (): Promise<TResponseCategories> => {
    try {
      const response = await fetch(CATEGORIES_JSON_FILE);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

export const getSkillsSubCategoriesApi =
  async (): Promise<TResponseSubcategories> => {
    try {
      const response = await fetch(SUBCATEGORIES_JSON_FILE);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

export const getOffersApi = async (): Promise<TResponseOffers> => {
  try {
    const response = await fetch(OFFERS_JSON_FILE);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getNotificationsApi = async (
  userId: number,
  offers: TOffer[]
): Promise<TResponseNotifications> => {
  try {
    const usersRes = await fetch(USERS_JSON_FILE);
    const usersData = await usersRes.json();

    const userMap = new Map<number, string>(
      usersData.users.map((u: TUser) => [u.id, u.name])
    );

    const today = new Date();

    const events = offers.flatMap((offer: TOffer) => {
      const userEvents: TNotificationEvent[] = [];

      if (offer.skillOwnerId === userId) {
        userEvents.push({
          type: NotificationTypes.OFFER_TO_ME,
          seen: offer.sawOffer as 0 | 1,
          anotherUserId: offer.offerUserId,
          anotherUserName: userMap.get(offer.offerUserId) || "Неизвестно",
          date: new Date(
            today.getTime() - offer.daysSinceOffer * 24 * 60 * 60 * 1000
          )
            .toISOString()
            .split("T")[0],
        });
      }

      if (offer.offerUserId === userId && offer.accept === 1) {
        userEvents.push({
          type: NotificationTypes.ACCEPT_MY_OFFER,
          seen: offer.sawAccept as 0 | 1,
          anotherUserId: offer.skillOwnerId,
          anotherUserName: userMap.get(offer.skillOwnerId) || "Неизвестно",
          date: new Date(
            today.getTime() - offer.daysSinceAccept * 24 * 60 * 60 * 1000
          )
            .toISOString()
            .split("T")[0],
        });
      }

      if (offer.offerUserId === userId && offer.accept === 0) {
        userEvents.push({
          type: NotificationTypes.MY_NEW_OFFER,
          seen: 0,
          anotherUserId: offer.skillOwnerId,
          anotherUserName: userMap.get(offer.skillOwnerId) || "Неизвестно",
          date: new Date(
            today.getTime() - offer.daysSinceOffer * 24 * 60 * 60 * 1000
          )
            .toISOString()
            .split("T")[0],
        });
      }

      return userEvents;
    });

    return { userId, events };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// получить список лайков текущего пользователя
export const getUserLikesApi = async (userId: number) => {
  try {
    const response = await fetch(LIKES_JSON_FILE);
    const data = await response.json();

    // отфильтруем только те лайки, где текущий юзер = liker_id
    return data.filter((like: TLikeType) => like.liker_id === userId);
  } catch (error) {
    console.error("Ошибка загрузки лайков:", error);
    throw error;
  }
};

export const logoutApi = async (): Promise<{ success: boolean }> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return { success: true };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
