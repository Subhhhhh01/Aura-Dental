export interface Doctor {
  id: string;
  name: string;
  qualifications: string;
  experience: string;
  specialization: string;
  bio: string;
  image: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: any; // Lucide icon
}
