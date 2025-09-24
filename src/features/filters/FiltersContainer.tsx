import React from "react";
import styles from "./FiltersContainer.module.css";

interface FiltersContainerProps {
  children: React.ReactNode;
  title?: string;
  onReset?: () => void;
  resetLabel?: string;
}

export const FiltersContainer: React.FC<FiltersContainerProps> = ({
  children,
  title = "Фильтры",
  onReset,
  resetLabel = "Сбросить",
}) => {
  return (
    <aside className={styles.filtersContainer}>
      <div className={styles.filtersHeader}>
        <h2 className={styles.filtersTitle}>{title}</h2>
        {onReset && (
          <button type="button" className={styles.resetButton} onClick={onReset}>
            {resetLabel}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.7438 8.28919L8.25847 16.7745C7.96856 17.0644 7.48772 17.0644 7.19781 16.7745C6.9079 16.4846 6.9079 16.0037 7.19781 15.7138L15.6831 7.22853C15.973 6.93861 16.4538 6.93861 16.7438 7.22853C17.0337 7.51844 17.0337 7.99927 16.7438 8.28919Z" fill="#508826"/>
              <path d="M16.7438 16.7734C16.4538 17.0633 15.973 17.0633 15.6831 16.7734L7.19781 8.28814C6.9079 7.99823 6.9079 7.5174 7.19781 7.22748C7.48772 6.93757 7.96856 6.93757 8.25847 7.22748L16.7438 15.7128C17.0337 16.0027 17.0337 16.4835 16.7438 16.7734Z" fill="#508826"/>
            </svg>
          </button>
        )}
      </div>

      <div className={styles.filtersContent}>{children}</div>
    </aside>
  );
};
