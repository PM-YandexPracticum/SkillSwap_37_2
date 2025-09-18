import { useEffect, useState } from "react";
import { Footer } from "../widgets/footer/Footer";
import { Header } from "../widgets/header/Header";
import { DropdownDemo } from "../widgets/dropdownDemo/DropdownDemo";
import { DropdownGroupedDemo } from "../widgets/dropdownDemo/DropdownGroupedDemo";
import { AuthForm } from "../features/auth/AuthForm";
import { SkillForm } from "../widgets/skillForm/SkillForm";
import { FilterSection } from "../features/filters/FilterSection";
import { GridList } from "../widgets/gridList/GridList";
import { getSkillsSubCategoriesApi } from "../api/Api";
import { TPlace, TUserCard } from "../api/types";

import { useSelector } from 'react-redux';
import { getUsersThunk } from '../services/users/actions';
import { RootState } from '../services/store';
import { useDispatch } from '@store';
import { getUserThunk } from "../services/user/actions";

import { getUser } from "../services/user/user-slice";
import { TUser } from '../api/types';
import { SkillCard } from "../features/skills/skillCard/SkillCard";
import { formatAge } from "../shared/lib/helpers";

export const HomePage = () => {
  const API_USER_ID = Number(import.meta.env.VITE_AUTH_USER_ID);
  const dispatch = useDispatch();

  const user = useSelector(getUser);  
  const users = useSelector((state: RootState) => state.users.users);
  
  const [subCategories, setSubCategories] = useState<TPlace[]>([]);
  
  useEffect(() => {
    dispatch(getUserThunk(API_USER_ID));
    dispatch(getUsersThunk());
    getSkillsSubCategoriesApi()
      .then(data => setSubCategories(data.subcategories));
  }, [dispatch]);

  const [selectedGender, setSelectedGender] = useState<string>('');
  const [selectedCities, setSelectedCities] = useState<string[]>([]);

  const handleGenderChange = (gender: string) => {
    setSelectedGender(gender);
  };
  const handleCityChange = (cities: string[]) => {
    setSelectedCities(cities);
  };
  return (
    <>
      <Header />
      {user && <SkillCard
                  name={user.name}
                  from={user.from}
                  age={formatAge(user.age)}
                  avatar={`/db/users-photo/${user.photo}`}
                  teachSkills={user.skill}
                  learnSkills={user.need_subcat}
                  subCategories={subCategories}
        />}
      <GridList users={users} subCategories={subCategories}/>
      <FilterSection
        onGenderChange={handleGenderChange}
        onCityChange={handleCityChange}
        selectedGender={selectedGender}
        selectedCities={selectedCities}
      />

      <h2>Вариант Dropdown 1</h2>
      <DropdownDemo />

      <h2>Вариант Dropdown 2</h2>
      <DropdownGroupedDemo />
      
      <SkillForm/>
      <AuthForm />
      <Footer />
    </>
  );
};


<!-- import React from 'react';
import { ButtonUI } from '../shared/ui/button/ButtonUI';
import { Footer } from '../widgets/footer/Footer';
import { SkillTag } from '../features/skills/skillTag/SkillTag';
import { SkillCardDetails } from '../features/skills/Skill Card/skillCardDetails';

export const HomePage = () => {
  const mySkill = {
    title: "Игра на барабанах",
    subtitle: "Творчество и искусство / Музыка и звук",
    description:
      "Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без партитуры.",
    mainImage: "public/db/skills-photo/drums-1.jpg",
    smallImages: [
      "/public/db/skills-photo/drums-2.jpg",
      "/public/db/skills-photo/drums-3.jpg",
      "/db/skills-photo/+3.png"
    ],
    icons: [
      "src/shared/assets/icons/like.png",
      "src/shared/assets/icons/share.png",
      "src/shared/assets/icons/more-square.png"
    ],
    buttonText: "Предложить обмен",
    onExchange: () => alert("Обмен предложен!"),
  };

  return (
    <div>
      <h2>Главная страница</h2>
      <ButtonUI label="UI" colored onClick={() => alert('U and I')} />
      <SkillTag rest={2} />
      <SkillTag skill="Английский" />

      <SkillCardDetails skill={mySkill} />

-->






