import { Clock, Plus, Flame, Edit, Play, X } from 'lucide-react';
import { Link } from 'react-router';
import { BottomNav } from '../components/BottomNav';
import { useState } from 'react';

export function Home() {
  const [showWeeklyGoalModal, setShowWeeklyGoalModal] = useState(false);
  const [weeklyGoalPages, setWeeklyGoalPages] = useState(180);
  const [tempGoalPages, setTempGoalPages] = useState(180);
  const pagesRead = 135;
  const percentageMet = Math.round((pagesRead / weeklyGoalPages) * 100);

  const handleSaveGoal = () => {
    setWeeklyGoalPages(tempGoalPages);
    setShowWeeklyGoalModal(false);
  };

  const handleCancelGoal = () => {
    setTempGoalPages(weeklyGoalPages);
    setShowWeeklyGoalModal(false);
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-1 mb-2">
              <span className="text-2xl font-bold text-gray-800">B</span>
              <span className="text-2xl">📖</span>
              <span className="text-2xl font-bold text-gray-800">KED</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Home</h1>
          </div>
          <div className="flex gap-3">
            <Link 
              to="/track-reading"
              className="flex flex-col items-center gap-1"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="size-6 text-blue-500" />
              </div>
              <span className="text-xs text-gray-600">Reading<br/>Timer</span>
            </Link>
            <Link 
              to="/track"
              className="flex flex-col items-center gap-1"
            >
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <Plus className="size-6 text-teal-500" />
              </div>
              <span className="text-xs text-gray-600">Track<br/>Reading</span>
            </Link>
          </div>
        </div>

        <p className="text-gray-700 mb-4">Welcome, Maya!</p>

        {/* Streak */}
        <div className="flex items-center gap-2 mb-4">
          <Flame className="size-8 text-orange-500 fill-orange-500" />
          <span className="font-semibold">5 Day Reading Streak</span>
        </div>

        {/* Today's Goal */}
        <div className="bg-gray-200 p-4 rounded mb-4">
          <p className="font-bold text-center">Today's Goal: Read from 8:00 pm - 8:30 pm</p>
        </div>

        {/* Weekly Progress */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 h-10 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-teal-300 to-teal-200 rounded-full" style={{ width: `${percentageMet}%` }}></div>
            </div>
            <Edit className="size-5 text-gray-600 cursor-pointer" onClick={() => setShowWeeklyGoalModal(true)} />
          </div>
          <p className="font-semibold text-center">Weekly Goal: {percentageMet}% met ({pagesRead} pages read)</p>
        </div>

        {/* Currently Reading */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">Currently Reading</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1711185901036-f7fd98e50bb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGwlMjBhYm91dCUyMGxvdmUlMjBib29rJTIwY292ZXJ8ZW58MXx8fHwxNzczNjQwNDE2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Book 1"
                className="w-full aspect-[2/3] object-cover rounded-lg shadow-md mb-2"
              />
              <p className="text-center text-sm font-semibold">75% Read</p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1711185892675-f502fb426f5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcmdlbnQlMjBib29rJTIwY292ZXJ8ZW58MXx8fHwxNzczNjQwNDE3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Book 2"
                className="w-full aspect-[2/3] object-cover rounded-lg shadow-md mb-2"
              />
              <p className="text-center text-sm font-semibold">43% Read</p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1544995057-1eae150bf1ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWNvbWluZyUyMG1pY2hlbGxlJTIwb2JhbWElMjBib29rfGVufDF8fHx8MTc3MzU2NjM1Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Book 3"
                className="w-full aspect-[2/3] object-cover rounded-lg shadow-md mb-2"
              />
              <p className="text-center text-sm font-semibold">22% Read</p>
            </div>
          </div>
        </div>

        {/* Up Next: Book Reviews */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 text-center">Up Next: Book Reviews</h2>
          <div className="grid grid-cols-3 gap-4">
            <Link to="/book/1/reviews" className="relative group">
              <img 
                src="https://images.unsplash.com/photo-1605141311642-215cc21e68eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwcmV2aWV3JTIwbm90ZXMlMjBoaWdobGlnaHRlZHxlbnwxfHx8fDE3NzM2NDA0MTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Review 1"
                className="w-full aspect-[2/3] object-cover rounded-lg shadow-md"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg group-hover:bg-black/30 transition-colors">
                <Play className="size-12 text-white fill-white opacity-90" />
              </div>
            </Link>
            <Link to="/book/2/reviews" className="relative group">
              <img 
                src="https://images.unsplash.com/photo-1670022002180-8687f5b9e0d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHJlYWRpbmclMjBib29rcyUyMHNlbGZpZXxlbnwxfHx8fDE3NzM2NDA0MTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Review 2"
                className="w-full aspect-[2/3] object-cover rounded-lg shadow-md"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg group-hover:bg-black/30 transition-colors">
                <Play className="size-12 text-white fill-white opacity-90" />
              </div>
            </Link>
            <Link to="/book/3/reviews" className="relative group">
              <img 
                src="https://images.unsplash.com/photo-1660479123634-2c700dfbbbdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwc3RhY2slMjByZWFkaW5nJTIwcGlsZXxlbnwxfHx8fDE3NzM2NDA0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Review 3"
                className="w-full aspect-[2/3] object-cover rounded-lg shadow-md"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg group-hover:bg-black/30 transition-colors">
                <Play className="size-12 text-white fill-white opacity-90" />
              </div>
            </Link>
          </div>
        </div>

        {/* Review Buttons */}
        <div className="flex gap-3">
          <Link 
            to="/book/1/create-written-review?returnTo=home"
            className="flex-1 border-2 border-gray-800 rounded-full py-3 text-center font-semibold"
          >
            Create a written review
          </Link>
          <Link 
            to="/book/1/create-video-review?returnTo=home"
            className="flex-1 border-2 border-gray-800 rounded-full py-3 text-center font-semibold"
          >
            Create a video review
          </Link>
        </div>
      </div>

      <BottomNav />

      {/* Weekly Goal Modal */}
      {showWeeklyGoalModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Set Weekly Reading Goal</h2>
              <X className="size-5 text-gray-600 cursor-pointer" onClick={() => setShowWeeklyGoalModal(false)} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Pages to Read:</label>
              <input
                type="number"
                value={tempGoalPages}
                onChange={(e) => setTempGoalPages(Number(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                onClick={handleCancelGoal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
                onClick={handleSaveGoal}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}