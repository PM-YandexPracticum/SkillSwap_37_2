// src\features\users\userCard\UserCard.tsx

import { TSkillName } from "../../../shared/types/SkillName";
// import like from "../../../shared/assets/icons/like.png";
import { Icon } from '../../../shared/ui/icon/Icon';
import styles from "./UserCard.module.css";
import { Button } from "../../../shared/ui/button/Button";
import { SkillTag } from "../../skills/skillTag/SkillTag";
import { TPlace } from "../../../api/types";
import { prepareSkillsToRender } from "../../../shared/lib/prepareSkillsToRender";
import { useDispatch } from '@store';
import { toggleLike } from '../../../services/users/users-slice';


type UserCardProps = {
  id: number; 
  name: string;
  from: string;
  age: string;
  avatar: string;
  about?: string; //если есть, рендерит карточку с "о себе"
  teachSkills: TSkillName;
  learnSkills: number[];
  subCategories: TPlace[];
  likedByMe: boolean;
  onDetailsClick?: () => void;
};

export const UserCard = ({
  id,
  name,
  from,
  age,
  avatar,
  about,
  teachSkills,
  learnSkills,
  subCategories,
  likedByMe,
  onDetailsClick
}: UserCardProps) => {
  // фича prepareSkillsToRender возвращает массив скилов
  // таким образом, чтобы они уместились в строке целиком, без обрезания
  const { skillsCanRender, isRest, rest } = prepareSkillsToRender(
    learnSkills,
    subCategories
  );

  const dispatch = useDispatch();
  
  return about ? (
    <article
      className={styles.card}
      style={{ padding: "32px", maxHeight: "27.75em" }}
    >
      <section className={styles.userInfo}>
        <div className={styles.userInfoContainer}>
          <img src={avatar} alt="фото профиля" className={styles.avatar} />
          <div className={styles.infoWrapper}>
            <p className={styles.userName}>{name}</p>
            <p className={styles.fromAge}>{`${from}, ${age}`}</p>
          </div>
        </div>
      </section>

      <section className={styles.about}>
        <p>{about}</p>
      </section>

      <section>
        <div className={styles.canTeach} style={{ marginBottom: "1.5em" }}>
          <p className={styles.offer} style={{ marginBottom: "0.875em" }}>
            Может научить
          </p>
          <ul className={styles.tagWrapper}>
            <SkillTag skill={teachSkills} />
          </ul>
        </div>
        <div>
          <p className={styles.offer} style={{ marginBottom: "0.875em" }}>
            Хочет научиться
          </p>
          <ul className={styles.tagWrapper}>
            {skillsCanRender.map((item, index) => {
              return (
                <li key={index} className={styles.tag}>
                  <SkillTag skill={item as TSkillName} />
                </li>
              );
            })}

            {isRest && (
              <li>
                <SkillTag rest={rest} />
              </li>
            )}
          </ul>
        </div>
      </section>
    </article>
  ) : (
    <article className={styles.card}>
      <section className={styles.userInfo}>
        <div className={styles.userInfoContainer}>
          <img src={avatar} alt="фото профиля" className={styles.avatar} />
          <div className={styles.infoWrapper}>
            <p className={styles.userName}>{name}</p>
            <p className={styles.fromAge}>{`${from}, ${age}`}</p>
          </div>
        </div>

        <Icon
          name={likedByMe ? 'like-active' : 'like'}
          alt={likedByMe ? 'уже лайкнул' : 'поставить лайк'}
          className={styles.like}
          onClick={() => dispatch(toggleLike(id))}
        />        

      </section>

      <section>
        <div className={styles.canTeach}>
          <p className={styles.offer}>Может научить</p>
          <ul className={styles.tagWrapper}>
            <SkillTag skill={teachSkills} />
          </ul>
        </div>
        <div>
          <p className={styles.offer}>Хочет научиться</p>
          <ul className={styles.tagWrapper}>
            {skillsCanRender.map((item, index) => {
              return (
                <li key={index} className={styles.tag}>
                  <SkillTag skill={item as TSkillName} />
                </li>
              );
            })}

            {isRest && (
              <li>
                <SkillTag rest={rest} />
              </li>
            )}
          </ul>
        </div>
      </section>
 
      <Button colored className={styles.button} onClick={onDetailsClick}>
        Подробнее
      </Button>
    </article>
  );
};
