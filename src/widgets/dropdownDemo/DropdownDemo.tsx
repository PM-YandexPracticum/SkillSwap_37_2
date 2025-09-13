import React, { useState } from "react";
import { Dropdown } from "../../shared/ui/input-dropdown/InputDropdown";
import {
  genderOptions,
  skillCategoryOptions,
} from "../../shared/ui/input-dropdown/dropdownData";

export const DropdownDemo = () => {
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Функция-обертка для одиночного выбора
  const handleGenderChange = (value: string | string[]) => {
    if (typeof value === "string") {
      setSelectedGender(value);
    }
  };

  // Функция-обертка для множественного выбора
  const handleCategoriesChange = (value: string | string[]) => {
    if (Array.isArray(value)) {
      setSelectedCategories(value);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      {/* Одиночный выбор - пол */}
      <Dropdown
        value={selectedGender}
        onChange={handleGenderChange}
        options={genderOptions}
        label="Пол"
        placeholder="Выберите пол"
      />

      {/* Множественный выбор - категории навыков */}
      <Dropdown
        value={selectedCategories}
        onChange={handleCategoriesChange}
        options={skillCategoryOptions}
        multiple={true}
        label="Категория навыка"
        placeholder="Выберите категории"
      />

      {/* Покажем выбранные значения для демонстрации */}
      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <h3>Выбранный пол: {selectedGender}</h3>
        <h3>Выбранные категории: {selectedCategories.join(", ")}</h3>
      </div>
    </div>
  );
};
