import "./AccountBalance.scss";

function AccountBalance({accountType, solde, balanceType, chiffre}) {

    return (
        <div className="accountBalance">
            <span>
                <p>Argent Bank {accountType} (x{chiffre})</p>
                <h2>${solde}</h2>
                <p>{balanceType} Balance</p>
            </span>
            <button>View transactions</button>
        </div>
    );
}

export default AccountBalance;
