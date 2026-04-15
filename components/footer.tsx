import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <div className="w-6 h-6 bg-primary-foreground rounded flex items-center justify-center">
                <span className="text-primary font-bold text-sm">A</span>
              </div>
              AgriFresh
            </h3>
            <p className="text-sm opacity-90">
              Connecting farmers with customers for fresh, organic produce delivered directly from farm to table.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:opacity-75 transition-opacity">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:opacity-75 transition-opacity">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/farmers" className="hover:opacity-75 transition-opacity">
                  Farmers
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:opacity-75 transition-opacity">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:opacity-75 transition-opacity">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-75 transition-opacity">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-75 transition-opacity">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-75 transition-opacity">
                  Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:opacity-75 transition-opacity">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-75 transition-opacity">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-75 transition-opacity">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-90">
            &copy; 2024 AgriFresh. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-sm hover:opacity-75 transition-opacity">
              Twitter
            </a>
            <a href="#" className="text-sm hover:opacity-75 transition-opacity">
              Facebook
            </a>
            <a href="#" className="text-sm hover:opacity-75 transition-opacity">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
