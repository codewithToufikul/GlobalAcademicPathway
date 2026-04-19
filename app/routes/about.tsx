import React from "react";
import type { Route } from "./+types/about";
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
      {/* ── HERO SECTION ────────────────────────────────────────────────── */}
      <section
        className="relative pt-24 pb-16 lg:pt-32 lg:pb-32 overflow-hidden flex items-center min-h-[70vh] lg:min-h-[85vh]"
        style={{
          background:
            "radial-gradient(circle at 10% 20%, rgba(37, 99, 235, 0.05) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(79, 70, 229, 0.05) 0%, transparent 40%), #ffffff",
        }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left animate-in fade-in slide-in-from-left-8 duration-1000">
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-[10px] lg:text-xs font-bold uppercase tracking-widest rounded-full mb-6 ring-1 ring-blue-100 shadow-sm">
                Established with Purpose
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 tracking-tight leading-[1.1] mb-8">
                Your Global{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
                  Academic
                </span>{" "}
                Partner
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed lg:leading-loose mb-10">
                At Global Academic Pathway, we bridge the gap between your aspirations and your dream university. Founded on trust, transparency, and a student-first philosophy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="/#contact"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-1 transition-all duration-300 text-center"
                >
                  Start Your Journey
                </a>
                <a
                  href="#founder"
                  className="px-8 py-4 bg-white text-gray-700 font-bold rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all duration-300 text-center"
                >
                  Meet Our Founder
                </a>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="relative animate-in fade-in zoom-in duration-1000 delay-200">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-30" />
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-100 transform hover:scale-[1.02] transition-transform duration-700">
                <img
                  src="/about-illustration.png"
                  alt="Global Education Consultation Illustration"
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Accents */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-blue-600 rounded-3xl rotate-12 -z-10 animate-pulse" />
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-indigo-600 rounded-2xl -rotate-12 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUNDER SECTION ────────────────────────────────────────────── */}
      <section id="founder" className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Founder Image/Card */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-100 group">
                <img
                  src="/image.jpeg"
                  alt="Mr. Jashim Uddin Ahmed - Founder of GAP"
                  className="w-full h-[550px] object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-10 left-10 text-white">
                  <div className="w-16 h-1 w-12 bg-blue-500 rounded-full mb-4" />
                  <p className="text-blue-100 font-bold text-xs uppercase tracking-[0.3em] mb-2">CEO & Founder</p>
                  <h3 className="text-3xl font-black">Mr. Jashim Uddin Ahmed</h3>
                </div>
              </div>
            </div>

            {/* Founder Story */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
                  Our Leadership
                </span>
                <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                  A Mission Born from <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
                    Sincere Purpose
                  </span>
                </h2>
              </div>
              <div className="space-y-6 text-gray-500 text-base sm:text-lg leading-[1.8]">
                <p>
                  Mr. Jashim Uddin Ahmed founded Global Academic Pathway (GAP) with a clear mission—to address the challenges, misinformation, and risks that students often face when making one of the most important decisions of their lives.
                </p>
                <div className="grid sm:grid-cols-2 gap-6 py-4">
                  <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100">
                    <p className="font-bold text-gray-900 mb-2">Honest Guidance</p>
                    <p className="text-sm">Providing reliable support from university choice to admission.</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                    <p className="font-bold text-gray-900 mb-2">Student success</p>
                    <p className="text-sm">Connectivity with local communities after arrival.</p>
                  </div>
                </div>
                <p>
                  From choosing the right university and navigating the admissions process to settling into a new country, students receive comprehensive support at every stage. We empower individuals to make informed decisions and confidently begin their academic journey overseas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ──────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-gray-50/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-4">
              Mission & <span className="text-blue-600">Vision</span>
            </h2>
            <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            {/* Mission */}
            <div className="group relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-[3rem] opacity-0 group-hover:opacity-10 blur-xl transition duration-500" />
              <div className="relative bg-white rounded-[2.5rem] p-10 lg:p-14 border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center mb-8 shadow-lg shadow-blue-200 transform group-hover:-translate-y-2 transition-transform duration-500">
                  <Icons.GraduationCap size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-wider">Mission</h3>
                <p className="text-gray-500 text-lg leading-relaxed italic">
                  "To provide transparent, reliable, and student-focused guidance that empowers individuals to make informed decisions. We are committed to supporting students at every stage—ensuring access to accurate information and trusted advice."
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="group relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-[3rem] opacity-0 group-hover:opacity-10 blur-xl transition duration-500" />
              <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-10 lg:p-14 shadow-2xl shadow-blue-200/50 flex flex-col items-center text-center text-white">
                <div className="w-20 h-20 bg-white/20 rounded-[2rem] flex items-center justify-center mb-8 backdrop-blur-md shadow-inner transform group-hover:-translate-y-2 transition-transform duration-500">
                  <Icons.ShieldCheck size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-black mb-6 uppercase tracking-wider">Vision</h3>
                <p className="text-blue-50 text-lg leading-relaxed italic">
                  "To become a globally trusted platform for international education, where every student can pursue their academic aspirations with confidence, clarity, and equal opportunity, free from misinformation and barriers."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-24">
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
              Our Compass
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
              Values We <span className="text-blue-600">Believe In</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Icons.ShieldCheck size={32} />,
                title: "Transparency",
                desc: "No hidden agendas. Every student deserves full honesty and clear expectations.",
                color: "from-blue-500 to-indigo-600",
              },
              {
                icon: <Icons.GraduationCap size={32} />,
                title: "Student-First",
                desc: "Your success is our primary metric. We tailor our advice to your specific goals.",
                color: "from-sky-500 to-blue-600",
              },
              {
                icon: <Icons.Clock size={32} />,
                title: "End-to-End",
                desc: "We stay with you from the first session to your first day in a new country.",
                color: "from-indigo-500 to-blue-600",
              },
              {
                icon: <Icons.MapPin size={32} />,
                title: "Reliability",
                desc: "Count on us for accurate data, timely responses, and verified information.",
                color: "from-blue-600 to-indigo-700",
              },
            ].map((value, idx) => (
              <div 
                key={value.title}
                className="group p-10 bg-white rounded-3xl border border-gray-100 hover:border-blue-200 hover:shadow-[0_30px_60px_rgba(37,99,235,0.08)] transition-all duration-500 flex flex-col items-center text-center"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-[2rem] flex items-center justify-center text-white mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-blue-100`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-4 group-hover:text-blue-600 transition-colors uppercase tracking-tight">
                  {value.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ─────────────────────────────────────────────────── */}
      <section className="pb-24 lg:pb-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[3rem] lg:rounded-[4rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700" />
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <div className="relative px-8 py-20 lg:py-28 text-center flex flex-col items-center">
              <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tight mb-8">
                Build Your Future <br className="hidden sm:block" /> with Confidence
              </h2>
              <p className="text-blue-100 text-lg lg:text-xl max-w-2xl mx-auto mb-12 opacity-90 leading-[1.8]">
                Don't let misinformation stand in the way of your dreams. Get the support you need from the experts who care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/#contact"
                  className="px-12 py-5 bg-white text-blue-700 font-black rounded-2xl hover:bg-blue-50 shadow-2xl shadow-blue-900/40 hover:-translate-y-1 transition-all duration-300 uppercase tracking-wider text-sm"
                >
                  Book Free Meeting
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
