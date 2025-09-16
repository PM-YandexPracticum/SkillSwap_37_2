import { SkillName } from '../../../shared/types/SkillName';
import like from '../../../shared/assets/icons/like.png';
import styles from './SkillCard.module.css';
import { ButtonUI } from '../../../shared/ui/button/ButtonUI';
import { SkillTag } from '../skillTag/SkillTag';
// import pgotos from '../../../../public/db/users-photo'
type SkillCardProps = {
  name: string;
  from: string;
  age: number;
  avatar: string;
  learnSkills: SkillName[];
  teachSkills: SkillName[];
};

export const SkillCard = ({
  name, from, age, avatar, learnSkills, teachSkills }: SkillCardProps) => {
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
                {teachSkills.map((item, index) => {
                  return (
                    <li key={index}>
                      <SkillTag skill={item} />
                    </li>
                  )
                })}
              </ul>
            </div>
            <div>
              <p className={styles.bid}>Хочет научиться</p>
              <ul className={styles.tagWrapper}>
                {learnSkills.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={styles.tag}>
                    <SkillTag 
                      skill={item} />
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
