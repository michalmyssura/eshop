import React, {Fragment,useState,useEffect} from "react";
import '../../App.css';
import {useAlert} from "react-alert";
import {useDispatch,useSelector} from "react-redux";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import {Link} from "react-router-dom";
import {login,clearErrors} from "../../actions/userAction";

const Login = ({history,location}) =>{

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')
    const dispatch = useDispatch();
    const alert = useAlert();
    const redirect = location.search? location.search.split('=')[1]:'/'

    const {isAuthenticated,error,loading} = useSelector(state => state.auth);



    useEffect(()=> {

        if(isAuthenticated){

            history.push(redirect);
        }

        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

    },[dispatch, alert, isAuthenticated, error, history])

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(login(email,password))
    }


    return(
        <Fragment>
            {loading? <Loader/> :(
                <Fragment>
                    <MetaData title={'login'}/>
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-3">Logowanie</h1>
                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password_field">Hasło</label>
                                    <input
                                        type="password"
                                        id="password_field"
                                        className="form-control"
                                        value={password}
                                        onChange={(e)=>setPassword(e.target.value)}
                                    />
                                </div>

                                <Link to="/password/forgot" className="float-right mb-4">Zapomniałeś hasła ? </Link>

                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                >
                                    Zaloguj
                                </button>

                                <Link to="/register" className="float-right mt-3">Nowy użytkownik?</Link>
                            </form>
                        </div>
                    </div>


                </Fragment>
            )}
        </Fragment>
    )


}

export default Login;
