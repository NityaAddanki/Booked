import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export function CreateVideoReview() {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [searchParams] = useSearchParams();
  const [bookTitle, setBookTitle] = useState('The Wizard of Oz');
  const [rating, setRating] = useState(3);
  const [isRecording, setIsRecording] = useState(false);

  const handlePost = () => {
    // Navigate based on returnTo parameter or default to reviews page
    const returnTo = searchParams.get('returnTo');
    if (returnTo === 'home') {
      navigate('/');
    } else {
      navigate(`/book/${bookId}/reviews`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="p-4 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0"
        >
          <ArrowLeft className="size-6" />
        </button>
        <h1 className="text-xl font-bold">Create Video Review</h1>
      </div>

      {/* Form */}
      <div className="p-4">
        <div className="mb-4">
          <label className="block mb-2 font-bold">Book Title:</label>
          <input
            type="text"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            className="w-full bg-teal-100 rounded-lg px-4 py-3 border-none"
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <label className="font-bold">Rating:</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="text-3xl"
              >
                <span className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
              </button>
            ))}
          </div>
          <button 
            onClick={handlePost}
            className="bg-orange-400 text-black font-bold px-8 py-2 rounded-lg"
          >
            Post
          </button>
        </div>

        {/* Video Recording Area */}
        <div className="relative bg-gray-900 rounded-3xl overflow-hidden h-[600px]">
          {/* Mock camera feed */}
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop"
            alt="Camera preview"
            className="w-full h-full object-cover"
          />

          {/* Recording Indicator */}
          {isRecording && (
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              REC
            </div>
          )}

          {/* Record Button */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center">
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`w-20 h-20 rounded-full flex items-center justify-center ${
                isRecording ? 'bg-white' : 'bg-white'
              }`}
            >
              <div
                className={`${
                  isRecording ? 'w-8 h-8 bg-red-600 rounded-sm' : 'w-16 h-16 bg-red-600 rounded-full'
                }`}
              ></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}