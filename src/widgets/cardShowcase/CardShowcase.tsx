import { ReactElement, ReactNode } from "react";
import styles from "./CardShowcase.module.css";
import { Button } from "../../shared/ui/button/Button";
import clsx from "clsx";

type CardShowcaseProps = {
  children: ReactNode;
  title: string;
  onClick?: () => void;
  buttonTitle?: string
  icon?: ReactElement;
  // className?: string;
};

export const CardShowcase = ({
  children,
  title,
  onClick,
  buttonTitle = '',
  icon,
  // className,
}: CardShowcaseProps) => {

  return (
    <div className={styles.cardShowcase}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>
            {title}
          </h2>
        </div>
        {buttonTitle && (
              <button className={styles.button}>
                  <span>{buttonTitle}</span>
                  <span>{icon}</span>
              </button>
        )}
      </div>
      <div className={styles.childsWrapper}>
        {children}
      </div>
    </div>
  );
};
