
import React from 'react';
import { User, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto py-4 space-y-6">
      {messages.map((message) => (
        <div 
          key={message.id} 
          className={cn(
            "px-4 md:px-8 lg:px-12 flex gap-4 animate-fade-in",
            message.role === 'assistant' ? "bg-muted/30 py-6" : "py-4"
          )}
        >
          <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-1">
            {message.role === 'user' ? (
              <div className="bg-primary text-white rounded-full p-1.5">
                <User size={16} />
              </div>
            ) : (
              <div className="bg-mastercard-yellow text-mastercard-dark rounded-full p-1.5">
                <Bot size={16} />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium mb-1">
              {message.role === 'user' ? 'You' : 'Mastercard Assistant'}
            </div>
            <div className="prose prose-sm max-w-none">
              {message.content.split('\n').map((paragraph, i) => (
                <p key={i} className={paragraph.trim() === '' ? 'h-4' : ''}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
