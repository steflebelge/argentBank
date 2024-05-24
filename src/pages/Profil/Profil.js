import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import "./Profil.scss";
import IndexFeature from "../../components/IndexFeature/IndexFeature";
import AccountBalance from "../../components/AccountBalance/AccountBalance";
import {validateForm} from "../../utils/formValidator";
import {useUpdateProfileMutation} from "../../utils/api";
import {setFirstname, setLastname} from "../../features/user/userSlice";

function Profil() {
    const firstname = useSelector((state) => state.user.firstname);
    const lastname = useSelector((state) => state.user.lastname);
    const [profileUser, {isLoadingProfile, errorProfile, dataProfile}] = useUpdateProfileMutation();
    const navigate = useNavigate();
    const [isFormActive, setIsFormActive] = useState(false);
    const accountsInfos = [
        {
            accountType: "Checking",
            solde: "2,082.79",
            balanceType: "Available",
            chiffre: 8349,
        },
        {
            accountType: "Savings",
            solde: "10,928.42",
            balanceType: "Available",
            chiffre: 6712,
        },
        {
            accountType: " Credit Card",
            solde: "184.30",
            balanceType: "Current",
            chiffre: 8349,
        },
    ];
    const dispatch = useDispatch();

    //verification si user logué, si oui -> profile
    useEffect(() => {
        if (!firstname)
            navigate('/login');
    }, []);

    async function handleUpdateProfile() {
        let dataToSend = {
            firstName: "",
            lastName: "",
        }
        document.forms[0].querySelectorAll('input').forEach(function (inputTmp) {
            dataToSend[inputTmp.id] = inputTmp.value;
        });

        try {
            await profileUser(dataToSend).unwrap();
            //recuperation de la data utilisateur
            let responseProfile = await profileUser({}).unwrap();
            if(responseProfile.status === 200) {
                dispatch(setFirstname(responseProfile.body.firstName));
                dispatch(setLastname(responseProfile.body.lastName));
            }
        } catch (error) {
            console.error('Failed to update resource:', error);
        }
    }

    return (
        <div id="profil">
            <section id="userInfos">
                {isFormActive ? (
                    <form>
                        <h1>Welcome back <br/></h1>
                        <span>
                            <div className="input">
                                <input id="firstName" minLength={2} type="text" placeholder={firstname}/>
                                <p className="error"></p>
                            </div>
                            <div className="input">
                                <input id="lastName" minLength={2} type="text" placeholder={lastname}/>
                                <p className="error"></p>
                            </div>
                        </span>
                        <span>
                            <button onClick={() => {
                                validateForm() && handleUpdateProfile()
                            }} type="button">Save</button>
                            <button onClick={() => setIsFormActive(!isFormActive)} type="button">Cancel</button>
                        </span>
                    </form>
                ) : (
                    <>
                        <h1>Welcome back <br/> {firstname} {lastname} !</h1>
                        <button onClick={() => setIsFormActive(!isFormActive)}>Edit Name</button>
                    </>
                )}
            </section>
            <section id="accountInfos">
                {accountsInfos && (
                    accountsInfos.map((accountTmp, index) => (
                        <AccountBalance
                            key={index}
                            accountType={accountTmp.accountType}
                            solde={accountTmp.solde}
                            balanceType={accountTmp.balanceType}
                            chiffre={accountTmp.chiffre}
                        />
                    ))
                )}
            </section>
        </div>
    );
}

export default Profil;
