// SkillTag.tsx
import { SkillTagUI } from '../../../shared/ui/skillTag/SkillTagUI';
import { RootState, useSelector } from '@store';

type SkillTagProps = {
  skill?: string;
  rest?: number;
  className?: string;
};

// Если не указывать проп-skill, то покажет проп-rest (когда нужно показать
//  количество невместившихся скилов) 
//  Поэтому указываем либо проп-скилл, либо проп-rest

export const SkillTag = ({ skill, rest, className }: SkillTagProps) => {
  const subcategories = useSelector((s: RootState) => s.categories.subcategories);
  if (!skill && rest) {
    return (
      <SkillTagUI
        className={className}
        label={`+${rest}`}
        backgroundColor="#e8ecf7"
      />);
  }

  if (skill) {
    const subcat = subcategories.find((s) => s.name === skill);
    return (
      <SkillTagUI
        className={className}
        label={skill}
        backgroundColor={subcat?.color ?? "#e8ecf7"}
        // backgroundColor={skillColors[skill] ?? "#e8ecf7"}
      />
    );
  }

  return null;
};
