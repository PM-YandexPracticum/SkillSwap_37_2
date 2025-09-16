import { SkillName } from "../../shared/types/SkillName";

export type TUsersMock = {
  id: string;
  name: string;
  age: number;
  gender: string;
  photo: string;
  from: string;
  learnSkills: SkillName[];
  teachSkills: SkillName[];
};

export const usersMock: TUsersMock[] = [
  {
    id: "1",
    name: "Ольга",
    age: 26,
    gender: "female",
    photo: "00001.jpg",
    from: "Омск",
    learnSkills: ["Китайский", "Английский"],
    teachSkills: ["Английский"]
  },
  {
    id: "2",
    name: "Алиса",
    age: 27,
    gender: "female",
    photo: "00002.jpg",
    from: "Ижевск",
    learnSkills: ["Маркетинг и реклама", "Английский"],
    teachSkills: ["Личный бренд"]
  },
  {
    id: "3",
    name: "Марина",
    age: 27,
    gender: "female",
    photo: "00003.jpg",
    from: "Красноярск",
    learnSkills: ["Игра на барабанах", "Английский"],
    teachSkills: ["Домашние растения"]
  },
  {
    id: "4",
    name: "Ирина",
    age: 23,
    gender: "female",
    photo: "00004.jpg",
    from: "Краснодар",
    learnSkills: ["Продажи и переговоры", "Китайский"],
    teachSkills: ["Маркетинг и реклама"]
  },
  {
    id: "5",
    name: "Наталья",
    age: 23,
    gender: "female",
    photo: "00005.jpg",
    from: "Челябинск",
    learnSkills: ["Управление командой", "Английский"],
    teachSkills: ["Ремонт"]
  }
];