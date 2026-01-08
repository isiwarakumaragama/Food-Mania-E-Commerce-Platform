import React from "react";
import './Footer.css';
import footer_logo from '../Assets/logo.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';
import facebook_icon from '../Assets/facebook_icon.png';
import github_icon from '../Assets/github_icon.png';
const Footer = () =>{
    return(
        <div className="footer">
            <div className="footer-logo">
                <img src={footer_logo} className="footer-img" alt=""/>
                <p>FOOD MANIA</p>
            </div>
            <ul className="footer-links">
                <li>Company</li>
                <li>Product</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className="footer-social-icon">
                <div className="footer-icon-container">
                    <img src={facebook_icon} className= "logo-icon" alt=""/>
                </div>
                <div className="footer-icon-container">
                    <img src={whatsapp_icon} className= "logo-icon" alt=""/>
                </div>
                <div className="footer-icon-container">
                    <img src={github_icon} className= "logo-icon" alt=""/>
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>Copyright @ 2023 - All Right Reserved.</p>
            </div>
        </div>
    )
}
export default Footer;