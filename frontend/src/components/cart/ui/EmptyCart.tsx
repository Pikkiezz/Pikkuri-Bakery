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
        Looks like you haven't added any delicious bakery items to your cart yet. 
        Let's fix that! 🥐☕
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

  // Render popular items
  const renderPopularItems = () => {
    const popularItems = [
      {
        emoji: '🥐',
        name: 'Croissants',
        description: 'Flaky, buttery layers baked to perfection',
        price: 'From $4.50'
      },
      {
        emoji: '☕',
        name: 'Coffee',
        description: 'Rich, aromatic coffee to start your day',
        price: 'From $2.50'
      },
      {
        emoji: '🍰',
        name: 'Cakes',
        description: 'Delicious cakes and desserts for every occasion',
        price: 'From $4.00'
      }
    ];

    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-stone-700 mb-6 font-fredoka">
          Popular Items
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {popularItems.map((item, index) => (
            <div 
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-4xl mb-4">{item.emoji}</div>
              <h3 className="text-lg font-bold text-stone-700 mb-2 font-poppins">{item.name}</h3>
              <p className="text-stone-600 text-sm font-quicksand mb-4">
                {item.description}
              </p>
              <div className="text-xl font-bold text-stone-700">{item.price}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {renderEmptyCartIcon()}
          {renderEmptyCartMessage()}
          {renderActionButtons()}
          {renderPopularItems()}
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
