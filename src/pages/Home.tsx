import Hero from '../components/Hero';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Doctors from '../components/Doctors';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import AppointmentSection from '../components/AppointmentSection';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <WhyChooseUs />
      <Doctors />
      <Gallery />
      <Testimonials />
      <AppointmentSection />
    </>
  );
}
