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

// import ProductDisplay from './pages/cooperative/product_display';
import CoopProfile from './pages/cooperative/profile';
import Overview from './pages/cooperative/overview';
import DashboardLayout_aca from './pages/academy/acad_dashboard';
import Overview_acad from './pages/academy/acad_overview';
import Acad_profile from './pages/academy/academy_details';
import Acad_orders from './pages/academy/acad_orders';
import Acad_prediction from './pages/academy/acad_pricePrediction';
import HomePage from './pages/home';
import Chat from './pages/chat/chatWindow';
import Harvest from './pages/cooperative/commodity_trend';
import CommodityInsights from './pages/cooperative/price_trend_insights';
import Plan from './pages/cooperative/plan';
import CoopReport from './pages/cooperative/cop_reports';
import CopAnalytics from './pages/cooperative/cop_analytics';
import AcadAnalytics from './pages/academy/acad_analytics';
import AdminDashboard from './pages/admin/admin_dashboard';
import AdminPriceUploadPage from './pages/admin/admin_price';
import AdminOverview from './pages/admin/admin_overview';
import AdminUsers from './pages/admin/admin_users';
import AdminAnalytics from './pages/admin/admin_analytics';
import AdminProgramReachReport from './pages/admin/admin_program_reach_report';
import AcademyFinancialReport from './pages/admin/academy_financial_report';
import CooperativesPage from './pages/academy/cooperatives_page';
import ProductDisplayCooperatives from './pages/cooperative/product_display';
// import newProduct from './pages/product/newProduct'
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
                    <Route path="/product_display_cooperatives" element={<ProductDisplayCooperatives />} />

                    {/* <Route path="/newProduct" element={<newProduct />} /> */}

                    {/* <Route path="/product_display" element={<ProductDisplay />} /> */}


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
                        <Route  path="plan" element={<Plan/>}/>
                        <Route path="report" element={<CoopReport/>}/>
                        <Route path="analytics" element={<CopAnalytics/>}/>
                    </Route>

                      {/* academy dashboard-related routes  */}
                      <Route path="/aca_dashboard" element={<DashboardLayout_aca />}>
                      <Route index element={<Overview_acad />} />
                      <Route path="acad_profile" element={<Acad_profile />} />
                      <Route path="acad_orders" element={<Acad_orders />} />
                      <Route path="acad_prediction" element={<Acad_prediction/>} />
                      <Route path="chat" element={<Chat />} />
                      <Route path="analytics" element={<AcadAnalytics/>}/>
                      <Route path="cooperatives_page" element={<CooperativesPage/>}/>
                    
                       

                    <Route path="overview" element={<Overview_acad/>}/>
                      

                      
                      </Route>
                      <Route path="/admin-dashboard" element={<AdminDashboard />}>
                        <Route path="price" element={<AdminPriceUploadPage />} />
                        <Route index element={<AdminOverview />} />
                        <Route path="users" element={<AdminUsers />} />
                        <Route path="program-reach-report" element={<AdminProgramReachReport />} />
                        <Route path="academy-financial-report" element={<AcademyFinancialReport />} />
                        <Route path="analytics" element={<AdminAnalytics />}/>
                      </Route>
                    {/* Fallback route */}
                    <Route path="*" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
