import { TCategory, TSubcategory } from "../../../api/types";
import { useMemo } from "react";
import styles from './SkillMenuCategory.module.css';

type SkillMenuCategoryProps = {
  categories: TCategory[];
  subcategories: TSubcategory[];
};

export const SkillMenuCategories = ({ categories, subcategories }: SkillMenuCategoryProps) => {
  const groupedCategories = useMemo(() => {
    return categories.map(category => ({
      category,
      subcategories: subcategories.filter(sub => sub.categoryId === category.id)
    }));
  }, [categories, subcategories]);

  return (
    <menu className={styles.skillMenu}>
      {groupedCategories.map((group, index) => (
        <li key={index} className={styles.category} style={{ backgroundColor: group.category.color }}>
          <img 
            src={`/icons/${group.category.icon}`} 
            alt={group.category.name} 
            className={styles.icon} 
          />
          <div className={styles.div}>
            <span className={styles.category_title}>{group.category.name}</span>
            {group.subcategories.length > 0 && (
              <ul className={styles.ul}>
                {group.subcategories.map((sub, subIndex) => (
                  <li key={subIndex} className={styles.li}>{sub.name}</li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </menu>
  );
};
