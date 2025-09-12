// src\pages\HomePage.tsx

import React from 'react';
import { ButtonUI } from '../shared/ui/button/ButtonUI';
import { Footer } from '../widgets/footer/Footer';
import { SkillTag } from '../features/skills/skillTag/SkillTag';
import { Header } from '../widgets/header/Header';

export const HomePage = () => {
  return (
    <>
      <Header />
      <ButtonUI label="UI" colored onClick={() => alert('U and I')}/>
      <SkillTag rest={2} />
      <SkillTag skill='Английский' />
      <Footer />
    </>
  );
};