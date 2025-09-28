import React from "react";
import styles from "./LoginNotification.module.css";
import { Button } from "../button/Button";
import { Icon } from "../icon/Icon";

import { Modal } from "../modal/Modal";

interface LoginNotificationProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onCancel?: () => void;
}

export const LoginNotification: React.FC<LoginNotificationProps> = ({
  isOpen,
  onClose,
  onLogin,
  onCancel,
}) => {
  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  const handleLogin = () => {
    onLogin();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalContent}>
        <div className={styles.iconContainer}>
          <Icon
            name="userCircle"
            size="l"
            className={styles.icon}
            strokeWidth={0.5}
          />
        </div>
        
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>Пожалуйста, войдите в аккаунт</h2>
             <p className={styles.message}>
              Присоединяйтесь к SkillSwap и обменивайтесь
            </p>
            <p className={styles.message}>
              знаниями и навыками с другими людьми
            </p>
          </div>

          <div className={styles.buttons}>
            <Button 
              onClick={handleCancel}
              className={styles.cancelButton}
            >
              Отмена
            </Button>
            <Button 
              onClick={handleLogin}
              colored
              className={styles.loginButton}
            >
              Войти
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};