import React from "react";
import { Gallery } from "../../../shared/ui/gallery/Gallery";
import { useExchangeNotification } from "../../../shared/ui/notification/useExchangeNotification";
import { ExchangeNotification } from "../../../shared/ui/notification/ExchangeNotification";
// import "./skillCardDetails.css";
import { Icon } from "../../../shared/ui/icon/Icon";
import { Button } from "../../../shared/ui/button/Button";
import styles from './skillCardDetails.module.css';

type Skill = {
  checkEdit?: boolean; //если указать проп, то компонент рендерится с кнопкой редактировать
  title: string;
  subtitle: string;
  description: string;
  mainImage?: string;
  smallImages?: string[];
  buttonText?: string;
  onExchange?: () => void;
};

type SkillCardDetailsProps = {
  skill: Skill;
};

export const SkillCardDetails: React.FC<SkillCardDetailsProps> = ({ skill }) => {
  const {
    checkEdit,
    title,
    subtitle,
    description,
    mainImage,
    smallImages = [],
    buttonText = "Предложить обмен",
    onExchange
  } = skill;

  const { isNotificationOpen, openNotification, closeNotification } = useExchangeNotification();

  const handleExchangeClick = () => {
    openNotification({
      type: "info",
      title: "Ваше предложение создано",
      message: "Теперь вы можете предложить обмен",
      buttonText: "Готово",
    });
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
          <button className={styles.buttonIcon} onClick={() => likeHandle}>
            <Icon name="like" />
          </button>
          <button onClick={() => shareHandle} className={styles.buttonIcon}>
            <Icon name="share" />
          </button>
          <button onClick={moreHandle} className={styles.buttonIcon}>
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
            {mainImage && (
              <Gallery mainImage={mainImage} smallImages={smallImages} />
            )}
          </div>

        </div>
      </div>

      <ExchangeNotification
        isOpen={isNotificationOpen}
        onClose={closeNotification}
        onNavigateToExchange={() => {
          console.log("Предложение обмена");
          closeNotification();
        }}
        type="info"
      />
    </>
  )};

  return (
    <>
      <div
        className={styles.skillCard}
        style={{padding: '2.75em 3.75em 4.5em'}}
      >

        <div className={styles.headSection}>
          <h3 className={styles.headTitle}>Ваше предложение</h3>
          <p className={styles.headText}>Пожалуйста, проверьте и подтвердите правильность данных</p>
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
            {mainImage && (
              <Gallery mainImage={mainImage} smallImages={smallImages} />
            )}
          </div>

        </div>
      </div>

      <ExchangeNotification
        isOpen={isNotificationOpen}
        onClose={closeNotification}
        onNavigateToExchange={() => {
          console.log("Предложение обмена");
          closeNotification();
        }}
        type="info"
      />
    </>
  )
};
