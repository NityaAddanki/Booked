import { useState } from 'react';
import { ChevronLeft, Check, AlertTriangle, X, Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Switch } from '../components/ui/switch';

export function EditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    displayName: 'Maya F.',
    username: 'mayareads',
    readingGoal: '50',
    year: '2026'
  });

  const [settings, setSettings] = useState({
    dailyReminder: true,
    weeklyReport: true,
    publicRecommendations: false
  });

  const [showWarning, setShowWarning] = useState(true);
  
  // Favorite authors
  const [favoriteAuthors, setFavoriteAuthors] = useState([
    'Colleen Hoover',
    'Taylor Jenkins Reid',
  ]);
  const [newAuthor, setNewAuthor] = useState('');
  const [showAuthorInput, setShowAuthorInput] = useState(false);
  
  // Genres
  const [selectedGenres, setSelectedGenres] = useState([
    'Romance',
    'Fantasy',
    'Mystery',
  ]);
  const availableGenres = [
    'Romance', 'Fantasy', 'Mystery', 'Thriller', 'Science Fiction',
    'Historical Fiction', 'Contemporary', 'Young Adult', 'Non-Fiction',
    'Biography', 'Self-Help', 'Horror', 'Classics', 'Poetry'
  ];
  const [showGenrePicker, setShowGenrePicker] = useState(false);
  
  // Favorite books
  const [favoriteBooks, setFavoriteBooks] = useState([
    { id: '1', title: 'All About Love', cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300' },
    { id: '2', title: 'Divergent', cover: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300' },
    { id: '3', title: 'Becoming', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300' },
  ]);
  const [showBookSearch, setShowBookSearch] = useState(false);
  const [bookSearchQuery, setBookSearchQuery] = useState('');
  
  // Available books to add
  const availableBooks = [
    { id: '4', title: 'The Seven Husbands of Evelyn Hugo', cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300' },
    { id: '5', title: 'The Hunger Games', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300' },
    { id: '6', title: 'Verity', cover: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=300' },
    { id: '7', title: 'The Housemaid', cover: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=300' },
    { id: '8', title: 'A Court of Thorns and Roses', cover: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300' },
  ];

  const handleAddAuthor = () => {
    if (newAuthor.trim() && !favoriteAuthors.includes(newAuthor.trim())) {
      setFavoriteAuthors([...favoriteAuthors, newAuthor.trim()]);
      setNewAuthor('');
      setShowAuthorInput(false);
    }
  };

  const handleRemoveAuthor = (author: string) => {
    setFavoriteAuthors(favoriteAuthors.filter(a => a !== author));
  };

  const handleToggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleAddBook = (book: typeof availableBooks[0]) => {
    if (!favoriteBooks.find(b => b.id === book.id)) {
      setFavoriteBooks([...favoriteBooks, book]);
      setShowBookSearch(false);
      setBookSearchQuery('');
    }
  };

  const handleRemoveBook = (bookId: string) => {
    setFavoriteBooks(favoriteBooks.filter(b => b.id !== bookId));
  };

  const filteredBooks = availableBooks.filter(book => 
    !favoriteBooks.find(fb => fb.id === book.id) &&
    book.title.toLowerCase().includes(bookSearchQuery.toLowerCase())
  );

  const handleSave = () => {
    // In a real app, this would save the profile
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex items-center justify-between z-10">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft className="size-6" />
        </button>
        <h1 className="font-semibold">Edit Profile</h1>
        <button onClick={handleSave} className="text-red-500">
          <Check className="size-6" />
        </button>
      </div>

      <div className="p-4">
        {/* Warning Banner */}
        {showWarning && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex gap-3">
            <AlertTriangle className="size-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-red-800 font-medium mb-1">Warning</p>
              <p className="text-xs text-red-700">
                If you mark your goal as public, everyone will be able to see your reading progress and statistics.
              </p>
            </div>
            <button 
              onClick={() => setShowWarning(false)}
              className="text-red-500 text-xs"
            >
              ✕
            </button>
          </div>
        )}

        {/* Basic Info */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <h3 className="font-semibold mb-4">Basic Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Display Name</label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-red-500"
              />
            </div>
            
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-red-500"
              />
            </div>
          </div>
        </div>

        {/* Reading Goal */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <h3 className="font-semibold mb-4">Reading Goal</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Books</label>
              <input
                type="number"
                value={formData.readingGoal}
                onChange={(e) => setFormData({ ...formData, readingGoal: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-red-500"
              />
            </div>
            
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Year</label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-red-500"
              />
            </div>
          </div>
        </div>

        {/* AI Settings */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <h3 className="font-semibold mb-4">AI Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Daily Reading Reminder</p>
                <p className="text-xs text-gray-600">Get notified to read daily</p>
              </div>
              <Switch
                checked={settings.dailyReminder}
                onCheckedChange={(checked) => 
                  setSettings({ ...settings, dailyReminder: checked })
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Weekly Report</p>
                <p className="text-xs text-gray-600">Receive weekly reading stats</p>
              </div>
              <Switch
                checked={settings.weeklyReport}
                onCheckedChange={(checked) => 
                  setSettings({ ...settings, weeklyReport: checked })
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Public Recommendations</p>
                <p className="text-xs text-gray-600">Share your reading list publicly</p>
              </div>
              <Switch
                checked={settings.publicRecommendations}
                onCheckedChange={(checked) => 
                  setSettings({ ...settings, publicRecommendations: checked })
                }
              />
            </div>
          </div>
        </div>

        {/* Favorite Authors */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <h3 className="font-semibold mb-4">Favorite Authors</h3>
          
          <div className="space-y-4">
            {showAuthorInput && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="text-sm text-gray-600 mb-2 block">Add New Author</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddAuthor();
                      }
                    }}
                    placeholder="Enter author name"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-red-500"
                    autoFocus
                  />
                  <button
                    onClick={handleAddAuthor}
                    className="bg-emerald-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-emerald-600"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setShowAuthorInput(false);
                      setNewAuthor('');
                    }}
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              {favoriteAuthors.map(author => (
                <div key={author} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full">
                  <span className="text-sm">{author}</span>
                  <button
                    onClick={() => handleRemoveAuthor(author)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ))}
              
              {!showAuthorInput && (
                <button
                  onClick={() => setShowAuthorInput(true)}
                  className="flex items-center gap-1 bg-teal-100 text-teal-700 px-3 py-2 rounded-full hover:bg-teal-200"
                >
                  <Plus className="size-4" />
                  <span className="text-sm font-medium">Add Author</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Genres */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <h3 className="font-semibold mb-4">Genres</h3>
          
          <div className="space-y-4">
            {showGenrePicker && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm text-gray-600">Select Genres</label>
                  <button
                    onClick={() => setShowGenrePicker(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="size-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableGenres.map(genre => (
                    <button
                      key={genre}
                      onClick={() => handleToggleGenre(genre)}
                      className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedGenres.includes(genre)
                          ? 'bg-teal-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              {selectedGenres.map(genre => (
                <div key={genre} className="flex items-center gap-2 bg-teal-100 text-teal-800 px-3 py-2 rounded-full">
                  <span className="text-sm font-medium">{genre}</span>
                  <button
                    onClick={() => handleToggleGenre(genre)}
                    className="text-teal-600 hover:text-red-500"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ))}
              
              {!showGenrePicker && (
                <button
                  onClick={() => setShowGenrePicker(true)}
                  className="flex items-center gap-1 bg-gray-200 text-gray-700 px-3 py-2 rounded-full hover:bg-gray-300"
                >
                  <Plus className="size-4" />
                  <span className="text-sm font-medium">Add Genre</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Favorite Books */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <h3 className="font-semibold mb-4">Favorite Books</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium">Books</p>
                <p className="text-xs text-gray-600">Add books you love</p>
              </div>
              <button
                onClick={() => setShowBookSearch(true)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Add Book
              </button>
            </div>
            
            {showBookSearch && (
              <div className="space-y-2">
                <input
                  type="text"
                  value={bookSearchQuery}
                  onChange={(e) => setBookSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-red-500"
                />
                <div className="space-y-2">
                  {filteredBooks.map(book => (
                    <div key={book.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-10 h-10 object-cover rounded-lg mr-2"
                        />
                        <p className="text-sm text-gray-600">{book.title}</p>
                      </div>
                      <button
                        onClick={() => handleAddBook(book)}
                        className="text-sm bg-emerald-500 text-white py-2 px-4 rounded-lg font-medium"
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              {favoriteBooks.map(book => (
                <div key={book.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-10 h-10 object-cover rounded-lg mr-2"
                    />
                    <p className="text-sm text-gray-600">{book.title}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveBook(book.id)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button 
            onClick={handleSave}
            className="w-full bg-emerald-500 text-white py-3 rounded-lg font-medium"
          >
            Save Profile
          </button>
          <button 
            onClick={() => navigate(-1)}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}