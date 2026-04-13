import { useState, useEffect, useRef } from "react";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Global Academic Pathway | Study Abroad Consultancy" },
    {
      name: "description",
      content:
        "Global Academic Pathway helps students achieve their dream of studying abroad with expert university selection, visa processing, scholarship guidance, and more.",
    },
    { name: "keywords", content: "study abroad, international education, university admission, visa processing, scholarship guidance" },
  ];
}

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Home", "About", "Services", "Countries", "Universities", "Contact"];

const DESTINATIONS = [
  {
    country: "United Kingdom",
    emoji: "🇬🇧",
    tag: "UK",
    universities: "150+",
    programs: "2,400+",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80",
    description: "World-class universities like Oxford, Cambridge & Imperial",
    intake: "Sep / Jan",
  },
  {
    country: "Canada",
    emoji: "🇨🇦",
    tag: "CA",
    universities: "100+",
    programs: "1,800+",
    image:
      "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=600&q=80",
    description: "Post-study work permits & pathway to permanent residency",
    intake: "Sep / Jan / May",
  },
  {
    country: "Australia",
    emoji: "🇦🇺",
    tag: "AU",
    universities: "43+",
    programs: "1,200+",
    image:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&q=80",
    description: "Top-ranked universities & vibrant multicultural lifestyle",
    intake: "Feb / Jul",
  },
  {
    country: "United States",
    emoji: "🇺🇸",
    tag: "USA",
    universities: "200+",
    programs: "3,000+",
    image:
      "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=600&q=80",
    description: "Ivy League institutions, Silicon Valley & research excellence",
    intake: "Aug / Jan",
  },
];

const SERVICES = [
  {
    icon: "🎓",
    title: "University Selection",
    desc: "We match you with the universities that align with your academic profile, goals, and budget.",
    color: "from-teal-500 to-emerald-600",
  },
  {
    icon: "📋",
    title: "Application Support",
    desc: "End-to-end application management including SOP, LOR, and document preparation.",
    color: "from-cyan-500 to-teal-600",
  },
  {
    icon: "🛂",
    title: "Visa Processing",
    desc: "Expert visa counseling with high success rates for student visas worldwide.",
    color: "from-emerald-500 to-green-600",
  },
  {
    icon: "💰",
    title: "Scholarship Guidance",
    desc: "Identify and apply for scholarships to reduce your financial burden significantly.",
    color: "from-teal-600 to-cyan-700",
  },
  {
    icon: "🎤",
    title: "Interview Preparation",
    desc: "Mock interviews and coaching to help you ace embassy and university interviews.",
    color: "from-green-500 to-teal-600",
  },
  {
    icon: "✈️",
    title: "Pre-Departure Briefing",
    desc: "Travel guidance, accommodation help, and cultural orientation before you fly.",
    color: "from-cyan-600 to-emerald-700",
  },
];

const STEPS = [
  {
    num: "01",
    icon: "🔍",
    title: "Choose Your Program",
    desc: "Browse thousands of programs across 50+ countries and find your perfect match.",
  },
  {
    num: "02",
    icon: "📝",
    title: "Submit Your Application",
    desc: "Our experts prepare and submit your application with all required documents.",
  },
  {
    num: "03",
    icon: "🛂",
    title: "Get Your Student Visa",
    desc: "We guide you through the visa process with expert advice and documentation support.",
  },
  {
    num: "04",
    icon: "✈️",
    title: "Fly & Start Studying",
    desc: "Board your flight and begin your international academic journey with confidence.",
  },
];

const UNIVERSITIES = [
  { name: "University of Toronto", country: "Canada", rank: "#18 QS World", field: "Engineering & CS" },
  { name: "University of Melbourne", country: "Australia", rank: "#14 QS World", field: "Business & Law" },
  { name: "University College London", country: "UK", rank: "#9 QS World", field: "Medicine & Science" },
  { name: "New York University", country: "USA", rank: "#39 QS World", field: "Arts & Humanities" },
  { name: "University of Edinburgh", country: "UK", rank: "#27 QS World", field: "Technology & Data" },
  { name: "McGill University", country: "Canada", rank: "#32 QS World", field: "Health Sciences" },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    country: "Studying in UK 🇬🇧",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "Global Academic Pathway made my dream of studying at UCL a reality. Their visa support was exceptional and I got my student visa in just 3 weeks!",
    university: "University College London",
    program: "MSc Data Science",
    rating: 5,
  },
  {
    name: "Ahmed Al-Rashid",
    country: "Studying in Canada 🇨🇦",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "From selecting the university to getting my PR pathway guidance, they supported me at every step. Highly recommend their scholarship guidance team!",
    university: "University of British Columbia",
    program: "MBA",
    rating: 5,
  },
  {
    name: "Liu Wei",
    country: "Studying in Australia 🇦🇺",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    review:
      "The team helped me secure a partial scholarship worth AUD 12,000 at the University of Melbourne. Their SOP writing guidance was outstanding.",
    university: "University of Melbourne",
    program: "Masters in Education",
    rating: 5,
  },
  {
    name: "Fatima Malik",
    country: "Studying in USA 🇺🇸",
    image: "https://randomuser.me/api/portraits/women/90.jpg",
    review:
      "I was confused about which university to choose, but their counselors gave me a clear roadmap. Now I'm at NYU and loving every moment!",
    university: "New York University",
    program: "BSc Computer Science",
    rating: 5,
  },
];

const PARTNERS = [
  "Oxford University", "University of Toronto", "MIT", "UCLA",
  "University of Melbourne", "Edinburgh University", "McGill", "NYU",
];

// ─── Sub-Components ───────────────────────────────────────────────────────────

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [country, setCountry] = useState("");
  const [program, setProgram] = useState("");
  const [degree, setDegree] = useState("");
  const heroRef = useRef<HTMLDivElement>(null);

  // Navbar scroll shrink + back-to-top visibility
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setShowBackTop(y > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-reveal via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
            entry.target.classList.remove("section-hidden");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lazy image loaded class
  useEffect(() => {
    document.querySelectorAll("img[loading='lazy']").forEach((img) => {
      const el = img as HTMLImageElement;
      if (el.complete) {
        el.classList.add("loaded");
      } else {
        el.addEventListener("load", () => el.classList.add("loaded"));
      }
    });
  }, []);

  // Testimonial auto-rotate
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((p) => (p + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen font-sans bg-white text-gray-900 overflow-x-hidden">
      {/* ── NAVBAR ─────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_20px_rgba(0,0,0,0.08)]"
            : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-teal-200 transition-shadow duration-300">
                <span className="text-white text-lg font-bold">G</span>
              </div>
              <div className="leading-tight">
                <span className="block text-[15px] font-bold text-gray-900">Global Academic</span>
                <span className="block text-[11px] font-semibold text-teal-600 tracking-wider uppercase">Pathway</span>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-teal-600 rounded-lg hover:bg-teal-50 transition-all duration-200"
                >
                  {link}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="#contact"
                className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl hover:from-teal-600 hover:to-emerald-700 shadow-sm hover:shadow-teal-200 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
              >
                Free Consultation
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 rounded-xl hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <span className={`w-5 h-0.5 bg-gray-700 transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`w-5 h-0.5 bg-gray-700 transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`w-5 h-0.5 bg-gray-700 transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? "max-h-96 pb-4" : "max-h-0"
              }`}
          >
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 mt-2 space-y-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                >
                  {link}
                </a>
              ))}
              <div className="pt-2 border-t border-gray-100">
                <a
                  href="#contact"
                  className="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl"
                >
                  Free Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── HERO SECTION ───────────────────────────────────────────────── */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center pt-20 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #f0fdf9 0%, #ecfdf5 30%, #f0fdfa 60%, #f8fafc 100%)",
        }}
      >
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #14b8a6 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, #10b981 0%, transparent 70%)" }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-5">
            <svg viewBox="0 0 800 800" className="w-full h-full">
              <circle cx="400" cy="400" r="350" fill="none" stroke="#0d9488" strokeWidth="1" strokeDasharray="8 8" />
              <circle cx="400" cy="400" r="250" fill="none" stroke="#059669" strokeWidth="1" strokeDasharray="8 8" />
              <circle cx="400" cy="400" r="150" fill="none" stroke="#14b8a6" strokeWidth="1" strokeDasharray="8 8" />
            </svg>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-100 rounded-full text-sm font-medium text-teal-700">
                <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
                Trusted by 10,000+ students worldwide
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                Start Your{" "}
                <span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-600">
                    Global Education
                  </span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" preserveAspectRatio="none">
                    <path d="M0 10 Q75 0 150 6 Q225 12 300 6" stroke="url(#heroUnderline)" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="heroUnderline" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#14b8a6" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>{" "}
                Journey
              </h1>

              <p className="text-lg text-gray-500 leading-relaxed max-w-lg">
                Expert guidance for studying abroad in the UK, Canada, Australia, USA & more. From university selection to visa approval — we're with you every step of the way.
              </p>

              {/* Search Bar */}
              {/* <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-3 flex flex-col sm:flex-row gap-3">
                <select
                  id="search-country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="flex-1 px-4 py-3 text-sm text-gray-700 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-teal-300"
                >
                  <option value="">🌍 Select Country</option>
                  <option value="uk">🇬🇧 United Kingdom</option>
                  <option value="ca">🇨🇦 Canada</option>
                  <option value="au">🇦🇺 Australia</option>
                  <option value="us">🇺🇸 United States</option>
                </select>
                <select
                  id="search-program"
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className="flex-1 px-4 py-3 text-sm text-gray-700 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-teal-300"
                >
                  <option value="">📚 Select Program</option>
                  <option value="cs">Computer Science</option>
                  <option value="biz">Business & MBA</option>
                  <option value="eng">Engineering</option>
                  <option value="med">Medicine</option>
                  <option value="law">Law</option>
                </select>
                <select
                  id="search-degree"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="flex-1 px-4 py-3 text-sm text-gray-700 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-teal-300"
                >
                  <option value="">🎓 Degree Level</option>
                  <option value="bachelor">Bachelor's</option>
                  <option value="master">Master's</option>
                  <option value="phd">PhD</option>
                  <option value="diploma">Diploma</option>
                </select>
                <button
                  id="hero-search-btn"
                  className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-sm font-semibold rounded-xl hover:from-teal-600 hover:to-emerald-700 transition-all duration-300 hover:shadow-teal-200 hover:shadow-lg whitespace-nowrap"
                >
                  🔍 Search
                </button>
              </div> */}

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  id="hero-apply-btn"
                  href="#contact"
                  className="px-7 py-3.5 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold rounded-xl shadow-sm hover:shadow-teal-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm"
                >
                  Apply Now →
                </a>
                <a
                  id="hero-consultation-btn"
                  href="#contact"
                  className="px-7 py-3.5 border-2 border-teal-200 text-teal-700 font-semibold rounded-xl hover:border-teal-400 hover:bg-teal-50 transition-all duration-300 text-sm"
                >
                  📞 Book Consultation
                </a>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 pt-2">
                {[
                  { val: "10K+", label: "Students Placed" },
                  { val: "98%", label: "Visa Success Rate" },
                  { val: "50+", label: "Countries" },
                  { val: "500+", label: "University Partners" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                      {s.val}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5 font-medium">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Illustration */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg">
                <div
                  className="absolute inset-0 rounded-3xl opacity-30 blur-3xl"
                  style={{ background: "radial-gradient(circle, #14b8a6 0%, #10b981 50%, transparent 80%)" }}
                />
                <img
                  src="/hero-illustration.png"
                  alt="Students studying abroad illustration"
                  className="relative w-full h-auto max-h-[520px] object-contain drop-shadow-2xl"
                />

                {/* Floating badge 1 */}
                <div className="absolute top-6 -left-4 bg-white rounded-2xl shadow-xl p-3.5 flex items-center gap-3 border border-gray-50">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-xl">🏆</div>
                  <div>
                    <div className="text-xs font-semibold text-gray-800">98% Success Rate</div>
                    <div className="text-[10px] text-gray-400">Visa Approvals 2025</div>
                  </div>
                </div>

                {/* Floating badge 2 */}
                <div className="absolute bottom-10 -right-4 bg-white rounded-2xl shadow-xl p-3.5 border border-gray-50">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex -space-x-1.5">
                      {["👩🏻", "👨🏽", "👩🏾"].map((e, i) => (
                        <div key={i} className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center text-xs border-2 border-white">
                          {e}
                        </div>
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-gray-700">+2.4k joined</span>
                  </div>
                  <div className="text-[10px] text-gray-400">this month</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUSTED BY ─────────────────────────────────────────────────── */}
      <section id="about" className="reveal section-hidden py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-gray-400 uppercase tracking-widest mb-8">
            Trusted Partner Universities & Institutions
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {PARTNERS.map((name) => (
              <div
                key={name}
                className="bg-white rounded-xl px-4 py-3 flex items-center justify-center border border-gray-100 hover:border-teal-200 hover:shadow-sm transition-all duration-200 group"
              >
                <span className="text-xs font-semibold text-gray-400 group-hover:text-teal-600 text-center leading-tight transition-colors duration-200">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DESTINATIONS ───────────────────────────────────────────────── */}
      <section id="countries" className="reveal section-hidden py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
              Study Destinations
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              Popular{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-600">
                Study Destinations
              </span>
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto text-lg">
              Explore top countries where thousands of students achieve their academic dreams every year.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DESTINATIONS.map((dest) => (
              <div
                key={dest.country}
                className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-400 cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.country}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1 text-sm font-bold text-gray-800">
                    {dest.emoji} {dest.tag}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg leading-tight">{dest.country}</h3>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5">
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">{dest.description}</p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-teal-50 rounded-xl p-3 text-center">
                      <div className="text-lg font-extrabold text-teal-700">{dest.universities}</div>
                      <div className="text-[10px] text-teal-500 font-medium mt-0.5">Universities</div>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-3 text-center">
                      <div className="text-lg font-extrabold text-emerald-700">{dest.programs}</div>
                      <div className="text-[10px] text-emerald-500 font-medium mt-0.5">Programs</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] text-gray-400 font-medium">
                      Intake: <span className="text-gray-600">{dest.intake}</span>
                    </div>
                    <a
                      href="#contact"
                      className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1 group/link"
                    >
                      Explore{" "}
                      <span className="group-hover/link:translate-x-0.5 transition-transform">→</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────────────────────── */}
      <section
        id="services"
        className="reveal section-hidden py-24"
        style={{ background: "linear-gradient(180deg, #f8fafc 0%, #f0fdf9 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
              What We Offer
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              Services That{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-600">
                Transform Lives
              </span>
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto text-lg">
              Comprehensive support at every stage of your study abroad journey.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                className="group bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-full bg-teal-500 -translate-y-16 translate-x-16" />

                <div className={`inline-flex w-14 h-14 rounded-2xl items-center justify-center text-2xl mb-5 bg-gradient-to-br ${s.color} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  {s.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn more <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────────── */}
      <section className="reveal section-hidden py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
              Your Journey
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              How It{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-600">
                Works
              </span>
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto text-lg">
              Four simple steps to begin your international education adventure.
            </p>
          </div>

          <div className="relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-teal-200 via-emerald-300 to-teal-200" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {STEPS.map((step, i) => (
                <div key={step.num} className="relative flex flex-col items-center text-center group">
                  <div className="relative mb-6">
                    <div className="w-28 h-28 bg-gradient-to-br from-teal-50 to-emerald-50 border-2 border-teal-100 rounded-3xl flex flex-col items-center justify-center group-hover:border-teal-400 group-hover:shadow-teal-100 group-hover:shadow-xl transition-all duration-300">
                      <span className="text-3xl mb-1">{step.icon}</span>
                      <span className="text-[10px] font-bold text-teal-400 tracking-widest">{step.num}</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full text-white text-xs font-bold flex items-center justify-center shadow-sm">
                      {i + 1}
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 text-center">
            <a
              id="how-it-works-cta"
              href="#contact"
              className="inline-block px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold rounded-xl shadow-sm hover:shadow-teal-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Start Your Journey Today →
            </a>
          </div>
        </div>
      </section>

      {/* ── FEATURED UNIVERSITIES ──────────────────────────────────────── */}
      <section
        id="universities"
        className="reveal section-hidden py-24"
        style={{ background: "linear-gradient(180deg, #f0fdf9 0%, #f8fafc 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
              Partner Universities
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              Featured{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-600">
                Universities
              </span>
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto text-lg">
              We partner with world-class institutions to bring you the best academic opportunities.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {UNIVERSITIES.map((uni) => (
              <div
                key={uni.name}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex items-start gap-4"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center text-2xl font-extrabold text-white shrink-0 group-hover:scale-105 transition-transform duration-300">
                  {uni.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1 group-hover:text-teal-700 transition-colors">{uni.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] text-gray-400 font-medium">{uni.country}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span className="text-[11px] text-teal-600 font-semibold">{uni.rank}</span>
                  </div>
                  <span className="inline-block px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-lg">
                    {uni.field}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700 border-b-2 border-teal-200 hover:border-teal-500 pb-0.5 transition-all duration-200"
            >
              View All 500+ Partner Universities →
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────────── */}
      <section className="reveal section-hidden py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
              Student Stories
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              What Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-600">
                Students Say
              </span>
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto text-lg">
              Real stories from students who achieved their study abroad dreams with us.
            </p>
          </div>

          {/* Featured testimonial */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="relative bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl p-8 lg:p-12 border border-teal-100 shadow-sm">
              <div className="text-6xl text-teal-200 font-serif leading-none mb-4">"</div>
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-8 font-medium italic">
                {TESTIMONIALS[activeTestimonial].review}
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={TESTIMONIALS[activeTestimonial].image}
                  alt={TESTIMONIALS[activeTestimonial].name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-100"
                />
                <div>
                  <div className="font-bold text-gray-900">{TESTIMONIALS[activeTestimonial].name}</div>
                  <div className="text-sm text-teal-600 font-medium">{TESTIMONIALS[activeTestimonial].university}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{TESTIMONIALS[activeTestimonial].program} · {TESTIMONIALS[activeTestimonial].country}</div>
                </div>
                <div className="ml-auto">
                  <StarRating count={TESTIMONIALS[activeTestimonial].rating} />
                </div>
              </div>

              {/* Dots */}
              <div className="flex items-center gap-2 mt-8">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`rounded-full transition-all duration-300 ${i === activeTestimonial
                        ? "w-6 h-2 bg-teal-500"
                        : "w-2 h-2 bg-teal-200 hover:bg-teal-300"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Grid of mini testimonials */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                onClick={() => setActiveTestimonial(i)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${i === activeTestimonial
                    ? "border-teal-300 bg-teal-50 shadow-sm"
                    : "border-gray-100 bg-white hover:border-teal-200 hover:bg-teal-50/50"
                  }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <img src={t.image} alt={t.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <div className="text-sm font-bold text-gray-800">{t.name}</div>
                    <div className="text-[10px] text-gray-400">{t.country}</div>
                  </div>
                </div>
                <StarRating count={t.rating} />
                <p className="text-xs text-gray-500 mt-2 leading-relaxed line-clamp-2">{t.review}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────────────────── */}
      <section id="contact" className="reveal section-hidden py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-emerald-600 to-teal-700" />
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-white -translate-y-80 translate-x-48" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-white translate-y-48 -translate-x-24" />
            </div>
            <div className="relative px-8 py-20 lg:py-28 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-xs font-medium mb-6">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                Free — No Commitment Required
              </div>
              <h2 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
                Get Your Free
                <br />
                Consultation Today
              </h2>
              <p className="text-teal-100 text-lg lg:text-xl max-w-2xl mx-auto mb-10">
                Speak with our expert counselors and get a personalized study abroad roadmap — completely free of charge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  id="cta-book-btn"
                  href="mailto:info@globalacademicpathway.com"
                  className="px-8 py-4 bg-white text-teal-700 font-bold rounded-xl hover:bg-teal-50 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-sm"
                >
                  📧 Email Us Now
                </a>
                <a
                  id="cta-call-btn"
                  href="tel:+8801800000000"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 font-bold rounded-xl hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300 text-sm"
                >
                  📞 Call +880 1800-000000
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <footer className="bg-gray-950 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg font-bold">G</span>
                </div>
                <div>
                  <span className="block text-[14px] font-bold text-white">Global Academic</span>
                  <span className="block text-[10px] font-semibold text-teal-400 tracking-wider uppercase">Pathway</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-gray-500 mb-5">
                Empowering students to achieve their international education dreams with expert guidance and trusted partnerships.
              </p>
              {/* Socials */}
              <div className="flex gap-3">
                {[
                  {
                    label: "Facebook",
                    icon: (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Twitter",
                    icon: (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    ),
                  },
                  {
                    label: "LinkedIn",
                    icon: (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Instagram",
                    icon: (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    ),
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-teal-600 hover:text-white transition-all duration-200"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-3">
                {["Home", "About Us", "Services", "Countries", "Universities", "Blog"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-500 hover:text-teal-400 transition-colors duration-200 flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 bg-teal-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">Our Services</h4>
              <ul className="space-y-3">
                {SERVICES.map((s) => (
                  <li key={s.title}>
                    <a href="#services" className="text-sm text-gray-500 hover:text-teal-400 transition-colors duration-200 flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 bg-teal-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">Contact Us</h4>
              <ul className="space-y-4">
                {[
                  { icon: "📍", text: "123 Academic Avenue, Dhaka, Bangladesh" },
                  { icon: "📞", text: "+880 1800-000000" },
                  { icon: "✉️", text: "info@globalacademicpathway.com" },
                  { icon: "🕐", text: "Mon–Sat: 9AM – 6PM" },
                ].map((item) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <span className="text-base mt-0.5 shrink-0">{item.icon}</span>
                    <span className="text-sm text-gray-500">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-600">
              © {new Date().getFullYear()} Global Academic Pathway. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link) => (
                <a key={link} href="#" className="text-xs text-gray-600 hover:text-teal-400 transition-colors duration-200">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── BACK TO TOP ────────────────────────────────────────────────── */}
      <button
        id="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 text-white rounded-2xl shadow-lg hover:shadow-teal-300 hover:shadow-xl hover:-translate-y-1 flex items-center justify-center transition-all duration-300 ${showBackTop ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}
