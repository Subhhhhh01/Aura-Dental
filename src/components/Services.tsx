import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, HeartPulse, Activity, ShieldPlus, Baby, Smile, CheckCircle, X } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

const getIconForService = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('cosmetic')) return Sparkles;
  if (t.includes('white')) return Smile;
  if (t.includes('implant')) return ShieldPlus;
  if (t.includes('root') || t.includes('heart')) return HeartPulse;
  if (t.includes('pediatric') || t.includes('child')) return Baby;
  if (t.includes('ortho') || t.includes('align')) return Activity;
  return CheckCircle;
};

export default function Services() {
  const { services } = useCMS();
  const activeServices = services.filter(s => s.status === 'Active');
  const [selectedService, setSelectedService] = useState<any>(null);

  return (
    <section id="services" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <span className="inline-block px-3 py-1 bg-primary-50 border border-primary-100 rounded-full text-primary-600 text-[10px] font-bold uppercase tracking-widest mb-4 sm:mb-6">Premium Care</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-slate-900 mb-4 tracking-tight">Our Medical Treatments</h2>
          <p className="text-slate-500 text-base sm:text-lg">Comprehensive dental services tailored for your perfect health and aesthetics.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeServices.map((service, idx) => {
            const Icon = getIconForService(service.name);
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-primary-100/50 transition-all duration-300 flex flex-col"
              >
                <div className={`w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-primary-500" />
                </div>
                <h3 className="text-xl font-serif font-bold text-slate-800 mb-2">{service.name}</h3>
                <span className="text-primary-600 font-bold text-sm mb-4">{service.price}</span>
                <p className="text-slate-500 mb-6 leading-relaxed flex-1 text-sm line-clamp-3">
                  {service.description}
                </p>
                <button 
                  onClick={() => setSelectedService(service)}
                  className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] group-hover:gap-3 group-hover:text-primary-600 transition-all mt-auto"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Modal / Dialog */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 sm:p-10 z-10 overflow-hidden"
            >
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mb-6">
                {(() => {
                  const Icon = getIconForService(selectedService.name);
                  return <Icon className="w-7 h-7 text-primary-500" />;
                })()}
              </div>

              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">
                {selectedService.name}
              </h3>
              <p className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-bold rounded-full mb-6">
                Starting at {selectedService.price}
              </p>
              
              <div className="prose prose-sm sm:prose-base text-slate-600 mb-8 max-h-[40vh] overflow-y-auto custom-scrollbar pr-2">
                {selectedService.description.split('\n').map((para: string, i: number) => (
                  <p key={i} className="mb-4 last:mb-0 leading-relaxed">{para}</p>
                ))}
              </div>

              <button 
                onClick={() => {
                  setSelectedService(null);
                  document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-4 bg-slate-900 hover:bg-primary-600 text-white rounded-xl text-sm font-bold tracking-wider transition-colors duration-300 shadow-lg shadow-slate-900/20"
              >
                BOOK CONSULTATION
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
