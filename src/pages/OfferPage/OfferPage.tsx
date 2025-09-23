import { RootState } from '@store';
import { useSelector } from 'react-redux';
import { UserCard } from '../../features/users/userCard/UserCard';
import { getUser } from '../../services/user/user-slice';
import { birthdayToFormatedAge, getImageUrl } from '../../shared/lib/helpers';
import { Icon } from '../../shared/ui/icon/Icon';
import { CardShowcase } from '../../widgets/cardShowcase/CardShowcase';
import { CardSlider } from '@widgets';
import styles from './OfferPage.module.css';
import { SkillCardDetails } from '../../features/skills/Skill Card/skillCardDetails';

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

// type UserCardProps = {
// };

export const OfferPage = () => {
  
  const subCategories = useSelector((s: RootState) => s.categories.subcategories);
  const user = useSelector(getUser);
  const { users, isLoading, hasMore, page } = useSelector(
    (state: RootState) => state.users
  );

  return (
    <>
      <div>
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
      </div>
      <CardShowcase
        title="Похожие предложения"
        icon={<Icon name="chevronRight" />}>
          <CardSlider users={users} subCategories={subCategories} />
      </CardShowcase>
    </>
  )
};
