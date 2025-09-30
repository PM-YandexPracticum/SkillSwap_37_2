// src\pages\Offer\OfferPage.tsx

import { RootState } from '@store';
import { useSelector } from 'react-redux';
import { UserCard } from '../../features/users/userCard/UserCard';
import { Icon } from '../../shared/ui/icon/Icon';
import { CardShowcase } from '../../widgets/cardShowcase/CardShowcase';
import { CardSlider } from '@widgets';
import { SkillCardDetails } from '../../features/skills/Skill Card/skillCardDetails';
import { getOfferUser } from '../../services/users/users-slice';
import { Loader } from '../../shared/ui/loader/Loader';

import styles from './OfferPage.module.css';

export const OfferPage: React.FC = () => {
  
    const offerUser = useSelector(getOfferUser);
    
    const {users} = useSelector((state: RootState) => state.users);
  
  return (
    <>
      <section className={styles.skillSection}>
        <div className={styles.userCard}>
          {offerUser && (
            <UserCard
              needAbout
              user={offerUser}
            />
          )}
        </div>
        {offerUser && (
          <SkillCardDetails
              title={offerUser.skill || "Навык не указан"}
              subtitle={`${offerUser.cat_text || ""} / ${offerUser.sub_text || ""}`}
              description={offerUser.description || "Описание отсутствует"}
              images={offerUser.images || ""}
              buttonText={"Предложить обмен"}
          />)
        }
      </section>

      {!users && (
        <Loader />
      )}

{/* 
      похожие предложения должны браться из API
      к примеру у тебя 10000 пользователей. а загружено в users 100
      твой поиск будет только среди 100
 */}
     <section>
        <CardShowcase
          title="Похожие предложения"
          titleSize='1.5em'
          icon={<Icon name="chevronRight" />}>
            <CardSlider users={users}/>
        </CardShowcase>
      </section>
    </>
  )
};
