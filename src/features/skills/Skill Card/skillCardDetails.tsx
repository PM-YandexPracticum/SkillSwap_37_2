import React, { useState } from "react";
import { Gallery } from "../../../shared/ui/gallery/Gallery";
import { useExchangeNotification } from "../../../shared/ui/notification/useExchangeNotification";
import { ExchangeNotification } from "../../../shared/ui/notification/ExchangeNotification";
import { RegistrationModal } from "../../registration/RegistrationModal";
import { Icon } from "../../../shared/ui/icon/Icon";
import { Button } from "../../../shared/ui/button/Button";
import photoPlaceholder from "../../../shared/assets/images/school-board.svg?.svg";
import styles from './skillCardDetails.module.css';

type SkillCardDetailsProps = {
  checkEdit?: boolean; //если указать проп, то компонент рендерится с кнопкой редактировать
  title: string;
  subtitle: string;
  description: string;
  images?: string[];
  buttonText?: string;
  onExchange?: () => void;
  requireRegistration?: boolean;
};

export const SkillCardDetails: React.FC<SkillCardDetailsProps> = ({
  checkEdit,
  title,
  subtitle,
  description,
  images = [],
  buttonText = "Предложить обмен",
  onExchange,
  requireRegistration = true
}) => {

  const { isNotificationOpen, openNotification, closeNotification } = useExchangeNotification();
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false); // Состояние для модалки
  
  const handleExchangeClick = () => {
    if (requireRegistration) {
    openNotification({
      type: "info",
      title: "Ваше предложение создано",
      message: "Теперь вы можете предложить обмен",
      buttonText: "Готово",
    });
    } else { // Если регистрация не требуется, сразу вызываем обмен
    onExchange?.();
    }
  };

   const handleNotificationButtonClick = () => {
    // Открываем модалку регистрации
    closeNotification();
    setIsRegistrationModalOpen(true);
  };

  const handleRegistrationComplete = () => {
    console.log("Регистрация завершена!");
    onExchange?.();
  };

  const likeHandle = () => {
    console.log("Liked!");
  }
  const shareHandle = () => {
    console.log("Shared!");
  }
  const moreHandle = () => {
    console.log("More...");
  }

  const editHandle = () => {
    console.log("Edit...")
  }

  if (!checkEdit) {
    return (
    <>
      <div className={styles.skillCard}>

        <div className={styles.iconsBar}>
          <button className={styles.buttonIcon} onClick={likeHandle}>
            <Icon name="like" />
          </button>
          <button className={styles.buttonIcon} onClick={shareHandle}>
            <Icon name="share" />
          </button>
          <button className={styles.buttonIcon} onClick={moreHandle}>
            <Icon name="more" />
          </button>
        </div>

        <div className={styles.mainSection}>

          <div className={styles.leftSection}>
            <div className={styles.info}>
              <h2 className={styles.title}>{title}</h2>
              <h3 className={styles.subtitle}>{subtitle}</h3>
              <p className={styles.description}>{description}</p>
            </div>
              <Button className={styles.buttonOffer}
                colored
                onClick={handleExchangeClick}
              >
                {buttonText}
              </Button>
          </div>
          
          <div className={styles.rightSection}>
            {images && (
              <Gallery images={images} placeholder={photoPlaceholder} />
            )}
          </div>

        </div>
      </div>

    {/* Модалка регистрации */}
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        onRegistrationComplete={handleRegistrationComplete}
      />

      <ExchangeNotification
        isOpen={isNotificationOpen}
        onClose={closeNotification}
        onNavigateToExchange={handleNotificationButtonClick}
        type="info"
        title="Ваше предложение создано"
        message="Теперь вы можете предложить обмен"
        buttonText="Готово"
      />
    </>
  )}

  return (
    <>
      <div
        className={styles.skillCard}
        style={{padding: '2.75em 3.75em 4.5em'}}
      >

        <div className={styles.headSection}>
          <h3 className={styles.headTitle}>Ваше предложение</h3>
          <p className={styles.headText}>Пожалуйста, проверьте и подтвердите правильность данных</p>
        </div>

        <div className={styles.mainSection}>

          <div className={styles.leftSection}>
            <div className={styles.info}>
              <h2 className={styles.title}>{title}</h2>
              <h3 className={styles.subtitle}>{subtitle}</h3>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.buttonsContainer}>
              <Button 
                className={styles.buttonEdit}
                onClick={editHandle}
              >
                Редактировать <Icon name="edit" />
              </Button>
              <Button
                colored
                onClick={handleExchangeClick}
              >
                {buttonText}
              </Button>
            </div>
          </div>
          
          <div className={styles.rightSection}>
            {images && (
              <Gallery images={images} placeholder={photoPlaceholder} />
            )}
          </div>

        </div>
      </div>

    {/* Модалка регистрации */}
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        onRegistrationComplete={handleRegistrationComplete}
      />

      <ExchangeNotification
        isOpen={isNotificationOpen}
        onClose={closeNotification}
        onNavigateToExchange={handleNotificationButtonClick}
        type="info"
        title="Ваше предложение создано"
        message="Теперь вы можете предложить обмен"
        buttonText="Готово"
      />
    </>
  )
};
