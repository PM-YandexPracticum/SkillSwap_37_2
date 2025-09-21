import { ReactElement, ReactNode } from "react";
import styles from "./CardShowcase.module.css";
import { Button } from "../../shared/ui/button/Button";
import clsx from "clsx";

type CardShowcaseProps = {
  children: ReactNode;
  title: string;
  className?: string;
  onClick?: () => void;
  buttonName?: string
  buttonSize?: number;
  icon?: ReactElement;
};

export const CardShowcase = ({
  children,
  title,
  className,
  onClick,
  buttonName = '',
  buttonSize,
  icon
}: CardShowcaseProps) => {

  return (
    <div className={styles.cardShowcase}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {title}
        </h2>
        {buttonName && (
              <Button 
                size={buttonSize}
                onClick={onClick}
              >
                <span>{buttonName}</span>
                <span>{icon}</span>
              </Button>
        )}
      </div>
      <div className={styles.childsWrapper}>
        {children}
      </div>
    </div>
  );
};
