import { RootState, useDispatch } from '@store';
import { useSelector } from 'react-redux';
import { UserCard } from '../../features/users/userCard/UserCard';
import { getUser } from '../../services/user/user-slice';
import { birthdayToFormatedAge, getImageUrl } from '../../shared/lib/helpers';
import { Icon } from '../../shared/ui/icon/Icon';
import { CardShowcase } from '../../widgets/cardShowcase/CardShowcase';
import { CardSlider } from '@widgets';
import { SkillCardDetails } from '../../features/skills/Skill Card/skillCardDetails';
import { useEffect } from 'react';
import { getUserThunk } from '../../services/user/actions';
import { getCategoriesThunk } from '../../services/categories/actions';
import { getOfferUser } from '../../services/users/users-slice';

import styles from './OfferPage.module.css';

export const OfferPage: React.FC = () => {
  
  const API_USER_ID = Number(import.meta.env.VITE_AUTH_USER_ID);
  const dispatch = useDispatch();
  
    const subCategories = useSelector((s: RootState) => s.categories.subcategories);
    const offerUser = useSelector(getOfferUser);
    
    const { users, isLoading, hasMore, page } = useSelector(
      (state: RootState) => state.users
    );
  
    useEffect(() => {
      dispatch(getUserThunk(API_USER_ID));
      dispatch(getCategoriesThunk());
    }, [dispatch]);

  return (
    <>
      <section className={styles.skillSection}>
        <div className={styles.userCard}>
          {offerUser && (
                    <UserCard
                      needAbout
                      user={offerUser}
                      // id={user.id}
                      // likedByMe={user.likedByMe}
                      // name={user.name}
                      // from={user.from}
                      // age={birthdayToFormatedAge(user.birthdate)}
                      // avatar={getImageUrl(user.photo)}
                      // about={user.about}
                      // teachSkills={user.skill}
                      // learnSkills={user.need_subcat}
                      // subCategories={subCategories}
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

      {/* {offerUser && <SkillCardDetails
              checkEdit={true}
              title={offerUser.skill || "Навык не указан"}
              subtitle={`${offerUser.cat_text || ""} / ${offerUser.sub_text || ""}`}
              description={offerUser.description || "Описание отсутствует"}
              images={offerUser.images || ""}
              buttonText={"Готово"}
          />} */}

      <section>
        <CardShowcase
          title="Похожие предложения"
          icon={<Icon name="chevronRight" />}>
            <CardSlider users={users} subCategories={subCategories} />
        </CardShowcase>
      </section>
    </>
  )
};
