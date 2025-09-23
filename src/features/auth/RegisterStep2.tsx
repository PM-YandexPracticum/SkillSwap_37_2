import React, { useState, useEffect } from "react";
import styles from "./RegisterStep2.module.css";
import { Button } from "../../shared/ui/button/Button";
import { Input } from "../../shared/ui/input/Input";
import { DatePicker } from "../../shared/ui/date-picker/DatePicker";
import { Dropdown } from "../../shared/ui/input/input-dropdown/InputDropdown";
import { GroupedSubcategoryDropdown } from "../../shared/ui/input/input-dropdown/GroupedSubcategoryDropdown";
import { genderOptions } from "../../shared/ui/input/input-dropdown/dropdownData";
import {
  getSkillsCategoriesApi,
  getSkillsSubCategoriesApi,
  getPlacesApi,
} from "../../api/Api";
import { TCategory, TSubcategory, TPlace } from "../../api/types";
import { Icon } from "../../shared/ui/icon/Icon";

interface RegisterStep2Props {
  onBack: () => void;
  onContinue: (data: RegisterStep2Data) => void;
  initialData?: Partial<RegisterStep2Data>;
}

export interface RegisterStep2Data {
  name: string;
  birthdate: Date | null;
  gender: string;
  city: string;
  selectedCategories: string[];
  selectedSubcategories: string[];
  avatar?: string;
}

export const RegisterStep2: React.FC<RegisterStep2Props> = ({
  onBack,
  onContinue,
  initialData = {},
}) => {
  const [formData, setFormData] = useState<RegisterStep2Data>({
    name: initialData.name || "",
    birthdate: initialData.birthdate || null,
    gender: initialData.gender || "",
    city: initialData.city || "",
    selectedCategories: initialData.selectedCategories || [],
    selectedSubcategories: initialData.selectedSubcategories || [],
    avatar: initialData.avatar,
  });

  const [categories, setCategories] = useState<TCategory[]>([]);
  const [subcategories, setSubcategories] = useState<TSubcategory[]>([]);
  const [cities, setCities] = useState<TPlace[]>([]);
  const [loading, setLoading] = useState(true);

  // Загрузка данных
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, subcategoriesResponse, placesResponse] =
          await Promise.all([
            getSkillsCategoriesApi(),
            getSkillsSubCategoriesApi(),
            getPlacesApi(),
          ]);

        setCategories(categoriesResponse.categories);
        setSubcategories(subcategoriesResponse.subcategories);
        setCities(placesResponse.places || []);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (
    field: keyof RegisterStep2Data,
    value: string | Date | null | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange("avatar", e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue(formData);
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.birthdate !== null &&
      formData.gender !== "" &&
      formData.city !== "" &&
      formData.selectedCategories.length > 0 &&
      formData.selectedSubcategories.length > 0
    );
  };

  if (loading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  // Преобразование городов в формат для Dropdown
  const cityOptions = cities.map((city) => ({
    value: city.id.toString(),
    label: city.name,
  }));

  // Преобразование категорий в формат для Dropdown
  const categoryOptions = categories.map((category) => ({
    value: category.id.toString(),
    label: category.name,
  }));

  return (
    <div className={styles.registerStep2}>
      <div className={styles.content}>
        {/* Аватар */}
        <div className={styles.avatarSection}>
          <div className={styles.avatarContainer}>
            {formData.avatar ? (
              <img
                src={formData.avatar}
                alt="Аватар"
                className={styles.avatar}
              />
            ) : (
              <Icon
                name="userCircle"
                size={54}
                strokeWidth={0.5}
                className={styles.avatarIcon}
              />
            )}
            <label htmlFor="avatar-upload" className={styles.addButton}>
              <Icon name="add" size={16} className={styles.addIcon} />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: "none" }}
              />
            </label>
          </div>
        </div>

        {/* Форма */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label="Имя"
            value={formData.name}
            onChange={(value) => handleInputChange("name", value)}
            placeholder="Введите ваше имя"
            required={true}
          />

          <div className={styles.row}>
            <div className={styles.rowItem}>
              <DatePicker
                label="Дата рождения"
                selected={formData.birthdate}
                onChange={(date) => handleInputChange("birthdate", date)}
                placeholder="дд.мм.гггг"
              />
            </div>

            <div className={styles.rowItem}>
              <Dropdown
                label="Пол"
                value={formData.gender}
                onChange={(value) => handleInputChange("gender", value)}
                options={genderOptions}
                placeholder="Не указан"
              />
            </div>
          </div>

          <Dropdown
            label="Город"
            value={formData.city}
            onChange={(value) => handleInputChange("city", value)}
            options={cityOptions}
            placeholder="Не указан"
            searchable={true}
          />

          <Dropdown
            label="Категория навыка, которому хотите научиться"
            value={formData.selectedCategories}
            onChange={(value) => handleInputChange("selectedCategories", value)}
            options={categoryOptions}
            multiple={true}
            placeholder="Выберите категории"
          />

          <GroupedSubcategoryDropdown
            label="Подкатегория навыка, которому хотите научиться"
            selectedSubcategoryIds={formData.selectedSubcategories}
            onSubcategoryToggle={(subcategoryId) => {
              const newSubcategories = formData.selectedSubcategories.includes(
                subcategoryId
              )
                ? formData.selectedSubcategories.filter(
                    (id) => id !== subcategoryId
                  )
                : [...formData.selectedSubcategories, subcategoryId];
              handleInputChange("selectedSubcategories", newSubcategories);
            }}
            categories={categories}
            subcategories={subcategories}
            selectedCategoryIds={formData.selectedCategories}
            placeholder="Выберите подкатегории"
          />

          <div className={styles.buttons}>
            <Button
              type="button"
              size={208}
              onClick={onBack}
              className={styles.backButton}
            >
              Назад
            </Button>
            <Button
              type="submit"
              size={208}
              colored={true}
              disabled={!isFormValid()}
              className={styles.continueButton}
            >
              Продолжить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
