// src\shared\ui\search-bar\SearchBar.tsx

import { FC, ChangeEvent } from "react";
import styles from "./SearchBar.module.css";
import { Icon } from "../icon/Icon";

interface SearchBarProps {
  width?: number;
  placeholder?: string;
  value: string;
  onChange: (q: string) => void;
}

export const SearchBar: FC<SearchBarProps> = ({
  width = 527,
  placeholder = "Искать навык",
  value,
  onChange
}) => {
  return (
    <div className={styles.searchWrapper} style={{ width }}>
      <Icon name="search" size="s" className={styles.iconSearch} />
      <input
        type="search"
        className={styles.search}
        placeholder={placeholder}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      />
    </div>
  );
};
