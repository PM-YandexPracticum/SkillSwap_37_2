import { TPlace, TUser } from "./types";

type TResponseUsers = {
  users: TUser[]
}

type TResponsePlaces = {
  places: TPlace[]
}

export const getUsersApi = async (): Promise<TResponseUsers> => {
  try {
    const response = await fetch('/db/users.json')
    const data = await response?.json()
    return data
  } catch(error) {
    console.error(error)
    throw error
  }
}

export const getUserByID = async (userId: string) => {
  try {
    const response = await fetch('/db/users.json')
    const data = await response?.json()
    const user = data.users.find((user: TUser) => user.id === userId);
    return user
  } catch(error) {
    console.error(error)
    throw error
  }
}

export const getPlacesApi = async (): Promise<TResponsePlaces> => {
  try {
    const response = await fetch('/db/places.json')
    const data = await response?.json()
    return data 
  } catch(error) {
    console.error(error)
    throw error
  }
}


export const getSkilsApi = async (): Promise<TResponsePlaces> => {
  try {
    const response = await fetch('/db/skils.json')
    const data = await response?.json()
    return data 
  } catch(error) {
    console.error(error)
    throw error
  }
}

export const getSkilsCategoriesApi = async (): Promise<TResponsePlaces> => {
  try {
    const response = await fetch('/db/skils_categories.json')
    const data = await response?.json()
    return data 
  } catch(error) {
    console.error(error)
    throw error
  }
}

export const getSkilsSubCategoriesApi = async (): Promise<TResponsePlaces> => {
  try {
    const response = await fetch('/db/skils_subcategories.json')
    const data = await response?.json()
    return data 
  } catch(error) {
    console.error(error)
    throw error
  }
}



  