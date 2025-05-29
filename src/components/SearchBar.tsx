import React from 'react';
import styles from '../styles/SearchBar.module.css';
import {SearchBarProps} from "../types";

const SearchBar: React.FC<SearchBarProps> = ({searchQuery, onSearchChange}) => {
    return (
        <div className={styles.searchContainer}>
            <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className={styles.searchInput}
            />
        </div>
    );
};

export default SearchBar;