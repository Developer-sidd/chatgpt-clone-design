
# Mastercard AI Assistant - Frontend

This is the frontend for the Mastercard AI Assistant application. To fully utilize the AI features, you'll need to set up a Java backend.

## Java Backend Integration

### Setting Up Your Java Backend

1. Create a Java Spring Boot application
2. Set up REST endpoints for handling chat requests
3. Implement your AI integration (e.g., with OpenAI, Azure OpenAI, or other AI providers)

### Important Security Notes

- **DO NOT** store API keys in the frontend code
- Use environment variables or a secrets manager in your Java backend
- Implement proper authentication and authorization in your backend
- Configure CORS in your Java backend to accept requests from your frontend origin

### Example Backend Endpoint

Your Java backend should expose an endpoint similar to:

```java
@RestController
@RequestMapping("/api")
public class ChatController {

    private final AIService aiService;
    
    // Inject your service
    public ChatController(AIService aiService) {
        this.aiService = aiService;
    }
    
    @PostMapping("/chat")
    public ResponseEntity<AIResponse> processChat(@RequestBody ChatRequest request) {
        // Process the chat request using your AI service
        // This service should handle the API keys securely
        AIResponse response = aiService.generateResponse(request.getMessage());
        return ResponseEntity.ok(response);
    }
}
```

## Integration Steps

1. Update the `sendMessageToAI` function in `src/services/aiService.ts` with your actual backend URL
2. Uncomment the backend API call in `src/pages/Index.tsx` and remove the simulated response
3. Add any necessary authentication logic to your API calls

