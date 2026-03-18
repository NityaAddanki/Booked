import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Video, FileText } from 'lucide-react';

export function CreateReviewChoice() {
  const navigate = useNavigate();
  const { bookId } = useParams();

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate(-1)}
          className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"
        >
          <ArrowLeft className="size-6" />
        </button>
        <h1 className="text-2xl font-bold">Create Review</h1>
        <div className="w-12"></div>
      </div>

      <div className="space-y-4 mt-12">
        <button
          onClick={() => navigate(`/book/${bookId}/create-video-review`)}
          className="w-full bg-orange-400 text-black font-bold py-6 rounded-2xl flex items-center justify-center gap-3 shadow-lg"
        >
          <Video className="size-8" />
          <span className="text-xl">Create Video Review</span>
        </button>

        <button
          onClick={() => navigate(`/book/${bookId}/create-written-review`)}
          className="w-full bg-teal-500 text-white font-bold py-6 rounded-2xl flex items-center justify-center gap-3 shadow-lg"
        >
          <FileText className="size-8" />
          <span className="text-xl">Create Written Review</span>
        </button>
      </div>
    </div>
  );
}
