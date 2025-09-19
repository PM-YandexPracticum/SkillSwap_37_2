// src\widgets\gridList\GridList.tsx
import { UserCard } from '../../features/users/userCard/UserCard';
import styles from './GridList.module.css';
import { TPlace, TUserCard } from '../../api/types';
import { formatAge } from '../../shared/lib/helpers';

type GridListProps = {
  users: TUserCard[];
  subCategories: TPlace[];
}

export const GridList = ( { users, subCategories }: GridListProps ) => {

  return (
    <ul className={styles.grid}>
      {users && subCategories && users.map((user) => (
        <li key={user.id} className={styles.gridItem}>
          <UserCard
            name={user.name}
            from={user.from}
            age={formatAge(user.age)}
            avatar={`/db/users-photo/${user.photo}`}
            teachSkills={user.skill}
            learnSkills={user.need_subcat}
            subCategories={subCategories}
          />
        </li>
      ))}
    </ul>
  );
};
