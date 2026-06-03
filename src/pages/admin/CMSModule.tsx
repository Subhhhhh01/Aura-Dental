import { useState, useRef } from 'react';
import { Plus, Edit2, Trash2, Image as ImageIcon, UploadCloud, FileText, Search, Tag, Save, CheckCircle2 } from 'lucide-react';
import { useCMS, Service, GalleryImage, Doctor } from '../../context/CMSContext';

export default function CMSModule() {
  const { doctors, setDoctors, services, setServices, images, setImages, seoData, setSeoData } = useCMS();
  const [activeTab, setActiveTab] = useState<'services' | 'doctors' | 'gallery' | 'blog'>('services');

  const [hasSaved, setHasSaved] = useState(false);

  // Focus state for Services
  const [editingServiceId, setEditingServiceId] = useState<number | null>(null);
  const [newService, setNewService] = useState<Partial<Service>>({});

  // Focus state for Doctors
  const [editingDoctorId, setEditingDoctorId] = useState<number | null>(null);
  const [newDoctor, setNewDoctor] = useState<Partial<Doctor>>({});
  const doctorFileInputRef = useRef<HTMLInputElement>(null);
  const serviceFileInputRef = useRef<HTMLInputElement>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerSave = () => {
    setHasSaved(true);
    setTimeout(() => setHasSaved(false), 3000);
  };

  const handleAddService = () => {
    if (newService.name) {
      setServices([...services, {
        id: Date.now(),
        name: newService.name || '',
        description: newService.description || '',
        price: newService.price || '',
        image: newService.image || '',
        status: newService.status || 'Active'
      } as Service]);
      setNewService({});
    }
  };

  const handleUpdateService = (id: number, field: keyof Service, value: string) => {
    setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleDeleteService = (id: number) => {
    setServices(services.filter(s => s.id !== id));
  };

  const handleAddDoctor = () => {
    if (newDoctor.name) {
      setDoctors([...doctors, {
        id: Date.now(),
        name: newDoctor.name || '',
        role: newDoctor.role || '',
        exp: newDoctor.exp || '',
        image: newDoctor.image || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop',
        bio: newDoctor.bio || '',
        status: newDoctor.status || 'Active'
      } as Doctor]);
      setNewDoctor({});
    }
  };

  const handleUpdateDoctor = (id: number, field: keyof Doctor, value: string) => {
    setDoctors(doctors.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  const handleDeleteDoctor = (id: number) => {
    setDoctors(doctors.filter(d => d.id !== id));
  };

const compressImage = (file: File, callback: (dataUrl: string) => void) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Max dimension constraints
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Output compressed format (jpeg, quality 0.7)
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        callback(dataUrl);
      };
    };
  };

  const handleDoctorImageUpload = (e: React.ChangeEvent<HTMLInputElement>, id?: number) => {
    const file = e.target.files?.[0];
    if (file) {
      compressImage(file, (dataUrl) => {
        if (id) {
          handleUpdateDoctor(id, 'image', dataUrl);
        } else {
          setNewDoctor({ ...newDoctor, image: dataUrl });
        }
      });
    }
  };

  const handleServiceImageUpload = (e: React.ChangeEvent<HTMLInputElement>, id?: number) => {
    const file = e.target.files?.[0];
    if (file) {
      compressImage(file, (dataUrl) => {
        if (id) {
          handleUpdateService(id, 'image', dataUrl);
        } else {
          setNewService({ ...newService, image: dataUrl });
        }
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      compressImage(file, (dataUrl) => {
        setImages([{ id: Date.now(), url: dataUrl, type: 'standard' }, ...images]);
      });
    }
  };

  const handleDeleteImage = (id: number) => {
    setImages(images.filter(img => img.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Sub-Navigation */}
      <div className="flex overflow-x-auto border-b border-slate-200 no-scrollbar">
        {[
          { id: 'services', label: 'Services' },
          { id: 'doctors', label: 'Doctors' },
          { id: 'gallery', label: 'Gallery' },
          { id: 'blog', label: 'SEO' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === tab.id 
                ? 'border-primary-600 text-primary-600' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {hasSaved && (
        <div className="bg-emerald-50 text-emerald-600 px-4 py-3 rounded-xl border border-emerald-100 flex items-center gap-2 text-sm font-bold border-l-4 border-l-emerald-500 shadow-sm animate-pulse">
          <CheckCircle2 className="w-5 h-5" />
          Changes saved automatically.
        </div>
      )}

      {/* Services Manager */}
      {activeTab === 'services' && (
        <div className="space-y-4">
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={serviceFileInputRef}
            onChange={(e) => handleServiceImageUpload(e, editingServiceId || undefined)}
          />

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h3 className="font-bold text-sm text-slate-700">Add New Service</h3>
            <div className="flex gap-4 items-start">
              <button 
                onClick={() => { setEditingServiceId(null); serviceFileInputRef.current?.click(); }}
                className="w-20 h-20 rounded-xl bg-slate-200 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:text-primary-600 hover:border-primary-500 overflow-hidden"
              >
                {newService.image ? (
                  <img src={newService.image} alt="Service" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <ImageIcon className="w-6 h-6 mb-1" />
                    <span className="text-[10px] font-bold">Image</span>
                  </>
                )}
              </button>
              <div className="flex-1 space-y-3">
                <input 
                  type="text" 
                  placeholder="Service Name" 
                  value={newService.name || ''} 
                  onChange={e => setNewService({...newService, name: e.target.value})}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                />
                <input 
                  type="text" 
                  placeholder="Short Description" 
                  value={newService.description || ''} 
                  onChange={e => setNewService({...newService, description: e.target.value})}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Price (e.g. ₹1500)" 
                value={newService.price || ''} 
                onChange={e => setNewService({...newService, price: e.target.value})}
                className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              />
              <select 
                value={newService.status || 'Active'}
                onChange={e => setNewService({...newService, status: e.target.value as 'Active' | 'Draft'})}
                className="px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-primary-500"
              >
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
            <button 
              onClick={handleAddService}
              className="flex items-center justify-center w-full gap-2 px-4 py-2 mt-2 bg-primary-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-primary-700 transition">
              <Plus className="w-4 h-4" />
              Add Service
            </button>
          </div>
          
          <div className="space-y-3">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col gap-3">
                <div className="flex justify-between items-start gap-4">
                  <div className="relative group shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 flex items-center justify-center relative">
                      {service.image ? (
                        <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-slate-300" />
                      )}
                      
                      {editingServiceId === service.id && (
                        <button
                          onClick={() => { setEditingServiceId(service.id); serviceFileInputRef.current?.click(); }}
                          className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <UploadCloud className="w-4 h-4 mb-1" />
                          <span className="text-[8px] uppercase tracking-wider font-bold">Upload</span>
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    {editingServiceId === service.id ? (
                      <input 
                        value={service.name}
                        onChange={e => handleUpdateService(service.id, 'name', e.target.value)}
                        className="font-bold text-slate-900 border-b border-slate-300 outline-none w-full mb-1" 
                      />
                    ) : (
                      <h3 className="font-bold text-slate-900">{service.name}</h3>
                    )}
                    {editingServiceId === service.id ? (
                      <textarea 
                        value={service.description}
                        onChange={e => handleUpdateService(service.id, 'description', e.target.value)}
                        className="text-xs text-slate-500 mt-1 w-full border border-slate-200 rounded p-1 outline-none"
                      />
                    ) : (
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{service.description}</p>
                    )}
                  </div>
                  <button 
                    onClick={() => handleUpdateService(service.id, 'status', service.status === 'Active' ? 'Draft' : 'Active')}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer ${service.status === 'Active' ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                    {service.status}
                  </button>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  {editingServiceId === service.id ? (
                    <input 
                      value={service.price}
                      onChange={e => handleUpdateService(service.id, 'price', e.target.value)}
                      className="font-bold text-slate-700 border-b border-slate-300 outline-none max-w-[80px]" 
                    />
                  ) : (
                    <span className="font-bold text-slate-700">{service.price}</span>
                  )}
                  
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => setEditingServiceId(editingServiceId === service.id ? null : service.id)}
                      className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition"
                    >
                      {editingServiceId === service.id ? <CheckCircle2 className="w-4 h-4 text-primary-600" /> : <Edit2 className="w-4 h-4" />}
                    </button>
                    <button 
                      onClick={() => handleDeleteService(service.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'doctors' && (
        <div className="space-y-4">
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={doctorFileInputRef}
            onChange={(e) => handleDoctorImageUpload(e, editingDoctorId || undefined)}
          />

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h3 className="font-bold text-sm text-slate-700">Add New Doctor</h3>
             <input 
              type="text" 
              placeholder="Doctor Name (e.g. Dr. Kavita Reddy)" 
              value={newDoctor.name || ''} 
              onChange={e => setNewDoctor({...newDoctor, name: e.target.value})}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-primary-500"
            />
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Role (e.g. Orthodontist)" 
                value={newDoctor.role || ''} 
                onChange={e => setNewDoctor({...newDoctor, role: e.target.value})}
                className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-primary-500"
              />
              <input 
                type="text" 
                placeholder="Experience (e.g. 10 Years)" 
                value={newDoctor.exp || ''} 
                onChange={e => setNewDoctor({...newDoctor, exp: e.target.value})}
                className="w-1/3 px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-primary-500"
              />
            </div>
            <textarea 
              placeholder="Short bio..." 
              value={newDoctor.bio || ''} 
              onChange={e => setNewDoctor({...newDoctor, bio: e.target.value})}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-primary-500 resize-none h-16"
            />
            <div className="flex gap-2">
               <button 
                 onClick={() => { setEditingDoctorId(null); doctorFileInputRef.current?.click(); }}
                 className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white flex items-center justify-center gap-2 hover:bg-slate-50 transition text-slate-600"
               >
                 <UploadCloud className="w-4 h-4" />
                 {newDoctor.image ? 'Image Uploaded' : 'Upload Image'}
               </button>
               <select 
                value={newDoctor.status || 'Active'}
                onChange={e => setNewDoctor({...newDoctor, status: e.target.value as 'Active' | 'Draft'})}
                className="px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-primary-500 bg-white"
              >
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
            
            <button 
              onClick={handleAddDoctor}
              className="flex items-center justify-center w-full gap-2 px-4 py-2 mt-2 bg-primary-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-primary-700 transition">
              <Plus className="w-4 h-4" />
              Add Doctor
            </button>
          </div>
          
          <div className="space-y-3">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-2xl border border-slate-200 p-4 flex gap-4 items-start shadow-sm">
                 <div 
                    className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0 cursor-pointer relative group"
                    onClick={() => { setEditingDoctorId(doctor.id); doctorFileInputRef.current?.click(); }}
                  >
                    <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <Edit2 className="w-4 h-4 text-white" />
                    </div>
                 </div>

                 <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                       <div className="flex-1">
                          {editingDoctorId === doctor.id ? (
                            <input 
                              value={doctor.name}
                              onChange={e => handleUpdateDoctor(doctor.id, 'name', e.target.value)}
                              className="font-bold text-slate-900 border-b border-slate-300 outline-none w-full mb-1 text-sm block" 
                            />
                          ) : (
                            <h3 className="font-bold text-slate-900 text-sm truncate">{doctor.name}</h3>
                          )}
                          
                          {editingDoctorId === doctor.id ? (
                            <input 
                              value={doctor.role}
                              onChange={e => handleUpdateDoctor(doctor.id, 'role', e.target.value)}
                              className="text-[10px] text-primary-600 font-bold uppercase tracking-wider mb-2 border-b border-primary-200 outline-none w-full" 
                            />
                          ) : (
                            <p className="text-[10px] text-primary-600 font-bold uppercase tracking-wider mb-2">{doctor.role}</p>
                          )}
                       </div>
                       <button 
                          onClick={() => handleUpdateDoctor(doctor.id, 'status', doctor.status === 'Active' ? 'Draft' : 'Active')}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer ml-2 ${doctor.status === 'Active' ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                          {doctor.status}
                        </button>
                    </div>

                    {editingDoctorId === doctor.id ? (
                      <textarea 
                        value={doctor.bio}
                        onChange={e => handleUpdateDoctor(doctor.id, 'bio', e.target.value)}
                        className="text-xs text-slate-500 w-full border border-slate-200 rounded p-1 outline-none mb-2"
                      />
                    ) : (
                      <p className="text-xs text-slate-500 line-clamp-2 mb-2">{doctor.bio}</p>
                    )}

                    <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                      {editingDoctorId === doctor.id ? (
                         <input 
                           value={doctor.exp}
                           onChange={e => handleUpdateDoctor(doctor.id, 'exp', e.target.value)}
                           className="text-xs font-semibold text-slate-500 border-b border-slate-300 outline-none w-24" 
                         />
                       ) : (
                         <p className="text-slate-500 text-xs font-semibold">{doctor.exp}</p>
                       )}
                       
                       <div className="flex items-center gap-1">
                          <button 
                            onClick={() => setEditingDoctorId(editingDoctorId === doctor.id ? null : doctor.id)}
                            className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition"
                          >
                            {editingDoctorId === doctor.id ? <CheckCircle2 className="w-4 h-4 text-primary-600" /> : <Edit2 className="w-4 h-4" />}
                          </button>
                          <button 
                            onClick={() => handleDeleteDoctor(doctor.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gallery Manager */}
      {activeTab === 'gallery' && (
        <div className="space-y-4">
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition cursor-pointer text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary-600 shadow-sm mb-3">
              <UploadCloud className="w-6 h-6" />
            </div>
            <p className="text-slate-900 font-bold text-sm mb-1">Tap to upload picture</p>
            <p className="text-slate-500 text-xs">JPG/PNG/WebP</p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {images.map((item) => (
              <div key={item.id} className="relative group rounded-xl overflow-hidden aspect-square bg-slate-200">
                {item.type === 'before-after' ? (
                  <div className="flex w-full h-full">
                    <img src={item.beforeUrl} alt="Before" className="w-1/2 h-full object-cover" />
                    <img src={item.afterUrl} alt="After" className="w-1/2 h-full object-cover" />
                  </div>
                ) : (
                  <img src={item.url} alt="Gallery item" className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-slate-900/80 to-transparent flex justify-end gap-2">
                  <button 
                    onClick={() => handleDeleteImage(item.id)}
                    className="p-2 bg-red-500/80 backdrop-blur rounded-lg text-white hover:bg-red-600 transition">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Blog & SEO Field */}
      {activeTab === 'blog' && (
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
              <Search className="w-3 h-3 text-primary-600" />
              Global SEO Data
            </h3>
            
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Meta Title</label>
              <input 
                type="text" 
                value={seoData.metaTitle}
                onChange={e => setSeoData({...seoData, metaTitle: e.target.value})}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary-400" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Meta Description</label>
              <textarea 
                value={seoData.metaDescription}
                onChange={e => setSeoData({...seoData, metaDescription: e.target.value})}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary-400 h-20 resize-none"
              ></textarea>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1"><Tag className="w-3 h-3" /> Keywords</label>
              <input 
                type="text" 
                value={seoData.keywords}
                onChange={e => setSeoData({...seoData, keywords: e.target.value})}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary-400"
              />
            </div>
          </div>

          <button onClick={triggerSave} className="w-full flex items-center justify-center gap-2 py-4 bg-primary-600 text-white rounded-xl font-bold shadow-md transition">
            <Save className="w-5 h-5" />
            Save SEO
          </button>
        </div>
      )}
    </div>
  );
}
