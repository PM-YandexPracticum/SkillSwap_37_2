import React from "react";
import "./skillCardDetails.css";
import { Gallery } from "../../../shared/ui/skillCardDetailsUI/skillCardDetailsUI";
import { useExchangeNotification } from "../../../shared/ui/notification/useExchangeNotification";
import { ExchangeNotification } from "../../../shared/ui/notification/ExchangeNotification";

type Skill = {
  title: string;
  subtitle: string;
  description: string;
  mainImage?: string;
  smallImages?: string[];
  icons?: string[];
  buttonText?: string;
  onExchange?: () => void;
};

type SkillCardDetailsProps = {
  skill: Skill;
};

export const SkillCardDetails: React.FC<SkillCardDetailsProps> = ({
  skill,
}) => {
  const {
    title,
    subtitle,
    description,
    mainImage,
    smallImages = [],
    icons = [],
    buttonText = "Предложить обмен",
    onExchange,
  } = skill;

  // Используем хук для управления модальными окнами
  const {
    isNotificationOpen,
    openNotification,
    closeNotification,
    handleNavigateToExchange,
  } = useExchangeNotification();

  const handleExchangeClick = () => {
    // 1. Показываем модалку "Предложение создано"
    openNotification({
      type: "info",
      title: "Ваше предложение создано",
      message: "Теперь вы можете предложить обмен",
      buttonText: "Готово",
    });
    // 2. Вызываем оригинальный обработчик если есть
    onExchange?.();
  };

  const handleProposeExchange = () => {
    // Логика отправки предложения обмена
    console.log("Отправка предложения обмена...");
    closeNotification();
  };

  return (
    <>
      <div className="skill-card">
        <div className="skill-card__info">
          <h2 className="skill-card__title">{title}</h2>
          <h3 className="skill-card__subtitle">{subtitle}</h3>
          <p className="skill-card__description">{description}</p>
          <button className="skill-card__button" onClick={handleExchangeClick}>
            {buttonText}
          </button>
        </div>

        <div className="skill-card__right">
          {icons.length > 0 && (
            <div className="skill-card__icons">
              {icons.map((icon, i) => (
                <button key={i} className="skill-card__icon-btn">
                  <img
                    src={icon}
                    alt={`icon-${i}`}
                    className="skill-card__icon-img"
                  />
                </button>
              ))}
            </div>
          )}

          <Gallery mainImage={mainImage} smallImages={smallImages} />
        </div>
      </div>

      {/* Модальное окно уведомления */}
      <ExchangeNotification
        isOpen={isNotificationOpen}
        onClose={closeNotification}
        onNavigateToExchange={handleProposeExchange}
        type="info"
      />
    </>
  );
};
