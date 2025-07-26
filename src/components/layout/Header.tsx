import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Download, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  isMainPage: boolean;
}

export const Header = ({ isMainPage }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(isMainPage ? false : true);

  useEffect(() => {
    if (isMainPage) {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }

  }, []);

  const navItems = [
    { name: "Home", href: "#home", hasDropdown: false },
    // { name: "Services", href: "#services", hasDropdown: false },
    // { name: "Seminars", href: "#seminars" },
    { name: "Gallery", href: "#gallery", hasDropdown: false },
    { name: "About Us", href: "#aboutus", hasDropdown: false },
    { name: "Our Partners", href: "#patners", hasDropdown: false },
    { name: "Our Team", href: "#team", hasDropdown: true },
  ];

  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg'
        : 'bg-transparent'
        }`}
    >
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src={`${isScrolled ? "sli-logo.png" : "sli-logo-white.png"}`}
              alt="Sri Lanka Inspire"
              className="transition-all duration-300 size-20 sm:size-24 lg:size-28"
            />
            <div className="hidden sm:block">
              <h1
                className={`font-bold text-lg sm:text-xl lg:text-2xl ${isScrolled ? "text-purple-800" : "text-white"
                  }`}
              >
                Sri Lanka Inspire
              </h1>
              <p
                className={`text-xs ${isScrolled ? "text-purple-600" : "text-white"
                  }`}
              >
                IEEE Yong Proffessionals Sri Lanka
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="items-center hidden space-x-8 lg:flex">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <a
                  href={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isScrolled
                    ? 'text-gray-700 hover:text-purple-600'
                    : 'text-white hover:text-purple-200'
                    }`}
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </a>
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="items-center hidden space-x-4 lg:flex">
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className={`flex items-center gap-2 border transition-colors font-semibold px-4 py-2 shadow-sm ${isScrolled
                  ? 'border-purple-600 text-purple-700 bg-white hover:bg-purple-50 hover:text-purple-800'
                  : 'border-white text-white bg-transparent hover:bg-white/10 hover:text-purple-200'
                  }`}
                onClick={() => setShowDropdown((prev) => !prev)}
                id="compass-book-dropdown-btn"
                aria-haspopup="true"
                aria-expanded={showDropdown ? "true" : "false"}
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>Compass Book</span>
                <ChevronDown className="w-4 h-4 ml-1 shrink-0" />
              </Button>
              {showDropdown && (
                <div
                  className="absolute right-0 z-50 w-64 mt-2 bg-white border border-purple-100 shadow-xl rounded-xl animate-fade-in"
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <a
                    href="career-compass-book-2023.pdf"
                    download
                    className="flex items-center gap-2 px-4 py-3 font-medium text-purple-800 transition-colors hover:bg-purple-50 hover:text-purple-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="w-4 h-4" />
                    Version 2023 [PDF]
                  </a>
                  <a
                    href="career-compass-book-2020.pdf"
                    download
                    className="flex items-center gap-2 px-4 py-3 font-medium text-purple-800 transition-colors hover:bg-purple-50 hover:text-purple-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="w-4 h-4" />
                    Version 2020 [PDF]
                  </a>
                  <a
                    href="career-compass-book-2015.pdf"
                    download
                    className="flex items-center gap-2 px-4 py-3 font-medium text-purple-800 transition-colors hover:bg-purple-50 hover:text-purple-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="w-4 h-4" />
                    Version 2015 (Sinhala) [PDF]
                  </a>
                </div>
              )}
            </div>
            <a
              href="https://whatsapp.com/channel/0029VaXotgDHVvTh8UzRml32"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="sm"
                className="text-white bg-purple-600 hover:bg-purple-700"
              >
                Join WhatsApp
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${isScrolled
              ? 'text-gray-700 hover:bg-gray-100'
              : 'text-white hover:bg-white/10'
              }`}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white border-t shadow-lg lg:hidden"
          >
            <div className="container px-4 py-4 mx-auto">
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="px-3 py-2 text-gray-700 transition-colors rounded-lg hover:bg-purple-50 hover:text-purple-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
              <div className="flex flex-col pt-4 mt-4 space-y-2 border-t">
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center justify-center w-full gap-2"
                    onClick={() => setShowDropdown((prev) => !prev)}
                    id="compass-book-dropdown-btn-mobile"
                    aria-haspopup="true"
                    aria-expanded={showDropdown ? "true" : "false"}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Compass Book
                    <ChevronDown className="w-4 h-4 ml-1 shrink-0" />
                  </Button>
                  {showDropdown && (
                    <div
                      className="z-50 w-full mt-2 bg-white border border-purple-100 shadow-xl rounded-xl animate-fade-in"
                      onMouseLeave={() => setShowDropdown(false)}
                    >
                      <a
                        href="career-compass-book-2023.pdf"
                        download
                        className="flex items-center gap-2 px-4 py-3 font-medium text-purple-800 transition-colors hover:bg-purple-50 hover:text-purple-900"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Download className="w-4 h-4" />
                        Version 2023 [PDF]
                      </a>
                      <a
                        href="career-compass-book-2020.pdf"
                        download
                        className="flex items-center gap-2 px-4 py-3 font-medium text-purple-800 transition-colors hover:bg-purple-50 hover:text-purple-900"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Download className="w-4 h-4" />
                        Version 2020 [PDF]
                      </a>
                      <a
                        href="career-compass-book-2015.pdf"
                        download
                        className="flex items-center gap-2 px-4 py-3 font-medium text-purple-800 transition-colors hover:bg-purple-50 hover:text-purple-900"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Download className="w-4 h-4" />
                        Version 2015 (Sinhala) [PDF]
                      </a>
                    </div>
                  )}
                </div>
                <a
                  href="https://whatsapp.com/channel/0029VaXotgDHVvTh8UzRml32"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button
                    size="sm"
                    className="justify-center w-full bg-purple-600 hover:bg-purple-700"
                  >
                    Join WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};