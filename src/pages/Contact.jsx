import { motion } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Send, 
  Facebook, 
  Instagram, 
  Youtube, 
  Linkedin,
  ArrowRight
} from "lucide-react";

export default function Contact() {
  return (
    <div className="bg-white">
      {/* 🔥 DARK HERO (No Padding Top) */}
      <section className="relative h-[60vh] flex items-center justify-center px-6 overflow-hidden bg-black">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
            className="w-full h-full object-cover"
            alt="Contact Hero"
          />
        </motion.div>
        
        {/* Deep Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/40 to-black/90" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative text-center z-10"
        >
          <span className="text-red-500 font-bold tracking-widest uppercase text-sm mb-4 block">
            Get In Touch
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
            Let's Start a <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-orange-400">
              Conversation
            </span>
          </h1>
          <p className="text-zinc-400 mt-6 max-w-lg mx-auto text-lg">
            Have questions? We’re here to help and explore new possibilities together.
          </p>
        </motion.div>
      </section>

      {/* 🔥 CONTACT INFO & FORM SPLIT */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* LEFT: Info & Socials */}
          <div className="lg:col-span-4 space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 mb-8">Contact Information</h2>
              <div className="space-y-8">
                <ContactDetail 
                  icon={<MapPin className="text-red-500" />}
                  title="Our Office"
                  content="Flat no. 102, Crown Plaza, Deccan College Rd, Yerawada, Pune"
                />
                <ContactDetail 
                  icon={<Phone className="text-red-500" />}
                  title="Phone Number"
                  content="+91 7744049934"
                />
                <ContactDetail 
                  icon={<Mail className="text-red-500" />}
                  title="Email Address"
                  content="youthaidf@gmail.com"
                />
              </div>
            </div>

            <div className="p-8 bg-zinc-900 rounded-3xl text-white">
              <h3 className="text-xl font-bold mb-6">Follow Our Journey</h3>
              <div className="flex gap-4">
                <SocialCircle icon={<Facebook size={20} />} />
                <SocialCircle icon={<Instagram size={20} />} />
                <SocialCircle icon={<Youtube size={20} />} />
                <SocialCircle icon={<Linkedin size={20} />} />
              </div>
            </div>
          </div>

          {/* RIGHT: Modern Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-8 bg-zinc-50 p-8 md:p-12 rounded-4xl border border-zinc-100 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-8">
              <MessageSquare className="text-red-500" />
              <h2 className="text-2xl font-bold">Send us a Message</h2>
            </div>

            <form className="grid md:grid-cols-2 gap-6">
              <FormGroup label="First Name" placeholder="John" />
              <FormGroup label="Last Name" placeholder="Doe" />
              <FormGroup label="Email Address" placeholder="john@example.com" type="email" />
              <FormGroup label="Phone Number" placeholder="+91 ..." type="tel" />
              
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-zinc-700 mb-2">Message</label>
                <textarea 
                  rows="5"
                  placeholder="How can we help you?"
                  className="w-full p-4 bg-white border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
                />
              </div>

              <div className="md:col-span-2">
                <button className="group flex items-center justify-center gap-2 w-full md:w-max px-10 py-4 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-600/20">
                  Send Message
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </form>
          </motion.div>

        </div>
      </section>

      {/* 🔥 MAP / LOCATION CTA */}
      <section className="py-24 px-6 bg-zinc-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1492724441997-5dc865305da7"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Support Our Mission</h2>
          <p className="text-zinc-400 text-lg mb-10">
            Your support enables us to provide tools, training, and capital to 
            grassroots leaders across the nation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 bg-red-600 rounded-full font-bold hover:scale-105 transition shadow-xl">
              Donate Now
            </button>
            <button className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-bold hover:bg-white/20 transition">
              Partner with us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* 🔥 SUB-COMPONENTS */

function ContactDetail({ icon, title, content }) {
  return (
    <div className="flex gap-5">
      <div className="shrink-0 w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-zinc-900">{title}</h4>
        <p className="text-zinc-500 text-sm leading-relaxed mt-1">{content}</p>
      </div>
    </div>
  );
}

function SocialCircle({ icon }) {
  return (
    <a href="#" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all text-white">
      {icon}
    </a>
  );
}

function FormGroup({ label, placeholder, type = "text" }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-zinc-700 mb-2">{label}</label>
      <input 
        type={type}
        placeholder={placeholder}
        className="p-4 bg-white border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
      />
    </div>
  );
}