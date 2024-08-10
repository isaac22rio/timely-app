import { useEffect, useState } from 'react';
import dayjs from "dayjs";

const Calendar = ({ tasks }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf('month'));
  const [selectedDate, setSelectedDate] = useState(null);

  const handlePreviousMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const generateDays = () => {
    const startOfMonth = currentMonth.startOf('month');
    const endOfMonth = currentMonth.endOf('month');
    const days = [];

    for (let date = startOfMonth; date.isBefore(endOfMonth.add(1, 'day')); date = date.add(1, 'day')) {
      days.push(date);
    }
    return days;
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const days = generateDays();

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePreviousMonth}
          className="bg-gray-200 p-2 rounded-md hover:bg-gray-300"
        >
          &lt;
        </button>
        <h2 className="text-lg font-semibold">
          {currentMonth.format('MMMM YYYY')}
        </h2>
        <button
          onClick={handleNextMonth}
          className="bg-gray-200 p-2 rounded-md hover:bg-gray-300"
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center font-semibold mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="p-2 bg-gray-100 rounded-md">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <div
            key={day.format('DD-MM-YYYY')}
            className={`p-2 rounded-md cursor-pointer ${
              tasks.some(task => task.date === day.format('YYYY-MM-DD')) ? 'bg-green-100' : 'hover:bg-gray-100'
            }`}
            onClick={() => handleDateClick(day)}
          >
            {day.date()}
            {tasks
              .filter(task => task.date === day.format('YYYY-MM-DD'))
              .map(task => (
                <div key={task._id} className="text-sm text-gray-600 mt-1">
                  {task.text}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;