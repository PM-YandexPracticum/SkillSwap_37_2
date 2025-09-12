// src\app\App.tsx

import React from 'react';
import { HomePage } from '../pages/HomePage';
import { AuthForm } from '../features/auth/AuthForm'; // для теста

export const App = () => {
  return (
    <div>
      <AuthForm /> 
      {/*
      <h1>SkillSwap</h1>
      <HomePage />
      */}
    </div>
  );
};

export default App;
