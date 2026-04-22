import { Link } from "react-router";
import { SERVICES } from "../data/siteData";
import * as Icons from "./Icons";

export default function Footer() {
  const QUICK_LINKS = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Universities", path: "/universities" },
    { label: "Upcoming Events", path: "/events" },
    { label: "Contact Us", path: "/contact" },
  ];

  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1 shadow-sm border border-gray-800">
                <img src="/logo.png" alt="GAP Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="block text-[14px] font-bold text-white">
                  Global Academic
                </span>
                <span className="block text-[10px] font-semibold text-blue-400 tracking-wider uppercase">
                  Pathway
                </span>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-blue-400/80 mb-5 italic">
              Guiding them for their future career, placement opportunity, part-time jobs, accommodation, and connecting to local community.
            </p>
            <div className="flex gap-3">
              {[
                { label: "Facebook", icon: <Icons.Facebook size={16} />, href: "https://www.facebook.com/share/18eDh8MZhw/?mibextid=wwXIfr" },
                { label: "LinkedIn", icon: <Icons.GraduationCap size={16} />, href: "#" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-500 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">
              Our Services
            </h4>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.title}>
                  <Link
                    to="/services"
                    className="text-sm text-gray-500 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">
              Our Offices
            </h4>
            <ul className="space-y-5">
              <li>
                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">🇧🇩 Bangladesh - Dhaka</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-blue-400 mt-0.5 shrink-0"><Icons.MapPin size={16} /></span>
                    <span className="text-sm text-gray-500">Skytuch Rajkush, 2nd Floor, 43/R, 5/C Panthapath, Dhaka-1205</span>
                  </div>
                </div>
              </li>
              <li>
                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">🇧🇩 Bangladesh - Chittagong</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-blue-400 mt-0.5 shrink-0"><Icons.MapPin size={16} /></span>
                    <span className="text-sm text-gray-500">130/133 Aju Shah Lane, BMA House, Bandar Main Post Office 4100</span>
                  </div>
                </div>
              </li>
              <li>
                <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-2">🇮🇳 India - Gujarat</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-orange-400 mt-0.5 shrink-0"><Icons.MapPin size={16} /></span>
                    <span className="text-sm text-gray-500">TF- 301, Shanti Complex, Near Gurudwara Circle, Anand 388001</span>
                  </div>
                </div>
              </li>
              <li className="pt-2 border-t border-gray-800 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 mt-0.5 shrink-0"><Icons.Phone size={16} /></span>
                  <span className="text-sm text-gray-500">+880 17 5656 0536</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 mt-0.5 shrink-0"><Icons.Mail size={16} /></span>
                  <span className="text-sm text-gray-500">info@globalacademicpathway.org</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Global Academic Pathway. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Cookies"].map((link) => (
              <a key={link} href="#" className="text-xs text-gray-600 hover:text-blue-400 transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
