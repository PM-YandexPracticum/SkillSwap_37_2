// src\widgets\offersTable\OffersTable.tsx

// import { useEffect, useState } from 'react';
// import { renderOffersTableHtml } from '../../shared/lib/offer-table';

import { getOffersForUser, TOfferResult } from '../../api/Api';
import { useEffect, useState } from 'react';


type Props = {
  userId: number;
};

export const OffersTable = ({ userId }: Props) => {
  const [offers, setOffers] = useState<TOfferResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOffersForUser(userId)
      .then(setOffers)
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <p>Загрузка...</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Кто предложил</th>
          <th>Кому</th>
          <th>Подтверждено</th>
          <th>Просмотрено</th>
          <th>Дата предложения</th>
          <th>Дата подтверждения</th>
        </tr>
      </thead>
      <tbody>
        {offers.map((offer, i) => (
          <tr key={i}>
            <td>{offer.offerUserName}</td>
            <td>{offer.skillOwnerName}</td>
            <td>{offer.confirm ? 'Да' : 'Нет'}</td>
            <td>{offer.sawOffer ? 'Да' : 'Нет'}</td>
            <td>{offer.offerDate || '-'}</td>
            <td>{offer.confirmDate || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};