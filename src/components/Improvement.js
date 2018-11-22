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
<p>Onnittelut kartoituksen tekemisestä! Kompetenssikartoituksen avulla olet arvioinut omia vahvuuksiasi ja kehittymiskohteita tämän päivän työelämässä.</p>
   <p>Yleisiä kompetensseja kuten {commonaverage > 1.5 ? null: <div>{commons[0].topic}</div>} {teamworknaverage > 1.5 ? null: <div>{teamworks[0].topic}</div>} {leadershipaverage > 1.5 ? null: <div>{leaderships[0].topic}</div>} {probsolvaverage > 1.5 ? null: <div>{probsolvs[0].topic}</div>} {securityaverage > 1.5 ? null: <div>{securitys[0].topic}</div>} {negotiationaverage > 1.5 ? null: <div>{negotiations[0].topic}</div>} voit kehittää työssä ja ammattikorkeakoulut, yliopistot ja kaupalliset toimijat tarjoavat monimuotoista opetusta näidenkin taitojen kehittämiseen. </p>
{
    average > 1.5 || jobsearchaverage > 1.5 ?  null:  <p>Urasuunnitteluun ja työnhakuun löytyy työkaluja ja valmennusta netistä esimerkiksi valmistuville, jotka soveltuvat hyvin myös työssäkäyvien urapohdintojen avuksi. Työviranomaisten tarjonnan lisäksi modernia työnhakua voi kehittää eri liittojen ja yhdistysten uravalmennuksen tukemana.</p>
}

<div>Asiantuntijuuttasi voit kehittää seuraavissa taidoissa {value1list.map(a => <p key={a.answer}>{a.answer}</p>)}. Voit hakeutua ammatti-tai tiedekorkeakoulujen koulutukseen, avoimen kursseille, lyhyemmille kokonaisuuksille tai tutkinto-opintoihin. Asiantuntijuutta voit kehittää myös työssä oppimalla ja verkostoituminen muiden asiantuntijoiden kanssa auttaa kehittymään uralla ja viihtymään työelämässä entistä paremmin</div>
<p>Kompetenssikartoituksen palautteen avulla pystyt myös markkinoimaan omaa osaamistasi ja kertomaan muille, millaisia työelämätaitoja sinulla on. Linkkilista koulutustarjonnasta löytyy täältä.</p>
<p>Kompetenssityökalu on toteutettu osana Taidot Työhön –hanketta, jota on rahoittanut Strategisen tutkimuksen neuvoston vuosina 2016-2019. Haaga-Helia ammattikorkeakoulu ylläpitää työkalua ja niihin liittyviä nettisivuja. </p>
            </div>
            </div>
        )
    }


export default Improvement;
