// src\pages\HomePage.tsx

import React from 'react';
import { ButtonUI } from '../shared/ui/button/ButtonUI';
import { Footer } from '../widgets/footer/Footer';

export const HomePage = () => {
  return (
    <div>
      <h2>Главная страница</h2>
      <ButtonUI label="UI" colored onClick={() => alert('U and I')}/>
      <Footer />
    </div>
  );
};
