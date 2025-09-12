// src\pages\HomePage.tsx

import React from 'react';
import { Button } from '../shared/ui/Button';
import { Footer } from '../widgets/footer/Footer';

export const HomePage = () => {
  return (
    <div>
      <h2>Главная страница</h2>
      <Button label="Нажми меня" />
      <Footer />
    </div>
  );
};