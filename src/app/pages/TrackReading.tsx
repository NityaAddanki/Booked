import { useState, useEffect } from 'react';
import { ChevronLeft, Play, RotateCcw, Plus, Minus, Calendar, Book } from 'lucide-react';
import { useNavigate } from 'react-router';
import { BottomNav } from '../components/BottomNav';
import { useApp } from '../context/AppContext';

export function TrackReading() {
  const navigate = useNavigate();
  const { addReadingSession } = useApp();
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [adjustHours, setAdjustHours] = useState(0);
  const [adjustMinutes, setAdjustMinutes] = useState(0);
  const [adjustSeconds, setAdjustSeconds] = useState(0);
  const [selectedBookId, setSelectedBookId] = useState('1');
  const [selectedBookTitle, setSelectedBookTitle] = useState('All About Love');
  const [showBookPicker, setShowBookPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Available books
  const books = [
    { id: '1', title: 'All About Love' },
    { id: '2', title: 'Divergent' },
    { id: '3', title: 'Becoming' },
  ];

  // Format selected date
  const formattedDate = selectedDate.toISOString().split('T')[0];
  const displayDate = selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: '2-digit' });

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

  const handleTrackTime = () => {
    if (timerSeconds > 0) {
      // Stop timer and populate adjust values
      setIsRunning(false);
      const h = Math.floor(timerSeconds / 3600);
      const m = Math.floor((timerSeconds % 3600) / 60);
      const s = timerSeconds % 60;
      setAdjustHours(h);
      setAdjustMinutes(m);
      setAdjustSeconds(s);
      setShowModal(true);
    }
  };

  const handleAdd = () => {
    // Save the tracked time
    setShowModal(false);
    setTimerSeconds(0);
    // Add the reading session to the app context
    addReadingSession({
      date: formattedDate,
      bookId: selectedBookId,
      bookTitle: selectedBookTitle,
      hours: adjustHours,
      minutes: adjustMinutes,
      seconds: adjustSeconds,
    });
    // Could navigate somewhere or show success message
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const incrementTime = (unit: 'hours' | 'minutes' | 'seconds') => {
    if (unit === 'hours') setAdjustHours((h) => Math.min(23, h + 1));
    if (unit === 'minutes') setAdjustMinutes((m) => (m + 1) % 60);
    if (unit === 'seconds') setAdjustSeconds((s) => (s + 1) % 60);
  };

  const decrementTime = (unit: 'hours' | 'minutes' | 'seconds') => {
    if (unit === 'hours') setAdjustHours((h) => Math.max(0, h - 1));
    if (unit === 'minutes') setAdjustMinutes((m) => (m === 0 ? 59 : m - 1));
    if (unit === 'seconds') setAdjustSeconds((s) => (s === 0 ? 59 : s - 1));
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20 relative">
      {/* Header */}
      <div className="flex items-center justify-center p-4 bg-white relative">
        <button onClick={() => navigate(-1)} className="absolute left-4">
          <ChevronLeft className="size-8 text-gray-400" />
          <span className="text-xs text-gray-400 block -mt-1">Back</span>
        </button>
        <h1 className="text-xl text-gray-500">Track</h1>
      </div>

      {/* Main Content */}
      <div className="px-4 pt-6">
        <h2 className="text-2xl font-bold text-center mb-6">Active Reading Timer</h2>
        
        <div className="bg-teal-200 rounded-3xl p-8 pb-6">
          {/* Timer Circle */}
          <div className="relative mb-6">
            <div className="w-72 h-72 mx-auto rounded-full border-[20px] border-gray-600 flex items-center justify-center bg-white">
              <div className="text-center">
                <div className="text-7xl font-bold">{formatTime(timerSeconds)}</div>
              </div>

              {/* Play/Stop buttons inside circle */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center shadow-lg"
                >
                  {isRunning ? (
                    <div className="w-6 h-6 bg-white rounded-sm" />
                  ) : (
                    <Play className="size-8 text-white ml-1" fill="white" />
                  )}
                </button>
                <button
                  onClick={handleReset}
                  className="w-16 h-16 bg-teal-300 rounded-full flex items-center justify-center shadow-lg"
                >
                  <div className="w-6 h-6 bg-gray-700 rounded-sm" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleReset}
              className="w-14 h-14 bg-white rounded-full flex items-center justify-center"
            >
              <RotateCcw className="size-7 text-gray-600" />
            </button>
            
            <button
              onClick={handleTrackTime}
              className="bg-red-400 text-black px-8 py-3 rounded-lg font-bold text-lg"
            >
              Track Time Read
            </button>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-black/20 flex items-start justify-center pt-20 pb-20 z-50">
          <div className="bg-gray-100 rounded-3xl p-4 mx-4 max-w-md w-full">
            {/* Header */}
            <div className="flex items-center justify-center mb-4 relative">
              <button onClick={handleCancel} className="absolute left-0">
                <ChevronLeft className="size-8 text-gray-400" />
                <span className="text-xs text-gray-400 block -mt-1">Back</span>
              </button>
              <h1 className="text-xl text-gray-500">Track</h1>
            </div>

            {/* Modal Content */}
            <div className="bg-teal-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-3">Track Active Reading Time</h3>
              <p className="text-sm mb-4">
                Congratulations! You've finished a reading session using the timer! Adjust any information and add it to your reading time.
              </p>

              {/* Date and Book Selector */}
              <div className="flex gap-2 mb-4">
                <button 
                  className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 flex-1"
                  onClick={() => setShowDatePicker(true)}
                >
                  <Calendar className="size-5" />
                  <span className="font-semibold text-sm">{displayDate}</span>
                </button>
                <button
                  className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 flex-1"
                  onClick={() => setShowBookPicker(true)}
                >
                  <Book className="size-5" />
                  <span className="font-semibold text-sm">{selectedBookTitle}</span>
                </button>
              </div>

              {/* Time Display with +/- buttons */}
              <div className="bg-white rounded-2xl p-4 mb-4">
                <div className="flex items-center justify-center gap-4">
                  {/* Hours */}
                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => incrementTime('hours')}
                      className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white"
                    >
                      <Plus className="size-5" />
                    </button>
                    <div className="text-3xl font-bold w-16 text-center">{adjustHours}h</div>
                    <button
                      onClick={() => decrementTime('hours')}
                      className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white"
                    >
                      <Minus className="size-5" />
                    </button>
                  </div>

                  <span className="text-3xl font-bold">:</span>

                  {/* Minutes */}
                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => incrementTime('minutes')}
                      className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white"
                    >
                      <Plus className="size-5" />
                    </button>
                    <div className="text-3xl font-bold w-16 text-center">{adjustMinutes.toString().padStart(2, '0')}m</div>
                    <button
                      onClick={() => decrementTime('minutes')}
                      className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white"
                    >
                      <Minus className="size-5" />
                    </button>
                  </div>

                  <span className="text-3xl font-bold">:</span>

                  {/* Seconds */}
                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => incrementTime('seconds')}
                      className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white"
                    >
                      <Plus className="size-5" />
                    </button>
                    <div className="text-3xl font-bold w-20 text-center">{adjustSeconds.toString().padStart(2, '0')}s</div>
                    <button
                      onClick={() => decrementTime('seconds')}
                      className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white"
                    >
                      <Minus className="size-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Add and Cancel Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleAdd}
                  className="flex-1 bg-red-400 text-black py-3 rounded-xl font-bold text-lg"
                >
                  Add
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-white border-2 border-gray-800 text-gray-800 py-3 rounded-xl font-bold text-lg"
                >
                  Cancel
                </button>
              </div>
            </div>

            {/* Bottom section below modal card */}
            <div className="mt-4 flex items-center justify-between px-8">
              <button className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                <RotateCcw className="size-7 text-gray-600" />
              </button>
              
              <button className="bg-red-400 text-black px-8 py-3 rounded-lg font-bold text-lg opacity-50">
                Track Time Read
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Book Picker Overlay */}
      {showBookPicker && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-gray-100 rounded-3xl p-4 mx-4 max-w-md w-full">
            {/* Header */}
            <div className="flex items-center justify-center mb-4 relative">
              <button onClick={() => setShowBookPicker(false)} className="absolute left-0">
                <ChevronLeft className="size-8 text-gray-400" />
                <span className="text-xs text-gray-400 block -mt-1">Back</span>
              </button>
              <h1 className="text-xl text-gray-500">Select Book</h1>
            </div>

            {/* Book List */}
            <div className="bg-teal-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-3">Available Books</h3>
              <p className="text-sm mb-4">
                Select the book you were reading.
              </p>

              {/* Book Selector */}
              <div className="flex flex-col gap-2">
                {books.map(book => (
                  <button
                    key={book.id}
                    className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 flex-1"
                    onClick={() => {
                      setSelectedBookId(book.id);
                      setSelectedBookTitle(book.title);
                      setShowBookPicker(false);
                    }}
                  >
                    <Book className="size-5" />
                    <span className="font-semibold text-sm">{book.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Date Picker Overlay */}
      {showDatePicker && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-gray-100 rounded-3xl p-4 mx-4 max-w-md w-full">
            {/* Header */}
            <div className="flex items-center justify-center mb-4 relative">
              <button onClick={() => setShowDatePicker(false)} className="absolute left-0">
                <ChevronLeft className="size-8 text-gray-400" />
                <span className="text-xs text-gray-400 block -mt-1">Back</span>
              </button>
              <h1 className="text-xl text-gray-500">Select Date</h1>
            </div>

            {/* Date List */}
            <div className="bg-teal-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-3">Select Reading Date</h3>
              <p className="text-sm mb-4">
                Choose the date when you read.
              </p>

              {/* Date Input */}
              <input
                type="date"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={(e) => {
                  const newDate = new Date(e.target.value + 'T00:00:00');
                  setSelectedDate(newDate);
                  setShowDatePicker(false);
                }}
                className="w-full bg-white rounded-lg px-4 py-3 border-none font-semibold"
              />

              {/* Quick Date Options */}
              <div className="mt-4 flex flex-col gap-2">
                <button
                  className="flex items-center gap-2 bg-white rounded-lg px-3 py-2"
                  onClick={() => {
                    setSelectedDate(new Date());
                    setShowDatePicker(false);
                  }}
                >
                  <Calendar className="size-5" />
                  <span className="font-semibold text-sm">Today</span>
                </button>
                <button
                  className="flex items-center gap-2 bg-white rounded-lg px-3 py-2"
                  onClick={() => {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    setSelectedDate(yesterday);
                    setShowDatePicker(false);
                  }}
                >
                  <Calendar className="size-5" />
                  <span className="font-semibold text-sm">Yesterday</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}