import "./Header.scss";
import logo from "../../assets/img/logo.png";
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

function Header() {
    return (
        <header className={"flexContainer"}>
            <Link to="/">
                <img src={logo} alt="Logo ArgentBank"/>
            </Link>
            <nav>
                <Link to="/Login">
                    <FontAwesomeIcon icon={faCircleUser} />
                    Sign in</Link>
            </nav>
        </header>
    );
}

export default Header;
