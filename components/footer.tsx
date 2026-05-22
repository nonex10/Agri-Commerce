import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <div className="w-6 h-6 bg-primary-foreground rounded flex items-center justify-center">
                <span className="text-primary font-bold text-sm">A</span>
              </div>
              AgriFresh
            </h3>
            <p className="text-sm opacity-90">
              Connecting customers across Nepal with fresh produce delivered directly from farm to table.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="hover:opacity-75 transition-opacity" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:opacity-75 transition-opacity" href="/products">
                  Products
                </Link>
              </li>
              <li>
                <Link className="hover:opacity-75 transition-opacity" href="/about">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="hover:opacity-75 transition-opacity" href="/contact">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link className="hover:opacity-75 transition-opacity" href="/about">
                  FAQs
                </Link>
              </li>
              <li>
                <Link className="hover:opacity-75 transition-opacity" href="/about">
                  Delivery Info
                </Link>
              </li>
              <li>
                <Link className="hover:opacity-75 transition-opacity" href="/about">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="hover:opacity-75 transition-opacity" href="/about">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="hover:opacity-75 transition-opacity" href="/about">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link className="hover:opacity-75 transition-opacity" href="/about">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-sm opacity-90">
            &copy; 2025 AgriFresh Nepal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}