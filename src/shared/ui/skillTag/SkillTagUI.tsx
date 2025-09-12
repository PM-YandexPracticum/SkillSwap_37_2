import styles from './SkillTagUI.module.css'

// Компонент SkillTag с логикой можно найти в папке features

type SkillTagUIProps = {
  label: string;
  backgroundColor: string;
};

export const SkillTagUI = ({ label, backgroundColor }: SkillTagUIProps) => {
  return (
    <div className={styles.tag} style={{ backgroundColor }}>
      {label}
    </div>
  );
};
