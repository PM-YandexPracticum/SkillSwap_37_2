import { useEffect, useState } from 'react';
import { SkillCard } from '../../features/skills/skillCard/SkillCard';
import styles from './GridList.module.css';
import { SkillName } from '../../shared/types/SkillName';
import { TUserMock} from './usersMock'; 

type GridListProps = {
  users: TUserMock[];
}

export const GridList = ( items: GridListProps ) => {

  return (
    <ul className={styles.grid}>
      {items.users.map((user) => (
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
