import { SkillCard } from '../../features/skills/skillCard/SkillCard';
import styles from './GridList.module.css';
import { TUsersMock} from './usersMock'; 
import { TPlace, TUserCard } from '../../api/types';

type GridListProps = {
  users: TUserCard[];
  subCategories: TPlace[];
}

export const GridList = ( { users, subCategories }: GridListProps ) => {

  return (
    <ul className={styles.grid}>
      {users && subCategories && users.map((user) => (
        <li key={user.id} className={styles.gridItem}>
          <SkillCard
            name={user.name}
            from={user.from}
            age={user.birthdate}
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
