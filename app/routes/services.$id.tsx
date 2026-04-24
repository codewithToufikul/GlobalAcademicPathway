import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import * as Icons from "../components/Icons";

interface Service {
  _id: string;
  title: string;
  description: string;
  fullDescription: string;
  icon: string;
  color: string;
  features: string[];
  benefits: string[];
}

export default function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const API_BASE =
          window.location.hostname === "localhost"
            ? "https://gap-server-22sf.onrender.com/api"
            : "https://gap-server-22sf.onrender.com/api";
        const res = await fetch(`${API_BASE}/services/${id}`);
        const json = await res.json();
        if (json.success) {
          setService(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch service:", err);
      } finally {
        setLoading(false);
        setTimeout(() => setMounted(true), 50);
      }
    };
    fetchService();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F5F0]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#1A1A2E] border-t-transparent rounded-full animate-spin" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1A1A2E]/40">
            Loading
          </span>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F5F0] px-6 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
          404
        </p>
        <h1 className="text-5xl font-black text-[#1A1A2E] mb-8 tracking-tight">
          Service Not Found
        </h1>
        <Link
          to="/services"
          className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1A1A2E] border-b border-[#1A1A2E] pb-0.5 hover:text-blue-600 hover:border-blue-600 transition-colors"
        >
          Return to Services
        </Link>
      </div>
    );
  }

  const IconComponent = (Icons as any)[service.icon] || Icons.Globe;

  return (
    <div
      className="bg-[#F7F5F0] min-h-screen"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=DM+Sans:wght@300;400;500;600&display=swap');

        .sd-hero { font-family: 'Playfair Display', Georgia, serif; }
        .sd-body { font-family: 'DM Sans', system-ui, sans-serif; }

        .sd-fade-up {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
        }
        .sd-fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .sd-fade-up.d1 { transition-delay: 0.1s; }
        .sd-fade-up.d2 { transition-delay: 0.2s; }
        .sd-fade-up.d3 { transition-delay: 0.3s; }
        .sd-fade-up.d4 { transition-delay: 0.4s; }
        .sd-fade-up.d5 { transition-delay: 0.5s; }

        .feature-card {
          background: white;
          border: 1px solid rgba(26,26,46,0.08);
          transition: all 0.3s ease;
        }
        .feature-card:hover {
          border-color: rgba(37,99,235,0.3);
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(37,99,235,0.08);
        }

        .cta-btn {
          position: relative;
          overflow: hidden;
          background: #1A1A2E;
          transition: all 0.3s ease;
        }
        .cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #2563eb;
          transform: translateX(-100%);
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .cta-btn:hover::before { transform: translateX(0); }
        .cta-btn span { position: relative; z-index: 1; }

        .divider-line {
          width: 48px;
          height: 3px;
          background: #2563eb;
        }

        .number-badge {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          color: rgba(37,99,235,0.15);
          font-size: 4rem;
          font-weight: 900;
          line-height: 1;
          position: absolute;
          top: -8px;
          right: 16px;
          pointer-events: none;
          user-select: none;
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#1A1A2E] text-white">
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Accent glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-600 opacity-[0.06] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-400 opacity-[0.04] blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-36 pb-28 lg:pt-52 lg:pb-40 relative z-10">
          {/* Breadcrumb */}
          <div className={`sd-fade-up ${mounted ? "visible" : ""}`}>
            <Link
              to="/services"
              className="sd-body inline-flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors text-[10px] font-semibold uppercase tracking-[0.35em] mb-14"
            >
              <Icons.ArrowRight size={12} className="rotate-180 opacity-60" />
              Services
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-9">
              {/* Service type label */}
              <div className={`sd-fade-up d1 ${mounted ? "visible" : ""}`}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="divider-line" />
                  <span className="sd-body text-[10px] font-semibold uppercase tracking-[0.4em] text-blue-400">
                    Our Service
                  </span>
                </div>
              </div>

              {/* Title */}
              <div className={`sd-fade-up d2 ${mounted ? "visible" : ""}`}>
                <h1 className="sd-hero text-5xl lg:text-[88px] font-black leading-[0.92] tracking-tight text-white mb-8">
                  {service.title}
                </h1>
              </div>

              {/* Description */}
              <div className={`sd-fade-up d3 ${mounted ? "visible" : ""}`}>
                <p className="sd-body max-w-2xl text-lg text-white/55 font-light leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>

            {/* Icon block */}
            <div
              className={`lg:col-span-3 flex lg:justify-end sd-fade-up d4 ${mounted ? "visible" : ""}`}
            >
              <div className="relative">
                <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-3xl bg-white/[0.06] border border-white/10 flex items-center justify-center backdrop-blur-sm">
                  <IconComponent
                    size={48}
                    strokeWidth={1.25}
                    className="text-white/80"
                  />
                </div>
                {/* decorative ring */}
                <div className="absolute -inset-3 rounded-[2rem] border border-white/[0.06] pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </section>

      {/* ── MAIN CONTENT ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-16 py-24 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

          {/* LEFT — Overview + Features */}
          <div className="lg:col-span-7 space-y-20">

            {/* Overview */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="divider-line" />
                <span className="sd-body text-[10px] font-semibold uppercase tracking-[0.4em] text-blue-600">
                  Overview
                </span>
              </div>
              <div className="sd-body text-[17px] text-[#1A1A2E]/65 font-light leading-[1.85] space-y-4">
                {(service.fullDescription || service.description)
                  .split("\n")
                  .filter(Boolean)
                  .map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
              </div>
            </div>

            {/* Features */}
            {service.features && service.features.length > 0 && (
              <div>
                <div className="flex items-center gap-4 mb-10">
                  <div className="divider-line" />
                  <span className="sd-body text-[10px] font-semibold uppercase tracking-[0.4em] text-blue-600">
                    Key Features
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <div
                      key={index}
                      className="feature-card rounded-2xl p-6 relative"
                    >
                      <span className="number-badge">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="w-2 h-2 rounded-full bg-blue-600 mb-4" />
                      <p className="sd-body text-sm font-medium text-[#1A1A2E] leading-snug">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Sticky sidebar */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-6">

              {/* Benefits card */}
              {service.benefits && service.benefits.length > 0 && (
                <div className="bg-[#1A1A2E] rounded-3xl p-10 text-white relative overflow-hidden">
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-800/10 blur-2xl rounded-full pointer-events-none" />

                  <div className="flex items-center gap-4 mb-8 relative">
                    <div className="divider-line" />
                    <span className="sd-body text-[10px] font-semibold uppercase tracking-[0.4em] text-blue-400">
                      Core Benefits
                    </span>
                  </div>

                  <div className="space-y-5 relative">
                    {service.benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 group pb-5 border-b border-white/[0.06] last:border-0 last:pb-0"
                      >
                        <div className="shrink-0 mt-1 w-5 h-5 rounded-md bg-blue-600/20 border border-blue-500/30 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                          <Icons.Check
                            size={11}
                            strokeWidth={2.5}
                            className="text-blue-400 group-hover:text-white transition-colors"
                          />
                        </div>
                        <p className="sd-body text-[14px] text-white/60 font-light leading-relaxed group-hover:text-white/85 transition-colors">
                          {benefit}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA card */}
              <div className="bg-white rounded-3xl p-10 border border-[#1A1A2E]/08 shadow-sm">
                <div className="sd-hero text-2xl font-bold text-[#1A1A2E] mb-3 leading-tight">
                  Ready to get started?
                </div>
                <p className="sd-body text-sm text-[#1A1A2E]/50 font-light mb-8 leading-relaxed">
                  Begin your international education journey with a personalised
                  expert strategy session.
                </p>

                <Link to="/apply" className="cta-btn block w-full py-4 rounded-xl text-center">
                  <span className="sd-body flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-white">
                    Book a Consultation
                    <Icons.ArrowRight size={14} />
                  </span>
                </Link>

                <div className="mt-6 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 border-2 border-white"
                        style={{ opacity: 1 - i * 0.15 }}
                      />
                    ))}
                  </div>
                  <p className="sd-body text-[11px] text-[#1A1A2E]/40 font-medium">
                    500+ students guided
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA STRIP ──────────────────────────────────── */}
      <section className="border-t border-[#1A1A2E]/08 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-14 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="sd-body text-[10px] font-semibold uppercase tracking-[0.4em] text-blue-600 mb-1">
              Explore More
            </p>
            <p className="sd-hero text-xl font-bold text-[#1A1A2E]">
              Discover other services we offer
            </p>
          </div>
          <Link
            to="/services"
            className="sd-body inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#1A1A2E] border border-[#1A1A2E]/20 rounded-xl px-7 py-4 hover:bg-[#1A1A2E] hover:text-white hover:border-[#1A1A2E] transition-all"
          >
            All Services <Icons.ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}