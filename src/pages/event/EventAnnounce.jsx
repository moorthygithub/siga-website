import RegistrationModal from "@/components/ui/register-modal";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Award,
  Building,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  DollarSign,
  Globe,
  Mail,
  MapPin,
  Phone,
  Star,
  Target,
  TrendingUp,
  Users
} from "lucide-react";
import { useEffect, useState } from "react";

const EventAnnounce = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const eventDate = new Date("July 29, 2026 10:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    { icon: <Users size={24} />, value: "500+", label: "Exhibiting Brands" },
    { icon: <TrendingUp size={24} />, value: "30+", label: "Years Experience" },
    { icon: <Users size={24} />, value: "10K+", label: "Expected Visitors" },
    {
      icon: <DollarSign size={24} />,
      value: "1000Cr+",
      label: "Business Expected",
    },
  ];

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

  const allBrandLogos = [
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
    "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?w=200&h=200&fit=crop&q=80&16",
  ];

  const [openReg, setOpenReg] = useState(false);

  // form state for modal (if used)
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      alert("Please provide name and email");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenReg(false);
      alert("Registration request received. We'll contact you soon.");
      setForm({ name: "", email: "", phone: "" });
    }, 900);
  };

  return (
    <div className="relative w-full bg-white overflow-hidden py-22">
      {/* Hero Section with Countdown */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#CE1446]/5 via-white to-[#CE1446]/5"></div>

        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#CE1446]/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#CE1446]/10 rounded-full translate-x-1/3 translate-y-1/3"></div>

        <div className="container max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col items-center text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-[#780900] text-white mb-8"
            >
              <Target size={16} />
              <span className="text-sm tracking-widest">
                OFFICIAL ANNOUNCEMENT
              </span>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <span className="text-sm tracking-widest">2026 EDITION</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-6 leading-tight"
            >
              <span className="text-[#780900]">SIGA</span> FAIR
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl lg:text-4xl text-gray-700 mb-12 font-light tracking-wide"
            >
              Autumn Winter Collections 2026
            </motion.h2>

            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <div className="text-sm text-gray-600 mb-4 tracking-widest">
                EVENT STARTS IN
              </div>
              <div className="flex gap-3 md:gap-6">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="flex flex-col items-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white border-2 border-gray-200 flex items-center justify-center mb-2">
                      <span className="text-2xl md:text-3xl font-bold text-gray-900">
                        {value.toString().padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-xs text-gray-600 uppercase tracking-wider">
                      {unit}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Event Details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#CE1446]/10 flex items-center justify-center">
                  <Calendar className="text-[#780900]" size={20} />
                </div>
                <div>
                  <div className="text-sm text-gray-500">DATE</div>
                  <div className="text-lg font-semibold text-gray-900">
                    29-31 July 2026
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#CE1446]/10 flex items-center justify-center">
                  <MapPin className="text-[#780900]" size={20} />
                </div>
                <div>
                  <div className="text-sm text-gray-500">VENUE</div>
                  <div className="text-lg font-semibold text-gray-900">
                    Palace Grounds, Bangalore
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#CE1446]/10 flex items-center justify-center">
                  <Clock className="text-[#780900]" size={20} />
                </div>
                <div>
                  <div className="text-sm text-gray-500">TIMINGS</div>
                  <div className="text-lg font-semibold text-gray-900">
                    10:00 AM - 8:00 PM
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-16"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpenReg(true)}
                className="px-10 py-4 bg-[#780900] text-white text-sm tracking-wider font-medium relative overflow-hidden group flex items-center justify-center gap-2"
              >
                <span className="relative z-10">REGISTER AS EXHIBITOR</span>
                <ChevronRight size={16} className="relative z-10" />
                <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </motion.button>

              <motion.button
                whileHover={{ backgroundColor: "#f3f4f6" }}
                className="px-10 py-4 border-2 border-gray-900 text-gray-900 text-sm tracking-wider font-medium flex items-center justify-center gap-2"
              >
                <Users size={16} />
                REQUEST VISITOR PASS
              </motion.button>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.6,
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2,
              }}
              className="flex flex-col items-center"
            >
              <span className="text-sm text-gray-500 mb-2">
                Scroll to explore
              </span>
              <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
                <ArrowDown
                  size={12}
                  className="text-gray-400 mt-2 animate-bounce"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white"
              >
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-[#CE1446]/10 rounded-full flex items-center justify-center">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-[#780900] mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Participation Section */}
      <section className="py-24 bg-white">
        <div className="container max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-[#CE1446]/10 rounded-full mb-6">
              <Star className="text-[#780900]" size={16} />
              <span className="text-sm font-medium text-[#780900]">
                PARTICIPATING BRANDS
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featuring <span className="text-[#780900]">500+</span> Leading
              Brands
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Join India's premier brands showcasing their exclusive
              Autumn-Winter 2026 collections
            </p>
          </motion.div>

          {/* Brand Logos Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6 mb-16">
            {allBrandLogos.map((logo, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: Math.floor(idx / 8) * 0.1 + (idx % 8) * 0.05,
                }}
                viewport={{ once: true }}
                className="aspect-square bg-gray-50 border border-gray-200 rounded-xl overflow-hidden group hover:border-[#780900] transition-all duration-300 hover:shadow-lg"
              >
                <img
                  src={logo}
                  alt={`Brand ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>

          {/* Brand Categories */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Brand Categories
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  name: "Men's Wear",
                  count: "190+",
                  icon: "👔",
                  color: "bg-blue-100 text-blue-800",
                },
                {
                  name: "Women's Wear",
                  count: "230+",
                  icon: "👗",
                  color: "bg-pink-100 text-pink-800",
                },
                {
                  name: "Kid's Wear",
                  count: "70+",
                  icon: "👶",
                  color: "bg-yellow-100 text-yellow-800",
                },
                {
                  name: "Accessories",
                  count: "50+",
                  icon: "👒",
                  color: "bg-purple-100 text-purple-800",
                },
              ].map((category, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl text-center hover:shadow-md transition-shadow"
                >
                  <div
                    className={`text-2xl mb-3 w-12 h-12 rounded-full flex items-center justify-center mx-auto ${category.color}`}
                  >
                    {category.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h4>
                  <div className="text-2xl font-bold text-[#780900]">
                    {category.count}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Participating Brands
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Premium Brands Showcase */}
          <div className="bg-gradient-to-r from-[#CE1446]/5 to-[#CE1446]/10 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Premium Brand Patners
                </h3>
                <p className="text-gray-600">
                  Exclusive preview of featured brands
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#780900] rounded-full animate-pulse"></div>
                <span className="text-sm text-[#780900] font-medium">LIVE</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: item * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#780900] transition-colors"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden">
                      <img
                        src={allBrandLogos[item]}
                        alt="Premium Brand"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        Premium Brand #{item}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Established 199{item * 5}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Products:</span>
                      <span className="font-medium text-gray-900">
                        250+ SKUs
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Exports:</span>
                      <span className="font-medium text-gray-900">
                        20+ Countries
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Showcasing:</span>
                      <span className="font-medium text-[#780900]">
                        AW 2026 Collection
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Award className="text-[#780900]" size={28} />
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  30 Years of <span className="text-[#780900]">Excellence</span>
                </h2>
              </div>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                For over three decades, SIGA Fair has been South India's premier
                platform connecting manufacturers with retailers. Experience the
                largest showcase of Autumn-Winter fashion with exclusive
                previews and unparalleled networking opportunities.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "500+ Exhibiting Brands",
                  "10,000+ Professional Buyers",
                  "B2B Business Meetings",
                  "Trend Forecasting Sessions",
                  "Industry Networking Events",
                  "International Buyer Delegations",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="text-[#780900]" size={18} />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-video bg-gray-100 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=80"
                  alt="Exhibition Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-20 bg-white">
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
                className={`p-8 bg-white border-2 ${idx === 0 ? "border-[#780900]" : "border-gray-100"} hover:border-[#780900] transition-colors`}
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
      </section>

      {/* Pricing Section */}
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

      {/* CTA Section */}
      <section className="py-20 bg-[#780900]">
        <div className="container max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Limited Stalls Available
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
              Book your stall before 5th July 2025 to secure prime location. 50%
              advance payment required.
            </p>

            {/* Single button (no nested button) */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpenReg(true)}
              className="px-6 py-3 bg-white text-[#780900] rounded-full font-semibold shadow"
            >
              BOOK YOUR STALL NOW!
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-10 bg-gray-900 text-white">
        <div className="container max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building size={20} />
                <h3 className="text-lg font-bold">ORGANIZED BY</h3>
              </div>
              <div className="space-y-2 text-gray-400">
                <p>South India Garments Association</p>
                <p className="text-sm">
                  30 Years of Excellence in Garment Industry
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Phone size={20} />
                <h3 className="text-lg font-bold">CONTACT</h3>
              </div>
              <div className="space-y-2 text-gray-400">
                <p>SIGA Office: 96326 48525</p>
                <p>Govind Mundra: 94484 61384</p>
                <p>Govind Garg: 88671 71060</p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Mail size={20} />
                <h3 className="text-lg font-bold">EMAIL & WEB</h3>
              </div>
              <div className="space-y-2 text-gray-400">
                <p>info.sigafair@gmail.com</p>
                <div className="flex items-center gap-2">
                  <Globe size={14} />
                  <span>www.sigafair.com</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <DollarSign size={20} />
                <h3 className="text-lg font-bold">BANK DETAILS</h3>
              </div>
              <div className="space-y-2 text-gray-400">
                <p>Cheque / NEFT / UPI.</p>
                <p>South India Garment Association.</p>
                <p>Canara Bank, Shantinaga.r</p>
                <p>IFSC: CNRB0000681.</p>
                <p>A/C: 0681201002725.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
};

export default EventAnnounce;
