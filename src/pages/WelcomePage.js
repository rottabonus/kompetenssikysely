import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import jatka from '../img/PNG/jatka.png';
import palkki from '../img/PNG/palkki.png'

class WelcomePage extends Component {

    render() {
        return (
            <div className="surveyContainer">
                <Grid container spacing={8} alignItems="center" justify="center">
                    <Grid item xs={8} >
                        <h1>ASIANTUNTIJAN KOMPETENSSITYÖKALU</h1>
                    </Grid>
                    <div className="professionSelectionText">
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
                    <Grid item xs={12}>
                        <img src={jatka} id="cursor-hover" alt="Jatka" onClick={this.props.moveForward} /></Grid>
                </Grid>
            </div>
        )
    }
}

export default WelcomePage;
