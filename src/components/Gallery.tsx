import { useCMS } from '../context/CMSContext';

export default function Gallery() {
  const { images } = useCMS();

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block px-3 py-1 bg-primary-50 border border-primary-100 rounded-full text-primary-600 text-[10px] font-bold uppercase tracking-widest mb-4 sm:mb-6">Beautiful Results</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-slate-900 mb-4 tracking-tight">Smile Transformations</h2>
          <p className="text-slate-500 text-base sm:text-lg">Real patients, real results. Experience the Aura difference.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img) => (
            <div key={img.id} className="group relative rounded-3xl overflow-hidden bg-slate-100 flex flex-col h-[300px]">
              {img.type === 'before-after' ? (
                <>
                  <div className="flex-1 w-full flex">
                    <div className="w-1/2 relative bg-slate-200">
                      <img src={img.beforeUrl} alt="Before" className="w-full h-full object-cover" />
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-slate-900/60 backdrop-blur text-white text-[10px] font-bold uppercase rounded">Before</div>
                    </div>
                    <div className="w-1/2 relative bg-slate-100">
                      <img src={img.afterUrl} alt="After" className="w-full h-full object-cover" />
                      <div className="absolute bottom-2 right-2 px-2 py-1 bg-primary-600/80 backdrop-blur text-white text-[10px] font-bold uppercase rounded">After</div>
                    </div>
                  </div>
                  {img.label && (
                    <div className="absolute top-4 left-4 right-4 text-center pointer-events-none">
                       <span className="inline-block px-3 py-1.5 bg-white/90 backdrop-blur text-slate-900 text-xs font-bold rounded-full shadow-sm">{img.label}</span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <img 
                    src={img.url} 
                    alt="Clinic Gallery" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
