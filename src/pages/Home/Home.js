import "./Home.scss";
import imagefond from "../../assets/img/bank-tree.jpeg";
import imagechat from "../../assets/img/icon-chat.png";
import imagemoney from "../../assets/img/icon-money.png";
import imagesecurity from "../../assets/img/icon-security.png";
import IndexFeature from "../../components/IndexFeature/IndexFeature";

function Home() {
    const featuresArray = [
            {
                img: imagechat,
                title: "You are our #1 priority",
                text: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
            },
            {
                img: imagemoney,
                title: "More savings means higher rates",
                text: "The more you save with us, the higher your interest rate will be!"
            },
            {
                img: imagesecurity,
                title: "Security you can trust",
                text: "We use top of the line encryption to make sure your data and money is always safe."
            },
        ];

    return (
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
                {featuresArray && (
                    featuresArray.map((featureTmp, index) => (
                        <IndexFeature
                            key={index}
                            img={featureTmp.img}
                            title={featureTmp.title}
                            text={featureTmp.text}
                        />
                    ))
                )}
            </section>
        </main>
    );
}

export default Home;
