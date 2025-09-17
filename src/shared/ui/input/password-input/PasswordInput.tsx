import { FC, useState } from "react";
import styles from "./PasswordInput.module.css";
import clsx from "clsx";
import { Icon } from "../../icon/Icon";
import { FormMessage } from "../../form-message/FormMessage";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  status?: "hint" | "error" | "success";
  className?: string;
  id?: string;
  label?: string;
  message?: string;
}

export const PasswordInput: FC<PasswordInputProps> = ({
  value,
  onChange,
  placeholder = "Введите пароль",
  status = "hint",
  className,
  id = "password",
  label = "Пароль",
  message,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className={clsx(styles.passwordInputGroup, className)}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.inputContainer}>
        <input
          type={isPasswordVisible ? "text" : "password"}
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={clsx(
            styles.input,
            status === "error" && styles.error,
            status === "success" && styles.success
          )}
        />
        <button
          type="button"
          className={styles.eyeButton}
          onClick={togglePasswordVisibility}
          aria-label={isPasswordVisible ? "Скрыть пароль" : "Показать пароль"}
        >
          <Icon name={isPasswordVisible ? "eyeSlash" : "eye"} size="s" />
        </button>
      </div>

      <FormMessage message={message} type={status} />
    </div>
  );
};
