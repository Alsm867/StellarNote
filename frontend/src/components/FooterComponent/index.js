import './FooterComponent.css';
import About from "../AboutComponent";


function FooterComponent() {


    return (
        <div className="Footer">
            <p className='©'> Stellar Note© 2021</p>
            <div className='sam'>
            Sam:
            </div>
                <a href='https://github.com/Alsm867'><img className='g-hub' src='https://res.cloudinary.com/dzjkwepju/image/upload/v1637101398/Styckr/Untitled_design_o5b62v.png' alt='ghub' width='30px' height='30px'></img></a>
                <a href='https://www.linkedin.com/in/sam-ortega-66677921a/'><img className='linked' src='https://res.cloudinary.com/dzjkwepju/image/upload/v1637101453/Styckr/Untitled_design_1_eohmqp.png' alt='linked' width='30px' height='30px'></img></a>
        <About/>
        </div>
    );
}

export default FooterComponent;
