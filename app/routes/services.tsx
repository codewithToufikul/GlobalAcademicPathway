import React from "react";
import * as Icons from "../components/Icons";

export function meta() {
  return [
    { title: "Our Premium Services | Global Academic Pathway" },
    { name: "description", content: "Explore our comprehensive study abroad services including university selection, visa assistance, and career counseling." },
  ];
}

const SERVICES = [
  {
    title: "Career Counseling",
    description: "Personalized guidance to align your academic choices with your long-term professional goals.",
    icon: Icons.GraduationCap,
    gradient: "from-blue-600 to-indigo-700",
    features: ["Aptitude Assessment", "Industry Analysis", "Success Roadmaps"]
  },
  {
    title: "University Selection",
    description: "Expert assistance in choosing the right institution across global destinations like UK, USA, and Canada.",
    icon: Icons.Landmark,
    gradient: "from-emerald-600 to-teal-700",
    features: ["Ranking Verification", "Campus Comparisons", "Requirement Analysis"]
  },
  {
    title: "Admission Guidance",
    description: "End-to-end support for your application process, ensuring all documentation meets global standards.",
    icon: Icons.FileText,
    gradient: "from-purple-600 to-pink-700",
    features: ["SOP Review", "Document Authentication", "Application Tracking"]
  },
  {
    title: "Visa Assistance",
    description: "High-success rate visa processing with expert interview preparation and financial documentation help.",
    icon: Icons.ShieldCheck,
    gradient: "from-orange-600 to-red-700",
    features: ["Document Checklist", "Mock Interviews", "Compliance Guidance"]
  },
  {
    title: "Scholarship Support",
    description: "Unlock international funding opportunities with our dedicated scholarship research team.",
    icon: Icons.Coins,
    gradient: "from-yellow-500 to-amber-600",
    features: ["Grant Identification", "Essay Support", "Merit-based Aid"]
  },
  {
    title: "Pre-departure Briefing",
    description: "Get ready for your new life abroad with sessions on culture, lifestyle, and student essentials.",
    icon: Icons.PlaneTakeoff,
    gradient: "from-sky-500 to-blue-600",
    features: ["Travel Checklist", "Accommodation Help", "Local Orientation"]
  }
];

const STEPS = [
  { step: "01", title: "Consultation", desc: "Book an initial session to discuss your dreams." },
  { step: "02", title: "Strategy", desc: "We build a custom roadmap for your destinations." },
  { step: "03", title: "Apply", desc: "Our team handles the heavy lifting of applications." },
  { step: "04", title: "Fly", desc: "Visa in hand, you're ready to start your journey." }
];

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50/50 to-white -z-10" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
           <div className="text-center max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000">
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-xs font-black uppercase tracking-widest mb-6 inline-block">Our Expertise</span>
              <h1 className="text-5xl lg:text-7xl font-black text-gray-900 tracking-tight mb-8">
                Premium Student <span className="text-blue-600">Solutions</span>
              </h1>
              <p className="text-lg text-gray-500 font-medium leading-relaxed">
                Global Academic Pathway provides comprehensive, expert support for students aiming to achieve international excellence. Our methodology is built on data, experience, and your success.
              </p>
           </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white relative">
         <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
               {SERVICES.map((s, i) => (
                 <div key={i} className="group relative bg-white rounded-[2.5rem] p-10 border border-gray-100 hover:border-transparent hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2">
                    <div className={`w-16 h-16 bg-gradient-to-br ${s.gradient} rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform duration-500`}>
                       <s.icon size={30} />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">{s.title}</h3>
                    <p className="text-gray-500 font-medium mb-8 leading-relaxed text-sm">
                       {s.description}
                    </p>
                    <ul className="space-y-3 pt-6 border-t border-gray-50">
                       {s.features.map((f, fi) => (
                         <li key={fi} className="flex items-center gap-2 text-xs font-bold text-gray-400 group-hover:text-gray-600 transition-colors">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                            {f}
                         </li>
                       ))}
                    </ul>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Process Section */}
      <section className="py-24 lg:py-32 bg-gray-900 text-white overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16">
               <div className="lg:w-1/2">
                  <span className="text-blue-500 font-black uppercase text-xs tracking-widest mb-6 block">The Workflow</span>
                  <h2 className="text-4xl lg:text-6xl font-black mb-8 tracking-tight">How we make <br /><span className="text-blue-500">Magic Happen.</span></h2>
                  <p className="text-gray-400 font-medium text-lg leading-relaxed mb-10 max-w-md">
                     We've streamlined the international application process into four simplified stages.
                  </p>
                  <a href="/registration" className="px-8 py-4 bg-white text-gray-900 font-black rounded-2xl text-sm uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all">Start Your Process</a>
               </div>
               <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {STEPS.map((step, si) => (
                    <div key={si} className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all duration-300">
                       <div className="text-3xl font-black text-blue-500 mb-4">{step.step}</div>
                       <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                       <p className="text-gray-400 text-sm font-medium leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* Trust Stats */}
      <section className="py-24">
         <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="bg-blue-600 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden shadow-2xl shadow-blue-200">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 relative text-center">
                  {[
                    { label: "Successful Visas", val: "98%" },
                    { label: "Partner Universities", val: "500+" },
                    { label: "Career Sessions", val: "10k+" },
                    { label: "Years Exp", val: "12+" }
                  ].map((stat, sti) => (
                    <div key={sti}>
                       <div className="text-4xl lg:text-5xl font-black text-white mb-2">{stat.val}</div>
                       <div className="text-blue-100 font-bold uppercase text-[10px] tracking-widest">{stat.label}</div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 text-center">
         <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-8 tracking-tight">Ready to transform <br /> your future?</h2>
            <p className="text-gray-500 font-medium mb-10 text-lg">Our experts are waiting to build your personalized study strategy today.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <a href="/registration" className="w-full sm:w-auto px-10 py-5 bg-gray-900 text-white font-black rounded-2xl uppercase tracking-widest text-sm hover:bg-blue-600 transition-all shadow-xl shadow-gray-200">Book Free Consultation</a>
               <a href="/about" className="w-full sm:w-auto px-10 py-5 bg-white border border-gray-200 text-gray-900 font-black rounded-2xl uppercase tracking-widest text-sm hover:bg-gray-50 transition-all">Learn More</a>
            </div>
         </div>
      </section>
    </div>
  );
}
