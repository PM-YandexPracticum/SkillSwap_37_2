import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./ProfilePage.module.css";
import { ProfileMenu } from "../../widgets/profileMenu/ProfileMenu";
import { PersonalData } from "../../features/personalData/PersonalData";

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<
    "requests" | "exchanges" | "favorites" | "skills" | "personal"
  >("personal");
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (
    tab: "requests" | "exchanges" | "favorites" | "skills" | "personal"
  ) => {
    if (tab !== "personal") {
      // пока что для всех вкладок кроме "Личные данные" перенаправляем на 404
      navigate(`/profile/${tab}`);
    } else {
      setActiveTab(tab);
      // Если мы уже на странице профиля, просто активируем вкладку
      if (location.pathname !== "/profile") {
        navigate("/profile");
      }
    }
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.container}>
        <ProfileMenu activeTab={activeTab} onTabChange={handleTabChange} />
        <div className={styles.content}>
          <PersonalData />
        </div>
      </div>
    </div>
  );
};
