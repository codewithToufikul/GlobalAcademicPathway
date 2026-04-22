import React, { useState } from "react";
import { Link } from "react-router";
import * as Icons from "../components/Icons";
import PhoneInputPkg from "react-phone-input-2";
const PhoneInput = (PhoneInputPkg as any).default || PhoneInputPkg;
import "react-phone-input-2/lib/style.css";

export function meta() {
   return [
      { title: "Apply Now | Free Consultation | Global Academic Pathway" },
      { name: "description", content: "Fill the form to book your free session. We will contact you soon." },
   ];
}

export default function ApplyPage() {
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      message: "",
      verified: false
   });
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isSuccess, setIsSuccess] = useState(false);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.verified) {
         alert("Please verify that you are not a robot.");
         return;
      }
      setIsSubmitting(true);

      try {
         const response = await fetch("http://gap-server.vercel.app/api/consultations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               studentName: formData.name,
               email: formData.email,
               phone: formData.phone,
               subject: "Free Consultation Request",
               message: formData.message
            })
         });
         if (response.ok) {
            setIsSuccess(true);
         } else {
            alert("Submission failed. Please try again.");
         }
      } catch (err) {
         console.error(err);
         alert("Server error. Please try again later.");
      } finally {
         setIsSubmitting(false);
      }
   };

   if (isSuccess) {
      return (
         <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 sm:p-8 text-center animate-in fade-in duration-1000">
            <div className="max-w-2xl w-full">
               <div className="relative mb-8 sm:mb-12 flex justify-center">
                  <div className="absolute inset-0 bg-blue-100 rounded-full scale-[1.8] blur-[100px] opacity-30" />

               </div>

               <div className="space-y-6 sm:space-y-8">
                  <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-[#1e3a8a] tracking-tight sm:tracking-tighter">
                     THANK YOU
                  </h1>

                  <div className="flex flex-col items-center">
                     <h2 className="text-2xl sm:text-4xl font-black text-gray-900 border-b-[6px] border-[#ff6b35] pb-2 inline-block shadow-[inset_0_-10px_0_rgba(255,107,53,0.1)]">
                        Check Your Email!
                     </h2>
                     <p className="text-gray-500 font-bold text-base sm:text-xl mt-6 px-4 leading-relaxed max-w-lg">
                        We've received your request! <br className="hidden sm:block" />
                        Our team will contact you within 24 hours.
                     </p>
                  </div>

                  <div className="pt-8 sm:pt-12">
                     <Link
                        to="/"
                        className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 bg-[#1e3a8a] text-white rounded-full font-black text-sm sm:text-base uppercase tracking-widest hover:bg-[#1e40af] transition-all duration-500 shadow-2xl shadow-blue-200 hover:-translate-y-1 active:scale-95 overflow-hidden"
                     >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <Icons.ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Go Back Home
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-white pt-24 pb-20 relative overflow-hidden">
         {/* Premium background decorations */}
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-50/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

         {/* Subtle pattern background */}
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1e3a8a 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />

         <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            {/* Header Section */}
            <div className="text-center mb-12 sm:mb-20">
               <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] rounded-full mb-6 border border-blue-100/50 animate-in slide-in-from-top-4 duration-700">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                  Your Journey Starts Here
               </div>
               <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-gray-900 mb-6 tracking-tight leading-[0.95] animate-in fade-in slide-in-from-bottom-6 duration-1000">
                  Apply <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Now</span>
               </h1>
               <p className="text-gray-500 font-bold text-base sm:text-xl max-w-2xl mx-auto px-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                  Fill the form to book your free session. <br className="hidden sm:block" />
                  We will contact you soon.
               </p>
            </div>

            <div className="max-w-2xl mx-auto animate-in zoom-in-95 fade-in duration-1000 delay-300">
               <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-[2.5rem] sm:rounded-[3.5rem] p-6 sm:p-12 lg:p-16 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.08)] relative">

                  {/* Decorative corner element */}
                  <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none hidden sm:block">
                     <Icons.Send size={80} />
                  </div>

                  <div className="space-y-5 sm:space-y-6">
                     <div className="space-y-2">
                        <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-4">Full Name</label>
                        <input
                           required
                           type="text"
                           placeholder="Enter your name"
                           value={formData.name}
                           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                           className="w-full px-8 py-5 bg-gray-50/50 border border-gray-100 rounded-2xl sm:rounded-3xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all duration-300 outline-none font-bold text-gray-900 placeholder:text-gray-300 placeholder:font-medium"
                        />
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-4">Email Address</label>
                        <input
                           required
                           type="email"
                           placeholder="Enter your email address"
                           value={formData.email}
                           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                           className="w-full px-8 py-5 bg-gray-50/50 border border-gray-100 rounded-2xl sm:rounded-3xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all duration-300 outline-none font-bold text-gray-900 placeholder:text-gray-300 placeholder:font-medium"
                        />
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-4">Phone Number</label>
                        <div className="phone-input-apply">
                           <PhoneInput
                              country={"bd"}
                              value={formData.phone}
                              onChange={(phone) => setFormData({ ...formData, phone })}
                              containerClass="!w-full !border-none"
                              inputClass="!w-full !h-[68px] !px-20 !py-5 !bg-gray-50/50 !border-gray-100 !rounded-2xl !sm:rounded-3xl !text-gray-900 !font-bold focus:!bg-white focus:!ring-4 focus:!ring-blue-50 focus:!border-blue-500 transition-all duration-300 placeholder:text-gray-300"
                              buttonClass="!bg-transparent !border-none !rounded-l-2xl !sm:rounded-l-3xl !w-[70px] !flex !justify-center"
                              dropdownClass="!rounded-2xl !shadow-2xl !border-gray-100"
                              enableSearch={true}
                           />
                           <style dangerouslySetInnerHTML={{
                              __html: `
                              .phone-input-apply .selected-flag { width: 70px !important; padding-left: 20px !important; }
                              .phone-input-apply .react-tel-input .flag-dropdown:hover { background: transparent !important; }
                              .phone-input-apply .react-tel-input .country-list .search { padding: 12px 16px !important; }
                              .phone-input-apply .react-tel-input .country-list .search-box { width: 90% !important; border-radius: 12px !important; padding: 10px !important; font-weight: 600 !important; }
                           `}} />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-4">How can we help you?</label>
                        <textarea
                           rows={4}
                           placeholder="Describe your query here..."
                           value={formData.message}
                           onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                           className="w-full px-8 py-5 bg-gray-50/50 border border-gray-100 rounded-2xl sm:rounded-3xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all duration-300 outline-none font-bold text-gray-900 placeholder:text-gray-300 placeholder:font-medium resize-none shadow-inner"
                        />
                     </div>

                     {/* Professional reCAPTCHA Mock */}
                     <div className="group pt-4">
                        <div className="bg-[#f9f9f9] border border-[#d3d3d3] rounded-sm p-4 w-full sm:w-[304px] flex items-center justify-between shadow-sm hover:shadow-md transition-shadow cursor-default select-none group">
                           <div className="flex items-center gap-4">
                              <div
                                 onClick={() => setFormData({ ...formData, verified: !formData.verified })}
                                 className={`w-7 h-7 border-2 rounded-sm flex items-center justify-center cursor-pointer transition-all ${formData.verified ? 'bg-white border-white scale-110' : 'bg-white border-[#c1c1c1] hover:border-gray-400'}`}
                              >
                                 {formData.verified ? (
                                    <Icons.ShieldCheck size={28} className="text-green-600 animate-in zoom-in-50 duration-300" />
                                 ) : (
                                    <div className="w-full h-full" />
                                 )}
                              </div>
                              <span className="text-sm font-medium text-[#555]">I'm not a robot</span>
                           </div>
                           <div className="flex flex-col items-center opacity-80">
                              <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" className="w-8 h-8 object-contain mb-1" alt="reCAPTCHA" />
                              <span className="text-[9px] text-[#555] font-black leading-tight">reCAPTCHA</span>
                              <div className="text-[7px] text-[#555] opacity-70">Privacy - Terms</div>
                           </div>
                        </div>
                        {!formData.verified && (
                           <p className="text-[10px] text-gray-400 mt-3 ml-1 italic font-medium">Verification required to proceed.</p>
                        )}
                     </div>

                     <div className="pt-6 sm:pt-8">
                        <button
                           disabled={isSubmitting}
                           className="group relative w-full py-5 sm:py-6 bg-[#2563eb] text-white font-black rounded-2xl sm:rounded-[2rem] shadow-[0_20px_50px_rgba(37,99,235,0.3)] uppercase tracking-[0.2em] text-sm sm:text-base hover:bg-blue-700 hover:-translate-y-1 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
                        >
                           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                           {isSubmitting ? (
                              <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                           ) : (
                              <>
                                 Book Free Counselling
                                 <Icons.ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                              </>
                           )}
                        </button>
                     </div>
                  </div>
               </form>

               {/* Trust Footer */}
               <div className="mt-8 text-center animate-in fade-in duration-1000 delay-500">
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-4">
                     <span className="w-8 h-px bg-gray-100" />
                     Trusted by 10,000+ Students
                     <span className="w-8 h-px bg-gray-100" />
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}
