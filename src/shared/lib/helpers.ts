// src\shared\lib\helpers.ts

import { USERS_PHOTO_PATH } from "@const/paths";

export const birthdayToFormatedAge = (birthdate: string): string => {
  return formatAge(calculateAge(birthdate));
}

const formatAge = (age: string): string => {
  const ageNum = parseInt(age);
  const lastDigit = ageNum % 10;
  const lastTwoDigits = ageNum % 100;
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${age} лет`;
  }
  
  if (lastDigit === 1) {
    return `${age} год`;
  }
  
  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${age} года`;
  }
  
  return `${age} лет`;
};

const calculateAge = (birthdate: string): string => {
  const birthDate = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age.toString();
};

export const getImageUrl = (photoPath: string): string => {
  return `${USERS_PHOTO_PATH}${photoPath}`;
};