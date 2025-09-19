import { useState, useEffect } from "react";
import { Input } from "../../shared/ui/input/Input";
import { Dropdown } from "../../shared/ui/input/input-dropdown/InputDropdown";
import styles from "./SkillForm.module.css";
import { Button } from "../../shared/ui/button/Button";
import { DragDrop } from "../../shared/ui/dragdrop/DragDrop";
import {
  getSkillsCategoriesApi,
  getSkillsSubCategoriesApi,
} from "../../api/Api";
import { TCategory, TSubcategory } from "../../api/types";

export const SkillForm = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [subcategories, setSubcategories] = useState<TSubcategory[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<
    TSubcategory[]
  >([]);

  // Загрузка данных
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await getSkillsCategoriesApi();
        const subcategoriesResponse = await getSkillsSubCategoriesApi();

        setCategories(categoriesResponse.categories);
        setSubcategories(subcategoriesResponse.subcategories);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };

    fetchData();
  }, []);

  // Фильтрация подкатегорий по выбранной категории
  useEffect(() => {
    if (selectedCategory) {
      const filtered = subcategories.filter(
        (subcat) => subcat.categoryId.toString() === selectedCategory
      );
      setFilteredSubcategories(filtered);
      // Сбрасываем выбранную подкатегорию при изменении категории
      setSelectedSubCategory("");
    } else {
      // Если категория не выбрана, показываем все подкатегории
      setFilteredSubcategories(subcategories);
    }
  }, [selectedCategory, subcategories]);

  const handleCategoryChange = (value: string | string[]) => {
    if (typeof value === "string") {
      setSelectedCategory(value);
    }
  };

  const handleSubCategoryChange = (value: string | string[]) => {
    if (typeof value === "string") {
      setSelectedSubCategory(value);
    }
  };

  // Преобразование категорий в формат для Dropdown
  const categoryOptions = categories.map((category) => ({
    value: category.id.toString(),
    label: category.name,
  }));

  // Преобразование подкатегорий в формат для Dropdown
  const subcategoryOptions = filteredSubcategories.map((subcategory) => ({
    value: subcategory.id.toString(),
    label: subcategory.name,
  }));

  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <fieldset className={styles.inputGroup}>
          <Input
            label="Название навыка"
            placeholder="Введите название вашего навыка"
            id="1"
          ></Input>
          <Dropdown
            value={selectedCategory}
            onChange={handleCategoryChange}
            options={categoryOptions}
            label="Категория навыка"
            placeholder="Выберите категорию навыка"
            id="2"
          />
          <Dropdown
            value={selectedSubCategory}
            onChange={handleSubCategoryChange}
            options={subcategoryOptions}
            label="Подкатегория навыка"
            placeholder="Выберите подкатегорию навыка"
            id="3"
          />
          <label className={styles.label}>
            {"Описание"}
            <textarea
              placeholder="Коротко опишите, чему можете научить"
              className={styles.textarea}
            ></textarea>
          </label>
          <DragDrop />
        </fieldset>
        <div className={styles.buttonGroup}>
          <Button>Назад</Button>
          <Button colored>Продолжить</Button>
        </div>
      </form>
    </div>
  );
};
