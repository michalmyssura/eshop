import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'

import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, clearErrors } from '../../actions/orderActions'

const OrderDetails = ({ match }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, order = {} } = useSelector(state => state.orderDetails)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order

    useEffect(() => {
        dispatch(getOrderDetails(match.params.id));

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error, match.params.id])

    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`

    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false

    return (
        <Fragment>
            <MetaData title={'Order Details'} />

            {loading ? <Loader /> : (
                <Fragment>
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8 mt-5 order-details">

                            <h1 className="my-5">Zamówienie # {order._id}</h1>

                            <h4 className="mb-4">Informacje o adresie dostawy</h4>
                            <p><b>Imię:</b> {user && user.name}</p>
                            <p><b>Telefon:</b> {shippingInfo && shippingInfo.phoneNumber}</p>
                            <p className="mb-4"><b>Address:</b>{shippingDetails}</p>
                            <p><b>Koszt:</b>{totalPrice} zł</p>

                            <hr />

                            <h4 className="my-4">Płatność</h4>
                            <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "Zapłacone" : "Nie zapłacone"}</b></p>


                            <h4 className="my-4">Status zamówienia:</h4>
                            <p className={order.orderStatus && String(order.orderStatus).includes('Dostarczone') ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p>


                            <h4 className="my-4">Zamówione przedmioty:</h4>

                            <hr />
                            <div className="cart-item my-1">
                                {orderItems && orderItems.map(item => (
                                    <div key={item.product} className="row my-5">
                                        <div className="col-4 col-lg-2">
                                            <img src={item.image} alt={item.name} height="45" width="65" />
                                        </div>

                                        <div className="col-5 col-lg-5">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>


                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p>{item.price} zł</p>
                                        </div>

                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <p>{item.quantity} Produkt(y)</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <hr />
                        </div>
                    </div>
                </Fragment>
            )}

        </Fragment>
    )
}

export default OrderDetails
