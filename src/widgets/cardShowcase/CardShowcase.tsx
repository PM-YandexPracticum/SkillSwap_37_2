import React, { ReactElement } from "react";
import styles from "./CardShowcase.module.css";

type TTitle = 
  'Подходящие предложения: '
  | 'Популярное'
  | 'Новое'
  | 'Точное совпадение'
  | 'Новые идеи'
  | 'Рекомендуем'
  | 'Похожие предложения'

type CardShowcaseProps = {
  children: ReactElement;
  title: TTitle;
  buttonTitle?: string
  icon?: ReactElement;
  isIconFirst?: boolean; //если указан атрибут, то иконка слева от текста
  titleSize?: string; 
};

export const CardShowcase = ({
  children,
  title,
  buttonTitle = '',
  icon,
  isIconFirst,
  titleSize = '2em'
}: CardShowcaseProps) => {

   const showHideRowsHandle = () => {
    if (title.startsWith('Подходящие предложения')) {
      console.log('Сортировка...');
    }
    if (title.startsWith('Популярное')) {
      console.log('Популярное...');
    }
    if (title.startsWith('Новое')) {
      console.log('Новое...');
    }
    if (title.startsWith('Точное совпадение')) {
      console.log('Точное совпадение...');
    }
    if (title.startsWith('Новые идеи')) {
      console.log('Новые идеи...');
    }
  };

  return (
    <div className={styles.cardShowcase}>
      <div className={styles.header}>
        <div>
          <h2
            className={styles.title}
            style={{fontSize: `${titleSize}`}}
          >
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
          // здесь чилдрену можно передать какой-нибудь пропс 
        })}
      </div>
    </div>
  );
};
