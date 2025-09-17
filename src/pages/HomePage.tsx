
import React from 'react';
import { ButtonUI } from '../shared/ui/button/ButtonUI';
import { Footer } from '../widgets/footer/Footer';
import { SkillTag } from '../features/skills/skillTag/SkillTag';
import { SkillCardDetails } from '../features/skills/Skill Card/skillCardDetails';

export const HomePage = () => {
  const mySkill = {
    title: "Игра на барабанах",
    subtitle: "Творчество и искусство / Музыка и звук",
    description:
      "Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без партитуры.",
    mainImage: "public/db/skills-photo/drums-1.jpg",
    smallImages: [
      "/public/db/skills-photo/drums-2.jpg",
      "/public/db/skills-photo/drums-3.jpg",
      "/db/skills-photo/+3.png"
    ],
    icons: [
      "src/shared/assets/icons/like.png",
      "src/shared/assets/icons/share.png",
      "src/shared/assets/icons/more-square.png"
    ],
    buttonText: "Предложить обмен",
    onExchange: () => alert("Обмен предложен!"),
  };

  return (
    <div>
      <h2>Главная страница</h2>
      <ButtonUI label="UI" colored onClick={() => alert('U and I')} />
      <SkillTag rest={2} />
      <SkillTag skill="Английский" />

      <SkillCardDetails skill={mySkill} />

      <Footer />
    </div>
  );
};






