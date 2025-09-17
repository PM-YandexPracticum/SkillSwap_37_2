import { FC } from 'react';
import styles from './SkillMenu.module.css';
import { Icon } from '../../shared/ui/icon/Icon';

export const SkillMenu: FC = () => {
  return(
    <div className={styles.container}>
      <menu className={styles.skillMenu}>
        
        <ul className={styles.category}>
        <Icon name='briefcase' color='#eee7f7'/>
        <div className={styles.div}>
            <li className={styles.category_title}>Бизнес и карьера</li>
            <li className={styles.li}>Управление командой</li>
            <li className={styles.li}>Маркетинг и реклама</li>
            <li className={styles.li}>Продажи и переговоры</li>
            <li className={styles.li}>Личный бренд</li>
            <li className={styles.li}>Резюме и собеседование</li>
        </div>
        </ul>
        <ul className={styles.category}>
        <Icon name='palette'/>
        <div className={styles.div}>
            <li className={styles.li}>Творчество и искусство</li>
            <li className={styles.li}>Рисование и илюстрация</li>
            <li className={styles.li}>Фотография</li>
            <li className={styles.li}>Видеомонтаж</li>
        </div>
        </ul>
        <ul className={styles.category}>
        <Icon name='global'/>
        <div className={styles.div}>
            <li className={styles.li}>Иностранные языки</li>
            <li className={styles.li}>2</li>
            <li className={styles.li}>3</li>
        </div>
        </ul>
        <ul className={styles.category}>
        <Icon name='briefcase'/>
        <div className={styles.div}>
            <li className={styles.li}>1</li>
            <li className={styles.li}>2</li>
            <li className={styles.li}>3</li>
        </div>
        </ul>
        <ul className={styles.category}>
        <Icon name='briefcase'/>
        <div className={styles.div}>
            <li className={styles.li}>1</li>
            <li className={styles.li}>2</li>
            <li className={styles.li}>3</li>
            </div>
        </ul>
      </menu>
    </div>
  );
};