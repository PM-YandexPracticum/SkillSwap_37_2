// SkillTag.tsx
import { SkillName } from '../../../shared/types/SkillName';
import { skillColors } from './skillColors';
import { SkillTagUI } from '../../../shared/ui/skillTag/SkillTagUI';

type SkillTagProps = {
  skill?: SkillName;
  rest?: number;
};

// Если не указывать проп-skill, то покажет проп-rest (когда нужно показать
//  количество невместившихся скилов) 
//  Поэтому указываем либо проп-скилл, либо проп-rest

export const SkillTag = ({ skill, rest }: SkillTagProps) => {
  if (!skill && rest) {
    return <SkillTagUI label={`+${rest}`} backgroundColor="#e8ecf7" />;
  }

  if (skill) {
    return (
      <SkillTagUI
        label={skill}
        backgroundColor={skillColors[skill] ?? "#e8ecf7"}
      />
    );
  }

  return null;
};
