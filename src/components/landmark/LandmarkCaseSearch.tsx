
import React, { FormEvent } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface LandmarkCaseSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: (e: FormEvent) => void;
}

const LandmarkCaseSearch = ({ 
  searchQuery, 
  onSearchChange, 
  onSearchSubmit 
}: LandmarkCaseSearchProps) => {
  return (
    <form onSubmit={onSearchSubmit} className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input 
        type="search" 
        placeholder="Search landmark cases..." 
        className="pl-9 bg-white"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </form>
  );
};

export default LandmarkCaseSearch;
