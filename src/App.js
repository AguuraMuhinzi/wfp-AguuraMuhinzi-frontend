import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import EmailVerification from './pages/EmailVerification';
import AcademyDetails from './pages/academy_details';
import CooperativeDetails from './pages/cooperative_details';
import CopDashboard from './pages/cop_dashboard';
import DashboardLayout from './components/dashboard';
import NewProduct from './pages/product/newProduct'; 
import AllProducts from './pages/product/Allproducts';
import StockPage from './pages/product/stockpage';
import OrdersPage from './pages/orders/orderpage';
import Home from './pages/product/productDisplay';
import CoopProfile from './pages/cooperative/profile';

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
                    <Route path="/home" element={<Home />} />

                   
                    <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route path="stock" element={<StockPage />} />
                        <Route path="Orders" element={<OrdersPage />} />
                        <Route path="newProduct" element={<NewProduct />} />
                        <Route  path="allProducts" element={<AllProducts />} />
                        <Route path="coopProfile" element={<CoopProfile />} />
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
