import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import jatka from '../img/PNG/jatka.png';
import palkki from '../img/PNG/palkki.png'

class WelcomePage extends Component {

    render() {
        return (
            <div className="surveyContainer">

                <h1>ASIANTUNTIJAN KOMPETENSSITYÖKALU</h1>

                <div className="welcomePageText">
                    <h3>TERVETULOA KARTOITTAMAAN OMAA OSAAMISTASI JA TUNNISTAMAAN KEHITTYMISTARPEITASI SUHTEESSA TÄMÄN PÄIVÄN TYÖELÄMÄÄN. </h3><br /><br />
                    <div>  <p>
                        Tässä työkalussa voit testata, miten yleiset kompetenssisi ja asiantuntijan osaamisesi asettuvat
                            suhteessa tämän päivän tradenomien osaamisvaatimuksiin.<br /><br />

                        Kyselymuotoisessa työkalussa on kaksi osiota: <br /><br /></p></div>
                    <div className="welcomePageTextDiv">
                        <div><img src={palkki} alt="palkkI" height="120%" width="80%" /></div>
                        <div><p>
                            <b>A. YLEISET KOMPETENSSIT</b>, ja<br />
                            <b>B. ASIANTUNTIJAN OSAAMINEN</b>, joista voit valita markkinoinnin, myynnin, taloushallinnon tai henkilöstöhallinnon osiot.<br />
                        </p></div>
                    </div>
                </div>

                <button className="buttonBegin" onClick={(e) =>this.props.moveForward(e, 1)}>Aloita kysely</button>

            </div>
        )
    }
}

export default WelcomePage;
