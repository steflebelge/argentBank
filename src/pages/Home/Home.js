import "./Home.scss";
import imagefond from "../../assets/img/bank-tree.jpeg";
import imagechat from "../../assets/img/icon-chat.png";
import imagemoney from "../../assets/img/icon-money.png";
import imagesecurity from "../../assets/img/icon-security.png";

function Home(){
    return(
        <main id="home" className="flexContainer">
            <section>
                <img src={imagefond} alt="image de fonds"/>
                <div>
                    <p>No fees.</p>
                    <p>No minimum deposit.</p>
                    <p>High interest rates.</p>
                    <p>Open a savings account with Argent Bank today!</p>
                </div>
            </section>
            <section className="flexContainer">
                <div className="flexContainer">
                    <img src={imagechat} alt=""/>
                    <h3>You are our #1 priority</h3>
                    <p>Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes. </p>
                </div>
                <div className="flexContainer">
                    <img src={imagemoney} alt=""/>
                    <h3>More savings means higher rates</h3>
                    <p>The more you save with us, the higher your interest rate will be!</p>
                </div>
                <div className="flexContainer">
                    <img src={imagesecurity} alt=""/>
                    <h3>Security you can trust</h3>
                    <p>We use top of the line encryption to make sure your data and money is always safe.</p>
                </div>
            </section>
        </main>
    );
}

export default Home;
