import { motion } from "framer-motion";
import qr from "../assets/logos/qr.jpeg"; // 👉 add your QR image here

export default function Donate() {
  return (
    <div className="bg-zinc-50 pt-24">

      {/* 🔥 HERO */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-6 overflow-hidden">

        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1509099836639-18ba1795216d"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative text-center max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-black text-white">
            Donate Today ❤️
          </h1>
          <p className="text-zinc-300 mt-4">
            Empower lives. Build futures. Support grassroots entrepreneurs.
          </p>
        </motion.div>
      </section>

      {/* 🔥 QR + BANK DETAILS */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* QR */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold mb-6">
              Scan QR to Donate
            </h2>

            <div className="inline-block p-6 bg-zinc-50 rounded-3xl shadow">
              <img
                src={qr}
                className="w-56 h-56 object-contain mx-auto"
              />
            </div>

            <p className="text-sm text-zinc-500 mt-4">
              UPI / QR Payment Supported
            </p>
          </motion.div>

          {/* BANK DETAILS */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="p-8 bg-zinc-50 rounded-3xl shadow"
          >
            <h2 className="text-2xl font-bold mb-6">
              Banking Details
            </h2>

            <div className="space-y-3 text-zinc-700 text-sm leading-relaxed">
              <p><strong>Account Name:</strong> YouthAid Foundation</p>
              <p><strong>Account No:</strong> 023004317117195001</p>
              <p><strong>IFSC Code:</strong> CSBK0000230</p>
              <p><strong>Branch:</strong> Pune</p>
              <p><strong>Bank:</strong> Catholic Syrian Bank Limited</p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 🔥 THANK YOU SECTION */}
      <section className="py-24 px-6 bg-zinc-950 text-white text-center relative overflow-hidden">

        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1492724441997-5dc865305da7"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="relative max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Thank You 🙏
          </h2>

          <p className="text-zinc-400 mt-6">
            To all our donors, partners, and volunteers — your support is
            transforming lives and creating opportunities for thousands.
          </p>

        </motion.div>

      </section>

    </div>
  );
}