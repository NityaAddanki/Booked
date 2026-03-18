import { useState, useRef } from 'react';
import { ChevronLeft, Video, Circle, Square, Check, AlertTriangle } from 'lucide-react';
import { useParams, useNavigate } from 'react-router';
import { mockBooks } from '../data/mockData';

export function VideoReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = mockBooks.find(b => b.id === id);
  
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showWarning, setShowWarning] = useState(true);

  if (!book) {
    return <div>Book not found</div>;
  }

  const handleStartRecording = () => {
    setIsRecording(true);
    // In a real app, this would start the camera/recording
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // In a real app, this would stop and save the recording
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex items-center justify-between z-10">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft className="size-6" />
        </button>
        <h1 className="font-semibold">Create Video Review</h1>
        <div className="size-6" />
      </div>

      <div className="p-4">
        {/* Warning Banner */}
        {showWarning && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex gap-3">
            <AlertTriangle className="size-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-red-800 font-medium mb-1">Warning</p>
              <p className="text-xs text-red-700">
                If you mark your goal as public, everyone will be able to see your reading progress and video reviews.
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

        {/* Book Info */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <div className="flex gap-3 items-center mb-3">
            <img 
              src={book.cover} 
              alt={book.title}
              className="w-12 aspect-[2/3] object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-sm">{book.title}</h3>
              <p className="text-xs text-gray-600">{book.author}</p>
            </div>
            <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs">
              The Straight Shot
            </span>
          </div>
          
          <button className="w-full bg-red-100 text-red-600 py-2 rounded-lg text-sm font-medium">
            Post
          </button>
        </div>

        {/* Video Preview */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm mb-4">
          <div className="aspect-[9/16] max-h-[500px] bg-gray-900 flex items-center justify-center relative">
            {isRecording ? (
              <div className="text-white text-center">
                <div className="size-3 bg-red-500 rounded-full animate-pulse mb-2 mx-auto" />
                <p className="text-sm">Recording...</p>
                <p className="text-2xl font-mono mt-2">{formatTime(recordingTime)}</p>
              </div>
            ) : (
              <div className="text-white text-center">
                <Video className="size-20 mx-auto mb-4 opacity-50" />
                <p className="text-sm opacity-75">Camera preview</p>
              </div>
            )}
            
            {/* Recording indicator */}
            {isRecording && (
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs">
                <Circle className="size-3 fill-white" />
                REC {formatTime(recordingTime)}
              </div>
            )}
          </div>
        </div>

        {/* Recording Controls */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
          <div className="flex justify-center gap-8 items-center">
            {!isRecording ? (
              <button
                onClick={handleStartRecording}
                className="size-20 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
              >
                <Circle className="size-10 text-white" />
              </button>
            ) : (
              <button
                onClick={handleStopRecording}
                className="size-20 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
              >
                <Square className="size-8 text-white fill-white" />
              </button>
            )}
          </div>
          
          <p className="text-center text-sm text-gray-600 mt-4">
            {isRecording ? 'Tap to stop recording' : 'Tap to start recording'}
          </p>
        </div>

        {/* Recording Tips */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold mb-3">Recording Tips</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <Check className="size-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Make sure you're in a well-lit area</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="size-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Speak clearly and at a moderate pace</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="size-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Keep your review between 1-3 minutes</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="size-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Avoid spoilers in your review</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 space-y-2">
          <button 
            disabled={isRecording}
            className="w-full bg-emerald-500 text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save & Publish
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
