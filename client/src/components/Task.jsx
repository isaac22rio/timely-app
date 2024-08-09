import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';

const Task = ({ task, checkOffTask, setPopupActive, setCurrentTaskId, deleteTask }) => {
	return (
		<div className={`task relative bg-gray-700 p-4 rounded-lg flex items-center transition duration-500 cursor-pointer mb-4 ${task.done ? 'opacity-80' : ''}`}>
			<div className={`checkbox w-5 h-5 mr-4 rounded-full transition duration-400 ${task.isDone ? 'bg-pink-200' : 'bg-gray-600'}`} onClick={() => checkOffTask(task._id)}></div>
			<div className={`text flex-grow text-lg ${task.done ? 'line-through' : ''}`}>{task.text}</div>
			<div className="update-task absolute top-1/2 transform -translate-y-1/2 right-12 w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center cursor-pointer" onClick={() => { setPopupActive(true); setCurrentTaskId(task._id); }}><FontAwesomeIcon icon={faPencil} /></div>
			<div className="delete-task absolute top-1/2 transform -translate-y-1/2 right-4 w-6 h-6 rounded-full bg-red-600 flex items-center justify-center cursor-pointer" onClick={() => deleteTask(task._id)}><FontAwesomeIcon icon={faTrashCan} /></div>
		</div>
	);
};

export default Task;