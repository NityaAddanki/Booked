import { createContext, useContext, useState, ReactNode } from 'react';

interface VideoReview {
  id: string;
  bookId: string;
  bookTitle: string;
  thumbnail: string;
  author: string;
  title: string;
  description: string;
  timestamp: Date;
}

interface WrittenReview {
  id: string;
  bookId: string;
  author: string;
  rating: number;
  text: string;
  liked: boolean;
  timestamp: Date;
}

interface Comment {
  id: string;
  videoId: string;
  username: string;
  text: string;
  likes: number;
  timestamp: Date;
}

interface ReadingSession {
  id: string;
  bookId: string;
  bookTitle: string;
  date: string; // YYYY-MM-DD format
  hours: number;
  minutes: number;
  seconds: number;
  timestamp: Date;
}

interface ChatMessage {
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

interface ChatConversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  lastUpdated: Date;
}

interface AppContextType {
  likedVideos: VideoReview[];
  toggleLikeVideo: (video: VideoReview) => void;
  isVideoLiked: (videoId: string) => boolean;
  
  comments: Comment[];
  addComment: (videoId: string, username: string, text: string) => void;
  getCommentsForVideo: (videoId: string) => Comment[];
  
  writtenReviews: WrittenReview[];
  addWrittenReview: (review: Omit<WrittenReview, 'id' | 'timestamp'>) => void;
  getReviewsForBook: (bookId: string) => WrittenReview[];
  
  readingSessions: ReadingSession[];
  addReadingSession: (session: Omit<ReadingSession, 'id' | 'timestamp'>) => void;
  hasReadOnDate: (date: string) => boolean;
  
  chatConversations: ChatConversation[];
  currentChatId: string | null;
  createNewChat: () => string;
  addMessageToChat: (chatId: string, message: ChatMessage) => void;
  getChatById: (chatId: string) => ChatConversation | undefined;
  setCurrentChat: (chatId: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial mock data
const initialComments: Comment[] = [
  { id: '1', videoId: 'video-1', username: 'litlover22', text: "I reread this for the first time since 6th grade and it's still just as captivating.", likes: 3, timestamp: new Date('2026-03-15') },
  { id: '2', videoId: 'video-1', username: 'hungrgamesfan', text: 'Same! Such a good reread.', likes: 1, timestamp: new Date('2026-03-15') },
  { id: '3', videoId: 'video-1', username: 'falodiam', text: 'Honestly the world building in this book is so good.', likes: 0, timestamp: new Date('2026-03-16') },
  { id: '4', videoId: 'video-1', username: 'adilirr', text: 'This review made me want to reread the whole series again.', likes: 0, timestamp: new Date('2026-03-16') },
  { id: '5', videoId: 'video-1', username: 'ayeshakhan', text: 'Ikr, now I have to find my collection.', likes: 0, timestamp: new Date('2026-03-16') },
  { id: '6', videoId: 'video-1', username: 'bookluvr39', text: 'Added to my TBR!', likes: 0, timestamp: new Date('2026-03-17') },
];

const initialWrittenReviews: WrittenReview[] = [
  {
    id: '1',
    bookId: '1',
    author: 'Aditi',
    rating: 4,
    text: "A really gripping story with a cool dystopian concept. It kept me hooked, even if some of the side characters didn't get much development.",
    liked: true,
    timestamp: new Date('2026-03-10'),
  },
  {
    id: '2',
    bookId: '1',
    author: 'Maya',
    rating: 5,
    text: "This book completely hooked me. I kept telling myself 'just one more chapter' and suddenly it was 2 a.m.",
    liked: false,
    timestamp: new Date('2026-03-12'),
  },
  {
    id: '3',
    bookId: '1',
    author: 'Nitya',
    rating: 4,
    text: "Super entertaining and hard to put down. It's a bit dark at times, but the story and characters make it worth it.",
    liked: false,
    timestamp: new Date('2026-03-13'),
  },
  {
    id: '4',
    bookId: '1',
    author: 'Ayesha',
    rating: 3,
    text: "The concept was cool, but some parts felt a little predictable.",
    liked: false,
    timestamp: new Date('2026-03-14'),
  },
  {
    id: '5',
    bookId: '1',
    author: 'Dylan',
    rating: 5,
    text: "Dark, gripping, and surprisingly thoughtful. The way it combines thrilling competition with meaning was perfect.",
    liked: false,
    timestamp: new Date('2026-03-15'),
  },
  {
    id: '6',
    bookId: '2',
    author: 'Sarah',
    rating: 5,
    text: "Absolutely loved this book! The characters felt so real and I couldn't put it down.",
    liked: false,
    timestamp: new Date('2026-03-11'),
  },
  {
    id: '7',
    bookId: '2',
    author: 'James',
    rating: 4,
    text: "Great read with an interesting plot. Some parts dragged a bit but overall really enjoyable.",
    liked: false,
    timestamp: new Date('2026-03-13'),
  },
  {
    id: '8',
    bookId: '2',
    author: 'Emma',
    rating: 5,
    text: "One of my favorites this year! The writing style is beautiful and the story is captivating.",
    liked: true,
    timestamp: new Date('2026-03-16'),
  },
  {
    id: '9',
    bookId: '3',
    author: 'Michael',
    rating: 4,
    text: "Really well-written and thought-provoking. Made me think about things differently.",
    liked: false,
    timestamp: new Date('2026-03-09'),
  },
  {
    id: '10',
    bookId: '3',
    author: 'Lisa',
    rating: 5,
    text: "This book changed my perspective on so many things. A must-read!",
    liked: false,
    timestamp: new Date('2026-03-14'),
  },
  {
    id: '11',
    bookId: '3',
    author: 'David',
    rating: 3,
    text: "Interesting concept but the pacing was a bit slow for my taste.",
    liked: false,
    timestamp: new Date('2026-03-17'),
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [likedVideos, setLikedVideos] = useState<VideoReview[]>([]);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [writtenReviews, setWrittenReviews] = useState<WrittenReview[]>(initialWrittenReviews);
  const [readingSessions, setReadingSessions] = useState<ReadingSession[]>([]);
  const [chatConversations, setChatConversations] = useState<ChatConversation[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  const toggleLikeVideo = (video: VideoReview) => {
    setLikedVideos(prev => {
      const isLiked = prev.some(v => v.id === video.id);
      if (isLiked) {
        return prev.filter(v => v.id !== video.id);
      } else {
        return [...prev, video];
      }
    });
  };

  const isVideoLiked = (videoId: string) => {
    return likedVideos.some(v => v.id === videoId);
  };

  const addComment = (videoId: string, username: string, text: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      videoId,
      username,
      text,
      likes: 0,
      timestamp: new Date(),
    };
    setComments(prev => [...prev, newComment]);
  };

  const getCommentsForVideo = (videoId: string) => {
    return comments.filter(c => c.videoId === videoId);
  };

  const addWrittenReview = (review: Omit<WrittenReview, 'id' | 'timestamp'>) => {
    const newReview: WrittenReview = {
      ...review,
      id: `review-${Date.now()}`,
      timestamp: new Date(),
    };
    setWrittenReviews(prev => [newReview, ...prev]);
  };

  const getReviewsForBook = (bookId: string) => {
    return writtenReviews.filter(r => r.bookId === bookId);
  };

  const addReadingSession = (session: Omit<ReadingSession, 'id' | 'timestamp'>) => {
    const newSession: ReadingSession = {
      ...session,
      id: `session-${Date.now()}`,
      timestamp: new Date(),
    };
    setReadingSessions(prev => [newSession, ...prev]);
  };

  const hasReadOnDate = (date: string) => {
    return readingSessions.some(session => session.date === date);
  };

  const createNewChat = () => {
    const newChatId = `chat-${Date.now()}`;
    const newChat: ChatConversation = {
      id: newChatId,
      title: 'New Chat',
      messages: [],
      lastUpdated: new Date(),
    };
    setChatConversations(prev => [...prev, newChat]);
    setCurrentChatId(newChatId);
    return newChatId;
  };

  const addMessageToChat = (chatId: string, message: ChatMessage) => {
    setChatConversations(prev => {
      const chatIndex = prev.findIndex(c => c.id === chatId);
      if (chatIndex !== -1) {
        const chat = prev[chatIndex];
        const isFirstUserMessage = message.type === 'user' && chat.messages.filter(m => m.type === 'user').length === 0;
        
        const updatedChat = {
          ...chat,
          messages: [...chat.messages, message],
          lastUpdated: new Date(),
          title: isFirstUserMessage ? message.text.substring(0, 50) + (message.text.length > 50 ? '...' : '') : chat.title,
        };
        return [
          ...prev.slice(0, chatIndex),
          updatedChat,
          ...prev.slice(chatIndex + 1),
        ];
      }
      return prev;
    });
  };

  const getChatById = (chatId: string) => {
    return chatConversations.find(c => c.id === chatId);
  };

  const setCurrentChat = (chatId: string | null) => {
    setCurrentChatId(chatId);
  };

  return (
    <AppContext.Provider
      value={{
        likedVideos,
        toggleLikeVideo,
        isVideoLiked,
        comments,
        addComment,
        getCommentsForVideo,
        writtenReviews,
        addWrittenReview,
        getReviewsForBook,
        readingSessions,
        addReadingSession,
        hasReadOnDate,
        chatConversations,
        currentChatId,
        createNewChat,
        addMessageToChat,
        getChatById,
        setCurrentChat,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}