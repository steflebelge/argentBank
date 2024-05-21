import "./Header.scss";
import logo from "../../assets/img/logo.png";
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleUser, faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import {useSelector} from "react-redux";

function Header() {
    const firstname = useSelector((state) => state.user.firstname);

    function handleLogout() {
        alert('todo');
    }

    return (
        <header className={"flexContainer"}>
            <Link to="/">
                <img src={logo} alt="Logo ArgentBank"/>
            </Link>
            <nav>
                {firstname ? (
                    <>
                        <p>
                            <FontAwesomeIcon icon={faCircleUser}/>
                            {firstname}
                        </p>
                        <button onClick={handleLogout}>
                            <FontAwesomeIcon icon={faRightFromBracket}/>
                            Sign out
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
