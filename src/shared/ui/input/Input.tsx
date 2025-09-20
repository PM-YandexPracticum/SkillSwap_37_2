import React from "react";
import styles from "./Input.module.css";
import clsx from "clsx";
import { FormMessage } from "../form-message/FormMessage";

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
  required?: boolean; // Добавляем поле
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
  ...otherProps
}: InputProps) => {
  const isError = status === "error";
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
              [styles.withicon]: icon,
            },
            className
          )}
          placeholder={placeholder}
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={onBlur}
          required={required}
          {...otherProps}
        />
      </div>
      <FormMessage
        message={errorMessage}
        type={isError ? "error" : status === "success" ? "success" : "hint"}
      />
    </div>
  );
};
