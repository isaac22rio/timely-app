import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from './TaskList';
import Popup from './Popup';
import Navbar from './Navbar';

const API_BASE = 'http://localhost:3001';

function App() {
	const [tasks, setTasks] = useState([]);
	const [popupActive, setPopupActive] = useState(false);
	const [newTask, setNewTask] = useState("");
	const [currentTaskId, setCurrentTaskId] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [username, setUsername] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const res = await fetch(API_BASE + '/session', {
					credentials: 'include'
				});
				const isLoggedIn = await res.json();
					if (isLoggedIn) {
						setIsAuthenticated(true);
						getTasks();
						getUsername();
					} else {
						navigate('/login');
					}
			} catch (error) {
				console.error("Error checking authentication:", error);
				navigate('/login');
			}
		};

	checkAuth();
}, [navigate]);

	const getTasks = () => {
		fetch(API_BASE + '/tasks', {credentials: 'include'})
			.then(res => res.json())
			.then(data => setTasks(data))
			.catch((err) => console.error("Error: ", err));
	}

	const checkOffTask = async id => {
		const response = await fetch(API_BASE + '/task/done/' + id, { credentials: 'include' });
		const updatedTask = await response.json();

		setTasks(tasks => tasks.map(task => 
			task._id === updatedTask._id ? { ...task, isDone: updatedTask.isDone } : task
		));
};


	const addTask = async () => {
		const data = await fetch(API_BASE + "/task/new", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ text: newTask }),
			credentials: 'include',
		}).then(res => res.json());
		
		setTasks(tasks => [...tasks, data]);
		setPopupActive(false);
		setNewTask("");
	}

	const deleteTask = async id => {
		try {
			const response = await fetch(API_BASE + '/task/delete/' + id, {
				method: "DELETE",
				credentials: 'include',
			});

			// Parse the JSON response
			const data = await response.json();
			setTasks(tasks => tasks.filter(task => task._id !== data.result));

		} catch (err) {
			console.error("Error during delete task:", err);
		}
	}

	const updateTask = async id => {
		const data = await fetch(API_BASE + '/task/update/' + id, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ text: newTask }),
			credentials: 'include',
		}).then(res => res.json());

		setTasks(tasks => tasks.map(task => {
			if (task._id === data._id) {
				task.text = data.text;
			}
			return task;
		}));

		setPopupActive(false);
		setNewTask("");
		setCurrentTaskId(null);
	}

	const handleLogout = async () => {
		await fetch(API_BASE + '/logout', {
			method: 'POST',
			credentials: 'include'
		});
		navigate('/login');
	};

	const getUsername = async () => {
        try {
            const res = await fetch(`${API_BASE}/username`, { credentials: 'include' });
            const data = await res.json();
            setUsername(data.username);
        } catch (err) {
            console.error("Error fetching username:", err);
        }
    };
	
	return isAuthenticated ? (
        <div className="App min-h-screen bg-gray-800 text-white pt-16">
            <Navbar handleLogout={handleLogout} setPopupActive={setPopupActive} />
            <div className="p-8">
                <h1 className="text-4xl font-bold mb-8">Welcome, {username}</h1>
                <h4 className="text-xl mb-4">Your dashboard</h4>
                <TaskList 
                    tasks={tasks} 
                    checkOffTask={checkOffTask} 
                    setPopupActive={setPopupActive} 
                    setCurrentTaskId={setCurrentTaskId} 
                    deleteTask={deleteTask} 
                />
                {popupActive && 
                    <Popup 
                        setPopupActive={setPopupActive} 
                        setCurrentTaskId={setCurrentTaskId} 
                        setNewTask={setNewTask} 
                        newTask={newTask} 
                        currentTaskId={currentTaskId} 
                        addTask={addTask} 
                        updateTask={updateTask} 
                    />
                }
            </div>
        </div>
    ) : null;

}

export default App;