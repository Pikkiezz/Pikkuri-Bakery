import { Header, Footer } from '@/components/layout';
import CartContent from '@/components/cart/CartContent';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

const Cart = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-stone-100">
        <Header />
        
        <main className="pt-20">
          <CartContent />
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Cart;
