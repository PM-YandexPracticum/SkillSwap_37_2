export type TUser = {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  photo: string;
  from: string;
  email: string;
  about?: string;
}

export type TPlace = {
  id: number;
  name: string;
}

