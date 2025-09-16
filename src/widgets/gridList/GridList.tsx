import { useEffect, useState } from 'react';
import { SkillCard } from '../../features/skills/skillCard/SkillCard';
import styles from './GridList.module.css';
import { SkillName } from '../../shared/types/SkillName';

type TUserMock = {
  id: string;
  name: string;
  age: number;
  gender: string;
  photo: string;
  from: string;
  learnSkills: SkillName[];
  teachSkills: SkillName[];
};

// const users: TUserMock[] = [
//     {
//       "id": "1",
//       "name": "Ольга",
//       "age": 26,
//       "gender": "female",
//       "photo": "00001.jpg",
//       "from": "Омск",
//       "learnSkill": "Китайский",
//       "teachSkill": "Английский"
//     },
//     {
//       "id": "2",
//       "name": "Алиса",
//       "age": 27,
//       "gender": "female",
//       "photo": "00002.jpg",
//       "from": "Ижевск",
//       "learnSkill": "Маркетинг и реклама",
//       "teachSkill": "Личный бренд"
//     },
//     {
//       "id": "3",
//       "name": "Марина",
//       "age": 27,
//       "gender": "female",
//       "photo": "00003.jpg",
//       "from": "Красноярск",
//       "learnSkill": "Игра на барабанах",
//       "teachSkill": "Домашние растения"
//     },
//     {
//       "id": "4",
//       "name": "Ирина",
//       "age": 23,
//       "gender": "female",
//       "photo": "00004.jpg",
//       "from": "Краснодар",
//       "learnSkill": "Продажи и переговоры",
//       "teachSkill": "Маркетинг и реклама"
//     },
//     {
//       "id": "5",
//       "name": "Наталья",
//       "age": 23,
//       "gender": "female",
//       "photo": "00005.jpg",
//       "from": "Челябинск",
//       "learnSkill": "Управление командой",
//       "teachSkill": "Ремонт"
//     }
//   ];

const users: TUserMock[] = [
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
    learnSkills: ["Продажи и переговоры", "Английский"],
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



export const GridList = () => {
  // const [users, setUsers] = useState<User[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const loadUsers = async () => {
  //     try {
  //       const response = await fetch('/users.json'); // файл лежит в public/
  //       const data = await response.json();
  //       setUsers(data.users);
  //     } catch (err) {
  //       console.error('Ошибка загрузки пользователей:', err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadUsers();
  // }, []);

  // if (loading) {
  //   return <p>Загрузка...</p>;
  // }

  return (
    <ul className={styles.grid}>
      {users.map((user) => (
        <li key={user.id} className={styles.gridItem}>
          <SkillCard
            name={user.name}
            from={user.from}
            age={user.age}
            avatar={`/db/users-photo/${user.photo}`}
            learnSkills={user.learnSkills}
            teachSkills={user.teachSkills}
          />
        </li>
      ))}
    </ul>
  );
};
