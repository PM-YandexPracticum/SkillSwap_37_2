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
            <td>{event.fromUserId}</td>
            <td>{event.fromUserName}</td>
            <td>{event.seen ? 'Да' : 'Нет'}</td>
            <td>{event.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// import { getNotificationsApi } from '@api/Api';
// import { TNotificationEvent } from '@api/types';
// import { useEffect, useState } from 'react';

// type Props = {
//   userId: number;
// };

// export const NotificationsTable = ({ userId }: Props) => {
//   const [events, setEvents] = useState<TNotificationEvent[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getNotificationsApi(userId)
//       .then((res) => setEvents(res.events))
//       .finally(() => setLoading(false));
//   }, [userId]);

//   if (loading) return <p>Загрузка...</p>;

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Тип</th>
//           <th>От кого</th>
//           <th>Видел</th>
//           <th>Дата</th>
//         </tr>
//       </thead>
//       <tbody>
//         {events.map((event, i) => (
//           <tr key={i}>
//             <td>{event.type}</td>
//             <td>{event.fromUserId}</td>
//             <td>{event.seen ? 'Да' : 'Нет'}</td>
//             <td>{event.date}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };



// // src\widgets\offersTable\OffersTable.tsx

// import { getOffersForUser } from '@api/Api';
// import { TOfferResult } from '@api/types';
// import { useEffect, useState } from 'react';


// type Props = {
//   userId: number;
// };

// export const OffersTable = ({ userId }: Props) => {
//   const [offers, setOffers] = useState<TOfferResult[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getOffersForUser(userId)
//       .then(setOffers)
//       .finally(() => setLoading(false));
//   }, [userId]);

//   if (loading) return <p>Загрузка...</p>;

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Кто предложил</th>
//           <th>Кому</th>
//           <th>Подтверждено</th>
//           <th>Просмотрено</th>
//           <th>Дата предложения</th>
//           <th>Дата подтверждения</th>
//         </tr>
//       </thead>
//       <tbody>
//         {offers.map((offer, i) => (
//           <tr key={i}>
//             <td>{offer.offerUserName}</td>
//             <td>{offer.skillOwnerName}</td>
//             <td>{offer.confirm ? 'Да' : 'Нет'}</td>
//             <td>{offer.sawOffer ? 'Да' : 'Нет'}</td>
//             <td>{offer.offerDate || '-'}</td>
//             <td>{offer.confirmDate || '-'}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };