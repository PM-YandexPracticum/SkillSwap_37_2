import { FC } from 'react';
import styles from './Header.module.css';
import { LogoUI } from '../../shared/ui/logo/Logo';
import search from '../../shared/assets/icons/search.png';
import chevronDown from '../../shared/assets/icons/chevron-down.png';
import moon from '../../shared/assets/icons/moon.png';
import { ButtonUI } from '../../shared/ui/button/ButtonUI';
import clsx from 'clsx';

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <LogoUI />
      <nav>
        <ul className={styles.navList}>
          <li className={styles.li}>
            <a href="#" className={styles.link}>О проекте</a>
          </li>
          <li className={styles.li}>
            <a href="#" className={styles.link}>Все навыки</a>
            <img src={chevronDown} alt="стрелка вниз" className={styles.iconChevron} />
          </li>
        </ul>
      </nav>
      <div className={styles.searchWrapper}>
        <img src={search} alt="лупа" className={styles.iconSearch} />
        <input type="search" className={styles.search} placeholder="Искать навык" />
      </div>
      <img src={moon} alt="луна" className={styles.iconMoon} />
      <div className={styles.buttonWrapper}>
        <div className={styles.loginWrapper}>
          <ButtonUI label="Войти" />
        </div>
        <div className={styles.registryWrapper}>
          <ButtonUI label="Зарегистрироваться" colored />
        </div>
      </div>
    </header>
  );
};
