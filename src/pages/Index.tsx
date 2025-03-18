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
      // In production, use the Java backend
      // const aiResponse = await sendMessageToAI(content);
      // const responseContent = aiResponse.content;
      
      // For development/demo, we'll use the simulated response
      // Remove this in production and uncomment the above code
      const responseContent = getResponseForPrompt(content);
      
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: responseContent,
        };
        
        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response from AI service",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const getResponseForPrompt = (prompt: string): string => {
    // Simple response logic based on keywords
    const promptLower = prompt.toLowerCase();
    
    if (promptLower.includes('payment') || promptLower.includes('process')) {
      return "Mastercard's payment processing system operates on a four-party model involving the cardholder, merchant, issuing bank, and acquiring bank. When you make a purchase, your transaction data travels through the Mastercard network, which authorizes, clears, and settles the payment securely and efficiently.\n\nOur global network processes thousands of transactions per second with an average response time of less than 130 milliseconds.";
    } else if (promptLower.includes('credit card') || promptLower.includes('options')) {
      return "Mastercard offers various credit card options through our partner banks and financial institutions. These include:\n\n• Standard Mastercard\n• Gold Mastercard\n• Platinum Mastercard\n• World Mastercard\n• World Elite Mastercard\n\nEach tier provides increasing benefits and rewards. The specific features depend on the issuing bank, but higher-tier cards typically offer enhanced travel benefits, concierge services, and premium rewards programs.";
    } else if (promptLower.includes('security') || promptLower.includes('protect')) {
      return "Mastercard employs multiple layers of security to protect your transactions:\n\n1. EMV Chip Technology: Encrypts information for in-person transactions\n2. Mastercard SecureCode: Adds a private code for online shopping\n3. Tokenization: Replaces your card number with a digital token\n4. AI-driven fraud detection: Monitors transactions in real-time\n5. Zero Liability Protection: Ensures you're not responsible for unauthorized transactions\n\nWe also maintain a global security network that monitors threats 24/7.";
    } else if (promptLower.includes('abroad') || promptLower.includes('international')) {
      return "Yes, you can use your Mastercard for international transactions in over 210 countries and territories worldwide. Our global acceptance network includes millions of merchants and ATMs.\n\nWhen traveling abroad:\n\n• Your card automatically converts currencies at competitive exchange rates\n• No need to exchange large amounts of cash\n• Emergency card replacement is available if your card is lost or stolen\n\nSome cards offer additional travel benefits like no foreign transaction fees, but this depends on your specific card issuer.";
    } else {
      return "Thank you for your question. As Mastercard Assistant, I'm here to help with information about Mastercard products, services, payment solutions, and financial guidance.\n\nFor this specific inquiry, I'd need more details to provide accurate information. Could you please elaborate or ask about a specific Mastercard service or feature you're interested in?";
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
