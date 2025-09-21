import React from 'react';
import styles from './ExchangeNotification.module.css';
import { Button } from '../button/Button';
import { Icon } from '../icon/Icon';
import { IconName } from '../icon/icons';

interface ExchangeNotificationProps {
  type: 'success' | 'info';
  title?: string;
  message?: string;
  buttonText?: string;
  onNavigateToExchange?: () => void;
}

export const ExchangeNotification: React.FC<ExchangeNotificationProps> = ({
  type = 'success',
  title,
  message,
  buttonText,
  onNavigateToExchange
}) => {
  const notificationContent = {
    success: {
      icon: 'done' as IconName, 
      defaultTitle: 'Ваше предложение создано',
      defaultMessage: 'Теперь вы можете предложить обмен',
      defaultButtonText: 'Готово'
    },
    info: {
      icon: 'notification' as IconName,
      defaultTitle: 'Вы предложили обмен',
      defaultMessage: 'Теперь дождитесь подтверждения. Вам придет уведомление',
      defaultButtonText: 'Готово'
    }
  };

  const content = notificationContent[type];

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <div className={styles.iconContainer}>
          <Icon name={content.icon} size="l" className={styles.icon} data-icon={content.icon} />
        </div>
        
        <div className={styles.header}>
          <h2 className={styles.title}>{title || content.defaultTitle}</h2>
        </div>
        
        <div className={styles.message}>
          <p>{message || content.defaultMessage}</p>
        </div>
        
        {onNavigateToExchange && (
          <div className={styles.actions}>
            <Button 
              onClick={onNavigateToExchange}
              colored
              className={styles.actionButton}
            >
              {buttonText || content.defaultButtonText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};