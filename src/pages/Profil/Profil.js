import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import "./Profil.scss";

function Profil() {
    const firstname = useSelector((state) => state.user.firstname);
    const lastname = useSelector((state) => state.user.lastname);
    const navigate = useNavigate();

    //verification si user logué, si oui -> profile
    useEffect(() => {
        if(!firstname)
            navigate('/login');
    }, []);

    return (
        <div id="profil">
            <section id="accountInfos">
                <h1>Welcome back <br/> {firstname} {lastname} !</h1>
                <button>Edit Name</button>
            </section>
        </div>
    );
}

export default Profil;
