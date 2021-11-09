import React, {Fragment,useState,useEffect} from "react";
import '../../App.css';
import {useAlert} from "react-alert";
import {useDispatch,useSelector} from "react-redux";
import MetaData from "../layouts/MetaData";
import {updatePassword, loadUser, clearErrors, register, updateProfile} from "../../actions/userAction";
import {UPDATE_PASSWD_RESET,} from "../../constant/userConstants";

const UpdatePassword = ({history}) => {

    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();


    const {user} = useSelector(state => state.auth);
    const {error, isUpdated, loading} = useSelector(state => state.user);


    useEffect(() => {


        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success('Hasło zostało zaktualizowane');
            dispatch(loadUser());
            history.push('/me')

            dispatch({
                type: UPDATE_PASSWD_RESET
            })
        }

    }, [dispatch, alert, error, history, isUpdated])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('oldPassword', oldPassword);
        formData.set('password', password);

        dispatch(updatePassword(formData));
    }

    return(
        <Fragment>
        <MetaData title={'Aktualizacja hasła'}/>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">Zmień hasło</h1>

                        <div className="form-group">
                            <label htmlFor="password_field">Stare hasło</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={oldPassword}
                                onChange={(e)=>setOldPassword(e.target.value)}

                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm_password_field">Nowe hasło</label>
                            <input
                                type="password"
                                id="confirm_password_field"
                                className="form-control"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}

                            />
                        </div>

                        <button
                            id="new_password_button"
                            type="submit"
                            className="btn btn-block py-3" disabled={loading ? true:false}>
                           Zmień hasło
                        </button>

                    </form>
                </div>
            </div>


        </Fragment>
    )

}
export default UpdatePassword;
