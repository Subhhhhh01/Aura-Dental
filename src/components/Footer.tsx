import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 lg:py-24 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                A
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Aura<span className="text-primary-400">Dental</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm">
              Providing world-class luxury dental care with a focus on precision, technology, and patient comfort.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-serif">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 shrink-0" />
                <span>123 Elite Towers, 4th Floor<br/>Bandra West, Mumbai 400050</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-500 shrink-0" />
                <span>+91 99999 99999</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-500 shrink-0" />
                <span>contact@auradental.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-serif">Clinic Hours</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary-500 shrink-0" />
                <div>
                  <p className="text-white font-medium">Monday - Friday</p>
                  <p className="text-slate-400">09:00 AM - 07:00 PM</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary-500 shrink-0" />
                <div>
                  <p className="text-white font-medium">Saturday</p>
                  <p className="text-slate-400">10:00 AM - 04:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-serif">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/services" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-primary-400 transition">Our Services</Link></li>
              <li><Link to="/doctors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-primary-400 transition">Meet the Team</Link></li>
              <li><Link to="/gallery" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-primary-400 transition">Before & After</Link></li>
              <li><Link to="/book" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-primary-400 transition">Book Appointment</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Aura Dental Clinic. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
