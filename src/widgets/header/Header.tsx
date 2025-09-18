import { FC, useState } from "react";
import styles from "./Header.module.css";
import { LogoUI } from "../../shared/ui/logo/Logo";
import { ButtonUI } from "../../shared/ui/button/ButtonUI";
import clsx from "clsx";
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
      <LogoUI />
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

      <div className={styles.buttonWrapper}>
        <div className={styles.loginWrapper}>
          <ButtonUI label="Войти" />
        </div>
        <div className={styles.registryWrapper}>
          <ButtonUI label="Зарегистрироваться" colored />
        </div>
      </div>

      <NotificationWidget
        isOpen={isNotificationsOpen}
        onClose={closeNotifications}
      />
    </header>
  );
};
