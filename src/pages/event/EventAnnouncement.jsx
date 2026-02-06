import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, animate, useReducedMotion } from "framer-motion";
import { DollarSign, Award, ChevronRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

export default function EventAnnouncement() {
  const shouldReduce = useReducedMotion();
  const [stats, setStats] = useState({ years: 0, brands: 0, states: 0, visitors: 0 });
  const [openReg, setOpenReg] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const [accordionOpen, setAccordionOpen] = useState(null);
  const heroRef = useRef(null);
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  // brand logos array for the inserted Brands Showcase section
  const brandLogos = [
    "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=200&h=200&fit=crop&q=80&1",
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&h=200&fit=crop&q=80&2",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&h=200&fit=crop&q=80&3",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&h=200&fit=crop&q=80&4",
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=200&h=200&fit=crop&q=80&5",
    "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?w=200&h=200&fit=crop&q=80&6",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=200&h=200&fit=crop&q=80&7",
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&h=200&fit=crop&q=80&11",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop&q=80&9",
    "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=200&h=200&fit=crop&q=80&10",
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&h=200&fit=crop&q=80&11",
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=200&fit=crop&q=80&12",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&h=200&fit=crop&q=80&13",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&h=200&fit=crop&q=80&14",
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=200&h=200&fit=crop&q=80&15",
    "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?w=200&h=200&fit=crop&q=80&16"
  ];

  // count-up
  useEffect(() => {
    if (shouldReduce) {
      setStats({ years: 30, brands: 500, states: 20, visitors: 10000 });
      return;
    }
    const c = [];
    c.push(
      animate(0, 30, {
        duration: 1.1,
        onUpdate: (v) => setStats((s) => ({ ...s, years: Math.round(v) })),
      })
    );
    c.push(
      animate(0, 500, {
        duration: 1.25,
        onUpdate: (v) => setStats((s) => ({ ...s, brands: Math.round(v) })),
      })
    );
    c.push(
      animate(0, 20, {
        duration: 1.05,
        onUpdate: (v) => setStats((s) => ({ ...s, states: Math.round(v) })),
      })
    );
    c.push(
      animate(0, 10000, {
        duration: 1.35,
        onUpdate: (v) => setStats((s) => ({ ...s, visitors: Math.round(v) })),
      })
    );

    return () => c.forEach((x) => x.stop && x.stop());
  }, [shouldReduce]);

  // parallax
  useEffect(() => {
    let raf = null;
    const onScroll = () => {
      if (!heroRef.current) return;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = heroRef.current.getBoundingClientRect();
        const middle = rect.top + rect.height / 2 - window.innerHeight / 2;
        const mapped = Math.max(-30, Math.min(30, -middle / 15));
        setParallaxY(mapped);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // keyboard close modal
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && openReg) setOpenReg(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openReg]);

  // focus trap (basic)
  useEffect(() => {
    if (!openReg || !modalRef.current) return;
    const nodes = Array.from(modalRef.current.querySelectorAll("a,button,input,textarea,select,[tabindex]:not([tabindex='-1'])")).filter((n) => !n.hasAttribute("disabled"));
    if (nodes.length) nodes[0].focus();
    const onKey = (e) => {
      if (e.key !== "Tab") return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openReg]);

  // helper: smooth scroll
  const smoothScrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  
  const downloadRegistrationForm = () => {
    const content = `South India Garments Association (SIGA) - Registration Form\n\nName:\nCompany:\nEmail:\nPhone:\nStall Type:\nNumber of Sq.M:\nAdditional Requirements:\n\n(Please fill and send scanned copy to info.sigafair@gmail.com)`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "SIGA-registration-form.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // submit modal form (UI-only)
  const submitForm = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return alert("Please provide name and email");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenReg(false);
      alert("Registration request received. We'll contact you soon.");
      setForm({ name: "", email: "", phone: "" });
    }, 900);
  };

  // helper: button ripple (small visual) — creates a transient circle
  const ripple = (e) => {
    const btn = e.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - btn.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - btn.getBoundingClientRect().top - radius}px`;
    circle.className = "ripple-circle";
    const existing = btn.getElementsByClassName("ripple-circle");
    if (existing.length) existing[0].remove();
    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 800);
  };

  return (
    <div className="relative w-full bg-gradient-to-b from-[#fff7f6] to-[#fafafa] min-h-screen text-slate-900 antialiased overflow-x-hidden">
      {/* inline styles for gradient animation and ripple */}
      <style>{`
        @keyframes gradientShift {0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        .animated-gradient {background: linear-gradient(90deg,#fbeff0,#fff5f6,#fff9f7); background-size:200% 200%; animation: gradientShift 6s ease infinite;}
        .ripple-circle{position:absolute;border-radius:50%;transform:scale(0);animation:ripple 0.8s linear;background:rgba(255,255,255,0.4);pointer-events:none}
        @keyframes ripple{to{transform:scale(3);opacity:0}}
        .color-divider{height:6px;border-radius:6px;background:linear-gradient(90deg,#CE1446,#B2192B,#D9737D);background-size:200% 100%;animation:gradientShift 4s linear infinite}
      `}</style>

      {/* top animated divider */}
      <div className="color-divider w-full" aria-hidden></div>

      {/* Sticky CTA */}
      <aside className="fixed right-6 bottom-8 z-50 hidden md:flex flex-col gap-3 items-end">
        <motion.button
          onClick={() => setOpenReg(true)}
          whileHover={{ scale: shouldReduce ? 1 : 1.04 }}
          whileTap={{ scale: shouldReduce ? 1 : 0.98 }}
          onMouseDown={ripple}
          className="flex items-center gap-3 px-4 py-3 rounded-full bg-[#780900] text-white shadow-2xl ring-1 ring-white/10 overflow-hidden"
        >
          Quick Register
        </motion.button>

        <motion.button
          onClick={() => smoothScrollTo("packages")}
          whileHover={{ x: shouldReduce ? 0 : -6 }}
          onMouseDown={ripple}
          className="px-3 py-2 rounded-full bg-white/90 text-sm text-slate-900 shadow-lg border border-white/20"
        >
          View Packages
        </motion.button>
      </aside>

      {/* Hero */}
      <header ref={heroRef} className="relative py-16 md:py-24 lg:py-32 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-[#fff0f0] to-[#fff9f8] text-[#780900] text-sm font-semibold shadow-sm">31ST EDITION • 2026</span>

              <h1 className="mt-6 text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-tight tracking-tight text-slate-900">31st SIGA Fair
                <span className="block text-lg sm:text-2xl lg:text-3xl font-semibold text-slate-700 mt-2">Autumn Winter Collection</span>
              </h1>

              <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-xl">Organized by <strong className="font-semibold text-slate-900">South India Garments Association (SIGA)</strong>. Join 500+ brands showcasing latest collections to retailers, wholesalers, and buyers nationwide.</p>

              <div className="mt-6 flex flex-wrap gap-3 items-center">
                <motion.button
                  onClick={() => setOpenReg(true)}
                  whileHover={{ scale: shouldReduce ? 1 : 1.035 }}
                  whileTap={{ scale: shouldReduce ? 1 : 0.985 }}
                  onMouseDown={ripple}
                  className="relative inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-[#B2192B] to-[#780900] text-white rounded-full shadow-2xl font-semibold focus:outline-none overflow-hidden"
                >
                  REGISTER
                </motion.button>

                <button
                  onClick={() => smoothScrollTo("schedule")}
                  className="inline-flex items-center gap-2 px-4 py-3 border border-slate-200 rounded-full bg-white shadow-sm text-sm text-slate-900"
                  onMouseDown={ripple}
                >
                  VIEW SCHEDULE
                </button>

                <div className="ml-0 sm:ml-2 text-sm text-slate-500 w-full sm:w-auto">Or call: <strong className="text-slate-900">96326 48525</strong></div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-white/90 border border-slate-100 shadow-sm text-xs">B2B Only</span>
                <span className="px-3 py-1 rounded-full bg-white/90 border border-slate-100 shadow-sm text-xs">500+ Brands</span>
                <span className="px-3 py-1 rounded-full bg-white/90 border border-slate-100 shadow-sm text-xs">10k+ Buyers</span>
              </div>

              {/* small animated color accent */}
              <div className="mt-6 w-36 h-2 rounded-full animated-gradient" aria-hidden></div>
            </div>

            <div className="lg:col-span-6 relative">
              <div style={{ transform: `translateY(${parallaxY * 0.45}px)` }} className="relative rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(199,46,72,0.12)]">
                <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=80" alt="Fashion Exhibition" className="w-full h-[320px] sm:h-[420px] md:h-[520px] object-cover block" loading="lazy" />

                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute -bottom-1 left-0 w-full h-12 opacity-80">
                  <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,10 1200,80 L1200,0 L0,0 Z" fill="#fff" opacity="0.65" />
                </svg>

                <div className="absolute top-5 left-5 bg-gradient-to-r from-white/20 to-white/5 rounded-lg px-3 py-1 backdrop-blur-sm text-white text-sm">Palace Grounds, Bangalore • 29–31 Jul 2026</div>

                {/* small color floating accents */}
                <div className="absolute left-4 top-8 w-16 h-16 rounded-full bg-gradient-to-br from-[#CE1446] to-[#B2192B] opacity-20 blur-xl" />
                <div className="absolute right-6 top-16 w-12 h-12 rounded-full bg-gradient-to-br from-[#D9737D] to-[#CE1446] opacity-18 blur-md" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* colored separator between hero & highlights */}
      <div className="mx-auto max-w-7xl px-4 md:px-10 -mt-6">
        <div className="color-divider w-full rounded-lg" aria-hidden></div>
      </div>

      <main>
        {/* Highlights */}
        <section id="highlights" className="py-12 md:py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 md:px-10">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Event Highlights</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Key statistics that define the scale and impact of SIGA Fair 2026</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 md:mt-10">
              <div className="p-4 md:p-6 bg-gradient-to-br from-white to-[#fff7f6] border border-gray-100 rounded-2xl shadow transition hover:-translate-y-1">
                <div className="text-2xl md:text-3xl font-extrabold text-[#CE1446]">{stats.years}+</div>
                <div className="mt-1 text-xs md:text-sm text-slate-600">Industry leadership</div>
              </div>

              <div className="p-4 md:p-6 bg-gradient-to-br from-white to-[#fff7f6] border border-gray-100 rounded-2xl shadow transition hover:-translate-y-1">
                <div className="text-2xl md:text-3xl font-extrabold text-[#B2192B]">{stats.brands}+</div>
                <div className="mt-1 text-xs md:text-sm text-slate-600">Exhibiting collections</div>
              </div>

              <div className="p-4 md:p-6 bg-gradient-to-br from-white to-[#fff7f6] border border-gray-100 rounded-2xl shadow transition hover:-translate-y-1">
                <div className="text-2xl md:text-3xl font-extrabold text-[#D9737D]">{stats.states}+</div>
                <div className="mt-1 text-xs md:text-sm text-slate-600">State participation</div>
              </div>

              <div className="p-4 md:p-6 bg-gradient-to-br from-white to-[#fff7f6] border border-gray-100 rounded-2xl shadow transition hover:-translate-y-1">
                <div className="text-2xl md:text-3xl font-extrabold text-[#CE1446]">{stats.visitors.toLocaleString()}+</div>
                <div className="mt-1 text-xs md:text-sm text-slate-600">Expected attendance</div>
              </div>
            </div>
          </div>
        </section>

        {/*  INSERTED: Brands Showcase (featuring 500+ Leading Brands)  */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              {/* simple inline star SVG to avoid adding new imports */}
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#FEF2F2] rounded-full mb-4">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#780900]">
                  <path d="M12 17.3l6.18 3.73-1.64-7.03L21 9.24l-7.19-.62L12 2 10.19 8.62 3 9.24l4.46 4.76L5.82 21z" fill="#780900"/>
                </svg>
                <span className="text-sm font-medium text-[#780900]">PARTICIPATING BRANDS</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Featuring <span className="text-[#780900]">500+</span> Leading Brands
              </h2>

              <p className="text-gray-600 max-w-3xl mx-auto">
                Join India's premier brands showcasing their exclusive Autumn-Winter 2026 collections
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
              {brandLogos.map((logo, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(0.6, idx * 0.03), duration: 0.45 }}
                  className="aspect-square bg-gray-50 border border-gray-200 rounded-xl overflow-hidden group hover:border-[#780900] transition-all duration-300 hover:shadow-lg"
                >
                  <img
                    src={logo}
                    alt={`Brand ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  // scroll to next section (if present)
                  const next = document.querySelector("#schedule");
                  if (next) next.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#780900] text-white rounded-full text-sm font-semibold shadow"
              >
                View All Brands
                {/* simple inline chevron SVG */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="ml-1">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </section>


        {/* ---------- INSERTED: Pricing Section 2 ---------- */}
        <section className="py-20 bg-gray-50">
          <div className="container max-w-7xl mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <DollarSign className="text-[#780900]" size={28} />
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Stall Packages</h2>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">Choose the perfect space for your business</p>
            </motion.div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-4 px-4 text-left text-sm font-semibold text-gray-900">PACKAGE</th>
                    <th className="py-4 px-4 text-left text-sm font-semibold text-gray-900">SIZE</th>
                    <th className="py-4 px-4 text-left text-sm font-semibold text-gray-900">RATE/SQ.M</th>
                    <th className="py-4 px-4 text-left text-sm font-semibold text-gray-900">TOTAL</th>
                    <th className="py-4 px-4 text-left text-sm font-semibold text-gray-900"></th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { type: "Business Stall", size: "12 sq.m", rate: "₹5,900", total: "₹70,800", popular: false },
                    { type: "Brand Wagon", size: "24 sq.m", rate: "₹6,900", total: "₹1,65,600", popular: false },
                    { type: "Premium Wagon", size: "30 sq.m", rate: "₹6,900", total: "₹2,07,000", popular: true },
                    { type: "Executive Wagon", size: "40 sq.m", rate: "₹6,900", total: "₹2,76,000", popular: false }
                  ].map((row, idx) => (
                    <motion.tr
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className={`border-b border-gray-100 hover:bg-white transition-colors ${row.popular ? 'bg-[#CE1446]/5' : ''}`}
                    >
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">{row.type}</div>
                        {row.popular && (
                          <span className="inline-flex items-center gap-1 mt-1 px-2 py-1 bg-[#780900] text-white text-xs">
                            <Award size={10} />
                            MOST POPULAR
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-gray-700">{row.size}</td>
                      <td className="py-4 px-4 font-medium text-gray-900">{row.rate}</td>
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">{row.total}</div>
                        <div className="text-xs text-gray-500">+ GST 18%</div>
                      </td>
                      <td className="py-4 px-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="px-4 py-2 bg-[#780900] text-white text-sm font-medium flex items-center gap-2"
                        >
                          <ChevronRight size={14} />
                          BOOK NOW
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        {/*  END INSERTED: Pricing Section 2 */}

        <footer className="py-10 rounded  bg-gradient-to-r from-[#B2192B] to-[#780900]">
          <div className="mx-auto max-w-7xl px-4 md:px-10 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-white">Ready to Exhibit at SIGA Fair 2026?</h3>
            <p className="text-white/90 mt-3 max-w-2xl mx-auto">Limited stalls available. Secure your spot today and connect with 10,000+ buyers from across India.</p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button onClick={() => setOpenReg(true)} className="px-6 py-3 bg-white text-[#780900] rounded-full font-semibold shadow" onMouseDown={ripple}>BOOK YOUR STALL NOW</button>
              <a onClick={(e) => { e.preventDefault(); smoothScrollTo('highlights'); }} href="#highlights" className="px-4 py-2 rounded-full border border-white/30 text-white/90">Learn more</a>
            </div>
          </div>
        </footer>

        {/* schedule & packages */}
        <section id="schedule" className="py-12 md:py-16 bg-[#fafafa]">
          <div className="mx-auto max-w-7xl px-4 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-bold mb-3">Fair Schedule</h3>
                <div className="space-y-2">
                  {[{ day: 'Check-in', date: '28th July 2026 (Mon)', time: '11:00 AM', activity: 'Stall setup begins' }, { day: 'Day 1', date: '29th July 2026 (Tue)', time: '10:00 AM - 8:00 PM', activity: 'Fair opens to visitors', highlight: true }, { day: 'Day 2', date: '30th July 2026 (Wed)', time: '10:00 AM - 8:00 PM', activity: 'Exhibition continues' }, { day: 'Day 3', date: '31st July 2026 (Thu)', time: '10:00 AM - 7:00 PM', activity: 'Final day of fair' }, { day: 'Check-out', date: '31st July 2026 (Thu)', time: '8:00 PM onwards', activity: 'Stall dismantling' }].map((r, i) => (
                    <div key={i} className={`p-3 rounded-lg border ${r.highlight ? 'border-[#CE1446]/30 bg-[#fff6f6]' : 'border-gray-100 bg-white'} flex justify-between`}>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{r.day}</div>
                        <div className="text-xs text-slate-500">{r.date}</div>
                      </div>
                      <div className="text-sm text-slate-700 text-right">
                        <div className={`${r.highlight ? 'font-semibold text-[#780900]' : ''}`}>{r.time}</div>
                        <div className="text-xs text-slate-500 mt-1">{r.activity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-bold mb-3">Stall Packages & Pricing</h3>
                <div className="space-y-3" id="packages">
                  {[{ id: 0, type: 'Business Stall', size: '3m x 4m = 12 sq.m', rate: '₹5,900', cost: '₹70,800', includes: '1 Table, 2 Chairs, 3 Spot Lights, 1 LED Light' }, { id: 1, type: 'Brand Wagon Stall', size: '6m x 4m = 24 sq.m', rate: '₹6,900', cost: '₹1,65,600', includes: '2 Tables, 4 Chairs, 6 Spot Lights, 2 LED Lights' }, { id: 2, type: 'Brand Wagon Stall', size: '6m x 5m = 30 sq.m', rate: '₹6,900', cost: '₹2,07,000', includes: '3 Tables, 6 Chairs, 9 Spot Lights, 3 LED Lights' }, { id: 3, type: 'Brand Wagon Stall', size: '8m x 5m = 40 sq.m', rate: '₹6,900', cost: '₹2,76,000', includes: '4 Tables, 8 Chairs, 12 Spot Lights, 4 LED Lights' }].map((p) => (
                    <div key={p.id} className="border rounded-lg overflow-hidden">
                      <button type="button" onClick={() => setAccordionOpen((s) => (s === p.id ? null : p.id))} className="w-full flex items-center justify-between px-4 py-3 md:px-5 md:py-4 bg-white" aria-expanded={accordionOpen === p.id} aria-controls={`panel-${p.id}`}>
                        <div className="text-left">
                          <div className="text-sm font-medium text-slate-900">{p.type}</div>
                          <div className="text-xs text-slate-500">{p.size}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-slate-900">{p.cost}</div>
                          <div className="text-xs text-slate-500">+ GST 18%</div>
                        </div>
                      </button>

                      {accordionOpen === p.id && (
                        <div id={`panel-${p.id}`} className="px-4 py-3 bg-[#fff8f8] text-sm text-slate-700">Includes: {p.includes}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white border rounded-2xl shadow-sm">
                <h4 className="font-semibold">Payment Details</h4>
                <div className="mt-2 text-sm text-slate-700">Cheque / NEFT / UPI. </div>
                <div className="mt-2 text-sm text-slate-700">Account Name • South India Garment Association. </div>
                <div className="mt-2 text-sm text-slate-700">Bank Details • Canara Bank, Shantinagar Branch, Bangalore. </div>
                <div className="mt-2 text-sm text-slate-700"> IFSC: CNRB0000681 | Account: 0681201002725 </div>
              </div>

              <div className="p-4 bg-white border rounded-2xl shadow-sm">
                <h4 className="font-semibold">Contact</h4>
                <div className="mt-2 text-sm text-slate-700"> SIGA Office: 96326 48525 <br /> Govind Mundra: 94484 61384<br /> Govind Garg: 88671 71060 </div>
                 <div className="mt-2 text-sm text-slate-700"> Email & Website <br /> info.sigafair@gmail.com <br /> www.sigafair.com </div>
              </div>

              <div className="p-4 bg-white border rounded-2xl shadow-sm">
                <h4 className="font-semibold">Notes</h4>
                <ul className="mt-2 text-sm text-slate-600 space-y-1">
                  <li>Booking opens from 25th April 2026.</li>
                  <li>50% advance required.</li>
                  <li>Stall allotment on 5th July 2026.</li>
                  <li>Strictly B2B.</li>
                </ul>
                <button onClick={downloadRegistrationForm} className="mt-3 w-full px-3 py-2 bg-gradient-to-r from-[#B2192B] to-[#780900] text-white rounded-md" onMouseDown={ripple}>Download Form</button>
              </div>
            </div>
          </div>
        </section>

        
      </main>

      {/* modal */}
      <AnimatePresence>
        {openReg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-60 flex items-center justify-center p-4 md:p-8">
            <motion.div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpenReg(false)} />

            <motion.div ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="reg-title" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.18 }} className="relative z-50 w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl">
              <h3 id="reg-title" className="text-lg font-bold">Quick Registration</h3>
              <p className="text-sm text-slate-600 mt-1">Fill in basic details — our team will get back to you.</p>

              <form onSubmit={submitForm} className="mt-4 space-y-3">
                <label className="block text-sm">Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full px-3 py-2 border rounded-md" /></label>
                <label className="block text-sm">Email<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1 w-full px-3 py-2 border rounded-md" /></label>
                <label className="block text-sm">Phone<input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1 w-full px-3 py-2 border rounded-md" /></label>

                <div className="flex items-center gap-3">
                  <button type="submit" disabled={loading} className="px-4 py-2 bg-[#780900] text-white rounded-md">{loading ? "Submitting..." : "Submit"}</button>
                  <button type="button" onClick={() => setOpenReg(false)} className="px-4 py-2 border rounded-md">Cancel</button>
                </div>
              </form>

              <div className="mt-4 text-xs text-slate-500">By submitting you agree to be contacted by SIGA for stall booking and related communication.</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* mobile CTA */}
      <div className="fixed left-4 bottom-6 z-50 md:hidden">
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => setOpenReg(true)} className="px-4 py-3 rounded-full bg-[#780900] text-white shadow-lg" onMouseDown={ripple}>Register</motion.button>
      </div>

    </div>
  );
}
