import { Footer } from '../widgets/footer/Footer';
import { Header } from '../widgets/header/Header';
import { users } from '../../public/db/users.json';
import { SkillCard } from '../features/skills/skillCard/SkillCard';
import mockPhoto from '../../public/db/users-photo/00001.jpg'

export const HomePage = () => {
  return (
    <>
      <Header />
      <SkillCard
        name={users[0].name}
        age={users[0].age}
        from={users[0].from}
        avatar={mockPhoto}
        teachSkill='Английский'
        learnSkill='Игра на барабанах'
      />
      <Footer />
    </>
  );
};