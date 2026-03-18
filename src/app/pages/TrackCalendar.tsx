import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { BottomNav } from '../components/BottomNav';

export function TrackCalendar() {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2)); // March 2026
  const [selectedDate, setSelectedDate] = useState<number | null>(17);
  const [trackedDates, setTrackedDates] = useState<number[]>([2, 3, 5, 9, 10, 12, 16, 1, 8]);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const handleDateClick = (day: number) => {
    setSelectedDate(day);
  };

  const handleTrackClick = () => {
    if (selectedDate) {
      navigate(`/track/${selectedDate}`);
    }
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  return (
    <div className="min-h-screen bg-white pb-20 relative">
      {/* Header */}
      <div className="flex items-center justify-center p-4 border-b border-gray-200 relative">
        <button onClick={() => navigate('/')} className="absolute left-4">
          <ChevronLeft className="size-6" />
        </button>
        <h1 className="text-2xl font-bold">Track</h1>
      </div>

      {/* Month In Reading */}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Month In Reading</h2>
        
        <div className="bg-gray-200 rounded-2xl p-4">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <div className="flex gap-2">
              <button onClick={previousMonth} className="p-1">
                <ChevronLeft className="size-5" />
              </button>
              <button onClick={nextMonth} className="p-1">
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>

          {/* Calendar */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {weekDays.map(day => (
              <div key={day} className="text-center text-sm font-semibold text-gray-700">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {/* Empty cells for days before the month starts */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => {
              const prevMonthDays = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0).getDate();
              const day = prevMonthDays - firstDayOfMonth + i + 1;
              return (
                <div key={`prev-${i}`} className="aspect-square flex items-center justify-center text-sm text-gray-400">
                  {day}
                </div>
              );
            })}
            
            {/* Days of current month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isTracked = trackedDates.includes(day);
              const isSelected = selectedDate === day;
              
              return (
                <button
                  key={day}
                  onClick={() => handleDateClick(day)}
                  className={`aspect-square rounded-full flex flex-col items-center justify-center text-lg font-semibold relative transition-colors ${
                    isSelected ? 'bg-white' : 'hover:bg-gray-300'
                  }`}
                >
                  {day}
                  {isTracked && (
                    <div className="absolute bottom-0">
                      <span className="text-green-500 text-xl leading-none">✓</span>
                    </div>
                  )}
                </button>
              );
            })}

            {/* Empty cells for days after month ends */}
            {Array.from({ length: (7 - ((firstDayOfMonth + daysInMonth) % 7)) % 7 }).map((_, i) => (
              <div key={`next-${i}`} className="aspect-square flex items-center justify-center text-sm text-gray-400">
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Track Button */}
      <div className="px-4">
        <button
          onClick={handleTrackClick}
          disabled={!selectedDate}
          className={`w-full py-4 rounded-xl text-lg font-bold ${
            selectedDate 
              ? 'bg-red-400 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Track
        </button>
      </div>

      <BottomNav />
    </div>
  );
}