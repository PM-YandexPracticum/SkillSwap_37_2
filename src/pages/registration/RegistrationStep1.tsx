import React from "react";
import { RegistrationOnBoarding } from "../../features/onboarding/registrationBoard";
import { onBoarding } from "../../features/onboarding/registrationBoard";
import { AuthForm } from "../../features/auth/AuthForm";
import { RegistrationProgress } from "../../shared/ui/RegistrationProgress/RegistrationProgress";
import styles from "./RegistrationPages.module.css";

interface RegistrationStep1Props {
  onContinue: (email: string, password: string) => void;
}

export const RegistrationStep1: React.FC<RegistrationStep1Props> = ({ onContinue }) => {
  return (
    <div className={styles.registrationContainer}>
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