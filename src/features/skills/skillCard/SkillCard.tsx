import { SkillName } from '../../../shared/types/SkillName';
import like from '../../../shared/assets/icons/like.png';
import styles from './SkillCard.module.css';
import { ButtonUI } from '../../../shared/ui/button/ButtonUI';
import { SkillTag } from '../skillTag/SkillTag';

type SkillCardProps = {
  name: string;
  from: string;
  age: number;
  avatar: string;
  learnSkill: SkillName;
  teachSkill: SkillName;
};

export const SkillCard = ({
  name, from, age, avatar, learnSkill, teachSkill }: SkillCardProps) => {
      return (
        <article className={styles.card}>
          <section className={styles.userInfo}>
            <div className={styles.userInfoContainer}>
              <img src={avatar} alt='фото профиля' className={styles.avatar}/>
              <div className={styles.infoWrapper}>
                <p>{name}</p>
                <p className={styles.fromAge}>{`${from}, ${age}`}</p>
              </div>
            </div>
            <img src={like} alt='лайк' className={styles.like}/>
          </section>

          <section>
            <div className={styles.canTeach}>
              <p className={styles.bid}>Может научить</p>
              <div className={styles.tagWrapper}>
                <SkillTag skill={teachSkill}/>
              </div>
            </div>
            <div>
              <p className={styles.bid}>Хочет научиться</p>
              <div className={styles.tagWrapper}>
              <SkillTag
                skill={learnSkill}/>
              <SkillTag
                skill={'Фотография'}/>
              <SkillTag
                rest={3}/>
              </div>
            </div>
          </section>

          <ButtonUI colored label='Подробнее' />
        </article>
    );
};
