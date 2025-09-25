import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "@store";
import styles from "./NotificationWidget.module.css";
import { Icon } from "../../shared/ui/icon/Icon";
import { Button } from "../../shared/ui/button/Button";
import {
  markAsSeen,
  deleteAllNotification,
  getNewNotifications,
  getViewedNotifications,
  getIsLoading,
  getUnseenCount
} from "../../services/notifications/notification-slice"

import { getNotificationThunk } from "../../services/notifications/actions";

interface NotificationWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
}

// Интерфейс для преобразования данных (если нужно)
interface NotificationDisplay {
  id: number;
  userName: string;
  action: string;
  details: string;
  time: string;
  viewed: boolean;
}

export const NotificationWidget: FC<NotificationWidgetProps> = ({
  isOpen,
  onClose,
  userId,
}) => {
  const dispatch = useDispatch();
  
  const newNotifications = useSelector(getNewNotifications);
  const viewedNotifications = useSelector(getViewedNotifications);
  const isLoading = useSelector(getIsLoading);
  const unseenCount = useSelector(getUnseenCount);

  useEffect(() => {
    if (isOpen && userId) {
      dispatch(getNotificationThunk(userId));
    }
  }, [isOpen, userId, dispatch]);

  const formatDate = (dateString: string): string => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (eventDate.toDateString() === today.toDateString()) {
      return "сегодня";
    }
    
    if (eventDate.toDateString() === yesterday.toDateString()) {
      return "вчера";
    }
    
    const day = eventDate.getDate();
    const months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    const month = months[eventDate.getMonth()];
    return `${day} ${month}`;
  };

  if (!isOpen) return null;

  const handleMarkAllAsRead = () => {
    dispatch(markAsSeen());
  };

  const handleClearAll = () => {
    dispatch(deleteAllNotification());
  };

  // Функция для преобразования данных в формат виджета
  const mapToDisplayFormat = (event: any): NotificationDisplay => {
    let action = "";
    let details = "";
    
    if (event.type === 'offer') {
      action = "предлагает вам обмен";
      details = "Примите обмен, чтобы обсудить детали";
    } else if (event.type === 'accept') {
      action = "принял ваш обмен";
      details = "Перейдите в профиль, чтобы обсудить детали";
    }

    return {
      id: event.id,
      userName: event.fromUserName,
      action,
      details,
      time: formatDate(event.date),
      viewed: event.seen === 1
    };
  };

  if (isLoading) {
    return (
      <div className={styles.widget}>
        <div className={styles.content}>
          <div className={styles.loading}>Загрузка уведомлений...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.widget}>
      <div className={styles.content}>
        {/* Заголовок с кнопкой "Прочитать все" */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Новые уведомления {unseenCount > 0 && `(${unseenCount})`}
          </h2>
          {newNotifications.length > 0 && (
            <button
              className={styles.markAllButton}
              onClick={handleMarkAllAsRead}
            >
              <span className={styles.markAllText}>Прочитать все</span>
            </button>
          )}
        </div>

        {/* Новые уведомления */}
        <div className={styles.notificationsSection}>
          {newNotifications.length > 0 ? (
            newNotifications.map((notification) => (
              <NotificationCard
                key={notification.fromUserId}
                notification={mapToDisplayFormat(notification)}
                isNew={true}
              />
            ))
          ) : (
            <div className={styles.emptyState}>Нет новых уведомлений</div>
          )}
        </div>


        {/* Просмотренные уведомления */}
        {viewedNotifications.length > 0 && (
          <>
            <div className={styles.header}>
              <h2 className={styles.title}>Просмотренные</h2>
              <button className={styles.clearButton} onClick={handleClearAll}>
                <span className={styles.clearText}>Очистить</span>
              </button>
            </div>

            <div className={styles.viewedSection}>
              {viewedNotifications.map((notification) => (
                <NotificationCard
                  key={notification.fromUserId}
                  notification={mapToDisplayFormat(notification)}
                  isNew={false}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Компонент NotificationCard остается практически без изменений
const NotificationCard: FC<{ 
  notification: NotificationDisplay;
  isNew: boolean;
  onMarkAsRead?: () => void;
}> = ({ notification, isNew, onMarkAsRead }) => (
  <div className={`${styles.notificationCard} ${isNew ? "" : styles.viewed}`}>
    <div className={styles.iconContainer}>
      <Icon name="idea" size={40} strokeWidth={1} />
    </div>

    <div className={styles.contentSection}>
      <div className={styles.textSection}>
        <div className={styles.notificationHeader}>
          <span className={styles.userName}>{notification.userName}</span>
          <span className={styles.action}> {notification.action}</span>
        </div>
        <p className={styles.details}>{notification.details}</p>
      </div>

      <div className={styles.timeSection}>
        <span className={styles.time}>{notification.time}</span>
      </div>
    </div>

    {isNew && (
      <div className={styles.buttonContainer}>
        <Button size={114} colored onClick={onMarkAsRead}>
          Перейти
        </Button>
      </div>
    )}
  </div>
);
