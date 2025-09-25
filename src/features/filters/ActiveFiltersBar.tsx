// src/features/filters/ActiveFiltersBar.tsx
import React from "react";
import styles from "./ActiveFiltersBar.module.css";
import { TSkillType } from "shared/types/filters";


// Поддержим разные варианты названия поля у категорий
type Category = { id: string | number; name?: string; title?: string };

type Props = {
  selectedSkillType: TSkillType;
  selectedCategories: string[];
  categories: Category[];

  onSkillTypeChange: (value: TSkillType) => void;
  onCategoryToggle: (categoryId: string) => void;

  selectedGender: string;
  onChangeGender: (value: string) => void;

  selectedPlaces: number[];
  onChangePlaces: (values: number[]) => void;
};

const placeLabel = (id: number) => String(id);

const skillTypeLabel: Record<string, string> = {
  all: "Все навыки",
  "want-to-learn": "Хочу научиться",
  "can-teach": "Могу научить",
};

const genderLabel: Record<string, string> = {
  male: "Мужчины",
  female: "Женщины",
  "": "Пол не выбран",
};

export const ActiveFiltersBar: React.FC<Props> = (props) => {
  const {
    selectedSkillType, selectedCategories, categories,
    onSkillTypeChange, onCategoryToggle,
    selectedGender, onChangeGender,
    selectedPlaces, onChangePlaces
  } = props;

  const chips: { key: string; label: string; onRemove: () => void }[] = [];

  if (selectedSkillType !== "all") {
    chips.push({
        key: "skillType",
        label: skillTypeLabel[selectedSkillType] ?? String(selectedSkillType),
        onRemove: () => onSkillTypeChange("all"),
    });
}

  selectedCategories.forEach((id) => {
    const cat = categories.find((c) => String(c.id) === String(id));
    chips.push({
      key: `cat-${id}`,
      label: cat?.name ?? cat?.title ?? id,
      onRemove: () => onCategoryToggle(id),
    });
  });

  if (selectedGender) {
    chips.push({
      key: "gender",
      label: genderLabel[selectedGender] ?? selectedGender,
      onRemove: () => onChangeGender(""),
    });
  }

  selectedPlaces.forEach((p) =>
    chips.push({
      key: `place-${p}`,
      label: placeLabel(p),
      onRemove: () =>
        onChangePlaces(selectedPlaces.filter((x) => x !== p)),
    })
  );

  if (!chips.length) return null;

  return (
    <div className={styles.wrap} role="region" aria-label="Активные фильтры">
        <div className={styles.chips}>
        {chips.map((chip) => (
            <span key={chip.key} className={styles.chip}>
            <span className={styles.chipText}>{chip.label}</span>
            <button
                type="button"
                className={styles.close}
                aria-label={`Убрать фильтр: ${chip.label}`}
                onClick={chip.onRemove}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.7438 8.28919L8.25847 16.7745C7.96856 17.0644 7.48772 17.0644 7.19781 16.7745C6.9079 16.4846 6.9079 16.0037 7.19781 15.7138L15.6831 7.22853C15.973 6.93861 16.4538 6.93861 16.7438 7.22853C17.0337 7.51844 17.0337 7.99927 16.7438 8.28919Z" fill="#253017"/>
                <path d="M16.7438 16.7734C16.4538 17.0633 15.973 17.0633 15.6831 16.7734L7.19781 8.28814C6.9079 7.99823 6.9079 7.5174 7.19781 7.22748C7.48772 6.93757 7.96856 6.93757 8.25847 7.22748L16.7438 15.7128C17.0337 16.0027 17.0337 16.4835 16.7438 16.7734Z" fill="#253017"/>
                </svg>
            </button>
            </span>
        ))}
        </div>
    </div>
    );
};
