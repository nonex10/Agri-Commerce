'use client';

import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import Image from 'next/image';

interface FarmerCardProps {
  name: string;
  location: string;
  description: string;
  avatar: string;
  rating: number;
  reviews: number;
}

export function FarmerCard({
  name,
  location,
  description,
  avatar,
  rating,
  reviews,
}: FarmerCardProps) {
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Avatar */}
      <div className="relative h-48 bg-muted">
        <Image
          src={avatar}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Name and Location */}
        <h3 className="text-xl font-bold text-card-foreground mb-1">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          {location}
        </p>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? 'fill-accent text-accent'
                    : 'text-muted'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({reviews})
          </span>
        </div>

        {/* Action */}
        <Button className="w-full">View Products</Button>
      </div>
    </div>
  );
}
