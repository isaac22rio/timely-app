import { useState } from 'react';

const Popup = ({ setPopupActive, setCurrentTaskId, setNewTask, newTask, currentTaskId, addTask, updateTask }) => {
	const [year, setYear] = useState('');
	const [month, setMonth] = useState('');
	const [day, setDay] = useState('');

	return (
		<div className="popup fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white text-gray-900 p-8 rounded-lg shadow-lg">
			<div className="closePopup absolute top-4 right-4 text-2xl cursor-pointer" onClick={() => { setPopupActive(false); setCurrentTaskId(null); setNewTask(""); }}>X</div>
			<h3 className="text-lg mb-4">{currentTaskId ? "Edit Task" : "Add Task"}</h3>
			<input type="text" 
				className="add-task-input appearance-none outline-none border-none bg-gray-100 p-4 rounded-lg w-full mb-4" 
				onChange={e => setNewTask(e.target.value)} 
				value={newTask}
				placeholder="Enter your task here..."
			/>
			<div className="date-input-container flex justify-between mb-4">
				<input 
						type="text" 
						className="year-input appearance-none outline-none border-none bg-gray-100 p-4 rounded-lg w-1/3 mr-2" 
						onChange={e => setYear(e.target.value)} 
						value={year} 
						placeholder="YYYY"
				/>
				<input 
						type="text" 
						className="month-input appearance-none outline-none border-none bg-gray-100 p-4 rounded-lg w-1/3 mr-2" 
						onChange={e => setMonth(e.target.value)} 
						value={month} 
						placeholder="MM"
				/>
				<input 
						type="text" 
						className="day-input appearance-none outline-none border-none bg-gray-100 p-4 rounded-lg w-1/3" 
						onChange={e => setDay(e.target.value)} 
						value={day} 
						placeholder="DD"
				/>
			</div>
			<div className="button p-4 bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold rounded-lg cursor-pointer text-center" onClick={() => currentTaskId ? updateTask(currentTaskId) : addTask()}>{currentTaskId ? "Update Task" : "Create Task"}</div>
		</div>
	);
};

export default Popup;