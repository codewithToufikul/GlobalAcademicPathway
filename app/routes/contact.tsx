import React, { useState } from "react";
import * as Icons from "../components/Icons";

export function meta() {
  return [
    { title: "Contact Us | Global Academic Pathway" },
    { name: "description", content: "Get in touch with Global Academic Pathway. Visit our office, call us, or send an inquiry for your study abroad journey." },
  ];
}

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
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
                           Suite 402, Elite Tower<br />Panthapath, Dhaka 1215
                        </p>
                     </div>

                     <div className="group p-8 bg-gray-50 rounded-[2rem] hover:bg-blue-600 transition-all duration-500">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 mb-6 shadow-sm group-hover:scale-110 transition-transform">
                           <Icons.Mail size={24} />
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 group-hover:text-white mb-2 transition-colors">Email Us</h4>
                        <p className="text-gray-500 group-hover:text-blue-100 text-sm transition-colors">
                           info@gapathway.com<br />support@gapathway.com
                        </p>
                     </div>

                     <div className="group p-8 bg-gray-50 rounded-[2rem] hover:bg-blue-600 transition-all duration-500">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 mb-6 shadow-sm group-hover:scale-110 transition-transform">
                           <Icons.Phone size={24} />
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 group-hover:text-white mb-2 transition-colors">Call Now</h4>
                        <p className="text-gray-500 group-hover:text-blue-100 text-sm transition-colors">
                           +880 1712 345678<br />+880 1912 345678
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

                  {/* Social/Trust */}
                  <div className="p-10 bg-blue-50/50 rounded-[2.5rem] border border-blue-100">
                     <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-4">Follow Our Journey</p>
                     <div className="flex gap-4">
                        {['FB', 'IG', 'LI', 'YT'].map(social => (
                          <div key={social} className="w-10 h-10 bg-white border border-blue-100 rounded-lg flex items-center justify-center font-black text-xs text-blue-600 hover:bg-blue-600 hover:text-white transition-all cursor-pointer shadow-sm">
                             {social}
                          </div>
                        ))}
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
                        <form onSubmit={handleSubmit} className="space-y-6">
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                 <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1">Full Name</label>
                                 <input 
                                  required
                                  type="text" 
                                  placeholder="John Doe"
                                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none font-bold" 
                                 />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1">Email Address</label>
                                 <input 
                                  required
                                  type="email" 
                                  placeholder="john@example.com"
                                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none font-bold" 
                                 />
                              </div>
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1">Inquiry Topic</label>
                              <select className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none font-bold appearance-none">
                                 <option>General Information</option>
                                 <option>University Admission</option>
                                 <option>Visa Assistance</option>
                                 <option>Scholarship Inquiry</option>
                              </select>
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1">Your Message</label>
                              <textarea 
                                required
                                rows={4}
                                placeholder="How can we help you?"
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

      {/* Dynamic Map Placeholder */}
      <section className="px-6 lg:px-8 pb-32">
         <div className="max-w-7xl mx-auto h-[500px] bg-gray-100 rounded-[3rem] overflow-hidden group border border-gray-100 relative">
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-1000 grayscale opacity-80">
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&q=80" 
                  alt="Office Location Map" 
                  className="w-full h-full object-cover"
                />
            </div>
            <div className="absolute inset-x-8 bottom-8">
               <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white/20 inline-flex items-center gap-4 shadow-xl">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center">
                    <Icons.GraduationCap size={20} />
                  </div>
                  <div>
                    <h5 className="font-black text-gray-900 text-sm">Main Office</h5>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Elite Tower, Panthapath</p>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
