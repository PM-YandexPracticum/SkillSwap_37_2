import React from 'react';
import styles from './registrationBoard.module.css';

import lightBulbPNG from '@images/light-bulb.png';
import userInfoPNG from '@images/user-info.png';
import schoolBoardPNG from '@images/school-board.png';



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
        <img src={lightBulbPNG} alt='Лампочка' className={styles.image} />
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
        <img src={userInfoPNG} alt='Человек говорит сообщение' className={styles.image} />
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
        <img src={schoolBoardPNG} alt='Маркерная доска с заданиями' className={styles.image} />
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        </div>
    </div>
  );
};
