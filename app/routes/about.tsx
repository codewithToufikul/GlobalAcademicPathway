import React from "react";
import * as Icons from "../components/Icons";

export function meta() {
  return [
    { title: "About Us | Global Academic Pathway" },
    {
      name: "description",
      content:
        "Learn about Global Academic Pathway — founded by Mr. Jashim Uddin Ahmed to provide transparent, student-focused guidance for international higher education.",
    },
  ];
}

export default function About() {
  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">
      {/* ── ARCHITECTURAL HERO ────────────────────────────────────────── */}
      <section className="relative pt-30 pb-24 lg:pb-32 overflow-hidden bg-white">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50 blur-[100px] rounded-full opacity-50" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#1e3a8a 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left animate-in fade-in slide-in-from-left-8 duration-1000">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-10">
                <Icons.ShieldCheck size={12} /> Established with Sincere Purpose
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-gray-900 mb-10 tracking-tighter leading-[0.85] italic animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                Your Global <br />
                <span className="text-blue-600">Academic Partner.</span>
              </h1>
              <p className="text-gray-500 font-bold text-lg lg:text-xl max-w-2xl mb-16 leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 mx-auto lg:mx-0">
                Bridging the gap between your aspirations and your dream university. Founded on trust, transparency, and a student-first philosophy that engineers global success.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <a
                  href="/registration"
                  className="px-16 py-7 bg-gray-900 text-white font-black rounded-3xl shadow-2xl shadow-gray-200 hover:bg-blue-600 transition-all duration-500 uppercase tracking-widest text-[10px] hover:scale-105"
                >
                  Initiate Strategy Session
                </a>
                <a
                  href="#founder"
                  className="px-16 py-7 bg-white text-gray-950 border border-gray-200 font-black rounded-3xl hover:bg-gray-50 transition-all duration-500 uppercase tracking-widest text-[10px]"
                >
                  Meet Our Founder
                </a>
              </div>
            </div>

            {/* Right Asset */}
            <div className="relative animate-in zoom-in duration-1000 delay-300 group">
              <div className="absolute -inset-10 bg-blue-100/50 rounded-full blur-[100px] opacity-30" />
              <div className="relative rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(37,99,235,0.15)] border border-gray-100 transform group-hover:scale-[1.02] transition-transform duration-1000">
                <img
                  src="./about-illustration.png"
                  alt="Global Education"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600 rounded-[2.5rem] rotate-12 -z-10 animate-pulse hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUNDER PHILOSOPHY ────────────────────────────────────────── */}
      <section id="founder" className="py-32 lg:py-48 bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="text-[30vw] font-black text-white absolute -bottom-32 -right-32 tracking-tighter italic">FOUNDER</div>
        </div>

        <div className="max-w-8xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-20 lg:gap-32 items-center">
            {/* Asset Column */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-4 bg-blue-600/30 rounded-[4rem] blur-2xl group-hover:bg-blue-600/50 transition duration-1000" />
              <div className="relative rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl group">
                <img
                  src="/image.jpeg"
                  alt="Mr. Jashim Uddin Ahmed"
                  className="w-full h-[650px] object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-16 left-16">
                  <div className="w-16 h-1.5 bg-blue-500 rounded-full mb-6" />
                  <p className="text-blue-400 font-black text-[10px] uppercase tracking-[0.4em] mb-3">CEO & Founder</p>
                  <h3 className="text-5xl font-black italic tracking-tighter">Jashim Uddin Ahmed</h3>
                </div>
              </div>
            </div>

            {/* Narrative Column */}
            <div className="lg:col-span-7 space-y-12">
              <div>
                <span className="inline-block px-4 py-2 bg-white/5 border border-white/10 text-blue-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-10">
                  Institutional Leadership
                </span>
                <h2 className="text-4xl lg:text-7xl font-black mb-10 tracking-tighter leading-[0.9] italic">
                  A Mission Born from <br />
                  <span className="text-blue-500">Authentic Intent.</span>
                </h2>
              </div>
              <div className="space-y-8 text-gray-400 font-bold text-md lg:text-lg leading-relaxed">
                <p>
                  Founded to address the pervasive misinformation in global education, Mr. Ahmed established GAP as a beacon of transparency.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 py-4">
                  <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors">
                    <p className="font-black text-white mb-3 uppercase text-[10px] tracking-widest text-blue-400 italic">Core Mandate</p>
                    <p className="text-sm font-black text-white/80">Zero-misinformation guidance from inception to arrival.</p>
                  </div>
                  <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-colors">
                    <p className="font-black text-white mb-3 uppercase text-[10px] tracking-widest text-emerald-400 italic">Ecosystem Support</p>
                    <p className="text-sm font-black text-white/80">Permanent connectivity with alumni and local networks.</p>
                  </div>
                </div>
                <p>
                  At GAP, we empower students to make high-stakes decisions with absolute clarity. Our methodology ensures that every candidate is prepared for the academic rigors and cultural shifts of life abroad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE COMPASS ──────────────────────────────────────────────── */}
      <section className="py-32 lg:py-48 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <span className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-10">
              Our Strategic Pillars
            </span>
            <h2 className="text-5xl lg:text-8xl font-black text-gray-900 tracking-tighter italic">
              Values We <span className="text-blue-600">Champion.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                icon: <Icons.ShieldCheck size={32} />,
                title: "Transparency",
                desc: "Total honesty in documentation and institutional assessment.",
                color: "from-blue-600 to-indigo-700",
              },
              {
                icon: <Icons.GraduationCap size={32} />,
                title: "Student-First",
                desc: "Every roadmap is tailored to individual potential and career goals.",
                color: "from-blue-500 to-blue-800",
              },
              {
                icon: <Icons.Clock size={32} />,
                title: "End-to-End",
                desc: "Persistent support from the first meeting to post-arrival integration.",
                color: "from-gray-900 to-gray-800",
              },
              {
                icon: <Icons.MapPin size={32} />,
                title: "Reliability",
                desc: "Data-driven counseling backed by verified institutional networks.",
                color: "from-blue-700 to-blue-900",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="group p-12 bg-white rounded-[3.5rem] border border-gray-100 hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 flex flex-col items-center text-center hover:-translate-y-4"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-[2rem] flex items-center justify-center text-white mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-2xl`}>
                  {value.icon}
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-tight italic">
                  {value.title}
                </h3>
                <p className="text-gray-400 font-bold text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL DEPLOYMENT CTA ──────────────────────────────────────── */}
      <section className="pb-40 max-w-7xl mx-auto px-6">
        <div className="bg-blue-600 rounded-[5rem] p-16 lg:p-32 text-center relative overflow-hidden shadow-2xl group">
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          <div className="relative z-10">
            <h2 className="text-5xl lg:text-8xl font-black text-white mb-10 tracking-tighter leading-[0.9] italic">
              Architect Your <br /> Global Academic <br /> Future.
            </h2>
            <p className="text-blue-100 font-bold text-lg lg:text-2xl mb-16 max-w-2xl mx-auto leading-relaxed">
              Join thousands of successful candidates who trusted GAP with their international education roadmap.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <a
                href="/registration"
                className="px-16 py-7 bg-white text-blue-600 font-black rounded-3xl shadow-2xl hover:bg-gray-50 transition-all duration-500 uppercase tracking-widest text-[10px] hover:scale-105"
              >
                Initiate Deployment
              </a>
              <a
                href="/contact"
                className="px-16 py-7 bg-white/10 border border-white/20 text-white font-black rounded-3xl hover:bg-white/20 transition-all duration-500 uppercase tracking-widest text-[10px]"
              >
                Consultation Nodes
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
