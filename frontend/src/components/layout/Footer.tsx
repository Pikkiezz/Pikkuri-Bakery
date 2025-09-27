
const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-stone-600 via-amber-900 to-stone-700 text-white relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-amber-300 to-stone-300 bg-clip-text text-transparent font-fredoka">
                Pikkuri Bakery
              </h3>
            </div>
            <p className="text-stone-100 text-sm leading-relaxed">
              Freshly baked goods and artisanal coffee
              <br />
              Crafted with love and premium ingredients
              <br />
              Making every morning brighter
            </p>
          </div>

          {/* Bakery Menu */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center font-poppins">
              Bakery Menu
            </h3>
            <ul className="space-y-3">
              <li><span className="text-stone-100">Croissants & Pastries</span></li>
              <li><span className="text-stone-100">Fresh Breads</span></li>
              <li><span className="text-stone-100">Coffee & Beverages</span></li>
              <li><span className="text-stone-100">Cakes & Desserts</span></li>
              <li><span className="text-stone-100">Special Orders</span></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center font-poppins">
              Customer Care
            </h3>
            <ul className="space-y-3">
              <li><span className="text-stone-100">Fresh Delivery</span></li>
              <li><span className="text-stone-100">Easy Returns</span></li>
              <li><span className="text-stone-100">Bakery FAQ</span></li>
              <li><span className="text-stone-100">Customer Support</span></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div id="contact" className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center font-poppins">
              Contact Us
            </h3>
            <div className="space-y-3">
              <p className="text-stone-100 text-sm">
                hello@pikkuri.com
              </p>
              <p className="text-stone-100 text-sm">
                +1 (555) 123-4567
              </p>
              <p className="text-stone-100 text-sm">
                123 Bakery Street, Coffee City
              </p>
              <div className="pt-2">
                <p className="text-stone-100 text-sm">
                  Mon-Fri: 6AM-8PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center align-center">
            <p className="text-stone-100 text-sm">
              © 2025 Pikkuri Bakery. Made with love for coffee and bakery lovers everywhere.
            </p>
           
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;