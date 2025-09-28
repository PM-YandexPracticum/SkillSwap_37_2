// src\pages\HomePage.tsx

import { useState } from "react";

import { useSelector } from "react-redux";
import { RootState, useDispatch } from "@store";

import { getCurrentUser } from "../services/user/user-slice";
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
import {
  RegistrationOnBoarding,
  onBoarding,
} from "../features/onboarding/registrationBoard";
import { NotFoundPage } from "./not-found-page/NotFoundPage";
import { ServerErrorPage } from "./server-error-page/ServerErrorPage";
import { ExchangeNotification } from "../shared/ui/notification/ExchangeNotification";
import { CardShowcase } from "../widgets/cardShowcase/CardShowcase";
import { Icon } from "../shared/ui/icon/Icon";
import { useExchangeNotification } from "../shared/ui/notification/useExchangeNotification";

import { OfferPage } from "./Offer/OfferPage";
import { SkillFilters } from "../features/filters/SkillFilters";
import { TSkillType } from "shared/types/filters";
import { FiltersContainer } from "../features/filters/FiltersContainer";

import { ActiveFiltersBar } from "../features/filters/ActiveFiltersBar";
import { RegistrationProgress } from "../shared/ui/RegistrationProgress/RegistrationProgress";

import styles from "./HomePage.module.css";

import { getUsersThunk } from "../services/users/actions";
import { getPopularUsersThunk } from "../services/popularUsers/actions";
import { getCreatedAtUsersThunk } from "../services/createdAtUsers/actions";
import { getRandomUsersThunk } from "../services/randomUsers/actions";

export const HomePage = () => {

  const [currentStep, setCurrentStep] = useState(1); // текущий шаг
  const totalSteps = 3;

  const API_USER_ID = Number(import.meta.env.VITE_AUTH_USER_ID);
  const dispatch = useDispatch();

  // Это авторизованный пользователь
  const currentUser = useSelector(getCurrentUser);

  // Это выбранный пользователь, например, предложение которого рассматривается 
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);

  // *************************************************
  // пользоаватели без сортировки
  const {
    users: plainUsers,
    isLoading: isUsersLoading,
    hasMore: hasMoreUsers,
    page: usersPage,
  } = useSelector((state: RootState) => state.users);

  // функция загрузки последующих данных
  const handleLoadMorePlainUsers = () => {
    if (!isUsersLoading && hasMoreUsers) {
      const nextPage = usersPage + 1;
      dispatch(getUsersThunk(nextPage));
    }
  };

  // *************************************************
  // популярные пользователи
  const {
    users: popularUsers,
    isLoading: isPopularLoading,
    hasMore: hasMorePopular,
    page: popularPage,
  } = useSelector((state: RootState) => state.popularUsers);

  // функция загрузки последующих данных
  const handleLoadMorePopularUsers = () => {
    if (!isPopularLoading && hasMorePopular) {
      const nextPage = popularPage + 1;
      dispatch(getPopularUsersThunk(nextPage));
    }
  };

  // *************************************************
  // по created_at
  const {
    users: createdAtUsers,
    isLoading: isCreatedAtLoading,
    hasMore: hasMoreCreatedAt,
    page: createdAtPage,
  } = useSelector((state: RootState) => state.createdAtUsers);

    // функция загрузки последующих данных
  const handleLoadMoreCreatedAtUsers = () => {
    if (!isCreatedAtLoading && hasMoreCreatedAt) {
      const nextPage = createdAtPage + 1;
      dispatch(getCreatedAtUsersThunk(nextPage));
    }
  };

  // *************************************************
  // случайные пользователи
  const {
    users: randomUsers,
    isLoading: isRandomLoading,
    hasMore: hasMoreRandom,
    page: randomPage,
  } = useSelector((state: RootState) => state.randomUsers);

    // функция загрузки последующих данных
  const handleLoadMoreRandomUsers = () => {
    if (!isRandomLoading && hasMoreRandom) {
      const nextPage = randomPage + 1;
      dispatch(getRandomUsersThunk(nextPage));
    }
  };



  const subCategories = useSelector(
    (s: RootState) => s.categories.subcategories
  );

  const {
    isNotificationOpen,
    notificationConfig,
    openNotification,
    closeNotification,
    handleNavigateToExchange,
  } = useExchangeNotification();

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

<div>
  <button 
    style={{
      fontSize: "32px",
      color: "red",
      height: "80px",
      padding: "10px 20px",
    }}
    onClick={() => window.location.href = '/registration/step1'}
  >
    Тестировать регистрацию 
  </button>
</div>

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
              users={popularUsers}
              loading={isPopularLoading}
              hasMore={hasMorePopular}
              onLoadMore={handleLoadMorePopularUsers}
            />
          </CardShowcase>
          <CardShowcase
            title="Новое"
            buttonTitle="Смотреть все"
            icon={<Icon name="chevronRight" />}
          >
            <GridList
              rows={1}
              users={createdAtUsers}
              loading={isCreatedAtLoading}
              hasMore={hasMoreCreatedAt}
              onLoadMore={handleLoadMoreCreatedAtUsers}
            />
          </CardShowcase>

          <CardShowcase
            title="Рекомендуем"
            buttonTitle="Смотреть все"
            icon={<Icon name="chevronRight" />}
          >
            <GridList
              rows={1}
              users={randomUsers}
              loading={isRandomLoading}
              hasMore={hasMoreRandom}
              onLoadMore={handleLoadMoreRandomUsers}
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
            users={plainUsers}
            // subCategories={subCategories}
            loading={isUsersLoading}
            hasMore={hasMoreUsers}
            onLoadMore={handleLoadMorePlainUsers}
          />
        </CardShowcase>
      </div>

      <OfferPage />

      <div>
        {/* Все карточки пользователей */}
        <div style={{ display: "flex", gap: "50px", flexWrap: "wrap" }}>
          {plainUsers.map((u) => (
            <UserCard
              user={u}
            />
          ))}
        </div>

        {/* Чтобы компонент отобразился нужно тыкнуть в первых 10 пользователей 
        из блока выше */}

        {/* SkillCardDetails выбранного пользователя */}
        {<h2 style={{textAlign:'center'}}>SkillCardDetails</h2>}
        {selectedUser && (
          <SkillCardDetails
              title={selectedUser.skill || "Навык не указан"}
              subtitle={`${selectedUser.cat_text || ""} / ${
                selectedUser.sub_text || ""
              }`}
              description={selectedUser.description || "Описание отсутствует"}
              images={selectedUser.images?.slice(1) || []}
              buttonText={"Предложить обмен"}
          />
        )}

        {/* SkillCardDetails с пропсом checkEdit */}
        {<h2 style={{textAlign:'center'}}>SkillCardDetails с пропсом checkEdit</h2>}
        {selectedUser && (
          <SkillCardDetails
              checkEdit={true}
              title={selectedUser.skill || "Навык не указан"}
              subtitle={`${selectedUser.cat_text || ""} / ${
                selectedUser.sub_text || ""
              }`}
              description={selectedUser.description || "Описание отсутствует"}
              images={selectedUser.images?.slice(1) || []}
              buttonText={"Предложить обмен"}
          />
        )}

        {hasMoreUsers && !isUsersLoading && (
          <button
            style={{ margin: "20px", padding: "10px 20px" }}
            onClick={handleLoadMorePlainUsers}
          >
            Загрузить ещё
          </button>
        )}

        {/* Showcase блоки */}
        <CardShowcase
          title="Похожие предложения"
          icon={<Icon name="chevronRight" />}
        >
          <CardSlider users={plainUsers} subCategories={subCategories} />
        </CardShowcase>
      </div>

      <h1>Демо-блоки</h1>

      <h2>Блок текущего пользователя</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        {currentUser && (
          <UserCard
            user={currentUser}
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

       <h2>Кнопка для демонстрации notification</h2>
        <button
          style={{
            fontSize: "32px",
            color: "red",
            height: "80px",
            padding: "10px 20px",
          }}
          onClick={() => openNotification({ type: "notification" })}
        >
          Показать уведомление notification
        </button>

        <ExchangeNotification
          isOpen={isNotificationOpen}
          onClose={closeNotification}
          onNavigateToExchange={handleNavigateToExchange}
          type={notificationConfig.type}
          message={notificationConfig.message}
          title={notificationConfig.title}
        />
      </div>

      

      <h2>onboarding register step 1</h2>
      <RegistrationOnBoarding {...onBoarding[0]} />

      <h2>onboarding register step 2</h2>
      <RegistrationOnBoarding {...onBoarding[1]} />

      <h2>onboarding register step 3</h2>
      <RegistrationOnBoarding {...onBoarding[2]} />

      <h2>Вариант Dropdown 1</h2>
      <DropdownDemo />

      <h2>Вариант Dropdown 2</h2>
      <DropdownGroupedDemo />

      
      <RegistrationProgress currentStep={currentStep} totalSteps={totalSteps} />

  {/* Форма регистрации по шагам */}
  {currentStep === 1 && <AuthForm onContinue={() => setCurrentStep(2)} />}

  {currentStep === 2 && (
    <RegisterStep2
      onBack={() => setCurrentStep(1)}
      onContinue={(data) => {
        console.log("Данные регистрации:", data);
        setCurrentStep(3);
      }}
    />
  )}

  {currentStep === 3 && (
    <SkillForm
      onBack={() => setCurrentStep(2)}
      onContinue={() => alert("Регистрация завершена!")}
    />
  )}



      <h2>NotificationsTable</h2>
      {/* появляется, если нажать на колокольчик в header
      <NotificationWidget /> */}
      <NotificationsTable userId={API_USER_ID} />

      <SkillMenu />
      <NotFoundPage />
      <ServerErrorPage />

      <Footer />
    </div>
  );
};
