import React, { useState } from "react";
import styles from "./ProfilePage.module.css";
import { ProfileMenu } from "../../widgets/profileMenu/ProfileMenu";
import { PersonalData } from "../../features/personalData/PersonalData";

// Импорт картинок-заглушек
import BoardImg from "../../shared/assets/images/BoardImg.png"
import LightImg from "../../shared/assets/images/LightImg.png"
import UserImg from "../../shared/assets/images/UserImg.png"

type TabType = "requests" | "exchanges" | "favorites" | "skills" | "personal";

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<TabType>("personal");

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalData />;
      case "skills":
        return (
          <img
            src={BoardImg}
            alt="Мои навыки"
            className={styles.placeholder}
          />
        );
      case "requests":
        return (
          <img
            src={LightImg}
            alt="Мои заявки"
            className={styles.placeholder}
          />
        );
      case "exchanges":
        return (
          <img
            src={UserImg}
            alt="Мои обмены"
            className={styles.placeholder}
          />
        );
      case "favorites":
        return (
          <img
            src={BoardImg}
            alt="Избранное"
            className={styles.placeholder}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.container}>
        <ProfileMenu activeTab={activeTab} onTabChange={setActiveTab} />
        <div className={styles.content}>{renderContent()}</div>
      </div>
    </div>
  );
};
