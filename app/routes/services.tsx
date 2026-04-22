import React from "react";
import { Link } from "react-router";
import * as Icons from "../components/Icons";

export function meta() {
   return [
      { title: "Premium Study Abroad Services | Global Academic Pathway" },
      { name: "description", content: "Explore our comprehensive study abroad services including university selection, visa assistance, scholarship research, and dedicated career counseling." },
   ];
}

const SERVICES = [
   {
      title: "Strategic Career Counseling",
      description: "Align your academic choices with long-term professional success. Our mentors analyze global market trends to guide your future.",
      icon: Icons.GraduationCap,
      gradient: "from-blue-600 to-indigo-700",
      shadow: "shadow-blue-200",
      features: ["Aptitude Assessment", "Industry Analysis", "Career Roadmaps"]
   },
   {
      title: "Global University Selection",
      description: "Navigate institutional rankings and campus cultures across the UK, USA, Canada, and Australia with expert insights.",
      icon: Icons.Landmark,
      gradient: "from-emerald-600 to-teal-700",
      shadow: "shadow-emerald-200",
      features: ["Ranking Verification", "Campus Comparisons", "Requirement Audits"]
   },
   {
      title: "Precision Admission Support",
      description: "We handle the complexity of global applications, ensuring every document meets the highest standards for approval.",
      icon: Icons.FileText,
      gradient: "from-purple-600 to-pink-700",
      shadow: "shadow-purple-200",
      features: ["SOP/LOM Coaching", "Document Verification", "Application Portals"]
   },
   {
      title: "Visa Excellence Hub",
      description: "Our high-success rate methodology minimizes risks with meticulous documentation and personalized mock interviews.",
      icon: Icons.ShieldCheck,
      gradient: "from-orange-600 to-red-700",
      shadow: "shadow-orange-200",
      features: ["Financial Compliance", "Interview Training", "VFS Support"]
   },
   {
      title: "Scholarship Intelligence",
      description: "Unlock institutional and government funding opportunities. We find the financial aid that fits your academic profile.",
      icon: Icons.Coins,
      gradient: "from-yellow-500 to-amber-600",
      shadow: "shadow-yellow-200",
      features: ["Grant Identification", "Essay Polish", "Merit Tracking"]
   },
   {
      title: "Global Transition Briefing",
      description: "Start your journey with confidence. We prepare you for cultural integration, accommodation, and life abroad.",
      icon: Icons.PlaneTakeoff,
      gradient: "from-sky-500 to-blue-600",
      shadow: "shadow-sky-200",
      features: ["Pre-flight Checks", "Housing Assistance", "Local Networking"]
   }
];

const STEPS = [
   { step: "01", title: "Global Assessment", desc: "A deep dive into your academic history and future aspirations." },
   { step: "02", title: "Institutional Blueprint", desc: "Building a curated list of universities and programs tailored to you." },
   { step: "03", title: "Admission Execution", desc: "Rigorous application management to secure your place abroad." },
   { step: "04", title: "Pathway Accomplished", desc: "Visa secured, bags packed, and your new future begins." }
];

export default function ServicesPage() {
   return (
      <div className="bg-white selection:bg-blue-600 selection:text-white">
         {/* ── HIGH-FIDELITY HERO ────────────────────────────────────────── */}
         <section className="relative pt-32 pb-24 lg:pt-56 lg:pb-48 overflow-hidden">
            {/* Animated Background layer */}
            <div className="absolute inset-0 -z-10">
               <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-50/50 blur-[120px] rounded-full animate-pulse" />
               <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-indigo-50/50 blur-[100px] rounded-full" />
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1e3a8a 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />
            </div>

            <div className="max-w-7xl mx-auto px-6 text-center">
               <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                  Institutional Excellence & Support
               </div>
               <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-gray-900 tracking-tighter leading-[0.85] italic mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                  Unlocking <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-700 to-blue-800">Global Potential.</span>
               </h1>
               <p className="max-w-3xl mx-auto text-lg lg:text-2xl text-gray-500 font-bold leading-relaxed mb-16 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
                  We don't just process applications; we engineer success. Our suite of premium services is designed to handle every variable of your international education journey.
               </p>

               <div className="flex flex-wrap justify-center gap-6 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-700">
                  <Link to="/registration" className="px-12 py-6 bg-gray-900 text-white font-black rounded-3xl uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-gray-200 hover:bg-blue-600 transition-all hover:scale-105">
                     Start Your Strategy Session
                  </Link>
                  <div className="flex -space-x-3 items-center px-4">
                     {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden">
                           <img src={`https://i.pravatar.cc/100?u=user${i}`} alt="user" />
                        </div>
                     ))}
                     <div className="pl-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">+5,000 Students Guided</div>
                  </div>
               </div>
            </div>
         </section>

         {/* ── SERVICES GRID ARCHITECTURE ────────────────────────────────── */}
         <section className="py-32 bg-white relative">
            <div className="max-w-7xl mx-auto px-6">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                  {SERVICES.map((s, i) => (
                     <div
                        key={i}
                        className="group relative bg-white rounded-[3.5rem] p-12 border border-gray-100 hover:border-transparent hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 hover:-translate-y-4 overflow-hidden"
                     >
                        {/* Background Detail */}
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-700`} />

                        {/* Icon Assembly */}
                        <div className={`w-20 h-20 bg-gradient-to-br ${s.gradient} rounded-[2rem] flex items-center justify-center text-white mb-10 shadow-2xl ${s.shadow} group-hover:scale-110 group-hover:rotate-6 transition-all duration-700`}>
                           <s.icon size={36} strokeWidth={2} />
                        </div>

                        <h3 className="text-3xl font-black text-gray-900 mb-6 tracking-tighter italic leading-tight">{s.title}</h3>
                        <p className="text-gray-500 font-bold mb-10 leading-relaxed text-base opacity-80">
                           {s.description}
                        </p>

                        <div className="space-y-4 pt-10 border-t border-gray-50">
                           <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4">Core Deliverables</p>
                           {s.features.map((f, fi) => (
                              <div key={fi} className="flex items-center gap-4 text-sm font-black text-gray-400 group-hover:text-gray-800 transition-colors duration-300">
                                 <div className="w-2 h-2 bg-blue-600 rounded-full opacity-40" />
                                 {f}
                              </div>
                           ))}
                        </div>

                        <Link
                           to="/registration"
                           className="mt-12 w-full py-5 bg-gray-50 text-blue-600 font-black rounded-2xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm"
                        >
                           Learn More <Icons.ArrowRight size={16} />
                        </Link>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── THE ECOSYSTEM WORKFLOW ────────────────────────────────────── */}
         <section className="py-32 bg-gray-950 text-white relative overflow-hidden">
            {/* Decorative Element */}
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none select-none overflow-hidden">
               <div className="text-[30vw] font-black text-white absolute -bottom-32 -left-32 tracking-tighter opacity-10 italic">
                  GAP
               </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
               <div className="flex flex-col lg:flex-row items-start gap-20">
                  <div className="lg:w-5/12 sticky top-32">
                     <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-blue-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                        Operational Intelligence
                     </div>
                     <h2 className="text-5xl lg:text-7xl font-black mb-10 tracking-tighter leading-tight italic">How we secure your <br /><span className="text-blue-500">Global Future.</span></h2>
                     <p className="text-gray-400 font-bold text-xl leading-relaxed mb-12 max-w-md">
                        We've eliminated the friction of international admissions through a proprietary 4-stage deployment model.
                     </p>
                     <div className="space-y-6">
                        <div className="flex items-center gap-4 text-white/60">
                           <Icons.ShieldCheck className="text-blue-500" />
                           <span className="text-[10px] font-black uppercase tracking-widest">End-to-End Compliance</span>
                        </div>
                        <div className="flex items-center gap-4 text-white/60">
                           <Icons.Globe className="text-emerald-500" />
                           <span className="text-[10px] font-black uppercase tracking-widest">Verified Global Networks</span>
                        </div>
                     </div>
                     <div className="mt-16">
                        <Link to="/registration" className="px-12 py-6 bg-blue-600 text-white font-black rounded-3xl text-[10px] uppercase tracking-widest hover:bg-white hover:text-gray-950 transition-all shadow-2xl shadow-blue-900/40">
                           Initiate Your Blueprint
                        </Link>
                     </div>
                  </div>

                  <div className="lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-8">
                     {STEPS.map((step, si) => (
                        <div key={si} className="group bg-white/5 border border-white/10 p-10 lg:p-14 rounded-[4rem] hover:bg-white/10 hover:border-blue-500/30 transition-all duration-700 relative">
                           <div className="absolute top-10 right-10 text-7xl font-black text-white/5 group-hover:text-blue-500/20 transition-colors italic">
                              {step.step}
                           </div>
                           <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 mb-10 group-hover:scale-110 transition-transform">
                              <Icons.ArrowRight size={32} />
                           </div>
                           <h4 className="text-2xl font-black mb-4 tracking-tighter italic">{step.title}</h4>
                           <p className="text-gray-400 text-base font-bold leading-relaxed">{step.desc}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </section>

         {/* ── GLOBAL DEPLOYMENT CTA ─────────────────────────────────────── */}
         <section className="py-40 text-center relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[120px] -z-10" />

            <div className="max-w-4xl mx-auto px-6">
               <div className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-10 italic">
                  Final Architecture Phase
               </div>
               <h2 className="text-5xl lg:text-8xl font-black text-gray-900 mb-10 tracking-tighter leading-[0.9] italic">
                  Ready to architect your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">academic future?</span>
               </h2>
               <p className="text-gray-500 font-bold mb-16 text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed">
                  Connect with our certified global strategists today for a comprehensive, no-obligation assessment of your study abroad profile.
               </p>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Link to="/registration" className="w-full sm:w-auto px-16 py-7 bg-gray-900 text-white font-black rounded-[2.5rem] uppercase tracking-[0.2em] text-[10px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:bg-blue-600 transition-all hover:scale-105 active:scale-95">
                     Book Priority Consultation
                  </Link>
                  <Link to="/contact" className="w-full sm:w-auto px-16 py-7 bg-white border border-gray-200 text-gray-900 font-black rounded-[2.5rem] uppercase tracking-[0.2em] text-[10px] hover:bg-gray-50 transition-all">
                     Locate Our Offices
                  </Link>
               </div>
            </div>
         </section>
      </div>
   );
}
