import React from 'react';
import TT_facebook from '../img/PNG/TT_facebook.png'
import TT_youtube from '../img/PNG/TT_youtube.png'
import TT_insta from '../img/PNG/TT_insta.png'
import TT_twitter from '../img/PNG/TT_twitter.png'
import TT_linkedin from '../img/PNG/TT_linkedin.png'

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <ul>
                    <li className="footer-links">
                        <a href="https://www.facebook.com/HaagaHeliaAMK/?userLang=en" target="_blank" rel="noopener noreferrer">
                            <img src={TT_facebook} alt="KANADA" /> </a>
                    </li>

                    <li className="footer-links">
                        <a href="https://www.youtube.com/user/HAAGAHELIAviestinta?userLang=en" target="_blank" rel="noopener noreferrer">
                            <img src={TT_youtube} alt="KANADA" /></a>
                    </li>

                    <li className="footer-links">
                        <a href="https://twitter.com/haagaheliaamk?userLang=en" target="_blank" rel="noopener noreferrer">
                            <img src={TT_twitter} alt="KANADA" /></a>
                    </li>

                    <li className="footer-links">
                        <a href="https://www.linkedin.com/school/haaga-helia-university-of-applied-sciences/" target="_blank" rel="noopener noreferrer">
                            <img src={TT_linkedin} alt="KANADA" /></a>
                    </li>

                    <li className="footer-links">
                        <a href="https://www.instagram.com/haagahelia/?userLang=en" target="_blank" rel="noopener noreferrer">
                            <img src={TT_insta} alt="KANADA" /></a>
                    </li>
                </ul>
            </footer>
        )
    }
}

export default Footer;
