import { useState, useEffect } from 'react';
import { ChevronLeft, Play, Pause, RotateCcw, X, Maximize2 } from 'lucide-react';
import { useNavigate } from 'react-router';

export function Timer() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    let interval: number | undefined;
    
    if (isRunning) {
      interval = window.setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    return {
      display: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`,
      short: `${hours}h${minutes}m${secs}s`
    };
  };

  const handleReset = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  const handleTrackTime = () => {
    // Save the tracked time and navigate back
    if (seconds > 0) {
      // Here you could save the tracked time to state/context
      navigate('/track');
    }
  };

  const time = formatTime(seconds);

  if (isFullScreen) {
    return (
      <div className="min-h-screen bg-teal-200 flex items-center justify-center relative">
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
                <div className="text-7xl font-bold">{time.display}</div>
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
            onClick={handleTrackTime}
            className="bg-red-400 text-white px-8 py-3 rounded-lg font-bold text-lg"
          >
            Track Time Read
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft className="size-6" />
        </button>
        <h1 className="font-semibold">Track</h1>
        <button onClick={() => navigate('/')}>
          <X className="size-6" />
        </button>
      </div>

      {/* Timer Type Selector */}
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="flex gap-2">
          <button className="flex-1 bg-red-100 text-red-600 py-2 rounded-lg text-sm font-medium">
            Active
          </button>
          <button className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg text-sm">
            Total
          </button>
        </div>
      </div>

      {/* Main Timer Display */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm mb-6">
            <span className={`size-2 bg-red-600 rounded-full ${isRunning ? 'animate-pulse' : ''}`} />
            Active Reading Timer
          </div>
          
          {/* Large circular timer */}
          <div className="relative mb-8">
            <div className="size-64 rounded-full border-8 border-gray-200 flex items-center justify-center relative">
              <div className="text-center">
                <div className="text-6xl font-light">{time.display.split(':').slice(0, 2).join(':')}</div>
                <div className="text-2xl text-gray-400 mt-2">{time.display.split(':')[2]}s</div>
              </div>

              {/* Fullscreen button */}
              <button
                onClick={() => setIsFullScreen(true)}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-300"
              >
                <Maximize2 className="size-5 text-gray-600" />
              </button>
            </div>
            
            {/* Play/Pause Button in center */}
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 size-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
            >
              {isRunning ? (
                <Pause className="size-8 text-white" fill="white" />
              ) : (
                <Play className="size-8 text-white ml-1" fill="white" />
              )}
            </button>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-gray-600 mx-auto"
          >
            <RotateCcw className="size-4" />
            <span className="text-sm">Mark Time Read</span>
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 bg-white border-t border-gray-200 space-y-2">
        <button 
          onClick={handleTrackTime}
          className="w-full bg-red-500 text-white py-3 rounded-xl font-medium"
        >
          Track Time Read
        </button>
        <button 
          onClick={handleReset}
          className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium"
        >
          Reset
        </button>
      </div>
    </div>
  );
}