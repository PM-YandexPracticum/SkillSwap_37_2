// src\pages\HomePage.tsx

import { useEffect, useState } from "react";

import { useSelector } from 'react-redux';
import { RootState, useDispatch } from '@store';

import { getUserThunk } from "../services/user/actions";
import { getUsersThunk } from '../services/users/actions';
import { getUser } from "../services/user/user-slice";
import { birthdayToFormatedAge, getImageUrl } from "../shared/lib/helpers";
import { UserCard } from "../features/users/userCard/UserCard";

import styles from "./HomePage.module.css";
import { NotificationWidget } from "../widgets/notification-widget/NotificationWidget";
import { DropdownDemo, DropdownGroupedDemo, Footer, GridList, Header, OffersTable, SkillForm, SkillMenu } from "@widgets";
import { AuthForm, FilterSection, SkillCardDetails } from "@features";
import { getSkillsSubCategoriesApi } from "@api/Api";
import { TPlace } from "@api/types";
import { NotFoundPage } from "./not-found-page/NotFoundPage";
import { ServerErrorPage } from "./server-error-page/ServerErrorPage";

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
    onExchange: () => alert("Обмен предложен!"),
  };

  const API_USER_ID = Number(import.meta.env.VITE_AUTH_USER_ID);
  const dispatch = useDispatch();

  const user = useSelector(getUser);
  const { users, isLoading, hasMore, page } = useSelector(
    (state: RootState) => state.users
  );
  // const users = useSelector((state: RootState) => state.users.users);

  const [subCategories, setSubCategories] = useState<TPlace[]>([]);

  useEffect(() => {
    dispatch(getUserThunk(API_USER_ID));
    getSkillsSubCategoriesApi().then((data) =>
      setSubCategories(data.subcategories)
    );
  }, [dispatch]);

  useEffect(() => {
    if (page === 0) {
      dispatch(getUsersThunk(1));
    }
  }, [dispatch, page]);

  const [selectedGender, setSelectedGender] = useState<string>('');
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);
 
  const handleGenderChange = (gender: string) => {
    setSelectedGender(gender);
  };
  const handlePlaceChange = (places: string[]) => {
    setSelectedPlaces(places);
  };

  // функция загрузки последующих данных
  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      dispatch(getUsersThunk(nextPage));
    }
  };
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <FilterSection
        onGenderChange={handleGenderChange}
        onPlaceChange={handlePlaceChange}
        selectedGender={selectedGender}
        selectedPlaces={selectedPlaces}
        />
        <GridList
          users={users}
          subCategories={subCategories}
          loading={isLoading}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
        />
      </div>

      <h2>Вариант Dropdown 1</h2>
      <DropdownDemo />

      <h2>Вариант Dropdown 2</h2>
      <DropdownGroupedDemo />

      <h2>SkillForm</h2>
      <SkillForm />

      <h2>AuthForm</h2>
      <AuthForm />

      <h2>user && UserCard</h2>
      {user && (
        <UserCard
          name={user.name}
          from={user.from}
          age={birthdayToFormatedAge(user.birthdate)}
          avatar={getImageUrl(user.photo)}
          teachSkills={user.skill}
          learnSkills={user.need_subcat}
          subCategories={subCategories}
        />
      )}

      <h2>OffersTable</h2>
      <OffersTable userId={API_USER_ID} />

      <h2>SkillCardDetails</h2>
      {/* Настроить передачу свойств от текущего пользователя
      образец user && SkillCard
      все данные есть в user
      убрать константу mySkill */}
      <SkillCardDetails skill={mySkill} />

      {/* появляется, если нажать на колокольчик в header
      <NotificationWidget /> */}

      {/* Отладочные ссылки */}
      <div style={{ padding: "2rem", paddingBottom: "20rem" }}>
        <h2>Debug Links</h2>
        <ul>
          <li>
            <a href="/skills">/skills</a>
          </li>
          <li>
            <a href="/auth/login">/auth/login</a>
          </li>
          <li>
            <a href="/auth/register">/auth/register</a>
          </li>
          <li>
            <a href="/skill/new">/skill/new</a>
          </li>
          <li>
            <a href="/demo/dropdowns">/demo/dropdowns</a>
          </li>
          <li>
            <a href="/demo/skill-details">/demo/skill-details</a>
          </li>
          <li>
            <a href="/skills/123">/skills/:id</a>
          </li>
          <li>
            <a href="/favorites">/favorites</a>
          </li>
          <li>
            <a href="/requests">/requests</a>
          </li>
          <li>
            <a href="/profile">/profile</a>
          </li>
          <li>
            <a href="/profile/notifications">/profile/notifications</a>
          </li>
          <li>
            <a href="/500">/500</a>
          </li>
          <li>
            <a href="/nonexistent">/not-found</a>
          </li>
        </ul>
      </div>

      <SkillMenu />
      <NotFoundPage />
      <ServerErrorPage />
      <Footer />
    </>
  );
};
