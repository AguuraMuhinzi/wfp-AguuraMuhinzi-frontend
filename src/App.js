import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Define route for login page */}
                    <Route path="/login" element={<Login />} />

                    {/* Define route for signup page */}
                    <Route path="/signup" element={<Signup />} />

                    {/* Redirect root path to login page */}
                    <Route path="/" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
