// src\widgets\notifications-table\NotificationsTable.tsx

import { useEffect, useState } from 'react';
import { TNotificationEvent } from '@api/types';
import { getNotificationsApi } from '@api/Api';

type Props = {
  userId: number;
};

export const NotificationsTable = ({ userId }: Props) => {
  const [events, setEvents] = useState<TNotificationEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNotificationsApi(userId)
      .then((res) => setEvents(res.events))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <p>Загрузка...</p>;

  console.log(events)
  return (
    <table>
      <thead>
        <tr>
          <th>Тип</th>
          <th colSpan={2}>От кого</th>
          <th>Я Видел</th>
          <th>Дата</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event, i) => (
          <tr key={i}>
            <td>{event.type}</td>
            <td>{event.anotherUserId}</td>
            <td>{event.anotherUserName}</td>
            <td>{event.seen ? 'Да' : 'Нет'}</td>
            <td>{event.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
