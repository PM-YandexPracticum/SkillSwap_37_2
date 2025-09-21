import { FC } from "react";
import clsx from "clsx";
import styles from "./Icon.module.css";
import { IconName } from "./icons";

// Импорт всех иконок как React-компоненты (поэтому с большой буквы + добавляем ?react)
import AddIcon from "../../assets/icons/add.svg?react";
import AppleIcon from "../../assets/icons/Apple.svg?react";
import ArrowLeftIcon from "../../assets/icons/arrow-left.svg?react";
import ArrowSquareLeftIcon from "../../assets/icons/arrow-square-left.svg?react";
import ArrowSquareRightIcon from "../../assets/icons/arrow-square-right.svg?react";
import BookIcon from "../../assets/icons/book.svg?react";
import BriefcaseIcon from "../../assets/icons/briefcase.svg?react";
import CalendarIcon from "../../assets/icons/calendar.svg?react";
import CheckboxDoneIcon from "../../assets/icons/checkbox-done.svg?react";
import CheckboxEmptyIcon from "../../assets/icons/checkbox-empty.svg?react";
import CheckboxRemoveIcon from "../../assets/icons/checkbox-remove.svg?react";
import ChevronDownIcon from "../../assets/icons/chevron-down.svg?react";
import ChevronRightIcon from "../../assets/icons/chevron-right.svg?react";
import ChevronUpIcon from "../../assets/icons/chevron-up.svg?react";
import ClockIcon from "../../assets/icons/clock.svg?react";
import CountIcon from "../../assets/icons/count.svg?react";
import CrossIcon from "../../assets/icons/cross.svg?react";
import DoneIcon from "../../assets/icons/Done.svg?react";
import EditIcon from "../../assets/icons/edit.svg?react";
import EyeIcon from "../../assets/icons/eye.svg?react";
import EyeSlashIcon from "../../assets/icons/eye-slash.svg?react";
import FilterIcon from "../../assets/icons/filter-square.svg?react";
import GalleryAddIcon from "../../assets/icons/gallery-add.svg?react";
import GalleryEditIcon from "../../assets/icons/gallery-edit.svg?react";
import GlobalIcon from "../../assets/icons/global.svg?react";
import GoogleIcon from "../../assets/icons/google.svg?react";
import HomeIcon from "../../assets/icons/home.svg?react";
import IdeaIcon from "../../assets/icons/idea.svg?react";
import LifeStyleIcon from "../../assets/icons/lifestyle.svg?react";
import LikeIcon from "../../assets/icons/like.svg?react";
import LikeActiveIcon from "../../assets/icons/Like-active.svg?react";
import LogoIcon from "../../assets/icons/Logo.svg?react";
import LogoutIcon from "../../assets/icons/logout.svg?react";
import MessageIcon from "../../assets/icons/message-text.svg?react";
import MoonIcon from "../../assets/icons/moon.svg?react";
import MoreIcon from "../../assets/icons/more-square.svg?react";
import NotificationIcon from "../../assets/icons/notification.svg?react";
import PaletteIcon from "../../assets/icons/palette.svg?react";
import PlusIcon from "../../assets/icons/plus-circle.svg?react";
import RadioActiveIcon from "../../assets/icons/radiobutton-active.svg?react";
import RadioEmptyIcon from "../../assets/icons/radiobutton-empty.svg?react";
import RequestIcon from "../../assets/icons/request.svg?react";
import ScrollSquareIcon from "../../assets/icons/scroll.svg?react";
import ScrollIcon from "../../assets/icons/scroll-2.svg?react";
import SearchIcon from "../../assets/icons/search.svg?react";
import ShareIcon from "../../assets/icons/share.svg?react";
import SortIcon from "../../assets/icons/sort.svg?react";
import SunIcon from "../../assets/icons/sun.svg?react";
import UserCircleIcon from "../../assets/icons/user-circle.svg?react";
import UserIcon from "../../assets/icons/user.svg?react";

// Как называются иконки
const icons = {
  google: GoogleIcon,
  apple: AppleIcon,
  eye: EyeIcon,
  eyeSlash: EyeSlashIcon,
  chevronUp: ChevronUpIcon,
  chevronRight: ChevronRightIcon,
  chevronDown: ChevronDownIcon,
  checkboxDone: CheckboxDoneIcon,
  checkboxEmpty: CheckboxEmptyIcon,
  search: SearchIcon,
  moon: MoonIcon,
  notification: NotificationIcon,
  idea: IdeaIcon,
  logo: LogoIcon,
  like: LikeIcon,
  lifestyle: LifeStyleIcon,
  book: BookIcon,
  palette: PaletteIcon,
  home: HomeIcon,
  global: GlobalIcon,
  briefcase: BriefcaseIcon,
  add: AddIcon,
  userCircle: UserCircleIcon,
  calendar: CalendarIcon,
  done: DoneIcon,
  sort: SortIcon,
} as const;

interface IconProps {
  name: IconName;
  size?: "s" | "m" | "l" | number;
  className?: string;
  color?: string;
}

export const Icon: FC<IconProps> = ({ name, size = "s", className, color }) => {
  const IconComponent = icons[name];

  const sizeMap = {
    s: 24, // маленький
    m: 54, // средний
    l: 75, // большой
  };

  const iconSize = typeof size === "number" ? size : sizeMap[size];

  return (
    <IconComponent
      className={clsx(styles.icon, className)}
      style={{
        width: iconSize,
        height: iconSize,
        fill: color,
      }}
    />
  );
};
