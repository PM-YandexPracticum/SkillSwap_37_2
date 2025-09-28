// src\widgets\header\Header.tsx

import { FC, useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Header.module.css";
import { Logo } from "../../shared/ui/logo/Logo";
import { Button } from "../../shared/ui/button/Button";
import { NotificationWidget } from "../notification-widget/NotificationWidget";
import { Icon } from "../../shared/ui/icon/Icon";
import { useSelector } from "react-redux";
// import { getUser } from "../../services/user/user-slice";
import { getImageUrl } from "../../shared/lib/helpers";
import { SearchBar } from "../../shared/ui/search-bar/SearchBar";
import { Popup } from "../popup/Popup";
import { SkillMenu } from "../SkillMenu/SkillMenu";
import { getCurrentUser } from "../../services/user/user-slice";

export const Header: FC = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const currentUser = useSelector(getCurrentUser);

  const navigate = useNavigate();
  // const API_USER_ID = Number(import.meta.env.VITE_AUTH_USER_ID);

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const closeNotifications = () => {
    setIsNotificationsOpen(false);
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogoClick = () => navigate("/");

  return (
    <header className={styles.header}>
      <Link to="/">
        <Logo />
      </Link>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.li}>
            <Link to="/about" className={styles.link} onClick={() => console.log('Click on About link')}>
  О проекте
</Link>
          </li>
          <li className={styles.li}>
            {/* <a href="#" className={styles.link} onClick={togglePopup} > */}
            <button className={styles.link} onClick={togglePopup}>
              Все навыки
              <Icon
                name={isPopupOpen ? "chevronUp" : "chevronDown"}
                size="s"
                className={styles.iconChevron}
              />
            </button>
          </li>
        </ul>
      </nav>

      {/* Используем компонент SearchBar с разной шириной */}
      <SearchBar width={currentUser ? 648 : 527} />

      <div className={styles.rightSection}>
        {/* Иконка темы всегда видима */}
        <button className={styles.moonButton}>
          <Icon name="moon" size="s" />
        </button>

        {/* Иконки уведомлений и лайков только для авторизованных */}
        {currentUser && (
          <>
            <button
              className={styles.notificationButton}
              onClick={toggleNotifications}
            >
              <div className={styles.iconWrapper}>
                <Icon name="notification" size={20} strokeWidth={5} />
              </div>
            </button>
            <button className={styles.likeButton}>
              <Icon name="like" size="s" />
            </button>
          </>
        )}

        {/* Блок пользователя или кнопки входа */}
        {currentUser ? (
          <div
            className={styles.userAuthWrapper}
            onClick={handleProfileClick}
            style={{ cursor: "pointer" }}
          >
            <span className={styles.userName}>{currentUser.name}</span>
            <img
              src={getImageUrl(currentUser.photo)}
              alt={currentUser.name}
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

      {currentUser ? (
        <NotificationWidget
          isOpen={isNotificationsOpen}
          onClose={closeNotifications}
          userId={currentUser.id}
        />
      ) : null}

      <Popup isOpen={isPopupOpen} onClose={closePopup}>
        <SkillMenu />
      </Popup>
    </header>
  );
};
