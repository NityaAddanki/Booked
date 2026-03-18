import { useState, useEffect } from 'react';
import { ChevronLeft, Play, Pause, RotateCcw, Plus, Minus, Calendar, Book, Maximize2, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { BottomNav } from '../components/BottomNav';

export function Track() {
  const navigate = useNavigate();
  const { day } = useParams<{ day: string }>();
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    let interval: number | undefined;
    
    if (isRunning) {
      interval = window.setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleReset = () => {
    setTimerSeconds(0);
    setIsRunning(false);
  };

  const handleTrackTimerTime = () => {
    if (timerSeconds > 0) {
      // Save tracked time and navigate back
      navigate('/track');
    }
  };

  const handleAdd = () => {
    // Save the manual time entry and navigate back
    navigate('/track');
  };

  const incrementTime = (unit: 'hours' | 'minutes' | 'seconds') => {
    if (unit === 'hours') setHours((h) => Math.min(23, h + 1));
    if (unit === 'minutes') setMinutes((m) => (m + 1) % 60);
    if (unit === 'seconds') setSeconds((s) => (s + 1) % 60);
  };

  const decrementTime = (unit: 'hours' | 'minutes' | 'seconds') => {
    if (unit === 'hours') setHours((h) => Math.max(0, h - 1));
    if (unit === 'minutes') setMinutes((m) => (m === 0 ? 59 : m - 1));
    if (unit === 'seconds') setSeconds((s) => (s === 0 ? 59 : s - 1));
  };

  const selectedDate = new Date(2026, 2, parseInt(day || '1'));

  if (isFullScreen) {
    return (
      <div className="min-h-screen bg-teal-200 flex items-center justify-center relative pb-20">
        <button
          onClick={() => setIsFullScreen(false)}
          className="absolute top-6 right-6 w-12 h-12 bg-white rounded-lg flex items-center justify-center"
        >
          <X className="size-6" />
        </button>

        <div className="text-center">
          <p className="text-xl font-bold mb-4">Active Reading Timer</p>
          
          {/* Large circular timer */}
          <div className="relative mb-8">
            <div className="w-80 h-80 rounded-full border-[16px] border-gray-600 flex items-center justify-center bg-white">
              <div className="text-center">
                <div className="text-7xl font-bold">{formatTime(timerSeconds)}</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <button
              onClick={handleReset}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center"
            >
              <RotateCcw className="size-8 text-gray-700" />
            </button>
            
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
            >
              {isRunning ? (
                <div className="w-8 h-8 bg-white rounded" />
              ) : (
                <Play className="size-10 text-white ml-1" fill="white" />
              )}
            </button>
          </div>

          {/* Track Time Read Button */}
          <button
            onClick={handleTrackTimerTime}
            className="bg-red-400 text-white px-8 py-3 rounded-lg font-bold text-lg"
          >
            Track Time Read
          </button>
        </div>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="flex items-center justify-center p-4 border-b border-gray-200 relative">
        <button onClick={() => navigate('/track')} className="absolute left-4">
          <ChevronLeft className="size-6" />
        </button>
        <h1 className="text-2xl font-bold">Track</h1>
      </div>

      {/* Manual Time Entry Card */}
      <div className="p-4">
        <div className="bg-teal-200 rounded-2xl p-6">
          {/* Date and Book Selector */}
          <div className="flex gap-2 mb-4">
            <button className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 flex-1">
              <Calendar className="size-5" />
              <span className="font-semibold text-sm">
                {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit' })}
              </span>
            </button>
            <button className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 flex-1">
              <Book className="size-5" />
              <span className="font-semibold text-sm">All About Love</span>
            </button>
          </div>

          {/* Time Input */}
          <div className="bg-white rounded-2xl p-4 mb-4 relative">
            <div className="flex items-center justify-center gap-1 text-4xl font-bold">
              <span className="w-16 text-center">{hours.toString().padStart(2, '0')}h</span>
              <span>:</span>
              <span className="w-16 text-center">{minutes.toString().padStart(2, '0')}m</span>
              <span>:</span>
              <span className="w-20 text-center">{seconds.toString().padStart(2, '0')}s</span>
            </div>
            
            {/* Plus/Minus Buttons */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
              <button
                onClick={() => incrementTime('minutes')}
                className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white"
              >
                <Plus className="size-6" />
              </button>
              <button
                onClick={() => decrementTime('minutes')}
                className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white"
              >
                <Minus className="size-6" />
              </button>
            </div>
          </div>

          {/* Add and Cancel Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAdd}
              className="flex-1 bg-red-400 text-white py-3 rounded-xl font-bold text-lg"
            >
              Add
            </button>
            <button
              onClick={() => navigate('/track')}
              className="flex-1 bg-white border-2 border-gray-800 text-gray-800 py-3 rounded-xl font-bold text-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Active Reading Timer Section */}
      <div className="px-4">
        <h2 className="text-xl font-bold mb-3">Active Reading Timer</h2>
        <div className="bg-teal-200 rounded-2xl p-6">
          {/* Timer Display */}
          <div className="relative mb-6">
            <div className="w-64 h-64 mx-auto rounded-full border-[12px] border-gray-600 flex items-center justify-center bg-white relative">
              <div className="text-center">
                <div className="text-5xl font-bold">{formatTime(timerSeconds)}</div>
              </div>

              {/* Play/Pause and Stop buttons inside circle */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  {isRunning ? (
                    <Pause className="size-6 text-white" fill="white" />
                  ) : (
                    <Play className="size-6 text-white ml-0.5" fill="white" />
                  )}
                </button>
                <button
                  onClick={handleReset}
                  className="w-14 h-14 bg-gray-600 rounded-full flex items-center justify-center shadow-lg"
                >
                  <div className="w-5 h-5 bg-white rounded-sm" />
                </button>
              </div>

              {/* Fullscreen button */}
              <button
                onClick={() => setIsFullScreen(true)}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-300"
              >
                <Maximize2 className="size-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Reset and Track Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleReset}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center"
            >
              <RotateCcw className="size-6 text-gray-700" />
            </button>
            
            <button
              onClick={handleTrackTimerTime}
              className="bg-red-400 text-white px-6 py-3 rounded-lg font-bold"
            >
              Track Time Read
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
