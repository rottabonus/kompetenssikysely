import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import jatka from '../img/PNG/jatka.png';

class WelcomePage extends Component {


    render() {
        return (
            <div>
                <Grid container spacing={8} alignItems="center" justify="center">
                    <Grid item xs={8} >
                        <h2>ASIANTUNTIJAN KOMPETENSSITYÖKALU</h2>
                    </Grid>
                    <div className="frontpage_txt">
                        <p>Tervetuloa kartoittamaan omaa osaamistasi ja tunnistamaan kehittymistarpeitasi suhteessa tämän päivän työelämään. <br /><br />
                            Tässä työkalussa voit testata, miten yleiset kompetenssisi ja asiantuntijan osaamisesi asettuvat
                            suhteessa tämän päivän tradenomien osaamisvaatimuksiin.<br /><br />

                            Kyselymuotoisessa työkalussa on kaksi osiota<br /><br />
                            <b>A. Yleiset kompetenssit</b>, ja<br />
                            <b>B. Asiantuntijan osaaminen</b>, joista voit valita markkinoinnin, myynnin, taloushallinnon tai henkilöstöhallinnon osiot.<br />
                        </p>
                    </div>
                    <Grid item xs={12}>
                        <img src={jatka} id="cursor-hover" alt="KANADA" onClick={this.props.moveForward} /></Grid>
                </Grid>
            </div>
        )
    }
}

export default WelcomePage;