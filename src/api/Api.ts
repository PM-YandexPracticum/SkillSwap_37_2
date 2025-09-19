// src\api\Api.ts
import { 
  OFFERS_JSON_FILE,
  PLACES_JSON_FILE,
  USERS_JSON_FILE 
} from "@const/paths";
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


type TOfferRaw = {
  offerUserId: number;
  skillOwnerId: number;
  confirm: number;
  daysSinceOffer: number;
  daysSinceConfirm: number;
  sawOffer: number;
};

export type TOfferResult = {
  offerUserId: number;
  offerUserName: string;
  skillOwnerId: number;
  skillOwnerName: string;
  confirm: number;
  sawOffer: number;
  offerDate: string;           // всегда есть
  confirmDate: string | null;  // только если confirm === 1
};

const formatPastDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

export const getOffersForUser = async (
  userId: number
): Promise<TOfferResult[]> => {
  try {
    const offersRes = await fetch(OFFERS_JSON_FILE);
    const usersRes = await fetch(USERS_JSON_FILE);

    const offersData = await offersRes.json();
    const usersData = await usersRes.json();

    const usersMap = new Map<number, string>();
    usersData.users.forEach((u: TUser) => {
      usersMap.set(u.id, u.name);
    });

    const filtered = offersData.offers.filter((offer: TOfferRaw) =>
      offer.offerUserId === userId || offer.skillOwnerId === userId
    );

    const enriched: TOfferResult[] = filtered.map((offer: { offerUserId: number; skillOwnerId: number; daysSinceOffer: number; confirm: number; sawOffer: any; daysSinceConfirm: number; }) => {
      
      const offerUserName = offer.offerUserId === userId
        ? `${usersMap.get(offer.offerUserId) || `#${offer.offerUserId}`} (you)`
        : usersMap.get(offer.offerUserId) || `#${offer.offerUserId}`;

      const skillOwnerName = offer.skillOwnerId === userId
        ? `${usersMap.get(offer.skillOwnerId) || `#${offer.skillOwnerId}`} (you)`
        : usersMap.get(offer.skillOwnerId) || `#${offer.skillOwnerId}`;      
      
      
      
      // const offerUserName = offer.offerUserId === userId
      //   ? 'you'
      //   : usersMap.get(offer.offerUserId) || `#${offer.offerUserId}`;

      // const skillOwnerName = offer.skillOwnerId === userId
      //   ? 'you'
      //   : usersMap.get(offer.skillOwnerId) || `#${offer.skillOwnerId}`;

      const offerDate = formatPastDate(offer.daysSinceOffer);

      return {
        offerUserId: offer.offerUserId,
        offerUserName,
        skillOwnerId: offer.skillOwnerId,
        skillOwnerName,
        confirm: offer.confirm,
        sawOffer: offer.sawOffer,
        offerDate,
        confirmDate:
          offer.confirm === 1 && offer.daysSinceConfirm >= 0
            ? formatPastDate(offer.daysSinceConfirm)
            : null
      };
    });

    // Сортировка: сначала новые по offerDate (по убыванию)
    enriched.sort((a, b) => new Date(b.offerDate).getTime() - new Date(a.offerDate).getTime());

    return enriched;
  } catch (error) {
    console.error(error);
    throw error;
  }
};