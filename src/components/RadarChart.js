import React, { Component } from 'react';
import Chart from 'chart.js';
import jatka from '../img/PNG/jatka.png';


class RadarChart extends Component {
  
    constructor(props){
        super(props);
        this.state={
            data : [],
            rows1 : [],
            rows2 : [],
        };
    }

    componentDidMount(){

        var filteredAnswers = this.props.answers.filter((answer) => answer.topic !== "Yleisettiedot");
        this.props.selectedTopics.forEach(function(element) {
            filteredAnswers.filter((answer) => answer.topic !== element.topic);
        })
        var problemSolving = [];
        var technicalComp = [];
        var careerControl = [];
        var interaction = [];
        filteredAnswers.forEach(function(element) {
            if (element.topic === "Itsensä johtaminen ja ongelmanratkaisu") {
                problemSolving.push(element);
            } else if (element.topic === "Yleinen digiosaaminen") {
                technicalComp.push(element);
            } else if (element.topic === "Uranhallinta") {
                careerControl.push(element);
            } else if (element.topic === "Vuorovaikutus") {
                interaction.push(element);
            }
        })
        var high = [];
        var low = [];
       
        filteredAnswers.forEach(function(element){
          if (element.value == 5) {
            high.push(element);
          }
          else if (element.value == 1) {
            low.push(element);
          }
        })
        console.log("Get High 420" + high);
        console.log("Get Loooow" + low);
        var labelArray = [problemSolving[0].topic, technicalComp[0].topic, careerControl[0].topic, interaction[0].topic];
        var answerArray = [problemSolving, technicalComp, careerControl, interaction];
        var averageArray = [];
        answerArray.forEach(function(element) {
            var answerValues = element.map((a) => parseInt(a.value));
            var sum = answerValues.reduce((previous, current) => current + previous);
            var avg = (sum / answerValues.length).toFixed(2);
            averageArray.push(avg);
        })

        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
            type: 'radar', 
            data : {
                labels: labelArray,
                datasets: [{
                    label: "Minun kompetenssini",
                    data: averageArray, 
                    "backgroundColor": "rgba(0, 159, 227, 0.5)",
                    "borderWidth": "2",
                    "borderColor": "rgba(0, 159, 227, 1.0)",
                    "lineTension": "-0.1"
                },]
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
            "name" : "Uransuunnittelu",
            "text" : "että teet itsellesi urasuunnitelman ja hyödynnät suunnitelmaa aktiivisesti omalla työurallasi."
          },
          {
            "name" : "Tiedonhankinta",
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
            "name" : "Tiimityö",
            "text" : "että osaat toimia osana tiimiä."
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
            "name" : "Uransuunnittelu",
            "text" : "olet tehnyt urasuunnitelman ja hyödynnät sitä työurallasi."
          },
          {
            "name" : "Tiedonhankinta",
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
            "name" : "Tiimityö",
            "text" : "osaat toimia osana tiimiä."
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
      //FIXME: Key should be unique!
      var b = 0;
      var x = 0;
      for(i = 0; i < high.length; i++){
        console.log(high[i].answer)
        console.log(helpertext.High[i].name)
        var helper = helpertext.High.filter((a) => a.name == high[i].answer)
        for (b = 0; b < helper.length; b++){
          rows1.push(<p key={b}><span className="bold">{helper[b].name}, </span>{helper[b].text}</p>)
        }
      }
      for(i = 0; i < low.length; i++){
        var helper = helpertext.Low.filter((a) => a.name == low[i].answer)
        for (x = 0; x < helper.length; x++){
          rows2.push(<p key={x}><span className="bold">{helper[x].name}, </span>{helper[x].text}</p>)
        }
      }
     this.setState({rows1 : rows1})
     this.setState({rows2 : rows2})
    }
      render() {
    return (
      <div className="chartContainer">
        <canvas id="myChart" width="100" height="60"></canvas> 
        <div id="palaute">
        { this.state.rows1.length > 0
              ? <div className="reviewtext">
                  <h3 className="aligncenter">Itsearviosi perusteella osaamisesi on vahvalla tasolla seuraavissa: </h3>
                  {this.state.rows1}
                </div>
              : null
            }
          
            { this.state.rows2.length > 0
              ? <div className="reviewtext">
                  <h3 className="aligncenter">Kehittääksesi osaamistasi sinun kannattaa huomioida: </h3>
                  {this.state.rows2}
                </div>
              : null
            }
        </div>
        <img src={jatka} id="cursor-hover" alt="Jatka" onClick={this.props.moveForward} />
      </div>
    );
  }
}

export default RadarChart;