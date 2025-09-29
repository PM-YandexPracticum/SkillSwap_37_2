// src\pages\HomePage.tsx

import { useState } from "react";

import { useSelector } from "react-redux";
import { RootState, useDispatch } from "@store";

import { getCurrentUser } from "../services/user/user-slice";
import { GENDERS, TGender, TUser } from "@api/types";
import { UserCard } from "../features/users/userCard/UserCard";
// import { RegisterStep2 } from "../features/auth/RegisterStep2";
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
import { CardShowcase, SHOWCASE_TITLES } from "../widgets/cardShowcase/CardShowcase";
import { Icon } from "../shared/ui/icon/Icon";
import { useExchangeNotification } from "../shared/ui/notification/useExchangeNotification";

import { OfferPage } from "./Offer/OfferPage";
import { SkillFilters } from "../features/filters/SkillFilters";
import { SKILL_TYPES, TSkillType } from "../shared/types/filters";
import { FiltersContainer } from "../features/filters/FiltersContainer";

import { ActiveFiltersBar } from "../features/filters/ActiveFiltersBar";
import { LoginNotification } from "../shared/ui/notification/LoginNotification";
import styles from "./HomePage.module.css";

import { getUsersThunk } from "../services/users/actions";
import { getPopularUsersThunk } from "../services/popularUsers/actions";
import { getCreatedAtUsersThunk } from "../services/createdAtUsers/actions";
import { getRandomUsersThunk } from "../services/randomUsers/actions";
import { getFilteredUsersThunk } from "../services/filteredUsers/actions";
import { resetFilters, setGender } from "../services/filters/filters-slice";
import { resetFilteredUsers } from "../services/filteredUsers/filtered-users-slice";

export const HomePage = () => {

  // const [currentStep, setCurrentStep] = useState(1); // текущий шаг
  // const totalSteps = 3;

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


  // *************************************************
  // отфильтрованные пользователи
  const filters = useSelector((s: RootState) => s.filters);
  const selectedGender = useSelector((s: RootState) => s.filters.gender);
  
  const {
    users: filteredUsers,
    isLoading: isFilteredLoading,
    hasMore: hasMoreFiltered,
    page: filteredPage,
  } = useSelector((state: RootState) => state.filteredUsers);

  // функция загрузки последующих данных
  const handleLoadMoreFilteredUsers = ( ) => {
    if (!isFilteredLoading && hasMoreFiltered) {
      const nextPage = filteredPage + 1;
      dispatch(getFilteredUsersThunk({ 
        page: nextPage, 
        gender: selectedGender
      }));
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

  const [isLoginNotificationOpen, setIsLoginNotificationOpen] = useState(false);


  const [selectedSkillType, setSelectedSkillType] = useState<TSkillType>(SKILL_TYPES.ALL);
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

  // const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedPlaces, setSelectedPlaces] = useState<number[]>([]);

  // const handleGenderChange = (gender: string) => {
  //   setSelectedGender(gender);
  // };


  const handleGenderChange = (gender: TGender) => {
    dispatch(setGender(gender));
    dispatch(resetFilteredUsers()); // очистим список
    dispatch(getFilteredUsersThunk({ page: 1, gender }));
  };

  const handlePlaceChange = (places: number[]) => {
    setSelectedPlaces(places);
  };

  const handleResetAll = () => {
    dispatch(resetFilters());
    dispatch(resetFilteredUsers());
    // setSelectedSkillType("all");
    // setSelectedCategories([]);
    // setSelectedGender("");
    // setSelectedPlaces([]);
  };


  const hasActiveFilters =
    filters.skillType !== SKILL_TYPES.ALL ||
    filters.categories.length > 0 ||
    filters.gender !== GENDERS.UNSPECIFIED ||
    filters.places.length > 0;

    // selectedSkillType !== "all" ||
    // selectedCategories.length > 0 ||
    // selectedGender !== "" ||
    // selectedPlaces.length > 0;

  const handleOpenLogin = () => {
    setIsLoginNotificationOpen(true);
  };

  const handleLogin = () => {
    console.log("Переход к странице входа/регистрации");
  };
  
  const handleCancelLogin = () => {
    console.log("Пользователь отменил вход");
};

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
            onGenderChange={handleGenderChange}
            // onGenderChange={setSelectedGender}
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
            onChangeGender={handleGenderChange}
            selectedPlaces={selectedPlaces}
            onChangePlaces={setSelectedPlaces}
          />

          <CardShowcase
            title={SHOWCASE_TITLES.POPULAR}
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
            title={SHOWCASE_TITLES.NEW}
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
            title={SHOWCASE_TITLES.RECOMMEND}
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
        <CardShowcase
          title={SHOWCASE_TITLES.MATCHING}
          buttonTitle="Сначала новые"
          icon={<Icon name="sort" />}
          isIconFirst
        >
          <GridList
            users={filteredUsers}
            loading={isFilteredLoading}
            hasMore={hasMoreFiltered}
            onLoadMore={handleLoadMoreFilteredUsers}
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
          title={SHOWCASE_TITLES.SIMILAR}
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
   <h2>Кнопка для демонстрации Login Notification</h2>
<button 
    style={{
      fontSize: "32px",
      color: "red",
      height: "80px",
      padding: "10px 20px",
      marginLeft: '20px'
    }}
    onClick={handleOpenLogin}
  >
  Показать уведомление Login Notification
  </button>
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
     

   <LoginNotification
          isOpen={isLoginNotificationOpen}
          onClose={() => setIsLoginNotificationOpen(false)}
          onLogin={handleLogin}
          onCancel={handleCancelLogin}
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

      {/* <SkillMenu /> */}
      <NotFoundPage />
      <ServerErrorPage />


      <h2>NotificationsTable</h2>
      <div  style={{ marginBottom: '300px' }}>
        <NotificationsTable/>
      </div>

      {/* <NotificationWidget /> */}

      <Footer />
    </div>
  );
};



      {/* <RegistrationProgress currentStep={currentStep} totalSteps={totalSteps} /> */}

  {/* Форма регистрации по шагам */}
  {/* {currentStep === 1 && <AuthForm onContinue={() => setCurrentStep(2)} />}

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
  )} */}
