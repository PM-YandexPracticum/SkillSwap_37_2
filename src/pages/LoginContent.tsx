// src/pages/LoginContent.tsx
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "services/user/user-slice";
import { AuthForm } from "@features";
import { TUser } from "@api/types";

export const LoginContent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (email: string, password: string) => {
    // проверяем тестовый email и пароль
    if (email === "test@example.com" && password === "123456") {
      const testUser: TUser = {
        id: 1,
        name: "Test User",
        gender: "unspecified",
        photo: "avatar.png",
        from: "Test City",
        skill: "Test Skill",
        need_subcat: [],
        cat_text: "Test Category",
        sub_text: "Test Subcategory",
        categoryId: 0,
        subCategoryId: 0,
        description: "Тестовое описание",
        images: [],
        birthdate: "2000-01-01",
        email,
        created_at: new Date().toISOString(),
        about: "Тестовый пользователь",
        likedByMe: false,
        random: Math.random(),
      };

      dispatch(setUser(testUser));
      navigate("/"); // редирект на главную
    } else {
      alert("Неверный email или пароль");
    }
  };

  return (
    <section className="page page-auth">
      <AuthForm onContinue={handleLogin} />
    </section>
  );
};
