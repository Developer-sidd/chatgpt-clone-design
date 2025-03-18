
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SendHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="border-t border-border p-4 animate-fade-in">
      <div className="mx-auto max-w-3xl">
        <div className="relative flex items-end bg-background rounded-lg border border-input shadow-sm focus-within:ring-1 focus-within:ring-primary hover-scale">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Mastercard Assistant..."
            rows={1}
            className={cn(
              "flex-1 resize-none border-0 bg-transparent px-3 py-2.5 focus:outline-none focus:ring-0",
              "min-h-[48px] max-h-[200px] overflow-y-auto"
            )}
            style={{ height: 'auto' }}
          />
          <div className="flex-shrink-0 p-2">
            <Button 
              type="submit" 
              size="icon" 
              disabled={!message.trim() || disabled}
              onClick={handleSendMessage}
              className={cn(
                "rounded-full bg-primary text-white hover:bg-primary/90 animate-pulse",
                !message.trim() && "opacity-50 cursor-not-allowed"
              )}
            >
              <SendHorizontal size={16} />
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Mastercard Assistant can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
};

export default ChatInput;
