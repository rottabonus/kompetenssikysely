import React  from 'react';


const Improvement = ({answers}) => {

    const value1list = answers.filter(a => a.value === "1");
        const career = answers.filter(a => a.topic ==="Uranhallinta").map(a => Number(a.value));
        const average = career.reduce((cur, acc)=>cur+acc, 0) / career.length;
        const common = answers.filter(a => a.topic ==="Yleinen digiosaaminen").map(a => Number(a.value));
        const commonaverage = common.reduce((cur, acc)=>cur+acc, 0) / common.length;
        const interaction = answers.filter(a => a.topic ==="Vuorovaikutus").map(a => Number(a.value));
        const interactionaverage = interaction.reduce((cur, acc)=>cur+acc, 0) / interaction.length;
        const leadership = answers.filter(a => a.topic ==="Itsensä johtaminen ja ongelmanratkaisu").map(a => Number(a.value));
        const leadershipaverage = leadership.reduce((cur, acc)=>cur+acc, 0) / leadership.length;

     
        return (
            <div className="surveyContainer">

                <b>OSAAMISEN KEHITTÄMINEN</b>
<p>Onnittelut kartoituksen tekemisestä! Kompetenssikartoituksen avulla olet arvioinut omia vahvuuksiasi ja kehittymiskohteita tämän päivän työelämässä.</p>
{
    commonaverage > 1.5 || interactionaverage > 1.5 || leadershipaverage > 1.5 ? null: <p>Yleisiä kompetensseja voit kehittää työssä ja ammattikorkeakoulut, yliopistot ja kaupalliset toimijat tarjoavat monimuotoista opetusta näidenkin taitojen kehittämiseen. </p>

}
{
    average > 1.5 ?  null:  <p>Urasuunnitteluun ja työnhakuun löytyy työkaluja ja valmennusta netistä esimerkiksi valmistuville, jotka soveltuvat hyvin myös työssäkäyvien urapohdintojen avuksi. Työviranomaisten tarjonnan lisäksi modernia työnhakua voi kehittää eri liittojen ja yhdistysten uravalmennuksen tukemana.</p>
}

<div>Asiantuntijuuttasi voit kehittää seuraavissa taidoissa {value1list.map(a => <p key={a.answer}>{a.answer}</p>)}. Voit hakeutua ammatti-tai tiedekorkeakoulujen koulutukseen, avoimen kursseille, lyhyemmille kokonaisuuksille tai tutkinto-opintoihin. Asiantuntijuutta voit kehittää myös työssä oppimalla ja verkostoituminen muiden asiantuntijoiden kanssa auttaa kehittymään uralla ja viihtymään työelämässä entistä paremmin</div>
<p>Kompetenssikartoituksen palautteen avulla pystyt myös markkinoimaan omaa osaamistasi ja kertomaan muille, millaisia työelämätaitoja sinulla on. Linkkilista koulutustarjonnasta löytyy täältä.</p>
<p>Kompetenssityökalu on toteutettu osana Taidot Työhön –hanketta, jota on rahoittanut Strategisen tutkimuksen neuvoston vuosina 2016-2019. Haaga-Helia ammattikorkeakoulu ylläpitää työkalua ja niihin liittyviä nettisivuja. </p>
            </div>
        )
    }


export default Improvement;
