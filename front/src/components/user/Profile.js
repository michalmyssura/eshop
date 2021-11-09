import React,{Fragment} from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
const Profile = () =>{

    const {user,loading} = useSelector(state=> state.auth)

    return (
        <Fragment>
            {loading ? <Loader/> :(
                <Fragment>
                <MetaData title={"Profil użytkownika"}/>
                    <h2 className="myprofile">Mój profil</h2>
                    <div className="row justify-content-around mt-2 user-info">


                        <div className="col-12 col-md-5">
                            <h4>Imię</h4>
                            <p>{user.name}</p>

                            <h4>Email</h4>
                            <p>{user.email}</p>

                            <h4>Rola</h4>
                            <p>{user.role}</p>

                            <h4>Dołączył/Dołączyła</h4>
                            <p>{String(user.createdAt).substring(0,10)}</p>

                            {user.role ==='admin' && (
                            <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                            Moje zamówienia
                            </Link>
                            )}
                            <Link to="me/password/update" className="btn btn-primary btn-block mt-3">
                               Zmień Hasło
                            </Link>
                            <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block mt-3">
                               Edytuj profil
                            </Link>

                        </div>
                    </div>


                </Fragment>

            )}



        </Fragment>
    )



}


export default Profile
