import { FC, useState } from "react";
import styles from "./Header.module.css";
import { Logo } from "../../shared/ui/logo/Logo";
import { Button } from "../../shared/ui/button/Button";
import { NotificationWidget } from "../notification-widget/NotificationWidget";
import { Icon } from "../../shared/ui/icon/Icon";

export const Header: FC = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

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
      <div className={styles.searchWrapper}>
        <Icon name="search" size="s" className={styles.iconSearch} />
        <input
          type="search"
          className={styles.search}
          placeholder="Искать навык"
        />
      </div>
      <Icon name="moon" size="s" className={styles.iconMoon} />

      <button
        className={styles.notificationButton}
        onClick={toggleNotifications}
      >
        <Icon name="notification" size="s" />
      </button>

      <div className={styles.buttonsWrapper}>
          <Button size={92}>Войти</Button>
          <Button size={208} colored>Зарегистрироваться</Button>
      </div>

      <NotificationWidget
        isOpen={isNotificationsOpen}
        onClose={closeNotifications}
      />
    </header>
  );
};
