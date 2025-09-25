
import { FC, useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Header.module.css";
import { Logo } from "../../shared/ui/logo/Logo";
import { Button } from "../../shared/ui/button/Button";
import { NotificationWidget } from "../notification-widget/NotificationWidget";
import { Icon } from "../../shared/ui/icon/Icon";
import { useSelector } from "react-redux";
import { getUser } from "../../services/user/user-slice";
import { getImageUrl } from "../../shared/lib/helpers";
import { SearchBar } from "../../shared/ui/search-bar/SearchBar";
import { Popup } from "../popup/Popup";
import { SkillMenu } from "../SkillMenu/SkillMenu";

export const Header: FC = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const API_USER_ID = Number(import.meta.env.VITE_AUTH_USER_ID);

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  const closePopup = () => {
    setPopupOpen(false);
  }

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
            <a href="#" className={styles.link}>
              О проекте
            </a>
          </li>
          <li className={styles.li}>
            <a href="#" className={styles.link} onClick={togglePopup} >
              Все навыки
            <Icon
              name={isPopupOpen ? 'chevronUp' : 'chevronDown'}
              size="s"
              className={styles.iconChevron} />
            </a>
            
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
        {user ? (
          <div
            className={styles.userAuthWrapper}
            onClick={handleProfileClick}
            style={{ cursor: "pointer" }}
          >
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
        userId={API_USER_ID}
      />
      <Popup isOpen={isPopupOpen} onClose={closePopup}>
        <SkillMenu />
      </Popup>
    </header>
  );
};
