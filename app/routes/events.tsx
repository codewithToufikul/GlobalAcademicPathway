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
    { title: "Upcoming Events | Global Academic Pathway" },
    { name: "description", content: "Join our upcoming seminars, open days, and virtual expos to kickstart your study abroad journey." },
  ];
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/events");
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
  }, []);

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for accurate date-only comparison
    
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
      <div className="min-h-screen bg-white flex items-center justify-center">
         <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-[#0f172a] text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
           <div className="max-w-3xl">
              <span className="inline-block px-4 py-2 bg-blue-500/20 backdrop-blur-md border border-white/10 rounded-full text-xs font-black uppercase tracking-[0.2em] text-blue-400 mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                 Events & Seminars
              </span>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black mb-8 tracking-tight leading-[0.95] animate-in fade-in slide-in-from-bottom-6 duration-1000">
                 Shape Your <span className="text-blue-500">Future</span>
              </h1>
              <p className="text-gray-400 font-bold text-lg sm:text-xl max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                 Explore our roadmap of upcoming university spot admissions, visa seminars, and global education expos.
              </p>
           </div>
        </div>
      </section>

      {/* Featured Event Highlight */}
      {featuredEvent && (
        <section className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
           <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-[0_60px_100px_-20px_rgba(0,0,0,0.12)] border border-gray-100 animate-in zoom-in-95 duration-1000 delay-300 group">
              <div className="flex flex-col lg:flex-row">
                 <div className="lg:w-1/2 h-80 lg:h-auto relative overflow-hidden">
                    <img 
                      src={featuredEvent.image || "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?w=1200&q=80"} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                      alt={featuredEvent.title} 
                    />
                    <div className="absolute top-8 left-8 bg-blue-600 text-white px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                       Happenning Soon
                    </div>
                 </div>
                 <div className="lg:w-1/2 p-10 lg:p-20 flex flex-col justify-center bg-gradient-to-br from-white to-blue-50/30">
                    <div className="flex flex-wrap items-center gap-6 text-gray-400 text-[11px] font-black uppercase tracking-widest mb-6">
                       <span className="flex items-center gap-2 text-blue-600">
                          <Icons.Clock size={18} /> 
                          {new Date(featuredEvent.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          {featuredEvent.time && ` | ${featuredEvent.time}`}
                       </span>
                       <span className="flex items-center gap-2">
                          <Icons.MapPin size={18} /> 
                          {featuredEvent.location}
                       </span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-8 leading-[1.1] tracking-tight group-hover:text-blue-600 transition-colors">
                       {featuredEvent.title}
                    </h2>
                    <p className="text-gray-500 font-bold text-lg mb-12 leading-relaxed opacity-80">
                       {featuredEvent.description}
                    </p>
                    <div>
                       <Link 
                         to={`/events/${featuredEvent._id}`} 
                         className="inline-flex items-center justify-center gap-4 px-12 py-5 bg-[#0f172a] text-white font-black rounded-2xl shadow-2xl hover:bg-blue-600 transition-all duration-300 hover:-translate-y-1 active:scale-95 uppercase tracking-widest text-sm"
                       >
                          View Details
                          <Icons.ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                       </Link>
                    </div>
                 </div>
              </div>
           </div>
        </section>
      )}

      {/* Main Events Feed */}
      <section className="py-32 max-w-7xl mx-auto px-6">
         {/* Modern Filtering UI */}
         <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-24 border-b border-gray-100 pb-12">
            <div>
               <h2 className="text-4xl font-black text-gray-900 tracking-tight">Browse Events</h2>
               <p className="text-gray-400 font-bold mt-2">Filter through our past and future schedules.</p>
            </div>
            <div className="flex p-2 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
               {["All", "Upcoming", "Past"].map(f => (
                  <button
                     key={f}
                     onClick={() => setFilter(f)}
                     className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                        filter === f 
                        ? "bg-white text-blue-600 shadow-xl border border-blue-50" 
                        : "text-gray-400 hover:text-gray-600"
                     }`}
                  >
                     {f}
                  </button>
               ))}
            </div>
         </div>

         {filteredEvents.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
               {filteredEvents.map((event, idx) => {
                  const eventDate = new Date(event.date);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const isPast = eventDate < today || event.status === "Completed";
                  
                  return (
                     <div 
                       key={event._id}
                       className={`group bg-white rounded-[3rem] border border-gray-100 overflow-hidden hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 relative flex flex-col ${isPast ? 'opacity-60 saturate-50' : ''}`}
                       style={{ animationDelay: `${idx * 150}ms` }}
                     >
                     <div className="h-64 relative overflow-hidden">
                        <img 
                          src={event.image || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"} 
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                          alt={event.title} 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-6 left-8 bg-white/20 backdrop-blur-md text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/30">
                           {event.type}
                        </div>
                     </div>
                     <div className="p-10 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 text-blue-600 text-[11px] font-black tracking-[0.2em] uppercase mb-6">
                           <div className="w-2 h-2 bg-blue-600 rounded-full" />
                           {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-5 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                           {event.title}
                        </h3>
                        <p className="text-gray-500 font-bold text-sm mb-10 line-clamp-3 leading-relaxed opacity-80">
                           {event.description}
                        </p>
                        
                        <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between">
                           <div className="flex items-center gap-2 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                              <Icons.MapPin size={16} className="text-blue-500" />
                              <span className="line-clamp-1">{event.location}</span>
                           </div>
                           {event.status !== 'Completed' ? (
                              <Link 
                                to={`/events/${event._id}`} 
                                className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:rotate-45"
                              >
                                 <Icons.ArrowRight size={20} />
                              </Link>
                           ) : (
                              <span className="text-[10px] font-black text-gray-300 uppercase italic">Past Event</span>
                           )}
                        </div>
                     </div>
                  </div>
               );
            })}
         </div>
         ) : (
            <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
               <Icons.Search size={48} className="mx-auto text-gray-300 mb-6" />
               <h3 className="text-2xl font-black text-gray-400">No events found in this category.</h3>
               <p className="text-gray-400 font-bold">Check back soon for more updates!</p>
            </div>
         )}
      </section>

      {/* Global Education Community Section */}
      <section className="pb-32 max-w-7xl mx-auto px-6">
         <div className="bg-[#0f172a] rounded-[4rem] p-12 lg:p-24 text-center relative overflow-hidden shadow-2xl shadow-blue-200 group">
            <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
               <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            </div>
            
            <div className="relative z-10">
               <h2 className="text-5xl lg:text-7xl font-black text-white mb-8 tracking-tight leading-[1] italic">
                  Level Up Your <br /> International Journey.
               </h2>
               <p className="text-blue-300/80 font-bold text-lg sm:text-2xl mb-16 max-w-2xl mx-auto leading-relaxed">
                  Join our verified community of 5000+ students and mentors. Stay updated via our official events channel.
               </p>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <a 
                    href="https://wa.me/8801700000000" 
                    className="w-full sm:w-auto px-12 py-6 bg-[#25d366] text-white font-black rounded-3xl shadow-2xl shadow-green-500/20 flex items-center justify-center gap-3 hover:scale-105 transition-all duration-300"
                  >
                     <Icons.Phone size={24} />
                     Join WhatsApp Group
                  </a>
                  <button className="w-full sm:w-auto px-12 py-6 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black rounded-3xl hover:bg-white/20 transition-all duration-300 uppercase tracking-widest text-sm">
                     View Gallery
                  </button>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
