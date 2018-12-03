Sub HttpRequestDemo_Click()

Dim strResult As String
    Dim objHTTP As Object
    Dim URL As String
    Dim var As Variant
    Dim JSON As Dictionary
 
 
    Set objHTTP = CreateObject("WinHttp.WinHttpRequest.5.1")
    URL = "https://surveydev-740fb.firebaseio.com/answers/.json"
    objHTTP.Open "GET", URL, False
    objHTTP.setRequestHeader "User-Agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0)"
    objHTTP.setRequestHeader "Content-type", "application/json"
    objHTTP.send
    Set JSON = JsonConverter.ParseJson(objHTTP.responseText)
   
    Dim item As Dictionary
    Dim j As Long
    j = 2

    For Each json_Key In JSON.Keys
        
        If json_Key <> "table" Then ' Create a new dictionary item representing the JSON data in the specific key
            
            Dim Values As Variant
            Dim value, question, topic, dateString As String
            Dim i As Long
            Dim answer As Dictionary
            Set item = JSON(json_Key)
            ReDim Values((item("Answers").Count + 1), 3) 'uudelleenJÃ¤rjestÃ¤ lista objectkin vastauksien koon mukaisesti !
            i = 2
            dateString = item("date")
            Sheets("Sheet1").Range(Cells(j, 1), Cells(j, 1)) = json_Key
            Sheets("Sheet1").Range(Cells(j, 2), Cells(j, 2)) = dateString
            For Each answer In item("Answers")
                Values(i, 0) = answer("value")
                value = answer("value")
                'Values(i, 0) = answer("answer")
                question = answer("answer")
                topic = answer("topic")
                i = i + 1
                If question = "Toimialasi" Then
                    Sheets("Sheet1").Range(Cells(j, 3), Cells(j, i)) = value
                ElseIf question = "Nykyisen tai viimeisimmän työnantajasi sektori" Then
                    Sheets("Sheet1").Range(Cells(j, 4), Cells(j, i)) = value
                ElseIf question = "Viimeisin tutkintosi" Then
                    Sheets("Sheet1").Range(Cells(j, 5), Cells(j, i)) = value
                ElseIf question = "Viimeisimmän tutkinnon valmistumisajankohta" Then
                    Sheets("Sheet1").Range(Cells(j, 6), Cells(j, i)) = value
                ElseIf question = "Ajan ja tehtävien hallinta" Then
                    Sheets("Sheet1").Range(Cells(j, 7), Cells(j, i)) = value
                ElseIf question = "Stressinhallinta" Then
                    Sheets("Sheet1").Range(Cells(j, 8), Cells(j, i)) = value
                ElseIf question = "Itsetuntemus" Then
                    Sheets("Sheet1").Range(Cells(j, 9), Cells(j, i)) = value
                ElseIf question = "Motivointi" Then
                    Sheets("Sheet1").Range(Cells(j, 10), Cells(j, i)) = value
                ElseIf question = "Ongelmanratkaisu" Then
                    Sheets("Sheet1").Range(Cells(j, 11), Cells(j, i)) = value
                ElseIf question = "Oppiminen ja reflektointi" Then
                    Sheets("Sheet1").Range(Cells(j, 12), Cells(j, i)) = value
                ElseIf question = "Sosiaalisen median käyttö" Then
                    Sheets("Sheet1").Range(Cells(j, 13), Cells(j, i)) = value
                ElseIf question = "Digitaaliset työkalut" Then
                    Sheets("Sheet1").Range(Cells(j, 14), Cells(j, i)) = value
                ElseIf question = "Digitalisaation mahdollisuudet" Then
                    Sheets("Sheet1").Range(Cells(j, 15), Cells(j, i)) = value
                ElseIf question = "Kanavien luotettavuus" Then
                    Sheets("Sheet1").Range(Cells(j, 16), Cells(j, i)) = value
                ElseIf question = "Tietoturva" Then
                    Sheets("Sheet1").Range(Cells(j, 17), Cells(j, i)) = value
                ElseIf question = "Tekijänoikeudet" Then
                    Sheets("Sheet1").Range(Cells(j, 18), Cells(j, i)) = value
                ElseIf question = "Arvojen huomioiminen" Then
                    Sheets("Sheet1").Range(Cells(j, 19), Cells(j, i)) = value
                ElseIf question = "Uransuunnittelu" Then
                    Sheets("Sheet1").Range(Cells(j, 20), Cells(j, i)) = value
                ElseIf question = "Tiedonhankinta" Then
                    Sheets("Sheet1").Range(Cells(j, 21), Cells(j, i)) = value
                ElseIf question = "Työnhaku" Then
                    Sheets("Sheet1").Range(Cells(j, 22), Cells(j, i)) = value
                ElseIf question = "Verkostoituminen" Then
                    Sheets("Sheet1").Range(Cells(j, 23), Cells(j, i)) = value
                ElseIf question = "Neuvottelutaidot" Then
                    Sheets("Sheet1").Range(Cells(j, 24), Cells(j, i)) = value
                ElseIf question = "Esiintyminen" Then
                    Sheets("Sheet1").Range(Cells(j, 25), Cells(j, i)) = value
                ElseIf question = "Näkökulmien huomioiminen" Then
                    Sheets("Sheet1").Range(Cells(j, 26), Cells(j, i)) = value
                ElseIf question = "Tiimityö" Then
                    Sheets("Sheet1").Range(Cells(j, 27), Cells(j, i)) = value
                ElseIf question = "Monikulttuurisuus" Then
                    Sheets("Sheet1").Range(Cells(j, 28), Cells(j, i)) = value
                ElseIf question = "Tunneäly" Then
                    Sheets("Sheet1").Range(Cells(j, 29), Cells(j, i)) = value
                ElseIf question = "Strateginen johtaminen" Then
                    Sheets("Sheet1").Range(Cells(j, 30), Cells(j, i)) = value
                ElseIf question = "Strateginen HR" Then
                    Sheets("Sheet1").Range(Cells(j, 31), Cells(j, i)) = value
                ElseIf question = "Päätöksenteon valmistelu" Then
                    Sheets("Sheet1").Range(Cells(j, 32), Cells(j, i)) = value
                ElseIf question = "Henkilöstöresurssien hallinta" Then
                    Sheets("Sheet1").Range(Cells(j, 33), Cells(j, i)) = value
                ElseIf question = "Digitaalinen osaamisen kehittäminen" Then
                    Sheets("Sheet1").Range(Cells(j, 34), Cells(j, i)) = value
                ElseIf question = "Oppimismenetelmät" Then
                    Sheets("Sheet1").Range(Cells(j, 35), Cells(j, i)) = value
                ElseIf question = "Työnantajaimagon rakentaminen" Then
                    Sheets("Sheet1").Range(Cells(j, 36), Cells(j, i)) = value
                ElseIf question = "Rekrytointi" Then
                    Sheets("Sheet1").Range(Cells(j, 37), Cells(j, i)) = value
                ElseIf question = "Vaikuttamisviestintä" Then
                    Sheets("Sheet1").Range(Cells(j, 38), Cells(j, i)) = value
                ElseIf question = "HR-verkostot" Then
                    Sheets("Sheet1").Range(Cells(j, 39), Cells(j, i)) = value
                ElseIf question = "Työhyvinvointi" Then
                    Sheets("Sheet1").Range(Cells(j, 40), Cells(j, i)) = value
                ElseIf question = "Sitouttaminen" Then
                    Sheets("Sheet1").Range(Cells(j, 41), Cells(j, i)) = value
                ElseIf question = "Diversiteetin huomioiminen" Then
                    Sheets("Sheet1").Range(Cells(j, 42), Cells(j, i)) = value
                ElseIf question = "Monikulttuurinen HR-viestintä" Then
                    Sheets("Sheet1").Range(Cells(j, 43), Cells(j, i)) = value
                ElseIf question = "Kansainvälinen HRM" Then
                    Sheets("Sheet1").Range(Cells(j, 44), Cells(j, i)) = value
                ElseIf question = "Muutoksen organisointi" Then
                    Sheets("Sheet1").Range(Cells(j, 45), Cells(j, i)) = value
                ElseIf question = "Muutosagentit" Then
                    Sheets("Sheet1").Range(Cells(j, 46), Cells(j, i)) = value
                ElseIf (question = "Kilpailija-analyysi" And topic = "Markkinointi ja viestintä") Then 'samat
                    Sheets("Sheet1").Range(Cells(j, 47), Cells(j, i)) = value
                ElseIf (question = "Markkinoiden analysointi" And topic = "Markkinointi ja viestintä") Then
                    Sheets("Sheet1").Range(Cells(j, 48), Cells(j, i)) = value
                ElseIf (question = "Kilpailija-analyysi" And topic = "Myyntiosaaminen") Then
                    Sheets("Sheet1").Range(Cells(j, 61), Cells(j, i)) = value
                ElseIf (question = "Markkinoiden analysointi" And topic = "Myyntiosaaminen") Then
                    Sheets("Sheet1").Range(Cells(j, 62), Cells(j, i)) = value
                ElseIf question = "Asiakasluokittelu" Then
                    Sheets("Sheet1").Range(Cells(j, 49), Cells(j, i)) = value
                ElseIf question = "Asiakastietojen tietosuoja" Then
                    Sheets("Sheet1").Range(Cells(j, 50), Cells(j, i)) = value
                ElseIf question = "Ostajien tuntemus" Then
                    Sheets("Sheet1").Range(Cells(j, 51), Cells(j, i)) = value
                ElseIf question = "Tavoitteelliset myyntikeskustelutaidot" Then
                    Sheets("Sheet1").Range(Cells(j, 52), Cells(j, i)) = value
                ElseIf question = "Asiakkaan odotusten hallinta" Then
                    Sheets("Sheet1").Range(Cells(j, 53), Cells(j, i)) = value
                ElseIf question = "Asiakassuhteen kehittäminen" Then
                    Sheets("Sheet1").Range(Cells(j, 54), Cells(j, i)) = value
                ElseIf question = "Palvelukehitys" Then
                    Sheets("Sheet1").Range(Cells(j, 55), Cells(j, i)) = value
                ElseIf question = "Osallistaminen palvelukehittämiseen" Then
                    Sheets("Sheet1").Range(Cells(j, 56), Cells(j, i)) = value
                ElseIf question = "Palvelumuotoilu" Then
                    Sheets("Sheet1").Range(Cells(j, 57), Cells(j, i)) = value
                ElseIf question = "Palveluprosessien tuntemus" Then
                    Sheets("Sheet1").Range(Cells(j, 58), Cells(j, i)) = value
                ElseIf question = "Palveluongelmien ratkaisu" Then
                    Sheets("Sheet1").Range(Cells(j, 59), Cells(j, i)) = value
                ElseIf question = "Teknologian mahdollisuudet liiketoiminnassa" Then
                    Sheets("Sheet1").Range(Cells(j, 60), Cells(j, i)) = value
                ElseIf question = "Asiakasdatan hyödyntäminen" Then
                    Sheets("Sheet1").Range(Cells(j, 63), Cells(j, i)) = value
                ElseIf (question = "Asiakasymmärrys" And topic = "Markkinointi ja viestintä") Then
                    Sheets("Sheet1").Range(Cells(j, 64), Cells(j, i)) = value
                ElseIf question = "Brändin kehittäminen" Then
                    Sheets("Sheet1").Range(Cells(j, 65), Cells(j, i)) = value
                ElseIf (question = "Innovointi ja luova prosessi" And topic = "Markkinointi ja viestintä") Then
                    Sheets("Sheet1").Range(Cells(j, 66), Cells(j, i)) = value
                ElseIf question = "Sisältösuunnittelu ja sisällöntuotanto" Then
                    Sheets("Sheet1").Range(Cells(j, 67), Cells(j, i)) = value
                ElseIf question = "Digitaalinen asiakasvuorovaikutus" Then
                    Sheets("Sheet1").Range(Cells(j, 68), Cells(j, i)) = value
                ElseIf question = "Kanavaosaaminen" Then
                    Sheets("Sheet1").Range(Cells(j, 69), Cells(j, i)) = value
                ElseIf question = "Maksetun digitaalisen median hyödyntäminen" Then
                    Sheets("Sheet1").Range(Cells(j, 70), Cells(j, i)) = value
                ElseIf (question = "Kehittyvät teknologiat" And topic = "Markkinointi ja viestintä") Then
                    Sheets("Sheet1").Range(Cells(j, 71), Cells(j, i)) = value
                ElseIf (question = "Tekoäly ja koneoppiminen" And topic = "Markkinointi ja viestintä") Then
                    Sheets("Sheet1").Range(Cells(j, 72), Cells(j, i)) = value
                ElseIf (question = "Asiantuntijapalveluiden hyödyntäminen" And topic = "Markkinointi ja viestintä") Then
                    Sheets("Sheet1").Range(Cells(j, 73), Cells(j, i)) = value
                ElseIf question = "Asiakastietojen tietosuoja" Then
                    Sheets("Sheet1").Range(Cells(j, 74), Cells(j, i)) = value
                ElseIf question = "Kirjanpito ja taloudelliset tunnusluvut" Then
                    Sheets("Sheet1").Range(Cells(j, 75), Cells(j, i)) = value
                ElseIf question = "Juridiikan osaaminen" Then
                    Sheets("Sheet1").Range(Cells(j, 76), Cells(j, i)) = value
                ElseIf question = "Verotus" Then
                    Sheets("Sheet1").Range(Cells(j, 77), Cells(j, i)) = value
                ElseIf question = "Liiketoiminnan tukena toimiminen" Then
                    Sheets("Sheet1").Range(Cells(j, 78), Cells(j, i)) = value
                ElseIf question = "Asiakaspalvelu" Then
                    Sheets("Sheet1").Range(Cells(j, 79), Cells(j, i)) = value
                ElseIf question = "Taloushallinnon järjestelmien käyttö" Then
                    Sheets("Sheet1").Range(Cells(j, 80), Cells(j, i)) = value
                ElseIf question = "Taulukkolaskentaohjelmien käyttö" Then
                    Sheets("Sheet1").Range(Cells(j, 81), Cells(j, i)) = value
                ElseIf question = "Tietokantaohjelmistojen osaaminen" Then
                    Sheets("Sheet1").Range(Cells(j, 82), Cells(j, i)) = value
                ElseIf question = "Raportointiosaaminen" Then
                    Sheets("Sheet1").Range(Cells(j, 83), Cells(j, i)) = value
                ElseIf question = "Robotiikan hyödyntäminen" Then
                    Sheets("Sheet1").Range(Cells(j, 84), Cells(j, i)) = value
                ElseIf question = "Rahoituksen analysointi" Then
                    Sheets("Sheet1").Range(Cells(j, 85), Cells(j, i)) = value
                ElseIf question = "Rahoituksen suunnittelu" Then
                    Sheets("Sheet1").Range(Cells(j, 86), Cells(j, i)) = value
                ElseIf question = "Oman pääoman rahoitus" Then
                    Sheets("Sheet1").Range(Cells(j, 87), Cells(j, i)) = value
                ElseIf question = "Rahoitusrakenne" Then
                    Sheets("Sheet1").Range(Cells(j, 88), Cells(j, i)) = value
                ElseIf question = "Investointilaskelmat" Then
                    Sheets("Sheet1").Range(Cells(j, 89), Cells(j, i)) = value
                ElseIf question = "Julkinen rahoitus" Then
                    Sheets("Sheet1").Range(Cells(j, 90), Cells(j, i)) = value
                ElseIf question = "Yrityksen arvonmääritys" Then
                    Sheets("Sheet1").Range(Cells(j, 91), Cells(j, i)) = value
                ElseIf question = "Strateginen ajattelu ja strategiatyö" Then
                    Sheets("Sheet1").Range(Cells(j, 92), Cells(j, i)) = value
                ElseIf question = "Liiketoimintamallit" Then
                    Sheets("Sheet1").Range(Cells(j, 93), Cells(j, i)) = value
                ElseIf question = "Digitaalinen liiketoiminta" Then
                    Sheets("Sheet1").Range(Cells(j, 94), Cells(j, i)) = value
                ElseIf question = "Ennakointi ja toimintaympäristön analysointi" Then
                    Sheets("Sheet1").Range(Cells(j, 95), Cells(j, i)) = value
                ElseIf (question = "Kilpailijoiden analysointi" And topic = "Liiketoiminnan kehittäminen") Then
                    Sheets("Sheet1").Range(Cells(j, 96), Cells(j, i)) = value
                ElseIf (question = "Markkinoiden analysointi" And topic = "Liiketoiminnan kehittäminen") Then
                    Sheets("Sheet1").Range(Cells(j, 97), Cells(j, i)) = value
                ElseIf (question = "Asiakasymmärrys" And topic = "Liiketoiminnan kehittäminen") Then
                    Sheets("Sheet1").Range(Cells(j, 98), Cells(j, i)) = value
                ElseIf question = "Muutoksen johtaminen" Then
                    Sheets("Sheet1").Range(Cells(j, 99), Cells(j, i)) = value
                ElseIf question = "Kehitystyö" Then
                    Sheets("Sheet1").Range(Cells(j, 100), Cells(j, i)) = value
                ElseIf (question = "Innovointi ja luova prosessi" And topic = "Liiketoiminnan kehittäminen") Then
                    Sheets("Sheet1").Range(Cells(j, 101), Cells(j, i)) = value
                ElseIf question = "Prosessien kehittäminen" Then
                    Sheets("Sheet1").Range(Cells(j, 102), Cells(j, i)) = value
                ElseIf question = "Projektijohtaminen" Then
                    Sheets("Sheet1").Range(Cells(j, 103), Cells(j, i)) = value
                ElseIf (question = "Kehittyvät teknologiat" And topic = "Liiketoiminnan kehittäminen") Then
                    Sheets("Sheet1").Range(Cells(j, 104), Cells(j, i)) = value
                ElseIf (question = "Tekoäly ja koneoppiminen" And topic = "Liiketoiminnan kehittäminen") Then
                    Sheets("Sheet1").Range(Cells(j, 105), Cells(j, i)) = value
                ElseIf question = "Verkostojen johtaminen ja kehittäminen" Then
                    Sheets("Sheet1").Range(Cells(j, 106), Cells(j, i)) = value
                ElseIf (question = "Asiantuntijapalveluiden hyödyntäminen" And topic = "Liiketoiminnan kehittäminen") Then
                    Sheets("Sheet1").Range(Cells(j, 107), Cells(j, i)) = value
                ElseIf question = "Ihmisten johtaminen" Then
                    Sheets("Sheet1").Range(Cells(j, 108), Cells(j, i)) = value
                ElseIf question = "Suorituskyvyn johtaminen" Then
                    Sheets("Sheet1").Range(Cells(j, 109), Cells(j, i)) = value
                ElseIf question = "Viestintä ja vuorovaikutus" Then
                    Sheets("Sheet1").Range(Cells(j, 110), Cells(j, i)) = value
                ElseIf question = "Vastuullisuus" Then
                    Sheets("Sheet1").Range(Cells(j, 111), Cells(j, i)) = value
                End If
            Next answer
            
            j = j + 1
            
        End If
    Next

    
    
    
End Sub

