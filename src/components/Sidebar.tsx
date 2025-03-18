
import React, { useState } from 'react';
import { ChevronLeft, MessageSquarePlus, MessageCircle, PanelLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MastercardLogo from './MastercardLogo';
import { cn } from '@/lib/utils';

interface ChatHistoryItem {
  id: string;
  title: string;
  date: string;
}

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([
    { id: '1', title: 'Payment Processing Inquiry', date: 'Apr 12' },
    { id: '2', title: 'Credit Card Features', date: 'Apr 10' },
    { id: '3', title: 'International Transactions', date: 'Apr 8' },
    { id: '4', title: 'Account Security', date: 'Apr 5' },
    { id: '5', title: 'Rewards Program', date: 'Apr 3' },
  ]);

  return (
    <div 
      className={cn(
        "flex flex-col h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-[60px]" : "w-[260px]"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && <MastercardLogo />}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isCollapsed ? <PanelLeft size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <div className="p-2">
        <Button 
          className={cn(
            "w-full justify-start gap-2 bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-foreground",
            isCollapsed && "justify-center p-2"
          )}
        >
          <MessageSquarePlus size={18} />
          {!isCollapsed && <span>New Chat</span>}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        {!isCollapsed && <h3 className="px-4 mb-2 text-xs uppercase text-sidebar-foreground/60">Recent Chats</h3>}
        <div className="space-y-1 px-2">
          {chatHistory.map((chat) => (
            <Button
              key={chat.id}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent truncate", 
                isCollapsed && "justify-center p-2"
              )}
            >
              <MessageCircle size={18} />
              {!isCollapsed && (
                <div className="flex justify-between w-full overflow-hidden">
                  <span className="truncate">{chat.title}</span>
                  <span className="text-xs text-sidebar-foreground/60 shrink-0">{chat.date}</span>
                </div>
              )}
            </Button>
          ))}
        </div>
      </div>

      {!isCollapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="text-xs text-sidebar-foreground/60">
            Mastercard Assistant
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
