import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import * as Icons from "../components/Icons";

interface Event {
   _id: string;
   title: string;
   description: string;
   date: string;
   time?: string;
   location: string;
   type: string;
   image?: string;
   status: "Upcoming" | "Ongoing" | "Completed";
   featured?: boolean;
}

export function meta() {
   return [
      { title: "Global Education Events | Global Academic Pathway" },
      {
         name: "description",
         content:
            "Join our high-impact university seminars, open days, and virtual expos designed to secure your international future.",
      },
   ];
}

export default function EventsPage() {
   const [events, setEvents] = useState<Event[]>([]);
   const [filter, setFilter] = useState("All");
   const [isLoading, setIsLoading] = useState(true);
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      const fetchEvents = async () => {
         try {
            const API_BASE =
               window.location.hostname === "localhost"
                  ? "https://gap-server-22sf.onrender.com/api"
                  : "https://gap-server-22sf.onrender.com/api";
            const response = await fetch(`${API_BASE}/events`);
            const json = await response.json();
            if (json.success) {
               setEvents(json.data);
            }
         } catch (err) {
            console.error("Failed to fetch events:", err);
         } finally {
            setIsLoading(false);
            setTimeout(() => setMounted(true), 60);
         }
      };
      fetchEvents();
      window.scrollTo(0, 0);
   }, []);

   const filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const isPast = eventDate < today || event.status === "Completed";
      if (filter === "All") return true;
      if (filter === "Upcoming") return !isPast;
      if (filter === "Past") return isPast;
      return true;
   });

   const featuredEvent = events.find((e) => {
      const eventDate = new Date(e.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return e.featured && eventDate >= today && e.status !== "Completed";
   });

   if (isLoading) {
      return (
         <div className="min-h-screen bg-[#F7F5F0] flex flex-col items-center justify-center gap-5">
            <div
               className="w-9 h-9 border-2 border-[#1A1A2E] border-t-transparent rounded-full animate-spin"
               style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
            />
            <p
               className="text-[10px] font-semibold text-[#1A1A2E]/30 uppercase tracking-[0.4em]"
               style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
            >
               Syncing Event Calendar
            </p>
         </div>
      );
   }

   return (
      <div
         className="min-h-screen bg-[#F7F5F0]"
         style={{ fontFamily: "'Georgia', serif" }}
      >
         <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        .ep-display { font-family: 'Playfair Display', Georgia, serif; }
        .ep-body    { font-family: 'DM Sans', system-ui, sans-serif; }

        .ep-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.75s cubic-bezier(0.22,1,0.36,1),
                      transform 0.75s cubic-bezier(0.22,1,0.36,1);
        }
        .ep-up.in { opacity: 1; transform: translateY(0); }
        .ep-up.d1 { transition-delay: 0.1s; }
        .ep-up.d2 { transition-delay: 0.22s; }
        .ep-up.d3 { transition-delay: 0.36s; }
        .ep-up.d4 { transition-delay: 0.50s; }

        /* featured card */
        .feat-img { transition: transform 0.9s cubic-bezier(0.22,1,0.36,1); }
        .feat-card:hover .feat-img { transform: scale(1.05); }

        /* event card */
        .ev-card {
          background: white;
          border: 1px solid rgba(26,26,46,0.07);
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.4s ease,
                      border-color 0.3s ease;
        }
        .ev-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 56px rgba(26,26,46,0.09);
          border-color: rgba(37,99,235,0.18);
        }
        .ev-card:hover .ev-img { transform: scale(1.06); }
        .ev-img { transition: transform 0.8s cubic-bezier(0.22,1,0.36,1); }
        .ev-card:hover .ev-arrow {
          background: #2563eb;
          color: white;
        }
        .ev-arrow {
          transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease;
        }
        .ev-card:hover .ev-title { color: #2563eb; }
        .ev-title { transition: color 0.3s ease; }

        /* filter pill */
        .filter-pill {
          transition: background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
        }
        .filter-pill.active {
          background: #1A1A2E;
          color: white;
          box-shadow: 0 4px 16px rgba(26,26,46,0.18);
        }

        /* CTA primary */
        .ep-cta {
          position: relative;
          overflow: hidden;
          background: #1A1A2E;
          transition: box-shadow 0.3s ease;
        }
        .ep-cta::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #2563eb;
          transform: translateX(-101%);
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .ep-cta:hover::after { transform: translateX(0); }
        .ep-cta span { position: relative; z-index: 1; }

        .ep-cta-ghost {
          border: 1.5px solid rgba(26,26,46,0.2);
          transition: background 0.3s ease, border-color 0.3s ease;
        }
        .ep-cta-ghost:hover {
          background: rgba(26,26,46,0.05);
          border-color: rgba(26,26,46,0.4);
        }

        .divider { width: 40px; height: 3px; background: #2563eb; }
        .divider-w { width: 40px; height: 3px; background: #3b82f6; }
      `}</style>

         {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
         <section className="relative pt-36 pb-24 lg:pt-52 lg:pb-36 overflow-hidden bg-[#1A1A2E]">
            {/* Grid texture */}
            <div
               className="absolute inset-0 opacity-[0.04] pointer-events-none"
               style={{
                  backgroundImage:
                     "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                  backgroundSize: "64px 64px",
               }}
            />
            {/* Glows */}
            <div className="absolute top-[-100px] right-[-60px] w-[520px] h-[520px] rounded-full bg-blue-700 opacity-[0.07] blur-[130px] pointer-events-none" />
            <div className="absolute bottom-[-40px] left-[15%] w-[360px] h-[360px] rounded-full bg-blue-500 opacity-[0.05] blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
               {/* Pill */}
               <div className={`ep-up ${mounted ? "in" : ""}`}>
                  <div className="inline-flex items-center gap-2.5 rounded-full px-5 py-2 bg-blue-600/10 border border-blue-500/20 text-blue-400 ep-body text-[10px] font-semibold uppercase tracking-[0.38em] mb-12">
                     <Icons.Calendar size={11} />
                     Global Networking Hub
                  </div>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
                  <div className="lg:col-span-8">
                     <div className={`ep-up d1 ${mounted ? "in" : ""}`}>
                        <h1 className="ep-display text-[56px] md:text-[80px] lg:text-[104px] font-black text-white leading-[0.9] tracking-tight mb-8">
                           Shape Your
                           <br />
                           <em className="text-blue-400 not-italic">Global Future.</em>
                        </h1>
                     </div>
                     <div className={`ep-up d2 ${mounted ? "in" : ""}`}>
                        <p className="ep-body text-lg text-white/45 font-light leading-[1.85] max-w-xl">
                           Direct access to world-class university representatives.
                           Explore our calendar of spot admissions, visa workshops, and
                           academic expos.
                        </p>
                     </div>
                  </div>

                  <div
                     className={`lg:col-span-4 ep-up d3 ${mounted ? "in" : ""} flex lg:justify-end`}
                  >
                     <Link
                        to="/apply"
                        className="ep-cta ep-body inline-flex items-center gap-3 px-8 py-4 rounded-xl text-white text-[11px] font-semibold uppercase tracking-[0.28em]"
                     >
                        <span>Register Interest</span>
                        <Icons.ArrowRight size={14} />
                     </Link>
                  </div>
               </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
         </section>

         {/* ══════════════════════════════════════════
          FEATURED EVENT
      ══════════════════════════════════════════ */}
         {featuredEvent && (
            <section className="max-w-7xl mx-auto px-6 lg:px-16 py-20 lg:py-28">
               <div className="flex items-center gap-4 mb-10">
                  <div className="divider" />
                  <span className="ep-body text-[10px] font-semibold uppercase tracking-[0.4em] text-blue-600">
                     Featured Event
                  </span>
               </div>

               <div className="feat-card bg-[#1A1A2E] rounded-3xl overflow-hidden relative group">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                     {/* Image */}
                     <div className="relative h-72 lg:h-auto overflow-hidden">
                        <img
                           src={
                              featuredEvent.image ||
                              "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?w=1200&q=80"
                           }
                           className="feat-img absolute inset-0 w-full h-full object-cover opacity-60"
                           alt={featuredEvent.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A2E] via-[#1A1A2E]/20 to-transparent hidden lg:block" />
                        <div className="absolute top-8 left-8">
                           <span className="ep-body px-4 py-2 bg-blue-600 text-white text-[9px] font-semibold uppercase tracking-[0.35em] rounded-lg">
                              Priority Event
                           </span>
                        </div>
                     </div>

                     {/* Content */}
                     <div className="p-10 lg:p-16 flex flex-col justify-center relative">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />

                        <div className="flex flex-wrap gap-6 mb-8 relative">
                           <div className="flex items-center gap-2 ep-body text-[11px] font-medium text-blue-400 uppercase tracking-[0.25em]">
                              <Icons.Clock size={13} strokeWidth={1.75} />
                              {new Date(featuredEvent.date).toLocaleDateString("en-US", {
                                 month: "long",
                                 day: "numeric",
                                 year: "numeric",
                              })}
                           </div>
                           <div className="flex items-center gap-2 ep-body text-[11px] font-medium text-white/35 uppercase tracking-[0.25em]">
                              <Icons.MapPin size={13} strokeWidth={1.75} />
                              {featuredEvent.location}
                           </div>
                        </div>

                        <h2 className="ep-display text-3xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-6 relative">
                           {featuredEvent.title}
                        </h2>
                        <p className="ep-body text-[14px] text-white/45 font-light leading-[1.8] mb-10 max-w-md relative">
                           {featuredEvent.description}
                        </p>

                        <div className="flex items-center gap-5 relative">
                           <Link
                              to={`/events/${featuredEvent._id}`}
                              className="ep-cta ep-body inline-flex items-center gap-3 px-8 py-4 rounded-xl text-white text-[11px] font-semibold uppercase tracking-[0.28em]"
                           >
                              <span>Register Now</span>
                              <Icons.ArrowRight size={14} />
                           </Link>
                           <span className="ep-body text-[10px] font-medium text-white/25 uppercase tracking-[0.2em] hidden sm:block">
                              Limited Seats
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         )}

         {/* ══════════════════════════════════════════
          EVENT CATALOG
      ══════════════════════════════════════════ */}
         <section className="max-w-7xl mx-auto px-6 lg:px-16 pb-32">
            {/* Header + Filter */}
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-14 pb-10 border-b border-[#1A1A2E]/08">
               <div>
                  <div className="flex items-center gap-4 mb-5">
                     <div className="divider" />
                     <span className="ep-body text-[10px] font-semibold uppercase tracking-[0.4em] text-blue-600">
                        Browse
                     </span>
                  </div>
                  <h2 className="ep-display text-4xl lg:text-5xl font-black text-[#1A1A2E] tracking-tight leading-tight">
                     Event Catalog
                  </h2>
                  <p className="ep-body text-[14px] text-[#1A1A2E]/40 font-light mt-2">
                     Curated opportunities to accelerate your academic journey.
                  </p>
               </div>

               {/* Filter pills */}
               <div className="flex items-center gap-2 p-1.5 bg-white rounded-xl border border-[#1A1A2E]/08 shadow-sm">
                  {["All", "Upcoming", "Past"].map((f) => (
                     <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`filter-pill ep-body px-6 py-2.5 rounded-lg text-[10px] font-semibold uppercase tracking-[0.28em] ${filter === f
                           ? "active"
                           : "text-[#1A1A2E]/40 hover:text-[#1A1A2E]/70"
                           }`}
                     >
                        {f}
                     </button>
                  ))}
               </div>
            </div>

            {/* Grid */}
            {filteredEvents.length > 0 ? (
               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map((event) => {
                     const eventDate = new Date(event.date);
                     const today = new Date();
                     today.setHours(0, 0, 0, 0);
                     const isPast =
                        eventDate < today || event.status === "Completed";

                     return (
                        <div
                           key={event._id}
                           className={`ev-card rounded-3xl overflow-hidden flex flex-col ${isPast ? "opacity-55" : ""
                              }`}
                        >
                           {/* Image */}
                           <div className="relative h-56 overflow-hidden bg-[#1A1A2E]">
                              <img
                                 src={
                                    event.image ||
                                    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"
                                 }
                                 className="ev-img absolute inset-0 w-full h-full object-cover opacity-80"
                                 alt={event.title}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                              {/* Type badge */}
                              <div className="absolute bottom-5 left-5">
                                 <span className="ep-body px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-semibold uppercase tracking-[0.28em] rounded-md">
                                    {event.type}
                                 </span>
                              </div>
                              {/* Status dot */}
                              {!isPast && (
                                 <div className="absolute top-5 right-5 flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-md px-3 py-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                                    <span className="ep-body text-[9px] font-semibold uppercase tracking-[0.25em] text-white">
                                       Upcoming
                                    </span>
                                 </div>
                              )}
                           </div>

                           {/* Body */}
                           <div className="p-8 flex flex-col flex-1">
                              {/* Date */}
                              <div className="flex items-center gap-2 ep-body text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-600 mb-4">
                                 <Icons.Calendar size={12} strokeWidth={1.75} />
                                 {new Date(event.date).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                 })}
                              </div>

                              {/* Title */}
                              <h3 className="ep-display ev-title text-xl font-bold text-[#1A1A2E] mb-3 leading-snug tracking-tight">
                                 {event.title}
                              </h3>

                              {/* Description */}
                              <p className="ep-body text-[13px] text-[#1A1A2E]/45 font-light leading-[1.8] mb-6 line-clamp-2 flex-1">
                                 {event.description}
                              </p>

                              {/* Footer */}
                              <div className="pt-6 border-t border-[#1A1A2E]/06 flex items-center justify-between">
                                 <div className="flex items-center gap-2 ep-body text-[11px] font-medium text-[#1A1A2E]/40 uppercase tracking-[0.2em]">
                                    <Icons.MapPin
                                       size={12}
                                       strokeWidth={1.75}
                                       className="text-blue-500 shrink-0"
                                    />
                                    <span className="line-clamp-1">{event.location}</span>
                                 </div>

                                 <Link
                                    to={`/events/${event._id}`}
                                    className={`ev-arrow w-10 h-10 rounded-xl flex items-center justify-center ${isPast
                                       ? "bg-[#F7F5F0] text-[#1A1A2E]/30 pointer-events-none"
                                       : "bg-[#F7F5F0] text-[#1A1A2E]"
                                       }`}
                                 >
                                    <Icons.ArrowRight size={16} strokeWidth={2} />
                                 </Link>
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>
            ) : (
               <div className="text-center py-28 bg-white rounded-3xl border border-[#1A1A2E]/06">
                  <Icons.Search
                     size={40}
                     strokeWidth={1.25}
                     className="mx-auto text-[#1A1A2E]/15 mb-6"
                  />
                  <h3 className="ep-display text-2xl font-bold text-[#1A1A2E]/30 tracking-tight mb-2">
                     No Events Found
                  </h3>
                  <p className="ep-body text-[13px] text-[#1A1A2E]/30 font-light">
                     Adjust your filter or check back for new events.
                  </p>
               </div>
            )}
         </section>

         {/* ══════════════════════════════════════════
          COMMUNITY CTA
      ══════════════════════════════════════════ */}
         <section className="max-w-7xl mx-auto px-6 lg:px-16 pb-32">
            <div className="bg-[#1A1A2E] rounded-3xl overflow-hidden relative">
               {/* Grid texture */}
               <div
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{
                     backgroundImage:
                        "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                     backgroundSize: "52px 52px",
                  }}
               />
               {/* Glows */}
               <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600 opacity-[0.07] blur-[100px] rounded-full pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-800 opacity-[0.06] blur-[80px] rounded-full pointer-events-none" />
               {/* Watermark */}
               <div className="absolute -bottom-10 -right-8 ep-display text-[18vw] font-black text-white/[0.025] italic leading-none select-none pointer-events-none tracking-tighter">
                  GAP
               </div>

               <div className="relative z-10 p-12 lg:p-20">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                     <div>
                        <div className="flex items-center gap-4 mb-8">
                           <div className="divider-w" />
                           <span className="ep-body text-[10px] font-semibold uppercase tracking-[0.4em] text-blue-400">
                              Join the Network
                           </span>
                        </div>
                        <h2 className="ep-display text-4xl lg:text-6xl font-black text-white leading-[0.95] tracking-tight mb-6">
                           Real-time intelligence
                           <br />
                           <em className="text-blue-400 not-italic">in your pocket.</em>
                        </h2>
                        <p className="ep-body text-[15px] text-white/40 font-light leading-[1.85] max-w-md">
                           Join 5,000+ students in our official WhatsApp broadcast for
                           instant spot-admission alerts and visa policy updates.
                        </p>
                     </div>

                     <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 lg:justify-end">
                        <a
                           href="https://wa.me/8801756560536"
                           className="ep-body inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-xl text-[11px] font-semibold uppercase tracking-[0.28em] hover:bg-[#1ebe5d] transition-colors shadow-lg shadow-[#25D366]/20"
                        >
                           <Icons.Phone size={15} strokeWidth={1.75} />
                           Connect to Community
                        </a>
                        <Link
                           to="/apply"
                           className="ep-cta-ghost ep-body inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-white/60 text-[11px] font-semibold uppercase tracking-[0.28em]"
                        >
                           Request Invitation
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
}