import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from 'react-redux'
import {addItemToCart,removeItemFromCart} from "../../actions/cartAction";

const Cart = ({ history }) => {

    const dispatch = useDispatch();

    const { cartItems } = useSelector(state => state.cart)

    const removeCartItemHandler = (id) => {
        dispatch(removeItemFromCart(id))
    }

    const increaseQuantity = (id, quantity, stock) => {
        const newQuantity = quantity + 1;

        if (newQuantity > stock) return;

        dispatch(addItemToCart(id, newQuantity))
    }


    const decreaseQuantity = (id, quantity) => {

        const newQuantity = quantity - 1;

        if (newQuantity <= 0) return;

        dispatch(addItemToCart(id, newQuantity))

    }




    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Fragment>
            <MetaData title={'Twój koszyk'} />
            {cartItems.length === 0 ?  <h2 className="emptycart" >Twój koszyk jest pusty</h2> : (
                <Fragment>
                    <h2 className="mt-5">Twój koszyk: </h2>

                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">

                            {cartItems.map(item => (
                                <Fragment>
                                    <hr />

                                    <div className="cart-item" key={item.product}>
                                        <div className="row">
                                            <div className="col-4 col-lg-3">
                                                <img src={item.image} alt="Laptop" height="100" width="140" />
                                            </div>

                                            <div className="col-5 col-lg-3">
                                                <Link to={`/products/${item.product}`}>{item.name}</Link>
                                            </div>


                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price">{item.price} zł</p>
                                            </div>

                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <div className="stockCounter d-inline">
                                                    <span className="btn btn-danger minus mr-2 mb-2" onClick={() => decreaseQuantity(item.product, item.quantity)}>-</span>
                                                    <span className="btn btn-primary plus mb-2" onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</span>
                                                    <input type="number" className="form-control count d-inline mx-sm mb-2" value={item.quantity} readOnly />

                                                </div>
                                            </div>

                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => removeCartItemHandler(item.product)} ></i>
                                            </div>

                                        </div>
                                    </div>
                                    <hr />
                                </Fragment>
                            ))}

                        </div>

                        <div className="col-12 col-lg-3 my-4">
                            <div id="summary">
                                <h4>Podsumowanie</h4>
                                <hr />
                                <p>Ilość produktów:  <span className="order-summary-values">{cartItems.reduce((account, item) => (account + Number(item.quantity)), 0)}</span></p>
                                <p>Cena: <span className="order-summary-values">{cartItems.reduce((account, item) => account + item.quantity * item.price, 0).toFixed(2)} zł</span></p>

                                <hr />
                                <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkoutHandler}>Kontynuuj</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Cart
