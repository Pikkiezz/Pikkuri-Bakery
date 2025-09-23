import { Header, Footer } from '@/components/layout';
import OrderHistory from '@/components/orders/OrderHistory';

const OrdersPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-stone-100">
      <Header />
      <main className="pt-20">
        <OrderHistory />
      </main>
      <Footer />
    </div>
  );
};

export default OrdersPage;
