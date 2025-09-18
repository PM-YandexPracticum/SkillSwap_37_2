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
  age: string;
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
'need_subcat' |
'age'
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

// {
//   "id": 1,
//   "name": "Ольга",
//   "gender": "female",
// одно фото
//   "photo": "00001.jpg",
//   "from": "Омск",
// один навык, которым пользователь хочет делиться
//   "skill": "Игра на барабанах",
//   "description": "Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без партитуры",
// список фото рядом с описанием навыков
//   "images": [
//     "drums-1.jpg",
//     "drums-2.jpg",
//     "drums-3.jpg"
//   ],
//   "categoryId": 4,
//   "subCategoryId": 25,
// текст из файла public\db\skills_categories.json (возможно, его стоит убрать)
//   "cat_text": "Творчество и искусство",
// текст из файла public\db\skills_subcategories.json (возможно, его стоит убрать)
//   "sub_text": "Музыка и звук",

//   "birthdate": "1999-05-14",
//   "email": "olga1@yandex.ru",
// описание себя, вводится при регистрации
//   "about": "Когда беру в руки барабаны, забываю обо всём и растворяюсь в ритме. Музыка — мой язык общения с миром. В обычной жизни могу часами чинить старый виниловый проигрыватель, обожаю громкий рок и долгие ночные велопоездки.",
// подкатегории, которые пользователю хочется получить
//   "need_subcat": [
//     37,
//     9,
//     40
//   ],
// дата создания аккаунта (возможно, нужна для выбора свеженьких пользователей)
//   "created_at": "2025-05-02T14:16:12"
// },
