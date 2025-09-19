import { TSkillName } from '../../../shared/types/SkillName';
import like from '../../../shared/assets/icons/like.png';
import styles from './UserCard.module.css';
import { Button } from '../../../shared/ui/button/Button';
import { SkillTag } from '../../skills/skillTag/SkillTag';
import { TPlace } from '../../../api/types';
import { prepareSkillsToRender } from '../../../shared/lib/prepareSkillsToRender';

type UserCardProps = {
  name: string;
  from: string;
  age: string;
  avatar: string;
  teachSkills: TSkillName;
  learnSkills: number[];
  subCategories: TPlace[]
};

export const UserCard = ({
  name,
  from,
  age,
  avatar,
  teachSkills,
  learnSkills,
  subCategories
}: UserCardProps) => {

  // фича prepareSkillsToRender возвращает один или несколько скилов
  // таким образом, чтобы они уместились в строке целиком, без обрезания
  const {
    skillsCanRender,
    isRest,
    rest
  } = prepareSkillsToRender(learnSkills, subCategories);

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
          
          {/* на случай отката */}
          {/* так было до фичи prepareSkillsToRender */}
          
          {/* <ul className={styles.tagWrapper}>
              {learnSkills.map((item, index) => {
                const subcat = subCategories.find(i => i.id === item);
                return (
                  <li
                    key={index}
                    className={styles.tag}>
                  <SkillTag 
                    skill={subcat?.name as TSkillName} />
                  </li>
                )}
              )}

            <li>
              <SkillTag
                rest={Number(Math.floor(Math.random() * 5) + 2)} />
            </li>
          </ul> */}

          <ul className={styles.tagWrapper}>
              {skillsCanRender.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={styles.tag}>
                  <SkillTag 
                    skill={item as TSkillName} />
                  </li>
                )}
              )}

            {isRest && 
            <li>
              <SkillTag
                rest={rest} />
            </li>
            }
          </ul>
        </div>
      </section>

      <Button colored className={styles.button}>Подробнее</Button>
    </article>
  );
};
