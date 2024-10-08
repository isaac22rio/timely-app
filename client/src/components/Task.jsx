import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';

const Task = ({ task, checkOffTask, setPopupActive, setCurrentTaskId, deleteTask }) => {
	return (
		<div className={`task relative bg-gray-700 p-4 rounded-lg flex items-center transition duration-500 cursor-pointer mb-4 ${task.done ? 'opacity-80' : ''} hover:opacity-60`}>
			<div className={`checkbox w-5 h-5 mr-4 rounded-full transition duration-400 ${task.isDone ? 'bg-pastelGreenGradient' : 'bg-gray-600'}`} 
				onClick={() => checkOffTask(task._id)}>
			</div>
			<div className="textContainer">
				<div className={`text flex-grow text-lg ${task.done ? 'line-through' : ''}`}
					>{task.text}
				</div>
				<div className="text-gray-400 text-sm flex left-40">
						{task.date.slice(0, 15)}
				</div>
			</div>
			<div className="update-task absolute top-1/2 transform -translate-y-1/2 right-12 w-6 h-6 rounded-full bg-primary flex items-center justify-center cursor-pointer" 
				onClick={() => { setPopupActive(true); setCurrentTaskId(task._id); }}>
				<FontAwesomeIcon icon={faPencil} />
			</div>
			<div className="delete-task absolute top-1/2 transform -translate-y-1/2 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center cursor-pointer" 
				onClick={() => deleteTask(task._id)}>
				<FontAwesomeIcon icon={faTrashCan} />
			</div>
		</div>
	);
};

export default Task;