import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { NAV_LINKS } from "../data/siteData";

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-white/95 backdrop-blur-md shadow-[0_1px_20px_rgba(0,0,0,0.08)]"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1 shadow-sm border border-gray-100 group-hover:shadow-blue-100 group-hover:border-blue-100 transition-all duration-300">
              <img src="/logo.png" alt="GAP Logo" className="w-full h-full object-contain" />
            </div>
            <div className="leading-tight">
              <span className="block text-[15px] font-bold text-gray-900">
                Global Academic
              </span>
              <span className="block text-[11px] font-semibold text-blue-600 tracking-wider uppercase">
                Pathway
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const linkPath = link === "Home" ? "/" : `/${link.toLowerCase()}`;
              const isActive = location.pathname === linkPath;
              const isHashLink = !["Home", "About", "Services", "Contact", "Events", "Universities"].includes(link);

              if (!isHashLink) {
                return (
                  <Link
                    key={link}
                    to={linkPath}
                    className={`px-4 py-2 text-sm font-bold transition-all duration-300 rounded-xl ${isActive
                        ? "text-blue-600 bg-blue-50/80 shadow-sm shadow-blue-50 scale-105"
                        : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                  >
                    {link}
                  </Link>
                );
              }

              return (
                <a
                  key={link}
                  href={`/#${link.toLowerCase()}`}
                  className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-all duration-300 rounded-xl hover:bg-gray-50"
                >
                  {link}
                </a>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/registration"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl hover:from-blue-600 hover:to-indigo-700 shadow-sm hover:shadow-blue-200 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
            >
              Registration
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 rounded-xl hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <span
              className={`w-5 h-0.5 bg-gray-700 transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""
                }`}
            />
            <span
              className={`w-5 h-0.5 bg-gray-700 transition-all duration-300 ${mobileOpen ? "opacity-0" : ""
                }`}
            />
            <span
              className={`w-5 h-0.5 bg-gray-700 transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? "max-h-96 pb-4" : "max-h-0"
            }`}
        >
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 mt-2 space-y-1">
            {NAV_LINKS.map((link) => {
              const linkPath = link === "Home" ? "/" : `/${link.toLowerCase()}`;
              const isActive = location.pathname === linkPath;
              const isHashLink = !["Home", "About", "Services", "Contact", "Events", "Universities"].includes(link);

              if (!isHashLink) {
                return (
                  <Link
                    key={link}
                    to={linkPath}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 text-sm font-bold transition-all duration-200 rounded-xl ${isActive
                        ? "text-blue-600 bg-blue-50/80 shadow-inner"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                      }`}
                  >
                    {link}
                  </Link>
                );
              }

              return (
                <a
                  key={link}
                  href={`/#${link.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                >
                  {link}
                </a>
              );
            })}
            <div className="pt-2 border-t border-gray-100">
              <Link
                to="/registration"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl"
              >
                Registration
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
