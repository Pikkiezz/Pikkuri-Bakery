import { Header, Footer } from '@/components/layout';
import CartContent from '@/components/cart/CartContent';

const Cart = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-stone-100">
      <Header />
      
      <main className="pt-20">
        <CartContent />
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
