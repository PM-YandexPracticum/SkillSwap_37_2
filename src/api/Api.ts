// src\api\Api.ts
import {
  TUser,
  TResponseUsers,
  TResponsePlaces,
  TResponseCategories,
  TResponseSubcategories,
} from "./types";
import { calculateAge } from "../shared/lib/helpers";
import { PAGE_SIZE } from "../shared/constants/pagination";

// <<<<<<< feature/infiniteScroll
export const getUsersPaginatedApi = async (
  page: number
): Promise<TResponseUsers> => {
  try {
    const response = await fetch("/db/users.json");
    const data = await response.json();

    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const paginatedUsers = data.users.slice(startIndex, endIndex);

    const usersWithAge = paginatedUsers.map((user: TUser) => ({
      ...user,
      age: calculateAge(user.birthdate),
    }));

    return {
      users: usersWithAge,
      hasMore: endIndex < data.users.length,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getUsersApi = async (): Promise<TResponseUsers> => {
//=======
// const USERS_PAGE_SIZE = Number(import.meta.env.VITE_USERS_PAGE_SIZE);

// export const getUsersApi = async (
//   page = 1,
//   limit = USERS_PAGE_SIZE
// ): Promise<TResponseUsers> => {
// >>>>>>> develop
  try {
    const response = await fetch('/db/users.json');
    const data = await response.json();

    const usersWithAge = data.users.map((user: TUser) => ({
      ...user,
      age: calculateAge(user.birthdate),
    }));
// <<<<<<< feature/infiniteScroll
    return { users: usersWithAge, hasMore: false };
// =======

//     const start = (page - 1) * limit;
//     const end = start + limit;
//     const paginated = usersWithAge.slice(start, end);

//     return { users: paginated };
// >>>>>>> develop
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserByID = async (userId: number): Promise<TUser | null> => {
  try {
    const response = await fetch("/db/users.json");
    const data = await response.json();
    const user = data.users.find((user: TUser) => user.id === userId);
    const usersWithAge = {
      ...user,
      age: calculateAge(user.birthdate),
    };
    return usersWithAge || null; // если пользователь не найден
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPlacesApi = async (): Promise<TResponsePlaces> => {
  try {
    const response = await fetch("/db/places.json");
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
      const response = await fetch("/db/skills_categories.json");
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
      const response = await fetch("/db/skills_subcategories.json");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

// skill больше нет. в соответствии с макетом они лишь часть пользователя.
// нет скилов без пользователя и у каждого пользователя по одному скилу
// export const getSkillsApi = async (): Promise<TResponsePlaces> => {
//   try {
//     const response = await fetch('/db/skills.json')
//     const data = await response?.json()
//     return data
//   } catch(error) {
//     console.error(error)
//     throw error
//   }
// }
