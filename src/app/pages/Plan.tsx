import { useState } from 'react';
import { X, Check, ChevronUp, ChevronDown, Trash2 } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

interface TimeSlot {
  day: string;
  time: string;
  startHour: number;
  startMinute: number;
  startPeriod: 'AM' | 'PM';
  endHour: number;
  endMinute: number;
  endPeriod: 'AM' | 'PM';
  duration: string;
}

export function Plan() {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [editingSlot, setEditingSlot] = useState<TimeSlot | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    {
      day: 'Sundays',
      time: '6 AM',
      startHour: 6,
      startMinute: 0,
      startPeriod: 'AM',
      endHour: 9,
      endMinute: 0,
      endPeriod: 'AM',
      duration: '3h'
    }
  ]);

  const daysOfWeek = ['Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays'];
  const timeSlotLabels = ['1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'];

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      setShowWarning(true);
    }
  };

  const handleDiscardAndExit = () => {
    setShowWarning(false);
    setHasUnsavedChanges(false);
    // Reset to original state if needed
  };

  const handleKeepEditing = () => {
    setShowWarning(false);
  };

  const handleSave = () => {
    setHasUnsavedChanges(false);
  };

  const handleAddSlot = (day: string, time: string) => {
    const newSlot: TimeSlot = {
      day,
      time,
      startHour: 1,
      startMinute: 30,
      startPeriod: 'PM',
      endHour: 3,
      endMinute: 0,
      endPeriod: 'PM',
      duration: '1h 30m'
    };
    setEditingSlot(newSlot);
    setHasUnsavedChanges(true);
  };

  const handleEditSlot = (slot: TimeSlot) => {
    setEditingSlot({ ...slot });
  };

  const handleDeleteSlot = () => {
    if (editingSlot) {
      setTimeSlots(timeSlots.filter(slot => 
        !(slot.day === editingSlot.day && slot.time === editingSlot.time)
      ));
      setEditingSlot(null);
      setHasUnsavedChanges(true);
    }
  };

  const handleSaveSlot = () => {
    if (editingSlot) {
      const existingIndex = timeSlots.findIndex(slot => 
        slot.day === editingSlot.day && slot.time === editingSlot.time
      );

      if (existingIndex >= 0) {
        const updated = [...timeSlots];
        updated[existingIndex] = editingSlot;
        setTimeSlots(updated);
      } else {
        setTimeSlots([...timeSlots, editingSlot]);
      }
      setEditingSlot(null);
      setHasUnsavedChanges(true);
    }
  };

  const calculateDuration = (slot: TimeSlot) => {
    let startMinutes = slot.startHour * 60 + slot.startMinute;
    let endMinutes = slot.endHour * 60 + slot.endMinute;
    
    if (slot.startPeriod === 'PM' && slot.startHour !== 12) startMinutes += 12 * 60;
    if (slot.endPeriod === 'PM' && slot.endHour !== 12) endMinutes += 12 * 60;
    if (slot.startPeriod === 'AM' && slot.startHour === 12) startMinutes -= 12 * 60;
    if (slot.endPeriod === 'AM' && slot.endHour === 12) endMinutes -= 12 * 60;
    
    let duration = endMinutes - startMinutes;
    if (duration < 0) duration += 24 * 60;
    
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    
    if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h`;
    return `${minutes}m`;
  };

  const getSlotForCell = (day: string, time: string) => {
    return timeSlots.find(slot => slot.day === day && slot.time === time);
  };

  const isCellBlocked = (day: string, time: string) => {
    // Mock some blocked cells (grayed out - busy in calendar)
    return (day === 'Mondays' && time === '6 AM') || 
           (day === 'Tuesdays' && time === '9 AM') ||
           (day === 'Wednesdays' && time === '3 PM');
  };

  const updateTime = (field: 'startHour' | 'startMinute' | 'endHour' | 'endMinute', increment: boolean) => {
    if (!editingSlot) return;

    const updated = { ...editingSlot };

    if (field === 'startHour' || field === 'endHour') {
      const current = updated[field];
      if (increment) {
        updated[field] = current === 12 ? 1 : current + 1;
      } else {
        updated[field] = current === 1 ? 12 : current - 1;
      }
    } else {
      const current = updated[field];
      if (increment) {
        updated[field] = current === 59 ? 0 : current + 1;
      } else {
        updated[field] = current === 0 ? 59 : current - 1;
      }
    }

    updated.duration = calculateDuration(updated);
    setEditingSlot(updated);
  };

  const togglePeriod = (field: 'startPeriod' | 'endPeriod') => {
    if (!editingSlot) return;
    const updated = { ...editingSlot };
    updated[field] = updated[field] === 'AM' ? 'PM' : 'AM';
    updated.duration = calculateDuration(updated);
    setEditingSlot(updated);
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20 relative">
      {/* Header */}
      <div className="bg-gray-100 p-3">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleCancel}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-10 h-10 rounded-full bg-red-300 flex items-center justify-center">
              <X className="size-5 text-white" />
            </div>
            <span className="text-xs text-gray-400">Cancel</span>
          </button>

          <h1 className="text-xl font-semibold text-gray-600">Plan</h1>

          <button
            onClick={handleSave}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-10 h-10 rounded-full bg-teal-400 flex items-center justify-center">
              <Check className="size-5 text-white" />
            </div>
            <span className="text-xs text-gray-400">Save</span>
          </button>
        </div>

        <div className="text-center mb-3">
          <p className="text-sm font-semibold text-gray-700">Select when you can read.</p>
          <p className="text-xs text-gray-500">Times often busy in Calendar are grayed out.</p>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="px-2 overflow-auto max-h-[calc(100vh-220px)] scrollbar-hide">
        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
        <div className="inline-block min-w-full">
          {/* Header Row */}
          <div className="flex border-b border-gray-300 sticky top-0 bg-gray-100 z-10">
            <div className="w-16 flex-shrink-0"></div>
            {daysOfWeek.map(day => (
              <div key={day} className="w-20 flex-shrink-0 p-1 text-center text-xs font-semibold text-gray-600 border-l border-gray-300">
                {day.slice(0, 3)}
              </div>
            ))}
          </div>

          {/* Time Rows */}
          {timeSlotLabels.map(time => (
            <div key={time} className="flex border-b border-gray-300">
              <div className="w-16 flex-shrink-0 p-1 text-xs text-gray-600">
                {time}
              </div>
              {daysOfWeek.map(day => {
                const slot = getSlotForCell(day, time);
                const isBlocked = isCellBlocked(day, time);

                return (
                  <div
                    key={`${day}-${time}`}
                    className={`w-20 flex-shrink-0 p-1 border-l border-gray-300 min-h-[60px] ${
                      isBlocked ? 'bg-gray-300' : 'bg-white'
                    }`}
                  >
                    {slot ? (
                      <button
                        onClick={() => handleEditSlot(slot)}
                        className="w-full h-full bg-teal-200 rounded-lg flex items-center justify-center font-semibold text-xs text-teal-700"
                      >
                        {slot.duration}
                      </button>
                    ) : !isBlocked ? (
                      <button
                        onClick={() => handleAddSlot(day, time)}
                        className="w-full h-full flex items-center justify-center text-teal-500 hover:bg-gray-50 rounded"
                      >
                        <span className="text-2xl">+</span>
                      </button>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {editingSlot && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-end justify-center z-50 pb-20">
          <div className="bg-white rounded-t-3xl p-6 w-full max-w-md mx-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setEditingSlot(null)}
                className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center"
              >
                <X className="size-6" />
              </button>
              <h2 className="text-2xl font-bold">Edit</h2>
              <button
                onClick={handleDeleteSlot}
                className="w-12 h-12 rounded-full bg-red-400 flex items-center justify-center"
              >
                <Trash2 className="size-6 text-white" />
              </button>
              <button
                onClick={handleSaveSlot}
                className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center"
              >
                <Check className="size-6 text-gray-600" />
              </button>
            </div>

            <p className="text-center mb-6 font-medium">
              Available {editingSlot.startHour}:{editingSlot.startMinute.toString().padStart(2, '0')} {editingSlot.startPeriod} - {editingSlot.endHour}:{editingSlot.endMinute.toString().padStart(2, '0')} {editingSlot.endPeriod}, {editingSlot.day}
            </p>

            {/* Start Time */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="font-bold text-lg">Start</span>
              
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <button onClick={() => updateTime('startHour', true)} className="p-1">
                    <ChevronUp className="size-5 text-blue-500" />
                  </button>
                  <input
                    type="text"
                    value={editingSlot.startHour}
                    readOnly
                    className="w-16 text-center text-2xl font-bold border-2 border-gray-300 rounded"
                  />
                  <button onClick={() => updateTime('startHour', false)} className="p-1">
                    <ChevronDown className="size-5 text-blue-500" />
                  </button>
                </div>

                <span className="text-2xl font-bold">:</span>

                <div className="flex flex-col items-center">
                  <button onClick={() => updateTime('startMinute', true)} className="p-1">
                    <ChevronUp className="size-5 text-blue-500" />
                  </button>
                  <input
                    type="text"
                    value={editingSlot.startMinute.toString().padStart(2, '0')}
                    readOnly
                    className="w-16 text-center text-2xl font-bold border-2 border-gray-300 rounded"
                  />
                  <button onClick={() => updateTime('startMinute', false)} className="p-1">
                    <ChevronDown className="size-5 text-blue-500" />
                  </button>
                </div>

                <button
                  onClick={() => togglePeriod('startPeriod')}
                  className="text-2xl font-bold text-blue-500"
                >
                  {editingSlot.startPeriod}
                </button>
              </div>
            </div>

            {/* End Time */}
            <div className="flex items-center justify-center gap-4">
              <span className="font-bold text-lg">End</span>
              
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <button onClick={() => updateTime('endHour', true)} className="p-1">
                    <ChevronUp className="size-5 text-blue-500" />
                  </button>
                  <input
                    type="text"
                    value={editingSlot.endHour}
                    readOnly
                    className="w-16 text-center text-2xl font-bold border-2 border-gray-300 rounded"
                  />
                  <button onClick={() => updateTime('endHour', false)} className="p-1">
                    <ChevronDown className="size-5 text-blue-500" />
                  </button>
                </div>

                <span className="text-2xl font-bold">:</span>

                <div className="flex flex-col items-center">
                  <button onClick={() => updateTime('endMinute', true)} className="p-1">
                    <ChevronUp className="size-5 text-blue-500" />
                  </button>
                  <input
                    type="text"
                    value={editingSlot.endMinute.toString().padStart(2, '0')}
                    readOnly
                    className="w-16 text-center text-2xl font-bold border-2 border-gray-300 rounded"
                  />
                  <button onClick={() => updateTime('endMinute', false)} className="p-1">
                    <ChevronDown className="size-5 text-blue-500" />
                  </button>
                </div>

                <button
                  onClick={() => togglePeriod('endPeriod')}
                  className="text-2xl font-bold text-blue-500"
                >
                  {editingSlot.endPeriod}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Warning Modal */}
      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="text-red-500">
                <svg className="size-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-red-500">Warning</h2>
            </div>
            <p className="mb-6 text-gray-700">
              You've made unsaved changes to your reading schedule. Exit without saving?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDiscardAndExit}
                className="flex-1 bg-red-500 text-white py-3 rounded-lg font-semibold"
              >
                Discard and Exit
              </button>
              <button
                onClick={handleKeepEditing}
                className="flex-1 bg-teal-500 text-white py-3 rounded-lg font-semibold"
              >
                Keep Editing
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}