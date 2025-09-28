// src\widgets\header\Header.tsx

import { FC, useState } from "react";
import { Link } from "react-router-dom";
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
import { ProfilePopup } from "../profile-popup/ProfilePopup";

type PopupType = "skills" | "profile" | "notifications" | null;

export const Header: FC = () => {
  const [isOpenPopup, setOpenPopup] = useState<PopupType>(null);
  const currentUser = useSelector(getCurrentUser);

  // const API_USER_ID = Number(import.meta.env.VITE_AUTH_USER_ID);

  const togglePopup = (popup: PopupType) => {
    setOpenPopup(prev => (prev === popup ? null : popup));
  };
  
  const closePopup = () => setOpenPopup(null);

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
            <button className={styles.link} onClick={() => togglePopup('skills')}>
              Все навыки
              <Icon
//                name={isPopupOpen ? "chevronUp" : "chevronDown"}
                name={isOpenPopup === 'skills' ? 'chevronUp' : 'chevronDown'}
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
              onClick={() => togglePopup('notifications')}
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
            onClick={() => togglePopup('profile')}
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


      {/* Попапы */}
      {currentUser ? (
        <Popup isOpen={isOpenPopup === 'notifications'} onClose={closePopup}>
          <NotificationWidget userId={currentUser.id} />
        </Popup>
      ) : null}

      <Popup isOpen={isOpenPopup === 'skills'} onClose={closePopup}>
        <SkillMenu />
      </Popup>
      
      <Popup isOpen={isOpenPopup === 'profile'} onClose={closePopup}>
        <ProfilePopup />
      </Popup>
    </header>
  );
};
