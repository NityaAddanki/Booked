import { useState, useEffect } from 'react';
import { ArrowLeft, Image, Code, Mic, ArrowUp, User, MessageSquare } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { useApp } from '../context/AppContext';

export function AIChat() {
  const navigate = useNavigate();
  const { chatId } = useParams<{ chatId?: string }>();
  const { 
    createNewChat, 
    addMessageToChat, 
    getChatById, 
    currentChatId, 
    setCurrentChat 
  } = useApp();
  
  const [inputValue, setInputValue] = useState('');
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  // Initialize chat
  useEffect(() => {
    if (chatId) {
      // Load existing chat
      setActiveChatId(chatId);
      setCurrentChat(chatId);
    } else if (!activeChatId) {
      // Create new chat
      const newChatId = createNewChat();
      setActiveChatId(newChatId);
    }
  }, [chatId]);

  const currentChat = activeChatId ? getChatById(activeChatId) : null;
  const messages = currentChat?.messages || [];

  const handleSendMessage = () => {
    if (!inputValue.trim() || !activeChatId) return;

    // Add user message
    addMessageToChat(activeChatId, {
      type: 'user',
      text: inputValue,
      timestamp: new Date(),
    });

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      addMessageToChat(activeChatId, {
        type: 'bot',
        text: botResponse,
        timestamp: new Date(),
      });
    }, 1000);

    setInputValue('');
  };

  const generateBotResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('mystery') || lowerMessage.includes('thriller')) {
      return "That's a great choice! Here are a few mystery/thriller books you might like:\n\n• The Silent Patient – A famous painter shoots her husband and then never speaks again, leaving a psychotherapist determined to uncover the truth.\n\n• The Girl with the Dragon Tattoo – A journalist and a brilliant hacker investigate a decades-old disappearance tied to a powerful family.\n\nWould you prefer something more psychological, fast-paced, or with a detective investigation?";
    } else if (lowerMessage.includes('romance')) {
      return "Perfect! Here are some romance recommendations:\n\n• The Love Hypothesis – A fake dating arrangement between a grad student and a professor leads to real feelings.\n\n• Beach Read – Two writers with opposite genres spend a summer in neighboring beach houses and challenge each other.\n\nWould you like something more contemporary, historical, or fantasy romance?";
    } else if (lowerMessage.includes('fantasy')) {
      return "Great genre! Here are some fantasy books you might enjoy:\n\n• The Name of the Wind – A legendary innkeeper tells his story of becoming a powerful wizard.\n\n• A Court of Thorns and Roses – A huntress is drawn into a magical faerie world.\n\nWould you prefer epic fantasy, urban fantasy, or romantic fantasy?";
    } else if (lowerMessage.includes('thanks') || lowerMessage.includes('thank')) {
      return "You're welcome! Feel free to ask for more recommendations anytime. Happy reading! 📚";
    } else {
      return "I'd love to help you find a great book! Tell me about:\n\n• What genre you enjoy (mystery, romance, fantasy, sci-fi, etc.)\n• Your favorite books or authors\n• What kind of mood you're in for reading\n\nI can also recommend books based on your reading history and liked reviews!";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white p-4 border-b border-gray-200">
        <button onClick={() => navigate(-1)} className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
          <ArrowLeft className="size-6" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className={`flex gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.type === 'bot' && (
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l2 7h7l-5.5 4.5L17 21l-5-4-5 4 1.5-7.5L3 9h7z" />
                </svg>
              </div>
            )}
            <div className={`max-w-[75%] p-3 rounded-lg whitespace-pre-line ${
              message.type === 'bot' 
                ? 'bg-gray-200 text-gray-800' 
                : 'bg-gray-300 text-gray-800'
            }`}>
              {message.text}
            </div>
            {message.type === 'user' && (
              <div className="flex-shrink-0 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                <User className="size-5 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Need a book recommendation? Start chat!"
            className="w-full bg-gray-100 rounded-full py-3 px-4 pr-40 text-sm"
            onKeyPress={handleKeyPress}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <Image className="size-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <Code className="size-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <Mic className="size-5 text-gray-600" />
            </button>
            <button className="p-2 bg-gray-300 rounded-full" onClick={handleSendMessage}>
              <ArrowUp className="size-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}