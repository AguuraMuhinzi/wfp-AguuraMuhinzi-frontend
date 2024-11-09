import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import EmailVerification from './pages/EmailVerification';
import AcademyDetails from './pages/academy_details';
import CooperativeDetails from './pages/cooperative_details';
import CopDashboard from './pages/cop_dashboard';
import DashboardLayout from './components/navbar';
import NewProduct from './pages/product/newProduct'; 
import AllProducts from './pages/product/Allproducts';
import StockPage from './pages/product/stockpage';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/EmailVerification" element={<EmailVerification />} />
                    <Route path="/cooperative_details" element={<CooperativeDetails />} />
                    <Route path="/academy_details" element={<AcademyDetails />} />

                   
                    <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route path="stock" element={<StockPage />} />
                        <Route path="newProduct" element={<NewProduct />} />
                        <Route  path="allProducts" element={<AllProducts />} />
                        {/* Add other dashboard-related routes as needed */}
                    </Route>

                    {/* Fallback route */}
                    <Route path="*" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
