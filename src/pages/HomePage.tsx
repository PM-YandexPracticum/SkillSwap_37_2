// src\pages\HomePage.tsx

import React, { useState } from "react";
import { ButtonUI } from "../shared/ui/button/ButtonUI";
import { Footer } from "../widgets/footer/Footer";
import { SkillTag } from "../features/skills/skillTag/SkillTag";
import { Header } from "../widgets/header/Header";
import { users } from "../../public/db/users.json";
import { SkillCard } from "../features/skills/skillCard/SkillCard";
import mockPhoto from "../../public/db/users-photo/00001.jpg";
import { DropdownDemo } from "../widgets/dropdownDemo/DropdownDemo";
import { AuthForm } from "../features/auth/AuthForm"; // для теста
import { FilterSection } from "../features/filters/FilterSection";

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

      <Footer />
    </>
  );
};
