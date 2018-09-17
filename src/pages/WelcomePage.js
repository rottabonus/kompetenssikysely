import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

class WelcomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Grid container spacing={12} alignItems="center" justify="center">
                    <Grid item xs={12} >
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
                    <Grid item xs={12}><button onClick={this.props.moveForward}>Jatka</button></Grid>
                </Grid>
            </div>
        )
    }
}

export default WelcomePage;