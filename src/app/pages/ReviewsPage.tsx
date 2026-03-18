import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Heart, MessageCircle, Play, Plus, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function ReviewsPage() {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const { 
    toggleLikeVideo, 
    isVideoLiked, 
    getCommentsForVideo, 
    addComment,
    getReviewsForBook 
  } = useApp();
  
  const [activeTab, setActiveTab] = useState<'video' | 'written'>('video');
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  // Mock data - in a real app this would come from props or API
  const bookTitle = "The Hunger Games";
  const bookAuthor = "By Suzanne Collins";

  // Current video data
  const currentVideo = {
    id: 'video-1',
    bookId: bookId || '1',
    bookTitle,
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    author: 'Maya',
    title: 'I Read The Hunger Games For The First Time',
    description: 'I just read The Hunger Games for the first time in my life at 23 years old',
    timestamp: new Date(),
  };

  const videoComments = getCommentsForVideo('video-1');
  const writtenReviews = getReviewsForBook(bookId || '1');

  const handleLike = () => {
    toggleLikeVideo(currentVideo);
    setIsLiked(!isLiked);
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      addComment('video-1', 'You', commentText);
      setCommentText('');
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Header - Always Visible */}
      <div className="sticky top-0 z-40 bg-white p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"
          >
            <ArrowLeft className="size-6 text-black" />
          </button>

          {/* Tab Toggle */}
          <div className="flex bg-gray-200 rounded-full p-1">
            <button
              onClick={() => setActiveTab('video')}
              className={`px-4 py-2 rounded-full font-bold text-sm ${
                activeTab === 'video' ? 'bg-orange-400 text-black' : 'text-black'
              }`}
            >
              Video Reviews
            </button>
            <button
              onClick={() => setActiveTab('written')}
              className={`px-4 py-2 rounded-full font-bold text-sm ${
                activeTab === 'written' ? 'bg-orange-400 text-black' : 'text-black'
              }`}
            >
              Written Reviews
            </button>
          </div>

          <div className="w-12"></div>
        </div>

        {/* Book Info */}
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-1">{bookTitle}</h1>
          <p className="text-gray-600 text-sm">{bookAuthor}</p>
        </div>
      </div>

      {/* Video Reviews Tab - Full Screen */}
      {activeTab === 'video' && (
        <div className="relative h-screen bg-black">
          {/* Video Content */}
          <img
            src={currentVideo.thumbnail}
            alt="Video review"
            className="w-full h-full object-cover"
          />

          {/* Video overlay text */}
          <div className="absolute top-8 left-0 right-0 text-center px-4">
            <p className="text-white text-xl font-bold drop-shadow-lg">
              {currentVideo.title}
            </p>
            <div className="inline-block bg-white/90 px-4 py-1 rounded-full mt-2">
              <p className="text-gray-800 font-bold">It Was GREAT</p>
            </div>
          </div>

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Play className="size-20 text-white fill-white opacity-80" />
          </div>

          {/* Bottom overlay text */}
          <div className="absolute bottom-32 left-4 right-20">
            <p className="text-white text-base font-bold drop-shadow-lg">
              {currentVideo.description}
            </p>
          </div>

          {/* Action buttons */}
          <div className="absolute bottom-24 right-4 flex flex-col gap-4">
            <button onClick={handleLike} className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                <Heart className={`size-6 ${isLiked ? 'text-red-500 fill-red-500' : 'text-white'}`} />
              </div>
            </button>
            <button onClick={() => setShowComments(true)} className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                <MessageCircle className="size-6 text-white" />
              </div>
              <span className="text-white font-bold text-sm mt-1">{videoComments.length}</span>
            </button>
          </div>

          {/* Floating Create Review Button */}
          <button
            onClick={() => navigate(`/book/${bookId}/create-video-review`)}
            className="absolute bottom-6 right-6 w-16 h-16 bg-orange-400 rounded-full shadow-lg flex flex-col items-center justify-center z-10"
          >
            <Plus className="size-6 text-black" />
            <span className="text-[9px] font-bold text-black leading-tight">Create</span>
            <span className="text-[9px] font-bold text-black leading-tight">Review</span>
          </button>

          {/* Comments Overlay */}
          {showComments && (
            <div 
              onClick={() => setShowComments(false)}
              className="absolute inset-0 bg-black/50 z-50 flex items-end"
            >
              <div 
                onClick={(e) => e.stopPropagation()}
                className="bg-gray-100 rounded-t-3xl w-full max-h-[80vh] overflow-y-auto pb-6"
              >
                <div className="sticky top-0 bg-gray-100 p-4 border-b border-gray-200">
                  <h2 className="text-lg font-bold text-center">{videoComments.length} comments</h2>
                </div>

                <div className="p-4 space-y-4">
                  {videoComments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">{comment.username[0].toUpperCase()}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm mb-1">{comment.username}</p>
                        <p className="text-gray-800 text-sm mb-2">{comment.text}</p>
                        <button className="text-gray-600 text-sm font-bold">Reply</button>
                      </div>
                      {comment.likes > 0 && (
                        <div className="flex flex-col items-center">
                          <Heart className="size-5 text-black" />
                          <span className="text-xs font-bold">{comment.likes}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add Comment Input */}
                <div className="sticky bottom-0 bg-gray-100 p-4 flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">U</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 bg-gray-200 rounded-full px-4 py-2 text-sm"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <button
                    onClick={handleAddComment}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Written Reviews Tab */}
      {activeTab === 'written' && (
        <div className="p-4 pb-24 relative">
          <div className="space-y-4">
            {writtenReviews.map((review) => (
              <div key={review.id} className="border border-gray-300 rounded-2xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-600 font-bold">{review.author[0]}</span>
                    </div>
                    <div>
                      <p className="font-bold">{review.author}</p>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-lg ${
                              i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button>
                    <Heart
                      className={`size-6 ${
                        review.liked ? 'text-red-500 fill-red-500' : 'text-gray-400'
                      }`}
                    />
                  </button>
                </div>

                <p className="text-gray-700 mb-3">{review.text}</p>

                <button className="flex items-center gap-2 text-gray-600 bg-gray-200 px-4 py-2 rounded-full ml-auto">
                  <MessageCircle className="size-4" />
                  <span className="font-bold">Reply</span>
                </button>
              </div>
            ))}
          </div>

          {/* Floating Create Review Button */}
          <button
            onClick={() => navigate(`/book/${bookId}/create-written-review`)}
            className="absolute bottom-6 right-6 w-16 h-16 bg-orange-400 rounded-full shadow-lg flex flex-col items-center justify-center z-10"
          >
            <Plus className="size-6 text-black" />
            <span className="text-[9px] font-bold text-black leading-tight">Create</span>
            <span className="text-[9px] font-bold text-black leading-tight">Review</span>
          </button>
        </div>
      )}
    </div>
  );
}