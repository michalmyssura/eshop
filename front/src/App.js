import {BrowserRouter as Router,Route} from "react-router-dom";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Homepage from "./components/layouts/Homepage";
import ProductDetails from "./components/product/ProductDetails"
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import {loadUser} from "./actions/userAction";
import store from "./Store";
import {useEffect} from "react";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/user/updateProfile";
import UpdatePassword from "./components/user/updatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import MyOrders from "./components/order/MyOrders";
import NewPassword from "./components/user/NewPassword";
import Cart from "./components/cart/Cart";
import OrderDetails from "./components/order/OrderDetails";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";
import AllProducts from "./components/admin/AllProducts";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import Dashboard from "./components/admin/Dashboard";
import UpdateUser from "./components/admin/UpdateUser";
import OrderProcess from "./components/admin/OrderProcess";
import {useState} from "react";
import axios from "axios";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import AllOrders from "./components/admin/AllOrders";
import AllUsers from "./components/admin/AllUsers";
import AllReviews from "./components/admin/AllReviews";
function App() {

    const [stripeApiKey, setStripeApiKey] = useState('');

    useEffect(() => {
        store.dispatch(loadUser())

        async function getStripApiKey() {
            const { data } = await axios.get('/api/v1/stripeapi');

            setStripeApiKey(data.stripeApiKey)
        }

        getStripApiKey();

    }, [])

  return (

        <Router>
            <div className="App">
        <Header/>
                <div className="container container-xxl">
                <Route path = "/" component={Homepage} exact/>
                    <Route path = "/search/:keyword" component={Homepage} />
                    <Route path='/product/:id' component={ProductDetails}exact/>
                    <Route path = '/login' component = {Login} />
                    <Route path = '/cart' component = {Cart} />
                    <ProtectedRoute path = '/shipping' component = {Shipping} />
                    <ProtectedRoute path = '/confirm' component = {ConfirmOrder} exact />
                    <ProtectedRoute path = '/success' component = {OrderSuccess} />
                    <ProtectedRoute path = '/orders/me' component = {MyOrders} exact />
                    <ProtectedRoute path = '/order/:id' component = {OrderDetails}exact />

                    {stripeApiKey &&
                    <Elements stripe={loadStripe(stripeApiKey)}>
                        <ProtectedRoute path="/payment" component={Payment} />
                    </Elements>
                    }








                    <Route path = "/register" component = {Register} />
                    <Route path = "/password/forgot" component = {ForgotPassword}exact />
                    <Route path = "/password/reset/:token" component = {NewPassword}exact />
                    <ProtectedRoute path="/me" component={Profile} exact/>
                    <ProtectedRoute path="/me/update" component={UpdateProfile} exact/>
                    <ProtectedRoute path="/me/password/update" component={UpdatePassword} exact/>




                </div>
                <ProtectedRoute path = '/dashboard'  isAdmin={true} component = {Dashboard}exact />
                <ProtectedRoute path = '/admin/products' isAdmin={true} component = {AllProducts} exact />
                <ProtectedRoute path = '/admin/product'  isAdmin={true} component = {NewProduct}exact />
                <ProtectedRoute path = '/admin/order/:id' component = {OrderProcess}exact />
                <ProtectedRoute path = '/admin/users' component = {AllUsers}exact />
                <ProtectedRoute path = '/admin/user/:id' component = {UpdateUser}exact />
                <ProtectedRoute path = '/admin/reviews' component = {AllReviews}exact />
                <ProtectedRoute path = '/admin/product/:id' component = {UpdateProduct}exact />
                <ProtectedRoute path = '/admin/orders' component = {AllOrders}exact />







                <Footer/>
            </div>
        </Router>

  );
}

export default App;
