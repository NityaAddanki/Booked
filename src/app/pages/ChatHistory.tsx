import { ArrowLeft, MessageSquare, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';

export function ChatHistory() {
  const navigate = useNavigate();
  const { chatConversations, createNewChat } = useApp();

  const handleNewChat = () => {
    createNewChat();
    navigate('/ai-chat');
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  const getPreviewText = (messages: any[]) => {
    if (messages.length === 0) return 'No messages yet';
    const lastMessage = messages[messages.length - 1];
    return lastMessage.text.substring(0, 60) + (lastMessage.text.length > 60 ? '...' : '');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 border-b border-gray-200 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
          <ArrowLeft className="size-6" />
        </button>
        <h1 className="text-xl font-semibold">Chat History</h1>
        <button onClick={handleNewChat} className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
          New Chat
        </button>
      </div>

      {/* Chat List */}
      <div className="p-4">
        {chatConversations.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="size-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No chat history yet</p>
            <button
              onClick={handleNewChat}
              className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium"
            >
              Start Your First Chat
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {chatConversations.map((chat) => (
              <button
                key={chat.id}
                onClick={() => navigate(`/ai-chat/${chat.id}`)}
                className="w-full bg-white rounded-lg p-4 shadow-sm text-left hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="size-5 text-teal-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {chat.title}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">
                        {getPreviewText(chat.messages)}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDate(chat.lastUpdated)} • {chat.messages.length} messages
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
