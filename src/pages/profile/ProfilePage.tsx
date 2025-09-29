import React, { useState } from "react";
import styles from "./ProfilePage.module.css";
import { ProfileMenu } from "../../widgets/profileMenu/ProfileMenu";
import { PersonalData } from "../../features/personalData/PersonalData";

import { RegistrationOnBoarding } from "../../features/onboarding/registrationBoard";
import { onBoarding } from "../../features/onboarding/registrationBoard";

type TabType = "requests" | "exchanges" | "favorites" | "skills" | "personal";

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<TabType>("personal");

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalData />;

      case "skills":
        return (
          <div className={styles.fullContent}>
            <RegistrationOnBoarding
              title={onBoarding[2].title}
              image={onBoarding[2].image}
              alt={onBoarding[2].alt}
              description={onBoarding[2].description}
            />
          </div>
        );

      case "requests":
        return (
          <div className={styles.fullContent}>
            <RegistrationOnBoarding
              title={onBoarding[0].title}
              image={onBoarding[0].image}
              alt={onBoarding[0].alt}
              description={onBoarding[0].description}
            />
          </div>
        );

      case "exchanges":
        return (
          <div className={styles.fullContent}>
            <RegistrationOnBoarding
              title={onBoarding[1].title}
              image={onBoarding[1].image}
              alt={onBoarding[1].alt}
              description={onBoarding[1].description}
            />
          </div>
        );

      case "favorites":
        return (
          <div className={styles.saved}>
            <RegistrationOnBoarding
              title="Избранное"
              image={onBoarding[0].image}
              alt="Избранное"
              description="Здесь будут ваши избранные обмены"
            />
          </div>
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
