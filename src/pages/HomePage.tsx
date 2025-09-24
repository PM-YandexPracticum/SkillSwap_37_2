// src\pages\HomePage.tsx

import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { RootState, useDispatch } from "@store";

import { getUserThunk } from "../services/user/actions";
import { getUsersThunk } from "../services/users/actions";
import { getUser } from "../services/user/user-slice";
import { birthdayToFormatedAge, getImageUrl } from "../shared/lib/helpers";
import { TUser } from "@api/types";
import { UserCard } from "../features/users/userCard/UserCard";
import { RegisterStep2 } from "../features/auth/RegisterStep2";
import {
  CardSlider,
  DropdownDemo,
  DropdownGroupedDemo,
  Footer,
  GridList,
  Header,
  NotificationsTable,
  SkillForm,
  SkillMenu,
} from "@widgets";
import { AuthForm, FilterSection, SkillCardDetails } from "@features";
import { getSkillsSubCategoriesApi } from "@api/Api";
import { TPlace } from "@api/types";
import {
  RegistrationOnBoardingOne,
  RegistrationOnBoardingTwo,
  RegistrationOnBoardingThree,
} from "../features/onboarding/registrationBoard";
import { NotFoundPage } from "./not-found-page/NotFoundPage";
import { ServerErrorPage } from "./server-error-page/ServerErrorPage";
import { getCategoriesThunk } from "../services/categories/actions";
import { ExchangeNotification } from "../shared/ui/notification/ExchangeNotification";
import { CardShowcase } from "../widgets/cardShowcase/CardShowcase";
import { Icon } from "../shared/ui/icon/Icon";
import { useExchangeNotification } from "../shared/ui/notification/useExchangeNotification";

import { OfferPage } from "./Offer/OfferPage";
import { SkillFilters } from "../features/filters/SkillFilters";
import { TSkillType } from "shared/types/filters";
import { FiltersContainer } from "../features/filters/FiltersContainer";

import like from "../shared/assets/icons/like.png";
import share from "../shared/assets/icons/share.png";
import more from "../shared/assets/icons/more-square.png";
import { ActiveFiltersBar } from "../features/filters/ActiveFiltersBar";

import styles from "./HomePage.module.css";

export const HomePage = () => {
  // Это нужно убрать!
  // Ищем задачу в канбане
  const mySkill = {
    title: "Игра на барабанах",
    subtitle: "Творчество и искусство / Музыка и звук",
    description:
      "Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без партитуры.",
    mainImage: "public/db/skills-photo/drums-1.jpg",
    smallImages: [
      "/public/db/skills-photo/drums-2.jpg",
      "/public/db/skills-photo/drums-3.jpg",
      "/db/skills-photo/+3.png",
    ],
    icons: [
      "src/shared/assets/icons/like.png",
      "src/shared/assets/icons/share.png",
      "src/shared/assets/icons/more-square.png",
    ],
    buttonText: "Предложить обмен",
  };

  const API_USER_ID = Number(import.meta.env.VITE_AUTH_USER_ID);
  const dispatch = useDispatch();

  const user = useSelector(getUser);
  const { users, isLoading, hasMore, page } = useSelector(
    (state: RootState) => state.users
  );

  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  // const [selectedGender, setSelectedGender] = useState<string>("");
  // const [selectedPlaces, setSelectedPlaces] = useState<number[]>([]);

  // const [subCategories, setSubCategories] = useState<TPlace[]>([]);
  const subCategories = useSelector(
    (s: RootState) => s.categories.subcategories
  );

  const {
    isNotificationOpen,
    openNotification,
    closeNotification,
    handleNavigateToExchange,
  } = useExchangeNotification();

  useEffect(() => {
    dispatch(getUserThunk(API_USER_ID));
    dispatch(getUsersThunk(1));
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  const [selectedSkillType, setSelectedSkillType] = useState<TSkillType>("all");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Получаем категории из Redux
  const categories = useSelector((s: RootState) => s.categories.categories);

  // Обработчик для категорий
  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedPlaces, setSelectedPlaces] = useState<number[]>([]);

  const handleGenderChange = (gender: string) => {
    setSelectedGender(gender);
  };
  const handlePlaceChange = (places: number[]) => {
    setSelectedPlaces(places);
  };

  // функция загрузки последующих данных
  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      dispatch(getUsersThunk(nextPage));
    }
  };

  const handleResetAll = () => {
  setSelectedSkillType("all");
  setSelectedCategories([]);
  setSelectedGender("");
  setSelectedPlaces([]);
  };

  const hasActiveFilters =
    selectedSkillType !== "all" ||
    selectedCategories.length > 0 ||
    selectedGender !== "" ||
    selectedPlaces.length > 0;

  return (
    <div className={styles.homePageWrapper}>
      <Header />

      <div className={styles.filterSectionWrapper}>
        <FiltersContainer
          title="Фильтры"
          onReset={hasActiveFilters ? handleResetAll : undefined}
        >
          <SkillFilters
            onSkillTypeChange={setSelectedSkillType}
            onCategoryToggle={handleCategoryToggle}
            selectedSkillType={selectedSkillType}
            selectedCategories={selectedCategories}
            categories={categories}
            subcategories={subCategories}
          />
          <FilterSection
            onGenderChange={setSelectedGender}
            onPlaceChange={setSelectedPlaces}
            selectedGender={selectedGender}
            selectedPlaces={selectedPlaces}
          />
        </FiltersContainer>

        <div className={styles.showCaseWrapper}>
          <ActiveFiltersBar
            selectedSkillType={selectedSkillType}
            selectedCategories={selectedCategories}
            categories={categories}
            onSkillTypeChange={setSelectedSkillType}
            onCategoryToggle={handleCategoryToggle}
            selectedGender={selectedGender}
            onChangeGender={setSelectedGender}
            selectedPlaces={selectedPlaces}
            onChangePlaces={setSelectedPlaces}
          />

          <CardShowcase
            title="Популярное"
            buttonTitle="Смотреть все"
            icon={<Icon name="chevronRight" />}
          >
            <GridList
              rows={1}
              users={users}
              subCategories={subCategories}
              loading={isLoading}
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
            />
          </CardShowcase>
          <CardShowcase
            title="Новое"
            buttonTitle="Смотреть все"
            icon={<Icon name="chevronRight" />}
          >
            <GridList
              rows={1}
              users={users}
              subCategories={subCategories}
              loading={isLoading}
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
            />
          </CardShowcase>
          <CardShowcase title="Рекомендуем">
            <GridList
              rows={1}
              users={users}
              subCategories={subCategories}
              loading={isLoading}
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
            />
          </CardShowcase>
        </div>
      </div>

      <div className={styles.filterSectionWrapper}>
        <FiltersContainer title="Фильтры">
          <SkillFilters
            onSkillTypeChange={setSelectedSkillType}
            onCategoryToggle={handleCategoryToggle}
            selectedSkillType={selectedSkillType}
            selectedCategories={selectedCategories}
            categories={categories}
            subcategories={subCategories}
          />
          <FilterSection
            onGenderChange={setSelectedGender}
            onPlaceChange={setSelectedPlaces}
            selectedGender={selectedGender}
            selectedPlaces={selectedPlaces}
          />
        </FiltersContainer>
        <CardShowcase
          title="Подходящие предложения: "
          buttonTitle="Сначала новые"
          icon={<Icon name="sort" />}
          isIconFirst
        >
          <GridList
            users={users}
            subCategories={subCategories}
            loading={isLoading}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
          />
        </CardShowcase>
      </div>

      <OfferPage />

      <div>
        {/* Все карточки пользователей */}
        <div style={{ display: "flex", gap: "50px", flexWrap: "wrap" }}>
          {users.map((u) => (
            <UserCard
              key={u.id}
              name={u.name}
              from={u.from}
              age={birthdayToFormatedAge(u.birthdate)}
              avatar={getImageUrl(u.photo)}
              about={u.about}
              teachSkills={u.skill}
              learnSkills={u.need_subcat}
              subCategories={subCategories}
              onDetailsClick={() => setSelectedUser(u)}
            />
          ))}
        </div>

        {/* SkillCardDetails выбранного пользователя */}
        {selectedUser && (
          <SkillCardDetails
            skill={{
              title: selectedUser.skill || "Навык не указан",
              subtitle: `${selectedUser.cat_text || ""} / ${
                selectedUser.sub_text || ""
              }`,
              description: selectedUser.description || "Описание отсутствует",
              mainImage: selectedUser.images?.[0] || "",
              smallImages: selectedUser.images?.slice(1) || [],
              icons: [like, share, more],
              buttonText: "Предложить обмен",
            }}
          />
        )}

        {hasMore && !isLoading && (
          <button
            style={{ margin: "20px", padding: "10px 20px" }}
            onClick={handleLoadMore}
          >
            Загрузить ещё
          </button>
        )}

        {/* Showcase блоки */}
        <CardShowcase
          title="Похожие предложения"
          icon={<Icon name="chevronRight" />}
        >
          <CardSlider users={users} subCategories={subCategories} />
        </CardShowcase>
      </div>

      <h1>Демо-блоки</h1>

      <h2>Блок текущего пользователя</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        {user && (
          <UserCard
            name={user.name}
            from={user.from}
            age={birthdayToFormatedAge(user.birthdate)}
            avatar={getImageUrl(user.photo)}
            about={user.about}
            teachSkills={user.skill}
            learnSkills={user.need_subcat}
            subCategories={subCategories}
          />
        )}
      </div>

      <div>
        <h2>Кнопка для демонстрации success</h2>
        <button
          style={{
            fontSize: "32px",
            color: "red",
            height: "80px",
            padding: "10px 20px",
          }}
          onClick={() => openNotification({ type: "success" })}
        >
          Показать уведомление Success
        </button>
        <h2>Кнопка для демонстрации success</h2>
        <button
          style={{
            fontSize: "32px",
            color: "red",
            height: "80px",
            padding: "10px 20px",
          }}
          onClick={() => openNotification({ type: "info" })}
        >
          Показать уведомление Info
        </button>

        <ExchangeNotification
          isOpen={isNotificationOpen}
          onClose={closeNotification}
          onNavigateToExchange={handleNavigateToExchange}
          type="success"
        />
      </div>

      <h2>Форма регистрации (Шаг 2)</h2>
      <RegisterStep2
        onBack={() => console.log("Назад")}
        onContinue={(data) => {
          console.log("Данные регистрации:", data);
          alert("Регистрация завершена!");
        }}
      />

      <h2>onboarding register step 1</h2>
      <RegistrationOnBoardingOne />

      <h2>onboarding register step 2</h2>
      <RegistrationOnBoardingTwo />

      <h2>onboarding register step 3</h2>
      <RegistrationOnBoardingThree />

      <h2>Вариант Dropdown 1</h2>
      <DropdownDemo />

      <h2>Вариант Dropdown 2</h2>
      <DropdownGroupedDemo />

      <h2>SkillForm</h2>
      <SkillForm />

      <h2>AuthForm</h2>
      <AuthForm />

      <h2>NotificationsTable</h2>
      {/* появляется, если нажать на колокольчик в header
      <NotificationWidget /> */}
      <NotificationsTable userId={API_USER_ID} />

      <h2>SkillCardDetails</h2>
      {/* Настроить передачу свойств от текущего пользователя
      образец user && SkillCard
      все данные есть в user
      убрать константу mySkill */}
      <SkillCardDetails skill={mySkill} />

      <SkillMenu />
      <NotFoundPage />
      <ServerErrorPage />

      <Footer />
    </div>
  );
};
