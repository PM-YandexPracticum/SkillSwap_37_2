// src\shared\ui\search-bar\SearchBar.tsx

import { FC } from "react";
import styles from "./SearchBar.module.css";
import { Icon } from "../icon/Icon";

interface SearchBarProps {
  width?: number;
  placeholder?: string;
}

export const SearchBar: FC<SearchBarProps> = ({
  width = 527,
  placeholder = "Искать навык",
}) => {
  return (
    <div className={styles.searchWrapper} style={{ width }}>
      <Icon name="search" size="s" className={styles.iconSearch} />
      <input
        type="search"
        className={styles.search}
        placeholder={placeholder}
      />
    </div>
  );
};
