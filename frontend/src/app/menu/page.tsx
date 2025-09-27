import { Header, Footer } from '@/components/layout';
import MenuHero from '@/components/menu/MenuHero';
import MenuCategories from '@/components/menu/MenuCategories';

const Menu = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-stone-100">
      <Header />
      
      <main className="pt-20">
        <MenuHero />
        <MenuCategories />
        {/* <MenuCTA /> */}
      </main>

      <Footer />
    </div>
  );
};

export default Menu;
