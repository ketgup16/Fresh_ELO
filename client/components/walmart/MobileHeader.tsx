import { useState } from 'react';
import { Search } from '@/components/icons';
import { useNavigate } from 'react-router-dom';
import styles from './MobileHeader.module.css';

export function MobileHeader() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/walmart/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className={styles.header}>
      {/* Top row: logo */}
      <div className={styles.topRow}>
        <a
          href="/walmart"
          onClick={(e) => { e.preventDefault(); navigate('/walmart'); }}
          className={styles.logo}
          aria-label="Walmart Homepage"
        >
          <img
            src="https://i5.walmartimages.com/dfw/63fd9f59-14e2/9d304ce6-96de-4331-b8ec-c5191226d378/v1/spark-icon.svg"
            alt="Walmart"
            width="32"
            height="32"
          />
        </a>
      </div>

      {/* Search row */}
      <form className={styles.searchRow} onSubmit={handleSearchSubmit} role="search">
        <div className={styles.searchBox}>
          <Search className={styles.searchIcon} width={18} height={18} aria-hidden="true" />
          <input
            type="search"
            placeholder="Search everything at Walmart online and in store"
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search Walmart"
          />
        </div>
      </form>
    </header>
  );
}
