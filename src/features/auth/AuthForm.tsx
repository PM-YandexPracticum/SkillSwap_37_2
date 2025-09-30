import { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import styles from "./AuthForm.module.css";
import { Button } from "../../shared/ui/button/Button";
import { Input } from "../../shared/ui/input/Input";
import { SocialButton } from "../../shared/ui/social-button/SocialButton";

type AuthFormProps = {
  onContinue: (email: string, password: string) => void;
};

type FormData = {
  email: string;
  password: string;
};

export const AuthForm: FC<AuthFormProps> = ({ onContinue }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",       // Обновляем валидность при каждом изменении
    reValidateMode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    onContinue(data.email, data.password);
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  const handleAppleLogin = () => {
    console.log("Apple login clicked");
  };

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
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email обязателен",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Введите корректный email",
              },
            }}
            render={({ field }) => (
              <Input
                type="email"
                label="Email"
                id="email"
                placeholder="Введите email"
                {...field} // передаем value, onChange, onBlur
                status={errors.email ? "error" : "default"}
                errorMessage={errors.email?.message}
              />
            )}
          />

          {/* Пароль */}
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Пароль обязателен",
              minLength: {
                value: 8,
                message: "Пароль должен быть не менее 8 символов",
              },
              validate: {
                hasNumber: (v) =>
                  /\d/.test(v) || "Пароль должен содержать хотя бы одну цифру",
                hasLetter: (v) =>
                  /[a-zA-Z]/.test(v) ||
                  "Пароль должен содержать хотя бы одну букву",
              },
            }}
            render={({ field }) => (
              <Input
                type="password"
                label="Пароль"
                id="password"
                placeholder="Придумайте надёжный пароль"
                showPasswordToggle
                {...field} // передаем value, onChange, onBlur
                status={errors.password ? "error" : "default"}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button colored type="submit" disabled={!isValid}>
            Далее
          </Button>
        </form>
      </div>
    </div>
  );
};
