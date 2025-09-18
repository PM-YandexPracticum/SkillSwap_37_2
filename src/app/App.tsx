// src\app\App.tsx

import React from 'react';
import { HomePage } from '../pages/HomePage';
import { Header } from '../widgets/header/Header';
import { Footer } from '../widgets/footer/Footer';

export const App = () => {
  return (
    <>
      <Header />
      <main>
        <HomePage />
      </main>
      <Footer />
    </>
    
  );
};

export default App;
