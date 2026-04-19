import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import * as Icons from "../components/Icons";

interface University {
  _id: string;
  name: string;
  country: string;
  location?: string;
  ranking?: string;
  featured?: boolean;
  logo?: string;
  image?: string;
  popularCourses?: string[];
  scholarshipInfo?: string;
}

export function meta() {
  return [
    { title: "Partner Universities | Global Academic Pathway" },
    { name: "description", content: "Explore our network of 500+ world-class partner universities in the UK, Canada, USA, and beyond." },
  ];
}

export default function UniversitiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilter = searchParams.get("country") || "All";
  
  const [unis, setUnis] = useState<University[]>([]);
  const [filter, setFilter] = useState(initialFilter);
  const [loading, setLoading] = useState(true);

  const countries = ["All", "UK", "Canada", "USA", "Australia", "Europe"];

  useEffect(() => {
    // Update local filter if URL changes
    const countryParam = searchParams.get("country");
    if (countryParam) setFilter(countryParam);
  }, [searchParams]);

  useEffect(() => {
    const fetchUnis = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/universities");
        const json = await res.json();
        if (json.success) setUnis(json.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchUnis();
  }, []);

  const filteredUnis = unis.filter(u => {
    if (filter === "All") return true;
    return u.country.toLowerCase().includes(filter.toLowerCase());
  });

  if (loading) return (
     <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
     </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-[#0f172a] text-white">
         <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
         </div>
         
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <span className="inline-block px-4 py-2 bg-blue-500/20 backdrop-blur-md border border-white/10 rounded-full text-xs font-black uppercase tracking-[0.2em] text-blue-400 mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
               Global Academic Partnerships
            </span>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black mb-10 tracking-tight leading-[0.95] animate-in fade-in slide-in-from-bottom-6 duration-1000">
               World-Class <br /> <span className="text-blue-500">Institutions</span>
            </h1>
            <p className="text-gray-400 font-bold text-lg sm:text-xl max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
               We partner with over 500+ top-ranked universities across the globe to bring you the best career-shaping education.
            </p>
         </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 py-6">
         <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-6">
            <div className="flex p-1.5 bg-gray-100 rounded-2xl border border-gray-200 shadow-inner">
               {countries.map(c => (
                  <button
                    key={c}
                    onClick={() => setFilter(c)}
                    className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${filter === c ? "bg-white text-blue-600 shadow-xl border border-blue-50" : "text-gray-400 hover:text-gray-600"}`}
                  >
                     {c}
                  </button>
               ))}
            </div>
            <div className="text-xs font-black text-gray-400 uppercase tracking-widest bg-white px-6 py-4 rounded-xl border border-gray-100 shadow-sm">
               Showing <span className="text-blue-600">{filteredUnis.length}</span> Participating Unis
            </div>
         </div>
      </section>

      {/* Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6">
         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredUnis.map((uni, idx) => (
               <div 
                 key={uni._id}
                 className="group bg-white rounded-[3rem] border border-gray-100 overflow-hidden hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 flex flex-col"
                 style={{ animationDelay: `${idx * 100}ms` }}
               >
                  <div className="h-64 relative overflow-hidden bg-gray-50 flex items-center justify-center p-12">
                     <img 
                       src={uni.image || "https://images.unsplash.com/photo-1541339907198-e08756eaa589?w=800&q=80"} 
                       className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-20" 
                       alt={uni.name} 
                     />
                     {uni.logo ? (
                        <img src={uni.logo} className="relative z-10 w-full max-h-32 object-contain filter group-hover:brightness-110 transition-all" alt="logo" />
                     ) : (
                        <div className="relative z-10 text-4xl font-black text-blue-600 uppercase tracking-tighter text-center">
                           {uni.name}
                        </div>
                     )}
                     <div className="absolute top-6 left-6 px-4 py-1.5 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
                        {uni.country}
                     </div>
                  </div>
                  
                  <div className="p-10 flex-1 flex flex-col">
                     <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                           <Icons.MapPin size={16} className="text-blue-500" />
                           {uni.country}
                        </div>
                        {uni.ranking && (
                           <div className="px-4 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase rounded-lg">
                              Rank {uni.ranking}
                           </div>
                        )}
                     </div>
                     <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                        {uni.name}
                     </h3>
                     
                     <div className="mb-8 space-y-3">
                        <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Popular Courses</span>
                        <div className="flex flex-wrap gap-2">
                           {(uni.popularCourses || ["Business", "Computing", "Medicine"]).map(course => (
                              <span key={course} className="px-3 py-1 bg-gray-50 border border-gray-100 text-[10px] font-bold text-gray-600 rounded-lg">
                                 {course}
                              </span>
                           ))}
                        </div>
                     </div>

                     <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between">
                        <div className="space-y-1">
                           <span className="block text-[9px] font-black text-blue-600 uppercase tracking-widest">Scholarship</span>
                           <span className="text-xs font-bold text-gray-500">{uni.scholarshipInfo || "Up to £4,000 Available"}</span>
                        </div>
                        <Link 
                          to="/apply" 
                          className="w-12 h-12 bg-[#0f172a] rounded-2xl flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-300 hover:rotate-12"
                        >
                           <Icons.ArrowRight size={24} />
                        </Link>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* CTA */}
      <section className="py-24 max-w-7xl mx-auto px-6">
         <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[4rem] p-12 lg:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-200">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
               <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0 50 C 20 0 80 0 100 50 L 100 100 L 0 100 Z" fill="white" />
               </svg>
            </div>
            <div className="relative z-10">
               <h2 className="text-4xl lg:text-7xl font-black mb-8 tracking-tighter italic">Found your dream university?</h2>
               <p className="text-blue-100 font-bold text-lg sm:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed">
                  Our counselors will guide you through the entire admission and visa process for free.
               </p>
               <Link 
                 to="/apply" 
                 className="inline-flex items-center justify-center gap-4 px-12 py-6 bg-white text-blue-600 font-black rounded-3xl shadow-2xl shadow-blue-900/20 hover:scale-105 transition-all duration-300 uppercase tracking-widest text-sm"
               >
                  Book Free Consultation
                  <Icons.ArrowRight size={20} />
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
}
