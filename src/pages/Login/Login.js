import "./Login.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser} from "@fortawesome/free-solid-svg-icons";
import {validateForm} from "../../utils/formValidator";
import {useLoginMutation} from "../../utils/api";
import {useDispatch, useSelector} from "react-redux";
import {setEmail, setPassword, setToken} from "../../features/user/userSlice";
import { useNavigate } from 'react-router-dom';

function Login() {
    const [loginUser, {isLoading, error, data}] = useLoginMutation();
    const email = useSelector((state) => state.user.email);
    const password = useSelector((state) => state.user.password);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        dispatch(setEmail(e.target.value));
    };

    const handlePasswordChange = (e) => {
        dispatch(setPassword(e.target.value));
    };

    const handleLogin = async () => {
        try {
            const response = await loginUser({email, password}).unwrap();

            if (!response.body?.token)
                throw new Error();

            dispatch(setToken(response.body.token));
            console.log("token : " + response.body.token);
            navigate('/profil');
        } catch (err) {
            // Gestion des cas d'erreurs
            let error = "Une erreur est survenue";

            if (err.data?.message)
                error = err.data.message;

            alert(error);
        }
    };

    return (
        <main id="login" className="flexContainer">
            <div className="flexContainer">
                <FontAwesomeIcon icon={faCircleUser}/>
                <h1>Sign In</h1>

                <form action="#">
                    <div className="input">
                        <label>
                            Username
                            <input
                                value={email}
                                onChange={handleEmailChange}
                                required
                                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                                type="mail"/>
                            <p className="error"></p>
                        </label>
                    </div>
                    <div className="input">
                        <label>
                            Password
                            <input
                                value={password}
                                onChange={handlePasswordChange}
                                required
                                type="password"
                                minLength={3}/>
                            <p className="error"></p>
                        </label>
                    </div>
                    <div id="cac" className="input">
                        <label>
                            Remember me
                            <input required type="checkbox"/>
                            <p className="error"></p>
                        </label>
                    </div>
                    <button onClick={() => {
                        validateForm() && handleLogin()
                    }}>Sign In
                    </button>
                </form>
            </div>
        </main>
    );
}

export default Login;
