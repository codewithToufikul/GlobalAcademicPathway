import React, { useState } from "react";
import { Link } from "react-router";
import * as Icons from "../components/Icons";
import { COUNTRIES, DESTINATIONS } from "../data/siteData";
import PhoneInputPkg from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInput = (PhoneInputPkg as any).default || PhoneInputPkg;

export function meta() {
  return [
    { title: "Plan Your Study Journey | Global Academic Pathway" },
    { name: "description", content: "Book your free consultation and plan your international education journey." },
  ];
}

const STEPS_DATA = [
  { id: 1, title: "Personal Info" },
  { id: 2, title: "Study Preferences" },
  { id: 3, title: "Academic History" },
  { id: 4, title: "English Proficiency" },
  { id: 5, title: "Work Experience" },
];

export default function Registration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    citizenship: "",
    residence: "",
    destinations: [] as string[],
    studyLevel: "",
    qualification: "",
    academicYear: "",
    academicGrade: "",
    englishTest: "",
    englishScore: "",
    hasEnglishCert: true,
    hasWorkExp: "No",
    verified: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    if (!formData.verified) {
      alert("Please verify that you are not a robot.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch("https://gap-server-22sf.onrender.com/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
      } else {
        alert("Registration failed: " + result.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please check if the server is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = (currentStep / 5) * 100;

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Let's Plan Your Study Journey!</h1>
          <p className="text-gray-500 font-medium tracking-wide prose lg:prose-lg max-w-none">Book Your Free Consultation</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-gray-100 relative">
          {/* Step Indicator Section */}
          <div className="px-8 pt-8 pb-4 border-b border-gray-50">
            <div className="flex justify-between items-end mb-4">
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                {isSuccess ? "Success" : STEPS_DATA.find((s) => s.id === currentStep)?.title}
              </h2>
              {!isSuccess && (
                <span className="text-sm font-medium text-gray-400 italic">
                  Step {currentStep} of 5
                </span>
              )}
            </div>
            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full bg-blue-600 transition-all duration-700 ease-out rounded-full shadow-[0_0_10px_rgba(37,99,235,0.3)] ${isSuccess ? "w-full bg-green-500 shadow-green-200" : ""}`}
                style={{ width: isSuccess ? "100%" : `${progress}%` }}
              />
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 lg:p-10">
            {isSuccess ? (
              <div className="text-center py-12 animate-in fade-in zoom-in duration-700">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icons.ShieldCheck size={44} className="text-green-600" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-4">Registration Successful!</h2>
                <p className="text-gray-500 mb-10 max-w-sm mx-auto font-medium">
                  Thank you for planning your journey with us. Our expert consultant will reach out to you within 24 hours.
                </p>
                <div className="flex flex-col gap-3">
                  <Link to="/" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-200 hover:scale-105 hover:bg-blue-700 transition-all text-center">
                    Back to Homepage
                  </Link>
                  <button onClick={() => { setIsSuccess(false); setCurrentStep(1); }} className="text-sm font-bold text-gray-400 hover:text-blue-600 transition-colors">
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="min-h-[400px]">
                  {currentStep === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          placeholder="John Smith"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all duration-300 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
                        <input
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all duration-300 outline-none"
                        />
                      </div>
                      <div className="relative z-30">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                        <div className="phone-input-container !overflow-visible">
                          <PhoneInput
                            country={"bd"}
                            value={formData.phone}
                            onChange={(phone) => setFormData({ ...formData, phone })}
                            containerClass="!w-full !border-none !rounded-2xl"
                            inputClass="!w-full !h-[60px] !px-16 !py-4 !bg-gray-50 !border-gray-100 !rounded-2xl !text-gray-900 !font-bold focus:!bg-white focus:!ring-4 focus:!ring-blue-50 focus:!border-blue-500 !transition-all"
                            buttonClass="!bg-transparent !border-none !rounded-l-2xl !w-[60px] !flex !justify-center"
                            dropdownClass="!rounded-2xl !shadow-xl !border-gray-100 !text-sm !font-bold"
                            searchClass="!font-bold !text-sm"
                            enableSearch={true}
                          />
                        </div>
                        <style dangerouslySetInnerHTML={{
                          __html: `
                          .phone-input-container .react-tel-input .flag-dropdown {
                            background: transparent !important;
                            border: none !important;
                          }
                          .phone-input-container .react-tel-input .selected-flag {
                            width: 60px !important;
                            padding: 0 0 0 20px !important;
                            background: transparent !important;
                          }
                          .phone-input-container .react-tel-input .selected-flag:hover, 
                          .phone-input-container .react-tel-input .selected-flag:focus {
                            background: transparent !important;
                          }
                          .phone-input-container .react-tel-input .country-list {
                            width: 300px !important;
                            margin-top: 10px !important;
                            border-radius: 1.5rem !important;
                            padding: 10px !important;
                            border: 1px solid #f1f5f9 !important;
                            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1) !important;
                          }
                          .phone-input-container .react-tel-input .country-list .search {
                            background: #f8fafc !important;
                            padding: 10px 15px !important;
                            border-radius: 1rem !important;
                            border: 1px solid #f1f5f9 !important;
                            margin-bottom: 10px !important;
                          }
                          .phone-input-container .react-tel-input .country-list .country {
                            padding: 12px 15px !important;
                            border-radius: 0.75rem !important;
                            transition: all 0.2s !important;
                          }
                          .phone-input-container .react-tel-input .country-list .country.highlight {
                            background-color: #eff6ff !important;
                            color: #2563eb !important;
                          }
                        `}} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Country Of Citizenship <span className="text-red-500">*</span></label>
                        <select
                          value={formData.citizenship}
                          onChange={(e) => setFormData({ ...formData, citizenship: e.target.value })}
                          className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all duration-300 outline-none appearance-none cursor-pointer text-gray-600"
                        >
                          <option value="">Select citizenship</option>
                          {COUNTRIES.map(c => (
                            <option key={c.code} value={c.name}>{c.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Current Residence (If Different)</label>
                        <select
                          value={formData.residence}
                          onChange={(e) => setFormData({ ...formData, residence: e.target.value })}
                          className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all duration-300 outline-none appearance-none cursor-pointer text-gray-600"
                        >
                          <option value="">Select residence</option>
                          {COUNTRIES.map(c => (
                            <option key={c.code} value={c.name}>{c.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-4">Preferred Study Destinations <span className="text-red-500">*</span></label>
                        <div className="flex flex-wrap gap-2.5">
                          {DESTINATIONS.map((d) => (
                            <button
                              key={d.country}
                              type="button"
                              onClick={() => {
                                setFormData(prev => {
                                  const exists = prev.destinations.includes(d.country);
                                  return {
                                    ...prev,
                                    destinations: exists
                                      ? prev.destinations.filter(item => item !== d.country)
                                      : [...prev.destinations, d.country]
                                  };
                                });
                              }}
                              className={`px-8 py-3 rounded-xl border text-sm font-bold transition-all duration-300 ${formData.destinations.includes(d.country)
                                ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200"
                                : "bg-gray-50/50 border-gray-100 text-gray-600 hover:border-blue-200"
                                }`}
                            >
                              {d.country}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-4">Preferred Study Level <span className="text-red-500">*</span></label>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {[
                            "Foundation/Pathway Programme", "Diploma",
                            "Undergraduate (Bachelor's Degree)", "Graduate Certificate/Diploma",
                            "Postgraduate (Master's Degree)", "Doctoral (PhD) / DBA",
                            "Master's by Research", "Exchange/Short-Term Programme",
                            "Language Course", "Others"
                          ].map((lvl) => (
                            <label
                              key={lvl}
                              className={`flex items-start gap-3 p-4 border rounded-2xl cursor-pointer transition-all duration-300 ${formData.studyLevel === lvl
                                ? "bg-blue-50 border-blue-400 ring-2 ring-blue-50 shadow-sm shadow-blue-100"
                                : "bg-gray-50/50 border-gray-100 hover:border-blue-200"
                                }`}
                            >
                              <input
                                type="radio"
                                name="studyLevel"
                                className="mt-1 w-4 h-4 text-blue-600 focus:ring-blue-500"
                                checked={formData.studyLevel === lvl}
                                onChange={() => setFormData(prev => ({ ...prev, studyLevel: lvl }))}
                              />
                              <span className={`text-sm font-bold ${formData.studyLevel === lvl ? "text-blue-900" : "text-gray-600"}`}>
                                {lvl}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-widest text-[10px]">Select Latest Academic Qualification <span className="text-red-500">*</span></label>
                        <div className="flex flex-wrap gap-3">
                          {[
                            "Higher Secondary Certificate (or equivalent)",
                            "Bachelor's Degree (Honours)",
                            "Master's Degree",
                            "MBBS/BDS",
                            "MBA"
                          ].map((q) => (
                            <button
                              key={q}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, qualification: q }))}
                              className={`px-5 py-3 rounded-xl border text-[13px] font-bold transition-all duration-300 ${formData.qualification === q
                                ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100"
                                : "bg-gray-50/50 border-gray-100 text-gray-600 hover:border-blue-200"
                                }`}
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>

                      {formData.qualification && (
                        <div className="p-8 bg-white border border-gray-100 rounded-[2rem] shadow-sm animate-in zoom-in duration-300">
                          <h4 className="font-black text-gray-900 mb-6">{formData.qualification}</h4>
                          <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1">Year Of Completion <span className="text-red-500">*</span></label>
                              <input
                                type="text"
                                placeholder="e.g. 2022"
                                value={formData.academicYear}
                                onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none font-bold"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1">GPA/Grade <span className="text-red-500">*</span></label>
                              <input
                                type="text"
                                placeholder="e.g. 4.8"
                                value={formData.academicGrade}
                                onChange={(e) => setFormData({ ...formData, academicGrade: e.target.value })}
                                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none font-bold"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">English Proficiency Test</label>
                        <select
                          value={formData.englishTest}
                          onChange={(e) => setFormData({ ...formData, englishTest: e.target.value })}
                          className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all outline-none text-gray-600"
                        >
                          <option value="">Select an option</option>
                          <option value="IELTS">IELTS</option>
                          <option value="TOEFL">TOEFL</option>
                          <option value="PTE">PTE</option>
                          <option value="Duolingo">Duolingo</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Score</label>
                        <input
                          type="text"
                          placeholder="e.g. 7.5"
                          value={formData.englishScore}
                          onChange={(e) => setFormData({ ...formData, englishScore: e.target.value })}
                          className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all outline-none"
                        />
                      </div>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          checked={!formData.hasEnglishCert}
                          onChange={() => setFormData(prev => ({ ...prev, hasEnglishCert: !prev.hasEnglishCert }))}
                        />
                        <span className="text-sm font-bold text-gray-600 group-hover:text-blue-600 transition-colors italic leading-relaxed">I do not have an English proficiency certificate</span>
                      </label>
                    </div>
                  )}

                  {currentStep === 5 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-4 tracking-tighter">Do You Have Work Experience?</label>
                        <select
                          value={formData.hasWorkExp}
                          onChange={(e) => setFormData({ ...formData, hasWorkExp: e.target.value })}
                          className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all outline-none text-gray-600 appearance-none cursor-pointer"
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </div>

                      {/* Professional reCAPTCHA Mock */}
                      <div className="group">
                        <div className="bg-[#f9f9f9] border border-[#d3d3d3] rounded-sm p-4 w-full sm:w-[304px] flex items-center justify-between shadow-sm hover:shadow-md transition-shadow cursor-default select-none">
                          <div className="flex items-center gap-4">
                            <div
                              onClick={() => {
                                if (!formData.verified) {
                                  setFormData({ ...formData, verified: true });
                                }
                              }}
                              className={`w-7 h-7 border-2 rounded-sm flex items-center justify-center transition-all cursor-pointer ${formData.verified ? "bg-white border-white" : "bg-white border-[#c1c1c1] hover:border-[#b2b2b2]"
                                }`}
                            >
                              {formData.verified ? (
                                <div className="text-green-600 animate-in zoom-in duration-300">
                                  <Icons.ShieldCheck size={26} strokeWidth={3} />
                                </div>
                              ) : (
                                <div className="w-full h-full" />
                              )}
                            </div>
                            <span className="text-sm font-medium text-[#555]">I'm not a robot</span>
                          </div>
                          <div className="flex flex-col items-center opacity-80">
                            <img
                              src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
                              alt="reCAPTCHA"
                              className="w-8 h-8 object-contain mb-1"
                            />
                            <div className="text-[8px] text-[#555] font-bold text-center leading-tight">
                              reCAPTCHA<br />
                              <span className="font-normal text-[7px] opacity-70 italic">Privacy - Terms</span>
                            </div>
                          </div>
                        </div>
                        {!formData.verified && (
                          <p className="text-[10px] text-gray-400 mt-2 ml-1 italic font-medium">Please verify you are human before submitting.</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`py-3 px-8 text-sm font-bold rounded-xl transition-all duration-300 flex items-center gap-2 ${currentStep === 1 ? "opacity-0 invisible" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                  >
                    ← Back
                  </button>

                  <div className="flex items-center gap-4">
                    {currentStep < 5 && (
                      <button type="button" onClick={nextStep} className="text-xs font-bold text-gray-400 hover:text-blue-600 transition-colors">Skip &gt;</button>
                    )}
                    <button
                      type="button"
                      onClick={currentStep === 5 ? handleSubmit : nextStep}
                      disabled={isSubmitting}
                      className="py-3.5 px-10 bg-blue-600 hover:bg-indigo-700 text-white font-black rounded-xl shadow-xl shadow-blue-200 hover:shadow-indigo-200 hover:-translate-y-0.5 transition-all duration-300 text-sm flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        currentStep === 5 ? "Register Now" : "Next Step →"
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer in Registration */}
        <div className="mt-16 text-center">
          <p className="text-gray-900 font-bold text-xl mb-6">Our Students are Our Reference</p>
          <div className="flex justify-center flex-col items-center gap-4 group">
            <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-white group-hover:bg-blue-600 transition-colors duration-500 shadow-xl shadow-gray-200">
              <span className="font-bold text-xl">G</span>
            </div>
            <span className="text-[10px] font-bold text-gray-400 tracking-[0.3em] uppercase group-hover:text-gray-600 transition-colors">Global Academic Pathway</span>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-[120px] -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-100/30 rounded-full blur-[100px] translate-x-1/4" />
      </div>
    </div>
  );
}
