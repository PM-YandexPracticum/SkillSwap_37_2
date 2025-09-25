import styles from './OverlayUI.module.css'

export const OverlayUI = ({ onClick }: { onClick: () => void }) => (
  <div className={styles.overlay} onClick={onClick} />
);