import { Header, Footer } from '@/components/layout';
import CartContent from '@/components/cart/CartContent';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Suspense } from 'react';

const Cart = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-stone-100">
        <Header />
        
        <main className="pt-20">
          <Suspense fallback={
            <div className="py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">⏳</div>
                  <h2 className="text-2xl font-bold text-stone-700 mb-2 font-fredoka">Loading...</h2>
                </div>
              </div>
            </div>
          }>
            <CartContent />
          </Suspense>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Cart;
