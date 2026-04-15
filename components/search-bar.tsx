'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
      <Input
        placeholder="Search products..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 bg-card"
      />
    </div>
  );
}
