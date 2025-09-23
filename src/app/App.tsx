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

import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet, useParams } from "react-router-dom";

import { DropdownDemo, DropdownGroupedDemo, Footer, GridList, Header, SkillForm } from "@widgets";

//То, что есть
import { HomePage } from "../pages/HomePage";
import { RegisterStep2 } from "../features/auth/RegisterStep2";

//Данные/типы/стор (для каталога)
import { RootState, useDispatch } from "@store";
import { useSelector } from "react-redux";
import { TPlace } from "@api/types";
import { AuthForm, FilterSection, SkillCardDetails } from "@features";

import { getPlacesThunk } from "../services/places/actions";
import { getUsersThunk } from "../services/users/actions";
import { getCategoriesThunk } from "../services/categories/actions";
import { Button } from "../shared/ui/button/Button";
import { OfferPage } from "../pages/OfferPage/OfferPage";

import styles from "./App.module.css";

//Общий Layout (для всех КРОМЕ главной), чтобы не дублировать везде хедер и футер
const Layout: React.FC = () => (
  <div className="layout">
    <Header />
    <main className={styles.main} style={{paddingBottom: '232px'}}>
      <Outlet />
    </main>
    <Footer />
  </div>
);

//Каталог (FilterSection + GridList)
const CatalogContent: React.FC = () => {

  const users = useSelector((s: RootState) => s.users.users);

  const subCategories = useSelector((s: RootState) => s.categories.subcategories);
  const [selectedGender, setSelectedGender] = React.useState<string>("");
  const [selectedPlaces, setSelectedPlaces] = React.useState<number[]>([]);

  return (
    <section className="page page-catalog">
      <FilterSection
        onGenderChange={setSelectedGender}
        onPlaceChange={setSelectedPlaces}
        selectedGender={selectedGender}
        selectedPlaces={selectedPlaces}
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
const RegisterContent: React.FC = () => {
  const [step, setStep] = useState(1);
  const [step2Data, setStep2Data] = useState<Partial<{
    name: string;
    birthdate: Date | null;
    gender: string;
    city: string;
    selectedCategories: string[];
    selectedSubcategories: string[];
  }> | null>(null);

  const handleStep2Continue = (data: any) => {
    setStep2Data(data);
  
    console.log("Данные регистрации:", data);
    alert("Регистрация завершена! Данные: " + JSON.stringify(data, null, 2));
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <section className="page page-auth">
      {step === 1 ? (
        <div>
          <h1>Регистрация</h1>
          <p>Здесь будет форма регистрации</p>
          <Button colored onClick={() => setStep(2)}>
            Далее
          </Button>
        </div>
      ) : (
        <RegisterStep2
          onBack={handleBack}
          onContinue={handleStep2Continue}
          initialData={step2Data || undefined}
        />
      )}
    </section>
  );
};

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


  const dispatch = useDispatch();
  
  React.useEffect(() => {
    dispatch(getUsersThunk(1));
    dispatch(getPlacesThunk());
    dispatch(getCategoriesThunk());
  }, [dispatch]);


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
          <Route path="demo/skill-details" element={<OfferPage />} />

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
