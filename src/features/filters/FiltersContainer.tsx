import React from 'react';
import styles from './FiltersContainer.module.css';

interface FiltersContainerProps {
  children: React.ReactNode;
  title?: string;
}

export const FiltersContainer: React.FC<FiltersContainerProps> = ({
  children,
  title = 'Фильтры'
}) => {
  return (
    <aside className={styles.filtersContainer}>
      <h2 className={styles.filtersTitle}>{title}</h2>
      <div className={styles.filtersContent}>
        {children}
      </div>
    </aside>
  );
};