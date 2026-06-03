import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageCircle, Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Doctors', href: '/doctors' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Testimonials', href: '/testimonials' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              A
            </div>
            <span className={`text-xl font-bold tracking-tight ${isScrolled ? 'text-slate-800' : 'text-slate-800'}`}>
              Aura<span className="text-primary-600">Dental</span>
            </span>
          </Link>

    <div className="hidden lg:flex items-center gap-8">
      {navLinks.map((link) => (
        <NavLink
          key={link.name}
          to={link.href}
          className={({ isActive }) => `text-xs font-bold uppercase tracking-widest transition pb-1 ${
            isActive ? 'text-primary-600 border-b-2 border-primary-600' : 'text-slate-500 hover:text-primary-600'
          }`}
        >
          {link.name}
        </NavLink>
      ))}
    </div>

    <div className="hidden lg:flex items-center gap-4">
      <a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noreferrer"
        className="px-5 py-2 border border-primary-100 bg-primary-50 text-primary-700 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm hover:bg-primary-100 transition"
      >
        WhatsApp
      </a>
      <Link
        to="/book"
        className="px-6 py-2.5 bg-primary-600 text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary-200 hover:bg-primary-700 hover:scale-105 transition-all duration-300"
      >
        Book Now
      </Link>
    </div>

          <button 
            className="lg:hidden p-2 text-slate-800"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white lg:hidden flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-slate-100">
               <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 cursor-pointer">
                <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  A
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-800">
                  Aura<span className="text-primary-600">Dental</span>
                </span>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-800 bg-slate-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
               {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => `text-lg font-bold tracking-tight ${isActive ? 'text-primary-600' : 'text-slate-800'}`}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="p-6 border-t border-slate-100 flex flex-col gap-4">
              <a
                href="https://wa.me/919999999999"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-50 text-emerald-600 font-bold rounded-xl"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Consultation
              </a>
              <Link
                to="/book"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-bold rounded-xl"
              >
                Book Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
