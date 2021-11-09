import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {
    productReducer,
    productsReducer,
    productDetailsReducer,
    newReviewReducer,
    newProductReducer,
    productReviewsReducer, reviewReducer
} from "./reducer/productReducer";
import {
    authReducer,
    userReducer,
    forgotPasswordReducer,
    allUsersReducer,
    userDetailsReducer
} from "./reducer/userReducer";
import {cartReducer} from "./reducer/cartReducer";
import {
    newOrderReducer,
    myOrdersReducer,
    orderDetailsReducer,
    allOrdersReducer,
    orderReducer
} from "./reducer/orderReducer";



const reducer = combineReducers({
    product:productReducer,
    productDetails:productDetailsReducer,
    products:productsReducer,
    auth:authReducer,
    user:userReducer,
    forgotPassword:forgotPasswordReducer,
    cart: cartReducer,
    newOrder:newOrderReducer,
    myOrders:myOrdersReducer,
    orderDetails:orderDetailsReducer,
    newReview:newReviewReducer,
    newProduct:newProductReducer,
    allOrders:allOrdersReducer,
    order:orderReducer,
    allUsers:allUsersReducer,
    userDetails:userDetailsReducer,
    productReviews:productReviewsReducer,
    review:reviewReducer


})

let initialState = {}

const middleware = [thunk];

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;
