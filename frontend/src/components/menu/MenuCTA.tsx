const MenuCTA = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-stone-100 via-amber-100 to-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-stone-700 mb-6 font-fredoka">
          Ready to Order?
        </h2>
        <p className="text-xl text-stone-600 mb-8 font-quicksand">
          Visit our bakery or order online for the freshest experience! 🥐
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-stone-600 to-amber-600 text-white font-bold rounded-full text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl transform hover:-translate-y-2">
            📞 Call to Order
          </button>
          <button className="inline-flex items-center px-8 py-4 bg-white text-stone-700 font-bold rounded-full text-lg transition-all duration-300 hover:scale-110 hover:shadow-xl border-2 border-stone-300 hover:border-stone-500">
            🛒 Online Order
          </button>
        </div>
      </div>
    </section>
  );
};

export default MenuCTA;
