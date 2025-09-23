import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  productCount: number;
  color: string;
  gradient: string;
  emoji: string;
  bgColor: string;
}

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link 
      href={`/categories/${category.id}`}
      className="group block transform hover:scale-105 transition-all duration-300"
    >
      <div className={`${category.bgColor} rounded-3xl p-8 shadow-lg h-90 hover:shadow-2xl transition-all duration-500 border border-white/50 relative overflow-hidden`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-20 h-20 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/10 rounded-full"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div className={`w-20 h-20 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <span className="text-4xl group-hover:animate-bounce">{category.emoji}</span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-stone-800 mb-3 group-hover:text-stone-700 transition-colors font-fredoka">
            {category.name}
          </h3>

          {/* Description */}
          <p className="text-stone-600 mb-4 leading-relaxed font-quicksand">
            {category.description}
          </p>

          {/* Product Count */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-stone-500 font-medium">
              {category.productCount} items
            </span>
            <div className={`px-4 py-2 bg-gradient-to-r ${category.gradient} text-white text-sm font-bold rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300`}>
              Explore →
            </div>
          </div>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
    </Link>
  );
};

export default CategoryCard;
