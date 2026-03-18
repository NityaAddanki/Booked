import { Search, Play, Heart, User } from 'lucide-react';
import { Link } from 'react-router';
import { BottomNav } from '../components/BottomNav';

export function Discover() {
  const videoReviews = [
    { id: 1, title: 'Harry Potter', image: 'https://images.unsplash.com/photo-1762020378318-3b8edcd3e2fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFkaW5nJTIwYm9vayUyMGhpZ2hsaWdodGVkJTIwcGFnZXN8ZW58MXx8fHwxNzczNjQwNjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 2, title: 'Percy Jackson', image: 'https://images.unsplash.com/photo-1670022002180-8687f5b9e0d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhvbGRpbmclMjBib29rJTIwc2VsZmllfGVufDF8fHx8MTc3MzY0MDY0NXww&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 3, title: 'The Hunger Games', image: 'https://images.unsplash.com/photo-1741900459167-29744e5839cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHBlcnNvbiUyMGJvb2slMjByZWNvbW1lbmRhdGlvbiUyMHZpZGVvfGVufDF8fHx8MTc3MzY0MDY0Nnww&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 4, title: 'Guest List', image: 'https://images.unsplash.com/photo-1642057714794-22dc5f0f6323?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwcGFnZXMlMjBvcGVuJTIwdGV4dHxlbnwxfHx8fDE3NzM2NDA2NDh8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 5, title: 'Lord of the Rings', image: 'https://images.unsplash.com/photo-1602557097584-d952c430dfaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwbG92ZXIlMjBwb3J0cmFpdCUyMHJlYWRpbmd8ZW58MXx8fHwxNzczNjQwNjQ3fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  ];

  const likedReviews = [
    { id: 6, title: 'Verity', image: 'https://images.unsplash.com/photo-1758272422195-a70a1aef90d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwaW5mbHVlbmNlciUyMHNvY2lhbCUyMG1lZGlhfGVufDF8fHx8MTc3MzY0MDY0Nnww&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 7, title: 'The Housemaid', image: 'https://images.unsplash.com/photo-1755696923054-df9b046619df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rc2hlbGYlMjBhZXN0aGV0aWMlMjBjb3p5fGVufDF8fHx8MTc3MzU1NjI5Mnww&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 8, title: 'Scar Island', image: 'https://images.unsplash.com/photo-1513625591643-f9ca3171a11b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjByZWFkaW5nJTIwbm92ZWwlMjBjbG9zZXxlbnwxfHx8fDE3NzM2NDA2NDh8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 9, title: 'Silent Patient', image: 'https://images.unsplash.com/photo-1711185901036-f7fd98e50bb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGwlMjBhYm91dCUyMGxvdmUlMjBib29rJTIwY292ZXJ8ZW58MXx8fHwxNzczNjQwNDE2fDA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 10, title: 'Geronimo Stilton', image: 'https://images.unsplash.com/photo-1605141311642-215cc21e68eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwcmV2aWV3JTIwbm90ZXMlMjBoaWdobGlnaHRlZHxlbnwxfHx8fDE3NzM2NDA0MTh8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  ];

  const writtenReviews = [
    { id: 1, book: 'The Hunger Games', rating: 3, author: 'Aditi', text: 'A really gripping story with a cool dystop...' },
    { id: 2, book: 'Guest List', rating: 4, author: 'Ayesha', text: 'Lovely book. I Recommend it' },
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="p-4">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-6">Discover</h1>

        {/* Search */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-100 rounded-full py-3 px-4 pr-12"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-gray-600" />
        </div>

        {/* Book Reviews For You */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3">Book Reviews For You</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
            {videoReviews.map(review => (
              <Link key={review.id} to={`/book/${review.id}/reviews`} className="flex-shrink-0 w-28">
                <div className="relative">
                  <img
                    src={review.image}
                    alt={review.title}
                    className="w-28 h-40 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="size-8 text-white fill-white opacity-80" />
                  </div>
                  <Heart className="absolute top-2 right-2 size-5 text-white" />
                </div>
                <p className="text-xs text-center mt-1 line-clamp-2">{review.title}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Liked */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3">Liked</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
            {likedReviews.map(review => (
              <Link key={review.id} to={`/book/${review.id}/reviews`} className="flex-shrink-0 w-28">
                <div className="relative">
                  <img
                    src={review.image}
                    alt={review.title}
                    className="w-28 h-40 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="size-8 text-white fill-white opacity-80" />
                  </div>
                  <Heart className="absolute top-2 right-2 size-5 text-red-500 fill-red-500" />
                </div>
                <p className="text-xs text-center mt-1 line-clamp-2">{review.title}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Written Reviews For You */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3">Written Reviews For You</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
            {writtenReviews.map(review => (
              <div key={review.id} className="flex-shrink-0 w-80 border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold">{review.book}</h3>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                    <User className="size-4 text-gray-600" />
                  </div>
                  <span className="text-sm text-gray-600">{review.author}</span>
                </div>
                <p className="text-sm text-gray-700">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* See Chat History */}
        <Link to="/chat-history" className="block text-center text-gray-500 underline mb-4">
          See chat history
        </Link>

        {/* AI Chat Button */}
        <Link 
          to="/ai-chat"
          className="flex items-center gap-3 bg-teal-600 text-white p-4 rounded-lg shadow-lg"
        >
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="size-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <span className="font-medium">Need a book recommendation? Start chat</span>
        </Link>
      </div>

      <BottomNav />
    </div>
  );
}