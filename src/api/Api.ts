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
} from "@api/types";

const USERS_PAGE_SIZE = Number(import.meta.env.VITE_USERS_PAGE_SIZE);


// filtered
export const getFilteredUsersApi = async (
  { page, gender, places }: TGetFilteredUsersArgs
): Promise<TResponseUsers> => {
  try {
    const response = await fetch(USERS_JSON_FILE);
    const data = await response.json();

    // Фильтрация
    // фильтрация по полу
    let filtered = data.users;
    if (gender && gender !== GENDERS.UNSPECIFIED) {
      filtered = filtered.filter((u: any) => u.gender === gender);
    }

    // фильтрация по месту жительства
    if (places.length > 0) {
      filtered = filtered.filter((u: any) => places.includes(u.from));
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
    console.error('Ошибка в getFilteredUsersApi:', error);
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
    const sorted = data.users.sort((a: any, b: any) =>
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
    console.error('Ошибка в getUsersByCreatedAtApi:', error);
    throw error;
  }
};

export const getUsersByRandomApi = async (
  page: number
): Promise<{ users: TUser[]; hasMore: boolean }> => {
  try {
    const response = await fetch('/db/users.json');
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
    console.error('Ошибка в getUsersByCreatedAtApi:', error);
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

export const getNotificationsApi = async (
  userId: number
): Promise<TResponseNotifications> => {
  try {
    const [offersRes, usersRes] = await Promise.all([
      fetch(OFFERS_JSON_FILE),
      fetch(USERS_JSON_FILE),
    ]);

    const offersData = await offersRes.json();
    const usersData = await usersRes.json();

    const userMap = new Map<number, string>(
      usersData.users.map((u: TUser) => [u.id, u.name])
    );

    const today = new Date();

    const events = offersData.offers.flatMap((offer: any) => {
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
    return data.filter((like: any) => like.liker_id === userId);
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