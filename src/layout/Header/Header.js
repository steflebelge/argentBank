import "./Header.scss";
import logo from "../../assets/img/logo.png";
import {Link, useNavigate} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleUser, faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../features/user/userSlice";

function Header() {
    const firstname = useSelector((state) => state.user.firstname);
    // console.log("firstnameRedux : " + firstname);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleLogout() {
        dispatch(logout());
        navigate('/');
    }

    return (
        <header className={"flexContainer"}>
            <Link to="/">
                <img src={logo} alt="Logo ArgentBank"/>
            </Link>
            <nav>
                {firstname ? (
                    <>
                        <Link to={"/profil"}>
                            <FontAwesomeIcon icon={faCircleUser}/>
                            {firstname}
                        </Link>
                        <button onClick={handleLogout}>
                            <FontAwesomeIcon icon={faRightFromBracket}/>
                            Sign Out
                        </button>
                    </>
                ) : (
                    <Link to="/Login">
                        <FontAwesomeIcon icon={faCircleUser}/>
                        Sign in</Link>
                )}
            </nav>
        </header>
    );
}

export default Header;
