import { Link } from "react-router-dom";
import logo from "../assets/logos/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    "Home",
    "About",
    "Programs",
    "Media",
    "Join Us",
    "Contact",
  ];

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-900 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-12">
        
        {/* 🔥 BRAND */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <img src={logo} className="h-10 object-contain" />

            <span className="text-xl font-black">
              <span className="text-white">YouthAid </span>
              <span className="text-red-500">Foundation</span>
            </span>
          </div>

          <p className="text-sm text-zinc-500 leading-relaxed">
            Empowering communities through entrepreneurship, mentorship,
            and sustainable development solutions across India.
          </p>
        </div>

        {/* 🔥 QUICK LINKS */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-red-500 mb-6">
            Quick Links
          </h2>

          <nav className="flex flex-col gap-3 text-sm">
            {links.map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(" ", "")}`}
                className="hover:text-white hover:translate-x-1 transition-all duration-300"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>

        {/* 🔥 CORE PILLARS */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-red-500 mb-6">
            Core Pillars
          </h2>

          <div className="flex flex-col gap-3 text-sm">
            {[
              "WASH Infrastructure",
              "Startup Support",
              "Capacity Building",
              "Research & Impact",
            ].map((item) => (
              <Link
                key={item}
                to="/programs"
                className="hover:text-white hover:translate-x-1 transition-all duration-300"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* 🔥 CONTACT */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-red-500 mb-6">
            Reach Out
          </h2>

          <div className="text-sm space-y-4">
            <p className="flex items-center gap-3">
              <span className="text-red-500">📍</span>
              Pune, India
            </p>

            <p className="flex items-center gap-3">
              <span className="text-red-500">📧</span>
              youthaidf@gmail.com
            </p>

            <p className="flex items-center gap-3">
              <span className="text-red-500">📞</span>
              +91 7744049934
            </p>

            <p className="text-zinc-500 italic mt-4 border-t border-zinc-900 pt-4">
              "Improving lives, strengthening dignity, and building sustainable futures."
            </p>
          </div>
        </div>
      </div>

      {/* 🔥 BOTTOM */}
      <div className="border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600">

          <p>© {currentYear} YouthAid Foundation. All rights reserved.</p>

          <div className="flex gap-6">
            <Link to="/policies" className="hover:text-white transition">
              Policies
            </Link>
            <button className="hover:text-white transition">
              Terms of Service
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}