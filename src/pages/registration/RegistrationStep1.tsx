import React from "react";
import { useNavigate } from "react-router-dom";
import { RegistrationOnBoarding } from "../../features/onboarding/registrationBoard";
import { onBoarding } from "../../features/onboarding/registrationBoard";
import { AuthForm } from "../../features/auth/AuthForm";
import { RegistrationProgress } from "../../shared/ui/RegistrationProgress/RegistrationProgress";
import { Icon } from "../../shared/ui/icon/Icon";
import styles from "./RegistrationPages.module.css";

interface RegistrationStep1Props {
  onContinue: (email: string, password: string) => void;
  onClose?: () => void;
}

export const RegistrationStep1: React.FC<RegistrationStep1Props> = ({
  onContinue,
  onClose,
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.registrationPage}>
      <div className={styles.registrationHeader}>
        <div className={styles.logo}>
          <Icon name="logo" size={40} />
          <span>SkillSwap</span>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          Закрыть
          <Icon name="cross" size={24} />
        </button>
      </div>
      <div className={styles.progressSection}>
        <RegistrationProgress currentStep={1} totalSteps={3} />
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.formSection}>
          <AuthForm onContinue={onContinue} />
        </div>

        <div className={styles.onboardingSection}>
          <RegistrationOnBoarding {...onBoarding[0]} />
        </div>
      </div>
    </div>
  );
};
