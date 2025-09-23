interface CategoryHeaderProps {
  name: string;
  emoji: string;
}

const CategoryHeader = ({ name, emoji }: CategoryHeaderProps) => {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-stone-200 to-amber-200 rounded-full mb-4 shadow-lg">
        <span className="text-4xl">{emoji}</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-stone-700 font-fredoka mb-4">
        {name}
      </h2>
    </div>
  );
};

export default CategoryHeader;
