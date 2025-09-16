import { useEffect, useState } from "react";
import { Footer } from "../widgets/footer/Footer";
import { Header } from "../widgets/header/Header";
import { DropdownDemo } from "../widgets/dropdownDemo/DropdownDemo";
import { AuthForm } from "../features/auth/AuthForm"; // для теста
import { SkillForm } from "../widgets/skillForm/SkillForm";
import { FilterSection } from "../features/filters/FilterSection";
import { GridList } from "../widgets/gridList/GridList";
import { getSkillsSubCategoriesApi, getUsersApi } from "../api/Api";
import { TPlace, TUserCard } from "../api/types";
import { usersMock } from '../widgets/gridList/usersMock';

export const HomePage = () => {

  const [users, setUsers] = useState<TUserCard[]>([]);
  const [subCategories, setSubCategories] = useState<TPlace[]>([]);

  useEffect(() => {
    getUsersApi()
    .then(data => setUsers(data.users));
    getSkillsSubCategoriesApi()
    .then(data => setSubCategories(data.subcategories))
  }, []);

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
      <DropdownDemo />
      <SkillForm/>
      <AuthForm />
      <DropdownDemo />
      <AuthForm />
      <Footer />
    </>
  );
};