// src\widgets\gridList\GridList.tsx

import { UserCard } from '../../features/users/userCard/UserCard';
import styles from './GridList.module.css';
import { useInfiniteScroll } from '../../shared/hooks/useInfiniteScroll';
import { Loader } from '../../shared/ui/loader/Loader';
import { birthdayToFormatedAge, getImageUrl } from '../../shared/lib/helpers';
import { TPlace, TUser } from '@api/types';

//количество отображаемых в гриде рядов 1 или максимум
type TRows = 1 | "auto";

type GridListProps = {
  users: TUser[];
  rows?: TRows;
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
};

export const GridList = ({
  users,
  rows = "auto", //по умолчанию показывать все ряды(все карточки)
  loading,
  hasMore, //бесконечный скролл/подгрузка данных
  onLoadMore,
}: GridListProps) => {

  const lastElementRef = useInfiniteScroll(onLoadMore, hasMore, loading);
  if (users.length === 0 && !loading) {
    return <div className={styles.empty}>Пользователи не найдены</div>;
  }

  // 3 колонки * rows строк
  const maxItems = typeof(rows) === "number" ? rows * 3 : users.length; 
  const visibleUsers = users.slice(0, maxItems);

  return (
    <div>
      <ul className={styles.grid}>
        {visibleUsers.map((user, index) => (
            <li
              key={user.id}
              className={styles.gridItem}
              ref={index === users.length - 1 ? lastElementRef : undefined}
            >
              <UserCard
                user = {user}
              />
            </li>
          ))}
      </ul>

      {loading && (
        <div>
          <Loader />
        </div>
      )}
      
    </div>
  );
};
