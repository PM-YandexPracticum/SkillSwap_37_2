import React from 'react';
import styles from './registrationBoard.module.css';

interface onBoardingProps {
  title?: string;
  description?: string;
}

export const RegistrationOnBoardingOne: React.FC<onBoardingProps> = ({
  title = 'Добро пожаловать в SkillSwap!',
  description = 'Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми',
}) => {
  return (
    <div className={styles.constent}>
        <div className={styles.onboarding}>
        <img src='/db/onboarding-photo/light-bulb.png' alt='Лампочка' className={styles.image} />
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        </div>
    </div>
  );
};

export const RegistrationOnBoardingTwo: React.FC<onBoardingProps> = ({
  title = 'Расскажите немного о себе',
  description = 'Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена',
}) => {
  return (
    <div className={styles.constent}>
        <div className={styles.onboarding}>
        <img src='/db/onboarding-photo/user-info.png' alt='Человек говорит сообщение' className={styles.image} />
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        </div>
    </div>
  );
};

export const RegistrationOnBoardingThree: React.FC<onBoardingProps> = ({
  title = 'Укажите, чем вы готовы поделиться',
  description = 'Так другие люди смогут увидеть ваши предложения и предложить вам обмен!',
}) => {
  return (
    <div className={styles.constent}>
        <div className={styles.onboarding}>
        <img src='/db/onboarding-photo/school-board.png' alt='Маркерная доска с заданиями' className={styles.image} />
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        </div>
    </div>
  );
};
