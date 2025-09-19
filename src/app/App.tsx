// src/app/App.tsx

/* ===== Карта роутов =====
/                 HomePage
/skills           CatalogContent
/skills/:id       SkillPageStub
/auth/login       LoginContent
/auth/register    RegisterContent
/skill/new        SkillFormContent
/favorites        FavoritesPageStub
/requests         RequestsPageStub
/profile          ProfilePageStub
/profile/notifications NotificationsPageStub
/demo/dropdowns   DropdownsDemoContent
/demo/skill-details SkillDetailsDemoContent
/500              Error500PageStub
/*                NotFoundPageStub
=========================== */

import React from "react";
import { BrowserRouter, Routes, Route, Outlet, useParams } from "react-router-dom";

import { DropdownDemo, DropdownGroupedDemo, Footer, GridList, Header, SkillForm } from "@widgets";

//То, что есть
import { HomePage } from "../pages/HomePage";
// import { FilterSection } from "../features/filters/FilterSection";
// import { AuthForm } from "../features/auth/AuthForm";
// import { SkillCardDetails } from "../features/skills/Skill Card/skillCardDetails";

//Данные/типы/стор (для каталога)
import { useDispatch } from "@store";
import { useSelector } from "react-redux";
import { RootState } from "../services/store";
import { getUsersThunk } from "../services/users/actions";
import { getSkillsSubCategoriesApi } from "@api/Api";
import { TPlace } from "@api/types";
import { AuthForm, FilterSection, SkillCardDetails } from "@features";

//Общий Layout (для всех КРОМЕ главной), чтобы не дублировать везде хедер и футер
const Layout: React.FC = () => (
  <div className="layout">
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);

//Каталог (FilterSection + GridList)
const CatalogContent: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((s: RootState) => s.users.users);

  const [subCategories, setSubCategories] = React.useState<TPlace[]>([]);
  const [selectedGender, setSelectedGender] = React.useState<string>("");
  const [selectedCities, setSelectedCities] = React.useState<string[]>([]);

  React.useEffect(() => {
    dispatch(getUsersThunk(1));
    getSkillsSubCategoriesApi()
      .then((data) => setSubCategories(data.subcategories ?? []))
      .catch((e) => console.error("Не удалось загрузить подкатегории:", e));
  }, [dispatch]);

  return (
    <section className="page page-catalog">
      <FilterSection
        onGenderChange={setSelectedGender}
        onCityChange={setSelectedCities}
        selectedGender={selectedGender}
        selectedCities={selectedCities}
      />
      <GridList
        users={users}
        subCategories={subCategories}
        loading={false}
        hasMore={false}
        onLoadMore={() => {}}
      />
    </section>
  );
};

//Логин — AuthForm
const LoginContent: React.FC = () => (
  <section className="page page-auth">
    <AuthForm />
  </section>
);

//Register
const RegisterContent: React.FC = () => (
  <section className="page page-auth">
    <h1>Регистрация</h1>
    <p>Здесь будет форма регистрации.</p>
  </section>
);

//Форма навыка
const SkillFormContent: React.FC = () => (
  <section className="page page-skillform">
    <SkillForm />
  </section>
);

//Демо: дропдауны
const DropdownsDemoContent: React.FC = () => (
  <section className="page page-dropdowns">
    <h2>Вариант Dropdown 1</h2>
    <DropdownDemo />
    <h2>Вариант Dropdown 2</h2>
    <DropdownGroupedDemo />
  </section>
);

//Демо: детальная карточка навыка (mock)
const SkillDetailsDemoContent: React.FC = () => {
  const mySkill = {
    title: "Игра на барабанах",
    subtitle: "Творчество и искусство / Музыка и звук",
    description:
      "Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене...",
    
    mainImage: "/db/skills-photo/drums-1.jpg",
    smallImages: [
      "/db/skills-photo/drums-2.jpg",
      "/db/skills-photo/drums-3.jpg",
      "/db/skills-photo/+3.png",
    ],
    icons: [
      "/src/shared/assets/icons/like.png",
      "/src/shared/assets/icons/share.png",
      "/src/shared/assets/icons/more-square.png",
    ],
    buttonText: "Предложить обмен",
    onExchange: () => alert("Обмен предложен!"),
  };
  return (
    <section className="page page-skill-details">
      <SkillCardDetails skill={mySkill} />
    </section>
  );
};

/* ЗАГЛУШКИ*/

// /skills/:id — детальная страница навыка (пока заглушка)
const SkillPageStub: React.FC = () => {
  const { id } = useParams();
  return (
    <section className="page page-skill">
      <h1>Навык #{id}</h1>
      <p>Здесь будет детальная страница навыка.</p>
    </section>
  );
};

// /favorites
const FavoritesPageStub: React.FC = () => (
  <section className="page page-favorites">
    <h1>Избранное</h1>
    <p>Страница в разработке.</p>
  </section>
);

// /requests
const RequestsPageStub: React.FC = () => (
  <section className="page page-requests">
    <h1>Заявки</h1>
    <p>Страница в разработке.</p>
  </section>
);

// /profile (index) и /profile/notifications
const ProfilePageStub: React.FC = () => (
  <section className="page page-profile">
    <h1>Профиль</h1>
    <p>Страница в разработке.</p>
  </section>
);

const NotificationsPageStub: React.FC = () => (
  <section className="page page-notifications">
    <h1>Уведомления</h1>
    <p>Страница в разработке.</p>
  </section>
);

// /500 и 404
const Error500PageStub: React.FC = () => (
  <section className="page page-500" style={{ textAlign: "center" }}>
    <h1>Внутренняя ошибка сервера</h1>
  </section>
);

const NotFoundPageStub: React.FC = () => (
  <section className="page page-404" style={{ textAlign: "center" }}>
    <h1>Страница не найдена</h1>
  </section>
);

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Главная БЕЗ Layout, тк есть внутри фотер и хедер */}
        <Route index element={<HomePage />} />

        {/* Все прочие — под Layout */}
        <Route element={<Layout />}>
          {/*То, что есть*/}
          <Route path="skills" element={<CatalogContent />} />
          <Route path="auth/login" element={<LoginContent />} />
          <Route path="auth/register" element={<RegisterContent />} />
          <Route path="skill/new" element={<SkillFormContent />} />
          <Route path="demo/dropdowns" element={<DropdownsDemoContent />} />
          <Route path="demo/skill-details" element={<SkillDetailsDemoContent />} />

          {/*заглушки*/}
          <Route path="skills/:id" element={<SkillPageStub />} />
          <Route path="favorites" element={<FavoritesPageStub />} />
          <Route path="requests" element={<RequestsPageStub />} />
          <Route path="profile">
            <Route index element={<ProfilePageStub />} />
            <Route path="notifications" element={<NotificationsPageStub />} />
          </Route>

          {/* Системные */}
          <Route path="500" element={<Error500PageStub />} />
          <Route path="*" element={<NotFoundPageStub />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
