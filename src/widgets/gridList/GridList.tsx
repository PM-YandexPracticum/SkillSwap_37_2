// src\widgets\gridList\GridList.tsx
import { UserCard } from '../../features/users/userCard/UserCard';
import styles from './GridList.module.css';
import { TPlace, TUserCard } from '../../api/types';
import { formatAge } from '../../shared/lib/helpers';
import { useInfiniteScroll } from '../../shared/hooks/useInfiniteScroll';
import { Loader } from '../../shared/ui/loader/Loader';

type GridListProps = {
  users: TUserCard[];
  subCategories: TPlace[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
};

export const GridList = ({
  users,
  subCategories,
  loading,
  hasMore,
  onLoadMore,
}: GridListProps) => {
  const lastElementRef = useInfiniteScroll(onLoadMore, hasMore, loading);
  if (users.length === 0 && !loading) {
    return <div className={styles.empty}>Пользователи не найдены</div>;
  }
  return (
    <div>
      <ul className={styles.grid}>
        {users &&
          subCategories &&
          users.map((user, index) => (
            <li
              key={user.id}
              className={styles.gridItem}
              ref={index === users.length - 1 ? lastElementRef : undefined}
            >
              <SkillCard
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

      {loading && (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Loader />
        </div>
      )}

      {!hasMore && users.length > 0 && (
        <div style={{ textAlign: "center", padding: "20px", color: "#69735D" }}>
          Показаны все пользователи
        </div>
      )}
    </div>
  );
};
