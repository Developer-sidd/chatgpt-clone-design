
/**
 * Service for connecting to the Java AI backend
 * 
 * Note: You will need to add your API keys in a secure way:
 * 1. For production: Use environment variables in your Java backend
 *    DO NOT hardcode API keys in this frontend code
 * 2. Configure your Java backend to accept requests from this frontend
 * 3. The Java backend should handle authentication and API key management
 */

export interface AIResponse {
  content: string;
  sources?: string[];
}

export const sendMessageToAI = async (message: string): Promise<AIResponse> => {
  try {
    // Replace this URL with your actual Java backend endpoint
    const response = await fetch('https://your-java-backend.com/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any authentication headers needed for your Java backend
        // 'Authorization': 'Bearer your-auth-token'
      },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      throw new Error('Failed to connect to AI service');
    }

    return await response.json();
  } catch (error) {
    console.error('Error connecting to AI service:', error);
    return {
      content: "I'm sorry, I couldn't process your request at the moment. Please try again later."
    };
  }
};
