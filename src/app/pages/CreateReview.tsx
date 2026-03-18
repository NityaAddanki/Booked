import { useState } from 'react';
import { ChevronLeft, Star, Check, Video } from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router';
import { mockBooks } from '../data/mockData';

export function CreateReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = mockBooks.find(b => b.id === id);
  
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewType, setReviewType] = useState<'written' | 'video'>('written');

  if (!book) {
    return <div>Book not found</div>;
  }

  const handleSubmit = () => {
    // In a real app, this would save the review
    navigate(`/book/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex items-center justify-between z-10">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft className="size-6" />
        </button>
        <h1 className="font-semibold">
          {reviewType === 'written' ? 'Create Written Review' : 'Create Video Review'}
        </h1>
        <button onClick={handleSubmit} className="text-red-500">
          <Check className="size-6" />
        </button>
      </div>

      {/* Review Type Selector */}
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="flex gap-2">
          <button 
            onClick={() => setReviewType('written')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium ${
              reviewType === 'written' 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Written
          </button>
          <button 
            onClick={() => setReviewType('video')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium ${
              reviewType === 'video' 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Video
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* Book Info */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <div className="flex gap-3">
            <img 
              src={book.cover} 
              alt={book.title}
              className="w-16 aspect-[2/3] object-cover rounded"
            />
            <div>
              <h3 className="font-semibold">{book.title}</h3>
              <p className="text-sm text-gray-600">{book.author}</p>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <h3 className="font-semibold mb-3">Your Rating</h3>
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setRating(i + 1)}
                className="focus:outline-none"
              >
                <Star 
                  className={`size-10 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
              </button>
            ))}
          </div>
        </div>

        {reviewType === 'written' ? (
          <>
            {/* Written Review */}
            <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
              <h3 className="font-semibold mb-3">Write your review</h3>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your thoughts about this book..."
                className="w-full h-40 p-3 border border-gray-200 rounded-lg resize-none outline-none focus:border-red-500"
              />
              <p className="text-xs text-gray-500 mt-2">
                {reviewText.length} characters
              </p>
            </div>

            {/* Formatting Tools */}
            <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
              <div className="flex gap-2 flex-wrap">
                <button className="px-3 py-1 border border-gray-300 rounded text-sm">
                  <strong>B</strong>
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm">
                  <em>I</em>
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm">
                  <u>U</u>
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Video Review */}
            <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
              <h3 className="font-semibold mb-3">Record Video Review</h3>
              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center text-white">
                  <Video className="size-16 mx-auto mb-2 opacity-50" />
                  <p className="text-sm opacity-75">Camera view will appear here</p>
                </div>
              </div>
              
              <button className="w-full bg-red-500 text-white py-3 rounded-lg font-medium mb-2">
                Start Recording
              </button>
              
              <Link 
                to={`/book/${id}/video-review`}
                className="block text-center text-sm text-gray-600"
              >
                View Recording Tips
              </Link>
            </div>
          </>
        )}

        {/* Submit Button */}
        <button 
          onClick={handleSubmit}
          disabled={rating === 0 || (reviewType === 'written' && !reviewText)}
          className="w-full bg-red-500 text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Publish Review
        </button>
      </div>
    </div>
  );
}
