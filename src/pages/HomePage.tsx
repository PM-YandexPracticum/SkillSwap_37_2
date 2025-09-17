// src\pages\HomePage.tsx

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

export const HomePage = () => {

  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);

  const [subCategories, setSubCategories] = useState<TPlace[]>([]);

  useEffect(() => {
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