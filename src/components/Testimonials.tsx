import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Suhana Iyer',
    treatment: 'Cosmetic Veneers',
    text: "The absolute best dental experience I've ever had. The clinic feels like a luxury spa and the doctors are incredibly meticulous.",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop'
  },
  {
    name: 'Rohan Gupta',
    treatment: 'Root Canal',
    text: "I was always terrified of the dentist until I found Aura. Completely painless procedures and such a warm, welcoming staff.",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop'
  },
  {
    name: 'Ishita Kapoor',
    treatment: 'Invisalign Treatment',
    text: "Got my confidence back with my new smile. The 3D scanning tech they use is mind-blowing. Highly recommend this clinic!",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop'
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block px-3 py-1 bg-primary-50 border border-primary-100 rounded-full text-primary-600 text-[10px] font-bold uppercase tracking-widest mb-4 sm:mb-6">Patient Stories</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-slate-900 mb-4 tracking-tight">Trusted by 5000+ Patients</h2>
          <div className="flex items-center justify-center gap-2 text-yellow-400">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
            <span className="text-slate-800 font-bold ml-2 text-sm sm:text-base">4.9/5</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">on Google</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative"
            >
              <Quote className="absolute top-8 right-8 w-10 h-10 text-primary-50" />
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary-50"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{review.name}</h4>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-primary-600">{review.treatment}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4 text-yellow-400">
                {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-sm text-slate-500 leading-relaxed relative z-10 italic">
                "{review.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
