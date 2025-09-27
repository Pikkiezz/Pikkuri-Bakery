'use client';

import Link from 'next/link';
import Image from 'next/image';


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
              Try our fresh croissants, homemade bread, and tasty pastries. We make them with care and good ingredients! ☕
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/menu"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-stone-600 to-amber-600 text-white font-bold rounded-full text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl transform hover:-translate-y-2 font-poppins"
                >
                  🥐 view menu
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>

              </div>
            </div>

            {/* Right content - Floating product cards */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto">
                  {/* Product 1 */}
                  <div 
                    className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500 hover:scale-110 animate-float bg-cover bg-center bg-no-repeat min-h-[200px] flex items-center justify-center"
                    style={{ backgroundImage: 'url(/images/Croissant.jpg)' }}
                  >
                  </div>

                {/* Product 2 */}
                <div 
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl transform -rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-110 animate-float-delay-1 bg-cover bg-center bg-no-repeat min-h-[200px] flex items-center justify-center"
                  style={{ backgroundImage: 'url(/images/coffee.jpg)' }}
                >
                </div>

                {/* Product 3 */}
                <div 
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl transform -rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-110 animate-float-delay-1 bg-cover bg-center bg-no-repeat min-h-[200px] flex items-center justify-center"
                   style={{ backgroundImage: 'url(/images/cupcake.jpg)' }}
                >
                </div>

                {/* Product 4 */}
                <div 
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-110 animate-float-delay-1 bg-cover bg-center bg-no-repeat min-h-[200px] flex items-center justify-center"
                   style={{ backgroundImage: 'url(/images/cake.jpg)' }}
                >
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
