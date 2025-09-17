// src\pages\HomePage.tsx

import { useEffect, useState } from "react";
import { Footer } from "../widgets/footer/Footer";
import { Header } from "../widgets/header/Header";
import { DropdownDemo } from "../widgets/dropdownDemo/DropdownDemo";
import { AuthForm } from "../features/auth/AuthForm"; // для теста

export const HomePage = () => {
  const API_USER_ID = Number(import.meta.env.VITE_AUTH_USER_ID);
  const dispatch = useDispatch();

  const user = useSelector(getUser);  
  const users = useSelector((state: RootState) => state.users.users);
  
  const [subCategories, setSubCategories] = useState<TPlace[]>([]);
  
  useEffect(() => {
    dispatch(getUserThunk(API_USER_ID));
    dispatch(getUsersThunk());
    getSkillsSubCategoriesApi()
      .then(data => setSubCategories(data.subcategories));
  }, [dispatch]);

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
      {user && <SkillCard
                  name={user.name}
                  from={user.from}
                  age={formatAge(user.age)}
                  avatar={`/db/users-photo/${user.photo}`}
                  teachSkills={user.skill}
                  learnSkills={user.need_subcat}
                  subCategories={subCategories}
        />}
      <GridList users={users} subCategories={subCategories}/>
      <FilterSection
        onGenderChange={handleGenderChange}
        onCityChange={handleCityChange}
        selectedGender={selectedGender}
        selectedCities={selectedCities}
      />
      <DropdownDemo />
      <SkillForm/>
      <AuthForm />
      <DropdownDemo />
      <SkillMenu />
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