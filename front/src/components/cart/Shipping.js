import React, { Fragment, useState } from 'react'
import { countries } from 'countries-list'

import CheckoutSteps from "./CheckoutSteps";
import { useDispatch, useSelector } from 'react-redux'
import {saveShippingInfo} from "../../actions/cartAction";
import MetaData from "../layouts/MetaData";
const Shipping = ({ history }) => {

    const countriesList = Object.values(countries)

    const { shippingInfo } = useSelector(state => state.cart)

    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode)
    const [phoneNumber, setPhoneNo] = useState(shippingInfo.phoneNumber)
    const [country, setCountry] = useState(shippingInfo.country)

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(saveShippingInfo({ address, city, phoneNumber, postalCode, country }))
        history.push('/confirm')
    }

    return (
        <Fragment>
            <MetaData title={'Shipping Info'} />
            <CheckoutSteps shipping/>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Adres Dostawy</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Adres</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">Miasto</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Numer Telefonu</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Kod pocztowy</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Państwo</label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            >

                                {countriesList.map(country => (
                                    <option key={country.name} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}

                            </select>
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            Kontynuuj
                        </button>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Shipping
