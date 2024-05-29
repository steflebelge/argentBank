import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useForm} from 'react-hook-form';
import "./Profil.scss";
import AccountBalance from "../../components/AccountBalance/AccountBalance";
import {useProfileMutation, useUpdateProfileMutation} from "../../utils/api";
import {setFirstname, setLastname} from "../../features/user/userSlice";

function Profil() {
    const firstname = useSelector((state) => state.user.firstname);
    const lastname = useSelector((state) => state.user.lastname);
    const [updateProfileUser, {
        updateisLoadingProfile,
        updateerrorProfile,
        updatedataProfile
    }] = useUpdateProfileMutation();
    const [profileUser, {isLoadingProfile, errorProfile, dataProfile}] = useProfileMutation();
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
    const {register, handleSubmit, formState: {errors}} = useForm();

    //verification si user logué, si oui -> profile
    useEffect(() => {
        if (!firstname)
            navigate('/login');
    }, []);

    async function handleUpdateProfile(data) {
        try {
            await updateProfileUser(data).unwrap();
            //recuperation de la data utilisateur
            let responseProfile = await profileUser({}).unwrap();
            if (responseProfile.status === 200) {
                dispatch(setFirstname(responseProfile.body.firstName));
                dispatch(setLastname(responseProfile.body.lastName));
                setIsFormActive(!isFormActive);
            }
        } catch (error) {
            console.error('Failed to update resource:', error);
        }
    }

    return (
        <main id="profil">
            <section id="userInfos">
                {isFormActive ? (
                    <form onSubmit={handleSubmit(handleUpdateProfile)}>
                        <h1>Welcome back <br/></h1>
                        <span>
                            <div className="input">
                                <input
                                    placeholder="firstname"
                                    defaultValue={firstname}
                                    type="text"
                                    {...register('firstName', {
                                        required: true,
                                        minLength: 2,
                                    })}
                                />
                                {errors.firstName && errors.firstName.type === "required" && (
                                    <p className="error">Champs requis</p>
                                )}
                                {errors.firstName && errors.firstName.type === "minLength" && (
                                    <p className="error">Longueur minimale de deux caractères</p>
                                )}
                            </div>
                            <div className="input">
                                <input
                                    placeholder="lastName"
                                    defaultValue={lastname}
                                    type="text"
                                    {...register('lastName', {
                                        required: true,
                                        minLength: 2,
                                    })}
                                />
                                {errors.lastName && errors.lastName.type === "required" && (
                                    <p className="error">Champs requis</p>
                                )}
                                {errors.lastName && errors.lastName.type === "minLength" && (
                                    <p className="error">Longueur minimale de deux caractères</p>
                                )}
                            </div>
                        </span>
                        <span>
                            <button type="submit">Save</button>
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
        </main>
    );
}

export default Profil;
