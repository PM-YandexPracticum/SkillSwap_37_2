// src/pages/HomePage.tsx
import React from 'react';
import { Footer } from '../widgets/footer/Footer';
import { SkillCard } from '../features/skills/Skill Card/SkillCard';
import mySkillImage from '../shared/assets/images/skill.png'; 
import icon1 from '../shared/assets/images/like.png';
import icon2 from '../shared/assets/images/share.png';
import icon3 from '../shared/assets/images/more-square.png';
import image1 from '../shared/assets/images/Image-4.png';
import image2 from '../shared/assets/images/Image-5.png';
import image3 from '../shared/assets/images/+3.png'

export const HomePage = () => {
  return (
    <div>
      <h2>Главная страница</h2>

      <SkillCard
        title="Игра на барабанах"
        subtitle="Творчество и искусство / Музыка и звук"
        description="Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без партитуры."
        mainImage={mySkillImage}             
        smallImages={[image1,image2,image3
          
        ]}
        icons={[icon1, icon2, icon3]}
        buttonText="Предложить обмен"
        onExchange={() => alert('Обмен предложен!')}
      />

      <Footer />
    </div>
  );
};





