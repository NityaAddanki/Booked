import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { ArrowLeft, Undo, Redo, Bold, Underline, Italic, Image, List, ListOrdered } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { useApp } from '../context/AppContext';

export function CreateWrittenReview() {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [searchParams] = useSearchParams();
  const { addWrittenReview } = useApp();
  const [bookTitle, setBookTitle] = useState('The Wizard of Oz');
  const [rating, setRating] = useState(3);
  const [reviewText, setReviewText] = useState('');

  const handlePost = () => {
    if (reviewText.trim()) {
      addWrittenReview({
        bookId: bookId || '1',
        author: 'You',
        rating,
        text: reviewText,
        liked: false,
      });
      
      // Always navigate to written reviews page
      navigate(`/book/${bookId}/written-reviews`);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="p-4 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0"
        >
          <ArrowLeft className="size-6" />
        </button>
        <h1 className="text-xl font-bold">Create Written Review</h1>
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

        {/* Text Editor Toolbar */}
        <div className="border-2 border-gray-300 rounded-2xl overflow-hidden">
          <div className="bg-gray-100 border-b-2 border-gray-300 p-2 flex items-center gap-1">
            <button className="p-2 hover:bg-gray-200 rounded">
              <Undo className="size-5" />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded">
              <Redo className="size-5" />
            </button>
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            <button className="p-2 hover:bg-gray-200 rounded">
              <Bold className="size-5" />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded">
              <Underline className="size-5" />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded">
              <Italic className="size-5" />
            </button>
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            <button className="p-2 hover:bg-gray-200 rounded">
              <Image className="size-5" />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded">
              <List className="size-5" />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded">
              <ListOrdered className="size-5" />
            </button>
          </div>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here..."
            className="w-full h-96 p-4 resize-none border-none focus:outline-none"
          />
        </div>
      </div>

      <BottomNav />
    </div>
  );
}