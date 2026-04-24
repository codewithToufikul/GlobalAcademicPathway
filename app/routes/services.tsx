import React from "react";
import { Link } from "react-router";
import * as Icons from "../components/Icons";

export function meta() {
   return [
      { title: "Premium Study Abroad Services | Global Academic Pathway" },
      {
         name: "description",
         content:
            "Explore our comprehensive study abroad services including university selection, visa assistance, scholarship research, and dedicated career counseling.",
      },
   ];
}

const STEPS = [
   {
      step: "01",
      title: "Global Assessment",
      desc: "A deep dive into your academic history and future aspirations.",
      icon: "Search",
   },
   {
      step: "02",
      title: "Institutional Blueprint",
      desc: "Building a curated list of universities and programs tailored to you.",
      icon: "BookOpen",
   },
   {
      step: "03",
      title: "Admission Execution",
      desc: "Rigorous application management to secure your place abroad.",
      icon: "FileText",
   },
   {
      step: "04",
      title: "Pathway Accomplished",
      desc: "Visa secured, bags packed, and your new future begins.",
      icon: "Plane",
   },
];

const STATS = [
   { value: "5,000+", label: "Students Guided" },
   { value: "98%", label: "Visa Success Rate" },
   { value: "120+", label: "Partner Universities" },
   { value: "15+", label: "Countries Covered" },
];

export default function ServicesPage() {
   const [services, setServices] = React.useState<any[]>([]);
   const [loading, setLoading] = React.useState(true);
   const [mounted, setMounted] = React.useState(false);

   React.useEffect(() => {
      const fetchServices = async () => {
         try {
            const API_BASE =
               window.location.hostname === "localhost"
                  ? "https://gap-server-22sf.onrender.com/api"
                  : "https://gap-server-22sf.onrender.com/api";
            const res = await fetch(`${API_BASE}/services`);
            const json = await res.json();
            if (json.success) {
               setServices(json.data);
            }
         } catch (err) {
            console.error("Failed to fetch services:", err);
         } finally {
            setLoading(false);
            setTimeout(() => setMounted(true), 60);
         }
      };
      fetchServices();
   }, []);

   return (
      <div
         className="bg-[#F7F5F0] overflow-x-hidden"
         style={{ fontFamily: "'Georgia', serif" }}
      >
         <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        .sp-display { font-family: 'Playfair Display', Georgia, serif; }
        .sp-body    { font-family: 'DM Sans', system-ui, sans-serif; }

        /* ── Entrance animations ── */
        .sp-up {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.75s cubic-bezier(0.22,1,0.36,1),
                      transform 0.75s cubic-bezier(0.22,1,0.36,1);
        }
        .sp-up.in { opacity: 1; transform: translateY(0); }
        .sp-up.d1 { transition-delay: 0.08s; }
        .sp-up.d2 { transition-delay: 0.18s; }
        .sp-up.d3 { transition-delay: 0.30s; }
        .sp-up.d4 { transition-delay: 0.44s; }
        .sp-up.d5 { transition-delay: 0.58s; }

        /* ── Service card ── */
        .svc-card {
          background: white;
          border: 1px solid rgba(26,26,46,0.07);
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.4s ease,
                      border-color 0.3s ease;
        }
        .svc-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 64px rgba(26,26,46,0.09);
          border-color: rgba(37,99,235,0.2);
        }
        .svc-card:hover .svc-cta {
          background: #1A1A2E;
          color: white;
        }
        .svc-card:hover .svc-icon-wrap {
          transform: scale(1.08) rotate(-4deg);
        }

        .svc-cta {
          transition: background 0.3s ease, color 0.3s ease;
        }
        .svc-icon-wrap {
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }

        /* ── Step card ── */
        .step-card {
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.03);
          transition: background 0.35s ease, border-color 0.35s ease;
        }
        .step-card:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(37,99,235,0.35);
        }
        .step-card:hover .step-num {
          color: rgba(37,99,235,0.25);
        }

        /* ── Pill tag ── */
        .sp-pill {
          background: rgba(37,99,235,0.08);
          color: #2563eb;
          border: 1px solid rgba(37,99,235,0.15);
        }

        /* ── CTA button ── */
        .sp-cta-primary {
          background: #1A1A2E;
          position: relative;
          overflow: hidden;
          transition: box-shadow 0.3s ease;
        }
        .sp-cta-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #2563eb;
          transform: translateX(-101%);
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .sp-cta-primary:hover::after { transform: translateX(0); }
        .sp-cta-primary span { position: relative; z-index: 1; }
        .sp-cta-primary:hover { box-shadow: 0 16px 40px rgba(37,99,235,0.25); }

        .sp-cta-ghost {
          border: 1.5px solid rgba(26,26,46,0.2);
          transition: background 0.3s ease, border-color 0.3s ease;
        }
        .sp-cta-ghost:hover {
          background: rgba(26,26,46,0.05);
          border-color: rgba(26,26,46,0.4);
        }

        /* ── Stat item ── */
        .stat-divider:not(:last-child)::after {
          content: '';
          position: absolute;
          right: 0; top: 15%; bottom: 15%;
          width: 1px;
          background: rgba(26,26,46,0.1);
        }
      `}</style>

         {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
         <section className="relative pt-36 pb-28 lg:pt-56 lg:pb-44 overflow-hidden bg-[#1A1A2E]">
            {/* Grid texture */}
            <div
               className="absolute inset-0 opacity-[0.04] pointer-events-none"
               style={{
                  backgroundImage:
                     "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                  backgroundSize: "64px 64px",
               }}
            />
            {/* Glow blobs */}
            <div className="absolute top-[-120px] right-[-80px] w-[560px] h-[560px] rounded-full bg-blue-700 opacity-[0.07] blur-[130px] pointer-events-none" />
            <div className="absolute bottom-[-60px] left-[10%] w-[400px] h-[400px] rounded-full bg-blue-500 opacity-[0.05] blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
               {/* Label */}
               <div className={`sp-up ${mounted ? "in" : ""}`}>
                  <div className="sp-pill inline-flex items-center gap-2.5 rounded-full px-5 py-2 text-[10px] sp-body font-semibold uppercase tracking-[0.35em] mb-12">
                     <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse inline-block" />
                     Institutional Excellence & Support
                  </div>
               </div>

               {/* Headline */}
               <div className={`sp-up d1 ${mounted ? "in" : ""}`}>
                  <h1 className="sp-display text-[56px] md:text-[80px] lg:text-[108px] font-black text-white leading-[0.9] tracking-tight mb-10">
                     Unlocking
                     <br />
                     <em className="text-blue-400 not-italic">Global</em>
                     <br />
                     Potential.
                  </h1>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mt-4">
                  <div className={`sp-up d2 ${mounted ? "in" : ""}`}>
                     <p className="sp-body text-lg text-white/50 font-light leading-[1.8] max-w-lg">
                        We don't just process applications — we engineer success. Our
                        suite of premium services handles every variable of your
                        international education journey.
                     </p>
                  </div>

                  <div className={`sp-up d3 ${mounted ? "in" : ""} flex flex-col sm:flex-row gap-4 lg:justify-end`}>
                     <Link
                        to="/registration"
                        className="sp-cta-primary sp-body inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-white text-[11px] font-semibold uppercase tracking-[0.28em]"
                     >
                        <span>Start Strategy Session</span>
                        <Icons.ArrowRight size={14} />
                     </Link>
                     <Link
                        to="/contact"
                        className="sp-cta-ghost sp-body inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-white/70 text-[11px] font-semibold uppercase tracking-[0.28em]"
                     >
                        Contact Us
                     </Link>
                  </div>
               </div>
            </div>

            {/* Bottom edge */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
         </section>


         {/* ══════════════════════════════════════════
          SERVICES GRID
      ══════════════════════════════════════════ */}
         <section className="py-28 lg:py-40">
            <div className="max-w-7xl mx-auto px-6 lg:px-16">
               {/* Section header */}
               <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-16">
                  <div>
                     <div className="flex items-center gap-4 mb-5">
                        <div className="w-10 h-[3px] bg-blue-600" />
                        <span className="sp-body text-[10px] font-semibold uppercase tracking-[0.4em] text-blue-600">
                           What We Offer
                        </span>
                     </div>
                     <h2 className="sp-display text-4xl lg:text-6xl font-black text-[#1A1A2E] leading-tight tracking-tight">
                        Our Services
                     </h2>
                  </div>
                  <p className="sp-body text-base text-[#1A1A2E]/50 font-light max-w-sm leading-relaxed lg:text-right">
                     Each service is meticulously designed to remove obstacles and
                     accelerate your path to global education.
                  </p>
               </div>

               {/* Grid */}
               {loading ? (
                  <div className="flex items-center justify-center py-32">
                     <div className="flex flex-col items-center gap-4">
                        <div className="w-9 h-9 border-2 border-[#1A1A2E] border-t-transparent rounded-full animate-spin" />
                        <span className="sp-body text-[10px] uppercase tracking-[0.35em] text-[#1A1A2E]/30 font-semibold">
                           Loading
                        </span>
                     </div>
                  </div>
               ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {services.map((s, i) => {
                        const IconComponent =
                           (Icons as any)[s.icon] || Icons.Globe;
                        return (
                           <div key={s._id} className="svc-card rounded-3xl p-9 flex flex-col">
                              {/* Icon */}
                              <div className="svc-icon-wrap w-14 h-14 rounded-2xl bg-[#1A1A2E] flex items-center justify-center text-white mb-8">
                                 <IconComponent size={26} strokeWidth={1.5} />
                              </div>

                              {/* Title */}
                              <h3 className="sp-display text-2xl font-bold text-[#1A1A2E] mb-3 leading-snug tracking-tight">
                                 {s.title}
                              </h3>

                              {/* Description */}
                              <p className="sp-body text-[14px] text-[#1A1A2E]/50 font-light leading-[1.8] mb-8 line-clamp-3 flex-1">
                                 {s.description}
                              </p>

                              {/* Features */}
                              {s.features?.length > 0 && (
                                 <div className="border-t border-[#1A1A2E]/06 pt-7 mb-8 space-y-3">
                                    {s.features.slice(0, 3).map((f: string, fi: number) => (
                                       <div
                                          key={fi}
                                          className="flex items-center gap-3 sp-body text-[12px] font-medium text-[#1A1A2E]/55"
                                       >
                                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                          {f}
                                       </div>
                                    ))}
                                 </div>
                              )}

                              {/* CTA */}
                              <Link
                                 to={`/services/${s._id}`}
                                 className="svc-cta sp-body w-full py-4 bg-[#F7F5F0] text-[#1A1A2E] rounded-xl text-[10px] font-semibold uppercase tracking-[0.3em] flex items-center justify-center gap-2.5"
                              >
                                 Explore Service
                                 <Icons.ArrowRight size={13} />
                              </Link>
                           </div>
                        );
                     })}
                  </div>
               )}
            </div>
         </section>

         {/* ══════════════════════════════════════════
          PROCESS / HOW IT WORKS
      ══════════════════════════════════════════ */}
         <section className="bg-[#1A1A2E] text-white py-28 lg:py-44 relative overflow-hidden">
            {/* Decorative watermark */}
            <div className="absolute -bottom-16 -right-10 sp-display text-[22vw] font-black text-white/[0.025] leading-none select-none pointer-events-none tracking-tighter italic">
               GAP
            </div>
            {/* Glow */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-600 opacity-[0.05] blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                  {/* Left sticky */}
                  <div className="lg:col-span-5 lg:sticky lg:top-32">
                     <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-[3px] bg-blue-500" />
                        <span className="sp-body text-[10px] font-semibold uppercase tracking-[0.4em] text-blue-400">
                           Our Process
                        </span>
                     </div>
                     <h2 className="sp-display text-4xl lg:text-6xl font-black leading-[0.95] tracking-tight mb-8">
                        How we secure
                        <br />
                        your{" "}
                        <em className="text-blue-400 not-italic">Global Future.</em>
                     </h2>
                     <p className="sp-body text-[15px] text-white/45 font-light leading-[1.85] mb-12 max-w-sm">
                        We've eliminated the friction of international admissions
                        through a proven 4-stage deployment model refined over a decade
                        of guiding students worldwide.
                     </p>

                     <div className="space-y-5 mb-14">
                        {[
                           { icon: "ShieldCheck", label: "End-to-End Compliance", color: "text-blue-400" },
                           { icon: "Globe", label: "Verified Global Networks", color: "text-emerald-400" },
                           { icon: "Award", label: "Certified Strategists", color: "text-amber-400" },
                        ].map((item, i) => {
                           const Ic = (Icons as any)[item.icon] || Icons.Check;
                           return (
                              <div key={i} className="flex items-center gap-4">
                                 <Ic size={16} strokeWidth={1.75} className={item.color} />
                                 <span className="sp-body text-[11px] font-semibold uppercase tracking-[0.3em] text-white/50">
                                    {item.label}
                                 </span>
                              </div>
                           );
                        })}
                     </div>

                     <Link
                        to="/registration"
                        className="sp-cta-primary sp-body inline-flex items-center gap-3 px-8 py-4 rounded-xl text-white text-[11px] font-semibold uppercase tracking-[0.28em]"
                     >
                        <span>Begin Your Blueprint</span>
                        <Icons.ArrowRight size={14} />
                     </Link>
                  </div>

                  {/* Right: Steps */}
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
                     {STEPS.map((step, si) => {
                        const StepIcon = (Icons as any)[step.icon] || Icons.ArrowRight;
                        return (
                           <div key={si} className="step-card rounded-3xl p-9 relative overflow-hidden">
                              {/* Step number watermark */}
                              <div className="step-num absolute top-6 right-7 sp-display text-7xl font-black text-white/[0.05] italic leading-none transition-colors duration-300">
                                 {step.step}
                              </div>

                              {/* Icon */}
                              <div className="w-11 h-11 rounded-xl bg-blue-600/15 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-8">
                                 <StepIcon size={20} strokeWidth={1.75} />
                              </div>

                              <h4 className="sp-display text-xl font-bold text-white mb-3 leading-tight tracking-tight">
                                 {step.title}
                              </h4>
                              <p className="sp-body text-[13px] text-white/40 font-light leading-[1.75]">
                                 {step.desc}
                              </p>
                           </div>
                        );
                     })}
                  </div>
               </div>
            </div>
         </section>

         {/* ══════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════ */}
         <section className="py-36 lg:py-52 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-blue-100 opacity-50 blur-[120px]" />
            </div>

            <div className="max-w-4xl mx-auto px-6 lg:px-16 text-center relative z-10">
               <div className="flex items-center justify-center gap-4 mb-10">
                  <div className="w-10 h-[3px] bg-blue-600" />
                  <span className="sp-body text-[10px] font-semibold uppercase tracking-[0.4em] text-blue-600">
                     Get Started
                  </span>
                  <div className="w-10 h-[3px] bg-blue-600" />
               </div>

               <h2 className="sp-display text-5xl lg:text-[84px] font-black text-[#1A1A2E] leading-[0.92] tracking-tight mb-8">
                  Ready to architect
                  <br />
                  your <em className="text-blue-600">academic future?</em>
               </h2>

               <p className="sp-body text-lg text-[#1A1A2E]/50 font-light leading-[1.85] max-w-2xl mx-auto mb-14">
                  Connect with our certified global strategists for a comprehensive,
                  no-obligation assessment of your study abroad profile.
               </p>

               <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                     to="/apply"
                     className="sp-cta-primary sp-body inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl text-white text-[11px] font-semibold uppercase tracking-[0.28em]"
                  >
                     <span>Book Priority Consultation</span>
                     <Icons.ArrowRight size={14} />
                  </Link>
                  <Link
                     to="/contact"
                     className="sp-cta-ghost sp-body inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl text-[#1A1A2E] text-[11px] font-semibold uppercase tracking-[0.28em]"
                  >
                     Locate Our Offices
                  </Link>
               </div>

               {/* Social proof avatars */}
               <div className="mt-14 flex items-center justify-center gap-4">
                  <div className="flex -space-x-2.5">
                     {[1, 2, 3, 4, 5].map((i) => (
                        <div
                           key={i}
                           className="w-8 h-8 rounded-full border-2 border-[#F7F5F0] bg-gradient-to-br from-blue-400 to-blue-700 overflow-hidden"
                           style={{ opacity: 1 - i * 0.1 }}
                        >
                           <img
                              src={`https://i.pravatar.cc/80?u=sp${i}`}
                              alt=""
                              className="w-full h-full object-cover"
                           />
                        </div>
                     ))}
                  </div>
                  <p className="sp-body text-[11px] font-medium text-[#1A1A2E]/40 uppercase tracking-[0.25em]">
                     5,000+ students guided worldwide
                  </p>
               </div>
            </div>
         </section>
      </div>
   );
}