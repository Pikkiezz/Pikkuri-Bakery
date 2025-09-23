const MenuHero = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-stone-100 via-amber-100 to-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 font-fredoka">
          <span className="bg-gradient-to-r from-stone-700 to-amber-600 bg-clip-text text-transparent">
            Our
          </span>
          <span className="bg-gradient-to-r from-amber-600 to-stone-600 bg-clip-text text-transparent">
            {' '}Menu
          </span>
        </h1>
        <p className="text-xl text-stone-700 max-w-2xl mx-auto font-quicksand">
          Discover our delicious selection of freshly baked goods and artisanal coffee ☕
        </p>
      </div>
    </section>
  );
};

export default MenuHero;
