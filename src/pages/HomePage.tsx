import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useDispatch } from "@store";

import { getUserThunk } from "../services/user/actions";
import { getUsersThunk } from "../services/users/actions";
import { getUser } from "../services/user/user-slice";
import { getCategoriesThunk } from "../services/categories/actions";
import { CardShowcase } from "../widgets/cardShowcase/CardShowcase";

import { birthdayToFormatedAge, getImageUrl } from "../shared/lib/helpers";
import { TUser } from "@api/types";
import { UserCard } from "../features/users/userCard/UserCard";
import { RegisterStep2 } from "../features/auth/RegisterStep2";
import { 
  AuthForm, 
  FilterSection, 
  SkillCardDetails 
} from "@features";
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
import { 
  RegistrationOnBoardingOne,
  RegistrationOnBoardingTwo, 
  RegistrationOnBoardingThree 
} from "../features/onboarding/registrationBoard";
import { NotFoundPage } from "./not-found-page/NotFoundPage";
import { ServerErrorPage } from "./server-error-page/ServerErrorPage";
import { ExchangeNotification } from "../shared/ui/notification/ExchangeNotification";
import { Icon } from "../shared/ui/icon/Icon";
import { useExchangeNotification } from "../shared/ui/notification/useExchangeNotification";
import { SkillFilters } from '../features/filters/SkillFilters';
import { TSkillType } from "shared/types/filters";
import { FiltersContainer } from '../features/filters/FiltersContainer';

import like from "../shared/assets/icons/like.png";
import share from "../shared/assets/icons/share.png";
import more from "../shared/assets/icons/more-square.png";

import styles from "./HomePage.module.css";

export const HomePage = () => {
  const API_USER_ID = Number(import.meta.env.VITE_AUTH_USER_ID);
  const dispatch = useDispatch();

  const user = useSelector(getUser);
  const { users, isLoading, hasMore, page } = useSelector(
    (state: RootState) => state.users
  );
  const subCategories = useSelector(
    (s: RootState) => s.categories.subcategories
  );

  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedPlaces, setSelectedPlaces] = useState<number[]>([]);

  const {
    isNotificationOpen,
    notificationConfig,
    openNotification,
    closeNotification,
    handleNavigateToExchange,
  } = useExchangeNotification();

  const [selectedSkillType, setSelectedSkillType] = useState<TSkillType>('all');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Получаем категории из Redux
  const categories = useSelector((s: RootState) => s.categories.categories);

  // Обработчик для категорий
  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  useEffect(() => {
    dispatch(getUserThunk(API_USER_ID));
    dispatch(getUsersThunk(1));
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  const handleGenderChange = (gender: string) => {
    setSelectedGender(gender);
  };

  const handlePlaceChange = (places: number[]) => {
    setSelectedPlaces(places);
  };

  // функция загрузки последующих данных
  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      dispatch(getUsersThunk(page + 1));
    }
  };

  return (
    <div className={styles.homePageWrapper}>
      <Header />

      {/* Блок текущего пользователя */}
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
      <CardShowcase title="Похожие предложения" icon={<Icon name="chevronRight" />}>
        <CardSlider users={users} subCategories={subCategories} />
      </CardShowcase>

      <div className={styles.mainLayout}>
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
            onGenderChange={handleGenderChange}
            onPlaceChange={handlePlaceChange}
            selectedGender={selectedGender}
            selectedPlaces={selectedPlaces}
          />
        </FiltersContainer>

        <main className={styles.mainWrapper}>
          <div className={styles.showCaseWrapper}>
            <CardShowcase title="Популярное" buttonTitle="Смотреть все" icon={<Icon name="chevronRight" />}>
              <GridList
                rows={1}
                users={users}
                subCategories={subCategories}
                loading={isLoading}
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
              />
            </CardShowcase>
            <CardShowcase title="Новое" buttonTitle="Смотреть все" icon={<Icon name="chevronRight" />}>
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
        </main>

        <main className={styles.mainWrapper}>
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
        </main>
      </div>
      {/* Демо-блоки */}
      <div>
        <h2>Кнопка для демонстрации success</h2>
        <button
          style={{ fontSize: "32px", color: "red", height: "80px", padding: "10px 20px" }}
          onClick={() => openNotification({ type: "success" })}
        >
          Показать уведомление Success
        </button>

        <h2>Кнопка для демонстрации info</h2>
        <button
          style={{ fontSize: "32px", color: "red", height: "80px", padding: "10px 20px" }}
          onClick={() => openNotification({ type: "info" })}
        >
          Показать уведомление Info
        </button>

        <ExchangeNotification
          isOpen={isNotificationOpen}
          onClose={closeNotification}
          onNavigateToExchange={handleNavigateToExchange}
          type={notificationConfig.type}
          title={notificationConfig.title}
          message={notificationConfig.message}
          buttonText={notificationConfig.buttonText}
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
      <NotificationsTable userId={API_USER_ID} />

      <SkillMenu />
      <NotFoundPage />
      <ServerErrorPage />
        {/* Debug ссылки */}
      <div style={{ padding: "2rem", paddingBottom: "20rem" }}>
        <h2>Debug Links</h2>
        <ul>
          <li><a href="/skills">/skills</a></li>
          <li><a href="/auth/login">/auth/login</a></li>
          <li><a href="/auth/register">/auth/register</a></li>
          <li><a href="/skill/new">/skill/new</a></li>
          <li><a href="/demo/dropdowns">/demo/dropdowns</a></li>
          <li><a href="/demo/skill-details">/demo/skill-details</a></li>
          <li><a href="/skills/123">/skills/:id</a></li>
          <li><a href="/favorites">/favorites</a></li>
          <li><a href="/requests">/requests</a></li>
          <li><a href="/profile">/profile</a></li>
          <li><a href="/profile/notifications">/profile/notifications</a></li>
          <li><a href="/500">/500</a></li>
          <li><a href="/nonexistent">/not-found</a></li>
        </ul>
      </div>

      <Footer />
    </div>
  );
}