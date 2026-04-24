import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import * as Icons from "../components/Icons";

interface University {
  _id: string;
  name: string;
  country: string;
  logo?: string;
  coverImage?: string;
  description?: string;
  overview?: string;
  ranking?: string;
  popularCourses?: string[];
  website?: string;
  englishRequirements?: string;
  undergradRequirements?: string;
  postgradRequirements?: string;
  tuitionFees?: string;
  scholarships?: string;
  accommodation?: string;
  location?: string;
  gallery?: string[];
  intakeDates?: string;
  faculties?: string[];
  highlights?: string[];
}

export function meta() {
  return [
    { title: "University Profile | Global Academic Pathway" },
    {
      name: "description",
      content:
        "Explore top-ranked global universities, their programs, and entry requirements.",
    },
  ];
}

const TABS = [
  { id: "overview", label: "Overview", icon: "FileText" },
  { id: "courses", label: "Courses", icon: "GraduationCap" },
  { id: "requirements", label: "Requirements", icon: "ShieldCheck" },
  { id: "scholarships", label: "Financial Aid", icon: "Award" },
];

export default function UniversityDetailPage() {
  const { id } = useParams();
  const [uni, setUni] = useState<University | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const fetchUni = async () => {
      try {
        const API_BASE =
          window.location.hostname === "localhost"
            ? "https://gap-server-22sf.onrender.com/api"
            : "https://gap-server-22sf.onrender.com/api";
        const res = await fetch(`${API_BASE}/universities/${id}`);
        const json = await res.json();
        if (json.success) setUni(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        setTimeout(() => setMounted(true), 60);
      }
    };
    fetchUni();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading)
    return (
      <div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F7F5F0] gap-5"
        style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
      >
        <div className="w-9 h-9 border-2 border-[#1A1A2E] border-t-transparent rounded-full animate-spin" />
        <p className="text-[10px] font-semibold text-[#1A1A2E]/30 uppercase tracking-[0.4em]">
          Synchronizing Data
        </p>
      </div>
    );

  if (!uni)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F5F0] p-6">
        <div className="max-w-md w-full bg-white p-12 rounded-3xl text-center border border-[#1A1A2E]/08">
          <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Icons.Plus size={28} className="rotate-45 text-red-400" />
          </div>
          <h2
            className="text-2xl font-black text-[#1A1A2E] mb-3 tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Institution Not Found
          </h2>
          <p
            className="text-[#1A1A2E]/45 text-sm font-light leading-relaxed mb-8"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
          >
            The university profile you're looking for may have been moved or
            archived.
          </p>
          <Link
            to="/universities"
            className="inline-flex items-center gap-2 px-7 py-3 bg-[#1A1A2E] text-white rounded-xl text-[10px] font-semibold uppercase tracking-[0.3em] hover:bg-blue-600 transition-colors"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
          >
            Explore All Institutions
            <Icons.ArrowRight size={13} />
          </Link>
        </div>
      </div>
    );

  const defaultHighlights = [
    "World-class Research Facilities",
    "Industry Integration Programs",
    "Diverse International Community",
    "Prime Central Location",
  ];

  return (
    <div
      className="bg-[#F7F5F0] min-h-screen"
      style={{ fontFamily: "'Georgia', serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        .ud-display { font-family: 'Playfair Display', Georgia, serif; }
        .ud-body    { font-family: 'DM Sans', system-ui, sans-serif; }

        .ud-up {
          opacity: 0;
          transform: translateY(26px);
          transition: opacity 0.75s cubic-bezier(0.22,1,0.36,1),
                      transform 0.75s cubic-bezier(0.22,1,0.36,1);
        }
        .ud-up.in { opacity: 1; transform: translateY(0); }
        .ud-up.d1 { transition-delay: 0.10s; }
        .ud-up.d2 { transition-delay: 0.22s; }
        .ud-up.d3 { transition-delay: 0.36s; }
        .ud-up.d4 { transition-delay: 0.50s; }

        /* tab button */
        .ud-tab {
          transition: background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
          white-space: nowrap;
        }
        .ud-tab.active {
          background: #1A1A2E;
          color: white;
          box-shadow: 0 4px 16px rgba(26,26,46,0.18);
        }

        /* tab content fade */
        .ud-panel {
          animation: ud-fade 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        @keyframes ud-fade {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* highlight card */
        .hl-card {
          background: white;
          border: 1px solid rgba(26,26,46,0.07);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.35s ease, border-color 0.3s ease;
        }
        .hl-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(26,26,46,0.08);
          border-color: rgba(37,99,235,0.18);
        }

        /* course row */
        .course-row {
          background: white;
          border: 1px solid rgba(26,26,46,0.07);
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .course-row:hover {
          border-color: rgba(37,99,235,0.2);
          box-shadow: 0 8px 24px rgba(26,26,46,0.06);
        }

        /* sidebar stat row */
        .stat-row:hover .stat-icon {
          background: #2563eb;
          border-color: #2563eb;
        }
        .stat-icon {
          transition: background 0.3s ease, border-color 0.3s ease;
        }

        /* primary CTA */
        .ud-cta {
          position: relative; overflow: hidden;
          background: #1A1A2E;
          transition: box-shadow 0.3s ease;
        }
        .ud-cta::after {
          content: '';
          position: absolute; inset: 0;
          background: #2563eb;
          transform: translateX(-101%);
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .ud-cta:hover::after { transform: translateX(0); }
        .ud-cta span { position: relative; z-index: 1; }

        .divider   { width: 40px; height: 3px; background: #2563eb; flex-shrink: 0; }
        .divider-w { width: 40px; height: 3px; background: #3b82f6; flex-shrink: 0; }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#1A1A2E] pt-36 pb-20 lg:pt-52 lg:pb-28">
        {/* Cover image */}
        <div className="absolute inset-0 z-0">
          <img
            src={
              uni.coverImage ||
              "https://i.ibb.co.com/XrJQ5r3X/1765623808-banner.jpg"
            }
            className="w-full h-full object-cover opacity-20"
            alt={uni.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-[#1A1A2E]/75 to-[#1A1A2E]/55" />
        </div>

        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none z-[1]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-blue-700 opacity-[0.07] blur-[120px] pointer-events-none z-[1]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
          {/* Breadcrumb */}
          <div className={`ud-up ${mounted ? "in" : ""}`}>
            <Link
              to="/universities"
              className="ud-body inline-flex items-center gap-2 text-white/35 hover:text-white/70 transition-colors text-[10px] font-semibold uppercase tracking-[0.35em] mb-14"
            >
              <Icons.ArrowRight size={12} className="rotate-180 opacity-60" />
              Universities
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-end gap-10 lg:gap-16">
            {/* Logo */}
            <div className={`ud-up d1 ${mounted ? "in" : ""} shrink-0`}>
              <div className="w-28 h-28 lg:w-36 lg:h-36 bg-white rounded-3xl p-5 lg:p-7 shadow-2xl flex items-center justify-center relative">
                {uni.logo ? (
                  <img
                    src={uni.logo}
                    className="w-full h-full object-contain"
                    alt="logo"
                    onError={(e) => {
                      const t = e.target as HTMLImageElement;
                      t.style.display = "none";
                      const fb = t.nextElementSibling as HTMLElement;
                      if (fb) fb.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className={`ud-display absolute inset-0 items-center justify-center text-5xl font-black text-blue-600 italic ${uni.logo ? "hidden" : "flex"}`}
                >
                  {uni.name.charAt(0)}
                </div>
                {/* ring */}
                <div className="absolute -inset-2.5 rounded-[2rem] border border-white/[0.08] pointer-events-none" />
              </div>
            </div>

            {/* Title block */}
            <div className="flex-1">
              {/* Badges */}
              <div className={`ud-up d2 ${mounted ? "in" : ""} flex flex-wrap gap-2 mb-6`}>
                <span className="ud-body px-4 py-1.5 bg-blue-600 text-white text-[9px] font-semibold uppercase tracking-[0.3em] rounded-lg">
                  {uni.country}
                </span>
                {uni.ranking && (
                  <span className="ud-body px-4 py-1.5 bg-white/[0.08] border border-white/15 text-white/60 text-[9px] font-semibold uppercase tracking-[0.3em] rounded-lg">
                    Rank #{uni.ranking}
                  </span>
                )}
                <span className="ud-body px-4 py-1.5 bg-white/[0.05] border border-white/10 text-white/35 text-[9px] font-semibold uppercase tracking-[0.3em] rounded-lg">
                  Verified Partner
                </span>
              </div>

              <div className={`ud-up d3 ${mounted ? "in" : ""}`}>
                <h1 className="ud-display text-[44px] md:text-[64px] lg:text-[80px] font-black text-white leading-[0.92] tracking-tight mb-6">
                  {uni.name}
                </h1>
              </div>

              {/* Meta row */}
              <div className={`ud-up d4 ${mounted ? "in" : ""} flex flex-wrap gap-6`}>
                {[
                  {
                    icon: "MapPin",
                    label: uni.location || uni.country,
                    color: "text-blue-400",
                  },
                  { icon: "ShieldCheck", label: "Accredited", color: "text-emerald-400" },
                  { icon: "Calendar", label: "Intake Open", color: "text-amber-400" },
                ].map((item, i) => {
                  const Ic = (Icons as any)[item.icon] || Icons.Globe;
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <Ic size={13} strokeWidth={1.75} className={item.color} />
                      <span className="ud-body text-[10px] font-medium text-white/40 uppercase tracking-[0.28em]">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </section>

      {/* ══════════════════════════════════════════
          STICKY TAB BAR
      ══════════════════════════════════════════ */}
      <div className="sticky top-0 z-40 bg-[#F7F5F0]/90 backdrop-blur-xl border-b border-[#1A1A2E]/08">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {TABS.map((tab) => {
              const Ic = (Icons as any)[tab.icon] || Icons.FileText;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`ud-tab ud-body shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-lg text-[10px] font-semibold uppercase tracking-[0.28em] ${activeTab === tab.id
                    ? "active"
                    : "text-[#1A1A2E]/40 hover:text-[#1A1A2E]/70"
                    }`}
                >
                  <Ic size={13} strokeWidth={1.75} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {uni.website && (
            <a
              href={uni.website}
              target="_blank"
              rel="noreferrer"
              className="ud-body shrink-0 hidden sm:flex items-center gap-2 text-[10px] font-medium text-[#1A1A2E]/35 hover:text-blue-600 transition-colors uppercase tracking-[0.25em]"
            >
              <Icons.Globe size={12} strokeWidth={1.75} />
              Official Site
            </a>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════════ */}
      <main className="max-w-7xl mx-auto px-6 lg:px-16 py-16 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-20">

          {/* ── LEFT: Tab panels ── */}
          <div className="lg:col-span-8">

            {/* OVERVIEW */}
            {activeTab === "overview" && (
              <div className="ud-panel space-y-14">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="divider" />
                    <span className="ud-body text-[10px] font-semibold uppercase tracking-[0.4em] text-blue-600">
                      Institution Blueprint
                    </span>
                  </div>
                  <h2 className="ud-display text-4xl lg:text-6xl font-black text-[#1A1A2E] tracking-tight leading-none mb-8">
                    Global{" "}
                    <em className="text-blue-600 not-italic">Overview.</em>
                  </h2>
                  <div className="ud-body text-[15px] text-[#1A1A2E]/55 font-light leading-[1.85] space-y-4">
                    {uni.overview ? (
                      uni.overview
                        .split("\n")
                        .filter(Boolean)
                        .map((p, i) => <p key={i}>{p}</p>)
                    ) : (
                      <p>
                        Founded on a legacy of excellence, {uni.name} represents
                        the pinnacle of higher education in {uni.country}. We
                        engineer success by providing students with cutting-edge
                        resources and a global network of opportunities.
                      </p>
                    )}
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="divider" />
                    <span className="ud-body text-[10px] font-semibold uppercase tracking-[0.4em] text-blue-600">
                      Highlights
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {(uni.highlights || defaultHighlights).map((h, i) => (
                      <div key={i} className="hl-card rounded-2xl p-7 relative overflow-hidden">
                        <div className="ud-body text-[9px] font-semibold text-blue-600 uppercase tracking-[0.3em] mb-3">
                          0{i + 1}
                        </div>
                        <p className="ud-display text-[15px] font-bold text-[#1A1A2E] leading-snug tracking-tight">
                          {h}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* COURSES */}
            {activeTab === "courses" && (
              <div className="ud-panel space-y-14">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="divider" />
                    <span className="ud-body text-[10px] font-semibold uppercase tracking-[0.4em] text-blue-600">
                      Academic Ecosystem
                    </span>
                  </div>
                  <h2 className="ud-display text-4xl lg:text-6xl font-black text-[#1A1A2E] tracking-tight leading-none mb-4">
                    Courses &{" "}
                    <em className="text-blue-600 not-italic">Faculties.</em>
                  </h2>
                  <p className="ud-body text-[15px] text-[#1A1A2E]/45 font-light leading-relaxed">
                    Specialized programs engineered for modern career success.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  {/* Faculties */}
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                      <span className="ud-body text-[10px] font-semibold uppercase tracking-[0.35em] text-[#1A1A2E]/50">
                        Faculties
                      </span>
                    </div>
                    <div className="space-y-2.5">
                      {(
                        uni.faculties || [
                          "Arts & Humanities",
                          "Science & Technology",
                          "Business & Law",
                          "Engineering",
                        ]
                      ).map((f) => (
                        <div
                          key={f}
                          className="course-row ud-body rounded-xl px-5 py-4 flex items-center justify-between text-[13px] font-medium text-[#1A1A2E] group"
                        >
                          {f}
                          <Icons.ArrowRight
                            size={13}
                            strokeWidth={2}
                            className="text-[#1A1A2E]/20 group-hover:text-blue-600 transition-colors"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Popular Courses */}
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="ud-body text-[10px] font-semibold uppercase tracking-[0.35em] text-[#1A1A2E]/50">
                        High-Demand Programs
                      </span>
                    </div>
                    <div className="space-y-2.5">
                      {(
                        uni.popularCourses || [
                          "International Management",
                          "Advanced AI & Robotics",
                          "Health Informatics",
                          "Digital Media & Design",
                        ]
                      ).map((c) => (
                        <div
                          key={c}
                          className="course-row ud-body rounded-xl px-5 py-4 flex items-center justify-between text-[13px] font-medium text-[#1A1A2E]"
                        >
                          {c}
                          <span className="ud-body text-[8px] font-semibold uppercase tracking-[0.2em] text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                            Popular
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* REQUIREMENTS */}
            {activeTab === "requirements" && (
              <div className="ud-panel space-y-14">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="divider" />
                    <span className="ud-body text-[10px] font-semibold uppercase tracking-[0.4em] text-blue-600">
                      Entry Protocol
                    </span>
                  </div>
                  <h2 className="ud-display text-4xl lg:text-6xl font-black text-[#1A1A2E] tracking-tight leading-none mb-4">
                    Admission{" "}
                    <em className="text-blue-600 not-italic">Requirements.</em>
                  </h2>
                  <p className="ud-body text-[15px] text-[#1A1A2E]/45 font-light leading-relaxed">
                    Meticulous standards for high-achieving global candidates.
                  </p>
                </div>

                {/* English */}
                <div className="bg-[#1A1A2E] rounded-3xl p-10 lg:p-12 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />
                  <div className="flex items-center gap-4 mb-5 relative">
                    <div className="divider-w" />
                    <span className="ud-body text-[10px] font-semibold uppercase tracking-[0.4em] text-blue-400">
                      English Proficiency
                    </span>
                  </div>
                  <p className="ud-display text-xl lg:text-3xl font-bold text-white leading-snug tracking-tight relative">
                    {uni.englishRequirements ||
                      "IELTS Academic: 6.5 Overall (min 6.0 in all bands) · Duolingo: 120+ · PTE Academic: 62+"}
                  </p>
                </div>

                {/* UG / PG */}
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    {
                      icon: "GraduationCap",
                      label: "Undergraduate",
                      color: "text-blue-600",
                      bg: "bg-blue-50",
                      value:
                        uni.undergradRequirements ||
                        "12 years of formal education (A-Levels / IB / Equivalent) with 70% minimum aggregate.",
                    },
                    {
                      icon: "FileText",
                      label: "Postgraduate",
                      color: "text-purple-600",
                      bg: "bg-purple-50",
                      value:
                        uni.postgradRequirements ||
                        "Recognised Bachelor's degree with 2:1 Honours or equivalent high 2:2 profile.",
                    },
                  ].map((item, i) => {
                    const Ic = (Icons as any)[item.icon] || Icons.FileText;
                    return (
                      <div
                        key={i}
                        className="bg-white border border-[#1A1A2E]/07 rounded-2xl p-8"
                      >
                        <div
                          className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center mb-5`}
                        >
                          <Ic size={20} strokeWidth={1.75} className={item.color} />
                        </div>
                        <p className="ud-body text-[10px] font-semibold uppercase tracking-[0.3em] text-[#1A1A2E]/35 mb-3">
                          {item.label}
                        </p>
                        <p className="ud-body text-[14px] text-[#1A1A2E]/60 font-light leading-[1.8]">
                          {item.value}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SCHOLARSHIPS */}
            {activeTab === "scholarships" && (
              <div className="ud-panel space-y-14">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="divider" />
                    <span className="ud-body text-[10px] font-semibold uppercase tracking-[0.4em] text-blue-600">
                      Financial Aid
                    </span>
                  </div>
                  <h2 className="ud-display text-4xl lg:text-6xl font-black text-[#1A1A2E] tracking-tight leading-none mb-4">
                    Scholarships &{" "}
                    <em className="text-blue-600 not-italic">Grants.</em>
                  </h2>
                  <p className="ud-body text-[15px] text-[#1A1A2E]/45 font-light leading-relaxed">
                    Unlocking high-value academic grants for international
                    excellence.
                  </p>
                </div>

                <div className="bg-white border border-[#1A1A2E]/07 rounded-3xl p-10 lg:p-14">
                  <div className="flex items-start gap-5 mb-8">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                      <Icons.Award
                        size={22}
                        strokeWidth={1.75}
                        className="text-emerald-600"
                      />
                    </div>
                    <div>
                      <p className="ud-body text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-600 mb-1">
                        Scholarship Availability
                      </p>
                      <p className="ud-display text-xl font-bold text-[#1A1A2E] leading-snug">
                        {uni.scholarships ||
                          "Merit-based scholarships up to £5,000 for top candidates."}
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-[#1A1A2E]/06 pt-8">
                    <p className="ud-body text-[14px] text-[#1A1A2E]/45 font-light leading-[1.85]">
                      All GAP candidates receive priority assessment for
                      institutional bursaries and international grants. Our
                      advisors will guide you through every available funding
                      opportunity.
                    </p>
                  </div>
                </div>

                <div className="bg-blue-600 rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-6">
                  <div className="flex-1">
                    <p className="ud-display text-xl font-bold text-white mb-1">
                      Need help applying for scholarships?
                    </p>
                    <p className="ud-body text-[13px] text-white/60 font-light">
                      Our advisors will match you with the best funding options.
                    </p>
                  </div>
                  <Link
                    to="/contact"
                    className="ud-body shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl text-[10px] font-semibold uppercase tracking-[0.28em] hover:bg-[#1A1A2E] hover:text-white transition-colors"
                  >
                    Speak to an Advisor
                    <Icons.ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: Sticky sidebar ── */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-5">

              {/* Stats card */}
              <div className="bg-[#1A1A2E] rounded-3xl p-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-800/10 blur-2xl rounded-full pointer-events-none" />

                <div className="flex items-center gap-4 mb-8 relative">
                  <div className="divider-w" />
                  <span className="ud-body text-[10px] font-semibold uppercase tracking-[0.4em] text-blue-400">
                    Quick Facts
                  </span>
                </div>

                <div className="space-y-5 relative">
                  {[
                    {
                      icon: "Calendar",
                      label: "Intake Dates",
                      value: uni.intakeDates || "Jan / Sept / June",
                      color: "text-blue-400",
                    },
                    {
                      icon: "FileText",
                      label: "Tuition Fees",
                      value: uni.tuitionFees || "£15,000 – £18,000 / yr",
                      color: "text-emerald-400",
                    },
                    {
                      icon: "Globe",
                      label: "Accommodation",
                      value: uni.accommodation || "Urban / On-Campus",
                      color: "text-amber-400",
                    },
                    {
                      icon: "MapPin",
                      label: "Location",
                      value: uni.location || uni.country,
                      color: "text-indigo-400",
                    },
                  ].map((stat, i) => {
                    const Ic = (Icons as any)[stat.icon] || Icons.Globe;
                    return (
                      <div
                        key={i}
                        className="stat-row flex gap-4 items-center pb-5 border-b border-white/[0.06] last:border-0 last:pb-0 group"
                      >
                        <div className="stat-icon w-10 h-10 bg-white/[0.05] border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                          <Ic size={15} strokeWidth={1.75} className={stat.color} />
                        </div>
                        <div>
                          <p className="ud-body text-[9px] font-semibold uppercase tracking-[0.28em] text-white/30 mb-0.5">
                            {stat.label}
                          </p>
                          <p className="ud-body text-[13px] font-medium text-white/80">
                            {stat.value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 space-y-3 relative">
                  <Link
                    to="/registration"
                    className="ud-cta ud-body w-full py-4 rounded-xl flex items-center justify-center gap-2.5 text-white text-[10px] font-semibold uppercase tracking-[0.3em]"
                  >
                    <span>Apply Now</span>
                    <Icons.ArrowRight size={13} />
                  </Link>
                  {uni.website && (
                    <a
                      href={uni.website}
                      target="_blank"
                      rel="noreferrer"
                      className="ud-body w-full py-3 flex items-center justify-center gap-2 text-[10px] font-medium text-white/30 hover:text-white/60 transition-colors uppercase tracking-[0.25em]"
                    >
                      <Icons.Globe size={12} strokeWidth={1.75} />
                      Official Website
                    </a>
                  )}
                </div>
              </div>

              {/* Expert help card */}
              <div className="bg-white rounded-3xl p-8 border border-[#1A1A2E]/07">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
                  <Icons.Phone
                    size={18}
                    strokeWidth={1.75}
                    className="text-blue-600"
                  />
                </div>
                <h3 className="ud-display text-lg font-bold text-[#1A1A2E] mb-2 tracking-tight">
                  Need guidance?
                </h3>
                <p className="ud-body text-[13px] text-[#1A1A2E]/45 font-light leading-[1.8] mb-6">
                  Our certified strategists offer free end-to-end guidance on
                  applications and entry requirements.
                </p>
                <Link
                  to="/contact"
                  className="ud-body inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1A1A2E] border-b border-[#1A1A2E]/20 pb-0.5 hover:text-blue-600 hover:border-blue-600 transition-colors"
                >
                  Talk to an Expert
                  <Icons.ArrowRight size={11} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ══════════════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 lg:px-16 pb-32">
        <div className="bg-[#1A1A2E] rounded-3xl overflow-hidden relative">
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "52px 52px",
            }}
          />
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600 opacity-[0.07] blur-[90px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-8 -left-6 ud-display text-[16vw] font-black text-white/[0.025] italic leading-none select-none pointer-events-none tracking-tighter">
            GAP
          </div>

          <div className="relative z-10 p-12 lg:p-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="flex items-center gap-4 mb-7">
                  <div className="divider-w" />
                  <span className="ud-body text-[10px] font-semibold uppercase tracking-[0.4em] text-blue-400">
                    Take Action
                  </span>
                </div>
                <h2 className="ud-display text-4xl lg:text-6xl font-black text-white leading-[0.95] tracking-tight">
                  Architect your
                  <br />
                  <em className="text-blue-400 not-italic">academic future.</em>
                </h2>
              </div>
              <div>
                <p className="ud-body text-[15px] text-white/40 font-light leading-[1.85] mb-8 max-w-md">
                  Join 5,000+ successful candidates. Connect to the GAP
                  ecosystem for priority admission processing.
                </p>
                <Link
                  to="/registration"
                  className="ud-cta ud-body inline-flex items-center gap-3 px-8 py-4 rounded-xl text-white text-[11px] font-semibold uppercase tracking-[0.28em]"
                >
                  <span>Book Strategy Session</span>
                  <Icons.ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}