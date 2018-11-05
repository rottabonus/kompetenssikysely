import React, { Component } from 'react';
import Chart from 'chart.js';


class RadarChart extends Component {

    constructor(props){
        super(props);
        this.state={
            data : [],
        };
    }

    componentDidMount(){
    var answersWithoutYleisettiedot = this.props.answers.filter((answer) => answer.topic != "Yleisettiedot");
    var avgItsensaJohtaminen = this.props.answers.filter((answer) => answer.topic === "Itsensä johtaminen ja ongelmanratkaisu").reduce((previous, current) => current + previous);
    var avgYleinenDigi = this.props.answers.filter((answer) => answer.topic === "Yleinen digiosaaminen");
    var avgUranhallinta = this.props.answers.filter((answer) => answer.topic === "Uranhallinta");
    var avgVuorovaikutus = this.props.answers.filter((answer) => answer.topic === "Vuorovaikutus");
    
    var usersData = answersWithoutYleisettiedot.map((a) => a.value);
    var labels = answersWithoutYleisettiedot.map((a) => a.topic);
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'radar',
        data : {
            labels: labels,
            datasets: [{
                label: "Minun Yleisetkompetenssini",
                data: usersData,
            backgroundColor: 'rgba(110, 42, 91, 0.7)',
            }]
        },
        options : {
            scale: {
                ticks: {
                    beginAtZero: true,
                    max: 5
                }
            },

        }
    });
    }

    render() {/*
        var i = 0;
        var rows1 = [];
        var rows2 = [];

        var helpertext = {
          Low : [
            {
              "name" : "Ajan ja tehtävien hallinta",
              "text" : "että aikataulutat työsi, noudatat aikatauluja ja priorisoit tehtäväsi."
            },
            {
              "name" : "Stressinhallinta",
              "text" : "että löydät itsellesi työkaluja, joilla ennaltaehkäiset stressiä."
            },
            {
              "name" : "Itsetuntemus",
              "text" : "että kehität itseäsi palautteen avulla ja rakennat toimintaasi vahvuuksiesi varaan."
            },
            {
              "name" : "Motivointi",
              "text" : "että opit tunnistamaan motivoivat tekijät ja osaat motivoida itseäsi erilaisissa tilanteissa."
            },
            {
              "name" : "Ongelmanratkaisu",
              "text" : "että opit priorisoimaan ratkaisuvaihtoehtoja eri työkaluilla ja osaat esittää ratkaisuja analyysin perusteella."
            },
            {
              "name" : "Oppiminen ja reflektointi",
              "text" : "että osaat kommunikoida oman osaamisesi myös muille ja tavoitteellisesti reflektoida ja kehittää osaamistasi."
            },
            {
              "name" : "Sosiaalisen median käyttö",
              "text" : "että seuraat ammatillisia sosiaalisen median kanavia sekä jatkossa tuotat itse sisältöjä sosiaalisen median kanaviin."
            },
            {
              "name" : "Digitaaliset työkalut",
              "text" : "että opettelet käyttämään organisaatiosi digitaalisia työkaluja ja alat seurata aktiivisesti toimialasi digitaalisten palvelujen kehittämistä."
            },
            {
              "name" : "Digitalisaation mahdollisuudet",
              "text" : "että tutustut uuden teknologian mahdollisuuksiin ja pyrit mukaan toimintatapojen ja/tai työn kehittämiseen uuden teknologian avulla."
            },
            {
              "name" : "Kanavien luotettavuus",
              "text" : "että opettelet viestimään sisältöjen epäluotettavuudesta kanavien ylläpitäjille sekä käyttämään sovelluksia tietojen luotettavuuden todentamiseksi."
            },
            {
              "name" : "Tietoturva",
              "text" : "että opit todentamaan tietojen käyttöä ja ehkäisemään väärinkäyttöä tietoturvatyökalujen avulla."
            },
            {
              "name" : "Tekijänoikeudet",
              "text" : "että tunnistat tekijänoikeussäännöt, noudatat niitä ja osaat soveltaa tekijänoikeus- ja lisenssisääntöjä erilaisissa tilanteissa."
            },
            {
              "name" : "Arvojen huomioiminen",
              "text" : "että tunnistat organisaatiosi arvot sekä osaat huomioida omien arvojesi ja työsi välistä sopivuutta."
            },
            {
              "name" : "Urasuunnittelu",
              "text" : "että teet itsellesi urasuunnitelman ja hyödynnät suunnitelmaa aktiivisesti omalla työurallasi."
            },
            {
              "name" : "Tiedonhankinta urasuunnittelussa",
              "text" : "että hyödynnät rekrytointiin ja työpaikkoihin liittyvää tietoa oman urasi rakentamisessa sekä liityt mukaan työpaikoista vinkkaaviin sosiaalisiin medioihin."
            },
            {
              "name" : "Työnhaku",
              "text" : "että hyödynnät verkostojasi piilotyöpaikkojen hakemisessa."
            },
            {
              "name" : "Verkostoituminen",
              "text" : "että tunnistat ammatillisen verkoston, johon kuulut ja ryhdyt toimimaan verkostoissa."
            },
            {
              "name" : "Näkökulmien huomioiminen",
              "text" : "että houkuttelet muita mukaan keskusteluun tuomaan arvoa tuottavia näkökulmia ja opettelet tarvittaessa muotoilemaan yhteisen näkemyksen."
            },
            {
              "name" : "Neuvottelutaidot",
              "text" : "että opit asettumaan toisen osapuolen asemaan kaikkia tyydyttävien ratkaisujen löytämiseksi."
            },
            {
              "name" : "Esiintyminen",
              "text" : "että opit esiintyessäsi huomioimaan kohdeyleisön tarpeet ja tunnelmat sekä reagoimaan niihin."
            },
            {
              "name" : "Monikulttuurisuus",
              "text" : "että osaat huomioida kulttuurien väliset erot sekä rakentaa arvostavan työskentely-ympäristön eri kulttuureista tulevien tiimin jäsenten kesken."
            },
            {
              "name" : "Tunneäly",
              "text" : "että opettelet tunnistamaan omia ja muiden tunnetiloja ja osoittamaan empatiaa."
            },
          ],
          High : [
            {
              "name" : "Ajan ja tehtävien hallinta",
              "text" : "osaat aikatauluttaa, suunnitella ja priorisoida keskittyen olennaiseen."
            },
            {
              "name" : "Stressinhallinta",
              "text" : "osaat ennaltaehkäistä stressiä."
            },
            {
              "name" : "Itsetuntemus",
              "text" : "oma arviosi osaamisestasi ja vahvuuksistasi on samansuuntaista saamasi palautteen kanssa."
            },
            {
              "name" : "Motivointi",
              "text" : "tunnistat tekijät, jotka motivoivat sinua ja osaat motivoida itseäsi erilaisissa tilanteissa."
            },
            {
              "name" : "Ongelmanratkaisu",
              "text" : "osaat priorisoida ratkaisuvaihtoehtoja ja esittää ratkaisuja analyysin perusteella."
            },
            {
              "name" : "Oppiminen ja reflektointi",
              "text" : "osaat monipuolisesti ja tavoitteellisesti reflektoida ja kehittää osaamistasi."
            },
            {
              "name" : "Sosiaalisen median käyttö",
              "text" : "käytät sosiaalisen median kanavia ja tuotat niihin sisältöjä."
            },
            {
              "name" : "Digitaaliset työkalut",
              "text" : "seuraat aktiivisesti toimialasi digitaalisten palvelujen kehittämistä ja käytät työkaluja tarpeen mukaan."
            },
            {
              "name" : "Digitalisaation mahdollisuudet",
              "text" : "osallistut toimintatapojesi ja työsi kehittämiseen uuden teknologian avulla."
            },
            {
              "name" : "Kanavien luotettavuus",
              "text" : "osaat viestiä sisältöjen epäluotettavuudesta ja käyttää sovelluksia tietojen luotettavuuden todentamiseksi."
            },
            {
              "name" : "Tietoturva",
              "text" : "osaat todentaa tietojen käyttöä sekä ehkäistä väärinkäyttöä tietoturvatyökalujen avulla."
            },
            {
              "name" : "Tekijänoikeudet",
              "text" : "osaat soveltaa alasi tekijänoikeus- ja lisenssisääntöjä erilaisissa tilanteissa."
            },
            {
              "name" : "Arvojen huomioiminen",
              "text" : "osaat huomioida omien arvojesi ja työsi arvojen välistä sopivuutta ja toimia niiden mukaisesti."
            },
            {
              "name" : "Urasuunnittelu",
              "text" : "olet tehnyt urasuunnitelman ja hyödynnät sitä työurallasi."
            },
            {
              "name" : "Tiedonhankinta urasuunnittelussa",
              "text" : "osaat hyödyntää rekrytointiin ja työpaikkoihin liittyvää tietoa oman urasi rakentamisessa sekä olet mukana sosiaalisissa kanavissa, jotka vinkkaavat alasi työpaikoista."
            },
            {
              "name" : "Työnhaku",
              "text" : "osaat etsiä piilotyöpaikkoja ja luoda itsellesi työmahdollisuuksia."
            },
            {
              "name" : "Verkostoituminen",
              "text" : "sinulla on ammatillisia verkostoja, joissa toimit aktiivisesti."
            },
            {
              "name" : "Näkökulmien huomioiminen",
              "text" : "osallistat muita keskusteluun siten, että he tuottavat arvoa tuovia näkökulmia ja kykenet muotoilemaan tarvittaessa yhteisen näkemyksen."
            },
            {
              "name" : "Neuvottelutaidot",
              "text" : "osaat asettua toisen osapuolen asemaan ja löytää ratkaisuja, jossa kaikki voittavat."
            },
            {
              "name" : "Esiintyminen",
              "text" : "osaat esiintyessäsi huomioida yleisön tunnelmat ja pystyt reagoimaan tunnelmaan."
            },
            {
              "name" : "Monikulttuurisuus",
              "text" : "kykenet rakentamaan arvostavan työskentely-ympäristön eri kulttuureista tulevien tiimien jäsenten kesken."
            },
            {
              "name" : "Tunneäly",
              "text" : "tunnistat ja huomioit omia muiden tunteita sekä kykenet osoittamaan empatiaa."
            },
          ]
        };

        for(i = 0; i < this.state.data.high.length; i++){

          var helper = helpertext.High.filter((a) => a.name == this.state.data.high[i].question)
          for (let b in helper){
            rows1.push(<p key={b}><span className="bold">{helper[b].name}, </span>{helper[b].text}</p>)
          }
        }
        for(i = 0; i < this.state.data.low.length; i++){
          var helper = helpertext.Low.filter((a) => a.name == this.state.data.low[i].question)
          for (let b in helper){
            rows2.push(<p key={b}><span className="bold">{helper[b].name}, </span>{helper[b].text}</p>)
          }*/

    return (
      <div>
       <canvas id="myChart" width="100" height="60"></canvas>

      </div>
    );
  }
}

export default RadarChart;
