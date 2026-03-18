import { useState } from 'react';
import { User, Edit3, X, Check, Plus, Play } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router';

interface Author {
  id: string;
  initials: string;
  name: string;
  color: string;
}

interface Genre {
  id: string;
  name: string;
}

export function Profile() {
  const { likedVideos } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [readingGoal, setReadingGoal] = useState(180);
  const [saveChatHistory, setSaveChatHistory] = useState(true);
  const [collateRecommendations, setCollateRecommendations] = useState(false);

  const [favoriteBooks] = useState([
    { id: '1', title: 'All About Love', cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300' },
    { id: '2', title: 'Divergent', cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=300' },
    { id: '3', title: 'Harry Potter', cover: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=300' },
    { id: '4', title: 'Percy Jackson', cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300' },
  ]);

  const [wantToRead] = useState([
    { id: '5', title: 'The Hunger Games', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300' },
    { id: '6', title: 'Verity', cover: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=300' },
    { id: '7', title: 'The Housemaid', cover: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=300' },
    { id: '8', title: 'My Fav Book', cover: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300' },
    { id: '9', title: 'A Court of Thorns', cover: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300' },
  ]);

  const [favoriteAuthors, setFavoriteAuthors] = useState<Author[]>([
    { id: '1', initials: 'JA', name: 'Jane Austen', color: 'bg-teal-300' },
    { id: '2', initials: 'SJM', name: 'Sarah J. Maas', color: 'bg-orange-400' },
    { id: '3', initials: 'BH', name: 'Bell Hooks', color: 'bg-slate-600' },
    { id: '4', initials: 'VR', name: 'Veronica Roth', color: 'bg-red-400' },
  ]);

  const [favoriteGenres, setFavoriteGenres] = useState<Genre[]>([
    { id: '1', name: 'Fantasy' },
    { id: '2', name: 'Historical fiction' },
    { id: '3', name: 'Romantic comedy' },
    { id: '4', name: 'Mystery' },
  ]);

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      setShowWarning(true);
    } else {
      setIsEditing(false);
    }
  };

  const handleDiscardAndExit = () => {
    setShowWarning(false);
    setIsEditing(false);
    setHasUnsavedChanges(false);
  };

  const handleKeepEditing = () => {
    setShowWarning(false);
  };

  const handleSave = () => {
    setIsEditing(false);
    setHasUnsavedChanges(false);
  };

  const removeAuthor = (id: string) => {
    setFavoriteAuthors(favoriteAuthors.filter(a => a.id !== id));
    setHasUnsavedChanges(true);
  };

  const removeGenre = (id: string) => {
    setFavoriteGenres(favoriteGenres.filter(g => g.id !== id));
    setHasUnsavedChanges(true);
  };

  const updateReadingGoal = (value: string) => {
    setReadingGoal(parseInt(value) || 0);
    setHasUnsavedChanges(true);
  };

  if (!isEditing) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="size-16 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="size-8 text-gray-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Maya F.</h2>
                <p className="text-sm text-gray-600">@readergirl13</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="flex flex-col items-center gap-1"
            >
              <div className="w-12 h-12 rounded-full border-2 border-blue-500 flex items-center justify-center">
                <Edit3 className="size-5 text-blue-500" />
              </div>
              <span className="text-xs text-gray-600">Edit</span>
            </button>
          </div>

          <div>
            <p className="font-bold mb-1">Reading Goal</p>
            <p className="text-2xl font-bold">180 <span className="text-base font-normal text-gray-600">pages / week</span></p>
          </div>
        </div>

        {/* My Shelf */}
        <div className="p-4">
          <h3 className="font-bold mb-3">My Shelf</h3>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {favoriteBooks.map((book) => (
              <div key={book.id} className="relative flex-shrink-0">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-24 h-36 object-cover rounded-lg shadow"
                />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                  <Check className="size-4 text-white" />
                </div>
                <div className="flex gap-0.5 mt-1 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400 text-xs">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Want to Read */}
        <div className="p-4 pt-0">
          <h3 className="font-bold mb-3">Want to read</h3>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {wantToRead.map((book) => (
              <div key={book.id} className="flex-shrink-0">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-24 h-36 object-cover rounded-lg shadow"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Liked Reviews */}
        {likedVideos.length > 0 && (
          <div className="p-4 pt-0">
            <h3 className="font-bold mb-3">Liked Reviews</h3>
            <div className="grid grid-cols-3 gap-3">
              {likedVideos.map((video) => (
                <Link 
                  key={video.id} 
                  to={`/book/${video.bookId}/reviews`}
                  className="relative group"
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full aspect-[9/16] object-cover rounded-lg shadow"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg group-hover:bg-black/40 transition-colors">
                    <Play className="size-10 text-white fill-white opacity-90" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Favorite Authors */}
        <div className="p-4 pt-0">
          <h3 className="font-bold mb-3">Favorite Authors</h3>
          <div className="flex gap-4 mb-3">
            {favoriteAuthors.map((author) => (
              <div key={author.id} className="flex flex-col items-center">
                <div className={`w-16 h-16 ${author.color} rounded-full flex items-center justify-center mb-1`}>
                  <span className="text-white font-bold text-lg">{author.initials}</span>
                </div>
                <p className="text-xs text-center max-w-[64px]">{author.name}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {favoriteGenres.map((genre) => (
              <span
                key={genre.id}
                className="px-4 py-2 border-2 border-blue-500 text-blue-600 rounded-full text-sm font-medium"
              >
                {genre.name}
              </span>
            ))}
            <button className="w-10 h-10 border-2 border-blue-500 text-blue-500 rounded-full flex items-center justify-center">
              <Plus className="size-5" />
            </button>
          </div>
        </div>

        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 relative">
      {/* Header */}
      <div className="bg-white p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleCancel}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-12 h-12 rounded-full bg-red-400 flex items-center justify-center">
              <X className="size-6 text-white" />
            </div>
            <span className="text-sm text-gray-400">Cancel</span>
          </button>

          <h1 className="text-2xl font-bold">Edit Profile</h1>

          <button
            onClick={handleSave}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center">
              <Check className="size-6 text-white" />
            </div>
            <span className="text-sm text-gray-400">Save</span>
          </button>
        </div>
      </div>

      <div className="p-4 overflow-y-auto max-h-[calc(100vh-180px)]">
        {/* Reading Goal */}
        <div className="mb-6">
          <h3 className="font-bold mb-3">Reading Goal</h3>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={readingGoal}
              onChange={(e) => updateReadingGoal(e.target.value)}
              className="w-20 text-center text-2xl font-bold border-2 border-gray-300 rounded px-2 py-1"
            />
            <span className="text-blue-500">pages / week</span>
          </div>
        </div>

        {/* Favorites */}
        <div className="mb-6">
          <h3 className="font-bold mb-3">Favorites</h3>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {favoriteBooks.slice(0, 1).map((book) => (
              <div key={book.id} className="relative flex-shrink-0">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-24 h-36 object-cover rounded-lg shadow"
                />
                <button className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <X className="size-4 text-white" />
                </button>
              </div>
            ))}
            <button className="w-24 h-36 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center flex-shrink-0">
              <Plus className="size-8 text-blue-500" />
            </button>
          </div>
        </div>

        {/* Favorite Authors */}
        <div className="mb-6">
          <div className="flex gap-3 mb-3 flex-wrap">
            {favoriteAuthors.map((author) => (
              <div key={author.id} className="flex flex-col items-center relative">
                <div className={`w-16 h-16 ${author.color} rounded-full flex items-center justify-center mb-1`}>
                  <span className="text-white font-bold text-lg">{author.initials}</span>
                </div>
                <button
                  onClick={() => removeAuthor(author.id)}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                >
                  <X className="size-4 text-white" />
                </button>
                <p className="text-xs text-center max-w-[64px]">{author.name}</p>
              </div>
            ))}
            <button className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
              <Plus className="size-6 text-blue-500" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {favoriteGenres.map((genre) => (
              <div
                key={genre.id}
                className="px-4 py-2 border-2 border-gray-400 text-gray-700 rounded-full text-sm font-medium flex items-center gap-2"
              >
                <span>{genre.name}</span>
                <button onClick={() => removeGenre(genre.id)}>
                  <X className="size-4 text-red-500" />
                </button>
              </div>
            ))}
            <button className="w-10 h-10 border-2 border-blue-500 text-blue-500 rounded-full flex items-center justify-center">
              <Plus className="size-5" />
            </button>
          </div>
        </div>

        {/* AI Settings */}
        <div className="mb-6">
          <h3 className="font-bold mb-3">AI Settings</h3>
          
          <div className="flex items-center justify-between mb-4">
            <span className="font-medium">Save Chat History</span>
            <button
              onClick={() => {
                setSaveChatHistory(!saveChatHistory);
                setHasUnsavedChanges(true);
              }}
              className={`w-16 h-8 rounded-full transition-colors relative ${
                saveChatHistory ? 'bg-teal-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  saveChatHistory ? 'translate-x-8' : ''
                }`}
              />
              <span className={`absolute text-xs font-bold ${saveChatHistory ? 'left-2 text-white' : 'right-2 text-gray-600'}`}>
                {saveChatHistory ? 'On' : 'Off'}
              </span>
            </button>
          </div>

          <div className="mb-2">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium">Collate Recommendations</span>
              <button
                onClick={() => {
                  setCollateRecommendations(!collateRecommendations);
                  setHasUnsavedChanges(true);
                }}
                className={`w-16 h-8 rounded-full transition-colors relative ${
                  collateRecommendations ? 'bg-teal-500' : 'bg-red-400'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    collateRecommendations ? 'translate-x-8' : ''
                  }`}
                />
                <span className={`absolute text-xs font-bold ${collateRecommendations ? 'left-2 text-white' : 'right-2 text-white'}`}>
                  {collateRecommendations ? 'On' : 'Off'}
                </span>
              </button>
            </div>
            <p className="text-xs text-gray-400">
              Automatically save generated book recommendations to your reading list
            </p>
          </div>
        </div>
      </div>

      {/* Warning Modal */}
      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="text-red-500">
                <svg className="size-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-red-500">Warning</h2>
            </div>
            <p className="mb-6 text-gray-700">
              You've made unsaved changes to your profile. Exit without saving?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDiscardAndExit}
                className="flex-1 bg-red-500 text-white py-3 rounded-lg font-semibold"
              >
                Discard and Exit
              </button>
              <button
                onClick={handleKeepEditing}
                className="flex-1 bg-teal-500 text-white py-3 rounded-lg font-semibold"
              >
                Keep Editing
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <BottomNav />
    </div>
  );
}