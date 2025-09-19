// src\api\Api.ts
import {
  TUser,
  TResponseUsers,
  TResponsePlaces,
  TResponseCategories,
  TResponseSubcategories,
} from "./types";
import { calculateAge } from "../shared/lib/helpers";

const USERS_PAGE_SIZE = Number(import.meta.env.VITE_USERS_PAGE_SIZE);

export const getUsersApi = async (
  page = 1,
): Promise<TResponseUsers> => {
  try {
    const response = await fetch('/db/users.json');
    const data = await response.json();

    const usersWithAge = data.users.map((user: TUser) => ({
      ...user,
      age: calculateAge(user.birthdate),
    }));

    const startIndex = (page - 1) * USERS_PAGE_SIZE;
    const endIndex = startIndex + USERS_PAGE_SIZE;
    const paginated = usersWithAge.slice(startIndex, endIndex);

    return { 
      users: paginated,
      hasMore: endIndex < data.users.length
    };
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
