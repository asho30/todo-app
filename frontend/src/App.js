import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import TodoList from './components/TodoList';
import './App.css';

function App() {
    const [user, setUser] = useState(null);

    const handleLoginSuccess = (loggedInUser) => {
        setUser(loggedInUser);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>To-Do List ✅</h1>
                {user ? (
                    <TodoList />
                ) : (
                    <LoginPage onLoginSuccess={handleLoginSuccess} />
                )}
            </header>
        </div>
    );
}

export default App;