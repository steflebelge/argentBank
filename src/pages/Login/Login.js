import "./Login.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser} from "@fortawesome/free-solid-svg-icons";
import {validateForm} from "../../utils/formValidator";
import {useLoginMutation} from "../../utils/api";

function Login() {
    const [loginUser, { isLoading, error, data }] = useLoginMutation();

    const handleLogin = async () => {
        debugger
        try {
            // await loginUser({userMail, userPwd}).unwrap();
            debugger
            // Gérer le succès de la connexion
        } catch (err) {
            // Gérer les erreurs
            console.error('Failed to login: ', err);
            debugger
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
                                // value={userMail || ''}
                                // onChange={handleInputChange}
                                required
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                type="mail"/>
                            <p className="error"></p>
                        </label>
                    </div>
                    <div className="input">
                        <label>
                            Password
                            <input
                                // value={userPwd || ''}
                                // onChange={handleInputChange}
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
