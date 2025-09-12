import clsx from 'clsx';
import styles from './ButtonUI.module.css';

type ButtonProps = {
  label: string;
  colored?: boolean;
  onClick: () => void;
};

export const ButtonUI = ({ label, colored, onClick }: ButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className={clsx(
        styles.button,
        colored && styles.colored)}>
      {label}
    </button>
  )
};