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
   status: 'Upcoming' | 'Ongoing' | 'Completed';
   featured?: boolean;
}

export function meta() {
   return [
      { title: "Global Education Events | Global Academic Pathway" },
      { name: "description", content: "Join our high-impact university seminars, open days, and virtual expos designed to secure your international future." },
   ];
}

export default function EventsPage() {
   const [events, setEvents] = useState<Event[]>([]);
   const [filter, setFilter] = useState("All");
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const fetchEvents = async () => {
         try {
            const response = await fetch("https://gap-server-22sf.onrender.com/api/events");
            const json = await response.json();
            if (json.success) {
               setEvents(json.data);
            }
         } catch (err) {
            console.error("Failed to fetch events:", err);
         } finally {
            setIsLoading(false);
         }
      };
      fetchEvents();
      window.scrollTo(0, 0);
   }, []);

   const filteredEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const isPast = eventDate < today || event.status === "Completed";

      if (filter === "All") return true;
      if (filter === "Upcoming") return !isPast;
      if (filter === "Past") return isPast;
      return true;
   });

   const featuredEvent = events.find(e => {
      const eventDate = new Date(e.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return e.featured && eventDate >= today && e.status !== "Completed";
   });

   if (isLoading) {
      return (
         <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6">
            <div className="w-16 h-16 border-4 border-blue-50 border-t-blue-600 rounded-full animate-spin" />
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest animate-pulse">Syncing Event Calendar</p>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-white">
         {/* ── ARCHITECTURAL HERO ────────────────────────────────────────── */}
         <section className="relative pt-40 pb-24 lg:pt-56 lg:pb-32 overflow-hidden bg-white">
            <div className="absolute inset-0 -z-10">
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 blur-[120px] rounded-full" />
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50 blur-[100px] rounded-full opacity-50" />
               <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#1e3a8a 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center lg:text-left">
               <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
                  <Icons.Calendar size={12} className="animate-pulse" /> Global Networking Hub
               </div>
               <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-gray-900 mb-10 tracking-tighter leading-[0.85] italic animate-in fade-in slide-in-from-bottom-8 duration-1000">
                  Shape Your <br />
                  <span className="text-blue-600">Global Future.</span>
               </h1>
               <p className="text-gray-500 font-bold text-lg lg:text-2xl max-w-3xl mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 mx-auto lg:mx-0">
                  Direct access to world-class university representatives. Explore our calendar of spot admissions, visa workshops, and academic expos.
               </p>
            </div>
         </section>

         {/* ── FEATURED SPOTLIGHT ────────────────────────────────────────── */}
         {featuredEvent && (
            <section className="max-w-7xl mx-auto px-6 relative z-20 pb-32">
               <div className="bg-gray-950 rounded-[4rem] overflow-hidden shadow-[0_60px_100px_-20px_rgba(0,0,0,0.3)] border border-white/5 animate-in zoom-in-95 duration-1000 group">
                  <div className="flex flex-col lg:flex-row">
                     <div className="lg:w-1/2 h-96 lg:h-auto relative overflow-hidden">
                        <img
                           src={featuredEvent.image || "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?w=1200&q=80"}
                           className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-70"
                           alt={featuredEvent.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-transparent to-transparent hidden lg:block" />
                        <div className="absolute top-10 left-10 bg-blue-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl">
                           Priority Event
                        </div>
                     </div>
                     <div className="lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center relative">
                        <div className="absolute top-10 right-10 opacity-5">
                           <Icons.Globe size={200} className="text-white" />
                        </div>
                        <div className="flex flex-wrap items-center gap-8 text-white/50 text-[11px] font-black uppercase tracking-widest mb-10">
                           <span className="flex items-center gap-3 text-blue-400">
                              <Icons.Clock size={20} />
                              {new Date(featuredEvent.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                           </span>
                           <span className="flex items-center gap-3">
                              <Icons.MapPin size={20} />
                              {featuredEvent.location}
                           </span>
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-black text-white mb-8 tracking-tighter italic leading-tight">
                           {featuredEvent.title}
                        </h2>
                        <p className="text-gray-400 font-bold text-lg mb-14 leading-relaxed max-w-xl">
                           {featuredEvent.description}
                        </p>
                        <div className="flex items-center gap-6">
                           <Link
                              to={`/events/${featuredEvent._id}`}
                              className="px-12 py-6 bg-white text-gray-950 font-black rounded-3xl shadow-2xl hover:bg-blue-600 hover:text-white transition-all duration-500 uppercase tracking-widest text-[10px] flex items-center gap-3"
                           >
                              Register Now <Icons.ArrowRight size={18} />
                           </Link>
                           <span className="hidden sm:block text-white/20 text-[10px] font-black uppercase tracking-widest">Limited Seating Available</span>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         )}

         {/* ── EVENT LIST ARCHITECTURE ──────────────────────────────────── */}
         <section className="py-24 max-w-7xl mx-auto px-6 bg-white">
            <div className="flex flex-col lg:flex-row items-end justify-between gap-10 mb-20 border-b border-gray-100 pb-12">
               <div className="max-w-xl">
                  <h2 className="text-4xl lg:text-6xl font-black text-gray-900 tracking-tighter italic">Event Catalog</h2>
                  <p className="text-gray-400 font-bold mt-4 text-lg">Curated opportunities to accelerate your academic migration.</p>
               </div>
               <div className="flex p-2 bg-gray-100 rounded-[2rem] border border-gray-200 shadow-inner">
                  {["All", "Upcoming", "Past"].map(f => (
                     <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-10 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${filter === f
                           ? "bg-white text-blue-600 shadow-2xl border border-blue-50 scale-105"
                           : "text-gray-400 hover:text-gray-600"
                           }`}
                     >
                        {f}
                     </button>
                  ))}
               </div>
            </div>

            {filteredEvents.length > 0 ? (
               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
                  {filteredEvents.map((event, idx) => {
                     const eventDate = new Date(event.date);
                     const today = new Date();
                     today.setHours(0, 0, 0, 0);
                     const isPast = eventDate < today || event.status === "Completed";

                     return (
                        <div
                           key={event._id}
                           className={`group bg-white rounded-[3.5rem] border border-gray-100 overflow-hidden hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 hover:-translate-y-4 flex flex-col ${isPast ? 'opacity-60 grayscale' : ''}`}
                        >
                           <div className="h-72 relative overflow-hidden">
                              <img
                                 src={event.image || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"}
                                 className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                 alt={event.title}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                              <div className="absolute bottom-8 left-8">
                                 <span className="px-5 py-2 bg-blue-600/90 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest rounded-full border border-white/20">
                                    {event.type}
                                 </span>
                              </div>
                           </div>
                           <div className="p-12 flex-1 flex flex-col">
                              <div className="flex items-center gap-3 text-blue-600 text-[11px] font-black tracking-[0.2em] uppercase mb-8">
                                 <Icons.Calendar size={16} />
                                 {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </div>
                              <h3 className="text-3xl font-black text-gray-900 mb-6 tracking-tighter leading-tight group-hover:text-blue-600 transition-colors italic">
                                 {event.title}
                              </h3>
                              <p className="text-gray-500 font-bold text-base mb-10 leading-relaxed opacity-80">
                                 {event.description}
                              </p>

                              <div className="mt-auto pt-10 border-t border-gray-50 flex items-center justify-between">
                                 <div className="flex items-center gap-3 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                                    <Icons.MapPin size={18} className="text-blue-500" />
                                    <span className="line-clamp-1">{event.location}</span>
                                 </div>
                                 <Link
                                    to={`/events/${event._id}`}
                                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${isPast ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-950 text-white hover:bg-blue-600 hover:rotate-12'}`}
                                 >
                                    <Icons.ArrowRight size={24} />
                                 </Link>
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>
            ) : (
               <div className="text-center py-32 bg-gray-50 rounded-[4rem] border-2 border-dashed border-gray-100">
                  <Icons.Search size={64} className="mx-auto text-gray-200 mb-8" />
                  <h3 className="text-3xl font-black text-gray-400 tracking-tighter">No Events Found</h3>
                  <p className="text-gray-400 font-bold mt-2">Adjust your filter or check back for new deployments.</p>
               </div>
            )}
         </section>

         {/* ── GLOBAL COMMUNITY CTA ──────────────────────────────────────── */}
         <section className="pb-40 max-w-7xl mx-auto px-6">
            <div className="bg-gray-950 rounded-[5rem] p-16 lg:p-32 text-center relative overflow-hidden shadow-2xl group">
               <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                  <div className="text-[40vw] font-black text-white absolute -bottom-40 -right-40 italic">GAP</div>
               </div>

               <div className="relative z-10">
                  <span className="inline-block px-4 py-2 bg-white/5 border border-white/10 text-blue-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-10">
                     Join the Network
                  </span>
                  <h2 className="text-5xl lg:text-8xl font-black text-white mb-10 tracking-tighter leading-[0.9] italic">
                     Real-time Intelligence <br /> in your pocket.
                  </h2>
                  <p className="text-gray-400 font-bold text-lg lg:text-2xl mb-16 max-w-2xl mx-auto leading-relaxed">
                     Join 5,000+ students in our official WhatsApp broadcast for instant spot-admission alerts and visa policy updates.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                     <a
                        href="https://wa.me/8801700000000"
                        className="px-16 py-7 bg-[#25d366] text-white font-black rounded-3xl shadow-2xl flex items-center justify-center gap-4 hover:scale-105 hover:bg-[#22c35e] transition-all duration-500 uppercase tracking-widest text-[10px]"
                     >
                        <Icons.Phone size={24} />
                        Connect to Community
                     </a>
                     <Link to="/registration" className="px-16 py-7 bg-white/5 border border-white/10 text-white font-black rounded-3xl hover:bg-white/10 transition-all duration-500 uppercase tracking-widest text-[10px]">
                        Request Invitation
                     </Link>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
}
