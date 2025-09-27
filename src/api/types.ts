// src\api\types.ts

import { TSkillName } from "../shared/types/SkillName";
import { IconName } from "shared/ui/icon/icons";

export type TUser = {
  id: number;
  name: string;
  gender: "male" | "female" | 'unspecified';
  photo: string; //Фото профиля
  from: string; //Город пользователя
  skill: TSkillName; //Текстовое название подкатегории (из skills_subcategories.json)
  need_subcat: number[]; //Массив подкатегорий, которым пользователь хочет научиться
  cat_text: string; //Текстовое название категории (из skills_categories.json)
  sub_text: TSkillName; //Текстовое название подкатегории (из skills_subcategories.json)
  categoryId: number; //ID категории навыка
  subCategoryId: number; //ID подкатегории навыка
  description: string; //Описание навыка
  images: string[]; //Список изображений, связанных с описанием навыком
  birthdate: string; // др в формате YYYY-MM-DD
  email: string;
  created_at: string; //Дата создания аккаунта
  about: string; //Описание пользователя (вводится при регистрации)
  likedByMe: boolean;
};

export type TPlace = {
  id: number;
  name: string;
}

export type TCategory = {
  id: number;
  name: string;
  color: string;
  icon: IconName; // имя иконки
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

export type TNotificationEvent = {
  type: 'offer' | 'accept';
  seen: 0 | 1;
  fromUserId: number;
  fromUserName: string;
  date: string; // ISO-строка с датой
};

export type TResponseNotifications = {
  userId: number;
  events: TNotificationEvent[];
};  

