import { motion } from "framer-motion";
import { 
  Users, 
  Handshake, 
  UserPlus, 
  TrendingUp, 
  Heart, 
  ShieldCheck, 
  MapPin, 
  Mail, 
  Phone,
  Briefcase
} from "lucide-react";

export default function JoinUs() {
  return (
    <div className="bg-white">
      {/* 🔥 PREMIUM HERO (No Top Padding) */}
      <section className="relative h-[85vh] flex items-center px-6 md:px-12 overflow-hidden bg-black">
        <motion.div 
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a"
            className="w-full h-full object-cover opacity-60"
            alt="Hero Background"
          />
        </motion.div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-3xl text-white z-10"
        >
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-tight">
            Join the
            <br />
            <span className="text-red-500 italic">Movement</span>
          </h1>

          <p className="mt-8 text-xl text-zinc-300 max-w-xl leading-relaxed">
            We are on a mission to empower 50,000+ grassroots entrepreneurs. 
            Your partnership bridges the gap between potential and prosperity.
          </p>

          <div className="mt-10 flex gap-4">
            <button className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-red-600/20">
              Partner With Us
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-xl font-bold transition-all">
              Learn More
            </button>
          </div>
        </motion.div>
      </section>

      {/* 🔥 PARTNERSHIP SECTION */}
      <Section className="relative bg-zinc-50/50">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-zinc-900">Partnership Models</h2>
          <p className="text-zinc-500 mt-4">Together, we can scale social change.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <Card 
            icon={<Handshake className="w-8 h-8 text-red-500" />}
            title="CSR Partnership"
          >
            Implement Schedule VII activities with direct impact. We provide end-to-end transparency and reporting.
          </Card>

          <Card 
            icon={<TrendingUp className="w-8 h-8 text-red-500" />}
            title="Marketing Collaborations"
          >
            Enhance your brand's social footprint through collaborative exhibitions, campaigns, and digital platforms.
          </Card>

          <Card 
            icon={<UserPlus className="w-8 h-8 text-red-500" />}
            title="Individuals"
          >
            Contribute seed capital for rural startups. Track your impact in real-time with 80G tax benefits.
          </Card>
        </div>
      </Section>

      {/* 🔥 BENEFITS (GRID UI) */}
      <Section className="bg-white border-y border-zinc-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <BenefitItem 
              icon={<ShieldCheck className="w-10 h-10 text-emerald-500" />}
              title="80G Tax Exemption"
              desc="All contributions are eligible for tax deductions under Section 80G."
            />
            <BenefitItem 
              icon={<Heart className="w-10 h-10 text-red-500" />}
              title="Social Impact"
              desc="Nurture growth in underserved communities and see the transformation firsthand."
            />
            <BenefitItem 
              icon={<Users className="w-10 h-10 text-blue-500" />}
              title="Brand Reputation"
              desc="Build a legacy of purpose-driven business that resonates with modern consumers."
            />
          </div>
        </div>
      </Section>

      {/* 🔥 CAREER / WORK WITH US */}
      <Section className="bg-zinc-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-red-600/20 blur-[120px] rounded-full" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold mb-6 italic">Work With Us</h2>
              <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-red-500/50 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <Briefcase className="text-red-500" size={24} />
                  <h3 className="text-xl font-bold">Program Officer</h3>
                </div>
                <div className="flex items-center gap-2 text-zinc-400 mb-4 text-sm">
                  <MapPin size={16} /> <span>Bengaluru, India</span>
                </div>
                <ul className="space-y-3 text-zinc-400 text-sm">
                  <li className="flex gap-2"><span>•</span> Mobilize and train grassroots entrepreneurs</li>
                  <li className="flex gap-2"><span>•</span> Lead community-driven field workshops</li>
                  <li className="flex gap-2"><span>•</span> ₹25,000 – ₹30,000 / month</li>
                </ul>
              </div>
            </div>
            
            <div className="md:w-1/2 w-full">
              <div className="bg-white p-8 rounded-3xl text-zinc-900 shadow-2xl">
                <h3 className="text-2xl font-bold mb-6 text-center">Join the Team</h3>
                <Form dark={false} />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 🔥 VOLUNTEER SECTION */}
      <Section className="bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Become a Volunteer</h2>
          <p className="text-zinc-500 mb-12">Don't have funds but have time? We need your skills.</p>
          <Form dark={false} />
        </div>
      </Section>

      {/* 🔥 FINAL CTA */}
      <section className="py-24 bg-red-600 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <h2 className="text-4xl md:text-5xl font-black mb-8 relative z-10">
          Ready to make a difference?
        </h2>
        <button className="px-12 py-5 bg-white text-red-600 rounded-full font-black text-lg hover:scale-105 transition-transform shadow-xl relative z-10">
          Donate & Support Mission
        </button>
      </section>
    </div>
  );
}

/* 🔥 REFINED COMPONENTS */

function Section({ children, className = "" }) {
  return (
    <section className={`py-24 px-6 md:px-12 ${className}`}>
      {children}
    </section>
  );
}

function Card({ title, children, icon }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="p-8 bg-white rounded-3xl border border-zinc-200 shadow-sm hover:shadow-xl transition-all duration-300 group"
    >
      <div className="mb-6 p-3 bg-zinc-50 rounded-2xl w-fit group-hover:bg-red-50 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-zinc-900 group-hover:text-red-600 transition">
        {title}
      </h3>
      <p className="text-zinc-500 leading-relaxed text-sm">
        {children}
      </p>
    </motion.div>
  );
}

function BenefitItem({ icon, title, desc }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-6">{icon}</div>
      <h3 className="text-lg font-bold text-zinc-900 mb-2">{title}</h3>
      <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function Form({ dark = false }) {
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <Input placeholder="First Name" />
        <Input placeholder="Last Name" />
      </div>
      <Input placeholder="Email Address" icon={<Mail size={18}/>} />
      <Input placeholder="Phone Number" icon={<Phone size={18}/>} />
      <textarea
        placeholder="Why do you want to join us?"
        className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none min-h-30 transition-all"
      />
      <button className="w-full py-4 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 transition shadow-lg shadow-red-600/20">
        Submit Application
      </button>
    </div>
  );
}

function Input({ placeholder, icon }) {
  return (
    <div className="relative group">
      <input
        placeholder={placeholder}
        className="w-full p-4 pl-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-red-500 outline-none transition-all"
      />
      {icon && <div className="absolute right-4 top-4 text-zinc-400">{icon}</div>}
    </div>
  );
}