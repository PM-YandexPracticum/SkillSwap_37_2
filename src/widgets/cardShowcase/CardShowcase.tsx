import React, { ReactElement, useState } from "react";
import styles from "./CardShowcase.module.css";

type CardShowcaseProps = {
  children: ReactElement;
  title: string;
  buttonTitle?: string
  icon?: ReactElement;
  isIconFirst?: boolean; //если указан атрибут, то иконка слева от текста
};

export const CardShowcase = ({
  children,
  title,
  buttonTitle = '',
  icon,
  isIconFirst
}: CardShowcaseProps) => {
  //состояние развернуть/свернуть CardShowcase
  // const [isShowAllCards, setIsShowAllCards] = useState<boolean>(false);

   const showHideRowsHandle = () => {
    if (title.startsWith('Подходящие предложения:')) {
      console.log('Сортировка...');
    } else {
      // setIsShowAllCards(prev => !prev);
    }
  };

  return (
    <div className={styles.cardShowcase}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>
            {title}
          </h2>
        </div>
        {buttonTitle && icon && !isIconFirst && (
              <button
                onClick={showHideRowsHandle} 
                className={styles.button}>
                <span>{buttonTitle}</span>
                <span>{icon}</span>
              </button>
        )}
        {buttonTitle && icon && isIconFirst && (
              <button
                onClick={showHideRowsHandle} 
                className={styles.button}>
                <span>{icon}</span>
                <span>{buttonTitle}</span>
              </button>
        )}
      </div>
      <div className={styles.childsWrapper}>
        {children &&
        React.cloneElement(children, {
          // isShowAllCards,
        })}
      </div>
    </div>
  );
};
