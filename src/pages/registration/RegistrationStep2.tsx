import React from "react";
import { RegistrationOnBoarding } from "../../features/onboarding/registrationBoard";
import { onBoarding } from "../../features/onboarding/registrationBoard";
import { RegisterStep2, RegisterStep2Data } from "../../features/auth/RegisterStep2";
import { RegistrationProgress } from "../../shared/ui/RegistrationProgress/RegistrationProgress";
import styles from "./RegistrationPages.module.css";

interface RegistrationStep2Props {
  onBack: () => void;
  onContinue: (data: RegisterStep2Data) => void;
  initialData?: Partial<RegisterStep2Data>;
}

export const RegistrationStep2: React.FC<RegistrationStep2Props> = ({
  onBack,
  onContinue,
  initialData
}) => {
  return (
    <div className={styles.registrationContainer}>
      <div className={styles.progressSection}>
        <RegistrationProgress currentStep={2} totalSteps={3} />
      </div>
      
      <div className={styles.contentContainer}>
        <div className={styles.formSection}>
          <RegisterStep2
            onBack={onBack}
            onContinue={onContinue}
            initialData={initialData}
          />
        </div>
        
        <div className={styles.onboardingSection}>
          <RegistrationOnBoarding {...onBoarding[1]} />
        </div>
      </div>
    </div>
  );
};