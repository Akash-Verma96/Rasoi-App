import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./components/Home/Home.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Category from "./components/Category/Category.jsx";
import Login from "./components/Login/Login.jsx";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";
import MealDetail from "./components/Meal Detail/MealDetail.jsx";
import Onboarding from "./components/Onboarding/Onboarding.jsx";
import Onboarding2 from "./components/Onboarding/Onboarding2.jsx";
import Dashboard from "./pages/restaurant/Dashboard.jsx";
import AddMeal from "./pages/restaurant/AddMeal.jsx";
import Address from "./components/Address/Address.jsx";
import PaymentPage from "./components/PaymentPage/PaymentPage.jsx";
import RestaurantProfile from "./pages/restaurant/RestaurantProfile.jsx";
import Orders from "./components/Orders/Orders.jsx";
import OrderDetail from "./components/Orders/OrderDetail.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'react-loading-skeleton/dist/skeleton.css';
import RestaurantMeals from "./pages/restaurant/RestaurantMeals.jsx";
import RestaurantLayout from "./pages/restaurant/RestaurantLayout.jsx";
import RestaurantOrder from "./pages/restaurant/RestaurantOrder.jsx";
import RestaurantSetting from "./pages/restaurant/RestaurantSetting.jsx";
import AdminPanel from "./pages/admin/AdminPanel.jsx";




function App() {
  return (
    <>
      <ToastContainer/>
      <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="Onboarding2" element={<Onboarding2 />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/home" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orderDetail" element={<OrderDetail />} />
            <Route path="category" element={<Category />} />
            <Route path="profile" element={<Profile />} />
            <Route path="address" element={<Address />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route path="mealDetail/:mealId" element={<MealDetail />} />
          </Route>


          <Route path="/restaurant/Profile" element={<RestaurantProfile />} />
          <Route path="/restaurant/addMeal" element={<AddMeal />} />

          <Route path="/restaurant" element={<RestaurantLayout />} >
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="meals" element={<RestaurantMeals />} />
            <Route path="orders" element={<RestaurantOrder />} />
            <Route path="setting" element={<RestaurantSetting />} />
          </Route>

          <Route path="/admin" >
            <Route path="" element={<AdminPanel />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
