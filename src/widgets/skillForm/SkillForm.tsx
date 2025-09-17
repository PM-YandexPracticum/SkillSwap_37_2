import { useState } from 'react'
import { Input } from '../../shared/ui/input/Input'
import { Dropdown } from '../../shared/ui/input/input-dropdown/InputDropdown'
import styles from './SkillForm.module.css'
import { skillCategoryOptions, skillSubCategoryOptions } from './skillData'
import { ButtonUI } from '../../shared/ui/button/ButtonUI'
import { DragDrop } from '../../shared/ui/dragdrop/DragDrop'

export const SkillForm = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('')

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

  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <fieldset className={styles.inputGroup}>
          <Input label='Название навыка' placeholder='Введите название вашего навыка' id='1'></Input>
          <Dropdown
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  options={skillCategoryOptions}
                  label="Категория навыка"
                  placeholder="Выберите категорию навыка"
                  id='2'
                />
          <Dropdown
                  value={selectedSubCategory}
                  onChange={handleSubCategoryChange}
                  options={skillSubCategoryOptions}
                  label="Подкатегория навыка"
                  placeholder="Выберите подкатегорию навыка"
                  id='3'
                />
          <label className={styles.label}>
            {'Описание'}
            <textarea placeholder='Коротко опишите, чему можете научить' className={styles.textarea}></textarea>
          </label>
          <DragDrop/>
        </fieldset>
        <div className={styles.buttonGroup}>
          <ButtonUI label={'Назад'}></ButtonUI>
          <ButtonUI label={'Продолжить'} colored={true}></ButtonUI>
        </div>
      </form>
    </div>
  )
} 