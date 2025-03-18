
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ChatMessages, { Message } from '@/components/ChatMessages';
import ChatInput from '@/components/ChatInput';
import EmptyState from '@/components/EmptyState';
import { useToast } from '@/components/ui/use-toast';
import { sendMessageToAI } from '@/services/aiService';

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Get response from Java backend
      const aiResponse = await sendMessageToAI(content);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse.content,
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response from AI service",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        
        <main className="flex-1 flex flex-col overflow-hidden animate-fade-in">
          {messages.length === 0 ? (
            <EmptyState />
          ) : (
            <ChatMessages messages={messages} />
          )}
          
          <ChatInput 
            onSendMessage={handleSendMessage} 
            disabled={isLoading} 
          />
        </main>
      </div>
    </div>
  );
};

export default Index;
