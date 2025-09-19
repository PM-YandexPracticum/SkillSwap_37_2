// src\api\types.ts

import { SkillName } from "../shared/types/SkillName";

export type TUser = {
  id: number;
  name: string;
  gender: "male" | "female" | 'unspecified';
  photo: string; //Фото профиля
  from: string; //Город пользователя
  skill: SkillName; //Навык, которым пользователь готов делиться
  need_subcat: number[]; //Массив подкатегорий, которым пользователь хочет научиться
  images: string[]; //Список изображений, связанных с описанием навыком
  description: string; //Описание навыка
  categoryId: number; //ID категории навыка
  subCategoryId: number; //ID подкатегории навыка
  cat_text: string; //Текстовое название категории (из skills_categories.json)
  sub_text: string; //Текстовое название подкатегории (из skills_subcategories.json)
  birthdate: string; // др в формате YYYY-MM-DD
  // age: string;
  email: string;
  about?: string; //Описание пользователя (вводится при регистрации)
  created_at: string; //Дата создания аккаунта
};

export type TUserCard = Pick<
TUser,
'id' |
'name' |
'from' |
'birthdate' |
'photo' |
'skill' |
'need_subcat' 
// | 'age'
 >;


export type TPlace = {
  id: number;
  name: string;
}

export type TCategory = {
  id: number;
  name: string;
  color: string;
  icon: string;
};

export type TSubcategory = {
  id: number;
  categoryId: number;
  name: string;
  color: string;
};

// Для ответа API пользователей
export type TResponseUsers = {
  users: TUser[];
  hasMore: boolean;
}

// Для ответа API мест
export type TResponsePlaces = {
  places: TPlace[];
}

// Для ответа API категорий
export type TResponseCategories = {
  categories: TCategory[];
};

// Для ответа API подкатегорий
export type TResponseSubcategories = {
  subcategories: TSubcategory[];
}

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
