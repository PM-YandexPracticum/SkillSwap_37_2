import { FC } from "react";
import styles from "./EmailInput.module.css";
import clsx from "clsx";
import { FormMessage } from "../../form-message/FormMessage";

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  status?: "error" | "default";
  className?: string;
  id?: string;
  label?: string;
  message?: string;
}

export const EmailInput: FC<EmailInputProps> = ({
  value,
  onChange,
  placeholder = "Введите email",
  status = "default",
  className,
  id = "email",
  label = "Email",
  message,
}) => {
  return (
    <div className={clsx(styles.emailInputGroup, className)}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      <input
        type="email"
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(styles.input, status === "error" && styles.error)}
      />

      <FormMessage
        message={message}
        type={status === "error" ? "error" : undefined}
      />
    </div>
  );
};
