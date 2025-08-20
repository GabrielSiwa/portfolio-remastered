"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Menu, X, Home, User, FolderOpen, Mail, Sparkles } from "lucide-react";

import type {
  NavItem,
  NavItemProps,
  NavbarScrollHook,
  MobileMenuHook,
} from "../lib/navigation";

const useNavbarScroll = (): NavbarScrollHook => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 20);
    });

    return () => unsubscribe();
  }, [scrollY]);

  return { isScrolled };
};

// Custom hook for mobile menu
const useMobileMenu = (): MobileMenuHook => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen, closeMenu]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileMenuOpen, closeMenu]);

  return {
    isMobileMenuOpen,
    toggleMenu,
    closeMenu,
    menuRef,
  };
};

// Navigation items component
const NavItemComponent = React.memo(
  ({ item, index, isActive, onClick }: NavItemProps) => {
    const IconComponent = item.icon;

    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href={item.href}
          onClick={onClick}
          className={`relative group px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center space-x-2 ${
            isActive
              ? "text-galaxy-text-accent"
              : "text-galaxy-text-primary hover:text-galaxy-text-accent"
          }`}
        >
          <IconComponent className="w-4 h-4" />
          <span>{item.name}</span>
          <span
            className={`absolute inset-x-0 -bottom-1 h-0.5 bg-galaxy-gradient-primary transition-transform duration-200 ${
              isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            }`}
          />
        </Link>
      </motion.div>
    );
  }
);

NavItemComponent.displayName = "NavItem";

// Logo component
const Logo = React.memo(() => {
  const logoVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      variants={logoVariants}
      whileHover="hover"
    >
      <Link href="/" className="group flex items-center space-x-3">
        <div className="relative">
          <span className="text-2xl font-bold text-galaxy-gradient hover:glow-galaxy transition-all duration-500">
            TarO
          </span>
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-galaxy-gradient-primary group-hover:w-full transition-all duration-300"></div>
        </div>
        <motion.div
          whileHover={{ rotate: 180, scale: 1.2 }}
          transition={{ duration: 0.3 }}
        >
          <Sparkles className="w-5 h-5 text-galaxy-text-accent group-hover:text-galaxy-text-primary transition-colors duration-300" />
        </motion.div>
      </Link>
    </motion.div>
  );
});

Logo.displayName = "Logo";

const Navbar = () => {
  const { isScrolled } = useNavbarScroll();
  const { isMobileMenuOpen, toggleMenu, closeMenu, menuRef } = useMobileMenu();
  const pathname = usePathname();

  // Memoize navigation items
  const navItems: NavItem[] = useMemo(
    () => [
      { name: "Home", href: "/", icon: Home },
      { name: "About", href: "/about", icon: User },
      { name: "Projects", href: "/projects", icon: FolderOpen },
      { name: "Contact", href: "/contact", icon: Mail },
    ],
    []
  );

  // Check if current path is active
  const isActiveLink = useCallback(
    (href: string) => {
      return pathname === href;
    },
    [pathname]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey) {
        switch (event.key) {
          case "1":
            window.location.href = "/";
            break;
          case "2":
            window.location.href = "/about";
            break;
          case "3":
            window.location.href = "/projects";
            break;
          case "4":
            window.location.href = "/contact";
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 galaxy-nav ${
        isScrolled ? "glow-galaxy border-galaxy-border" : "bg-galaxy-cosmic/30"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Name Section */}
          <Logo />

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item, index) => (
                <NavItemComponent
                  key={item.name}
                  item={item}
                  index={index}
                  isActive={isActiveLink(item.href)}
                />
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden" ref={menuRef}>
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-galaxy-text-primary hover:text-galaxy-text-accent hover:bg-galaxy-starfield focus:outline-none focus:ring-2 focus:ring-inset focus:ring-galaxy-glow transition-colors duration-200"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
            id="mobile-menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-galaxy-cosmic backdrop-blur-md border-t border-galaxy-border">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover-glow-galaxy ${
                      isActiveLink(item.href)
                        ? "text-galaxy-text-accent bg-galaxy-starfield"
                        : "text-galaxy-text-primary hover:text-galaxy-text-accent hover:bg-galaxy-starfield"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
