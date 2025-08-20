import { LucideIcon } from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

export interface NavbarScrollHook {
  isScrolled: boolean;
}

export interface MobileMenuHook {
  isMobileMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
}

export interface NavItemProps {
  item: NavItem;
  index: number;
  isActive: boolean;
  onClick?: () => void;
}
