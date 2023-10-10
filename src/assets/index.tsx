import Backspace from "./backspace.svg";
import left from "./chevron-left.svg";
import right from "./chevron-right.svg";
import menu from "./menu.svg";
import deleteIcon from "./delete.svg";

export const Icons = {
  Backspace,
};

export const ChevronLeftIcon = () => <img src={left} alt="" />;
export const ChevronRightIcon = () => <img src={right} alt="" />;
export const MenuIcon = () => <img src={menu} alt="" />;
export const DeleteIcon = () => <img src={deleteIcon} alt="" />;
