export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  rating?: number;
  status: 'reading' | 'read' | 'want-to-read';
  genre?: string;
  progress?: number;
}

export interface ReadingSession {
  id: string;
  bookId: string;
  date: Date;
  duration: number; // in seconds
}

export interface Review {
  id: string;
  bookId: string;
  rating: number;
  text: string;
  date: Date;
  type: 'written' | 'video';
}

export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
    rating: 4,
    status: 'reading',
    genre: 'Fantasy',
    progress: 65
  },
  {
    id: '2',
    title: 'Catching Fire',
    author: 'Suzanne Collins',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
    rating: 5,
    status: 'read',
    genre: 'Fantasy'
  },
  {
    id: '3',
    title: 'Mockingjay',
    author: 'Suzanne Collins',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
    rating: 4,
    status: 'read',
    genre: 'Fantasy'
  },
  {
    id: '4',
    title: 'Divergent',
    author: 'Veronica Roth',
    cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    status: 'want-to-read',
    genre: 'Fantasy'
  },
  {
    id: '5',
    title: 'The Maze Runner',
    author: 'James Dashner',
    cover: 'https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=400&h=600&fit=crop',
    rating: 4,
    status: 'read',
    genre: 'Fantasy'
  },
  {
    id: '6',
    title: 'Twilight',
    author: 'Stephenie Meyer',
    cover: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=600&fit=crop',
    status: 'want-to-read',
    genre: 'Romance'
  },
  {
    id: '7',
    title: 'The Fault in Our Stars',
    author: 'John Green',
    cover: 'https://images.unsplash.com/photo-1502139214982-d0ad755818d8?w=400&h=600&fit=crop',
    rating: 5,
    status: 'read',
    genre: 'Romance'
  },
  {
    id: '8',
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    cover: 'https://images.unsplash.com/photo-1551029506-0807df4e0f36?w=400&h=600&fit=crop',
    rating: 5,
    status: 'read',
    genre: 'Fantasy'
  },
  {
    id: '9',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    cover: 'https://images.unsplash.com/photo-1476357471311-43c0db9fb2b4?w=400&h=600&fit=crop',
    status: 'reading',
    genre: 'Fantasy',
    progress: 45
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    bookId: '1',
    rating: 4,
    text: 'I loved The Hunger Games for the first time! Honestly the characters, the stakes, the story, it\'s amazing to read. This is a really good book!',
    date: new Date('2026-03-10'),
    type: 'written'
  }
];

export const genres = [
  'All',
  'Fantasy',
  'Romance',
  'Mystery',
  'Thriller',
  'Sci-Fi',
  'Historical Fiction'
];

export const readingGoals = [
  { label: 'Daily Goal', value: 30, unit: 'minutes', current: 22 },
  { label: 'Weekly Goal', value: 210, unit: 'minutes', current: 156 },
  { label: 'Monthly Goal', value: 10, unit: 'books', current: 7 }
];
