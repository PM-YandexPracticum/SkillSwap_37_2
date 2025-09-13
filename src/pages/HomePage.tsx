// src\pages\HomePage.tsx

import React from "react";
import { ButtonUI } from "../shared/ui/button/ButtonUI";
import { Footer } from "../widgets/footer/Footer";
import { SkillTag } from "../features/skills/skillTag/SkillTag";
import { Header } from "../widgets/header/Header";
import { users } from "../../public/db/users.json";
import { SkillCard } from "../features/skills/skillCard/SkillCard";
import mockPhoto from "../../public/db/users-photo/00001.jpg";
import { AuthForm } from "../features/auth/AuthForm"; // для теста

export const HomePage = () => {
  return (
    <>
      <Header />
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
