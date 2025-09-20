import { useState } from "react";
import { UserCard } from "../../features/users/userCard/UserCard";
import { TUser, TPlace } from "../../api/types";
import { Icon } from "../../shared/ui/icon/Icon";
import { birthdayToFormatedAge, getImageUrl } from "../../shared/lib/helpers";
import styles from "./CardSlider.module.css";
import clsx from "clsx";

type CardSliderProps = {
  users: TUser[];
  subCategories: TPlace[];
};

export const CardSlider = ({ users, subCategories }: CardSliderProps) => {
  const [page, setPage] = useState(0);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePrev = () => {
    setPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  const startIndex = page * itemsPerPage;
  const visibleUsers = users.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={styles.slider}>
      <div className={styles.cardsWrapper}>
        {visibleUsers.map((user) => (
          <UserCard
            key={user.id}
            name={user.name}
            from={user.from}
            age={birthdayToFormatedAge(user.birthdate)}
            avatar={getImageUrl(user.photo)}
            teachSkills={user.skill}
            learnSkills={user.need_subcat}
            subCategories={subCategories}
          />
        ))}
      </div>

      {users.length > itemsPerPage && (
        <>
          <div className={clsx(styles.chevronLeft, styles.chevron)}>
            <button onClick={handlePrev} disabled={page === 0}>
              <Icon name="chevronRight" size={16} className={styles.iconChevronLeft}/>
            </button>
          </div>
          <div className={clsx(styles.chevronRight, styles.chevron)}>
            <button onClick={handleNext} disabled={page === totalPages - 1}>
              <Icon name="chevronRight" size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
