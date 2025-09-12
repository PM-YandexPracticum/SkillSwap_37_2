import { FC, useState } from "react";
import styles from "./AuthForm.module.css";
import clsx from "clsx";
import { Icon } from "../../shared/ui/icon/Icon"; // компонет единый для всех иконок
import { ButtonUI } from "../../shared/ui/button/ButtonUI";

export const AuthForm: FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className={styles.authForm}>
      <div className={styles.content}>
        {/* Кнопки соц сетей */}
        <button className={clsx(styles.button, styles.googleButton)}>
          <Icon name="google" size="s" />
          Продолжить с Google
        </button>

        <button className={clsx(styles.button, styles.appleButton)}>
          <Icon name="apple" size="s" />
          Продолжить с Apple
        </button>

        {/* Разделитель */}
        <div className={styles.separator}>
          <span>или</span>
        </div>

        {/* Форма */}
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value="petrov@mail.ru"
              className={clsx(styles.input, styles.error)}
            />
            <span className={styles.errorText}>Email уже используется</span>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Пароль</label>
            <div className={styles.inputWrapper}>
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                value="Чер5нослив)"
                className={clsx(styles.input, styles.success)}
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={togglePasswordVisibility}
                aria-label={
                  isPasswordVisible ? "Скрыть пароль" : "Показать пароль"
                }
              >
                <Icon name={isPasswordVisible ? "eyeSlash" : "eye"} size="s" />
              </button>
            </div>
            <span className={styles.successText}>Надёжный</span>
          </div>

          <ButtonUI label="Далее" colored onClick={() => {}} />
        </form>
      </div>
    </div>
  );
};
