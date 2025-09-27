import { FC, useState, useEffect } from "react";
import styles from "./AuthForm.module.css";
import clsx from "clsx";
import { Button } from "../../shared/ui/button/Button";
import { Input } from "../../shared/ui/input/Input";
import { SocialButton } from "../../shared/ui/social-button/SocialButton";

type AuthFormProps = {
  onContinue: (email: string, password: string) => void;
};

export const AuthForm: FC<AuthFormProps> = ({ onContinue }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState<
    "hint" | "error" | "success"
  >("hint");
  const [emailStatus, setEmailStatus] = useState<"error" | "default">(
    "default"
  );
  const [emailTouched, setEmailTouched] = useState(false);

  // временно
  const checkPassword = (value: string) => {
    if (value.length === 0) {
      return {
        type: "hint" as const,
        message: "Пароль должен содержать не менее 8 знаков",
      };
    } else if (value.length < 8) {
      return {
        type: "error" as const,
        message: "Пароль должен содержать не менее 8 знаков",
      };
    } else {
      return { type: "success" as const, message: "Надёжный" };
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    const status = checkPassword(value);
    setPasswordStatus(status.type);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);

    if (emailTouched) {
      // пока что такая валидация
      const isValid = /\S+@\S+\.\S+/.test(value);
      setEmailStatus(isValid ? "default" : "error");
    }
  };

  const handleEmailBlur = () => {
    // Устанавливаем, что пользователь взаимодействовал с полем
    setEmailTouched(true);

    // Проверяем email при уходе с поля
    const isValid = /\S+@\S+\.\S+/.test(email);
    setEmailStatus(isValid ? "default" : "error");
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // логика для Google
  };

  const handleAppleLogin = () => {
    console.log("Apple login clicked");
    //  логика для Apple
  };

  const passwordMessage = checkPassword(password).message;
  const emailMessage =
    emailTouched && emailStatus === "error"
      ? "Введите корректный email"
      : undefined;

  return (
    <div className={styles.authForm}>
      <div className={styles.content}>
        {/* Кнопки соц сетей */}
        <SocialButton provider="google" onClick={handleGoogleLogin}>
          Продолжить с Google
        </SocialButton>

        <SocialButton provider="apple" onClick={handleAppleLogin}>
          Продолжить с Apple
        </SocialButton>

        {/* Разделитель */}
        <div className={styles.separator}>
          <span>или</span>
        </div>

        {/* Форма */}
        <form className={styles.form}>
          <Input
            type="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            placeholder="Введите email"
            status={emailStatus}
            errorMessage={emailMessage}
            label="Email"
            id="email"
          />

          {/* Input с функционалом пароля */}
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Придумайте надёжный пароль"
            status={passwordStatus}
            errorMessage={passwordMessage}
            label="Пароль"
            showPasswordToggle={true}
            id="password"
          />
        </form>
        <Button colored onClick={() => onContinue(email, password)}>Далее</Button>
      </div>
    </div>
  );
};
