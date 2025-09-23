import { RootState, useDispatch } from '@store';
import { useSelector } from 'react-redux';
import { UserCard } from '../../features/users/userCard/UserCard';
import { getUser } from '../../services/user/user-slice';
import { birthdayToFormatedAge, getImageUrl } from '../../shared/lib/helpers';
import { Icon } from '../../shared/ui/icon/Icon';
import { CardShowcase } from '../../widgets/cardShowcase/CardShowcase';
import { CardSlider } from '@widgets';
import styles from './OfferPage.module.css';
import { SkillCardDetails } from '../../features/skills/Skill Card/skillCardDetails';
import { useEffect } from 'react';
import { getUserThunk } from '../../services/user/actions';
import { getCategoriesThunk } from '../../services/categories/actions';

const mySkill = {
    title: "Игра на барабанах",
    subtitle: "Творчество и искусство / Музыка и звук",
    description:
      "Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без партитуры.",
    mainImage: "public/db/skills-photo/drums-1.jpg",
    smallImages: [
      "/public/db/skills-photo/drums-2.jpg",
      "/public/db/skills-photo/drums-3.jpg",
      "/db/skills-photo/+3.png",
    ],
    icons: [
      "src/shared/assets/icons/like.png",
      "src/shared/assets/icons/share.png",
      "src/shared/assets/icons/more-square.png",
    ],
    buttonText: "Предложить обмен",
  };

export const OfferPage: React.FC = () => {
  
    const API_USER_ID = Number(import.meta.env.VITE_AUTH_USER_ID);
    const dispatch = useDispatch();
  
    const subCategories = useSelector((s: RootState) => s.categories.subcategories);
    const user = useSelector(getUser);
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
        {user && (
                  <UserCard
                    name={user.name}
                    from={user.from}
                    age={birthdayToFormatedAge(user.birthdate)}
                    avatar={getImageUrl(user.photo)}
                    about={user.about}
                    teachSkills={user.skill}
                    learnSkills={user.need_subcat}
                    subCategories={subCategories}
                  />
                )}
        <SkillCardDetails skill={mySkill}/>
      </section>

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
