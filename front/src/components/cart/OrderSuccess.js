import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from "../layouts/MetaData";
const OrderSuccess = () => {
    return (
        <Fragment>

            <MetaData title={'Order Success'} />

            <div className="row justify-content-center">
                <div className="col-6 mt-5 text-center">
                    <img className="my-5 img-fluid d-block mx-auto" src="images/success.png" alt="Order Success" width="300" height="300" />

                    <h2>Zamówienie zostało złożone poprawnie.</h2>

                    <Link to="/orders/me">Przejdź do zamówień</Link>
                </div>

            </div>

        </Fragment>
    )
}

export default OrderSuccess
