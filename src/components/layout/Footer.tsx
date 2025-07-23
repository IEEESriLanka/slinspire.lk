import React from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Youtube, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "../ui/separator";

export const Footer = () => {
  const socialLinks = [
    { icon: <Facebook className="w-6 h-6" />, href: "#", label: "Facebook" },
    { icon: <Instagram className="w-6 h-6" />, href: "#", label: "Instagram" },
    { icon: <Youtube className="w-6 h-6" />, href: "#", label: "YouTube" },
    { icon: <Linkedin className="w-6 h-6" />, href: "#", label: "LinkedIn" },
    { icon: <MessageCircle className="w-6 h-6" />, href: "#", label: "WhatsApp" }
  ];

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Seminars", href: "#seminars" },
    { name: "Gallery", href: "#gallery" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" }
  ];

  const programs = [
    { name: "Career Compass", href: "#" },
    { name: "After A/L Sessions", href: "#" },
    { name: "After O/L Sessions", href: "#" },
    { name: "Career Book", href: "#" },
    { name: "Question Bank", href: "#" },
    { name: "Past Papers", href: "#" }
  ];

  return (
    <footer className="text-white bg-gray-900">
      <div className="container px-4 py-16 mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6 space-x-3">
              <img
                src="logo.png"
                alt="Sri Lanka Inspire"
                className="w-auto h-12"
              />
              <div>
                <h3 className="text-xl font-bold">Sri Lanka Inspire</h3>
                <p className="text-sm text-gray-400">IEEE National Project</p>
              </div>
            </div>
            <p className="mb-6 leading-relaxed text-gray-300">
              Empowering Sri Lankan students with comprehensive career guidance, educational resources and opportunities for a brighter future.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 transition-colors duration-300 bg-gray-800 rounded-full hover:bg-purple-600"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 transition-colors duration-300 hover:text-purple-400"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="mb-6 text-lg font-semibold">Our Programs</h4>
            <ul className="space-y-3">
              {programs.map((program, index) => (
                <li key={index}>
                  <a
                    href={program.href}
                    className="text-gray-300 transition-colors duration-300 hover:text-purple-400"
                  >
                    {program.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-6 text-lg font-semibold">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="flex-shrink-0 w-5 h-5 mt-1 text-purple-400" />
                <div>
                  <p className="text-gray-300">ieeeslinspire@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="flex-shrink-0 w-5 h-5 mt-1 text-purple-400" />
                <div>
                  <p className="text-gray-300">+94 77 474 3603</p>
                  <p className="text-gray-300">+94 76 985 1160</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="flex-shrink-0 w-5 h-5 mt-1 text-purple-400" />
                <p className="text-gray-300">
                  IEEE Sri Lanka Section<br />
                  Colombo, Sri Lanka
                </p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between md:flex-row">
          <p className="mb-4 text-sm text-gray-400 md:mb-0">
            © 2025 Sri Lanka Inspire. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 transition-colors hover:text-purple-400">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 transition-colors hover:text-purple-400">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 transition-colors hover:text-purple-400">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};