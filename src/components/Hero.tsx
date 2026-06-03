import { motion } from 'motion/react';
import { Star, CheckCircle2, MessageCircle, Calendar, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import tooth3D from '../assets/images/3d_glossy_tooth_1780492195147.png';

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
        
        {/* Floating Dental Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[
            { top: '10%', left: '15%', delay: 0, size: 'w-12 h-12' },
            { top: '70%', left: '10%', delay: 2, size: 'w-8 h-8' },
            { top: '20%', left: '80%', delay: 4, size: 'w-16 h-16' },
            { top: '85%', left: '85%', delay: 1, size: 'w-10 h-10' },
            { top: '40%', left: '45%', delay: 3, size: 'w-14 h-14' },
            { top: '80%', left: '40%', delay: 5, size: 'w-8 h-8' },
          ].map((pos, i) => (
            <motion.div
              key={`tooth-${i}`}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 15, -15, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: pos.delay
              }}
              className="absolute drop-shadow-lg"
              style={{ top: pos.top, left: pos.left }}
            >
              <img src={tooth3D} alt="Dental element" className={`${pos.size} opacity-40 blur-[2px] object-contain drop-shadow-md`} />
            </motion.div>
          ))}
          
          {[
            { top: '25%', left: '25%', size: 24, delay: 1 },
            { top: '65%', left: '85%', size: 32, delay: 0 },
            { top: '85%', left: '25%', size: 16, delay: 3 },
            { top: '15%', left: '65%', size: 40, delay: 2 },
          ].map((pos, i) => (
            <motion.div
              key={`circle-${i}`}
              animate={{
                y: [0, 40, 0],
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: pos.delay
              }}
              className="absolute rounded-full bg-primary-300 backdrop-blur-sm"
              style={{ top: pos.top, left: pos.left, width: pos.size, height: pos.size }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-50 border border-primary-100 rounded-full text-primary-600 text-[10px] font-bold uppercase tracking-widest mb-6 shadow-sm">
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
              World-Class Care
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-semibold leading-tight text-slate-900 mb-6 drop-shadow-sm">
              Your Perfect Smile <br className="hidden sm:block" />
              <span className="text-primary-600 font-bold font-sans uppercase tracking-tight relative">
                Starts Here.
                <motion.svg className="absolute w-full h-3 -bottom-1 left-0 text-primary-200/60" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="transparent" strokeLinecap="round" />
                </motion.svg>
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 max-w-lg leading-relaxed mb-8">
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
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-4 sm:py-3 bg-primary-600 text-white rounded-full text-sm font-bold uppercase tracking-widest shadow-xl shadow-primary-500/30 hover:bg-primary-700 hover:-translate-y-1 transition-all"
              >
                Book Appointment
              </Link>
              <a 
                href="https://wa.me/1234567890"
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-4 sm:py-3 border border-slate-200 bg-white/50 backdrop-blur-md text-slate-800 rounded-full text-sm font-bold uppercase tracking-widest shadow-sm hover:bg-white hover:-translate-y-1 transition-all"
              >
                WhatsApp Consultation
              </a>
            </div>
          </motion.div>
        </div>

        {/* 3D Visual Column */}
        <div className="relative hidden lg:flex items-center justify-center min-h-[500px]">
          {/* Glass background decoration */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute right-10 top-1/2 -translate-y-1/2 w-80 h-80 bg-white/20 backdrop-blur-3xl border border-white/50 rounded-[40px] shadow-2xl rotate-12"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
            className="absolute right-10 top-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-primary-400/20 to-transparent backdrop-blur-xl border border-white/40 rounded-[40px] shadow-xl -rotate-6"
          />

          {/* Floating 3D Tooth Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative z-10 w-full max-w-md pointer-events-none drop-shadow-2xl"
          >
            <motion.img 
              animate={{ 
                y: [-15, 15, -15],
                rotate: [-2, 2, -2]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 6, 
                ease: 'easeInOut' 
              }}
              src={tooth3D} 
              alt="3D Dental Rendering" 
              className="w-full h-auto object-contain [filter:drop-shadow(0_30px_40px_rgba(14,165,233,0.3))]"
            />
          </motion.div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute top-1/4 -right-4 bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white flex items-center gap-3 z-20"
          >
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Certified</p>
              <p className="text-sm font-bold text-slate-900">Top Specialists</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
