import React, { useState, useEffect } from 'react';
import styles from './FilterSection.module.css';
import { Icon } from '../../shared/ui/icon/Icon';

interface FilterSectionProps {
  onGenderChange: (value: string) => void;
  onPlaceChange: (value: string[]) => void;
  selectedGender: string;
  selectedPlaces: string[];
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  onGenderChange,
  onPlaceChange,
  selectedGender,
  selectedPlaces
}) => {
  const [places, setPlaces] = useState<{id: number; name: string}[]>([]);
  const [showAllPlaces, setShowAllPlaces] = useState(false);

  useEffect(() => {
    fetch('/db/places.json')
      .then(response => response.json())
      .then(data => setPlaces(data.places || []))
      .catch(error => console.error('Ошибка загрузки городов:', error));
  }, []);

  const mainPlaces = places.slice(0, 5);
  const otherPlaces = places.slice(5);

  // Обработчик выбора отдельного города
  const handlePlaceToggle = (placeId: string) => {
    const newPlace = selectedPlaces.includes(placeId)
      ? selectedPlaces.filter(id => id !== placeId)
      : [...selectedPlaces, placeId];
    onPlaceChange(newPlace);
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
          {mainPlaces.map((place) => (
            <label key={place.id} className={styles.item}>
              <input
                type="checkbox"
                checked={selectedPlaces.includes(place.id.toString())}
                onChange={() => handlePlaceToggle(place.id.toString())}
                className={styles.input}
              />
              <span className={styles.checkbox}></span>
              <span className={styles.text}>{place.name}</span>
            </label>
          ))}
          
          {/* Переключатель с выпадающим списком */}
          <div className={styles.toggle} onClick={() => setShowAllPlaces(!showAllPlaces)}>
            <span className={styles.text}>Все города</span>
            <Icon 
              name={showAllPlaces ? "chevronUp" : "chevronDown"} 
              size="s" 
              className={styles.icon}
            />
          </div>
        </div>

        {/* Выпадающий список со всеми остальными городами */}
        {showAllPlaces && otherPlaces.length > 0 && (
          <div className={styles.dropdown}>
            <div className={styles.items}>
              {otherPlaces.map((place) => (
                <label key={place.id} className={styles.item}>
                  <input
                    type="checkbox"
                    checked={selectedPlaces.includes(place.id.toString())}
                    onChange={() => handlePlaceToggle(place.id.toString())}
                    className={styles.input}
                  />
                  <span className={styles.checkbox}></span>
                  <span className={styles.text}>{place.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};