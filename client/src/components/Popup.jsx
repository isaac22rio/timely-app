const Popup = ({ setPopupActive, setCurrentTaskId, setNewTask, newTask, currentTaskId, addTask, updateTask }) => {
	return (
		<div className="popup fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white text-gray-900 p-8 rounded-lg shadow-lg">
			<div className="closePopup absolute top-4 right-4 text-2xl cursor-pointer" onClick={() => { setPopupActive(false); setCurrentTaskId(null); setNewTask(""); }}>X</div>
			<h3 className="text-lg mb-4">{currentTaskId ? "Edit Task" : "Add Task"}</h3>
			<input type="text" className="add-task-input appearance-none outline-none border-none bg-gray-100 p-4 rounded-lg w-full mb-4" onChange={e => setNewTask(e.target.value)} value={newTask} />
			<div className="button p-4 bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold rounded-lg cursor-pointer text-center" onClick={() => currentTaskId ? updateTask(currentTaskId) : addTask()}>{currentTaskId ? "Update Task" : "Create Task"}</div>
		</div>
	);
};

export default Popup;