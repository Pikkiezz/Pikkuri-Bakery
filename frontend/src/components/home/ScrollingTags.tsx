'use client';

const ScrollingTags = () => {
  const tags = [
    { text: 'FRESH CROISSANTS', icon: '🥐', color: 'from-stone-400 to-amber-500' },
    { text: 'ARTISAN COFFEE', icon: '☕', color: 'from-amber-400 to-stone-500' },
    { text: 'DAILY BREADS', icon: '🥖', color: 'from-stone-400 to-amber-600' },
    { text: 'SWEET CAKES', icon: '🍰', color: 'from-amber-400 to-stone-600' },
    { text: 'MORNING PASTRIES', icon: '🧁', color: 'from-stone-400 to-amber-500' },
    { text: 'HOT BEVERAGES', icon: '☕', color: 'from-amber-400 to-stone-500' },
  ];

  return (
    <section className="bg-amber-100 py-8 overflow-hidden relative">
      
      
      <div className="flex animate-scroll relative z-10">
    
        {tags.map((tag, index) => (
          <div key={`first-${index}`} className="flex items-center whitespace-nowrap mx-8">
            <div className={`text-stone-700 px-6 py-3 rounded-full border-2 border-stone-400 hover:scale-110 transition-transform duration-300 flex items-center bg-white/80`}>
              <span className="text-2xl mr-3">{tag.icon}</span>
              <span className="text-lg font-bold">{tag.text}</span>
            </div>
          </div>
        ))}
        
        
        {tags.map((tag, index) => (
          <div key={`second-${index}`} className="flex items-center whitespace-nowrap mx-8">
            <div className={`text-stone-700 px-6 py-3 rounded-full border-2 border-stone-400 hover:scale-110 transition-transform duration-300 flex items-center bg-white/80`}>
              <span className="text-2xl mr-3">{tag.icon}</span>
              <span className="text-lg font-bold">{tag.text}</span>
            </div>
          </div>
        ))}
        
    
        {tags.map((tag, index) => (
          <div key={`third-${index}`} className="flex items-center whitespace-nowrap mx-8">
            <div className={`text-stone-700 px-6 py-3 rounded-full border-2 border-stone-400 hover:scale-110 transition-transform duration-300 flex items-center bg-white/80`}>
              <span className="text-2xl mr-3">{tag.icon}</span>
              <span className="text-lg font-bold">{tag.text}</span>
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ScrollingTags;
