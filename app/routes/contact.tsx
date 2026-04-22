import React, { useState } from "react";
import * as Icons from "../components/Icons";

export function meta() {
   return [
      { title: "Contact Us | Global Academic Pathway" },
      { name: "description", content: "Get in touch with Global Academic Pathway. Visit our office, call us, or send an inquiry for your study abroad journey." },
   ];
}

export default function ContactPage() {
   const [activeLocation, setActiveLocation] = useState("dhaka");
   const [formState, setFormState] = useState({
      fullName: "",
      email: "",
      phone: "",
      subject: "General Information",
      message: ""
   });
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [submitted, setSubmitted] = useState(false);
   const [error, setError] = useState("");

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setError("");

      try {
         const response = await fetch("https://gap-server-22sf.onrender.com/api/contact", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(formState),
         });

         const data = await response.json();

         if (data.success) {
            setSubmitted(true);
            setFormState({ fullName: "", email: "", phone: "", subject: "General Information", message: "" });
         } else {
            setError(data.message || "Failed to send message. Please try again.");
         }
      } catch (err) {
         setError("An error occurred. Please check your connection.");
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div className="bg-white">
         {/* Hero Section */}
         <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-gray-900 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-20 -z-0">
               <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-transparent" />
            </div>
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
               <span className="px-4 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-xs font-black uppercase tracking-widest mb-8 inline-block">Connect With Us</span>
               <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tight mb-8">
                  Let's Plan Your <br /><span className="text-blue-500 text-glow">Global Future.</span>
               </h1>
               <p className="text-gray-400 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
                  Whether you have a quick question or need a deep-dive consultation, our team of experts is ready to assist you.
               </p>
            </div>
         </section>

         {/* Main Content */}
         <section className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

                  {/* Contact Info & Details */}
                  <div className="space-y-12">
                     <div>
                        <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">Our Global Headquarters</h2>
                        <p className="text-gray-500 font-medium leading-relaxed">Visit our primary office for a face-to-face consultation with our certified counselors.</p>
                     </div>

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="group p-8 bg-gray-50 rounded-[2rem] hover:bg-blue-600 transition-all duration-500">
                           <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 mb-6 shadow-sm group-hover:scale-110 transition-transform">
                              <Icons.MapPin size={24} />
                           </div>
                           <h4 className="text-xl font-bold text-gray-900 group-hover:text-white mb-2 transition-colors">Location</h4>
                           <p className="text-gray-500 group-hover:text-blue-100 text-sm leading-relaxed transition-colors">
                              Skytuch Rajkush, 2nd Floor<br />43/R, 5/C Panthapath, Dhaka-1205
                           </p>
                        </div>

                        <div className="group p-8 bg-gray-50 rounded-[2rem] hover:bg-blue-600 transition-all duration-500">
                           <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 mb-6 shadow-sm group-hover:scale-110 transition-transform">
                              <Icons.Mail size={24} />
                           </div>
                           <h4 className="text-xl font-bold text-gray-900 group-hover:text-white mb-2 transition-colors">Email Us</h4>
                           <p className="text-gray-500 group-hover:text-blue-100 text-sm transition-colors">
                              info@globalacademicpathway.org
                           </p>
                        </div>

                        <div className="group p-8 bg-gray-50 rounded-[2rem] hover:bg-blue-600 transition-all duration-500">
                           <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 mb-6 shadow-sm group-hover:scale-110 transition-transform">
                              <Icons.Phone size={24} />
                           </div>
                           <h4 className="text-xl font-bold text-gray-900 group-hover:text-white mb-2 transition-colors">Call Now</h4>
                           <p className="text-gray-500 group-hover:text-blue-100 text-sm transition-colors">
                              +880 1756-560536
                           </p>
                        </div>

                        <div className="group p-8 bg-gray-50 rounded-[2rem] hover:bg-blue-600 transition-all duration-500">
                           <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 mb-6 shadow-sm group-hover:scale-110 transition-transform">
                              <Icons.Clock size={24} />
                           </div>
                           <h4 className="text-xl font-bold text-gray-900 group-hover:text-white mb-2 transition-colors">Office Hours</h4>
                           <p className="text-gray-500 group-hover:text-blue-100 text-sm transition-colors">
                              Sat - Thu: 10AM - 7PM<br />Friday Closed
                           </p>
                        </div>
                     </div>

                  </div>

                  {/* Contact Form */}
                  <div className="relative">
                     <div className="bg-white rounded-[3rem] p-10 lg:p-12 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.08)] border border-gray-100 relative z-10">
                        {submitted ? (
                           <div className="py-20 text-center animate-in zoom-in duration-500">
                              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-50">
                                 <Icons.ShieldCheck size={40} />
                              </div>
                              <h3 className="text-3xl font-black text-gray-900 mb-4">Message Sent!</h3>
                              <p className="text-gray-500 font-medium">Thank you for reaching out. One of our lead consultants will contact you within 24 hours.</p>
                              <button onClick={() => setSubmitted(false)} className="mt-10 px-8 py-4 bg-gray-900 text-white font-black rounded-2xl text-xs uppercase tracking-widest">Send Another</button>
                           </div>
                        ) : (
                           <>
                              <h3 className="text-2xl font-black text-gray-900 mb-8">Send an Inquiry</h3>
                              {error && (
                                 <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-xs font-bold animate-in fade-in duration-300">
                                    {error}
                                 </div>
                              )}
                              <form onSubmit={handleSubmit} className="space-y-6">
                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                       <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1">Full Name</label>
                                       <input
                                          required
                                          type="text"
                                          placeholder="John Doe"
                                          value={formState.fullName}
                                          onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                                          className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none font-bold"
                                       />
                                    </div>
                                    <div className="space-y-2">
                                       <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1">Email Address</label>
                                       <input
                                          required
                                          type="email"
                                          placeholder="john@example.com"
                                          value={formState.email}
                                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                          className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none font-bold"
                                       />
                                    </div>
                                 </div>
                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                       <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1">Phone Number</label>
                                       <input
                                          type="tel"
                                          placeholder="+880 1XXX XXXXXX"
                                          value={formState.phone}
                                          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                                          className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none font-bold"
                                       />
                                    </div>
                                    <div className="space-y-2">
                                       <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1">Inquiry Topic</label>
                                       <select
                                          value={formState.subject}
                                          onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                                          className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none font-bold appearance-none"
                                       >
                                          <option>General Information</option>
                                          <option>University Admission</option>
                                          <option>Visa Assistance</option>
                                          <option>Scholarship Inquiry</option>
                                       </select>
                                    </div>
                                 </div>
                                 <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1">Your Message</label>
                                    <textarea
                                       required
                                       rows={4}
                                       placeholder="How can we help you?"
                                       value={formState.message}
                                       onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                       className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none font-bold resize-none"
                                    />
                                 </div>
                                 <button
                                    disabled={isSubmitting}
                                    className={`w-full py-5 ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600'} text-white font-black rounded-2xl shadow-xl shadow-blue-100 uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all hover:scale-[1.02]`}
                                 >
                                    {isSubmitting ? (
                                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                       <>
                                          <Icons.FileText size={18} />
                                          Send Message
                                       </>
                                    )}
                                 </button>
                              </form>
                           </>
                        )}
                     </div>
                     {/* Decorative Elements */}
                     <div className="absolute top-10 right-10 w-32 h-32 bg-blue-100 rounded-full -z-10 blur-3xl opacity-50" />
                     <div className="absolute bottom-10 left-10 w-48 h-48 bg-blue-200 rounded-full -z-10 blur-3xl opacity-30" />
                  </div>
               </div>
            </div>
         </section>

         {/* ── MULTI-LOCATION STRATEGIC HUB ─────────────────────────────── */}
         <section className="px-6 lg:px-8 pb-32">
            <div className="max-w-7xl mx-auto space-y-12">
               <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  {[
                     { id: "dhaka", label: "Dhaka HQ", country: "Bangladesh", icon: "🇧🇩" },
                     { id: "chittagong", label: "Chittagong", country: "Bangladesh", icon: "🇧🇩" },
                     { id: "gujarat", label: "Gujarat", country: "India", icon: "🇮🇳" }
                  ].map(loc => (
                     <button
                        key={loc.id}
                        onClick={() => setActiveLocation(loc.id)}
                        className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 flex items-center gap-3 ${activeLocation === loc.id ? "bg-gray-900 text-white shadow-2xl scale-105" : "bg-gray-50 text-gray-400 hover:bg-gray-100"}`}
                     >
                        <span className="text-lg">{loc.icon}</span> {loc.label}
                     </button>
                  ))}
               </div>

               <div className="h-[600px] bg-gray-100 rounded-[4rem] overflow-hidden group border border-gray-100 relative shadow-2xl shadow-gray-200/50">
                  <div className="absolute inset-0 z-0 grayscale opacity-90 group-hover:grayscale-0 transition-all duration-1000">
                     {activeLocation === "dhaka" && (
                        <iframe
                           title="Dhaka Office"
                           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.0528!2d90.3900!3d23.7500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b897810787e9%3A0x6335133604f46c64!2sElite%20Tower!5e0!3m2!1sen!2sbd!4v1713780000000"
                           width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                        />
                     )}
                     {activeLocation === "chittagong" && (
                        <iframe
                           title="Chittagong Office"
                           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.8765!2d91.8123!3d22.3456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd899036c84c1%3A0xe1354366e4a28723!2sBMA%20House%2C%20Chattogram!5e0!3m2!1sen!2sbd!4v1713781000000"
                           width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                        />
                     )}
                     {activeLocation === "gujarat" && (
                        <iframe
                           title="Gujarat Office"
                           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3677.2345!2d72.9234!3d22.5678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e4e7e6f8a5555%3A0x1234567890abcdef!2sShanti%20Complex%2C%20Anand!5e0!3m2!1sen!2sin!4v1713782000000"
                           width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                        />
                     )}
                  </div>

                  {/* Overlay Shield */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white/60 via-transparent to-transparent" />

                  <div className="absolute inset-x-8 bottom-8 pointer-events-none">
                     <div className="bg-white/95 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/20 inline-flex items-center gap-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] animate-in slide-in-from-bottom-12 duration-700">
                        <div className="w-20 h-20 bg-blue-600 text-white rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-blue-200">
                           <Icons.MapPin size={32} />
                        </div>
                        <div className="space-y-1">
                           <div className="flex items-center gap-3">
                              <span className="text-2xl">{activeLocation === "gujarat" ? "🇮🇳" : "🇧🇩"}</span>
                              <h5 className="font-black text-gray-900 text-2xl tracking-tighter italic">
                                 {activeLocation === "dhaka" ? "Dhaka Main Office" : activeLocation === "chittagong" ? "Chittagong Hub" : "Gujarat Strategy Center"}
                              </h5>
                           </div>
                           <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] max-w-sm">
                              {activeLocation === "dhaka" ? "Skytuch Rajkush, 2nd Floor, 43/R, 5/C Panthapath, Dhaka-1205" :
                                 activeLocation === "chittagong" ? "130/133 Aju Shah Lane, BMA House, Bandar Main Post Office 4100" :
                                    "TF- 301, Shanti Complex, Near Gurudwara Circle, Anand 388001"}
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
}