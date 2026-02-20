import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BrandColumn } from "@/components/ui/brand-logo-columns";
import {
  Calendar,
  ChevronRight,
  Clock,
  DollarSign,
  MapPin,
  Users,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  animate,
  useReducedMotion,
} from "framer-motion";
import RegistrationModal from "@/components/ui/register-modal";
import BASE_URL from "@/config/BaseUrl";
const fetchBrandLogos = async () => {
  const res = await axios.get(`${BASE_URL}/api/getBrandLogos`);
  return res.data.brand_logos;
};

const BrandLogoSection = () => {
  const [openReg, setOpenReg] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const {
    data: logos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["brandLogos"],
    queryFn: fetchBrandLogos,
  });
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const eventDate = new Date("July 28, 2026 10:00:00").getTime();

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
  if (isLoading) return <p className="text-center py-10">Loading logos...</p>;
  if (isError) return <p className="text-center py-10">Failed to load logos</p>;

  const columnsCount = 8;
  const logosPerColumn = Math.ceil(logos.length / columnsCount);
  const columns = Array.from({ length: columnsCount }, (_, i) =>
    logos.slice(i * logosPerColumn, (i + 1) * logosPerColumn),
  );

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="text-[#780900]" size={28} />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Our Partners
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trusted brands and partners we proudly work with
          </p>
        </motion.div>
        {/* <div className="flex justify-center gap-6 mt-10 max-h-[340px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]"> */}

        <div className="flex justify-center gap-6 mt-10 max-h-[340px] overflow-hidden">
          <BrandColumn logos={columns[0]} duration={15} />
          <BrandColumn logos={columns[1]} duration={20} />
          <BrandColumn logos={columns[2]} duration={10} />
          <BrandColumn
            logos={columns[3]}
            duration={13}
            className="hidden md:block"
          />
          <BrandColumn
            logos={columns[4]}
            duration={18}
            className="hidden md:block"
          />
          <BrandColumn
            logos={columns[5]}
            duration={16}
            className="hidden md:block"
          />
          <BrandColumn
            logos={columns[6]}
            duration={12}
            className="hidden md:block"
          />
          <BrandColumn
            logos={columns[7]}
            duration={14}
            className="hidden md:block"
          />
          <BrandColumn
            logos={columns[8]}
            duration={13}
            className="hidden md:block"
          />
        </div>
        <div className="container max-w-6xl mx-auto px-4 md:px-8 relative z-10 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex justify-center gap-3 md:gap-6 mb-8">
                  {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="flex flex-col items-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-[#780900] text-white border-2 border-gray-200 flex items-center justify-center mb-2">
                        <span className="text-2xl md:text-3xl font-bold ">
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

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col md:flex-row justify-center gap-6 md:gap-12"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#CE1446]/10 flex items-center justify-center">
                    <Calendar className="text-[#780900]" size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">DATE</div>
                    <div className="text-lg font-semibold text-gray-900">
                      28-30 July 2026
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
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpenReg(true)}
                className="px-10 py-4 bg-[#780900] text-white text-sm tracking-wider font-medium relative overflow-hidden group flex items-center justify-center gap-2"
              >
                <span className="relative z-10">BOOK NOW</span>
                <ChevronRight size={16} className="relative z-10" />
                <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </motion.button>
            </motion.div>
          </div>
        </div>
        <div className="flex justify-center gap-6  max-h-[340px] overflow-hidden">
          <BrandColumn logos={columns[0]} duration={15} />
          <BrandColumn logos={columns[1]} duration={20} />
          <BrandColumn logos={columns[2]} duration={10} />
          <BrandColumn
            logos={columns[3]}
            duration={13}
            className="hidden md:block"
          />
          <BrandColumn
            logos={columns[4]}
            duration={18}
            className="hidden md:block"
          />
          <BrandColumn
            logos={columns[5]}
            duration={16}
            className="hidden md:block"
          />
          <BrandColumn
            logos={columns[6]}
            duration={12}
            className="hidden md:block"
          />
          <BrandColumn
            logos={columns[7]}
            duration={14}
            className="hidden md:block"
          />
          <BrandColumn
            logos={columns[8]}
            duration={13}
            className="hidden md:block"
          />
        </div>
      </div>

      <RegistrationModal
        open={openReg}
        onClose={() => setOpenReg(false)}
        form={form}
        setForm={setForm}
        onSubmit={submitForm}
        loading={loading}
      />
    </section>
  );
};

export default BrandLogoSection;
