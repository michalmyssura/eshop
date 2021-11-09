import React, {Fragment,useState,useEffect} from "react";
import '../../App.css';
import {useAlert} from "react-alert";
import {useDispatch,useSelector} from "react-redux";
import MetaData from "../layouts/MetaData";
import {forgotPassword, clearErrors} from "../../actions/userAction";


const ForgotPassword = () =>{
    const [email, setEmail] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();


    const {error, message,loading} = useSelector(state => state.forgotPassword);


    useEffect(() => {


        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (message) {
            alert.success('token został wysłany');
            dispatch(clearErrors());

        }

    }, [dispatch, alert, error,message])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('email', email);

        dispatch(forgotPassword(formData));
    }


    return(
        <Fragment>
        <MetaData title={'Zapomniałeś hasła?'}/>

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onClick={submitHandler}>
                        <h2 className="mb-4">Zapomniałeś hasła?</h2>
                        <div className="form-group">
                            <label htmlFor="email_field">Podaj maila</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}

                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3" disabled={loading ? true:false}>
                        Wyślij wiadomość
                        </button>

                    </form>
                </div>
            </div>



        </Fragment>
    )



}

export default ForgotPassword;
