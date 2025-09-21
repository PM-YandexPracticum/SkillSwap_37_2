import { ReactElement, ReactNode } from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

type CardShowcaseProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  title: string;
  actionName?: string
  icon?: ReactElement | null;
};

export const CardShowcase = ({
  children,
  className,
  onClick,
  title,
  actionName = '',
  icon
  // type = "button", 
}: CardShowcaseProps) => {

  return (
    <>
      <div>
        <h2 className={styles.title}>
          {title}
        </h2>
        {actionName && (
          <button onClick={onClick}>
            <span>
              {icon}
            </span>
            <span>
              {actionName}
            </span>
          </button>)}
      </div>
      <div
        className={clsx(styles.cardShowcase, className)}
      >
        {children}
      </div>
    </>
  );
};
