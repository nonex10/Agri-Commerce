import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart, Globe, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-linear-to-br from-primary/10 to-accent/10 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-foreground">About AgriFresh</h1>
            <p className="text-muted-foreground mt-2">
              Connecting communities across Nepal with fresh, sustainable agriculture
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-8 leading-relaxed">
              To simplify how fresh produce reaches people in Nepal by connecting local farms
              directly with customers — ensuring fresher food, fair prices, and support for
              sustainable agriculture across the country.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="bg-card py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Sustainability
                </h3>
                <p className="text-muted-foreground">
                  We support responsible farming practices and care about
                  the environment in everything we do.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Community
                </h3>
                <p className="text-muted-foreground">
                  We believe in supporting local communities across Nepal and building
                  meaningful connections between producers and customers.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Transparency
                </h3>
                <p className="text-muted-foreground">
                  Know where your food comes from. We provide clear information
                  about every product on our platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                AgriFresh was started by a team passionate about improving how food
                reaches people in Nepal. We saw a clear gap — fresh produce often travels
                through too many hands before it reaches customers, making it less fresh
                and more expensive for everyone.
              </p>
              <p>
                We started with a simple idea: cut out the unnecessary steps and connect
                farms directly with people who want fresh, quality produce. Using
                technology and a reliable local delivery network, we built a platform
                that works for both producers and customers across Nepal.
              </p>
              <p>
                Today, AgriFresh partners with farms from the Terai to the hills,
                delivering fresh produce to customers in cities and towns across Nepal.
                We are proud to support local agriculture and make healthy food more
                accessible to Nepali households.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Join the AgriFresh Movement</h2>
            <p className="text-lg opacity-90 mb-8">
              Whether you&apos;re looking to buy fresh produce or list your farm&apos;s products, AgriFresh is here to help.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/products">
                <Button size="lg" variant="secondary" className="px-8">
                  Shop Fresh Produce
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
