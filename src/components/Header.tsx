
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Info } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const isMobile = useIsMobile();

  return (
    <header className="p-4 border-b border-border flex items-center justify-between gap-4">
      <div className="flex items-center">
        <Button variant="outline" className="text-sm font-medium flex items-center gap-2">
          <span>GPT-4o</span>
          <ChevronDown size={16} />
        </Button>
      </div>
      
      {!isMobile && (
        <div className="flex items-center text-muted-foreground text-sm">
          <span className="flex items-center gap-1">
            <Info size={14} />
            Mastercard knowledge up to April 2023
          </span>
        </div>
      )}
    </header>
  );
};

export default Header;
