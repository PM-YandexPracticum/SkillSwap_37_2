// src\widgets\gridList\GridList.tsx

import { UserCard } from '../../features/users/userCard/UserCard';
import styles from './GridList.module.css';
import { useInfiniteScroll } from '../../shared/hooks/useInfiniteScroll';
import { Loader } from '../../shared/ui/loader/Loader';
import { birthdayToFormatedAge, getImageUrl } from '../../shared/lib/helpers';
import { TPlace, TUserCard } from '@api/types';

type GridListProps = {
  users: TUser[];
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
              <UserCard
                name={user.name}
                from={user.from}
                age={birthdayToFormatedAge(user.birthdate)}
                avatar={getImageUrl(user.photo)}
                teachSkills={user.sub_text}
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
