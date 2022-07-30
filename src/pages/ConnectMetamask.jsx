import style from '../assets/css/homepage.module.css'
import img from '../assets/common/img/home.png';
import background from "../assets/common/img/background.png";
import {useMetaMask} from "../hooks/useMetaMask";
import {useNavigate} from "react-router-dom";

export function ConnectMetamask() {
    const context = useMetaMask();
    let navigate = useNavigate();

    function Connect() {
        context.checkMetamaskAvailability().then(r => {
            navigate("/addSeller")
        });
    }

    return (<>
            <section className={style.navbar}>
                <div className={style.max_width}>
                    <div className={style.logo}>
                        <svg viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M46.2492 51.0794L27.4205 18.4671L65.0779 18.4671L46.2492 51.0794Z"
                                  fill="url(#paint0_linear_202_52)"/>
                            <path d="M24.2738 29.1041L43.1025 61.7164H5.44504L24.2738 29.1041Z"
                                  fill="url(#paint1_linear_202_52)"/>
                            <path d="M67.7567 29.1041L86.5854 61.7164H48.9279L67.7567 29.1041Z"
                                  fill="url(#paint2_linear_202_52)"/>
                            <circle cx="46" cy="46" r="44.5" stroke="white" strokeWidth="3"/>
                            <defs>
                                <linearGradient id="paint0_linear_202_52" x1="67.9907" y1="29.3378" x2="24.5077"
                                                y2="29.3378" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#4B6CB7"/>
                                    <stop offset="1" stopColor="#182848"/>
                                </linearGradient>
                                <linearGradient id="paint1_linear_202_52" x1="2.53223" y1="50.8457" x2="46.0153"
                                                y2="50.8457" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#4B6CB7"/>
                                    <stop offset="1" stopColor="#182848"/>
                                </linearGradient>
                                <linearGradient id="paint2_linear_202_52" x1="46.0151" y1="50.8457" x2="89.4982"
                                                y2="50.8457" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#4B6CB7"/>
                                    <stop offset="1" stopColor="#182848"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className={style.info}>
                        More Info <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                                       xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z"
                            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M11 7V11" stroke="white" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                        <path d="M11 15H11.01" stroke="white" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>

                    </div>
                </div>
            </section>
            <section className={style.home}>
                <div className={style.max_width}>
                    <div className={style.homeContainer} data-aos="fade-right" data-aos-easing="ease"
                         data-aos-duration="700">
                        <div className={style.main_heading}>
                            Welcome to WarrantyVerse
                        </div>
                        <div className={style.sub_heading}>
                            Digitize your <span>Warranty</span></div>
                        <div className={style.ConnectMetaMask} onClick={Connect}>Connect your Wallet
                            <svg width="23" height="20" viewBox="0 0 23 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.3911 18.7997L21.8218 10.369L13.3911 1.93829" stroke="black"
                                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M1.58789 18.7996L10.0186 10.3689L1.58789 1.93823" stroke="black"
                                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>
                    <div data-aos="fade-left" data-aos-easing="ease"
                         data-aos-duration="700" className="img">
                        <img src={img} alt=""/></div>
                </div>
                <div className={style.background}><img src={background} alt=""/></div>
            </section>
        </>
    );
}