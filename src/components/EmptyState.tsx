
import React from 'react';
import { CircleDollarSign, CreditCard, ShieldCheck, Globe } from 'lucide-react';
import MastercardLogo from './MastercardLogo';

const EmptyState: React.FC = () => {
  const examples = [
    { icon: <CircleDollarSign className="h-6 w-6" />, text: "Explain Mastercard's payment processing system" },
    { icon: <CreditCard className="h-6 w-6" />, text: "What credit card options does Mastercard offer?" },
    { icon: <ShieldCheck className="h-6 w-6" />, text: "How does Mastercard protect my transactions?" },
    { icon: <Globe className="h-6 w-6" />, text: "Can I use my Mastercard abroad?" },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <MastercardLogo className="h-16 w-auto mb-6" />
      <h1 className="text-2xl font-bold mb-2">Welcome to Mastercard Assistant</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        Ask questions about Mastercard services, payments, cards, and financial solutions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
        {examples.map((example, i) => (
          <div 
            key={i}
            className="flex items-center gap-3 p-4 border border-border rounded-lg bg-background hover:bg-muted/50 transition-colors cursor-pointer text-left"
          >
            <div className="flex-shrink-0 text-primary">{example.icon}</div>
            <span>{example.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmptyState;
