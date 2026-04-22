import React, { useState, useEffect } from "react";
import * as Icons from "../components/Icons";

type Module = "Summary" | "Registrations" | "Consultations" | "Events" | "Universities";

const IMGBB_API_KEY = "8b86a561b76cd59e16d93c1098c5018a";
const API = "http://gap-server.vercel.app/api";

// ── Sub-Components (Moved Outside to Fix Focus Issues) ───────────────────

const UniversityEditModal = ({ editingUni, setEditingUni, handleSaveUni, isUploading, uploadToImgBB, uniSaving }: any) => {
  if (!editingUni) return null;
  return (
    <div className="fixed inset-0 bg-[#0f172a]/95 backdrop-blur-2xl z-[100] overflow-y-auto">
      <div className="min-h-screen flex items-start justify-center p-6 py-12">
        <div className="bg-white w-full max-w-5xl rounded-[3rem] p-10 lg:p-16 shadow-2xl relative">
          <button
            onClick={() => setEditingUni(null)}
            className="absolute top-8 right-8 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <Icons.Plus size={20} className="rotate-45" />
          </button>

          <div className="mb-10">
            <span className="inline-block px-4 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-3">
              {editingUni._id ? "Edit University" : "Add New University"}
            </span>
            <h2 className="text-4xl font-black text-gray-900 tracking-tighter italic">
              {editingUni._id ? editingUni.name : "New Institution"}
            </h2>
          </div>

          <form onSubmit={handleSaveUni} className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">University Name *</label>
                <input type="text" required value={editingUni.name || ""} onChange={e => setEditingUni({ ...editingUni, name: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all" placeholder="e.g. University of Manchester" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Country *</label>
                <input type="text" required value={editingUni.country || ""} onChange={e => setEditingUni({ ...editingUni, country: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all" placeholder="e.g. UK" />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Logo (ImgBB Upload)</label>
                <div className="flex gap-3 items-center">
                  {editingUni.logo && (
                    <img src={editingUni.logo} className="h-16 w-24 object-contain bg-gray-50 rounded-xl border border-gray-100 p-2 shrink-0" alt="logo" />
                  )}
                  <div className="relative flex-1">
                    <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={e => e.target.files?.[0] && uploadToImgBB(e.target.files[0], "logo_edit", (url: string) => setEditingUni((prev: any) => ({ ...prev, logo: url })))} />
                    <div className={`w-full px-6 py-5 border-2 border-dashed rounded-2xl text-center text-[10px] font-black uppercase tracking-widest ${isUploading === "logo_edit" ? "border-blue-400 bg-blue-50 text-blue-600 animate-pulse" : "border-gray-200 bg-gray-50 text-gray-400 hover:border-blue-400 hover:bg-blue-50"}`}>
                      {isUploading === "logo_edit" ? "Uploading..." : "📁 Upload New Logo"}
                    </div>
                  </div>
                </div>
                <input type="text" value={editingUni.logo || ""} onChange={e => setEditingUni({ ...editingUni, logo: e.target.value })} className="w-full mt-2 px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold" />
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Cover Image (ImgBB Upload)</label>
                <div className="flex gap-3 items-center">
                  {editingUni.coverImage && (
                    <img src={editingUni.coverImage} className="h-16 w-24 object-cover bg-gray-50 rounded-xl border border-gray-100 shrink-0" alt="cover" />
                  )}
                  <div className="relative flex-1">
                    <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={e => e.target.files?.[0] && uploadToImgBB(e.target.files[0], "cover_edit", (url: string) => setEditingUni((prev: any) => ({ ...prev, coverImage: url })))} />
                    <div className={`w-full px-6 py-5 border-2 border-dashed rounded-2xl text-center text-[10px] font-black uppercase tracking-widest ${isUploading === "cover_edit" ? "border-indigo-400 bg-indigo-50 text-indigo-600 animate-pulse" : "border-gray-200 bg-gray-50 text-gray-400 hover:border-indigo-400 hover:bg-indigo-50"}`}>
                      {isUploading === "cover_edit" ? "Uploading..." : "🖼️ Upload Cover Image"}
                    </div>
                  </div>
                </div>
                <input type="text" value={editingUni.coverImage || ""} onChange={e => setEditingUni({ ...editingUni, coverImage: e.target.value })} className="w-full mt-2 px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold" />
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
              <input type="text" value={editingUni.ranking || ""} onChange={e => setEditingUni({ ...editingUni, ranking: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold" placeholder="Ranking" />
              <input type="text" value={editingUni.tuitionFees || ""} onChange={e => setEditingUni({ ...editingUni, tuitionFees: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold" placeholder="Tuition" />
              <input type="text" value={editingUni.intakeDates || ""} onChange={e => setEditingUni({ ...editingUni, intakeDates: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold" placeholder="Intakes" />
            </div>

            <textarea value={editingUni.description || ""} onChange={e => setEditingUni({ ...editingUni, description: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold h-20 resize-none" placeholder="Short Description" />
            <textarea value={editingUni.overview || ""} onChange={e => setEditingUni({ ...editingUni, overview: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold h-36 resize-none" placeholder="Full Overview" />

            <div className="flex gap-4 pt-4">
              <button type="submit" disabled={uniSaving || !!isUploading} className="flex-1 py-6 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-[0.2em] text-xs shadow-2xl hover:bg-blue-700 transition-all disabled:bg-gray-300">
                {uniSaving ? "Saving..." : editingUni._id ? "💾 Save Changes" : "🚀 Create University"}
              </button>
              <button type="button" onClick={() => setEditingUni(null)} className="px-10 py-6 bg-gray-100 text-gray-500 font-black rounded-2xl uppercase tracking-[0.2em] text-xs hover:bg-gray-200 transition-all">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const EventForm = ({ editingEvent, setEditingEvent, handleSaveEvent, isUploading, uploadToImgBB, eventSaving }: any) => {
  if (!editingEvent) return null;
  return (
    <div className="fixed inset-0 bg-gray-950/90 backdrop-blur-md z-[100] flex items-center justify-center p-4 lg:p-10 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-5xl h-full lg:h-auto lg:max-h-[90vh] rounded-[2rem] lg:rounded-[3rem] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
        <div className="p-6 lg:p-10 border-b border-gray-100 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-2xl lg:text-3xl font-black text-gray-900 italic tracking-tighter">{editingEvent._id ? 'Modify Protocol' : 'Initiate New Event'}</h2>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Authorized Administrative Strategy</p>
          </div>
          <button onClick={() => setEditingEvent(null)} className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:bg-red-50 hover:text-red-600 transition-all"><Icons.Plus className="rotate-45" size={24} /></button>
        </div>

        <form onSubmit={handleSaveEvent} className="flex-1 overflow-y-auto p-6 lg:p-12 space-y-10 custom-scrollbar">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Left Column: Basic Info */}
            <div className="space-y-8">
              <section>
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-4">Core Identity & Narrative</p>
                <div className="space-y-4">
                  <input type="text" placeholder="Event Title" value={editingEvent.title} onChange={e => setEditingEvent({ ...editingEvent, title: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold text-sm focus:bg-white focus:ring-4 focus:ring-emerald-50 transition-all" required />
                  <input type="text" placeholder="Hook / Short Tagline" value={editingEvent.hook} onChange={e => setEditingEvent({ ...editingEvent, hook: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold text-sm focus:bg-white focus:ring-4 focus:ring-emerald-50 transition-all" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Type (e.g. Fair, Seminar)" value={editingEvent.type} onChange={e => setEditingEvent({ ...editingEvent, type: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold text-sm focus:bg-white focus:ring-4 focus:ring-emerald-50 transition-all" />
                    <input type="text" placeholder="Organizer" value={editingEvent.organizer} onChange={e => setEditingEvent({ ...editingEvent, organizer: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold text-sm focus:bg-white focus:ring-4 focus:ring-emerald-50 transition-all" />
                  </div>
                </div>
              </section>

              <section>
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-4">Logistics & Location</p>
                <div className="space-y-4">
                  <input type="text" placeholder="Venue Location / Address" value={editingEvent.location} onChange={e => setEditingEvent({ ...editingEvent, location: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold text-sm focus:bg-white focus:ring-4 focus:ring-emerald-50 transition-all" required />
                  <input type="text" placeholder="Google Maps Link" value={editingEvent.mapLink} onChange={e => setEditingEvent({ ...editingEvent, mapLink: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold text-sm focus:bg-white focus:ring-4 focus:ring-emerald-50 transition-all" />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-2">Event Date</label>
                      <input type="date" value={editingEvent.date} onChange={e => setEditingEvent({ ...editingEvent, date: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold text-sm focus:bg-white focus:ring-4 focus:ring-emerald-50 transition-all" required />
                    </div>
                    <div>
                      <label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-2">Start Time</label>
                      <input type="time" value={editingEvent.time} onChange={e => setEditingEvent({ ...editingEvent, time: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold text-sm focus:bg-white focus:ring-4 focus:ring-emerald-50 transition-all" />
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-4">Visual Content & Status</p>
                <div className="space-y-4">
                  <div className="flex gap-4 items-center mb-4">
                    <div className="w-24 h-24 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                      {editingEvent.image ? <img src={editingEvent.image} className="w-full h-full object-cover" alt="" /> : <Icons.Globe size={24} className="text-gray-200" />}
                    </div>
                    <div className="flex-1 space-y-2">
                      <input type="file" id="event-banner" hidden onChange={e => e.target.files?.[0] && uploadToImgBB(e.target.files[0], "image", (url: string) => setEditingEvent({ ...editingEvent, image: url }))} />
                      <label htmlFor="event-banner" className="inline-block px-6 py-3 bg-gray-900 text-white text-[9px] font-black uppercase tracking-widest rounded-xl cursor-pointer hover:bg-emerald-600 transition-all">
                        {isUploading === "image" ? "Processing..." : "Upload Banner"}
                      </label>
                      <p className="text-[8px] text-gray-400 uppercase font-black tracking-widest">Recommended: 1200x600px High-Res</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-5 bg-emerald-50 rounded-2xl">
                    <input type="checkbox" id="event-featured" checked={!!editingEvent.featured} onChange={e => setEditingEvent({ ...editingEvent, featured: e.target.checked })} className="w-5 h-5 accent-emerald-600 cursor-pointer" />
                    <label htmlFor="event-featured" className="text-[10px] font-black text-gray-700 uppercase tracking-widest cursor-pointer">Feature on Event Directory</label>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column: Content Lists */}
            <div className="space-y-8">
              <section>
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-4">Event Narrative</p>
                <textarea placeholder="Comprehensive Description" value={editingEvent.description} onChange={e => setEditingEvent({ ...editingEvent, description: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold text-sm focus:bg-white focus:ring-4 focus:ring-emerald-50 transition-all h-32 resize-none" />
              </section>

              <section>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Key Highlights</p>
                  <button type="button" onClick={() => setEditingEvent({ ...editingEvent, highlights: [...(editingEvent.highlights || []), ""] })} className="text-[10px] font-black text-emerald-600 uppercase hover:underline">+ Add Highlight</button>
                </div>
                <div className="space-y-2">
                  {(editingEvent.highlights || [""]).map((h: string, i: number) => (
                    <div key={i} className="flex gap-2">
                      <input type="text" value={h} onChange={e => {
                        const newH = [...editingEvent.highlights];
                        newH[i] = e.target.value;
                        setEditingEvent({ ...editingEvent, highlights: newH });
                      }} placeholder={`Highlight ${i + 1}`} className="flex-1 px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold text-xs" />
                      <button type="button" onClick={() => setEditingEvent({ ...editingEvent, highlights: editingEvent.highlights.filter((_: any, idx: number) => idx !== i) })} className="p-3 text-red-300 hover:text-red-500"><Icons.Plus className="rotate-45" size={16} /></button>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Student Benefits</p>
                  <button type="button" onClick={() => setEditingEvent({ ...editingEvent, benefits: [...(editingEvent.benefits || []), ""] })} className="text-[10px] font-black text-emerald-600 uppercase hover:underline">+ Add Benefit</button>
                </div>
                <div className="space-y-2">
                  {(editingEvent.benefits || [""]).map((b: string, i: number) => (
                    <div key={i} className="flex gap-2">
                      <input type="text" value={b} onChange={e => {
                        const newB = [...editingEvent.benefits];
                        newB[i] = e.target.value;
                        setEditingEvent({ ...editingEvent, benefits: newB });
                      }} placeholder={`Benefit ${i + 1}`} className="flex-1 px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold text-xs" />
                      <button type="button" onClick={() => setEditingEvent({ ...editingEvent, benefits: editingEvent.benefits.filter((_: any, idx: number) => idx !== i) })} className="p-3 text-red-300 hover:text-red-500"><Icons.Plus className="rotate-45" size={16} /></button>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Target Audience</p>
                  <button type="button" onClick={() => setEditingEvent({ ...editingEvent, targetAudience: [...(editingEvent.targetAudience || []), ""] })} className="text-[10px] font-black text-emerald-600 uppercase hover:underline">+ Add Segment</button>
                </div>
                <div className="space-y-2">
                  {(editingEvent.targetAudience || [""]).map((t: string, i: number) => (
                    <div key={i} className="flex gap-2">
                      <input type="text" value={t} onChange={e => {
                        const newT = [...(editingEvent.targetAudience || [])];
                        newT[i] = e.target.value;
                        setEditingEvent({ ...editingEvent, targetAudience: newT });
                      }} placeholder={`Segment ${i + 1}`} className="flex-1 px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold text-xs" />
                      <button type="button" onClick={() => setEditingEvent({ ...editingEvent, targetAudience: (editingEvent.targetAudience || []).filter((_: any, idx: number) => idx !== i) })} className="p-3 text-red-300 hover:text-red-500"><Icons.Plus className="rotate-45" size={16} /></button>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-6">Expert Representative</p>
                <div className="p-6 bg-gray-50/50 border border-gray-100 rounded-3xl space-y-6">
                  <div className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden shrink-0">
                      {editingEvent.representative?.image ? <img src={editingEvent.representative.image} className="w-full h-full object-cover" alt="" /> : <Icons.User size={24} className="text-gray-300" />}
                    </div>
                    <div className="flex-1 space-y-2">
                      <input type="file" id="rep-photo" hidden onChange={e => e.target.files?.[0] && uploadToImgBB(e.target.files[0], "rep_photo", (url: string) => setEditingEvent({ ...editingEvent, representative: { ...editingEvent.representative, image: url } }))} />
                      <label htmlFor="rep-photo" className="inline-block px-4 py-2 bg-white border border-gray-200 text-[8px] font-black uppercase tracking-widest rounded-lg cursor-pointer hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all">
                        {isUploading === "rep_photo" ? "Uploading..." : "Upload Profile"}
                      </label>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Full Name" value={editingEvent.representative?.name} onChange={e => setEditingEvent({ ...editingEvent, representative: { ...editingEvent.representative, name: e.target.value } })} className="w-full px-5 py-3 bg-white border border-gray-100 rounded-xl outline-none font-bold text-xs focus:ring-4 focus:ring-emerald-50 transition-all" />
                    <input type="text" placeholder="Official Role" value={editingEvent.representative?.role} onChange={e => setEditingEvent({ ...editingEvent, representative: { ...editingEvent.representative, role: e.target.value } })} className="w-full px-5 py-3 bg-white border border-gray-100 rounded-xl outline-none font-bold text-xs focus:ring-4 focus:ring-emerald-50 transition-all" />
                  </div>
                  <textarea placeholder="Brief Professional Biography" value={editingEvent.representative?.bio} onChange={e => setEditingEvent({ ...editingEvent, representative: { ...editingEvent.representative, bio: e.target.value } })} className="w-full px-5 py-3 bg-white border border-gray-100 rounded-xl outline-none font-bold text-xs focus:ring-4 focus:ring-emerald-50 transition-all h-20 resize-none" />
                </div>
              </section>
            </div>
          </div>

          <div className="pt-10 flex gap-4 shrink-0">
            <button type="button" onClick={() => setEditingEvent(null)} className="flex-1 py-6 bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-gray-100 transition-all">Discard Draft</button>
            <button type="submit" disabled={eventSaving} className="flex-[2] py-6 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-emerald-100 hover:bg-gray-900 transition-all">
              {eventSaving ? "Synchronizing..." : "Publish Intelligence Module"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeModule, setActiveModule] = useState<Module>("Summary");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Data States
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [universities, setUniversities] = useState<any[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);

  // General Form States
  const [isAdding, setIsAdding] = useState(false);
  const [isUploading, setIsUploading] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({ representative: {}, benefits: [""], targetAudience: [""] });

  // University Edit States
  const [editingUni, setEditingUni] = useState<any | null>(null);
  const [uniSaving, setUniSaving] = useState(false);
  const [uniSearch, setUniSearch] = useState("");

  // Event Edit States
  const [editingEvent, setEditingEvent] = useState<any | null>(null);

  const getToken = () => localStorage.getItem("gap_admin_token") || "";

  useEffect(() => {
    const token = getToken();
    if (token) verifyToken(token);
    else setLoading(false);
  }, []);

  const verifyToken = async (token: string) => {
    try {
      const res = await fetch(`${API}/auth/me`, { headers: { "Authorization": `Bearer ${token}` } });
      const result = await res.json();
      if (result.success) {
        setIsAuthenticated(true);
        fetchAllData(token);
      } else {
        if (res.status === 401) localStorage.removeItem("gap_admin_token");
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error("Token verification failed (network):", err);
    } finally { setLoading(false); }
  };

  const fetchAllData = async (token: string) => {
    setLoading(true);
    const headers = { "Authorization": `Bearer ${token}` };
    try {
      const [regRes, eveRes, uniRes, conRes] = await Promise.all([
        fetch(`${API}/registration`, { headers }),
        fetch(`${API}/events`, { headers }),
        fetch(`${API}/universities`, { headers }),
        fetch(`${API}/consultations`, { headers })
      ]);
      const [reg, eve, uni, con] = await Promise.all([regRes.json(), eveRes.json(), uniRes.json(), conRes.json()]);
      if (reg.success) setRegistrations(reg.data);
      if (eve.success) setEvents(eve.data);
      if (uni.success) setUniversities(uni.data);
      if (con.success) setConsultations(con.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const result = await res.json();
      if (result.success) {
        localStorage.setItem("gap_admin_token", result.token);
        setIsAuthenticated(true);
        fetchAllData(result.token);
      } else setLoginError(result.message);
    } catch (err) { setLoginError("Connection failed"); }
  };

  const uploadToImgBB = async (file: File, fieldPath: string, onDone?: (url: string) => void) => {
    setIsUploading(fieldPath);
    const fd = new FormData();
    fd.append("image", file);
    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, { method: "POST", body: fd });
      const result = await res.json();
      if (result.success) {
        const url = result.data.url;
        if (onDone) {
          onDone(url);
        } else {
          setFormData((prev: any) => ({ ...prev, [fieldPath]: url }));
        }
      }
    } catch (err) { alert("Upload failed. Please try again."); }
    finally { setIsUploading(null); }
  };

  // ── University CRUD ──────────────────────────────
  const handleDeleteUni = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    const token = getToken();
    try {
      await fetch(`${API}/universities/${id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${token}` } });
      setUniversities(prev => prev.filter(u => u._id !== id));
    } catch (err) { alert("Delete failed"); }
  };

  const handleDeleteRegistration = async (id: string, name: string) => {
    if (!confirm(`Permanently delete registration for "${name}"?`)) return;
    const token = getToken();
    try {
      const res = await fetch(`${API}/registration/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        setRegistrations(prev => prev.filter(r => r._id !== id));
        setSelectedRegistration(null);
      }
    } catch (err) { alert("Delete failed"); }
  };

  const handleDeleteConsultation = async (id: string, name: string) => {
    if (!confirm(`Delete consultation record for "${name}"?`)) return;
    const token = getToken();
    try {
      const res = await fetch(`${API}/consultations/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        setConsultations(prev => prev.filter(c => c._id !== id));
        setSelectedConsultation(null);
      }
    } catch (err) { alert("Delete failed"); }
  };

  const handleUpdateConsultationStatus = async (id: string, status: string) => {
    const token = getToken();
    try {
      const res = await fetch(`${API}/consultations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setConsultations(prev => prev.map(c => c._id === id ? { ...c, status } : c));
        if (selectedConsultation?._id === id) setSelectedConsultation(prev => ({ ...prev, status }));
      }
    } catch (err) { alert("Update failed"); }
  };

  const handleDeleteEvent = async (id: string, title: string) => {
    if (!confirm(`Permanently delete event "${title}"?`)) return;
    const token = getToken();
    try {
      const res = await fetch(`${API}/events/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        setEvents(prev => prev.filter(e => e._id !== id));
      }
    } catch (err) { alert("Delete failed"); }
  };

  const [eventSaving, setEventSaving] = useState(false);
  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setEventSaving(true);
    const token = getToken();
    try {
      const isNew = !editingEvent._id;
      const url = isNew ? `${API}/events` : `${API}/events/${editingEvent._id}`;
      const method = isNew ? "POST" : "PATCH";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(editingEvent),
      });
      if (res.ok) {
        await fetchAllData(token);
        setEditingEvent(null);
      } else alert("Save failed");
    } catch (err) { alert("Save failed"); }
    finally { setEventSaving(false); }
  };

  const handleSaveUni = async (e: React.FormEvent) => {
    e.preventDefault();
    setUniSaving(true);
    const token = getToken();
    try {
      const isNew = !editingUni._id;
      const url = isNew ? `${API}/universities` : `${API}/universities/${editingUni._id}`;
      const method = isNew ? "POST" : "PATCH";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(editingUni),
      });
      const result = await res.json();
      if (result.success || res.ok) {
        await fetchAllData(token);
        setEditingUni(null);
      } else alert("Save failed: " + (result.message || "Unknown error"));
    } catch (err) { alert("Save failed"); }
    finally { setUniSaving(false); }
  };

  const openNewUni = () => setEditingUni({
    name: "", country: "", ranking: "", description: "", overview: "",
    logo: "", coverImage: "", location: "", scholarships: "", tuitionFees: "",
    intakeDates: "", englishRequirements: "", undergradRequirements: "", postgradRequirements: "",
    popularCourses: [], highlights: [], featured: false,
  });

  const openNewEvent = () => setEditingEvent({
    title: "", hook: "", organizer: "", date: new Date().toISOString().split('T')[0], time: "10:00", location: "", mapLink: "", description: "",
    image: "", type: "Fair", featured: false,
    representative: { name: "", role: "", bio: "", image: "" },
    highlights: [""], benefits: [""], targetAudience: [""]
  });

  // Selected Item States
  const [selectedRegistration, setSelectedRegistration] = useState<any | null>(null);
  const [selectedConsultation, setSelectedConsultation] = useState<any | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getToken();
    const endpoint = activeModule.toLowerCase().replace('registrations', 'registration');
    try {
      const res = await fetch(`${API}/${endpoint}`, {
        method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsAdding(false);
        setFormData({ representative: {}, benefits: [""], targetAudience: [""] });
        fetchAllData(token);
      }
    } catch (err) { console.error(err); }
  };

  // ── UI States ──────────────────────────────────
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ── Sub-Views ────────────────────────────────────
  const SummaryView = () => (
    <div className="space-y-6 lg:space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
        {[
          { id: "Registrations" as Module, label: "Registrations", count: registrations.length, icon: <Icons.FileText size={24} />, color: "bg-blue-600" },
          { id: "Consultations" as Module, label: "Consultations", count: consultations.length, icon: <Icons.Phone size={24} />, color: "bg-orange-600" },
          { id: "Events" as Module, label: "Events", count: events.length, icon: <Icons.Globe size={24} />, color: "bg-emerald-600" },
          { id: "Universities" as Module, label: "Universities", count: universities.length, icon: <Icons.GraduationCap size={24} />, color: "bg-indigo-600" },
        ].map((stat, i) => (
          <button key={i} onClick={() => setActiveModule(stat.id)} className="text-left bg-white p-6 lg:p-8 rounded-[2rem] lg:rounded-[2.5rem] border border-gray-100 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
            <div className={`w-12 h-12 lg:w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center text-white mb-4 lg:mb-6 shadow-lg`}>{stat.icon}</div>
            <div className="text-3xl lg:text-4xl font-black text-gray-900 mb-1">{stat.count}</div>
            <div className="text-[9px] lg:text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</div>
          </button>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
        <div className="bg-white p-6 lg:p-10 rounded-[2rem] lg:rounded-[3rem] border border-gray-100 shadow-sm">
          <h3 className="text-base lg:text-lg font-black text-gray-900 mb-6 lg:mb-8">Recent Registrations</h3>
          <div className="space-y-3 lg:space-y-4">
            {registrations.slice(0, 5).map((r: any) => (
              <div
                key={r._id}
                onClick={() => { setActiveModule("Registrations"); setSelectedRegistration(r); }}
                className="flex items-center justify-between p-4 lg:p-5 bg-gray-50/50 rounded-xl lg:rounded-2xl hover:bg-blue-50 cursor-pointer transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-black text-gray-900 truncate">{r.fullName}</div>
                  <div className="text-[10px] text-gray-400 truncate">{r.email}</div>
                </div>
                <div className="text-[10px] font-black text-blue-600 bg-white px-3 py-1 rounded-lg shrink-0 ml-4">{r.programName?.split(' ')[0] || 'App'}</div>
              </div>
            ))}
            {registrations.length === 0 && <p className="text-center py-10 text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">No Data Available</p>}
          </div>
        </div>
        <div className="bg-white p-6 lg:p-10 rounded-[2rem] lg:rounded-[3rem] border border-gray-100 shadow-sm">
          <h3 className="text-base lg:text-lg font-black text-gray-900 mb-6 lg:mb-8 text-orange-600">Active Consultations</h3>
          <div className="space-y-3 lg:space-y-4">
            {consultations.slice(0, 5).map((c: any) => (
              <div key={c._id} className="flex items-center justify-between p-4 lg:p-5 bg-gray-50/50 rounded-xl lg:rounded-2xl">
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-black text-gray-900 truncate">{c.name}</div>
                  <div className="text-[10px] text-gray-400 truncate">{c.mobile}</div>
                </div>
                <div className="text-[10px] font-black text-orange-600 bg-white px-3 py-1 rounded-lg shrink-0 ml-4">{c.country}</div>
              </div>
            ))}
            {consultations.length === 0 && <p className="text-center py-10 text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">No Consultations</p>}
          </div>
        </div>
      </div>
    </div>
  );

  const RegistrationDetailsView = ({ reg }: { reg: any }) => (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-6 lg:space-y-10 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => setSelectedRegistration(null)}
          className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-blue-600 transition-colors w-fit"
        >
          <Icons.Plus className="rotate-45" size={16} /> Back to Dashboard
        </button>
        <button
          onClick={() => handleDeleteRegistration(reg._id, reg.fullName)}
          className="flex items-center justify-center gap-3 px-6 py-3 bg-red-50 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-red-500 hover:text-white transition-all sm:w-fit"
        >
          <Icons.Trash size={14} /> Remove Registration
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
        {/* Profile Card */}
        <div className="w-full lg:w-4/12 bg-white rounded-[2.5rem] lg:rounded-[3.5rem] p-8 lg:p-10 border border-gray-100 shadow-sm">
          <div className="w-20 h-20 lg:w-24 h-24 bg-blue-600 text-white rounded-[1.5rem] lg:rounded-[2rem] flex items-center justify-center text-2xl lg:text-3xl font-black mb-6 lg:mb-8 shadow-xl shadow-blue-100 mx-auto lg:mx-0">
            {reg.fullName?.charAt(0)}
          </div>
          <h2 className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tighter italic mb-2 text-center lg:text-left">{reg.fullName}</h2>
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-8 text-center lg:text-left">Registered Student Candidate</p>

          <div className="space-y-5 lg:space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 shrink-0"><Icons.Mail size={18} /></div>
              <div className="min-w-0 flex-1"><div className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Email</div><div className="text-sm font-bold text-gray-700 truncate">{reg.email}</div></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 shrink-0"><Icons.Phone size={18} /></div>
              <div className="min-w-0 flex-1"><div className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Mobile</div><div className="text-sm font-bold text-gray-700 truncate">{reg.mobile}</div></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 shrink-0"><Icons.Globe size={18} /></div>
              <div className="min-w-0 flex-1"><div className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Origin</div><div className="text-sm font-bold text-gray-700 truncate">{reg.country || 'Not Specified'}</div></div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="flex-1 w-full space-y-6 lg:space-y-8">
          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-white p-8 lg:p-10 rounded-[2rem] lg:rounded-[3rem] border border-gray-100 shadow-sm">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 lg:mb-6">Academic Background</p>
              <div className="space-y-4">
                <div className="flex justify-between items-center gap-2"><span className="text-[11px] lg:text-sm font-bold text-gray-500">Qualification</span><span className="text-[11px] lg:text-sm font-black text-gray-900 text-right">{reg.qualification || '—'}</span></div>
                <div className="flex justify-between items-center gap-2"><span className="text-[11px] lg:text-sm font-bold text-gray-500">Current Course</span><span className="text-[11px] lg:text-sm font-black text-gray-900 text-right">{reg.currentCourse || '—'}</span></div>
                <div className="flex justify-between items-center gap-2"><span className="text-[11px] lg:text-sm font-bold text-gray-500">Graduation Year</span><span className="text-[11px] lg:text-sm font-black text-gray-900 text-right">{reg.graduationYear || '—'}</span></div>
              </div>
            </div>
            <div className="bg-white p-8 lg:p-10 rounded-[2rem] lg:rounded-[3rem] border border-gray-100 shadow-sm">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 lg:mb-6">Target Application</p>
              <div className="space-y-4">
                <div className="flex justify-between items-center gap-2"><span className="text-[11px] lg:text-sm font-bold text-gray-500">Program</span><span className="text-[11px] lg:text-sm font-black text-blue-600 text-right">{reg.programName || '—'}</span></div>
                <div className="flex justify-between items-center gap-2"><span className="text-[11px] lg:text-sm font-bold text-gray-500">Subject</span><span className="text-[11px] lg:text-sm font-black text-gray-900 text-right">{reg.subject || '—'}</span></div>
                <div className="flex justify-between items-center gap-2"><span className="text-[11px] lg:text-sm font-bold text-gray-500">University</span><span className="text-[11px] lg:text-sm font-black text-gray-900 text-right">{reg.universityName || '—'}</span></div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 lg:p-10 rounded-[2rem] lg:rounded-[3rem] border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Language Proficiency & Status</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">
              <div>
                <div className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Language Test</div>
                <div className="text-base lg:text-lg font-black text-gray-900">{reg.languageTest || 'None'}</div>
              </div>
              <div>
                <div className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Score</div>
                <div className="text-base lg:text-lg font-black text-blue-600">{reg.score || '—'}</div>
              </div>
              <div>
                <div className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Date Applied</div>
                <div className="text-base lg:text-lg font-black text-gray-900">{new Date(reg.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-8 lg:p-10 rounded-[2rem] lg:rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
              <Icons.GraduationCap size={160} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <p className="text-[9px] font-black uppercase tracking-widest text-white/40">Administrative Strategy</p>
              </div>
              <p className="text-lg lg:text-xl font-bold leading-relaxed italic opacity-80 mb-8">
                Review candidate's academic eligibility against {reg.universityName || 'target institutional'} standards and initiate admission protocol.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ConsultationDetailsView = ({ con }: { con: any }) => (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-6 lg:space-y-10 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => setSelectedConsultation(null)}
          className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-orange-600 transition-colors w-fit"
        >
          <Icons.Plus className="rotate-45" size={16} /> Back to Dashboard
        </button>
        <button
          onClick={() => handleDeleteConsultation(con._id, con.name)}
          className="flex items-center justify-center gap-3 px-6 py-3 bg-red-50 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-red-500 hover:text-white transition-all sm:w-fit"
        >
          <Icons.Trash size={14} /> Delete Case
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
        {/* Profile Card */}
        <div className="w-full lg:w-4/12 bg-white rounded-[2.5rem] lg:rounded-[3.5rem] p-8 lg:p-10 border border-gray-100 shadow-sm">
          <div className="w-20 h-20 lg:w-24 h-24 bg-orange-600 text-white rounded-[1.5rem] lg:rounded-[2rem] flex items-center justify-center text-2xl lg:text-3xl font-black mb-6 lg:mb-8 shadow-xl shadow-orange-100 mx-auto lg:mx-0">
            {con.name?.charAt(0)}
          </div>
          <h2 className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tighter italic mb-2 text-center lg:text-left">{con.name}</h2>
          <p className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em] mb-8 text-center lg:text-left">Inquiry Intelligence Case</p>

          <div className="space-y-5 lg:space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 shrink-0"><Icons.Mail size={18} /></div>
              <div className="min-w-0 flex-1"><div className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Email</div><div className="text-sm font-bold text-gray-700 truncate">{con.email}</div></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 shrink-0"><Icons.Phone size={18} /></div>
              <div className="min-w-0 flex-1"><div className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Mobile</div><div className="text-sm font-bold text-gray-700 truncate">{con.mobile}</div></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 shrink-0"><Icons.Globe size={18} /></div>
              <div className="min-w-0 flex-1"><div className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Country</div><div className="text-sm font-bold text-gray-700 truncate">{con.country}</div></div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="flex-1 w-full space-y-6 lg:space-y-8">
          <div className="bg-white p-8 lg:p-10 rounded-[2rem] lg:rounded-[3rem] border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Subject Preference</p>
            <div className="text-xl lg:text-2xl font-black text-gray-900 italic tracking-tight">{con.subject || 'General Inquiry'}</div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-white p-8 lg:p-10 rounded-[2rem] lg:rounded-[3rem] border border-gray-100 shadow-sm">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Case Status</p>
              <div className={`inline-block px-4 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${con.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                {con.status || 'Pending'}
              </div>
              <div className="mt-6 flex gap-2">
                <button onClick={() => handleUpdateConsultationStatus(con._id, 'Active')} className="px-4 py-2 bg-emerald-600 text-white text-[9px] font-black rounded-lg uppercase tracking-widest">Mark Active</button>
                <button onClick={() => handleUpdateConsultationStatus(con._id, 'Resolved')} className="px-4 py-2 bg-gray-100 text-gray-600 text-[9px] font-black rounded-lg uppercase tracking-widest">Resolve</button>
              </div>
            </div>
            <div className="bg-white p-8 lg:p-10 rounded-[2rem] lg:rounded-[3rem] border border-gray-100 shadow-sm">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Case Timeline</p>
              <div className="text-sm font-bold text-gray-700">Received on:</div>
              <div className="text-lg font-black text-gray-900">{new Date(con.createdAt).toLocaleString()}</div>
            </div>
          </div>

          <div className="bg-orange-600 p-8 lg:p-10 rounded-[2rem] lg:rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <Icons.Phone size={200} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <p className="text-[9px] font-black uppercase tracking-widest text-white/60">Expert Analysis Required</p>
              </div>
              <p className="text-lg lg:text-xl font-bold leading-relaxed italic mb-8">
                Initiate student consultation protocol for "{con.subject}". Verify academic background and match with partner institutional portfolios in {con.country}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const EventsView = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
          Managing <span className="text-emerald-600">{events.length}</span> Published Events
        </p>
        <button
          onClick={openNewEvent}
          className="px-8 py-4 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-xl shadow-emerald-100 flex items-center justify-center gap-3 hover:scale-105 transition-all shrink-0"
        >
          <Icons.Plus size={18} /> Schedule New Event
        </button>
      </div>

      <div className="bg-white rounded-[1.5rem] lg:rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Banner</th>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Event Details</th>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Schedule</th>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Type/Status</th>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {events.map(event => (
              <tr key={event._id} className="hover:bg-emerald-50/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-20 h-12 rounded-lg bg-gray-100 overflow-hidden">
                    {event.image ? <img src={event.image} className="w-full h-full object-cover" alt="" /> : <div className="w-full h-full flex items-center justify-center text-[8px] font-black text-gray-300 uppercase">No Img</div>}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-black text-gray-900">{event.title}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-2"><Icons.Globe size={10} /> {event.location}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-[10px] font-black text-gray-900 uppercase tracking-wider">{event.date}</div>
                  <div className="text-[10px] text-gray-400">{event.time}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="w-fit px-2 py-0.5 bg-gray-100 text-gray-500 text-[8px] font-black uppercase rounded-md tracking-widest">{event.type}</span>
                    {(() => {
                      const isUpcoming = new Date(event.date) >= new Date(new Date().setHours(0, 0, 0, 0));
                      return (
                        <span className={`w-fit px-2 py-0.5 text-[8px] font-black uppercase rounded-md tracking-widest ${isUpcoming ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                          {isUpcoming ? 'Upcoming' : 'Completed'}
                        </span>
                      );
                    })()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 justify-end">
                    <button onClick={() => setEditingEvent({ ...event, highlights: event.highlights || [""], benefits: event.benefits || [""] })} className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-all"><Icons.Edit size={14} /></button>
                    <button onClick={() => handleDeleteEvent(event._id, event.title)} className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"><Icons.Trash size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );


  const TableView = ({ data, columns, onRowClick }: { data: any[], columns: string[], onRowClick?: (item: any) => void }) => (
    <div className="bg-white rounded-[1.5rem] lg:rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>{columns.map(c => <th key={c} className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">{c}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item) => (
              <tr
                key={item._id}
                onClick={() => onRowClick && onRowClick(item)}
                className={`hover:bg-blue-50/30 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
              >
                {columns.map(c => (
                  <td key={c} className="px-8 py-6 text-sm font-bold text-gray-700">
                    {c.toLowerCase() === 'name' || c.toLowerCase() === 'full name' ? item.name || item.fullName :
                      c.toLowerCase() === 'title' ? item.title :
                        c.toLowerCase() === 'status' ? <span className={`px-3 py-1 rounded-lg text-[10px] ${item.status === 'Upcoming' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>{item.status}</span> :
                          String(item[c.toLowerCase().replace(' ', '')] || item[c.toLowerCase()] || '-').slice(0, 30)}
                  </td>
                ))}
              </tr>
            ))}
            {data.length === 0 && <tr><td colSpan={columns.length} className="text-center py-20 text-[10px] font-black text-gray-300 uppercase tracking-widest">No entries found</td></tr>}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List */}
      <div className="md:hidden divide-y divide-gray-50">
        {data.map((item) => (
          <div
            key={item._id}
            onClick={() => onRowClick && onRowClick(item)}
            className="p-6 active:bg-gray-50 space-y-3"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm font-black text-gray-900">{item.name || item.fullName || item.title}</div>
                <div className="text-[10px] text-gray-400">{item.email || item.country || item.location}</div>
              </div>
              {item.status && <span className={`px-3 py-1 rounded-lg text-[9px] font-black ${item.status === 'Upcoming' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>{item.status}</span>}
            </div>
            <div className="flex gap-4">
              {columns.slice(2, 4).map(c => (
                <div key={c}>
                  <div className="text-[8px] font-black text-gray-300 uppercase tracking-widest mb-0.5">{c}</div>
                  <div className="text-[10px] font-bold text-gray-600">{String(item[c.toLowerCase().replace(' ', '')] || item[c.toLowerCase()] || '-').slice(0, 20)}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {data.length === 0 && <div className="text-center py-20 text-[10px] font-black text-gray-300 uppercase tracking-widest">No entries found</div>}
      </div>
    </div>
  );

  // University management view
  const filtered = universities.filter(u =>
    !uniSearch || u.name?.toLowerCase().includes(uniSearch.toLowerCase()) || u.country?.toLowerCase().includes(uniSearch.toLowerCase())
  );

  const UniversitiesView = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Search + Add */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
        <div className="relative flex-1">
          <Icons.Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or country..."
            value={uniSearch}
            onChange={e => setUniSearch(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl outline-none font-bold text-sm focus:ring-4 focus:ring-blue-50 shadow-sm"
          />
        </div>
        <button
          onClick={openNewUni}
          className="px-8 py-4 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-xl shadow-blue-100 flex items-center justify-center gap-3 hover:scale-105 transition-all shrink-0"
        >
          <Icons.Plus size={18} /> Add University
        </button>
      </div>

      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
        Showing <span className="text-blue-600">{filtered.length}</span> of {universities.length} institutions
      </p>

      <div className="bg-white rounded-[1.5rem] lg:rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest w-16 text-center">Logo</th>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Name</th>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Country</th>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Fees</th>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Intake</th>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(uni => (
              <tr key={uni._id} className="hover:bg-blue-50/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    {uni.logo
                      ? <img src={uni.logo} className="w-12 h-10 object-contain" alt={uni.name} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      : <div className="w-12 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-[9px] font-black text-gray-400">N/A</div>
                    }
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-black text-gray-900">{uni.name}</div>
                  {uni.description && <div className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">{uni.description}</div>}
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-lg">{uni.country}</span>
                </td>
                <td className="px-6 py-4 text-xs text-gray-500 font-bold">{uni.tuitionFees || '—'}</td>
                <td className="px-6 py-4 text-xs text-gray-500 font-bold">{uni.intakeDates || '—'}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 justify-end">
                    <button
                      onClick={() => setEditingUni({ ...uni })}
                      className="px-4 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all flex items-center gap-1.5"
                    >
                      <Icons.Edit size={12} /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUni(uni._id, uni.name)}
                      className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Icons.Trash size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ── LOADING & AUTH SCREENS ─────────────────────
  if (loading) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6">
      <div className="text-center space-y-6">
        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center p-3 shadow-2xl mx-auto">
          <img src="/logo.png" className="w-full h-full object-contain" alt="logo" />
        </div>
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.3em]">Verifying Authorization Network...</p>
      </div>
    </div>
  );

  if (!isAuthenticated) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 lg:p-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] lg:rounded-[3rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600" />
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center p-3 border border-gray-100 mx-auto mb-6 shadow-xl shadow-blue-50 transition-transform hover:scale-110 duration-500">
            <img src="/logo.png" className="w-full h-full object-contain" alt="logo" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 italic tracking-tighter">GAP Manager Portal</h1>
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-2">Enterprise Resource Management</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4 lg:space-y-6">
          <div className="relative">
            <Icons.Globe size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="w-full pl-16 pr-8 py-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all" />
          </div>
          <div className="relative">
            <Icons.Phone size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-16 pr-8 py-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all" />
          </div>
          {loginError && <p className="text-red-500 text-[10px] font-black text-center uppercase tracking-widest bg-red-50 py-3 rounded-xl border border-red-100">{loginError}</p>}
          <button className="w-full py-5 lg:py-6 bg-[#0f172a] text-white font-black rounded-2xl uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-gray-200 hover:bg-blue-600 transition-all">Secure Authentication</button>
        </form>
      </div>
    </div>
  );

  // ── MAIN LAYOUT ───────────────────────────────
  const tabs = ["Summary", "Registrations", "Consultations", "Events", "Universities"] as const;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Mobile Top Bar */}
      <div className="lg:hidden bg-[#0f172a] p-4 flex items-center justify-between sticky top-0 z-[60]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1.5"><img src="/logo.png" className="w-full h-full object-contain" alt="logo" /></div>
          <h1 className="text-white text-xs font-black uppercase tracking-widest">GAP Admin</h1>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-white bg-white/10 rounded-lg">
          {isSidebarOpen ? <Icons.Plus className="rotate-45" size={24} /> : <Icons.Globe size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] lg:hidden" onClick={() => setIsSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-72 bg-[#0f172a] p-8 flex flex-col items-center shrink-0 z-[80] transition-transform duration-500
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="mb-12 text-center hidden lg:block">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center p-3 shadow-2xl mb-6 mx-auto"><img src="/logo.png" className="w-full h-full object-contain" alt="logo" /></div>
          <h1 className="text-white text-xl font-black uppercase tracking-[0.2em]">GAP Admin</h1>
        </div>
        <nav className="w-full space-y-3 mt-10 lg:mt-0">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveModule(tab); setSelectedRegistration(null); setIsSidebarOpen(false); }}
              className={`w-full text-left px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-4 ${activeModule === tab ? "bg-blue-600 text-white shadow-2xl shadow-blue-900/50 scale-105" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
            >
              {tab === "Summary" && <Icons.Globe size={18} />}
              {tab === "Registrations" && <Icons.FileText size={18} />}
              {tab === "Consultations" && <Icons.Phone size={18} />}
              {tab === "Events" && <Icons.Calendar size={18} />}
              {tab === "Universities" && <Icons.GraduationCap size={18} />}
              {tab}
            </button>
          ))}
        </nav>
        <button onClick={() => { localStorage.removeItem("gap_admin_token"); setIsAuthenticated(false); }} className="mt-auto w-full py-4 text-[10px] font-black text-red-400 bg-red-400/10 rounded-2xl hover:bg-red-500 hover:text-white transition-all uppercase tracking-widest">Logout System</button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 min-h-screen overflow-x-hidden p-6 lg:p-10 relative bg-gray-50">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 lg:mb-10">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full" />
              <h1 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tighter">
                {selectedRegistration ? "Registration Case" : activeModule}
              </h1>
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic ml-5">
              {selectedRegistration ? `Protocol ID: ${selectedRegistration._id.slice(-8)}` : "Authorized Enterprise Node"}
            </p>
          </div>
          {!selectedRegistration && !selectedConsultation &&
            activeModule !== "Summary" &&
            activeModule !== "Universities" &&
            activeModule !== "Registrations" &&
            activeModule !== "Consultations" &&
            activeModule !== "Events" && (
              <button onClick={() => setIsAdding(true)} className="px-8 py-4 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-xl shadow-blue-100 flex items-center justify-center gap-3 hover:scale-105 transition-all">
                <Icons.Plus size={18} /> New {activeModule.slice(0, -1)}
              </button>
            )}
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-96 gap-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest animate-pulse">Syncing Database...</span>
          </div>
        ) : (
          <>
            {selectedRegistration && activeModule === "Registrations" ? (
              <RegistrationDetailsView reg={selectedRegistration} />
            ) : selectedConsultation && activeModule === "Consultations" ? (
              <ConsultationDetailsView con={selectedConsultation} />
            ) : (
              <div className="animate-in fade-in duration-500">
                {activeModule === "Summary" && <SummaryView />}
                {activeModule === "Registrations" && (
                  <TableView
                    data={registrations}
                    columns={["Full Name", "Email", "Mobile", "Country", "Program Name"]}
                    onRowClick={(item) => setSelectedRegistration(item)}
                  />
                )}
                {activeModule === "Consultations" && (
                  <TableView
                    data={consultations}
                    columns={["Name", "Email", "Mobile", "Country", "Status"]}
                    onRowClick={(item) => setSelectedConsultation(item)}
                  />
                )}
                {activeModule === "Events" && <EventsView />}
                {activeModule === "Universities" && <UniversitiesView />}
              </div>
            )}
          </>
        )}
      </main>

      <UniversityEditModal
        editingUni={editingUni}
        setEditingUni={setEditingUni}
        handleSaveUni={handleSaveUni}
        isUploading={isUploading}
        uploadToImgBB={uploadToImgBB}
        uniSaving={uniSaving}
      />

      <EventForm
        editingEvent={editingEvent}
        setEditingEvent={setEditingEvent}
        handleSaveEvent={handleSaveEvent}
        isUploading={isUploading}
        uploadToImgBB={uploadToImgBB}
        eventSaving={eventSaving}
      />
    </div>
  );
}
