
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { SendHorizontal, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  const handleSendMessage = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
      
      // Reset textarea height after sending
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
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
        <div className={cn(
          "relative flex items-end bg-background rounded-lg border border-input shadow-sm focus-within:ring-1 focus-within:ring-primary transition-all duration-200",
          disabled ? "opacity-80" : "hover-scale"
        )}>
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={disabled ? "Processing..." : "Message Mastercard Assistant..."}
            rows={1}
            disabled={disabled}
            className={cn(
              "flex-1 resize-none border-0 bg-transparent px-3 py-2.5 focus:outline-none focus:ring-0",
              "min-h-[48px] max-h-[200px] overflow-y-auto transition-all duration-200",
              disabled && "cursor-not-allowed"
            )}
          />
          <div className="flex-shrink-0 p-2">
            <Button 
              type="submit" 
              size="icon" 
              disabled={!message.trim() || disabled}
              onClick={handleSendMessage}
              className={cn(
                "rounded-full bg-primary text-white hover:bg-primary/90",
                message.trim() && !disabled && "animate-subtle-pulse"
              )}
            >
              {disabled ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <SendHorizontal size={16} />
              )}
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2 animate-fade-in">
          Mastercard Assistant can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
};

export default ChatInput;
