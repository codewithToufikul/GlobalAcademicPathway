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
    { name: "description", content: "Explore top-ranked global universities, their programs, and entry requirements." },
  ];
}

export default function UniversityDetailPage() {
  const { id } = useParams();
  const [uni, setUni] = useState<University | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchUni = async () => {
      try {
        const res = await fetch(`https://gap-server-22sf.onrender.com/api/universities/${id}`);
        const json = await res.json();
        if (json.success) {
          setUni(json.data);
        }
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchUni();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white gap-6">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-50 border-t-blue-600 rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse" />
        </div>
      </div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] animate-pulse">Synchronizing Data</p>
    </div>
  );

  if (!uni) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 z-[60] relative">
      <div className="max-w-md w-full bg-white p-12 rounded-[3rem] text-center shadow-2xl border border-gray-100">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8">
          <Icons.Plus size={40} className="rotate-45" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter">Institution Not Found</h2>
        <p className="text-gray-500 font-bold mb-10 leading-relaxed italic">The university profile you are looking for might have been moved or archived.</p>
        <Link to="/universities" className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-gray-200">
          Explore All Institutions
        </Link>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen relative z-[40]">
      {/* ── HIGH-FIDELITY HERO ARCHITECTURE ───────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden pt-40 pb-24 bg-gray-950">
        {/* Dynamic Background Layer with Cover Image Integration */}
        <div className="absolute inset-0 z-0">
          {/* Base Black Layer */}
          <div className="absolute inset-0 bg-gray-950" />

          {/* Cover Image with specialized masking */}
          <img
            src={"https://i.ibb.co.com/XrJQ5r3X/1765623808-banner.jpg"}
            className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105 animate-in fade-in zoom-in duration-1000"
            alt={uni.name}
          />

          {/* Premium Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/60 via-transparent to-transparent" />

          {/* Architectural Detail Layer */}
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />
          <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="flex flex-col lg:flex-row lg:items-end gap-12 lg:gap-20">
            {/* Identity Column */}
            <div className="shrink-0 flex flex-col items-center lg:items-start gap-10 animate-in slide-in-from-left-8 duration-1000">
              <div className="w-40 h-40 lg:w-56 lg:h-56 bg-white rounded-[3rem] p-8 lg:p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10 flex items-center justify-center group relative overflow-hidden">
                {uni.logo ? (
                  <img
                    src={uni.logo}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                    alt="logo"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div className={`flex items-center justify-center w-full h-full text-6xl lg:text-8xl font-black text-blue-600 italic ${uni.logo ? 'hidden' : ''}`}>
                  {uni.name.charAt(0)}
                </div>
              </div>
            </div>

            {/* Typography Column */}
            <div className="flex-1 space-y-8 text-center lg:text-left animate-in slide-in-from-bottom-12 duration-1000 delay-200">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <div className="px-5 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-xl">
                  {uni.country}
                </div>
                {uni.ranking && (
                  <div className="px-5 py-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg">
                    Rank: {uni.ranking}
                  </div>
                )}
                <div className="px-5 py-2 bg-white/5 border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                  Verified Institutional Partner
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white tracking-tighter leading-[0.85] italic drop-shadow-2xl">
                {uni.name}
              </h1>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                    <Icons.MapPin size={20} />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-white/50">{uni.location || uni.country}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                    <Icons.ShieldCheck size={20} />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-white/50">Accredited</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                    <Icons.Calendar size={20} />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-white/50">Intake Open</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STRATEGIC NAVIGATION ──────────────────────────────────────── */}
      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-2xl border-b border-gray-100 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {[
              { id: "overview", label: "Institution Blueprint", icon: <Icons.FileText size={16} /> },
              { id: "courses", label: "Academic Ecosystem", icon: <Icons.GraduationCap size={16} /> },
              { id: "requirements", label: "Entry Protocol", icon: <Icons.ShieldCheck size={16} /> },
              { id: "scholarships", label: "Financial Aid", icon: <Icons.FileText size={16} /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 flex items-center gap-3 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${activeTab === tab.id ? "bg-gray-900 text-white shadow-2xl scale-105" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"}`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CORE CONTENT ARCHITECTURE ─────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">

          {/* Deployment Module (Content) */}
          <div className="lg:col-span-8 space-y-20">

            {activeTab === "overview" && (
              <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
                <div className="space-y-12">
                  <h2 className="text-5xl lg:text-7xl font-black text-gray-900 tracking-tighter italic leading-none">Global <br /><span className="text-blue-600">Overview.</span></h2>
                  <div className="prose prose-2xl prose-blue max-w-none text-gray-500 font-bold leading-relaxed">
                    {uni.overview ? (
                      <div dangerouslySetInnerHTML={{ __html: uni.overview.replace(/\n/g, '<br />') }} />
                    ) : (
                      <p>Founded on a legacy of excellence, {uni.name} represents the pinnacle of higher education in {uni.country}. We engineer success by providing students with cutting-edge resources and a global network of opportunities.</p>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-8 pt-10">
                    {uni.highlights?.map((h, i) => (
                      <div key={i} className="group p-10 bg-gray-50 border border-gray-100 rounded-[3rem] hover:bg-white hover:shadow-2xl transition-all duration-500">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:rotate-12 transition-transform">
                          <Icons.ShieldCheck size={24} />
                        </div>
                        <h4 className="text-xl font-black text-gray-900 mb-4 italic tracking-tight">{h}</h4>
                        <div className="w-12 h-1 bg-blue-100 rounded-full" />
                      </div>
                    )) || [
                      "World-class Research Facilities",
                      "Industry Integration Programs",
                      "Diverse International Community",
                      "Prime Central Location"
                    ].map((h, i) => (
                      <div key={i} className="group p-10 bg-gray-50 border border-gray-100 rounded-[3rem] hover:bg-white hover:shadow-2xl transition-all duration-500">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:rotate-12 transition-transform">
                          <Icons.ShieldCheck size={24} />
                        </div>
                        <h4 className="text-xl font-black text-gray-900 mb-4 italic tracking-tight">{h}</h4>
                        <div className="w-12 h-1 bg-blue-100 rounded-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "courses" && (
              <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 space-y-16">
                <div className="space-y-6">
                  <h2 className="text-5xl lg:text-7xl font-black text-gray-900 tracking-tighter italic leading-none">Academic <br /><span className="text-blue-600">Ecosystem.</span></h2>
                  <p className="text-gray-500 font-bold text-xl lg:text-2xl max-w-2xl leading-relaxed">Explore specialized programs engineered for modern career success.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-10">
                  <div className="space-y-10">
                    <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest border-b-2 border-blue-50 pb-6">Strategic Faculties</h4>
                    <div className="space-y-4">
                      {(uni.faculties || ["School of Arts & Humanities", "Faculty of Science & Tech", "Business & Law School", "Engineering Academy"]).map(f => (
                        <div key={f} className="p-8 bg-gray-50 border border-gray-100 rounded-[2.5rem] font-black text-gray-800 hover:bg-white hover:shadow-xl transition-all group flex items-center justify-between">
                          {f} <Icons.ArrowRight size={18} className="text-gray-200 group-hover:text-blue-600 transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-10">
                    <h4 className="text-[10px] font-black text-orange-600 uppercase tracking-widest border-b-2 border-orange-50 pb-6">High-Demand Programs</h4>
                    <div className="space-y-4">
                      {(uni.popularCourses || ["International Management", "Advanced AI & Robotics", "Health Informatics", "Digital Media & Design"]).map(c => (
                        <div key={c} className="p-8 bg-orange-50/20 border border-orange-100 rounded-[2.5rem] font-black text-orange-950 flex items-center justify-between group">
                          {c} <div className="px-3 py-1 bg-white text-orange-600 rounded-lg text-[8px] font-black">POPULAR</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "requirements" && (
              <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 space-y-16">
                <div className="space-y-6">
                  <h2 className="text-5xl lg:text-7xl font-black text-gray-900 tracking-tighter italic leading-none">Entry <br /><span className="text-blue-600">Protocol.</span></h2>
                  <p className="text-gray-500 font-bold text-xl lg:text-2xl max-w-2xl leading-relaxed">Meticulous standards for high-achieving global candidates.</p>
                </div>

                <div className="space-y-10">
                  <div className="p-12 bg-blue-950 text-white rounded-[4rem] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] group-hover:bg-blue-600/40 transition-all duration-700" />
                    <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-8 relative z-10">English Proficiency Architecture</h4>
                    <p className="text-3xl lg:text-5xl font-black italic tracking-tighter relative z-10 leading-tight">
                      {uni.englishRequirements || "IELTS Academic: 6.5 Overall (min 6.0 in all bands) | Duolingo: 120+ | PTE Academic: 62+"}
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-10">
                    <div className="p-12 bg-white border border-gray-100 rounded-[4rem] shadow-xl space-y-6">
                      <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                        <Icons.GraduationCap size={28} />
                      </div>
                      <h4 className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Undergraduate Entry</h4>
                      <p className="text-gray-600 font-bold text-lg leading-relaxed">{uni.undergradRequirements || "12 Years of formal education (A-Levels/IB/Equivalent) with 70% minimum aggregate."}</p>
                    </div>
                    <div className="p-12 bg-white border border-gray-100 rounded-[4rem] shadow-xl space-y-6">
                      <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                        <Icons.FileText size={28} />
                      </div>
                      <h4 className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Postgraduate Entry</h4>
                      <p className="text-gray-600 font-bold text-lg leading-relaxed">{uni.postgradRequirements || "Recognized Bachelor’s degree with 2:1 Honours or equivalent high 2:2 profile."}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "scholarships" && (
              <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 space-y-16">
                <div className="space-y-6">
                  <h2 className="text-5xl lg:text-7xl font-black text-gray-900 tracking-tighter italic leading-none">Financial <br /><span className="text-blue-600">Aid.</span></h2>
                  <p className="text-gray-500 font-bold text-xl lg:text-2xl max-w-2xl leading-relaxed">Unlocking high-value academic grants for international excellence.</p>
                </div>

                <div className="bg-emerald-50/50 border border-emerald-100 p-16 lg:p-24 rounded-[5rem] text-center space-y-10">
                  <div className="w-24 h-24 bg-emerald-600 rounded-[2rem] flex items-center justify-center text-white mx-auto shadow-2xl shadow-emerald-200">
                    <Icons.FileText size={40} />
                  </div>
                  <h3 className="text-4xl lg:text-6xl font-black text-gray-900 italic tracking-tighter leading-none">
                    {uni.scholarships || "Merit-based scholarships up to £5,000 for top candidates."}
                  </h3>
                  <p className="text-gray-500 font-bold text-lg max-w-xl mx-auto leading-relaxed">All GAP candidates receive priority assessment for institutional bursaries and international grants.</p>
                </div>
              </div>
            )}
          </div>

          {/* Metric Module (Sidebar) */}
          <div className="lg:col-span-4 space-y-10">

            {/* High-Impact Stat Card */}
            <div className="bg-gray-950 rounded-[4rem] p-12 lg:p-14 text-white shadow-2xl relative overflow-hidden border border-white/5">
              <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none italic font-black text-[30vw] -bottom-32 -right-32 leading-none">UNI</div>
              <h3 className="text-2xl font-black italic tracking-tighter mb-12 relative z-10">Institutional Intelligence</h3>

              <div className="space-y-12 relative z-10">
                {[
                  { label: "Strategic Intake", value: uni.intakeDates || "Jan / Sept / June", icon: <Icons.Calendar size={22} className="text-blue-400" /> },
                  { label: "Projected Fees", value: uni.tuitionFees || "£15,000 - £18,000", icon: <Icons.FileText size={22} className="text-emerald-400" /> },
                  { label: "Campus Model", value: uni.accommodation || "Urban / On-Campus", icon: <Icons.Globe size={22} className="text-orange-400" /> },
                  { label: "Primary Hub", value: uni.location || uni.country, icon: <Icons.MapPin size={22} className="text-indigo-400" /> },
                ].map((stat, i) => (
                  <div key={i} className="flex gap-6 items-start group">
                    <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-500">
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">{stat.label}</p>
                      <p className="text-lg font-black text-white leading-tight">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 space-y-4 relative z-10">
                <Link to="/registration" className="w-full py-7 bg-blue-600 text-white font-black rounded-3xl uppercase tracking-widest text-[10px] shadow-2xl shadow-blue-900/50 flex items-center justify-center gap-3 hover:bg-white hover:text-gray-950 transition-all duration-500 active:scale-95">
                  Initiate Application <Icons.ArrowRight size={18} />
                </Link>
                <a href={uni.website} target="_blank" rel="noreferrer" className="w-full py-7 text-white/30 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:text-white transition-colors">
                  Institutional Portal <Icons.Globe size={14} />
                </a>
              </div>
            </div>

            {/* Priority Support Card */}
            <div className="bg-white rounded-[4rem] p-12 lg:p-14 border border-gray-100 shadow-2xl text-center space-y-10 group">
              <div className="w-24 h-24 bg-blue-50 rounded-[2.5rem] flex items-center justify-center mx-auto border border-blue-100 group-hover:rotate-12 transition-transform duration-700">
                <Icons.Phone size={40} className="text-blue-600" />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-black text-gray-900 tracking-tighter italic">Strategic Help.</h3>
                <p className="text-gray-500 font-bold text-sm leading-relaxed">Confused about entry protocols? Our certified strategists provide free end-to-end guidance.</p>
              </div>
              <Link to="/contact" className="inline-block px-12 py-5 bg-gray-950 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl">
                Connect to Expert
              </Link>
            </div>
          </div>

        </div>
      </main>

      {/* ── GLOBAL FOOTER CTA ────────────────────────────────────────── */}
      <section className="pb-40 max-w-7xl mx-auto px-6">
        <div className="bg-gray-900 rounded-[5rem] p-16 lg:p-32 text-center relative overflow-hidden shadow-2xl group">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="text-[40vw] font-black text-white absolute -bottom-40 -left-40 italic leading-none">GAP</div>
          </div>

          <div className="relative z-10">
            <h2 className="text-5xl lg:text-8xl font-black text-white mb-10 tracking-tighter leading-[0.9] italic">
              Architect Your <br /> Academic <span className="text-blue-600">Future.</span>
            </h2>
            <p className="text-gray-400 font-bold text-lg lg:text-2xl mb-16 max-w-2xl mx-auto leading-relaxed">
              Join 5,000+ successful candidates. CONNECT to the GAP ecosystem for priority admission processing.
            </p>
            <Link to="/registration" className="inline-flex items-center justify-center gap-4 px-16 py-7 bg-blue-600 text-white font-black rounded-3xl shadow-2xl shadow-blue-900/40 hover:scale-105 transition-all duration-500 uppercase tracking-widest text-[10px]">
              Book Strategy Session
              <Icons.ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
