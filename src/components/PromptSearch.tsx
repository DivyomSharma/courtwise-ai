
import React, { useState } from 'react';
import { Search, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const PromptSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Search initiated",
        description: `Searching for: "${searchQuery}"`,
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative rounded-xl shadow-md bg-background">
          <Input
            className="pl-12 pr-24 py-6 text-base md:text-lg h-16 rounded-xl border-2 focus-visible:ring-primary"
            placeholder="What do you want to search for?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <div className="flex items-center bg-secondary rounded-md px-2 py-1">
              <span className="text-sm text-muted-foreground">Courtwise AI</span>
            </div>
            
            <Button 
              type="submit" 
              size="sm" 
              className="h-10 w-10 rounded-full p-0 flex items-center justify-center"
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {['Research', 'Latest Cases', 'Supreme Court', 'Criminal Law', 'Constitutional'].map((item) => (
          <Button 
            key={item} 
            variant="outline" 
            size="sm"
            className="rounded-full bg-secondary/50"
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PromptSearch;
