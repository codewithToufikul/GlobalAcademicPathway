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
      {
         name: "description",
         content:
            "Explore our global network of 120+ top-ranked partner universities across the UK, USA, Canada, and beyond.",
      },
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
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      const fetchUnis = async () => {
         try {
            const API_BASE =
               window.location.hostname === "localhost"
                  ? "https://gap-server-22sf.onrender.com/api"
                  : "https://gap-server-22sf.onrender.com/api";
            const res = await fetch(`${API_BASE}/universities`);
            const json = await res.json();
            if (json.success) setUnis(json.data);
         } catch (err) {
            console.error(err);
         } finally {
            setLoading(false);
            setTimeout(() => setMounted(true), 60);
         }
      };
      fetchUnis();
      window.scrollTo(0, 0);
   }, []);

   useEffect(() => {
      setPage(1);
   }, [filter, search]);

   const filteredUnis = unis.filter((u) => {
      const matchesFilter =
         filter === "All" ||
         u.country.toLowerCase().includes(filter.toLowerCase());
      const matchesSearch =
         !search ||
         u.name.toLowerCase().includes(search.toLowerCase()) ||
         u.country.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
   });

   const totalPages = Math.ceil(filteredUnis.length / ITEMS_PER_PAGE);
   const paginatedUnis = filteredUnis.slice(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE
   );

   if (loading)
      return (
         <div
            className="min-h-screen flex flex-col items-center justify-center bg-[#F7F5F0] gap-5"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
         >
            <div className="w-9 h-9 border-2 border-[#1A1A2E] border-t-transparent rounded-full animate-spin" />
            <p className="text-[10px] font-semibold text-[#1A1A2E]/30 uppercase tracking-[0.4em]">
               Synchronizing Global Database
            </p>
         </div>
      );

   return (
      <div
         className="min-h-screen bg-[#F7F5F0]"
         style={{ fontFamily: "'Georgia', serif" }}
      >
         <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        .up-display { font-family: 'Playfair Display', Georgia, serif; }
        .up-body    { font-family: 'DM Sans', system-ui, sans-serif; }

        .up-fade {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.75s cubic-bezier(0.22,1,0.36,1),
                      transform 0.75s cubic-bezier(0.22,1,0.36,1);
        }
        .up-fade.in { opacity: 1; transform: translateY(0); }
        .up-fade.d1 { transition-delay: 0.10s; }
        .up-fade.d2 { transition-delay: 0.22s; }
        .up-fade.d3 { transition-delay: 0.36s; }

        /* search input */
        .up-search {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.14);
          color: white;
          transition: background 0.35s ease, border-color 0.35s ease,
                      box-shadow 0.35s ease, color 0.2s ease;
        }
        .up-search::placeholder { color: rgba(255,255,255,0.28); }
        .up-search:focus {
          background: white;
          border-color: rgba(37,99,235,0.5);
          color: #1A1A2E;
          box-shadow: 0 16px 48px rgba(37,99,235,0.14);
          outline: none;
        }
        .up-search:focus::placeholder { color: rgba(26,26,46,0.3); }

        /* filter pill */
        .up-pill {
          transition: background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
          cursor: pointer;
        }
        .up-pill.active {
          background: #1A1A2E;
          color: white;
          box-shadow: 0 4px 16px rgba(26,26,46,0.18);
        }

        /* uni card */
        .uni-card {
          background: white;
          border: 1px solid rgba(26,26,46,0.07);
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.4s ease, border-color 0.3s ease;
        }
        .uni-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 56px rgba(26,26,46,0.09);
          border-color: rgba(37,99,235,0.18);
        }
        .uni-card:hover .uni-logo { transform: scale(1.07); }
        .uni-logo { transition: transform 0.5s cubic-bezier(0.22,1,0.36,1); }
        .uni-card:hover .uni-name { color: #2563eb; }
        .uni-name { transition: color 0.3s ease; }
        .uni-card:hover .uni-arrow {
          background: #2563eb;
          color: white;
        }
        .uni-arrow {
          transition: background 0.3s ease, color 0.3s ease;
        }

        /* CTA button */
        .up-cta {
          position: relative; overflow: hidden;
          background: #1A1A2E;
          transition: box-shadow 0.3s ease;
        }
        .up-cta::after {
          content: '';
          position: absolute; inset: 0;
          background: #2563eb;
          transform: translateX(-101%);
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .up-cta:hover::after { transform: translateX(0); }
        .up-cta span { position: relative; z-index: 1; }

        /* pagination */
        .pg-btn {
          border: 1px solid rgba(26,26,46,0.1);
          transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease;
        }
        .pg-btn:hover:not(:disabled) {
          background: #1A1A2E;
          border-color: #1A1A2E;
          color: white;
        }
        .pg-btn.active {
          background: #2563eb;
          border-color: #2563eb;
          color: white;
          box-shadow: 0 6px 20px rgba(37,99,235,0.25);
        }

        .divider { width: 40px; height: 3px; background: #2563eb; flex-shrink: 0; }
        .divider-w { width: 40px; height: 3px; background: #3b82f6; flex-shrink: 0; }
      `}</style>

         {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
         <section className="relative pt-36 pb-28 lg:pt-52 lg:pb-40 overflow-hidden bg-[#1A1A2E]">
            {/* Cover image */}
            <div className="absolute inset-0 z-0">
               <img
                  src="https://i.ibb.co.com/XrJQ5r3X/1765623808-banner.jpg"
                  className="w-full h-full object-cover opacity-25"
                  alt="Universities Banner"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-[#1A1A2E]/70 to-[#1A1A2E]/50" />
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

            {/* Glows */}
            <div className="absolute top-[-80px] right-[-60px] w-[480px] h-[480px] rounded-full bg-blue-700 opacity-[0.08] blur-[120px] pointer-events-none z-[1]" />

            <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
               {/* Pill */}
               <div className={`up-fade ${mounted ? "in" : ""}`}>
                  <div className="inline-flex items-center gap-2.5 rounded-full px-5 py-2 bg-blue-600/15 border border-blue-500/25 text-blue-400 up-body text-[10px] font-semibold uppercase tracking-[0.38em] mb-12">
                     <Icons.ShieldCheck size={11} strokeWidth={1.75} />
                     Verified Institutional Partners
                  </div>
               </div>

               {/* Headline */}
               <div className={`up-fade d1 ${mounted ? "in" : ""}`}>
                  <h1 className="up-display text-[56px] md:text-[80px] lg:text-[104px] font-black text-white leading-[0.9] tracking-tight mb-8">
                     World-Class
                     <br />
                     <em className="text-blue-400 not-italic">Institutions.</em>
                  </h1>
               </div>

               {/* Subtext */}
               <div className={`up-fade d2 ${mounted ? "in" : ""}`}>
                  <p className="up-body text-lg text-white/45 font-light leading-[1.85] max-w-xl mb-12">
                     We partner with {unis.length}+ top-ranked universities across
                     the globe to bring you career-shaping education.
                  </p>
               </div>

               {/* Search */}
               <div className={`up-fade d3 ${mounted ? "in" : ""} max-w-2xl`}>
                  <div className="relative">
                     <Icons.Search
                        size={16}
                        strokeWidth={1.75}
                        className="absolute left-6 top-1/2 -translate-y-1/2 text-white/35 pointer-events-none"
                     />
                     <input
                        type="text"
                        placeholder="Search by university name or country…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="up-search up-body w-full pl-14 pr-6 py-4 rounded-xl text-[14px] font-light"
                     />
                     {search && (
                        <button
                           onClick={() => setSearch("")}
                           className="absolute right-5 top-1/2 -translate-y-1/2 up-body text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30 hover:text-white/60 transition-colors"
                        >
                           Clear
                        </button>
                     )}
                  </div>
               </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
         </section>

         {/* ══════════════════════════════════════════
          STICKY FILTER BAR
      ══════════════════════════════════════════ */}
         <div className="sticky top-0 z-40 bg-[#F7F5F0]/90 backdrop-blur-xl border-b border-[#1A1A2E]/08">
            <div className="max-w-7xl mx-auto px-6 lg:px-16 py-4 flex flex-wrap items-center justify-between gap-4">
               {/* Country filters */}
               <div className="flex items-center gap-2 flex-wrap">
                  {COUNTRIES.map((c) => (
                     <button
                        key={c}
                        onClick={() => setFilter(c)}
                        className={`up-pill up-body px-5 py-2 rounded-lg text-[10px] font-semibold uppercase tracking-[0.28em] ${filter === c
                           ? "active"
                           : "text-[#1A1A2E]/40 hover:text-[#1A1A2E]/70"
                           }`}
                     >
                        {c}
                     </button>
                  ))}
               </div>

               {/* Result count */}
               <div className="flex items-center gap-4">
                  <span className="up-body text-[11px] font-medium text-[#1A1A2E]/35 uppercase tracking-[0.28em]">
                     <span className="text-blue-600 font-semibold">{filteredUnis.length}</span>{" "}
                     {filteredUnis.length === 1 ? "Result" : "Results"}
                  </span>
               </div>
            </div>
         </div>

         {/* ══════════════════════════════════════════
          UNIVERSITIES GRID
      ══════════════════════════════════════════ */}
         <section className="max-w-7xl mx-auto px-6 lg:px-16 py-16 lg:py-24">
            {paginatedUnis.length === 0 ? (
               <div className="text-center py-28 bg-white rounded-3xl border border-[#1A1A2E]/06">
                  <Icons.Search
                     size={40}
                     strokeWidth={1.25}
                     className="mx-auto text-[#1A1A2E]/15 mb-6"
                  />
                  <h3 className="up-display text-2xl font-bold text-[#1A1A2E]/30 tracking-tight mb-2">
                     No Match Found
                  </h3>
                  <p className="up-body text-[13px] text-[#1A1A2E]/30 font-light">
                     Adjust your query or explore other regions.
                  </p>
               </div>
            ) : (
               <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {paginatedUnis.map((uni) => (
                     <div
                        key={uni._id}
                        className="uni-card rounded-3xl overflow-hidden flex flex-col"
                     >
                        {/* Logo area */}
                        <div className="h-44 relative bg-white flex items-center justify-center p-8 overflow-hidden border-b border-[#1A1A2E]/05">
                           {/* Country badge */}
                           <div className="absolute top-4 left-4 z-10">
                              <span className="up-body px-3 py-1.5 bg-[#1A1A2E] text-white text-[8px] font-semibold uppercase tracking-[0.28em] rounded-md">
                                 {uni.country}
                              </span>
                           </div>

                           {/* Ranking badge */}
                           {uni.ranking && (
                              <div className="absolute top-4 right-4 z-10">
                                 <span className="up-body px-3 py-1.5 bg-blue-600/10 border border-blue-600/20 text-blue-600 text-[8px] font-semibold uppercase tracking-[0.2em] rounded-md">
                                    #{uni.ranking}
                                 </span>
                              </div>
                           )}

                           <img
                              src={uni.logo}
                              className="uni-logo w-full max-h-20 object-contain"
                              alt={uni.name}
                              onError={(e) => {
                                 const img = e.target as HTMLImageElement;
                                 img.style.display = "none";
                                 const fb = img.nextElementSibling as HTMLElement;
                                 if (fb) fb.style.display = "flex";
                              }}
                           />
                           <div
                              className="absolute inset-0 items-center justify-center up-display text-5xl font-black text-[#1A1A2E]/08 italic select-none"
                              style={{ display: "none" }}
                           >
                              {uni.name.charAt(0)}
                           </div>

                           {/* Hover glow */}
                           <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-blue-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        {/* Content */}
                        <div className="p-7 flex-1 flex flex-col">
                           <h3 className="up-display uni-name text-[15px] font-bold text-[#1A1A2E] mb-2 leading-snug tracking-tight line-clamp-2">
                              {uni.name}
                           </h3>

                           <div className="flex items-center gap-1.5 up-body text-[10px] font-medium text-[#1A1A2E]/35 uppercase tracking-[0.2em] mb-5">
                              <Icons.MapPin
                                 size={10}
                                 strokeWidth={1.75}
                                 className="text-blue-500 shrink-0"
                              />
                              {uni.location || uni.country}
                           </div>

                           {/* Footer */}
                           <div className="mt-auto pt-5 border-t border-[#1A1A2E]/06 flex items-center justify-between gap-3">
                              <div className="min-w-0">
                                 <span className="up-body block text-[8px] font-semibold text-blue-600 uppercase tracking-[0.3em] mb-0.5">
                                    Scholarship
                                 </span>
                                 <span className="up-body text-[11px] font-light text-[#1A1A2E]/45 line-clamp-1">
                                    {uni.scholarships || "Merit Based"}
                                 </span>
                              </div>
                              <Link
                                 to={`/universities/${uni._id}`}
                                 className="uni-arrow w-9 h-9 bg-[#F7F5F0] text-[#1A1A2E] rounded-lg flex items-center justify-center shrink-0"
                              >
                                 <Icons.ArrowRight size={15} strokeWidth={2} />
                              </Link>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            )}

            {/* ── PAGINATION ── */}
            {totalPages > 1 && (
               <div className="mt-16 flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2 flex-wrap justify-center">
                     {/* Prev */}
                     <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="pg-btn up-body w-10 h-10 rounded-lg flex items-center justify-center text-[#1A1A2E]/40 disabled:opacity-25 disabled:cursor-not-allowed"
                     >
                        <Icons.ArrowRight size={15} className="rotate-180" />
                     </button>

                     {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (p) => (
                           <button
                              key={p}
                              onClick={() => {
                                 setPage(p);
                                 window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              className={`pg-btn up-body w-10 h-10 rounded-lg text-[11px] font-semibold ${page === p ? "active" : "text-[#1A1A2E]/40"
                                 }`}
                           >
                              {p}
                           </button>
                        )
                     )}

                     {/* Next */}
                     <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="pg-btn up-body w-10 h-10 rounded-lg flex items-center justify-center text-[#1A1A2E]/40 disabled:opacity-25 disabled:cursor-not-allowed"
                     >
                        <Icons.ArrowRight size={15} />
                     </button>
                  </div>

                  <p className="up-body text-[10px] font-medium text-[#1A1A2E]/30 uppercase tracking-[0.3em]">
                     Page {page} of {totalPages}
                  </p>
               </div>
            )}
         </section>

         {/* ══════════════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════════════ */}
         <section className="max-w-7xl mx-auto px-6 lg:px-16 pb-32">
            <div className="bg-[#1A1A2E] rounded-3xl overflow-hidden relative">
               {/* Texture */}
               <div
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{
                     backgroundImage:
                        "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                     backgroundSize: "52px 52px",
                  }}
               />
               {/* Glows */}
               <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600 opacity-[0.07] blur-[90px] rounded-full pointer-events-none" />
               {/* Watermark */}
               <div className="absolute -bottom-8 -left-6 up-display text-[16vw] font-black text-white/[0.025] italic leading-none select-none pointer-events-none tracking-tighter">
                  GAP
               </div>

               <div className="relative z-10 p-12 lg:p-20">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                     <div>
                        <div className="flex items-center gap-4 mb-7">
                           <div className="divider-w" />
                           <span className="up-body text-[10px] font-semibold uppercase tracking-[0.4em] text-blue-400">
                              Get Guidance
                           </span>
                        </div>
                        <h2 className="up-display text-4xl lg:text-6xl font-black text-white leading-[0.95] tracking-tight">
                           Don't navigate
                           <br />
                           <em className="text-blue-400 not-italic">alone.</em>
                        </h2>
                     </div>

                     <div>
                        <p className="up-body text-[15px] text-white/40 font-light leading-[1.85] mb-8 max-w-md">
                           Our certified global strategists are ready to engineer your
                           academic journey — from institution selection to visa
                           approval.
                        </p>
                        <Link
                           to="/registration"
                           className="up-cta up-body inline-flex items-center gap-3 px-8 py-4 rounded-xl text-white text-[11px] font-semibold uppercase tracking-[0.28em]"
                        >
                           <span>Book Free Strategy Session</span>
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