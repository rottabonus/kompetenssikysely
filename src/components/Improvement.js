import React  from 'react';


const Improvement = ({answers}) => {

    const value1list = answers.filter(a => a.value === "1");
        const career = answers.filter(a => a.topic ==="Arvot ja uransuunnittelu").map(a => Number(a.value));
        const average = career.reduce((cur, acc)=>cur+acc, 0) / career.length;
        const common = answers.filter(a => a.topic ==="Yleinen digiosaaminen").map(a => Number(a.value));
        const commonaverage = common.reduce((cur, acc)=>cur+acc, 0) / common.length;
        const commons = answers.filter(a => a.topic ==="Yleinen digiosaaminen");
        const teamwork = answers.filter(a => a.topic ==="Tiimityö ja tunneäly").map(a => Number(a.value));
        const teamworknaverage = teamwork.reduce((cur, acc)=>cur+acc, 0) / teamwork.length;
        const teamworks = answers.filter(a => a.topic ==="Tiimityö ja tunneäly");
        const leadership = answers.filter(a => a.topic ==="Itsensä johtaminen").map(a => Number(a.value));
        const leadershipaverage = leadership.reduce((cur, acc)=>cur+acc, 0) / leadership.length;
        const leaderships = answers.filter(a => a.topic ==="Itsensä johtaminen");
        const probsolv = answers.filter(a => a.topic ==="Ongelmanratkaisu ja oppiminen").map(a => Number(a.value));
        const probsolvaverage = probsolv.reduce((cur, acc)=>cur+acc, 0) / probsolv.length;
        const probsolvs = answers.filter(a => a.topic ==="Ongelmanratkaisu ja oppiminen");
        const security = answers.filter(a => a.topic ==="Tietoturva ja tekijänoikeudet").map(a => Number(a.value));
        const securityaverage = security.reduce((cur, acc)=>cur+acc, 0) / security.length;
        const securitys = answers.filter(a => a.topic ==="Tietoturva ja tekijänoikeudet");
        const jobsearch = answers.filter(a => a.topic ==="Työnhaku ja verkostoituminen").map(a => Number(a.value));
        const jobsearchaverage = jobsearch.reduce((cur, acc)=>cur+acc, 0) / jobsearch.length;
        const negotiation = answers.filter(a => a.topic ==="Neuvottelu- ja esiintymistaidot").map(a => Number(a.value));
        const negotiationaverage = negotiation.reduce((cur, acc)=>cur+acc, 0) / negotiation.length;
        const negotiations = answers.filter(a => a.topic ==="Neuvottelu- ja esiintymistaidot");
        return (
            <div className="surveyContainer">

                <h3>OSAAMISEN KEHITTÄMINEN</h3>
                <div className="welcomePageText">
<p>Onnittelut kartoituksen tekemisestä! Kompetenssikartoituksen avulla olet arvioinut omia vahvuuksiasi ja kehittymiskohteitasi tämän päivän työelämässä.</p>
   <p><b>Yleisiä kompetensseja</b> kuten  itsensä johtamista, vuorovaikutus- ja ongelmanratkaisutaitoja voit kehittää työssä, mutta ammattikorkeakoulut, yliopistot ja kaupalliset toimijat tarjoavat monimuotoista opetusta näidenkin taitojen kehittämiseen</p>
  <p><b>Uranhallintaan ja uuden uran suunnitteluun</b> löytyy työkaluja ja valmennusta, jotka sovelutvat hyvin myös työssäkäyvien urapohdintojen avuksi. Työviranomaisten tarjonnan lisäksi modernia työnhakua voi kehittää eri liittojen ja yhdistysten sekä korkeakoulujen uravalmennuksen tukemana.</p>
<p>Ylemmät AMK-tutkinnot keskittyvät viimeisimpiin osaamisvaatimuksiin ja yliopistojen tutkinnot pätevyystason nostamiseen. Kaikissa korkeakouluissa on tarjolla myös avoimen korkeakoulun kursseja, usein verkossa. Sekä kansainvälisten että kotimaisten yliopistojen opetusta voi hyödyntää kaikille avointen verkkokurssien kautta.</p>
<p>Omaa asiantuntijuutta voi kehittää myös <b>työssä oppimalla</b> esimerkiksi hakeutumalla vaativiin projekteihin, pyrkimällä uusiin tehtäviin ja osallistumalla työnantajan tai vaikkapa yhteistyökumppaneiden tilaisuuksiin ja koulutuksiin. Työttömyyden sattuessa kannattaa selvittää voimassa olevat aikuiskoulutuksen tukimuodot</p>
<p>Kompetenssikartoituksen palautteen avulla pystyt myös markkinoimaan omaa osaamistasi ja kertomaan muile millaisia työelämätaitoja sinulla on. Verkostoituminen muiden asiantuntijoiden kanssa auttaa kehittymään uralla ja viihtymään työssäsi entistä paremmin</p>
<p>Kompetenssityökalu on toteutettu osana Taidot Työhön –hanketta, jota on rahoittanut Strategisen tutkimuksen neuvosto vuosina 2016-2019.</p>
            </div>
            </div>
        )
    }


export default Improvement;
