import React, { useState } from "react";
import styles from "./Input.module.css";
import clsx from "clsx";
import { FormMessage } from "../form-message/FormMessage";
import { Icon } from "../icon/Icon";

interface InputProps {
  label?: string;
  className?: string;
  placeholder?: string;
  errorMessage?: string;
  status?: "error" | "default" | "success" | "hint";
  id?: string;
  icon?: string;
  type?: "text" | "search" | "tel" | "email" | "password";
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  required?: boolean;
  showPasswordToggle?: boolean;
  showEditIcon?: boolean;
  disabled?: boolean;
}

export const Input = ({
  label,
  placeholder,
  errorMessage,
  status = "default",
  id,
  type = "text",
  icon,
  className,
  value,
  onChange,
  onBlur,
  required = false,
  showPasswordToggle = false,
  showEditIcon = false,
  disabled = false,
  ...otherProps
}: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const actualType = type === "password" && isPasswordVisible ? "text" : type;
  const isError = status === "error";

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.inputContainer}>
        {icon && (
          <div className={styles.iconContainer}>
            <img src={icon} alt="input icon" />
          </div>
        )}
        <input
          className={clsx(
            styles.input,
            {
              [styles.error]: isError,
              [styles.withIcon]: icon,
              [styles.withRightIcon]: showPasswordToggle || showEditIcon,
              [styles.disabled]: disabled,
            },
            className
          )}
          placeholder={placeholder}
          id={id}
          type={actualType}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={onBlur}
          required={required}
          disabled={disabled}
          {...otherProps}
        />

        {/* Кнопка переключения видимости пароля */}
        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            className={styles.eyeButton}
            onClick={togglePasswordVisibility}
            aria-label={isPasswordVisible ? "Скрыть пароль" : "Показать пароль"}
          >
            <Icon
              name={isPasswordVisible ? "eyeSlash" : "eye"}
              size="s"
              className={styles.eyeIcon}
            />
          </button>
        )}
        {/* Иконка редактирования (статическая) */}
        {showEditIcon && (
          <div className={styles.editIconContainer}>
            <Icon name="edit" size="s" className={styles.editIcon} />
          </div>
        )}
      </div>
      <FormMessage
        message={errorMessage}
        type={isError ? "error" : status === "success" ? "success" : "hint"}
      />
    </div>
  );
};
