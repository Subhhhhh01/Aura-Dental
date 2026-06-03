import { motion } from 'motion/react';
import { Star, CheckCircle2, MessageCircle, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      {/* Animated 3D-like Background */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-slate-50">
        <motion.div
          animate={{
            transform: [
              'translate(0%, 0%) scale(1)',
              'translate(5%, 10%) scale(1.1)',
              'translate(-5%, -5%) scale(0.9)',
              'translate(0%, 0%) scale(1)'
            ],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-1/4 -left-1/4 w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-primary-200/40 to-blue-300/40 blur-3xl mix-blend-multiply"
        />
        <motion.div
          animate={{
            transform: [
              'translate(0%, 0%) scale(1)',
              'translate(-10%, 5%) scale(1.2)',
              'translate(5%, 10%) scale(0.8)',
              'translate(0%, 0%) scale(1)'
            ],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/4 -right-1/4 w-[60vw] h-[60vw] rounded-full bg-gradient-to-bl from-primary-300/30 to-emerald-200/30 blur-3xl mix-blend-multiply"
        />
        
        {/* Background Image with Glassmorphism Overlay */}
        <img 
          src="https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?q=80&w=2070&auto=format&fit=crop" 
          alt="Modern Dental Clinic" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/30 backdrop-blur-sm sm:backdrop-blur-md"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-50 border border-primary-100 rounded-full text-primary-600 text-[10px] font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
              World-Class Care
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-semibold leading-tight text-slate-900 mb-6">
              Your Perfect Smile <br className="hidden sm:block" />
              <span className="text-primary-600 font-bold font-sans uppercase tracking-tight">Starts Here.</span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-500 max-w-lg leading-relaxed mb-8">
              Advanced Dental Care with modern technology & expert dentists. 
              Experience the pinnacle of restorative and cosmetic dentistry.
            </p>

            <div className="grid grid-cols-2 md:flex gap-6 md:gap-10 mb-12">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-1">4.9 <Star className="w-5 h-5 fill-amber-400 text-amber-400" /></div>
                <div className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-400 font-bold">Google Rating</div>
              </div>
              <div className="hidden md:block w-px h-10 bg-slate-200 mt-1"></div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-slate-800">5,000+</div>
                <div className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-400 font-bold">Patients</div>
              </div>
              <div className="hidden md:block w-px h-10 bg-slate-200 mt-1"></div>
              <div className="col-span-2 md:col-span-1">
                <div className="text-xl sm:text-2xl font-bold text-slate-800">15+ Yrs</div>
                <div className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-400 font-bold">Experience</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/book"
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-4 sm:py-3 bg-primary-600 text-white rounded-full text-sm font-bold uppercase tracking-widest shadow-lg shadow-primary-200 hover:bg-primary-700 transition"
              >
                Book Appointment
              </Link>
              <a 
                href="https://wa.me/1234567890"
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-4 sm:py-3 border border-primary-100 bg-primary-50 text-primary-700 rounded-full text-sm font-bold uppercase tracking-widest shadow-sm hover:bg-primary-100 transition"
              >
                WhatsApp Consultation
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
