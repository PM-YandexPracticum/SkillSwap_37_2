import { FC, useState, useEffect } from "react";
import styles from "./AuthForm.module.css";
import clsx from "clsx";
import { Icon } from "../../shared/ui/icon/Icon"; // компонет единый для всех иконок
import { ButtonUI } from "../../shared/ui/button/ButtonUI";
import { EmailInput } from "../../shared/ui/input/email-input/EmailInput";
import { PasswordInput } from "../../shared/ui/input/password-input/PasswordInput";
import { SocialButton } from "../../shared/ui/social-button/SocialButton";

export const AuthForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState<
    "hint" | "error" | "success"
  >("hint");
  const [emailStatus, setEmailStatus] = useState<"error" | "default">("error");

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
    setEmailStatus(value.length > 0 ? "error" : "default");
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
    emailStatus === "error" ? "Email уже используется" : undefined;

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
          <EmailInput
            value={email}
            onChange={handleEmailChange}
            placeholder="Введите email"
            status={emailStatus}
            message={emailMessage}
            label="Email"
          />

          <PasswordInput
            value={password}
            onChange={handlePasswordChange}
            placeholder="Придумайте надёжный пароль"
            status={passwordStatus}
            message={passwordMessage}
            label="Пароль"
          />
        </form>
        <ButtonUI label="Далее" colored onClick={() => {}} />
      </div>
    </div>
  );
};
