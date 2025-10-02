import React from "react";
import { RegistrationOnBoarding } from "../../features/onboarding/registrationBoard";
import { onBoarding } from "../../features/onboarding/registrationBoard";
import { SkillForm, SkillFormData } from "../../widgets/skillForm/SkillForm";
import { RegistrationProgress } from "../../shared/ui/RegistrationProgress/RegistrationProgress";
import { Icon } from "../../shared/ui/icon/Icon";
import styles from "./RegistrationPages.module.css";

interface RegistrationStep3Props {
  onBack: () => void;
  onComplete: (data: SkillFormData) => void;
  onClose?: () => void;
}

export const RegistrationStep3: React.FC<RegistrationStep3Props> = ({
  onBack,
  onComplete,
  onClose,
}) => {
  return (
    <div className={styles.registrationPage}>
      <div className={styles.registrationHeader}>
        <div className={styles.logo}>
          <Icon name="logo" size={40} />
          <span>SkillSwap</span>
        </div>
        <button className={styles.closeButton} onClick={() => navigate(-1)}>
          Закрыть
          <Icon name="cross" size={24} />
        </button>
      </div>

      <div className={styles.progressSection}>
        <RegistrationProgress currentStep={3} totalSteps={3} />
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.formSection}>
          <SkillForm onBack={onBack} onContinue={onComplete} />
        </div>

        <div className={styles.onboardingSection}>
          <RegistrationOnBoarding {...onBoarding[2]} />
        </div>
      </div>
    </div>
  );
};
