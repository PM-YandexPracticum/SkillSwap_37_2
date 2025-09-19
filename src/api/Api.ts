// src\api\Api.ts
import { PLACES_JSON_FILE, USERS_JSON_FILE } from "@const/paths";
import {
  TUser,
  TResponseUsers,
  TResponsePlaces,
  TResponseCategories,
  TResponseSubcategories,
} from "./types";

const USERS_PAGE_SIZE = Number(import.meta.env.VITE_USERS_PAGE_SIZE);

export const getUsersApi = async (
  page = 1,
): Promise<TResponseUsers> => {
  try {
    const response = await fetch(USERS_JSON_FILE);
    const data = await response.json();

    const startIndex = (page - 1) * USERS_PAGE_SIZE;
    const endIndex = startIndex + USERS_PAGE_SIZE;
    const paginated = data.users.slice(startIndex, endIndex);

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

    const filtered = data.users.filter((user: TUser) =>
      user.subCategoryId === subCategoryId
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
