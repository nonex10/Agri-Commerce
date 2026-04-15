import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { FarmerCard } from '@/components/farmer-card';
import { MOCK_FARMERS } from '@/lib/constants';

export default function FarmersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Meet Our Farmers
            </h1>
            <p className="text-muted-foreground">
              Meet the dedicated farmers behind AgriFresh&apos;s fresh produce
            </p>
          </div>
        </section>

        {/* Farmers Grid */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {MOCK_FARMERS.map((farmer) => (
                <FarmerCard
                  key={farmer.id}
                  name={farmer.name}
                  location={farmer.location}
                  description={farmer.description}
                  avatar={farmer.avatar}
                  rating={farmer.rating}
                  reviews={farmer.reviews}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="bg-card py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
              Why Partner with AgriFresh?
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                AgriFresh connects farmers directly with customers, eliminating
                unnecessary middlemen and ensuring fair prices for your hard work.
                Our platform makes it easy to reach more customers and grow your farm
                business.
              </p>
              <p>
                We handle logistics, payments, and customer support so you can focus
                on what you do best—growing fresh, quality produce. Join thousands of
                farmers who trust AgriFresh to bring their products to market.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
