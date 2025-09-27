// src\pages\HomePage.tsx

import { useState } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, useDispatch } from "@store";

import { getUsersThunk } from "../services/users/actions";
import { getOfferUser, setOfferUser } from "../services/users/users-slice";
import { getUser } from "../services/user/user-slice";
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

export const HomePage = () => {

  const [currentStep, setCurrentStep] = useState(1); // текущий шаг
  const totalSteps = 3;

  const API_USER_ID = Number(import.meta.env.VITE_AUTH_USER_ID);
  const dispatch = useDispatch();

  const user = useSelector(getUser);
  const { users, isLoading, hasMore, page } = useSelector(
    (state: RootState) => state.users
  );

  const offerUser = useSelector(getOfferUser);

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

  const navigate = useNavigate();

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
              users={users}
              // subCategories={subCategories}
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
              // subCategories={subCategories}
              loading={isLoading}
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
            />
          </CardShowcase>
          <CardShowcase title="Рекомендуем">
            <GridList
              rows={1}
              users={users}
              // subCategories={subCategories}
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
            // subCategories={subCategories}
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
              user={u}
              // id={u.id}
              // likedByMe={u.likedByMe}
              // key={u.id}
              // name={u.name}
              // from={u.from}
              // age={birthdayToFormatedAge(u.birthdate)}
              // avatar={getImageUrl(u.photo)}
              // teachSkills={u.skill}
              // learnSkills={u.need_subcat}
              // subCategories={subCategories}
              // onDetailsClick={() => {
              //   dispatch(setOfferUser(u))
              //   navigate(`skills/${u.id}`);              
              // }}
            />
          ))}
        </div>

        {/* Чтобы компонент отобразился нужно тыкнуть в первых 10 пользователей 
        из блока выше */}

        {/* SkillCardDetails выбранного пользователя */}
        {<h2 style={{textAlign:'center'}}>SkillCardDetails</h2>}
        {offerUser && (
          <SkillCardDetails
              title={offerUser.skill || "Навык не указан"}
              subtitle={`${offerUser.cat_text || ""} / ${
                offerUser.sub_text || ""
              }`}
              description={offerUser.description || "Описание отсутствует"}
              images={offerUser.images?.slice(1) || []}
              buttonText={"Предложить обмен"}
          />
        )}

        {/* SkillCardDetails с пропсом checkEdit */}
        {<h2 style={{textAlign:'center'}}>SkillCardDetails с пропсом checkEdit</h2>}
        {offerUser && (
          <SkillCardDetails
              checkEdit={true}
              title={offerUser.skill || "Навык не указан"}
              subtitle={`${offerUser.cat_text || ""} / ${
                offerUser.sub_text || ""
              }`}
              description={offerUser.description || "Описание отсутствует"}
              images={offerUser.images?.slice(1) || []}
              buttonText={"Предложить обмен"}
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
            user={user}
            // onDetailsClick={() => {
            //   alert(user.name);
            // }}
            // id={user.id}
            // likedByMe={user.likedByMe}
            // name={user.name}
            // from={user.from}
            // age={birthdayToFormatedAge(user.birthdate)}
            // avatar={getImageUrl(user.photo)}
            // about={user.about}
            // teachSkills={user.skill}
            // learnSkills={user.need_subcat}
            // subCategories={subCategories}
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
