import RegistrationModal from "@/components/ui/register-modal";
import { animate, motion, useReducedMotion } from "framer-motion";
import { Award, Calendar, ChevronRight, Clock, DollarSign } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import BrandLogo from "./BrandLogo";
import { useQuery } from "@tanstack/react-query";
import BASE_URL from "@/config/BaseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ease = [0.22, 1, 0.36, 1];

export default function EventAnnouncement() {
  const shouldReduce = useReducedMotion();
  const [stats, setStats] = useState({
    years: 0,
    brands: 0,
    states: 0,
    visitors: 0,
  });

  const schedule = [
    {
      day: "Day 1",
      date: "29 July",
      time: "10:00 AM - 8:00 PM",
      title: "Grand Opening",
    },
    {
      day: "Day 2",
      date: "30 July",
      time: "10:00 AM - 8:00 PM",
      title: "B2B Meetings",
    },
    {
      day: "Day 3",
      date: "31 July",
      time: "10:00 AM - 7:00 PM",
      title: "Closing Day",
    },
  ];

  const [openReg, setOpenReg] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const heroRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const navigate = useNavigate();
  const fetchBrandLogos = async () => {
    const res = await axios.get(`${BASE_URL}/api/getFeatureBrandLogos`);
    return res?.data?.feature_brands || [];
  };

  const {
    data: brandLogos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getFeatureBrandLogos"],
    queryFn: fetchBrandLogos,
  });

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
      }),
    );
    c.push(
      animate(0, 500, {
        duration: 1.25,
        onUpdate: (v) => setStats((s) => ({ ...s, brands: Math.round(v) })),
      }),
    );
    c.push(
      animate(0, 20, {
        duration: 1.05,
        onUpdate: (v) => setStats((s) => ({ ...s, states: Math.round(v) })),
      }),
    );
    c.push(
      animate(0, 10000, {
        duration: 1.35,
        onUpdate: (v) => setStats((s) => ({ ...s, visitors: Math.round(v) })),
      }),
    );

    return () => c.forEach((x) => x.stop && x.stop());
  }, [shouldReduce]);

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

  const smoothScrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (!form.name || !form.email)
      return alert("Please provide name and email");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenReg(false);
      alert("Registration request received. We'll contact you soon.");
      setForm({ name: "", email: "", phone: "" });
    }, 900);
  };
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
      <style>{`
        @keyframes gradientShift {0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        .animated-gradient {background: linear-gradient(90deg,#fbeff0,#fff5f6,#fff9f7); background-size:200% 200%; animation: gradientShift 6s ease infinite;}
        .ripple-circle{position:absolute;border-radius:50%;transform:scale(0);animation:ripple 0.8s linear;background:rgba(255,255,255,0.4);pointer-events:none}
        @keyframes ripple{to{transform:scale(3);opacity:0}}
        .color-divider{height:6px;border-radius:6px;background:linear-gradient(90deg,#CE1446,#B2192B,#D9737D);background-size:200% 100%;animation:gradientShift 4s linear infinite}
      `}</style>
      <div className="color-divider w-full" aria-hidden></div>

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

      <header ref={heroRef} className="relative py-16 md:py-24 lg:py-32 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-[#fff0f0] to-[#fff9f8] text-[#780900] text-sm font-semibold shadow-sm">
                31ST EDITION • 2026
              </span>

              <h1 className="mt-6 text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-tight tracking-tight text-slate-900">
                31st SIGA Fair
                <span className="block text-lg sm:text-2xl lg:text-3xl font-semibold text-slate-700 mt-2">
                  Autumn Winter Collection
                </span>
              </h1>

              <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-xl">
                Organized by{" "}
                <strong className="font-semibold text-slate-900">
                  South India Garments Association (SIGA)
                </strong>
                . Join 500+ brands showcasing latest collections to retailers,
                wholesalers, and buyers nationwide.
              </p>

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

                <div className="ml-0 sm:ml-2 text-sm text-slate-500 w-full sm:w-auto">
                  Or call:{" "}
                  <strong className="text-slate-900">96326 48525</strong>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-white/90 border border-slate-100 shadow-sm text-xs">
                  B2B Only
                </span>
                <span className="px-3 py-1 rounded-full bg-white/90 border border-slate-100 shadow-sm text-xs">
                  500+ Brands
                </span>
                <span className="px-3 py-1 rounded-full bg-white/90 border border-slate-100 shadow-sm text-xs">
                  10k+ Buyers
                </span>
              </div>

              <div
                className="mt-6 w-36 h-2 rounded-full animated-gradient"
                aria-hidden
              ></div>
            </div>

            <div className="lg:col-span-6 relative">
              <div
                style={{ transform: `translateY(${parallaxY * 0.45}px)` }}
                className="relative rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(199,46,72,0.12)]"
              >
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=80"
                  alt="Fashion Exhibition"
                  className="w-full h-[320px] sm:h-[420px] md:h-[520px] object-cover block"
                  loading="lazy"
                />

                <svg
                  viewBox="0 0 1200 120"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 w-full h-12 opacity-80"
                >
                  <path
                    d="M0,0 C150,100 350,0 600,50 C850,100 1050,10 1200,80 L1200,0 L0,0 Z"
                    fill="#fff"
                    opacity="0.65"
                  />
                </svg>

                <div className="absolute top-5 left-5 bg-gradient-to-r from-white/20 to-white/5 rounded-lg px-3 py-1 backdrop-blur-sm text-white text-sm">
                  Palace Grounds, Bangalore • 28–30 Jul 2026
                </div>

                <div className="absolute left-4 top-8 w-16 h-16 rounded-full bg-gradient-to-br from-[#CE1446] to-[#B2192B] opacity-20 blur-xl" />
                <div className="absolute right-6 top-16 w-12 h-12 rounded-full bg-gradient-to-br from-[#D9737D] to-[#CE1446] opacity-18 blur-md" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 md:px-10 -mt-6">
        <div className="color-divider w-full rounded-lg" aria-hidden></div>
      </div>

      <main>
        <section id="highlights" className="py-12 md:py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 md:px-10">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                Event Highlights
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Key statistics that define the scale and impact of SIGA Fair
                2026
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 md:mt-10">
              <div className="p-4 md:p-6 bg-gradient-to-br from-white to-[#fff7f6] border border-gray-100 rounded-2xl shadow transition hover:-translate-y-1">
                <div className="text-2xl md:text-3xl font-extrabold text-[#CE1446]">
                  {stats.years}+
                </div>
                <div className="mt-1 text-xs md:text-sm text-slate-600">
                  Industry leadership
                </div>
              </div>

              <div className="p-4 md:p-6 bg-gradient-to-br from-white to-[#fff7f6] border border-gray-100 rounded-2xl shadow transition hover:-translate-y-1">
                <div className="text-2xl md:text-3xl font-extrabold text-[#B2192B]">
                  {stats.brands}+
                </div>
                <div className="mt-1 text-xs md:text-sm text-slate-600">
                  Exhibiting collections
                </div>
              </div>

              <div className="p-4 md:p-6 bg-gradient-to-br from-white to-[#fff7f6] border border-gray-100 rounded-2xl shadow transition hover:-translate-y-1">
                <div className="text-2xl md:text-3xl font-extrabold text-[#D9737D]">
                  {stats.states}+
                </div>
                <div className="mt-1 text-xs md:text-sm text-slate-600">
                  State participation
                </div>
              </div>

              <div className="p-4 md:p-6 bg-gradient-to-br from-white to-[#fff7f6] border border-gray-100 rounded-2xl shadow transition hover:-translate-y-1">
                <div className="text-2xl md:text-3xl font-extrabold text-[#CE1446]">
                  {stats.visitors.toLocaleString()}+
                </div>
                <div className="mt-1 text-xs md:text-sm text-slate-600">
                  Expected attendance
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#FEF2F2] rounded-full mb-4">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-[#780900]"
                >
                  <path
                    d="M12 17.3l6.18 3.73-1.64-7.03L21 9.24l-7.19-.62L12 2 10.19 8.62 3 9.24l4.46 4.76L5.82 21z"
                    fill="#780900"
                  />
                </svg>
                <span className="text-sm font-medium text-[#780900]">
                  PARTICIPATING BRANDS
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Featuring <span className="text-[#780900]">500+</span> Leading
                Brands
              </h2>

              <p className="text-gray-600 max-w-3xl mx-auto">
                Join India's premier brands showcasing their exclusive
                Autumn-Winter 2026 collections
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
              {brandLogos?.slice(0, 24).map((logo, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: Math.min(0.6, idx * 0.03),
                    duration: 0.45,
                  }}
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
                  navigate("/gallery");
                }}
                className="inline-flex  cursor-pointer items-center gap-2 px-4 py-2 bg-[#780900] text-white rounded-full text-sm font-semibold shadow"
              >
                View All Brands
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="ml-1"
                >
                  <path
                    d="M9 18l6-6-6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
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
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Stall Packages
                </h2>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choose the perfect space for your business
              </p>
            </motion.div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-4 px-4 text-left text-sm font-semibold text-gray-900">
                      PACKAGE
                    </th>
                    <th className="py-4 px-4 text-left text-sm font-semibold text-gray-900">
                      SIZE
                    </th>
                    <th className="py-4 px-4 text-left text-sm font-semibold text-gray-900">
                      RATE/SQ.M
                    </th>
                    <th className="py-4 px-4 text-left text-sm font-semibold text-gray-900">
                      TOTAL
                    </th>
                    <th className="py-4 px-4 text-left text-sm font-semibold text-gray-900"></th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      type: "Business Stall",
                      size: "12 sq.m",
                      rate: "₹5,900",
                      total: "₹70,800",
                      popular: false,
                    },
                    {
                      type: "Brand Wagon",
                      size: "24 sq.m",
                      rate: "₹6,900",
                      total: "₹1,65,600",
                      popular: false,
                    },
                    {
                      type: "Premium Wagon",
                      size: "30 sq.m",
                      rate: "₹6,900",
                      total: "₹2,07,000",
                      popular: true,
                    },
                    {
                      type: "Executive Wagon",
                      size: "40 sq.m",
                      rate: "₹6,900",
                      total: "₹2,76,000",
                      popular: false,
                    },
                  ].map((row, idx) => (
                    <motion.tr
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className={`border-b border-gray-100 hover:bg-white transition-colors ${row.popular ? "bg-[#CE1446]/5" : ""}`}
                    >
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">
                          {row.type}
                        </div>
                        {row.popular && (
                          <span className="inline-flex items-center gap-1 mt-1 px-2 py-1 bg-[#780900] text-white text-xs">
                            <Award size={10} />
                            MOST POPULAR
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-gray-700">{row.size}</td>
                      <td className="py-4 px-4 font-medium text-gray-900">
                        {row.rate}
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">
                          {row.total}
                        </div>
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
            <h3 className="text-xl md:text-2xl font-bold text-white">
              Ready to Exhibit at SIGA Fair 2026?
            </h3>
            <p className="text-white/90 mt-3 max-w-2xl mx-auto">
              Limited stalls available. Secure your spot today and connect with
              10,000+ buyers from across India.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setOpenReg(true)}
                className="px-6 py-3 bg-white text-[#780900] rounded-full font-semibold shadow"
                onMouseDown={ripple}
              >
                BOOK YOUR STALL NOW
              </button>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo("highlights");
                }}
                href="#highlights"
                className="px-4 py-2 rounded-full border border-white/30 text-white/90"
              >
                Learn more
              </a>
            </div>
          </div>
        </footer>
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#CE1446]/5  to-[#CE1446]/5"></div>

          <div className="container max-w-7xl mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Calendar className="text-[#780900]" size={28} />
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Event Schedule
                </h2>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Three days of intensive business networking and exhibitions
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {schedule.map((day, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  viewport={{ once: true }}
                  className={`p-8 z-10 bg-white border-2 border-gray-100 hover:border-[#780900] transition-colors`}
                >
                  <div className="text-center mb-6">
                    <div className="text-sm text-gray-500 mb-2 flex items-center justify-center gap-2">
                      <Clock size={14} />
                      {day.day}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      {day.date}
                    </div>
                    <div className="text-lg text-[#780900] font-medium">
                      {day.time}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                    {day.title}
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    {idx === 0 && [
                      "Inauguration Ceremony",
                      "CEO Roundtable",
                      "Networking Lunch",
                      "Exhibition Opens",
                    ]}
                    {idx === 1 && [
                      "B2B Meetings",
                      "Trend Analysis Session",
                      "Product Launches",
                      "Evening Cocktail",
                    ]}
                    {idx === 2 && [
                      "Final Business Deals",
                      "Awards Ceremony",
                      "Closing Gala",
                      "Check-out begins at 8 PM",
                    ]}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#CE1446]/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#CE1446]/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        </section>
      </main>

      <div className="fixed left-4 bottom-6 z-50 md:hidden">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpenReg(true)}
          className="px-4 py-3 rounded-full bg-[#780900] text-white shadow-lg"
          onMouseDown={ripple}
        >
          Register
        </motion.button>
      </div>

      <BrandLogo />

      <RegistrationModal
        open={openReg}
        onClose={() => setOpenReg(false)}
        form={form}
        setForm={setForm}
        onSubmit={submitForm}
        loading={loading}
      />
    </div>
  );
}
