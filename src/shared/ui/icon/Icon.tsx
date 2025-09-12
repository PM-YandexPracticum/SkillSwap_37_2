import { FC } from 'react';
import clsx from 'clsx';
import styles from './Icon.module.css';

// Импорт всех иконок как React-компоненты (поэтому с большой буквы + добавляем ?react)
import AddIcon from '../../assets/icons/add.svg?react'
import AppleIcon from '../../assets/icons/Apple.svg?react';
import ArrowLeftIcon from '../../assets/icons/arrow-left.svg?react';
import ArrowSquareLeftIcon from '../../assets/icons/arrow-square-left.svg?react';
import ArrowSquareRightIcon from '../../assets/icons/arrow-square-right.svg?react';
import BookIcon from '../../assets/icons/book.svg';
import BriefcaseIcon from '../../assets/icons/briefcase.svg';
import CalendarIcon from '../../assets/icons/calendar.svg';
import CheckboxDoneIcon from '../../assets/icons/checkbox-done.svg';
import CheckboxEmptyIcon from '../../assets/icons/checkbox-empty.svg';
import CheckboxRemoveIcon from '../../assets/icons/checkbox-remove.svg';
import ChevronDownIcon from '../../assets/icons/chevron-down.svg';
import ChevronRightIcon from '../../assets/icons/chevron-right.svg';
import ChevronUpIcon from '../../assets/icons/chevron-up.svg';
import ClockIcon from '../../assets/icons/clock.svg';
import CountIcon from '../../assets/icons/count.svg';
import CrossIcon from '../../assets/icons/cross.svg';
import DoneIcon from '../../assets/icons/Done.svg';
import EditIcon from '../../assets/icons/edit.svg';
import EyeIcon from '../../assets/icons/eye.svg?react';
import EyeSlashIcon from '../../assets/icons/eye-slash.svg?react';
import FilterIcon from '../../assets/icons/filter-square.svg';
import GalleryAddIcon from '../../assets/icons/gallery-add.svg';
import GalleryEditIcon from '../../assets/icons/gallery-edit.svg';
import GlobalIcon from '../../assets/icons/global.svg';
import GoogleIcon from '../../assets/icons/google.svg?react';
import HomeIcon from '../../assets/icons/home.svg';
import IdeaIcon from '../../assets/icons/idea.svg';
import LifeStyleIcon from '../../assets/icons/lifestyle.svg';
import LikeIcon from '../../assets/icons/like.svg';
import LikeActiveIcon from '../../assets/icons/Like-active.svg';
import LogoIcon from '../../assets/icons/Logo.svg';
import LogoutIcon from '../../assets/icons/logout.svg';
import MessageIcon from '../../assets/icons/message-text.svg';
import MoonIcon from '../../assets/icons/moon.svg';
import MoreIcon from '../../assets/icons/more-square.svg';
import NotificationIcon from '../../assets/icons/notification.svg';
import PaletteIcon from '../../assets/icons/palette.svg';
import PlusIcon from '../../assets/icons/plus-circle.svg';
import RadioActiveIcon from '../../assets/icons/radiobutton-active.svg';
import RadioEmptyIcon from '../../assets/icons/radiobutton-empty.svg';
import RequestIcon from '../../assets/icons/request.svg';
import ScrollSquareIcon from '../../assets/icons/scroll.svg';
import ScrollIcon from '../../assets/icons/scroll-2.svg';
import SearchIcon from '../../assets/icons/search.svg';
import ShareIcon from '../../assets/icons/share.svg';
import SortIcon from '../../assets/icons/sort.svg';
import SunIcon from '../../assets/icons/sun.svg';
import UserCircleIcon from '../../assets/icons/user-circle.svg';
import UserIcon from '../../assets/icons/user.svg';

// Как называются иконки
const icons = {
  google: GoogleIcon,
  apple: AppleIcon,
  eye: EyeIcon,
  eyeSlash: EyeSlashIcon,
} as const;

// Типы для пропсов
export type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  size?: 's' | 'm' | 'l' | number;
  className?: string;
}

export const Icon: FC<IconProps> = ({ 
  name, 
  size = 's', 
  className, 
}) => {
  const IconComponent = icons[name];
  
  const sizeMap = {
    s: 24, // маленький
    m: 54, // средний
    l: 75, // большой
  };

  const iconSize = typeof size === 'number' ? size : sizeMap[size];

  return (
    <IconComponent 
      className={clsx(styles.icon, className)}
      style={{ 
        width: iconSize, 
        height: iconSize,
      }}
    />
  );
};