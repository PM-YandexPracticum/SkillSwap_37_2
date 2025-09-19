import { FC, useState } from "react";
import styles from "./Header.module.css";
import { Logo } from "../../shared/ui/logo/Logo";
import { Button } from "../../shared/ui/button/Button";
import { NotificationWidget } from "../notification-widget/NotificationWidget";
import { Icon } from "../../shared/ui/icon/Icon";
import { useSelector } from "react-redux";
import { getUser } from "../../services/user/user-slice";
import { getImageUrl } from "../../shared/lib/helpers";
import { SearchBar } from "../../shared/ui/search-bar/SearchBar";

export const Header: FC = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const user = useSelector(getUser);

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const closeNotifications = () => {
    setIsNotificationsOpen(false);
  };

  return (
    <header className={styles.header}>
      <Logo />
      <nav>
        <ul className={styles.navList}>
          <li className={styles.li}>
            <a href="#" className={styles.link}>
              О проекте
            </a>
          </li>
          <li className={styles.li}>
            <a href="#" className={styles.link}>
              Все навыки
            </a>
            <Icon name="chevronDown" size="s" className={styles.iconChevron} />
          </li>
        </ul>
      </nav>

      {/* Используем компонент SearchBar с разной шириной */}
      <SearchBar width={user ? 648 : 527} />

      <div className={styles.rightSection}>
        {/* Иконка темы всегда видима */}
        <button className={styles.moonButton}>
          <Icon name="moon" size="s" />
        </button>

        {/* Иконки уведомлений и лайков только для авторизованных */}
        {user && (
          <>
            <button
              className={styles.notificationButton}
              onClick={toggleNotifications}
            >
              <Icon name="notification" size="s" />
            </button>
            <button className={styles.likeButton}>
              <Icon name="like" size="s" />
            </button>
          </>
        )}

        {/* Блок пользователя или кнопки входа */}
        {user ? (
          <div className={styles.userAuthWrapper}>
            <span className={styles.userName}>{user.name}</span>
            <img
              src={getImageUrl(user.photo)}
              alt={user.name}
              className={styles.userAvatar}
            />
          </div>
        ) : (
          <div className={styles.buttonsWrapper}>
            <Button size={92}>Войти</Button>
            <Button size={208} colored>
              Зарегистрироваться
            </Button>
          </div>
        )}
      </div>

      <NotificationWidget
        isOpen={isNotificationsOpen}
        onClose={closeNotifications}
      />
    </header>
  );
};
