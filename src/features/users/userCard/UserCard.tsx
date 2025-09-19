import { SkillName } from '../../../shared/types/SkillName';
import like from '../../../shared/assets/icons/like.png';
import styles from './UserCard.module.css';
import { ButtonUI } from '../../../shared/ui/button/ButtonUI';
import { SkillTag } from '../../skills/skillTag/SkillTag';
import { TPlace } from '../../../api/types';

type UserCardProps = {
  name: string;
  from: string;
  age: string;
  avatar: string;
  learnSkills: number[];
  teachSkills: SkillName;
  subCategories: TPlace[]
};

export const UserCard = ({
  name, from, age, avatar, learnSkills, teachSkills, subCategories }: UserCardProps) => {
      return (
        <article className={styles.card}>
          <section className={styles.userInfo}>
            <div className={styles.userInfoContainer}>
              <img src={avatar} alt='фото профиля' className={styles.avatar}/>
              <div className={styles.infoWrapper}>
                <p className={styles.userName}>{name}</p>
                <p className={styles.fromAge}>{`${from}, ${age}`}</p>
              </div>
            </div>
            <img src={like} alt='лайк' className={styles.like}/>
          </section>

          <section>
            <div className={styles.canTeach}>
              <p className={styles.bid}>Может научить</p>
              <ul className={styles.tagWrapper}>
                <SkillTag skill={teachSkills} />
              </ul>
            </div>
            <div>
              <p className={styles.bid}>Хочет научиться</p>
              <ul className={styles.tagWrapper}>
                {learnSkills.map((item, index) => {
                  const subcat = subCategories.find(i => i.id === item);
                  return (
                    <li
                      key={index}
                      className={styles.tag}>
                    <SkillTag 
                      skill={subcat?.name as SkillName} />
                    </li>
                )})}
                <li>
                  <SkillTag
                    rest={Number(Math.floor(Math.random() * 5) + 2)} />
                </li>
              </ul>
            </div>
          </section>

          <ButtonUI colored label='Подробнее' className={styles.button} />
        </article>
    );
};
