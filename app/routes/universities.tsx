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
   coverImage?: string;
   popularCourses?: string[];
   scholarships?: string;
   overview?: string;
   description?: string;
}

export function meta() {
   return [
      { title: "Partner Universities | Global Academic Pathway" },
      { name: "description", content: "Explore our global network of 120+ top-ranked partner universities across the UK, USA, Canada, and beyond." },
   ];
}

const ITEMS_PER_PAGE = 12;
const COUNTRIES = ["All", "UK", "Canada", "USA", "Australia", "Europe"];

export default function UniversitiesPage() {
   const [searchParams] = useSearchParams();
   const initialFilter = searchParams.get("country") || "All";

   const [unis, setUnis] = useState<University[]>([]);
   const [filter, setFilter] = useState(initialFilter);
   const [search, setSearch] = useState("");
   const [page, setPage] = useState(1);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchUnis = async () => {
         try {
            const res = await fetch("https://gap-server-22sf.onrender.com/api/universities");
            const json = await res.json();
            if (json.success) setUnis(json.data);
         } catch (err) { console.error(err); }
         finally { setLoading(false); }
      };
      fetchUnis();
      window.scrollTo(0, 0);
   }, []);

   useEffect(() => { setPage(1); }, [filter, search]);

   const filteredUnis = unis.filter(u => {
      const matchesFilter = filter === "All" || u.country.toLowerCase().includes(filter.toLowerCase());
      const matchesSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.country.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
   });

   const totalPages = Math.ceil(filteredUnis.length / ITEMS_PER_PAGE);
   const paginatedUnis = filteredUnis.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

   if (loading) return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-6">
         <div className="w-16 h-16 border-4 border-blue-50 border-t-blue-600 rounded-full animate-spin mx-auto" />
         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest animate-pulse">Synchronizing Global Database</p>
      </div>
   );

   return (
      <div className="min-h-screen bg-white">
         {/* ── ARCHITECTURAL HERO WITH DYNAMIC BANNER ────────────────────────── */}
         <section className="relative pt-40 pb-24 lg:pt-56 lg:pb-32 overflow-hidden bg-gray-950">
            <div className="absolute inset-0 z-0">
               <img
                  src="https://i.ibb.co.com/XrJQ5r3X/1765623808-banner.jpg"
                  className="w-full h-full object-cover opacity-60 scale-105 animate-in fade-in zoom-in duration-1000"
                  alt="Partner Universities Banner"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />
               <div className="absolute inset-0 bg-gradient-to-r from-gray-950/40 via-transparent to-transparent" />
               <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center lg:text-left">
               <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-10 animate-in fade-in slide-in-from-top-4 duration-700 shadow-xl shadow-blue-500/20">
                  <Icons.ShieldCheck size={12} /> Verified Institutional Partners
               </div>
               <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-10 tracking-tighter leading-[0.85] italic animate-in fade-in slide-in-from-bottom-8 duration-1000 drop-shadow-2xl">
                  World-Class <br />
                  <span className="text-blue-500">Institutions.</span>
               </h1>
               <p className="text-gray-300 font-bold text-lg lg:text-2xl max-w-3xl mb-16 leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 mx-auto lg:mx-0">
                  We partner with {unis.length}+ top-ranked universities across the globe to bring you career-shaping education. Explore your future destination below.
               </p>

               {/* Precision Search Module */}
               <div className="relative max-w-2xl mx-auto lg:mx-0 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
                  <Icons.Search size={24} className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                     type="text"
                     placeholder="Search by name, country, or program..."
                     value={search}
                     onChange={e => setSearch(e.target.value)}
                     className="w-full pl-20 pr-8 py-7 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] text-white placeholder-gray-500 font-bold outline-none focus:border-blue-500 focus:bg-white focus:text-gray-900 focus:shadow-[0_20px_50px_-10px_rgba(37,99,235,0.3)] transition-all text-lg shadow-2xl"
                  />
               </div>
            </div>
         </section>

         {/* ── FILTER ARCHITECTURE ──────────────────────────────────────── */}
         <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-2xl border-b border-gray-50 py-6">
            <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-6">
               <div className="flex p-2 bg-gray-100 rounded-[2rem] border border-gray-200 shadow-inner flex-wrap gap-1">
                  {COUNTRIES.map(c => (
                     <button
                        key={c}
                        onClick={() => setFilter(c)}
                        className={`px-8 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${filter === c ? "bg-white text-blue-600 shadow-2xl border border-blue-50 scale-105" : "text-gray-400 hover:text-gray-600"}`}
                     >
                        {c}
                     </button>
                  ))}
               </div>

               <div className="flex items-center gap-6">
                  {search && (
                     <button onClick={() => setSearch("")} className="text-[10px] font-black text-red-500 hover:text-red-700 uppercase tracking-widest">
                        Reset ✕
                     </button>
                  )}
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-white px-6 py-4 rounded-[1.5rem] border border-gray-100 shadow-sm">
                     <span className="text-blue-600">{filteredUnis.length}</span> Results
                  </div>
               </div>
            </div>
         </section>

         {/* ── UNIVERSITY GRID ─────────────────────────────────────────── */}
         <section className="py-24 max-w-7xl mx-auto px-6">
            {paginatedUnis.length === 0 ? (
               <div className="text-center py-32 bg-gray-50 rounded-[4rem] border-2 border-dashed border-gray-100">
                  <Icons.Search size={64} className="mx-auto text-gray-200 mb-8" />
                  <h3 className="text-3xl font-black text-gray-400 tracking-tighter">No Match Found</h3>
                  <p className="text-gray-400 font-bold mt-2">Adjust your query or explore other regions.</p>
               </div>
            ) : (
               <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                  {paginatedUnis.map((uni) => (
                     <div
                        key={uni._id}
                        className="group bg-white rounded-[3.5rem] border border-gray-100 overflow-hidden hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 hover:-translate-y-4 flex flex-col relative"
                     >
                        {/* Logo Ecosystem */}
                        <div className="h-48 relative bg-white border-b border-gray-50 flex items-center justify-center p-10 overflow-hidden">
                           <div className="absolute top-4 left-4 z-20">
                              <span className="px-4 py-1.5 bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest rounded-full shadow-lg">
                                 {uni.country}
                              </span>
                           </div>

                           <img
                              src={uni.logo}
                              className="w-full max-h-24 object-contain group-hover:scale-110 transition-transform duration-700"
                              alt={uni.name}
                              onError={(e) => {
                                 const img = e.target as HTMLImageElement;
                                 img.style.display = 'none';
                                 const fallback = img.nextElementSibling as HTMLElement;
                                 if (fallback) fallback.style.display = 'flex';
                              }}
                           />
                           <div
                              className="absolute inset-0 items-center justify-center text-3xl font-black text-blue-600 italic opacity-10 select-none"
                              style={{ display: 'none' }}
                           >
                              {uni.name.charAt(0)}
                           </div>

                           {/* Background Shape */}
                           <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        </div>

                        {/* Content Architecture */}
                        <div className="p-10 flex-1 flex flex-col">
                           <h3 className="text-lg font-black text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight tracking-tight line-clamp-2 italic">
                              {uni.name}
                           </h3>

                           <div className="flex items-center gap-3 text-[10px] font-black text-gray-300 uppercase tracking-widest mb-6">
                              <Icons.MapPin size={14} className="text-blue-400" />
                              {uni.country}
                              {uni.ranking && (
                                 <span className="ml-auto px-3 py-1 bg-gray-900 text-white rounded-lg text-[8px] font-black">
                                    RANK #{uni.ranking}
                                 </span>
                              )}
                           </div>

                           <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between gap-4">
                              <div className="min-w-0">
                                 <span className="block text-[8px] font-black text-blue-600 uppercase tracking-widest mb-1">Scholarship</span>
                                 <span className="text-[11px] font-bold text-gray-400 line-clamp-1">{uni.scholarships || "Merit Based"}</span>
                              </div>
                              <Link
                                 to={`/universities/${uni._id}`}
                                 className="w-14 h-14 bg-gray-950 text-white rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all duration-500 hover:rotate-12 hover:scale-110 shrink-0 shadow-lg shadow-gray-200 hover:shadow-blue-200"
                              >
                                 <Icons.ArrowRight size={22} />
                              </Link>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            )}

            {/* Pagination Architecture */}
            {totalPages > 1 && (
               <div className="mt-24 space-y-6">
                  <div className="flex items-center justify-center gap-3 flex-wrap">
                     <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="w-14 h-14 rounded-2xl border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-950 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-500"
                     >
                        <Icons.ArrowRight size={20} className="rotate-180" />
                     </button>

                     {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                        <button
                           key={p}
                           onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                           className={`w-14 h-14 rounded-2xl text-[10px] font-black transition-all duration-500 ${page === p ? "bg-blue-600 text-white shadow-2xl shadow-blue-200 scale-110" : "border border-gray-100 text-gray-300 hover:border-blue-400 hover:text-blue-600"}`}
                        >
                           {p}
                        </button>
                     ))}

                     <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="w-14 h-14 rounded-2xl border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-950 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-500"
                     >
                        <Icons.ArrowRight size={20} />
                     </button>
                  </div>
                  <p className="text-center text-[9px] font-black text-gray-300 uppercase tracking-widest">
                     Deployment Node {page} of {totalPages}
                  </p>
               </div>
            )}
         </section>

         {/* ── GLOBAL DEPLOYMENT CTA ──────────────────────────────────── */}
         <section className="py-40 max-w-7xl mx-auto px-6">
            <div className="bg-gray-950 rounded-[5rem] p-16 lg:p-32 text-center relative overflow-hidden shadow-2xl group">
               <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                  <div className="text-[40vw] font-black text-white absolute -bottom-40 -left-40 italic">GAP</div>
               </div>

               <div className="relative z-10">
                  <h2 className="text-5xl lg:text-8xl font-black text-white mb-10 tracking-tighter leading-[0.9] italic">
                     Don't navigate <br /><span className="text-blue-500">alone.</span>
                  </h2>
                  <p className="text-gray-400 font-bold text-lg lg:text-2xl mb-16 max-w-2xl mx-auto leading-relaxed">
                     Our certified global strategists are ready to engineer your academic journey. From selection to visa, we've got you covered.
                  </p>
                  <Link
                     to="/registration"
                     className="inline-flex items-center justify-center gap-4 px-16 py-7 bg-blue-600 text-white font-black rounded-3xl shadow-2xl shadow-blue-900/40 hover:scale-105 transition-all duration-500 uppercase tracking-widest text-[10px]"
                  >
                     Book Free Strategy Session
                     <Icons.ArrowRight size={20} />
                  </Link>
               </div>
            </div>
         </section>
      </div>
   );
}
