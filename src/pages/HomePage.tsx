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
import { TPlace } from "../api/types";

import { useSelector } from 'react-redux';
import { getUsersThunk } from '../services/users/actions';
import { RootState } from '../services/store';
import { useDispatch } from '@store';
import { getUserThunk } from "../services/user/actions";

import { getUser } from "../services/user/user-slice";
import { SkillCard } from "../features/skills/skillCard/SkillCard";
import { formatAge } from "../shared/lib/helpers";
import { SkillCardDetails } from "../features/skills/Skill Card/skillCardDetails";
import { SkillTag } from "../features/skills/skillTag/SkillTag";
import { ButtonUI } from "../shared/ui/button/ButtonUI";
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

      <div className={styles.wrapper}>
        <FilterSection
        onGenderChange={handleGenderChange}
        onCityChange={handleCityChange}
        selectedGender={selectedGender}
        selectedCities={selectedCities}
        />
        <GridList users={users} subCategories={subCategories}/>
      </div>
      

      <h2>Вариант Dropdown 1</h2>
      <DropdownDemo />

      <h2>Вариант Dropdown 2</h2>
      <DropdownGroupedDemo />
      
      <h2>SkillForm</h2>
      <SkillForm/>

      <h2>AuthForm</h2>
      <AuthForm />

      <h2>user && SkillCard</h2>
      {user && <SkillCard
                  name={user.name}
                  from={user.from}
                  age={formatAge(user.age)}
                  avatar={`/db/users-photo/${user.photo}`}
                  teachSkills={user.skill}
                  learnSkills={user.need_subcat}
                  subCategories={subCategories}
        />}

      <h2>SkillCardDetails</h2>
      // Настроить передачу свойств от текущего пользователя
      // образец user && SkillCard
      // все данные есть в user
      // уьрать константу mySkill
      <SkillCardDetails skill={mySkill} />
      <Footer />
    </>
  );
};