import { motion } from "framer-motion";
import {
  Rocket,
  Target
} from "lucide-react";

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { deleteMembers, getMembers } from "../utils/storage";

export default function About() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  const [members, setMembers] = useState([]);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const stored = await getMembers();

        if (stored.length === 0) {
          setMembers([
            { id: 1, name: "Mr. Mathew Mattam", role: "Chairperson" },
            { id: 2, name: "Mr. Ashish Ingole", role: "COO" },
            { id: 3, name: "Dr. Vikas Abnave", role: "Research Head" },
            { id: 4, name: "Er. Amal Antony", role: "WASH Head" },
            { id: 5, name: "Mr. Jay Kishan", role: "Auditor" }
          ]);
        } else {
          setMembers(stored);
        }
      } catch (error) {
        console.error('Error fetching members:', error);
        // Fallback to default members if API fails
        setMembers([
          { id: 1, name: "Mr. Mathew Mattam", role: "Chairperson" },
          { id: 2, name: "Mr. Ashish Ingole", role: "COO" },
          { id: 3, name: "Dr. Vikas Abnave", role: "Research Head" },
          { id: 4, name: "Er. Amal Antony", role: "WASH Head" },
          { id: 5, name: "Mr. Jay Kishan", role: "Auditor" }
        ]);
      }
    };

    fetchMembers();
  }, []);

  const deleteMember = async (id) => {
    try {
      await deleteMembers(id);
      const updated = members.filter(m => m.id !== id);
      setMembers(updated);
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  return (
    <div className="bg-[#FAF9F6] text-zinc-900 overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 pt-24">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-zinc-950/70" />
        </div>

        <motion.div className="relative text-center">
          <h1 className="text-5xl md:text-8xl font-black text-white">
            Impact <br />
            <span className="text-red-500">Beyond Borders</span>
          </h1>

          <p className="text-zinc-300 mt-6 text-lg max-w-xl mx-auto">
            Empowering 16,000+ women to redefine their destinies.
          </p>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="relative px-6 -mt-16 z-10">
        <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <Stat value="16k+" label="Founders" />
          <Stat value="24" label="Districts" />
          <Stat value="1M" label="2035 Goal" />
          <Stat value="100%" label="Dedication" />
        </div>
      </section>

      {/* STORY */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div {...fadeInUp}>
          <h2 className="text-4xl font-black mb-6">
            About YouthAid Foundation
          </h2>

          <p className="text-zinc-600 text-lg leading-relaxed">
            YouthAid Foundation has empowered over 16,000 grassroots women
            across urban, rural, and tribal areas to start micro and small enterprises.
          </p>

          <p className="text-zinc-600 mt-4">
            Through mentorship, training, and support, we transform lives and build
            sustainable economic ecosystems.
          </p>
        </motion.div>

        <img
          src="https://images.unsplash.com/photo-1593113630400-ea4288922497"
          className="rounded-3xl shadow-xl"
        />
      </section>

      {/* VISION & MISSION */}
      <section className="py-20 px-6 bg-zinc-950 text-white rounded-3xl mx-4">
        <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto">

          <div className="p-10 border border-white/10 rounded-3xl">
            <Target className="text-red-500 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Our Vision</h3>
            <p className="text-zinc-400">
              Create opportunities for grassroots entrepreneurs.
            </p>
          </div>

          <div className="p-10 bg-red-500 rounded-3xl">
            <Rocket className="mb-4" />
            <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
            <p>
              Empower 1 million entrepreneurs by 2035.
            </p>
          </div>

        </div>
      </section>

      {/* 🔥 DYNAMIC LEADERS */}
      <section className="py-24 px-6">
        <h2 className="text-4xl font-black text-center mb-16">
          Our Leadership
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">

          {members.map((m) => (
            <motion.div key={m.id} whileHover={{ y: -10 }} className="text-center">

             
               <img
  src={m.image || "https://images.unsplash.com/photo-1507003211169"}
  className="w-full h-full object-cover group-hover:scale-105 transition"
/>

              <h4 className="font-bold">{m.name}</h4>
              <p className="text-red-500 text-sm">{m.role}</p>

              {isAdmin && (
                <button
                  onClick={() => deleteMember(m.id)}
                  className="text-red-500 text-xs mt-2"
                >
                  Delete
                </button>
              )}

            </motion.div>
          ))}

        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 px-6 bg-zinc-100">
        <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <Box title="WASH" />
          <Box title="Startup Support" />
          <Box title="Research" />
          <Box title="Services" />
        </div>
      </section>

      {/* VIDEO */}
      <section className="py-24 px-6 bg-zinc-950 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">
          Watch Our Impact
        </h2>

        <div className="max-w-4xl mx-auto aspect-video">
          <iframe
            className="w-full h-full rounded-xl"
            src="https://www.youtube.com/embed/8G-YoVnxgHU"
          />
        </div>
      </section>

    </div>
  );
}

/* COMPONENTS */

function Stat({ value, label }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm text-zinc-400">{label}</div>
    </div>
  );
}

function Box({ title }) {
  return (
    <div className="p-8 bg-white rounded-2xl shadow text-center">
      <h3 className="font-bold">{title}</h3>
    </div>
  );
}