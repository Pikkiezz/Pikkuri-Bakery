'use client';

import Link from 'next/link';


const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-stone-100 overflow-hidden">
      {/* Floating decorative elements */}
  

      {/* Main content */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="text-center lg:text-left">
              <div className="inline-block mb-6">
                <span className="text-6xl animate-bounce">🥐</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 font-fredoka">
                <span className="bg-gradient-to-r from-stone-700 to-amber-600 bg-clip-text text-transparent">
                  Fresh
                </span>
                <br />
                <span className="bg-gradient-to-r from-amber-600 to-stone-600 bg-clip-text text-transparent">
                  Bakery
                </span>
              </h1>
              <p className="text-xl text-stone-700 mb-8 max-w-lg mx-auto lg:mx-0 font-quicksand">
                Indulge in our freshly baked croissants, artisanal breads, and delicious pastries made with love and premium ingredients! ☕
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/products"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-stone-600 to-amber-600 text-white font-bold rounded-full text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl transform hover:-translate-y-2 font-poppins"
                >
                  🥐 Order Now
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/categories"
                  className="inline-flex items-center px-8 py-4 bg-white text-stone-700 font-bold rounded-full text-lg transition-all duration-300 hover:scale-110 hover:shadow-xl border-2 border-stone-300 hover:border-stone-500 font-poppins"
                >
                  ☕ View Menu
                </Link>
              </div>
            </div>

            {/* Right content - Floating product cards */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto">
                {/* Product 1 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500 hover:scale-110 animate-float">
                  <div className="w-24 h-24 bg-gradient-to-br from-stone-200 to-amber-200 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <span className="text-4xl">🥐</span>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-stone-700 mb-1">CROISSANTS</div>
                    <div className="text-xs text-stone-600">Buttery & Flaky</div>
                  </div>
                </div>

                {/* Product 2 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl transform -rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-110 animate-float-delay-1">
                  <div className="w-24 h-24 bg-gradient-to-br from-amber-200 to-stone-200 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <span className="text-4xl">☕</span>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-stone-700 mb-1">COFFEE</div>
                    <div className="text-xs text-stone-600">Rich & Aromatic</div>
                  </div>
                </div>

                {/* Product 3 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-110 animate-float-delay-2">
                  <div className="w-24 h-24 bg-gradient-to-br from-stone-200 to-amber-300 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <span className="text-4xl">🧁</span>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-stone-700 mb-1">CUPCAKES</div>
                    <div className="text-xs text-stone-600">Sweet & Moist</div>
                  </div>
                </div>

                {/* Product 4 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl transform -rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-110 animate-float-delay-3">
                  <div className="w-24 h-24 bg-gradient-to-br from-amber-200 to-stone-300 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <span className="text-4xl">🍰</span>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-stone-700 mb-1">CAKES</div>
                    <div className="text-xs text-stone-600">Delicious & Fresh</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-delay-1 { animation: float 3s ease-in-out infinite 0.5s; }
        .animate-float-delay-2 { animation: float 3s ease-in-out infinite 1s; }
        .animate-float-delay-3 { animation: float 3s ease-in-out infinite 1.5s; }
      `}</style>
    </section>
  );
};

export default Hero;
