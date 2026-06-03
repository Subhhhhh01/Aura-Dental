import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Calendar, User, Phone, ChevronRight, FileText, Activity, ChevronDown } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export default function AppointmentSection() {
  const { services } = useCMS();
  const activeServices = services.filter(s => s.status === 'Active');

  const [submitted, setSubmitted] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    treatment: '',
    date: '',
    time: '',
    note: ''
  });

  const times = ['09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '03:30 PM', '05:00 PM'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final Submit to WhatsApp
    const message = `*New Appointment Request*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Treatment:* ${formData.treatment}%0A*Date:* ${formData.date}%0A*Time:* ${formData.time}${formData.note ? `%0A*Note:* ${formData.note}` : ''}`;
    window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="book" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[500px] h-[500px] rounded-full bg-primary-100 opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[500px] h-[500px] rounded-full bg-blue-100 opacity-50 blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-3 py-1 bg-primary-50 border border-primary-100 rounded-full text-primary-600 text-[10px] font-bold uppercase tracking-widest mb-4">Book Online</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-slate-900 mb-4 tracking-tight">Schedule Your Visit</h2>
          <p className="text-slate-500 text-base sm:text-lg">Fill out the details below and we'll confirm your premium dental experience.</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl shadow-xl shadow-slate-200/50 p-6 sm:p-10 md:p-12 relative overflow-hidden">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center space-y-6 py-12"
            >
              <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2 shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="text-4xl font-serif font-medium text-slate-900 tracking-tight">Request Sent!</h3>
              <p className="text-slate-500 max-w-md text-lg">
                We've opened WhatsApp with your details. Please hit send to confirm your appointment.
              </p>
              <button 
                type="button"
                onClick={() => { setSubmitted(false); setFormData({name: '', phone: '', treatment: '', date: '', time: '', note: ''}); }}
                className="mt-8 px-8 py-4 bg-slate-900 text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-slate-800 transition shadow-lg"
              >
                Book Another Visit
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Details Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-3">Full Name <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-base focus:outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-50 transition shadow-sm"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-3">Phone Number <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      required
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-base focus:outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-50 transition shadow-sm"
                      placeholder="+91 99999 99999"
                    />
                  </div>
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary-500" /> Service <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <button 
                    type="button"
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl text-base text-left flex items-center justify-between focus:outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-50 transition shadow-sm"
                  >
                    <span className={formData.treatment ? "text-slate-900 font-semibold" : "text-slate-400"}>
                      {formData.treatment || "Select a service..."}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-4">
                          {activeServices.map((t) => (
                            <label
                              key={t.id}
                              className={`px-4 py-4 rounded-2xl border-2 flex items-center gap-3 cursor-pointer transition-all text-sm font-semibold ${
                                formData.treatment === t.name
                                  ? 'border-primary-600 bg-primary-50 text-primary-900 shadow-md transform scale-[1.02]'
                                  : 'border-slate-100 bg-white hover:border-slate-200 text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              <input
                                type="radio"
                                name="treatment"
                                value={t.name}
                                checked={formData.treatment === t.name}
                                onChange={(e) => {
                                  setFormData({...formData, treatment: e.target.value});
                                  setIsServicesOpen(false);
                                }}
                                className="w-4 h-4 text-primary-600 border-slate-300 focus:ring-primary-500"
                              />
                              <span>{t.name}</span>
                            </label>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Date and Time Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 border-t border-slate-100 pt-8">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-3">Preferred Date <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      required
                      type="date" 
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-base focus:outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-50 transition shadow-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-3">Preferred Time <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-3 gap-2">
                    {times.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setFormData({...formData, time: t})}
                        className={`py-3 px-2 rounded-xl border font-bold transition-all text-[11px] sm:text-xs uppercase tracking-wider ${
                          formData.time === t
                            ? 'border-primary-600 bg-primary-600 text-white shadow-md transform scale-[1.05]'
                            : 'border-slate-200 bg-white hover:border-slate-300 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Note Field */}
              <div className="border-t border-slate-100 pt-8">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary-500" /> Notes / Details (Optional)
                </label>
                <textarea 
                  value={formData.note}
                  onChange={(e) => setFormData({...formData, note: e.target.value})}
                  className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl text-base focus:outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-50 transition shadow-sm min-h-[120px] resize-y"
                  placeholder="Tell us about any specific concerns, focus areas, or questions you have before your visit..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={!formData.name || !formData.phone || !formData.treatment || !formData.date || !formData.time}
                  className="flex items-center justify-center gap-3 w-full md:w-auto px-10 py-5 bg-primary-600 text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-primary-500/30 hover:-translate-y-1"
                >
                  Confirm & Continue to WhatsApp
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
