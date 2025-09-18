import React, { useState, useEffect } from 'react';
import styles from './FilterSection.module.css';
import { Icon } from '../../shared/ui/icon/Icon';

interface FilterSectionProps {
  onGenderChange: (value: string) => void;
  onCityChange: (value: string[]) => void;
  selectedGender: string;
  selectedCities: string[];
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  onGenderChange,
  onCityChange,
  selectedGender,
  selectedCities
}) => {
  const [cities, setCities] = useState<{id: number; name: string}[]>([]);
  const [showAllCities, setShowAllCities] = useState(false);

  useEffect(() => {
    fetch('/db/places.json')
      .then(response => response.json())
      .then(data => setCities(data.places || []))
      .catch(error => console.error('Ошибка загрузки городов:', error));
  }, []);

  const mainCities = cities.slice(0, 5);
  const otherCities = cities.slice(5);

  // Обработчик выбора отдельного города
  const handleCityToggle = (cityId: string) => {
    const newCities = selectedCities.includes(cityId)
      ? selectedCities.filter(id => id !== cityId)
      : [...selectedCities, cityId];
    onCityChange(newCities);
  };

  return (
    <div className={styles.filter}>
      {/* Фильтр по полу */}
      <div className={styles.group}>
        <h3 className={styles.title}>Пол автора</h3>
        <div className={styles.items}>
                  <label className={styles.item}>
            <input
              type="radio"
              name="gender"
              value=""
              checked={selectedGender === ''}
              onChange={(e) => onGenderChange(e.target.value)}
              className={styles.input}
            />
            <span className={styles.radio}></span>
            <span className={styles.text}>Не имеет значения</span>
          </label>
          <label className={styles.item}>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={selectedGender === 'male'}
              onChange={(e) => onGenderChange(e.target.value)}
              className={styles.input}
            />
            <span className={styles.radio}></span>
            <span className={styles.text}>Мужской</span>
          </label>
          <label className={styles.item}>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={selectedGender === 'female'}
              onChange={(e) => onGenderChange(e.target.value)}
              className={styles.input}
            />
            <span className={styles.radio}></span>
            <span className={styles.text}>Женский</span>
          </label>
        </div>
      </div>

      {/* Фильтр по городу */}
      <div className={styles.group}>
        <h3 className={styles.title}>Город</h3>
        
        {/* Основные города */}
        <div className={styles.items}>
          {mainCities.map((city) => (
            <label key={city.id} className={styles.item}>
              <input
                type="checkbox"
                checked={selectedCities.includes(city.id.toString())}
                onChange={() => handleCityToggle(city.id.toString())}
                className={styles.input}
              />
              <span className={styles.checkbox}></span>
              <span className={styles.text}>{city.name}</span>
            </label>
          ))}
          
          {/* Переключатель с выпадающим списком */}
          <div className={styles.toggle} onClick={() => setShowAllCities(!showAllCities)}>
            <span className={styles.text}>Все города</span>
            <Icon 
              name={showAllCities ? "chevronUp" : "chevronDown"} 
              size="s" 
              className={styles.icon}
            />
          </div>
        </div>

        {/* Выпадающий список со всеми остальными городами */}
        {showAllCities && otherCities.length > 0 && (
          <div className={styles.dropdown}>
            <div className={styles.items}>
              {otherCities.map((city) => (
                <label key={city.id} className={styles.item}>
                  <input
                    type="checkbox"
                    checked={selectedCities.includes(city.id.toString())}
                    onChange={() => handleCityToggle(city.id.toString())}
                    className={styles.input}
                  />
                  <span className={styles.checkbox}></span>
                  <span className={styles.text}>{city.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};