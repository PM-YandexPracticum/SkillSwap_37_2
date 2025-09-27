import React from "react";
import { RegistrationOnBoarding } from "../../features/onboarding/registrationBoard";
import { onBoarding } from "../../features/onboarding/registrationBoard";
import { SkillForm } from "../../widgets/skillForm/SkillForm";
import { RegistrationProgress } from "../../shared/ui/RegistrationProgress/RegistrationProgress";
import styles from "./RegistrationPages.module.css";

interface RegistrationStep3Props {
  onBack: () => void;
  onComplete: () => void;
}

export const RegistrationStep3: React.FC<RegistrationStep3Props> = ({
  onBack,
  onComplete,
}) => {
  return (
    <div className={styles.registrationContainer}>
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
