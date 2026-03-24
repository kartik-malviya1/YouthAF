import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logos/logo.png"; // your logo

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

const linkClass = (isActive) =>
  `relative py-2 transition-colors duration-300 font-medium ${
    isActive
      ? "text-red-500"
      : `${scrolled ? "text-zinc-900" : "text-zinc-300"} hover:text-red-500`
  }`;
const menuItems = [
  { name: "Home", href: "/#home", hash: "#home" },
  { name: "Who We Are", href: "/#about", hash: "#about" },
  { name: "Programs", href: "/#programs", hash: "#programs" },
  { name: "Media", href: "/#news", hash: "#news" },
  { name: "Join Us", href: "/#joinus", hash: "#joinus" },
  { name: "Contact", href: "/#contact", hash: "#contact" },
];

  return (
    <nav
      className={`fixed top-0 w-full z-100 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-zinc-200 py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* 🔥 LOGO + BRAND */}
        <Link to="/#home" className="flex items-center gap-3 group">
          <img
            src={logo}
            className="h-12 object-contain group-hover:scale-110 transition"
          />
<span className="text-xl font-black tracking-tight">
  <span className={scrolled ? "text-zinc-900" : "text-zinc-300"}>
    YouthAid{" "}
  </span>
  <span className="text-red-500">
    Foundation
  </span>
</span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8 items-center">
          {menuItems.map((item) => (
            <Link
              key={item.hash}
              to={item.href}
              className={linkClass(location.pathname === "/" && location.hash === item.hash)}
            >
              {item.name}
              {location.pathname === "/" && location.hash === item.hash ? (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 w-full h-0.5] bg-red-500 rounded-full"
                />
              ) : null}
            </Link>
          ))}

          {/* CTA BUTTON */}
          <Link
            to="/donate"
            className="ml-2 bg-zinc-900 text-white px-5 py-2 rounded-full font-medium hover:bg-red-500 transition shadow-lg hover:shadow-red-500/20"
          >
            Donate
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden">
          <button
         className={`${scrolled ? "text-zinc-900" : "text-white"}`}
            onClick={() => setOpen(!open)}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`h-0.5 w-full bg-current transform transition ${open ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-0.5 w-full bg-current transition ${open ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 w-full bg-current transform transition ${open ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-zinc-200 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.hash}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium text-zinc-600 hover:text-red-500"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
