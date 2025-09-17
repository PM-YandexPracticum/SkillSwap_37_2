import React from "react";
import "./skillCardDetails.css";
import { Gallery } from "../../../shared/ui/skillCardDetailsUI/skillCardDetailsUI";

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

export const SkillCardDetails: React.FC<SkillCardDetailsProps> = ({ skill }) => {
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

  return (
    <div className="skill-card">
      <div className="skill-card__info">
        <h2 className="skill-card__title">{title}</h2>
        <h3 className="skill-card__subtitle">{subtitle}</h3>
        <p className="skill-card__description">{description}</p>
        <button className="skill-card__button" onClick={onExchange}>
          {buttonText}
        </button>
      </div>

      <div className="skill-card__right">
        {icons.length > 0 && (
          <div className="skill-card__icons">
            {icons.map((icon, i) => (
              <button key={i} className="skill-card__icon-btn">
                <img src={icon} alt={`icon-${i}`} className="skill-card__icon-img" />
              </button>
            ))}
          </div>
        )}

        <Gallery mainImage={mainImage} smallImages={smallImages} />
      </div>
    </div>
  );
};
