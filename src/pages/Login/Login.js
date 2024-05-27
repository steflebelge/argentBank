import "./Login.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser} from "@fortawesome/free-solid-svg-icons";
import {validateForm} from "../../utils/formValidator";
import {useLoginMutation, useProfileMutation} from "../../utils/api";
import {useDispatch, useSelector} from "react-redux";
import {setEmail, setPassword, setToken, setFirstname, setLastname} from "../../features/user/userSlice";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

function Login() {
    const [loginUser, {isLoadingLogin, errorLogin, dataLogin}] = useLoginMutation();
    const [profileUser, {isLoadingProfile, errorProfile, dataProfile}] = useProfileMutation();
    const email = useSelector((state) => state.user.email);
    const password = useSelector((state) => state.user.password);
    const firstname = useSelector((state) => state.user.firstname);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //verification si user logué, si oui -> profile
    useEffect(() => {
        if(firstname)
            navigate('/profil');
    }, []);

    const handleEmailChange = (e) => {
        dispatch(setEmail(e.target.value));
    };

    const handlePasswordChange = (e) => {
        dispatch(setPassword(e.target.value));
    };

    const handleLogin = async () => {
        try {
            const responseLogin = await loginUser({email, password}).unwrap();

            if (!responseLogin.body?.token)
                throw new Error();

            dispatch(setToken(responseLogin.body.token));
            // console.log("token : " + responseLogin.body.token);

            //recuperation de la data utilisateur
            let responseProfile = await profileUser({}).unwrap();
            if(responseProfile.status === 200) {
                dispatch(setFirstname(responseProfile.body.firstName));
                dispatch(setLastname(responseProfile.body.lastName));
            }

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

                <form>
                    <div className="input">
                        <label>
                            Username
                            <input
                                value={email}
                                onChange={handleEmailChange}
                                required
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
                            <input type="checkbox"/>
                        </label>
                    </div>
                    <button type="button" onClick={() => {
                        validateForm() && handleLogin()
                    }}>Sign In
                    </button>
                </form>
            </div>
        </main>
    );
}

export default Login;
