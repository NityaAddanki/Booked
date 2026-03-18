import { ChevronLeft, Star, Heart, Plus } from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router';
import { mockBooks, mockReviews } from '../data/mockData';

export function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = mockBooks.find(b => b.id === id);
  const reviews = mockReviews.filter(r => r.bookId === id);

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex items-center justify-between z-10">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft className="size-6" />
        </button>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs">
            Reading
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
            Better Reader
          </span>
        </div>
      </div>

      {/* Book Cover & Info */}
      <div className="p-6">
        <div className="flex gap-4 mb-6">
          <img 
            src={book.cover} 
            alt={book.title}
            className="w-32 aspect-[2/3] object-cover rounded-lg shadow-lg"
          />
          
          <div className="flex-1">
            <h1 className="text-2xl font-semibold mb-1">{book.title}</h1>
            <p className="text-gray-600 mb-3">by {book.author}</p>
            
            {/* Rating */}
            {book.rating && (
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`size-5 ${i < book.rating! ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-2">{book.rating}.0</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-500 rounded-lg text-sm">
                <Heart className="size-4" />
                <span>Save</span>
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm">
                <Plus className="size-4" />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar (if reading) */}
        {book.status === 'reading' && book.progress && (
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Reading Progress</span>
              <span className="font-semibold">{book.progress}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500 rounded-full" 
                style={{ width: `${book.progress}%` }} 
              />
            </div>
          </div>
        )}

        {/* Synopsis */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Synopsis</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            In a dystopian future, Katniss Everdeen volunteers to take her younger sister's 
            place in the Hunger Games, a televised competition in which two teenagers from 
            each of the twelve Districts of Panem are chosen at random to fight to the death. 
            A gripping tale of survival, sacrifice, and rebellion.
          </p>
        </div>

        {/* Reviews Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Reviews ({reviews.length})</h2>
            <Link to={`/book/${id}/review`} className="text-red-500 text-sm">
              Write Review
            </Link>
          </div>

          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map(review => (
                <div key={review.id} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`size-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{review.text}</p>
                  <p className="text-xs text-gray-500">
                    {review.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <p className="text-gray-500 text-sm">No reviews yet</p>
              <Link 
                to={`/book/${id}/review`}
                className="text-red-500 text-sm mt-2 inline-block"
              >
                Be the first to review
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
