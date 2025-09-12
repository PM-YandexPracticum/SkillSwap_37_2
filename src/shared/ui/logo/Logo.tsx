import { FC } from 'react';
import logo from '../../../shared/assets/icons/Logo.png';
import styles from './Logo.module.css';

export const LogoUI: FC = () => {
  return <img src={logo} alt="Logo" className={styles.logo} />
};