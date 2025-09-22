import React, { ReactElement, useState } from "react";
import styles from "./CardShowcase.module.css";
import clsx from "clsx";

type CardShowcaseProps = {
  children: ReactElement;
  title: string;
  buttonTitle?: string
  icon?: ReactElement;
};

export const CardShowcase = ({
  children,
  title,
  buttonTitle = '',
  icon,
}: CardShowcaseProps) => {
  //состояние развернуть/свернуть CardShowcase
  const [isShowAllRows, setIsShowAllRows] = useState<boolean>(false);

   const showHideRowsHandle = () => {
    setIsShowAllRows(prev => !prev);
    console.log(isShowAllRows);
  };

  return (
    <div className={styles.cardShowcase}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>
            {title}
          </h2>
        </div>
        {buttonTitle && (
              <button
                onClick={showHideRowsHandle} 
                className={styles.button}>
                <span>{buttonTitle}</span>
                <span>{icon}</span>
              </button>
        )}
      </div>
      <div className={styles.childsWrapper}>
        {children &&
        React.cloneElement(children, {
          isShowAllRows,
        })}
      </div>
    </div>
  );
};
