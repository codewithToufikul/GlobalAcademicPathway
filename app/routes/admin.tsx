import React, { useState, useEffect } from "react";
import * as Icons from "../components/Icons";

type Module = "Summary" | "Registrations" | "Consultations" | "Events" | "Universities";

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeModule, setActiveModule] = useState<Module>("Summary");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Data States
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [consultations, setConsultations] = useState([]);

  // Form States
  const [isAdding, setIsAdding] = useState(false);
  const [isUploading, setIsUploading] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({
    representative: {},
    benefits: [""],
    targetAudience: [""]
  });

  useEffect(() => {
    const token = localStorage.getItem("gap_admin_token");
    if (token) verifyToken(token);
    else setLoading(false);
  }, []);

  const verifyToken = async (token: string) => {
    try {
      const res = await fetch("http://localhost:5001/api/auth/me", { headers: { "Authorization": `Bearer ${token}` } });
      const result = await res.json();
      if (result.success) {
        setIsAuthenticated(true);
        fetchAllData(token);
      } else localStorage.removeItem("gap_admin_token");
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const fetchAllData = async (token: string) => {
    setLoading(true);
    const headers = { "Authorization": `Bearer ${token}` };
    try {
      const [regRes, eveRes, uniRes, conRes] = await Promise.all([
        fetch("http://localhost:5001/api/registration", { headers }),
        fetch("http://localhost:5001/api/events", { headers }),
        fetch("http://localhost:5001/api/universities", { headers }),
        fetch("http://localhost:5001/api/consultations", { headers })
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
      const res = await fetch("http://localhost:5001/api/auth/login", { 
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

  const uploadToImgBB = async (file: File, fieldPath: string) => {
    const IMGBB_API_KEY = "b13867623348827e6515c0e12369680c";
    setIsUploading(fieldPath);
    const formDataUpload = new FormData();
    formDataUpload.append("image", file);
    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, { method: "POST", body: formDataUpload });
      const result = await res.json();
      if (result.success) {
        const url = result.data.url;
        if (fieldPath.includes("representative")) {
           setFormData((prev: any) => ({ ...prev, representative: { ...prev.representative, image: url } }));
        } else if (fieldPath === 'logo' || fieldPath === 'uniImage') {
           setFormData((prev: any) => ({ ...prev, [fieldPath]: url }));
        } else {
           setFormData((prev: any) => ({ ...prev, [fieldPath]: url }));
        }
      }
    } catch (err) { alert("Upload failed"); }
    finally { setIsUploading(null); }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("gap_admin_token");
    const endpoint = activeModule.toLowerCase().replace('registrations', 'registration');
    try {
      const res = await fetch(`http://localhost:5001/api/${endpoint}`, {
        method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsAdding(false);
        setFormData({ representative: {}, benefits: [""], targetAudience: [""] });
        fetchAllData(token!);
      }
    } catch (err) { console.error(err); }
  };

  // Views
  const SummaryView = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: "Registrations", count: registrations.length, icon: <Icons.FileText size={24} />, color: "bg-blue-600" },
          { label: "Consultations", count: consultations.length, icon: <Icons.Phone size={24} />, color: "bg-orange-600" },
          { label: "Events", count: events.length, icon: <Icons.Globe size={24} />, color: "bg-emerald-600" },
          { label: "Universities", count: universities.length, icon: <Icons.GraduationCap size={24} />, color: "bg-indigo-600" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm transition-all hover:shadow-xl">
            <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}>{stat.icon}</div>
            <div className="text-4xl font-black text-gray-900 mb-1">{stat.count}</div>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-black text-gray-900 mb-8">Recent Registrations</h3>
          <div className="space-y-4">
            {registrations.slice(0, 5).map((r: any) => (
              <div key={r._id} className="flex items-center justify-between p-5 bg-gray-50/50 rounded-2xl">
                <div><div className="text-sm font-black text-gray-900">{r.fullName}</div><div className="text-[10px] text-gray-400">{r.email}</div></div>
                <div className="text-[10px] font-black text-blue-600 bg-white px-3 py-1 rounded-lg">{r.programName?.split(' ')[0] || 'App'}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-black text-gray-900 mb-8 text-orange-600">Active Consultations</h3>
          <div className="space-y-4">
            {consultations.slice(0, 5).map((c: any) => (
              <div key={c._id} className="flex items-center justify-between p-5 bg-gray-50/50 rounded-2xl">
                <div><div className="text-sm font-black text-gray-900">{c.name}</div><div className="text-[10px] text-gray-400">{c.mobile}</div></div>
                <div className="text-[10px] font-black text-orange-600 bg-white px-3 py-1 rounded-lg">{c.country}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const TableView = ({ data, columns }: { data: any[], columns: string[] }) => (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-50/50 border-b border-gray-100">
          <tr>{columns.map(c => <th key={c} className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">{c}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {data.map((item, i) => (
            <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
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
        </tbody>
      </table>
    </div>
  );

  if (!isAuthenticated) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[3rem] p-12 shadow-2xl">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center p-3 border border-gray-100 mx-auto mb-6 shadow-xl shadow-blue-50">
            <img src="/logo.png" className="w-full h-full object-contain" alt="logo" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 italic">GAP Manager Portal</h1>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <input type="text" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all" />
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all" />
          {loginError && <p className="text-red-500 text-xs font-black text-center uppercase tracking-widest">{loginError}</p>}
          <button className="w-full py-5 bg-[#0f172a] text-white font-black rounded-2xl uppercase tracking-[0.2em] text-xs shadow-xl shadow-gray-200">Secure Login</button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-80 h-screen sticky top-0 bg-[#0f172a] p-10 flex flex-col items-center">
        <div className="mb-14 text-center">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center p-3 shadow-2xl mb-6 mx-auto"><img src="/logo.png" className="w-full h-full object-contain" alt="logo" /></div>
          <h1 className="text-white text-xl font-black uppercase tracking-[0.2em]">GAP Admin</h1>
        </div>
        <nav className="w-full space-y-3">
          {(["Summary", "Registrations", "Consultations", "Events", "Universities"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveModule(tab)} className={`w-full text-left px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-4 ${activeModule === tab ? "bg-blue-600 text-white shadow-2xl shadow-blue-900/50 scale-105" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
              {tab === "Summary" && <Icons.Globe size={18} />}
              {tab === "Registrations" && <Icons.FileText size={18} />}
              {tab === "Consultations" && <Icons.Phone size={18} />}
              {tab === "Events" && <Icons.Calendar size={18} />}
              {tab === "Universities" && <Icons.GraduationCap size={18} />}
              {tab}
            </button>
          ))}
        </nav>
        <button onClick={() => { localStorage.removeItem("gap_admin_token"); setIsAuthenticated(false); }} className="mt-auto w-full py-5 text-[10px] font-black text-red-400 bg-red-400/10 rounded-2xl hover:bg-red-500 hover:text-white transition-all uppercase tracking-widest">Logout System</button>
      </aside>

      {/* Main Container */}
      <main className="flex-1 h-screen overflow-y-auto p-14 relative">
        <header className="flex items-center justify-between mb-12">
          <div><h1 className="text-4xl font-black text-gray-900 tracking-tighter">{activeModule}</h1><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1 italic">Authorized Personnel Only</p></div>
          {activeModule !== "Summary" && (
            <button onClick={() => setIsAdding(true)} className="px-8 py-4 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-xl shadow-blue-100 flex items-center gap-3 hover:scale-105 transition-all">
              <Icons.Plus size={18} /> Add {activeModule.slice(0, -1)}
            </button>
          )}
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
             <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Encrypting Sync...</span>
          </div>
        ) : (
          <>
            {activeModule === "Summary" && <SummaryView />}
            {activeModule === "Registrations" && <TableView data={registrations} columns={["Full Name", "Email", "Mobile", "Country", "Program Name"]} />}
            {activeModule === "Consultations" && <TableView data={consultations} columns={["Name", "Email", "Mobile", "Country", "Status"]} />}
            {activeModule === "Events" && <TableView data={events} columns={["Title", "Date", "Location", "Type", "Status"]} />}
            {activeModule === "Universities" && <TableView data={universities} columns={["Name", "Country", "Ranking"]} />}
          </>
        )}
      </main>

      {/* Add Modal Placeholder (Add logic similar to events if requested) */}
      {isAdding && (
         <div className="fixed inset-0 bg-gray-900/90 backdrop-blur-xl z-[100] flex items-center justify-center p-10">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[4rem] p-16 shadow-2xl relative">
               <button onClick={() => setIsAdding(false)} className="absolute top-10 right-10 p-4 bg-gray-50 rounded-full hover:bg-gray-100 transition-all text-gray-900"><Icons.Plus size={24} className="rotate-45" /></button>
               <h2 className="text-4xl font-black text-gray-900 mb-10 tracking-tighter italic">Create New {activeModule.slice(0, -1)}</h2>
               <p className="text-gray-400 mb-10 font-bold">Comprehensive data entry for {activeModule}. Ensure all fields are accurate.</p>
               <form onSubmit={handleCreate} className="space-y-8">
                  <input type="text" placeholder="Title/Name" required value={formData.title || formData.name || ""} onChange={e=>setFormData({...formData, title: e.target.value})} className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-3xl outline-none font-bold" />
                  <textarea placeholder="Description/Details" className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-3xl outline-none font-bold h-32" />
                  <button className="w-full py-6 bg-blue-600 text-white font-black rounded-3xl uppercase tracking-widest text-xs shadow-2xl shadow-blue-100">Save Intelligence Entry</button>
               </form>
            </div>
         </div>
      )}
    </div>
  );
}
