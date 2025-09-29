import { useState, useEffect } from "react";
import { Input } from "../../shared/ui/input/Input";
import { Dropdown } from "../../shared/ui/input/input-dropdown/InputDropdown";
import { Textarea } from "../../shared/ui/textarea/Textarea";
import { Button } from "../../shared/ui/button/Button";
import { DragDrop } from "../../shared/ui/dragdrop/DragDrop";
import { getSkillsCategoriesApi, getSkillsSubCategoriesApi } from "../../api/Api";
import { TCategory, TSubcategory } from "../../api/types";
import styles from "./SkillForm.module.css";

type SkillFormProps = {
  onBack: () => void;
  onContinue: () => void;
};

export const SkillForm: React.FC<SkillFormProps> = ({ onBack, onContinue }) => {
  const [skillName, setSkillName] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [subcategories, setSubcategories] = useState<TSubcategory[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<TSubcategory[]>([]);
  const [errors, setErrors] = useState({
    skillName: "",
    selectedCategory: "",
    selectedSubCategory: "",
    description: "",
  });

  // Загрузка категорий и подкатегорий
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await getSkillsCategoriesApi();
        const subcategoriesResponse = await getSkillsSubCategoriesApi();
        setCategories(categoriesResponse.categories || []);
        setSubcategories(subcategoriesResponse.subcategories || []);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };
    fetchData();
  }, []);

  // Фильтрация подкатегорий при выборе категории
  useEffect(() => {
    if (selectedCategory) {
      const filtered = subcategories.filter(
        (subcat) => subcat.categoryId.toString() === selectedCategory
      );
      setFilteredSubcategories(filtered);
      setSelectedSubCategory("");
    } else {
      setFilteredSubcategories(subcategories);
    }
  }, [selectedCategory, subcategories]);

  // Обработчики с очисткой ошибок
  const handleSkillNameChange = (value: string) => {
    setSkillName(value);
    if (value.trim()) setErrors((prev) => ({ ...prev, skillName: "" }));
  };

  const handleCategoryChange = (value: string | string[]) => {
    if (typeof value === "string") {
      setSelectedCategory(value);
      setErrors((prev) => ({ ...prev, selectedCategory: "" }));
    }
  };

  const handleSubCategoryChange = (value: string | string[]) => {
    if (typeof value === "string") {
      setSelectedSubCategory(value);
      setErrors((prev) => ({ ...prev, selectedSubCategory: "" }));
    }
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
    if (value.trim()) setErrors((prev) => ({ ...prev, description: "" }));
  };

  // Опции для Dropdown
  const categoryOptions = categories.map((category) => ({
    value: category.id.toString(),
    label: category.name,
  }));

  const subcategoryOptions = filteredSubcategories.map((subcategory) => ({
    value: subcategory.id.toString(),
    label: subcategory.name,
  }));

  // Валидация формы
  const validateForm = () => {
    const newErrors = {
      skillName: skillName.trim() ? "" : "Введите название навыка",
      selectedCategory: selectedCategory ? "" : "Выберите категорию",
      selectedSubCategory: selectedSubCategory ? "" : "Выберите подкатегорию",
      description: description.trim() ? "" : "Введите описание",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) onContinue();
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <fieldset className={styles.inputGroup}>
          <Input
            label="Название навыка"
            placeholder="Введите название вашего навыка"
            value={skillName}
            onChange={handleSkillNameChange}
            id="skillName"
            status={errors.skillName ? "error" : "default"}
            errorMessage={errors.skillName}
          />

          <Dropdown
            value={selectedCategory}
            onChange={handleCategoryChange}
            options={categoryOptions}
            label="Категория навыка"
            placeholder="Выберите категорию"
          />
          {errors.selectedCategory && (
            <div className={styles.error}>{errors.selectedCategory}</div>
          )}

          <Dropdown
            value={selectedSubCategory}
            onChange={handleSubCategoryChange}
            options={subcategoryOptions}
            label="Подкатегория навыка"
            placeholder="Выберите подкатегорию"
          />
          {errors.selectedSubCategory && (
            <div className={styles.error}>{errors.selectedSubCategory}</div>
          )}

          <Textarea
            label="Описание"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Коротко опишите, чему можете научить"
            rows={4}
            showEditIcon={false}
            status={errors.description ? "error" : "default"}
            errorMessage={errors.description}
          />

          <DragDrop />
        </fieldset>

        <div className={styles.buttonGroup}>
          <Button type="button" onClick={onBack} className={styles.backButton}>
            Назад
          </Button>
          <Button colored type="submit">
            Продолжить
          </Button>
        </div>
      </form>
    </div>
  );
};
