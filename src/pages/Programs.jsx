import { motion } from "framer-motion";
// Programs.jsx - Update your imports at the top
import { 
  Zap, 
  Handshake, 
  TrendingUp, 
  Lightbulb, 
  Award, 
  ShieldCheck, 
  ArrowRight, 
  Coins, 
  Network,
  Globe // <--- Add this
} from "lucide-react";

const programs = [
  {
    title: "Saksham",
    desc: "Entrepreneurship development and capacity building for grassroots women.",
    icon: <Zap className="w-6 h-6 text-orange-500" />,
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    title: "Sankalp",
    desc: "Business mentoring and long-term support for sustainable growth.",
    icon: <Handshake className="w-6 h-6 text-blue-500" />,
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Sphoorti",
    desc: "Skill enhancement and livelihood generation programs.",
    icon: <TrendingUp className="w-6 h-6 text-green-500" />,
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    title: "Nidhi",
    desc: "Seed funding and financial assistance for micro-enterprises.",
    icon: <Coins className="w-6 h-6 text-yellow-500" />,
    color: "from-yellow-500/20 to-orange-500/20",
  },
  {
    title: "YES Summit",
    desc: "Annual innovation and entrepreneurship networking platform.",
    icon: <Network className="w-6 h-6 text-purple-500" />,
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "YES Awards",
    desc: "Recognition of impactful entrepreneurs and leaders.",
    icon: <Award className="w-6 h-6 text-red-500" />,
    color: "from-red-500/20 to-rose-500/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Programs() {
  return (
    <div className="bg-[#FAF9F6] font-sans text-zinc-900 selection:bg-red-100 selection:text-red-600">

      {/* 🚀 MINIMAL HERO */}
   {/* 🚀 HIGH-CONTRAST HERO */}
<section className="relative h-[75vh] flex items-center justify-center px-6 overflow-hidden">
  <div className="absolute inset-0 z-0">
    <img
      src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80"
      className="w-full h-full object-cover"
      alt="Programs Hero"
    />
    {/* EXTRA DARK OVERLAY */}
    <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-[3px]" />
    
    {/* VIGNETTE GRADIENT (Makes edges darker, center clearer) */}
    <div className="absolute inset-0 bg-linear-to-b from-zinc-950/50 via-transparent to-[#FAF9F6]" />
  </div>

  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: "easeOut" }}
    className="relative text-center max-w-4xl z-10"
  >
    {/* ACCENT TAG */}
    <motion.span 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.5em] uppercase bg-red-600 text-white rounded-full shadow-lg shadow-red-900/40"
    >
      The Ecosystem
    </motion.span>

    {/* MAIN TITLE WITH TEXT SHADOW */}
    <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase drop-shadow-2xl">
      Incubating <br /> 
      <span className="italic text-transparent bg-clip-text bg-linear-to-r from-red-500 to-orange-400 drop-shadow-none">
        Impact.
      </span>
    </h1>

    {/* SUBTEXT WITH HIGH CONTRAST */}
    <p className="mt-8 text-zinc-100 text-lg md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md">
      Our structured frameworks are designed to take a micro-entrepreneur from a 
      <span className="text-white border-b-2 border-red-500 ml-2">dream to a scalable reality.</span>
    </p>
  </motion.div>
</section>

      {/* 🛠️ PROGRAM GRID */}
      <section className="py-32 px-6">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {programs.map((p, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative p-10 rounded-[2.5rem] bg-white border border-zinc-100 hover:border-transparent hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 overflow-hidden"
            >
              {/* Subtle Corner Number */}
              <span className="absolute top-8 right-10 text-4xl font-black text-zinc-50 group-hover:text-red-50 transition-colors">
                0{i + 1}
              </span>

              {/* Icon Circle */}
              <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${p.color} flex items-center justify-center mb-8`}>
                {p.icon}
              </div>

              <h2 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-red-600 transition-colors">
                {p.title}
              </h2>

              <p className="text-zinc-500 leading-relaxed mb-8 font-light">
                {p.desc}
              </p>

              <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                Learn More <ArrowRight className="w-4 h-4 text-red-500" />
              </button>
              
              {/* Bottom Decoration */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 🧠 WHY JOIN (MINIMALIST BOXES) */}
      <section className="py-32 px-6 bg-zinc-950 rounded-[4rem] mx-4 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-125 h-125 bg-red-600/10 blur-[120px] rounded-full" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                The YouthAid <br /><span className="text-zinc-600 uppercase italic">Advantage</span>
              </h2>
            </div>
            <p className="text-zinc-400 text-lg max-w-sm font-light">
              We provide the scaffolding. You provide the grit. Together, we build the future.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <FeatureBox title="Expert Guidance" icon={<ShieldCheck className="w-5 h-5" />} />
            <FeatureBox title="Capital Access" icon={<Coins className="w-5 h-5" />} />
            <FeatureBox title="Global Network" icon={<Globe className="w-5 h-5" />} />
            <FeatureBox title="Innovation Lab" icon={<Lightbulb className="w-5 h-5" />} />
          </div>
        </div>
      </section>

      {/* 🎯 CALL TO ACTION */}
      <section className="py-40 px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">
            READY TO <span className="text-red-600">SCALE?</span>
          </h2>
          <p className="text-zinc-500 text-xl font-light mb-12">
            Applications for the next cohort of Saksham and Sankalp are now open. Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="px-10 py-5 bg-red-600 text-white rounded-full font-bold hover:bg-zinc-900 hover:scale-105 transition-all shadow-xl shadow-red-900/20">
              Apply Now
            </button>
            <button className="px-10 py-5 bg-white border border-zinc-200 text-zinc-900 rounded-full font-bold hover:bg-zinc-50 transition-all">
              Download Brochure
            </button>
          </div>
        </motion.div>
      </section>

    </div>
  );
}

function FeatureBox({ title, icon }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md group hover:bg-white transition-all duration-500"
    >
      <div className="text-red-500 mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-white font-bold text-lg group-hover:text-zinc-900 transition-colors">
        {title}
      </h3>
    </motion.div>
  );
}