import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import EmailVerification from './pages/EmailVerification';
import Academy_details from './pages/academy_details';

import  Cooperative_details from './pages/cooperative_details';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                  
                    <Route path="/EmailVerification" element={<EmailVerification /> } />
                    <Route path="/cooperative_details" element={<Cooperative_details />} />
                    <Route path='/academy_details' element={<Academy_details />} />

                    {/* Fallback route */}
                    <Route path="*" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
