import clsx from 'clsx';
import styles from './ButtonUI.module.css';

type ButtonProps = {
  label: string;
  colored?: boolean;
  onClick?: () => void;
  className?: string;
};

export const ButtonUI = ({ label, colored, onClick, className }: ButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className={clsx(
        styles.button,
        colored && styles.colored, className)}>
      {label}
    </button>
  )
};