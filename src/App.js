import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import EmailVerification from './pages/auth/EmailVerification';
import CooperativeDetails from './pages/cooperative/cooperative_details';
import CopDashboard from './pages/cop_dashboard';
import DashboardLayout from './components/dashboard';
import NewProduct from './pages/product/newProduct'; 
import AllProducts from './pages/product/Allproducts';
import StockPage from './pages/product/stockpage';
import OrdersPage from './pages/orders/orderpage';
import Home from './pages/product/productDisplay';
import CoopProfile from './pages/cooperative/profile';
import Overview from './pages/cooperative/overview';
import DashboardLayout_aca from './pages/academy/acad_dashboard';
import Overview_acad from './pages/academy/acad_overview';
import Acad_profile from './pages/academy/academy_details';
import Acad_orders from './pages/academy/acad_orders';
import Acad_prediction from './pages/academy/acad_pricePrediction';
import HomePage from './pages/home';
import Chat from './pages/chat/chatWindow';
import Harvest from './pages/cooperative/harvest_plan';
import CommodityInsights from './pages/cooperative/price_trend_insights';
function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Public Routes */}
                    
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/EmailVerification" element={<EmailVerification />} />
                    <Route path="/cooperative_details" element={<CooperativeDetails />} />
                    {/* <Route path="/academy_details" element={<AcademyDetails />} /> */}
                    <Route path="/home" element={<Home />} />

                     {/* cooperative dashboard-related routes  */}
                    <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route index element={<Overview />} />
                        <Route path="overview" element={<Overview />} />
                        <Route path="stock" element={<StockPage />} />
                        <Route path="Orders" element={<OrdersPage />} />
                        <Route path="newProduct" element={<NewProduct />} />
                        <Route  path="allProducts" element={<AllProducts />} />
                        <Route path="coopProfile" element={<CoopProfile />} />
                        <Route path="chat" element={<Chat />} />
                        <Route path="trends" element={<Harvest/>}/>
                        <Route path="commodity_insights" element={<CommodityInsights />} />
                    </Route>
                      {/* academy dashboard-related routes  */}
                      <Route path="/aca_dashboard" element={<DashboardLayout_aca />}>
                      {/* <Route index element={<Overview_acad />} /> */}
                      <Route path="acad_profile" element={<Acad_profile />} />
                      <Route path="acad_orders" element={<Acad_orders />} />
                      <Route path="acad_prediction" element={<Acad_prediction/>} />
                      <Route path="chat" element={<Chat />} />
                      
                      </Route>
                    {/* Fallback route */}
                    <Route path="*" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
