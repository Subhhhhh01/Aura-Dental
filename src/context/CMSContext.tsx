import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Doctor = {
  id: number;
  name: string;
  role: string;
  exp: string;
  image: string;
  bio: string;
  status: 'Active' | 'Draft';
};

export type Service = {
  id: number;
  name: string;
  description: string;
  price: string;
  image?: string;
  status: 'Active' | 'Draft';
};

export type GalleryImage = {
  id: number;
  url?: string;
  beforeUrl?: string;
  afterUrl?: string;
  type?: 'standard' | 'before-after';
  label?: string;
};

export type SEOData = {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
};

interface CMSContextType {
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  images: GalleryImage[];
  setImages: React.Dispatch<React.SetStateAction<GalleryImage[]>>;
  doctors: Doctor[];
  setDoctors: React.Dispatch<React.SetStateAction<Doctor[]>>;
  seoData: SEOData;
  setSeoData: React.Dispatch<React.SetStateAction<SEOData>>;
}

const defaultDoctors: Doctor[] = [
  { id: 1, name: 'Dr. Priya Sharma', role: 'Chief Orthodontist', exp: '15 Years Exp.', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop', bio: 'Specialist in invisible aligners and structural corrections.', status: 'Active' },
  { id: 2, name: 'Dr. Rahul Verma', role: 'Implantologist', exp: '12 Years Exp.', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2064&auto=format&fit=crop', bio: 'Expert in full mouth rehabilitations and cosmetic implants.', status: 'Active' },
  { id: 3, name: 'Dr. Ananya Desai', role: 'Cosmetic Dentist', exp: '8 Years Exp.', image: 'https://images.unsplash.com/photo-1594824436998-0382759e665a?q=80&w=2082&auto=format&fit=crop', bio: 'Master of smile design, veneers, and aesthetic makeovers.', status: 'Active' }
];

const defaultServices: Service[] = [
  { id: 1, name: 'General Checkup', description: 'Comprehensive dental examination, cleaning, and X-rays.', price: '₹1200', status: 'Active' },
  { id: 2, name: 'Teeth Whitening', description: 'Professional laser teeth whitening session.', price: '₹5000', status: 'Active' },
  { id: 3, name: 'Dental Implants', description: 'Full root and crown replacement surgery.', price: '₹45000', status: 'Active' },
  { id: 4, name: 'Root Canal', description: 'Remove infected pulp and seal the tooth.', price: '₹6000', status: 'Active' },
];

const defaultImages: GalleryImage[] = [
  { 
    id: 1, 
    type: 'before-after', 
    beforeUrl: 'https://images.unsplash.com/photo-1598256989800-fea5f68d37aa?auto=format&fit=crop&q=80&w=400&h=400&sat=-100', 
    afterUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=400&h=400&sat=100', 
    label: 'Teeth Whitening' 
  },
  { 
    id: 2, 
    type: 'before-after', 
    beforeUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=400&h=400&sat=-100', 
    afterUrl: 'https://images.unsplash.com/photo-1594824436998-0382759e665a?auto=format&fit=crop&q=80&w=400&h=400&sat=100', 
    label: 'Dental Implants' 
  },
  { 
    id: 3, 
    type: 'standard', 
    url: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=400&h=400' 
  },
  { id: 4, type: 'standard', url: 'https://images.unsplash.com/photo-1445108771252-823cd70669d2?auto=format&fit=crop&q=80&w=400&h=400' },
];

const defaultSEO: SEOData = {
  metaTitle: 'Aura Dental Clinic',
  metaDescription: 'Premium dental services and care for your smile.',
  keywords: 'dental, clinic, dentist, teeth whitening',
};

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    const saved = localStorage.getItem('aura_doctors_v2');
    return saved ? JSON.parse(saved) : defaultDoctors;
  });

  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('aura_services_v2');
    return saved ? JSON.parse(saved) : defaultServices;
  });

  const [images, setImages] = useState<GalleryImage[]>(() => {
    const saved = localStorage.getItem('aura_images_v3');
    return saved ? JSON.parse(saved) : defaultImages;
  });

  const [seoData, setSeoData] = useState<SEOData>(() => {
    const saved = localStorage.getItem('aura_seo_v2');
    return saved ? JSON.parse(saved) : defaultSEO;
  });

  useEffect(() => {
    async function fetchFromAPI() {
      try {
        const docsRes = await fetch('/api/cms/doctors').then(res => res.json());
        const servRes = await fetch('/api/cms/services').then(res => res.json());
        const imgRes = await fetch('/api/cms/images').then(res => res.json());
        const seoRes = await fetch('/api/cms/seo').then(res => res.json());
        
        if (docsRes && docsRes.length > 0) setDoctors(docsRes);
        if (servRes && servRes.length > 0) setServices(servRes);
        if (imgRes && imgRes.length > 0) setImages(imgRes);
        if (seoRes) {
          const { metaTitle, metaDescription, keywords } = seoRes;
          setSeoData({ metaTitle, metaDescription, keywords });
        }
      } catch (e) {
        console.error("Error fetching from API:", e);
      }
      setIsLoaded(true);
    }
    fetchFromAPI();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('aura_doctors_v2', JSON.stringify(doctors));
    } catch(e) { console.warn("Failed to save to local storage", e); }
    if (doctors.length > 0) {
      fetch('/api/cms/doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doctors)
      }).catch(e => console.error("Doctors Upsert error:", e));
    }
  }, [doctors, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('aura_services_v2', JSON.stringify(services));
    } catch(e) { console.warn("Failed to save to local storage", e); }
    if (services.length > 0) {
      fetch('/api/cms/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(services)
      }).catch(e => console.error("Services Upsert error:", e));
    }
  }, [services, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('aura_images_v3', JSON.stringify(images));
    } catch(e) { console.warn("Failed to save to local storage", e); }
    if (images.length > 0) {
      fetch('/api/cms/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(images)
      }).catch(e => console.error("Images Upsert error:", e));
    }
  }, [images, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('aura_seo_v2', JSON.stringify(seoData));
    } catch(e) { console.warn("Failed to save to local storage", e); }
    fetch('/api/cms/seo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(seoData)
    }).catch(e => console.error("SEO Upsert error:", e));
  }, [seoData, isLoaded]);

  return (
    <CMSContext.Provider value={{ doctors, setDoctors, services, setServices, images, setImages, seoData, setSeoData }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
}
