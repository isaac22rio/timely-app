import React from 'react';
import logo from '../timely_logo_transparent (1).png';

const Navbar = ({ handleLogout, setPopupActive }) => {
    return (
        <nav className="fixed top-0 left-0 w-full bg-primary text-white flex items-center justify-between p-4 z-50">
			<div className="flex items-center">
				{/* Logo on the left */}
				<img src={logo} alt="Timely Logo" className="h-10 w-10 mr-4 ml-0" />
				<h1 className="text-xl font-bold">Timely</h1>
			</div>
			<div className="flex items-center"> 
				<button 
					className="mr-4 p-2 bg-secondary from-blue-500 to-pink-500 text-white rounded"
					onClick={() => setPopupActive(true)}
					>Add Task
				</button>
				<button 
					className="p-2 bg-secondary text-white rounded hover:bg-red-600"
					onClick={handleLogout}
					>Logout
				</button>
			</div>
            
        </nav>
    );
};

export default Navbar;