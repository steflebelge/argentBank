import "./Login.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser} from "@fortawesome/free-solid-svg-icons";
import {useLoginMutation, useProfileMutation} from "../../utils/api";
import {useDispatch, useSelector} from "react-redux";
import {setEmail, setPassword, setToken, setFirstname, setLastname} from "../../features/user/userSlice";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from 'react-hook-form';


function Login() {
    const [loginUser, {isLoadingLogin, errorLogin, dataLogin}] = useLoginMutation();
    const [profileUser, {isLoadingProfile, errorProfile, dataProfile}] = useProfileMutation();
    const email = useSelector((state) => state.user.email);
    const password = useSelector((state) => state.user.password);
    const firstname = useSelector((state) => state.user.firstname);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm();


    //verification si user logué, si oui -> profile
    useEffect(() => {
        if (firstname)
            navigate('/profil');
    }, []);

    const handleEmailChange = (e) => {
        debugger
        dispatch(setEmail(e.target.value));
    };

    const handlePasswordChange = (e) => {
        dispatch(setPassword(e.target.value));
    };

    async function handleLogin(data) {
        try {
            const responseLogin = await loginUser(data).unwrap();

            if (!responseLogin.body?.token)
                throw new Error();

            dispatch(setToken(responseLogin.body.token));
            // console.log("token : " + responseLogin.body.token);

            //recuperation de la data utilisateur
            let responseProfile = await profileUser({}).unwrap();
            if (responseProfile.status === 200) {
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
    }

    return (
        <main id="login" className="flexContainer">
            <div className="flexContainer">
                <FontAwesomeIcon icon={faCircleUser}/>
                <h1>Sign In</h1>

                <form onSubmit={handleSubmit(handleLogin)}>
                <div className="input">
                        <label>
                            Username
                            <input
                                placeholder="email"
                                defaultValue={email}
                                type="text"
                                {...register('email', {
                                    required: true,
                                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                                })}
                            />
                            {errors.email && errors.email.type === "required" && (
                                <p className="error">Champs requis</p>
                            )}
                            {errors.email && errors.email.type === "pattern" && (
                                <p className="error">Veuillez vérifier votre email</p>
                            )}
                        </label>
                    </div>
                    <div className="input">
                        <label>
                            Password
                            <input
                                placeholder="password"
                                defaultValue={password}
                                type="password"
                                {...register('password', {
                                    required: true,
                                    minLength: 3,
                                })}
                            />
                            {errors.password && errors.password.type === "required" && (
                                <p className="error">Champs requis</p>
                            )}
                            {errors.password && errors.password.type === "minLength" && (
                                <p className="error">Longueur minimale de trois caractères</p>
                            )}
                        </label>
                    </div>
                    <div id="cac" className="input">
                        <label>
                            Remember me
                            <input type="checkbox"/>
                        </label>
                    </div>
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </main>
    );
}

export default Login;
