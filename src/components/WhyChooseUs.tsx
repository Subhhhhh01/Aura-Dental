import { motion } from 'motion/react';
import { Microscope, Award, ShieldCheck, Stethoscope, Clock, Users } from 'lucide-react';

const features = [
  { icon: Microscope, title: 'Advanced Equipment', desc: 'State-of-the-art 3D imaging and laser dentistry.' },
  { icon: Award, title: 'Experienced Dentists', desc: 'Top-tier specialists with international training.' },
  { icon: ShieldCheck, title: 'Sterilized Environment', desc: '100% adherence to global safety protocols.' },
  { icon: Users, title: 'Personalized Treatment', desc: 'Custom plans tailored to your specific needs.' },
  { icon: Clock, title: 'Emergency Support', desc: '24/7 priority care for dental emergencies.' },
  { icon: Stethoscope, title: 'Painless Procedures', desc: 'Modern anesthesia and anxiety-free experience.' },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop" 
                alt="Modern Clinic Room" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary-900/10 mix-blend-multiply"></div>
            </div>
            
            {/* Floating Stats Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-8 -right-8 lg:-right-12 bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 hidden sm:block"
            >
              <div className="flex gap-8">
                <div>
                  <p className="text-4xl font-display font-bold text-primary-600 mb-1">98%</p>
                  <p className="text-sm font-medium text-slate-500">Patient<br/>Satisfaction</p>
                </div>
                <div className="w-px bg-slate-200"></div>
                <div>
                  <p className="text-4xl font-display font-bold text-primary-600 mb-1">15+</p>
                  <p className="text-sm font-medium text-slate-500">Years of<br/>Excellence</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <span className="inline-block px-3 py-1 bg-primary-50 border border-primary-100 rounded-full text-primary-600 text-[10px] font-bold uppercase tracking-widest mb-6">Why Choose Aura</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-slate-900 mb-6 leading-tight tracking-tight">
              A New Standard of<br />Dental Excellence
            </h2>
            <p className="text-slate-500 text-base sm:text-lg mb-10">
              We combine artistic vision with advanced science to create beautiful smiles. 
              Our commitment to your comfort and health sets us apart as a luxury dental destination.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feature, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 mb-1">{feature.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
