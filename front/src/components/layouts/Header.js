import React, {Fragment, useEffect, useState} from "react";
import Search from "./Search";
import '../../App.css'
import {Route} from "react-router";
import {Link} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {useAlert} from "react-alert";
import {logout} from "../../actions/userAction";
import {getCategory} from "../../actions/productAction";

const Header = () =>{
    const alert = useAlert();
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart)
    const [category,setCategory] = useState('')
    const categories = ['Smartfony',
        'Laptopy',
        'Akcesoria',
        'Słuchawki',
        'Klawiatury',
        'Myszki',
        'Huby',



    ]

    const {user,loading} = useSelector(state => state.auth)


    useEffect(()=>{

        dispatch(getCategory(category));

    },[dispatch,category])


    const logoutHandler = () => {
        dispatch(logout());
            alert.success('Wylogowano się pomyślnie');

    }

    return(
        <Fragment>

            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <Link to="/">
                        <img src="/images/Ishoplogo.png" width="150" height="75"/>
                        </Link>
                    </div>
                </div>

                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <Route render={({ history }) => <Search history={history} />} />
                </div>

                <div className="col-10 col-md-3 mt-4 mt-md-0 text-center">

                    <Link to='/cart' style={{textDecoration:'none'}}>

                        <span id="cart" className="ml-1">Koszyk</span>
                    <span className="ml-1" id="cart_count">{cartItems.length}</span>
                    </Link>

                    {user ?(
                        <div className='ml-5 dropdown d-inline'>
                            <Link to='#!'  className="btn btn-secondary dropdown-toggle mr-3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span>Profil użytkownika </span>

                            </Link>
                            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
                                {user && user.role !=='admin'?(
                                    <Link className="dropdown-item" to="/orders/me">Zamówienia</Link>

                                    ):(

                                    <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                )}
                                <Link className="dropdown-item" to="/me">Profil</Link>
                                <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                                    Wyloguj
                                </Link>
                            </div>
                        </div>

                    ):!loading && <Link to="/login" className="btn ml-4" id="login_btn">Zaloguj</Link>}



                </div>

                {categories.map(category =>(
                    <li className='mx-5'
                        style= {{cursor:'pointer',listStyleType:'none'}}
                        key = {category}
                        onClick={() => setCategory(category)}
                    >

                        {category}


                    </li>


                ))}

            </nav>

        </Fragment>
    )



}

export default Header;
