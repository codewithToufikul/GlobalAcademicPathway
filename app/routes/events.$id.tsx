import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import * as Icons from "../components/Icons";

interface EventDetail {
   _id: string;
   title: string;
   hook?: string;
   description: string;
   date: string;
   time?: string;
   location: string;
   mapLink?: string;
   type: string;
   image?: string;
   representative?: {
      name?: string;
      role?: string;
      bio?: string;
      image?: string;
   };
   benefits?: string[];
   targetAudience?: string[];
   scholarshipInfo?: string;
   organizer?: string;
   featured?: boolean;
   status: string;
}

export default function EventDetailsPage() {
   const { id } = useParams();
   const [event, setEvent] = useState<EventDetail | null>(null);
   const [loading, setLoading] = useState(true);
   const [regForm, setRegForm] = useState({ name: "", email: "", phone: "", verified: false });
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isSuccess, setIsSuccess] = useState(false);

   useEffect(() => {
      const fetchEvent = async () => {
         try {
            const res = await fetch(`https://gap-server-22sf.onrender.com/api/events`);
            const result = await res.json();
            if (result.success) {
               const found = result.data.find((e: any) => e._id === id);
               setEvent(found);
            }
         } catch (err) {
            console.error(err);
         } finally {
            setLoading(false);
         }
      };
      fetchEvent();
   }, [id]);

   const handleRegister = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!regForm.verified) return alert("Verify you are not a robot");
      setIsSubmitting(true);
      try {
         const res = await fetch("https://gap-server-22sf.onrender.com/api/events/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               event: event?._id,
               name: regForm.name,
               email: regForm.email,
               phone: regForm.phone
            })
         });
         const result = await res.json();
         if (result.success) {
            setIsSuccess(true);
         } else {
            alert(result.message || "Registration failed");
         }
      } catch (err) {
         alert("Connection error. Please try again.");
      } finally {
         setIsSubmitting(false);
      }
   };

   if (loading) return (
      <div className="min-h-screen flex items-center justify-center bg-white">
         <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
   );

   if (!event) return (
      <div className="min-h-screen flex items-center justify-center bg-white flex-col gap-6">
         <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Event Not Found</h1>
         <Link to="/events" className="text-blue-600 font-bold uppercase tracking-widest text-sm">Return to Events</Link>
      </div>
   );

   return (
      <div className="min-h-screen bg-white">
         {/* Header Banner */}
         <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
            <img
               src={event.image || "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?w=1200&q=80"}
               className="w-full h-full object-cover"
               alt={event.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent" />

            <div className="absolute bottom-0 left-0 w-full p-8 lg:p-20 text-white">
               <div className="max-w-7xl mx-auto flex flex-col items-start gap-4">
                  <div className="px-4 py-2 bg-blue-600 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest animate-in slide-in-from-left-4 duration-500">
                     {event.type} • {event.status}
                  </div>
                  <h1 className="text-4xl lg:text-7xl font-black tracking-tight leading-tight max-w-4xl animate-in slide-in-from-bottom-8 duration-700">
                     {event.title}
                  </h1>
                  {event.hook && (
                     <p className="text-blue-300 font-bold text-lg sm:text-2xl italic tracking-tight opacity-90 animate-in slide-in-from-bottom-10 duration-1000 delay-200">
                        "{event.hook}"
                     </p>
                  )}
               </div>
            </div>
         </section>

         {/* Main Content & Registration */}
         <section className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
               {/* Left Side: Details */}
               <div className="lg:col-span-8 space-y-16">

                  {/* Metadata Bar */}
                  <div className="flex flex-wrap items-center gap-12 border-y border-gray-100 py-10">
                     <div className="space-y-1">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</span>
                        <div className="flex items-center gap-2 text-gray-900 font-black text-lg">
                           <Icons.Clock size={20} className="text-blue-600" />
                           {new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                     </div>
                     <div className="space-y-1">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Time</span>
                        <div className="text-gray-900 font-black text-lg">{event.time || "To be announced"}</div>
                     </div>
                     <div className="space-y-1">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Location</span>
                        <div className="flex items-center gap-2 text-gray-900 font-black text-lg">
                           <Icons.MapPin size={20} className="text-blue-600" />
                           {event.location}
                        </div>
                     </div>
                     {event.organizer && (
                        <div className="space-y-1">
                           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Organizer</span>
                           <div className="text-gray-900 font-black text-lg">{event.organizer}</div>
                        </div>
                     )}
                  </div>

                  {/* Description */}
                  <div className="space-y-6">
                     <h2 className="text-3xl font-black text-gray-900 tracking-tight">About this event</h2>
                     <p className="text-gray-500 font-medium text-lg lg:text-xl leading-relaxed whitespace-pre-line">
                        {event.description}
                     </p>
                  </div>

                  {/* Benefits & Targeted */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                     {event.benefits && event.benefits.length > 0 && (
                        <div className="p-10 bg-blue-50/50 rounded-[2.5rem] border border-blue-50 space-y-6">
                           <h3 className="text-lg font-black text-blue-900 uppercase tracking-widest">Why you should attend</h3>
                           <ul className="space-y-4">
                              {event.benefits.map((b, i) => (
                                 <li key={i} className="flex items-start gap-3 text-blue-800/80 font-bold">
                                    <span className="mt-1.5 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                                    {b}
                                 </li>
                              ))}
                           </ul>
                        </div>
                     )}
                     {event.targetAudience && event.targetAudience.length > 0 && (
                        <div className="p-10 bg-gray-50/50 rounded-[2.5rem] border border-gray-50 space-y-6">
                           <h3 className="text-lg font-black text-gray-900 uppercase tracking-widest">Who should attend</h3>
                           <ul className="space-y-4">
                              {event.targetAudience.map((a, i) => (
                                 <li key={i} className="flex items-start gap-3 text-gray-600 font-bold">
                                    <Icons.Clock size={18} className="text-gray-400 flex-shrink-0" />
                                    {a}
                                 </li>
                              ))}
                           </ul>
                        </div>
                     )}
                  </div>

                  {/* Scholarship Shoutout */}
                  {event.scholarshipInfo && (
                     <div className="bg-gradient-to-r from-orange-500 to-red-600 p-1 rounded-[2.5rem]">
                        <div className="bg-white rounded-[2.4rem] p-10 lg:p-14 flex flex-col md:flex-row items-center gap-10">
                           <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                              <Icons.GraduationCap size={44} />
                           </div>
                           <div>
                              <h3 className="text-2xl font-black text-gray-900 leading-tight">Scholarship Opportunity</h3>
                              <p className="text-lg text-gray-500 font-bold mt-2">{event.scholarshipInfo}</p>
                           </div>
                           <div className="md:ml-auto">
                              <span className="text-4xl font-black text-orange-600">NEW</span>
                           </div>
                        </div>
                     </div>
                  )}

                  {/* Representative Profile */}
                  {event.representative && (event.representative.name || event.representative.bio) && (
                     <div className="bg-white border border-gray-100 rounded-[3rem] p-10 lg:p-16 shadow-2xl shadow-blue-50">
                        <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-10 border-l-4 border-blue-600 pl-4">University Representative</h3>
                        <div className="flex flex-col md:flex-row items-center gap-10">
                           <div className="w-32 h-32 lg:w-44 lg:h-44 rounded-full overflow-hidden border-4 border-white shadow-xl flex-shrink-0">
                              <img
                                 src={event.representative.image || "https://randomuser.me/api/portraits/men/1.jpg"}
                                 className="w-full h-full object-cover"
                                 alt={event.representative.name}
                              />
                           </div>
                           <div className="space-y-4 text-center md:text-left">
                              <h4 className="text-2xl font-black text-gray-900 tracking-tight">{event.representative.name || "Special Guest"}</h4>
                              <div className="px-5 py-1.5 bg-gray-50 text-gray-500 text-[10px] font-black uppercase tracking-widest inline-block rounded-full">{event.representative.role || "Representative"}</div>
                              <p className="text-gray-500 font-medium text-lg leading-relaxed">{event.representative.bio}</p>
                           </div>
                        </div>
                     </div>
                  )}

                  {/* Map Embed Example */}
                  {event.mapLink && (
                     <div className="rounded-[3rem] overflow-hidden border border-gray-100 h-[400px]">
                        <iframe
                           src={event.mapLink}
                           width="100%"
                           height="100%"
                           style={{ border: 0 }}
                           allowFullScreen={true}
                           loading="lazy"
                        ></iframe>
                     </div>
                  )}
               </div>

               {/* Right Side: Registration Sticky */}
               <div className="lg:col-span-4">
                  <div className="sticky top-32 space-y-8">
                     <div className="bg-white border border-gray-100 rounded-[3rem] p-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)]">
                        <div className="mb-10">
                           <h3 className="text-2xl font-black text-gray-900 tracking-tight">Register to Join</h3>
                           <p className="text-gray-400 font-bold text-sm mt-1">Book your spot for this free event.</p>
                        </div>

                        {isSuccess ? (
                           <div className="text-center py-10 animate-in fade-in zoom-in duration-700">
                              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                 <Icons.ShieldCheck size={40} />
                              </div>
                              <h4 className="text-xl font-black text-gray-900">Successfully Registered!</h4>
                              <p className="text-gray-400 font-bold mt-2">Check your email for tickets.</p>
                              <button onClick={() => setIsSuccess(false)} className="mt-8 text-blue-600 font-black uppercase text-xs tracking-widest">Register Someone Else</button>
                           </div>
                        ) : (
                           <form onSubmit={handleRegister} className="space-y-5">
                              <input
                                 placeholder="Full Name"
                                 className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold text-gray-900 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all"
                                 required
                                 value={regForm.name}
                                 onChange={e => setRegForm({ ...regForm, name: e.target.value })}
                              />
                              <input
                                 placeholder="Email Address"
                                 type="email"
                                 className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold text-gray-900 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all"
                                 required
                                 value={regForm.email}
                                 onChange={e => setRegForm({ ...regForm, email: e.target.value })}
                              />
                              <input
                                 placeholder="Phone Number"
                                 className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold text-gray-900 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all"
                                 required
                                 value={regForm.phone}
                                 onChange={e => setRegForm({ ...regForm, phone: e.target.value })}
                              />

                              <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl flex items-center justify-between group cursor-pointer" onClick={() => setRegForm({ ...regForm, verified: !regForm.verified })}>
                                 <div className="flex items-center gap-3">
                                    <div className={`w-6 h-6 border-2 rounded flex items-center justify-center transition-all ${regForm.verified ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-200 group-hover:border-blue-300'}`}>
                                       {regForm.verified && <Icons.ShieldCheck size={18} className="text-white" />}
                                    </div>
                                    <span className="text-xs font-bold text-gray-500">I'm not a robot</span>
                                 </div>
                                 <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" className="w-6 h-6 opacity-40" alt="reCAPTCHA" />
                              </div>

                              <button
                                 disabled={isSubmitting}
                                 className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100 uppercase tracking-widest text-xs hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-3"
                              >
                                 {isSubmitting ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : "Confirm Attendance"}
                              </button>
                           </form>
                        )}
                     </div>

                     {/* Quick Support Card */}
                     <div className="bg-[#0f172a] rounded-[3rem] p-10 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 opacity-20 blur-3xl pointer-events-none" />
                        <h4 className="text-xl font-black mb-4">Any Questions?</h4>
                        <p className="text-gray-400 font-medium text-sm mb-8 leading-relaxed">Need help with registration or finding the venue? Our support team is here for you.</p>
                        <a href="https://wa.me/8801756560536" className="flex items-center gap-3 text-blue-400 font-bold hover:text-white transition-colors">
                           <Icons.Phone size={20} />
                           Live Support <span>→</span>
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
}
