import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';

import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import Sidebar from './Sidebar'

import { useDispatch, useSelector } from 'react-redux'

import { getAdminProducts } from '../../actions/productAction'
import {allOrders} from "../../actions/orderActions";
import {allUsers} from "../../actions/userAction";

const Dashboard = () => {

    const dispatch = useDispatch();

    const { products } = useSelector(state => state.products)
    const { users } = useSelector(state => state.allUsers)
    const { orders, amount, loading } = useSelector(state => state.allOrders)

    let outOfStock = 0;
    products.forEach(product => {
        if (product.stock === 0) {
            outOfStock += 1;
        }
    })

    useEffect(() => {
        dispatch(getAdminProducts())
       dispatch(allOrders())
       dispatch(allUsers())
    }, [dispatch])

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <h1 className="my-4">Dashboard</h1>

                    {loading ? <Loader /> : (
                        <Fragment>
                            <MetaData title={'Admin Dashboard'} />

                            <div className="row pr-4">
                                <div className="col-xl-12 col-sm-12 mb-3">
                                    <div className="card text-white bg-dark o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Podsumowanie<br />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row pr-4">
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-dark o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Produkty<br /> <b>{products && products.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                            <span className="float-left">Pokaż szczegóły</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-dark o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Zamówienia<br /> <b>{orders && orders.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                            <span className="float-left">Pokaż szczegóły</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-dark o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Użytkownicy<br /> <b>{users && users.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                            <span className="float-left">Pokaż szczegóły</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-dark o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Produkty z brakiem magazynowym<br /> <b>{outOfStock}</b></div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </Fragment>
                        )}

                </div>
            </div>

        </Fragment >
    )
}

export default Dashboard
