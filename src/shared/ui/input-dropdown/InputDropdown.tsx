import { FC, useState, useRef, useEffect } from "react";
import styles from "./InputDropdown.module.css";
import clsx from "clsx";
import { Icon } from "../icon/Icon";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  value: string | string[];
  onChange: (value: string | string[]) => void;
  options: DropdownOption[];
  placeholder?: string;
  multiple?: boolean;
  className?: string;
  id?: string;
  label?: string;
  disabled?: boolean;
}

export const Dropdown: FC<DropdownProps> = ({
  value,
  onChange,
  options,
  placeholder = "Выберите вариант",
  multiple = false,
  className,
  id = "dropdown",
  label,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Закрытие дропдауна при клике за пределами компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (optionValue: string) => {
    if (multiple) {
      const currentValue = Array.isArray(value) ? value : [];
      const newValue = currentValue.includes(optionValue)
        ? currentValue.filter(v => v !== optionValue)
        : [...currentValue, optionValue];
      
      onChange(newValue);
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  const getDisplayText = () => {
    if (multiple && Array.isArray(value) && value.length > 0) {
      return `Выбрано: ${value.length}`;
    }
    
    if (!multiple && value) {
      const selectedOption = options.find(opt => opt.value === value);
      return selectedOption?.label || placeholder;
    }
    
    return placeholder;
  };

  const isOptionSelected = (optionValue: string) => {
    if (multiple) {
      return Array.isArray(value) && value.includes(optionValue);
    }
    return value === optionValue;
  };

  return (
    <div 
      ref={dropdownRef}
      className={clsx(
        styles.dropdownGroup, 
        className,
        disabled && styles.disabled
      )}
    >
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.inputWrapper}>
        <button
          type="button"
          id={id}
          className={clsx(
            styles.dropdownButton,
            isOpen && styles.open,
            disabled && styles.disabled
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className={styles.selectedText}>{getDisplayText()}</span>
          <Icon 
            name={isOpen ? "chevronUp" : "chevronDown"} 
            size="s" 
            className={styles.chevronIcon}
          />
        </button>

        {isOpen && (
          <div className={styles.dropdownMenu} role="listbox">
            {options.map((option) => (
              <div
                key={option.value}
                className={clsx(
                  styles.option,
                  isOptionSelected(option.value) && styles.selected,
                  !multiple && isOptionSelected(option.value) && styles.singleSelected
                )}
                onClick={() => handleOptionClick(option.value)}
                role="option"
                aria-selected={isOptionSelected(option.value)}
              >
                {multiple && (
                  <Icon 
                    name={isOptionSelected(option.value) ? "checkboxDone" : "checkboxEmpty"} 
                    size="s" 
                    className={styles.checkboxIcon}
                    color={isOptionSelected(option.value) ? "#ABD27A" : "#69735D"}
                  />
                )}
                <span className={styles.optionLabel}>{option.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};