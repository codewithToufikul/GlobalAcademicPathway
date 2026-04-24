import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/home";
import {
  NAV_LINKS,
  DESTINATIONS,
  SERVICES,
  STEPS,
  UNIVERSITIES,
  TESTIMONIALS,
  PARTNERS,
} from "../data/siteData";
import * as Icons from "../components/Icons";

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

// ─── Sub-Components ───────────────────────────────────────────────────────────

const FLAG_PATHS: Record<string, React.ReactNode> = {
  GB: (
    <svg viewBox="0 0 512 512" className="w-full h-full">
      <path fill="#012169" d="M0 0h512v512H0z" />
      <path fill="#FFF" d="m512 0-192 0L0 192V0L192 0 512 192v128L320 512h192L512 320 320 0H192L0 320v192h192L512 320z" />
      <path fill="#C8102E" d="m512 0-128 0L0 256v128zm0 512L128 512 512 256zM0 0l384 0L0 256zM0 512l128 0L512 256z" />
      <path fill="#FFF" d="M213.3 0v512h85.4V0zM0 213.3v85.4h512v-85.4z" />
      <path fill="#C8102E" d="M234.7 0v512h42.6V0zM0 234.7v42.6h512v-42.6z" />
    </svg>
  ),
  CA: (
    <svg viewBox="0 0 512 512" className="w-full h-full">
      <path fill="#F01515" d="M0 0h512v512H0z" />
      <path fill="#FFF" d="M128 0h256v512H128z" />
      <path fill="#F01515" d="M256 94.6l17.8 54.8h57.6l-46.6 33.8 17.8 54.8-46.6-33.8-46.6 33.8 17.8-54.8-46.6-33.8h57.6z" />
    </svg>
  ),
  AU: (
    <svg viewBox="0 0 512 512" className="w-full h-full">
      <path fill="#00008B" d="M0 0h512v512H0z" />
      <path fill="#FFF" d="M0 0v256h256V0H0zm42.7 21.3h170.6V234.7H42.7V21.3z" />
      <path fill="#00008B" d="M53.3 32h149.4V224H53.3V32z" />
      <path fill="#FFF" d="M120 40h16v176h-16zm-80 80h176v16H40z" />
      <path fill="#FFF" d="M384 100l10 30h32l-26 20 10 30-26-20-26 20 10-30-26-20h32z" />
      <circle fill="#FFF" cx="128" cy="384" r="40" />
    </svg>
  ),
  US: (
    <svg viewBox="0 0 512 512" className="w-full h-full">
      <path fill="#FFF" d="M0 0h512v512H0z" />
      <path fill="#BD3D44" d="M0 0h512v39.4H0zm0 78.8h512v39.4H0zm0 78.8h512v39.4H0zm0 78.8h512v39.4H0zm0 78.8h512v39.4H0zm0 78.8h512v39.4H0zm0 78.8h512v39.4H0z" />
      <path fill="#192F5D" d="M0 0h256v275.8H0z" />
      <circle fill="#FFF" cx="40" cy="40" r="5" />
      <circle fill="#FFF" cx="80" cy="40" r="5" />
      <circle fill="#FFF" cx="120" cy="40" r="5" />
    </svg>
  ),
};

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

function RequirementsModal({ service, onClose }: { service: any; onClose: () => void }) {
  if (!service || !service.requirements) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-950/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-2xl max-h-[90vh] mt-24 overflow-y-auto rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className={`p-8 lg:p-10 bg-gradient-to-br ${service.color} text-white relative`}>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
          >
            <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center mb-6 backdrop-blur-md">
            {(() => {
              const Icon = Icons[service.icon as keyof typeof Icons] as React.FC<any>;
              return <Icon size={32} />;
            })()}
          </div>
          <h3 className="text-3xl font-extrabold mb-2">{service.title}</h3>
          <p className="text-blue-50 text-lg opacity-90">
            {service.title === "Application Support"
              ? "Required Documents & Checklist"
              : "What We Help You With"}
          </p>
        </div>

        {/* Requirements List */}
        <div className="p-8 lg:p-10">
          <div className="space-y-10">
            {service.requirements.map((req: any, idx: number) => (
              <div key={idx}>
                <h4 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-4">
                  {req.important && <span className="w-2 h-2 bg-blue-600 rounded-full" />}
                  {req.title}
                  {req.important && <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md uppercase tracking-wider ml-auto">Most Important</span>}
                </h4>

                {req.info && (
                  <div className="mb-4 p-3 bg-amber-50 border-l-4 border-amber-400 text-amber-800 text-sm font-medium flex gap-2 items-center">
                    <span className="text-lg">📌</span>
                    {req.info}
                  </div>
                )}

                <ul className="grid sm:grid-cols-2 gap-3">
                  {req.items.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2.5 group">
                      <span className="text-blue-500 mt-0.5 shrink-0 group-hover:scale-110 transition-transform">✅</span>
                      <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA In Modal */}
          <div className="mt-12 p-8 bg-blue-50 rounded-[2rem] border border-blue-100 text-center">
            <p className="text-blue-900 font-bold text-lg mb-6 italic">
              {service.title === "Application Support"
                ? '"Send us these documents and book your free consultation today!"'
                : '"We will provide full guidance — book your free consultation now!"'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                onClick={onClose}
                className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all duration-300"
              >
                Book Free Consultation
              </a>
              <button
                onClick={onClose}
                className="px-8 py-4 bg-white text-gray-600 border border-gray-200 font-bold rounded-xl hover:bg-gray-50 transition-all duration-200"
              >
                Close Checklist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  type: string;
  location: string;
  image?: string;
  status: string;
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [country, setCountry] = useState("");
  const [degree, setDegree] = useState("");

  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("https://gap-server-22sf.onrender.com/api/events");
        const json = await res.json();
        if (json.success) setEvents(json.data);
      } catch (err) { console.error("Events fetch failed:", err); }
    };
    fetchEvents();
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
    <div className="bg-white text-gray-900">
      {/* ── NAVBAR ─────────────────────────────────────────────────────── */}


      {/* ── HERO SECTION ───────────────────────────────────────────────── */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center pt-20 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #f0f9ff 0%, #eef2ff 30%, #e0f2fe 60%, #f8fafc 100%)",
        }}
      >
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #2563eb 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, #4f46e5 0%, transparent 70%)" }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-5">
            <svg viewBox="0 0 800 800" className="w-full h-full">
              <circle cx="400" cy="400" r="350" fill="none" stroke="#1d4ed8" strokeWidth="1" strokeDasharray="8 8" />
              <circle cx="400" cy="400" r="250" fill="none" stroke="#4338ca" strokeWidth="1" strokeDasharray="8 8" />
              <circle cx="400" cy="400" r="150" fill="none" stroke="#2563eb" strokeWidth="1" strokeDasharray="8 8" />
            </svg>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-sm font-medium text-blue-700">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                Your Success is our Primary Mission
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                Start Your{" "}
                <span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
                    Global Education
                  </span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" preserveAspectRatio="none">
                    <path d="M0 10 Q75 0 150 6 Q225 12 300 6" stroke="url(#heroUnderline)" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="heroUnderline" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#4f46e5" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>{" "}
                Journey
              </h1>

              <p className="text-lg text-gray-500 leading-relaxed max-w-lg">
                Expert guidance for studying abroad in the UK, Canada, Australia, USA & more. From university selection to visa approval — we're with you every step of the way.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 pt-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500">
                <Link
                  to="/apply"
                  className="px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-sm font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-blue-500/20 hover:scale-105 hover:shadow-blue-500/40 transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  Apply Now
                  <Icons.ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/registration"
                  className="px-10 py-5 bg-white text-[#0f172a] border-2 border-[#0f172a] text-sm font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-[#0f172a] hover:text-white hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Icons.Phone size={18} />
                  Book Consultation
                </Link>
              </div>

            </div>

            {/* Right: Illustration */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg">
                <div
                  className="absolute inset-0 rounded-3xl opacity-30 blur-3xl"
                  style={{ background: "radial-gradient(circle, #2563eb 0%, #4f46e5 50%, transparent 80%)" }}
                />
                <img
                  src="/hero-illustration.png"
                  alt="Students studying abroad illustration"
                  className="relative w-full h-auto max-h-[520px] object-contain drop-shadow-2xl"
                />

                {/* Floating badge 1 */}
                <div className="absolute top-6 -left-4 bg-white rounded-2xl shadow-xl p-3.5 flex items-center gap-3 border border-gray-50">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl">🏆</div>
                  <div>
                    <div className="text-xs font-semibold text-gray-800">100% Success Rate</div>
                    <div className="text-[10px] text-gray-400">Visa Approvals 2025</div>
                  </div>
                </div>

                {/* Floating badge 2 */}
                {/* <div className="absolute bottom-10 -right-4 bg-white rounded-2xl shadow-xl p-3.5 border border-gray-50">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex -space-x-1.5">
                      {["👩🏻", "👨🏽", "👩🏾"].map((e, i) => (
                        <div key={i} className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs border-2 border-white">
                          {e}
                        </div>
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-gray-700">+2.4k joined</span>
                  </div>
                  <div className="text-[10px] text-gray-400">this month</div>
                </div> */}
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
                className="bg-white rounded-xl px-4 py-3 flex items-center justify-center border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all duration-200 group"
              >
                <span className="text-xs font-semibold text-gray-400 group-hover:text-blue-600 text-center leading-tight transition-colors duration-200">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DESTINATIONS ───────────────────────────────────────────────── */}
      <section id="countries" className="reveal section-hidden py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
              Primary Study Destination
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              Study in the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
                United Kingdom
              </span>
            </h2>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
              The UK is our primary focus, offering world-class education and unparalleled career opportunities for international students.
            </p>
          </div>

          <div className="relative bg-gray-50 rounded-[3rem] overflow-hidden border border-gray-100 shadow-xl">
            <div className="flex flex-col lg:flex-row">
              {/* Image Side */}
              <div className="lg:w-1/2 h-80 lg:h-auto relative overflow-hidden group">
                <img
                  src={DESTINATIONS[0].image}
                  alt="United Kingdom"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-transparent" />
                <div className="absolute bottom-10 left-10">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/50 shadow-2xl mb-4">
                    {FLAG_PATHS[DESTINATIONS[0].code]}
                  </div>
                  <h3 className="text-white text-3xl font-bold drop-shadow-lg">United Kingdom</h3>
                </div>
              </div>

              {/* Content Side */}
              <div className="lg:w-1/2 p-8 lg:p-14">
                <div className="flex flex-wrap gap-4 mb-10">
                  <div className="bg-white px-5 py-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                    <span className="text-2xl font-black text-blue-600">{DESTINATIONS[0].universities}</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Partners</span>
                  </div>
                  <div className="bg-white px-5 py-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                    <span className="text-2xl font-black text-indigo-600">{DESTINATIONS[0].programs}</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Courses</span>
                  </div>
                  <div className="bg-white px-5 py-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                    <span className="text-2xl font-black text-sky-600">{DESTINATIONS[0].intake}</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Intakes</span>
                  </div>
                </div>

                <div className="mb-10">
                  <h4 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-8 h-px bg-blue-600" />
                    Key Benefits for Students
                  </h4>
                  <ul className="space-y-4">
                    {(DESTINATIONS[0].benefits || []).map((benefit: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 group">
                        <div className="mt-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                          <Icons.ArrowRight size={12} strokeWidth={3} />
                        </div>
                        <span className="text-gray-600 text-sm font-medium leading-tight">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/apply"
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
                  >
                    Check Your Eligibility
                  </Link>
                  <a
                    href="/universities"
                    className="px-8 py-4 bg-white text-gray-700 border border-gray-200 font-bold rounded-xl hover:bg-gray-50 transition-all duration-300 text-center"
                  >
                    Browse Universities
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────────────────────── */}
      <section
        id="services"
        className="reveal section-hidden py-24"
        style={{ background: "linear-gradient(180deg, #f8fafc 0%, #f0f9ff 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
              What We Offer
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              Services That{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
                Transform Lives
              </span>
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto text-lg">
              Comprehensive support at every stage of your study abroad journey.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, idx) => {
              const Icon = Icons[s.icon as keyof typeof Icons] as React.FC<any>;
              return (
                <div
                  key={s.title}
                  onClick={() => s.requirements && setSelectedService(s)}
                  style={{ animationDelay: `${idx * 150}ms` }}
                  className={`reveal section-hidden group p-8 bg-white rounded-3xl border border-gray-100 hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] transition-all duration-500 ${s.requirements ? "cursor-pointer" : ""}`}
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${s.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <Icon size={26} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {s.desc}
                  </p>
                  <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform duration-300">
                    {s.requirements ? "View Requirements" : "Learn more"} <span>→</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────────── */}
      <section className="reveal section-hidden py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
              Your Journey
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              How It{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
                Works
              </span>
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto text-lg">
              Four simple steps to begin your international education adventure.
            </p>
          </div>

          <div className="relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-blue-200 via-indigo-300 to-blue-200" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {STEPS.map((step, idx) => {
                const Icon = Icons[step.icon as keyof typeof Icons] as React.FC<any>;
                return (
                  <div key={step.num} className="relative flex flex-col items-center text-center group">
                    <div className="relative mb-6">
                      <div className="w-28 h-28 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-100 rounded-3xl flex flex-col items-center justify-center group-hover:border-blue-400 group-hover:shadow-blue-100 group-hover:shadow-xl transition-all duration-300">
                        <div className="text-blue-600 mb-1 group-hover:scale-110 transition-transform">
                          <Icon size={32} strokeWidth={2} />
                        </div>
                        <span className="text-[10px] font-bold text-blue-400 tracking-widest">{step.num}</span>
                      </div>
                      <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full text-white text-xs font-bold flex items-center justify-center shadow-sm">
                        {idx + 1}
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-14 text-center">
            <Link
              id="how-it-works-cta"
              to="/apply"
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-xl shadow-sm hover:shadow-blue-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Start Your Journey Today →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED UNIVERSITIES ──────────────────────────────────────── */}
      <section
        id="universities"
        className="reveal section-hidden py-24"
        style={{ background: "linear-gradient(180deg, #f0f9ff 0%, #f8fafc 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
              Partner Universities
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              Featured{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
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
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-2xl font-extrabold text-white shrink-0 group-hover:scale-105 transition-transform duration-300">
                  {uni.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1 group-hover:text-blue-700 transition-colors">{uni.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] text-gray-400 font-medium">{uni.country}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span className="text-[11px] text-blue-600 font-semibold">{uni.rank}</span>
                  </div>
                  <span className="inline-block px-2.5 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-lg">
                    {uni.field}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/universities"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 border-b-2 border-blue-200 hover:border-blue-500 pb-0.5 transition-all duration-200"
            >
              View All 100+ Partner Universities →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOUNDER'S MESSAGE ─────────────────────────────────────────── */}


      {/* ── UPCOMING EVENTS ────────────────────────────────────────── */}
      <section className="reveal section-hidden py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-xl">
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                Stay Updated
              </span>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
                Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">Events</span>
              </h2>
              <p className="mt-4 text-gray-500 text-lg">
                Join our seminars, university open days, and virtual expos to simplify your study abroad journey.
              </p>
            </div>
            <Link
              to="/events"
              className="px-6 py-3 bg-[#0f172a] text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-blue-600 transition-all shadow-xl shadow-gray-200 inline-flex items-center gap-2 group"
            >
              View All Events <Icons.ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {!events || events.length === 0 ? (
            <div className="py-20 text-center bg-gray-50 rounded-[2.5rem] border border-dashed border-gray-200">
              <Icons.Globe size={48} className="mx-auto text-gray-300 mb-6" />
              <p className="text-gray-400 font-bold">No upcoming events scheduled right now. Check back soon!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.filter(e => {
                const eventDate = new Date(e.date);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return eventDate >= today && e.status !== 'Completed';
              }).slice(0, 3).map((event, idx) => (
                <div
                  key={event._id}
                  className="group bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 relative flex flex-col"
                >
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={event.image || "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?w=800&q=80"}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt={event.title}
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20 shadow-sm">
                      {event.type}
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-blue-600 text-[10px] font-black tracking-widest uppercase mb-4">
                      <Icons.Clock size={16} />
                      {new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                      {event.title}
                    </h3>
                    <p className="text-gray-500 font-bold text-sm mb-8 line-clamp-2 leading-relaxed opacity-80">
                      {event.description}
                    </p>

                    <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-400 text-[9px] font-black uppercase tracking-widest">
                        <Icons.MapPin size={14} className="text-blue-500" />
                        {event.location}
                      </div>
                      <Link
                        to={`/events/${event._id}`}
                        className="text-xs font-black text-blue-600 uppercase tracking-widest flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                      >
                        Join <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────────────────── */}
      <section id="contact" className="reveal section-hidden py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700" />
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
              <p className="text-blue-100 text-lg lg:text-xl max-w-2xl mx-auto mb-10">
                Speak with our expert counselors and get a personalized study abroad roadmap — completely free of charge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <a
                  id="cta-book-btn"
                  href="mailto:info@info@globalacademicpathway.org.com"
                  className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-sm flex items-center justify-center gap-2"
                >
                  <Icons.Mail size={18} /> Email Us Now
                </a>
                <a
                  id="cta-call-btn"
                  href="tel:+8801756560536"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 font-bold rounded-xl hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300 text-sm flex items-center justify-center gap-2"
                >
                  <Icons.Phone size={18} /> Call +880 17 5656 0536
                </a>
              </div>

              {/* Office Locations */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/60 text-xs">
                <div className="flex items-center gap-2">
                  <Icons.MapPin size={14} />
                  <span>🇧🇩 Skytuch Rajkush, 2nd Floor, 43/R, 5/C Panthapath, Dhaka-1205</span>
                </div>
                <span className="hidden sm:block w-px h-4 bg-white/20" />
                <div className="flex items-center gap-2">
                  <Icons.MapPin size={14} />
                  <span>🇧🇩 BMA House, Main Post Office 4100, Chittagong</span>
                </div>
                <span className="hidden sm:block w-px h-4 bg-white/20" />
                <div className="flex items-center gap-2">
                  <Icons.MapPin size={14} />
                  <span>🇮🇳 Shanti Complex, Anand 388001, Gujarat, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <RequirementsModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </div>
  );
}
