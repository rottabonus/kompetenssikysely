import React from 'react';
import taidottyohon from '../img/PNG/taidottyohon.png'
import ProgressBar from './ProgressBar'

const Header = ({ surveyState, states }) => {

    return (
        <header>
            <img  className="header-logo" src={taidottyohon} alt={taidottyohon} id="logo" /><br></br>
            <div className="barContainer">
            <div className="bar">
                <ProgressBar surveyState={surveyState} states={states} />
            </div>
            </div>
        </header>
    )
}

export default Header;
