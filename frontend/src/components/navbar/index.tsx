import { MenuIcon, XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

import Dropdown from "../dropdown";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  backgroundColor?: string;
  shadow?: string;
  maxWidth?: string;
  logoIcon?: React.ReactNode;
  logoText?: string;
  links?: {
    path: string;
    label: string;
    submenu: { path: string; label: string }[];
  }[];
  linksPosition?: "left" | "center" | "right";
  position?: "fixed" | "sticky";
  transparent?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  backgroundColor = "bg-white",
  shadow = "shadow-sm",
  maxWidth = "max-w-7xl",
  logoIcon,
  logoText = "",
  links,
  linksPosition = "left",
  position = "sticky",
  transparent = false,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSubmenu = (index: number) => {
    setActiveSubmenu((prev) => (prev === index ? null : index));
  };

  const getLinksPositionClasses = () => {
    switch (linksPosition) {
      case "center":
        return "justify-center";
      case "right":
        return "justify-end";
      default:
        return "justify-start";
    }
  };

  useEffect(() => {
    // Menutup menu saat path berubah
    setMenuOpen(false);
    setActiveSubmenu(null); // Menutup submenu
  }, [location.pathname]); // Memonitor perubahan path

  const positionClass =
    position === "fixed"
      ? "fixed top-0 left-0 w-full z-50"
      : "sticky top-0 z-50";

  return (
    <nav
      className={`${transparent ? "bg-transparent" : "bg-white"} ${shadow} ${
        position ? positionClass : ""
      } transition-colors duration-300 border-b-8 border-b-mango`}
    >
      <div className={`w-full ${maxWidth} mx-auto px-4`}>
        <div className="flex justify-between h-20 items-center">
          {logoIcon && (
            <Link to={"/"} className="flex items-center gap-2">
              {logoIcon}
              <div className="flex flex-col uppercase text-indigo">
                <span className="text-xs font-semibold">
                  Kementerian Pekerjaan Umum
                </span>
                <span className="text-xs font-semibold">
                  Direktorat Jenderal Sumber Daya Air
                </span>
                <span className="text-sm">BBWS Sumatera VIII</span>
              </div>
            </Link>
          )}
          <span className="uppercase text-indigo">{logoText}</span>
          <div className="flex items-center min-[1021px]:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {menuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
          {links && (
            <nav
              className={`hidden min-[1021px]:flex h-full gap-5 flex-1 ${getLinksPositionClasses()} ml-4`}
            >
              {links.map((link, index) =>
                link.submenu ? (
                  <Dropdown
                    key={index}
                    label={link.label}
                    submenu={link.submenu}
                  />
                ) : (
                  <Link
                    key={index}
                    to={link.path}
                    className={`font-medium flex items-center text-base transition-colors hover:underline text-black p-2`}
                    onClick={() =>
                      link.submenu ? toggleSubmenu(index) : setMenuOpen(false)
                    }
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>
          )}
        </div>
      </div>
      {links && menuOpen && (
        <div
          className={`min-[1021px]:hidden px-2 pb-3 fixed ${backgroundColor} ${shadow} w-full`}
        >
          {links.map((link, index) => (
            <div key={index}>
              <Link
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  activeSubmenu === index ? "text-blue-500" : "text-gray-700"
                } hover:bg-gray-100 hover:underline`}
                onClick={() =>
                  link.submenu ? toggleSubmenu(index) : setMenuOpen(false)
                }
              >
                {link.label}
              </Link>
              {link.submenu && activeSubmenu === index && (
                <div className="ml-4">
                  {link.submenu.map((submenuItem, subIndex) => (
                    <Link
                      key={subIndex}
                      to={submenuItem.path}
                      className={`block px-3 py-2 rounded-md text-sm font-medium hover:text-gray-900 hover:bg-gray-50 ${
                        location.pathname === submenuItem.path
                          ? "font-bold text-blue-500"
                          : "text-gray-600"
                      }`}
                    >
                      {submenuItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
