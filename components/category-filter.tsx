'use client';

import { CATEGORIES } from '@/lib/constants';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="bg-card rounded-lg p-6 shadow-sm">
      <h3 className="font-semibold text-lg mb-4 text-card-foreground">Categories</h3>
      <div className="space-y-2">
        <Button
          variant={selectedCategory === null ? 'default' : 'outline'}
          className="w-full justify-start"
          onClick={() => onCategoryChange(null)}
        >
          All Products
        </Button>
        {CATEGORIES.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            className="w-full justify-start"
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}
