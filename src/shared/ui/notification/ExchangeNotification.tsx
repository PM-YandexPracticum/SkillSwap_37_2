import React from "react";
import styles from "./ExchangeNotification.module.css";
import { Button } from "../button/Button";
import { Icon } from "../icon/Icon";
import { IconName } from "../icon/icons";
import { Modal } from "../modal/Modal";

interface ExchangeNotificationProps {
  isOpen: boolean;
  onClose: () => void;
  type: "success" | "info";
  title?: string;
  message?: string;
  buttonText?: string;
  onNavigateToExchange?: () => void;
}

export const ExchangeNotification: React.FC<ExchangeNotificationProps> = ({
  isOpen,
  onClose,
  type = "success",
  title,
  message,
  buttonText,
  onNavigateToExchange,
}) => {
  const notificationContent = {
    success: {
      icon: "done" as IconName,
      defaultTitle: "Ваше предложение создано",
      defaultMessage: "Теперь вы можете предложить обмен",
      defaultButtonText: "Готово",
    },
    info: {
      icon: "notification" as IconName,
      defaultTitle: "Вы предложили обмен",
      defaultMessage: "Теперь дождитесь подтверждения. Вам придет уведомление",
      defaultButtonText: "Готово",
    },
  };

  const content = notificationContent[type];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalContent}>
        <div className={styles.iconContainer}>
          <Icon
            name={content.icon}
            size="l"
            className={styles.icon}
            data-icon={content.icon}
            strokeWidth={1.5}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>{title || content.defaultTitle}</h2>
            <span className={styles.messageText}>
              {message || content.defaultMessage}
            </span>
          </div>

          {onNavigateToExchange && (
            <Button onClick={onNavigateToExchange} colored>
              {buttonText || content.defaultButtonText}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
