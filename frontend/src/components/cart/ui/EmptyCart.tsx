import Link from 'next/link';

const EmptyCart = () => {
  // Render empty cart icon
  const renderEmptyCartIcon = () => (
    <div className="text-8xl mb-8 animate-bounce">🛒</div>
  );

  // Render empty cart message
  const renderEmptyCartMessage = () => (
    <>
      <h1 className="text-4xl md:text-5xl font-bold mb-6 font-fredoka">
        <span className="bg-gradient-to-r from-stone-700 to-amber-600 bg-clip-text text-transparent">
          Your Cart is
        </span>
        <span className="bg-gradient-to-r from-amber-600 to-stone-600 bg-clip-text text-transparent">
          {' '}Empty
        </span>
      </h1>
      
      <p className="text-xl text-stone-700 mb-8 font-quicksand max-w-2xl mx-auto">
        Looks like you haven&apos;t added any delicious bakery items to your cart yet. 
        Let&apos;s fix that! 🥐☕
      </p>
    </>
  );

  // Render action buttons
  const renderActionButtons = () => (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link
        href="/menu"
        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-stone-600 to-amber-600 text-white font-bold rounded-full text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl transform hover:-translate-y-2 font-poppins"
      >
        🥐 Browse Menu
        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </Link>
      
      <Link
        href="/"
        className="inline-flex items-center px-8 py-4 bg-white text-stone-700 font-bold rounded-full text-lg transition-all duration-300 hover:scale-110 hover:shadow-xl border-2 border-stone-300 hover:border-stone-500 font-poppins"
      >
        🏠 Back to Home
      </Link>
    </div>
  );


  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {renderEmptyCartIcon()}
          {renderEmptyCartMessage()}
          {renderActionButtons()}
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
