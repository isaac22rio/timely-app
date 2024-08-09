import React from 'react';

const Navbar = ({ handleLogout, setPopupActive }) => {
    return (
        <nav className="sticky top-0 z-50 flex justify-end p-4 bg-gray-800 shadow-lg">
            <button 
                className="p-2 bg-gradient-to-br from-blue-500 to-pink-500 text-white rounded hover:from-blue-600 hover:to-pink-600 mr-4"
                onClick={() => setPopupActive(true)}
            >
                Add Task
            </button>
            <button 
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleLogout}
            >
                Logout
            </button>
        </nav>
    );
};

export default Navbar;