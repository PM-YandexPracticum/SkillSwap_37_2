// src\pages\HomePage.tsx

import React, { useState } from "react";
import { Footer } from "../widgets/footer/Footer";
import { Header } from "../widgets/header/Header";
import { SkillCard } from "../features/skills/skillCard/SkillCard";
import { DropdownDemo } from "../widgets/dropdownDemo/DropdownDemo";
import { AuthForm } from "../features/auth/AuthForm"; // для теста
import { FilterSection } from "../features/filters/FilterSection";
import { users } from "../../public/db/users.json";
const mockPhoto = "/db/users-photo/00001.jpg";

export const HomePage = () => {

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
      <FilterSection
        onGenderChange={handleGenderChange}
        onCityChange={handleCityChange}
        selectedGender={selectedGender}
        selectedCities={selectedCities}
      />
      <DropdownDemo />
      <AuthForm />
      <SkillCard
        name={users[0].name}
        age={users[0].age}
        from={users[0].from}
        avatar={mockPhoto}
        teachSkill="Английский"
        learnSkill="Игра на барабанах"
      />
      <DropdownDemo />
      <AuthForm />
      <Footer />
    </>
  );
};