import React, { useState } from 'react';
import styles from './SkillFilters.module.css';
import { Icon } from '../../shared/ui/icon/Icon';
import { TCategory, TSubcategory } from '../../api/types';
import { TSkillType } from '../../shared/types/filters';

interface SkillFiltersProps {
  onSkillTypeChange: (type: TSkillType) => void;
  onCategoryToggle: (categoryId: string) => void;
  selectedSkillType: TSkillType;
  selectedCategories: string[];
  categories: TCategory[];
  subcategories: TSubcategory[];
}

export const SkillFilters: React.FC<SkillFiltersProps> = ({
  onSkillTypeChange,
  onCategoryToggle,
  selectedSkillType,
  selectedCategories,
  categories = [],
  subcategories = [],
}) => {
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  const skillTypeGroupId = React.useId();

  const handleCategoryExpand = (categoryId: number) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const getSubcategoriesForCategory = (categoryId: number) => {
    return subcategories.filter(sub => sub.categoryId === categoryId);
  };

  const handleSkillTypeChange = (value: string): TSkillType => {
    if (value === 'all' || value === 'want-to-learn' || value === 'can-teach') {
      return value as TSkillType;
    }
    return 'all';
  };

  if (!categories || !Array.isArray(categories)) {
    return <div className={styles.skillFilters}>Загрузка категорий...</div>;
  }

  return (
    <div className={styles.skillFilters}>
      {/* Фильтр по типу навыка */}
      <div className={styles.group}>
        <h3 className={styles.title}>Тип навыка</h3>
        <div className={styles.items}>
          <label className={styles.item}>
            <input
              type="radio"
              name={`skill-type-${skillTypeGroupId}`}
              value="all"
              checked={selectedSkillType === 'all'}
              onChange={(e) => onSkillTypeChange(handleSkillTypeChange(e.target.value))}
              className={styles.input}
            />
            <span className={styles.radio}></span>
            <span className={styles.text}>Все</span>
          </label>
          <label className={styles.item}>
            <input
              type="radio"
              name={`skill-type-${skillTypeGroupId}`}
              value="want-to-learn"
              checked={selectedSkillType === 'want-to-learn'}
              onChange={(e) => onSkillTypeChange(handleSkillTypeChange(e.target.value))}
              className={styles.input}
            />
            <span className={styles.radio}></span>
            <span className={styles.text}>Хочу научиться</span>
          </label>
          <label className={styles.item}>
            <input
              type="radio"
              name={`skill-type-${skillTypeGroupId}`}
              value="can-teach"
              checked={selectedSkillType === 'can-teach'}
              onChange={(e) => onSkillTypeChange(handleSkillTypeChange(e.target.value))}
              className={styles.input}
            />
            <span className={styles.radio}></span>
            <span className={styles.text}>Могу научить</span>
          </label>
        </div>
      </div>

      {/* Фильтр по категориям навыков */}
      <div className={styles.group}>
        <h3 className={styles.title}>Навыки</h3>
        <div className={styles.items}>
          {categories.map((category) => {
            const categorySubs = getSubcategoriesForCategory(category.id);
            const isExpanded = expandedCategories.includes(category.id);
            const hasSubcategories = categorySubs.length > 0;

            return (
              <div key={category.id} className={styles.categoryItem}>
                <div className={styles.categoryHeader}>
                  <label className={styles.item}>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id.toString())}
                      onChange={() => onCategoryToggle(category.id.toString())}
                      className={styles.input}
                    />
                    <span className={styles.checkbox}></span>
                    <span className={styles.text}>{category.name}</span>
                  </label>
                  
                  {hasSubcategories && (
                    <button 
                      className={styles.expandButton}
                      onClick={() => handleCategoryExpand(category.id)}
                    >
                      <Icon 
                        name={isExpanded ? "chevronUp" : "chevronDown"} 
                        size="s" 
                      />
                    </button>
                  )}
                </div>

                {isExpanded && hasSubcategories && (
                  <div className={styles.subcategories}>
                    {categorySubs.map((subcategory) => (
                      <label key={subcategory.id} className={`${styles.item} ${styles.subcategoryItem}`}>
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(subcategory.id.toString())}
                          onChange={() => onCategoryToggle(subcategory.id.toString())}
                          className={styles.input}
                        />
                        <span className={styles.checkbox}></span>
                        <span className={styles.text}>{subcategory.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};