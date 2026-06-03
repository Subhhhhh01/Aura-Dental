import { Linkedin, Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import { useCMS } from '../context/CMSContext';

export default function Doctors() {
  const { doctors } = useCMS();
  const activeDoctors = doctors.filter(d => d.status === 'Active');

  return (
    <section id="doctors" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <span className="inline-block px-3 py-1 bg-primary-50 border border-primary-100 rounded-full text-primary-600 text-[10px] font-bold uppercase tracking-widest mb-4 sm:mb-6">Our Experts</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-slate-900 mb-4 tracking-tight">World-Class Specialists</h2>
          <p className="text-slate-500 text-base sm:text-lg">Meet our globally trained team dedicated to giving you the perfect smile.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeDoctors.map((doctor, idx) => (
            <motion.div 
              key={doctor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 + (idx * 0.1) }}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-200">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <p className="text-white/90 text-sm mb-4 leading-relaxed">{doctor.bio}</p>
                  <div className="flex gap-3">
                    <a href="#" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary-600 transition">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary-600 transition">
                      <Instagram className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-serif font-bold text-slate-800 mb-1">{doctor.name}</h3>
                <p className="text-[10px] text-primary-600 font-bold uppercase tracking-wider mb-2">{doctor.role}</p>
                <p className="text-slate-500 text-xs font-semibold">{doctor.exp}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
