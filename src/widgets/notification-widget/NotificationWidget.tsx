// src\widgets\notification-widget\NotificationWidget.tsx

import { FC } from "react";
import styles from "./NotificationWidget.module.css";
import { Icon } from "../../shared/ui/icon/Icon";
import { Button } from "../../shared/ui/button/Button";

interface Notification {
  id: number;
  userName: string; // userId: number;
  action: string;
  details: string;
  time: string;
  viewed: boolean;
}

interface NotificationWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const notifications: Notification[] = [
  {
    id: 1,
    userName: "Николай", //ID 35
    action: "принял ваш обмен",
    details: "Перейдите в профиль, чтобы обсудить детали",
    time: "сегодня",
    viewed: false,
  },
  {
    id: 2,
    userName: "Татьяна", //ID 8
    action: "предлагает вам обмен",
    details: "Примите обмен, чтобы обсудить детали",
    time: "сегодня",
    viewed: false,
  },
  {
    id: 3,
    userName: "Олег", //ID 37
    action: "предлагает вам обмен",
    details: "Примите обмен, чтобы обсудить детали",
    time: "вчера",
    viewed: true,
  },
  {
    id: 4,
    userName: "Игорь", //ID 31
    action: "принял ваш обмен",
    details: "Перейдите в профиль, чтобы обсудить детали",
    time: "23 мая",
    viewed: true,
  },
];

export const NotificationWidget: FC<NotificationWidgetProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const newNotifications = notifications.filter((n) => !n.viewed);
  const viewedNotifications = notifications.filter((n) => n.viewed);

  const handleMarkAllAsRead = () => {
    console.log("Все уведомления отмечены как прочитанные");
  };

  const handleClearAll = () => {
    console.log("Все просмотренные уведомления очищены");
  };

  return (
    <div className={styles.widget}>
      <div className={styles.content}>
        {/* Заголовок с кнопкой "Прочитать все" */}
        <div className={styles.header}>
          <h2 className={styles.title}>Новые уведомления</h2>
          <button
            className={styles.markAllButton}
            onClick={handleMarkAllAsRead}
          >
            <span className={styles.markAllText}>Прочитать все</span>
          </button>
        </div>

        {/* Новые уведомления */}
        <div className={styles.notificationsSection}>
          {newNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              isNew={true}
            />
          ))}
        </div>

        {/* Заголовок для просмотренных уведомлений */}
        <div className={styles.header}>
          <h2 className={styles.title}>Просмотренные</h2>
          <button className={styles.clearButton} onClick={handleClearAll}>
            <span className={styles.clearText}>Очистить</span>
          </button>
        </div>

        {/* Просмотренные уведомления */}
        <div className={styles.viewedSection}>
          {viewedNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              isNew={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const NotificationCard: FC<{ notification: Notification; isNew: boolean }> = ({
  notification,
  isNew,
}) => (
  <div className={`${styles.notificationCard} ${isNew ? "" : styles.viewed}`}>
    <div className={styles.iconContainer}>
      <Icon name="idea" size={40} />
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
        <Button size={114} colored>
          Перейти
        </Button>
      </div>
    )}
  </div>
);
