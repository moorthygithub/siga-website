import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RegistrationModal = ({
  open,
  onClose,
  form,
  setForm,
  onSubmit,
  loading,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open || !modalRef.current) return;
    const nodes = Array.from(
      modalRef.current.querySelectorAll(
        "a,button,input,textarea,select,[tabindex]:not([tabindex='-1'])",
      ),
    ).filter((n) => !n.hasAttribute("disabled"));

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
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && open) onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-60 flex items-center justify-center p-4 md:p-8"
        >
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="reg-title"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="relative z-50 w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl"
          >
            <h3 id="reg-title" className="text-lg font-bold">
              Quick Registration
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Fill in basic details — our team will get back to you.
            </p>

            <form onSubmit={onSubmit} className="mt-4 space-y-3">
              <label className="block text-sm">
                Name
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                />
              </label>
              <label className="block text-sm">
                Email
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                />
              </label>
              <label className="block text-sm">
                Phone
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                />
              </label>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-[#780900] text-white rounded-md"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>

            <div className="mt-4 text-xs text-slate-500">
              By submitting you agree to be contacted by SIGA for stall booking
              and related communication.
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegistrationModal;
