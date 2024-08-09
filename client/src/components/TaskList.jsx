import Task from './Task';

const TaskList = ({ tasks, checkOffTask, setPopupActive, setCurrentTaskId, deleteTask }) => {
	return (
		<div className="tasks">
			{tasks.length > 0 ? tasks.map(task => (
				<Task key={task._id} task={task} checkOffTask={checkOffTask} setPopupActive={setPopupActive} setCurrentTaskId={setCurrentTaskId} deleteTask={deleteTask} />
			)) : (
				<p className="text-center">You currently have no tasks</p>
			)}
		</div>
	);
};

export default TaskList;