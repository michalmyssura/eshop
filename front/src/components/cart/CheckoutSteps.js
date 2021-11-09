import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({ confirmOrder,shipping , payment }) => {
    return (
        <div className="checkout-progress d-flex justify-content-center mt-5">

            {shipping ? <Link to='shippping' className="float-right">
                <div className="triangle2-active"></div>
                <div className="step active-step">Adres dostawy</div>
                <div className="triangle-active"></div>
            </Link> : <Link to="#!" disabled>
                <div className="triangle2-incomplete"></div>
                <div className="step incomplete">Adres dostawy</div>
                <div className="triangle-incomplete"></div>
            </Link>}

            {confirmOrder ? <Link to='/order/confirm' className="float-right">
                <div className="triangle2-active"></div>
                <div className="step active-step">Podsumowanie zamówienia</div>
                <div className="triangle-active"></div>
            </Link> : <Link to="#!" disabled>
                <div className="triangle2-incomplete"></div>
                <div className="step incomplete">Podsumowanie zamówienia</div>
                <div className="triangle-incomplete"></div>
            </Link>}

            {payment ? <Link to='/payment' className="float-right">
                <div className="triangle2-active"></div>
                <div className="step active-step">Płatność</div>
                <div className="triangle-active"></div>
            </Link> : <Link to="#!" disabled>
                <div className="triangle2-incomplete"></div>
                <div className="step incomplete">Płatność</div>
                <div className="triangle-incomplete"></div>
            </Link>}

        </div>
    )
}

export default CheckoutSteps
