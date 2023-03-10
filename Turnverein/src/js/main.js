"use strict";
let alleEintraege = [];

//Steurt das schließen und öffnen vom Dialog Mitgliederhinzufügen 
const dialogAufrufe = function() {  
    var dialog = document.getElementById('DialogExample');  
    document.querySelector("#absenden").onclick = () => dialog.close();        //Das ist der Button mit der Aufschrifft Hinzufügen
    document.getElementById('show').onclick = () =>   dialog.show();           //Das ist der Button mit der Aufschrifft Mitglieder Hinzufügen
    document.getElementById('hide').onclick = () => {                          //Das ist der Button mit der Aufschrifft Schliesen
        dialog.close();
        let bestehendeFehlerbox = document.querySelector(".fehlerbox");        //wir schauen ob es eine Fehlerbox gibt, wenn ja wird sie entfernt 
            if (bestehendeFehlerbox !== null){
                bestehendeFehlerbox.remove();
            }
    };          
  
    //News & Aktuelles
    let dialogNews = document.getElementById("newsDialog");
    document.getElementById("newsButtonOpen").onclick = () => dialogNews.show();
    document.getElementById("newsButtonSubmit").onclick = () => dialogNews.close();
    document.getElementById("newsButtonClose").onclick = () => dialogNews.close();

   
    //Mitglieder Liste
    let dialogMitgliederListe = document.getElementById("auflistungVonMitgliedern"); 
    document.getElementById("mietgliederAuflisten").onclick = () => dialogMitgliederListe.show();
    document.getElementById("mietgliederAuflistenschliesen").onclick = () => dialogMitgliederListe.close();

    // Stundenplan
    let dialogStundenPlan = document.getElementById("stundenPlanDialog");
    document.getElementById("stundenplanVerwaltenButton").onclick = () => dialogStundenPlan.show();
    document.getElementById("stundenplanButtonHinzufuegen").onclick = () => dialogStundenPlan.close();
    document.getElementById("stundenplanButtonSchliesen").onclick = () => {
        dialogStundenPlan.close()
        let bestehendeFehlerbox = document.querySelector(".fehlerbox"); 
            if (bestehendeFehlerbox !== null){
                bestehendeFehlerbox.remove();
            }
    };

    

    // Event-Listener für die Import- und Export-Buttons hinzufügen
    document.getElementById('exportBtn').onclick = () => {  
      const newWindow = window.open();
      const xmlData = exportToXml(alleEintraege);
      newWindow.document.write(xmlData);
      console.log(xmlData);
    }
}; 
dialogAufrufe();

                                        //Mitglieder//
const absenden = function() {
    let form = document.querySelector(" #eingabeformular");
    let eingabe = {};
    form.addEventListener("submit", e => {
        e.preventDefault();
        eingabe = {
            name: e.target.elements.name.value,
            nachname: e.target.elements.nachname.value,
            geburtsdatum: e.target.elements.geburtsdatum.value,
            strasse: e.target.elements.strasse.value,
            hausnummer: e.target.elements.hausnummer.value,
            iban: e.target.elements.iban.value
        };        

        let eingabeFehler = datenValidieren(eingabe);           //ist ein array mit Fehlern drinnen 
        if (eingabeFehler.length === 0){ 
            mitgliederHtmlHinzufügen(eingabe);
            let bestehendeFehlerbox = document.querySelector(".fehlerbox");     //wir schauen ob es eine Fehlerbox gibt, wenn ja wird sie entfernt 
            if (bestehendeFehlerbox !== null){
                bestehendeFehlerbox.remove();
            }
            e.target.reset();
        }else{
            var dialog = document.getElementById('DialogExample');  
            dialog.show();
            let fehler = new Fehler("Folgende Felder wurden nicht Korrekt ausgefüllt", eingabeFehler,"DialogExample");
            fehler.anzeigen();                
        }
        alleEintraege.push(eingabe);
    }
    ) 
    return eingabe;
}
absenden();

const datenValidieren = function(eingabe){
    let fehler = [];
    if (eingabe.name.trim() === ""){
      fehler.push("Name");
    }
    if (eingabe.nachname.trim() === ""){
      fehler.push("Nachname");
    }
    if (eingabe.strasse.trim() === ""){
      fehler.push("Strasse");
    }
    if (eingabe.hausnummer.trim() === ""){
      fehler.push("Hausnummer");
    }
    if (eingabe.iban.trim() === ""){
      fehler.push("IBAN");
    }
    if (eingabe.geburtsdatum === ""){
      fehler.push("Geburtsdatum");
    }
    return fehler;
}


const mitgliederHtmlHinzufügen = function(objektMitEinträgen){
    //HTML in den Dialog einfügen 
    let spaniban = document.createElement("span");
    let spanname = document.createElement("span");
    let spannachname = document.createElement("span");
    let spangeburtsdatum = document.createElement("span");
    let spanstrasse = document.createElement("span");
    let spanhausnummer = document.createElement("span");

    let loeschbutton = document.createElement("button");
    let ul = document.createElement("ul");
    let li = document.createElement("li");
    li.setAttribute("data-timestamp", Date.now());

    loeschbutton.textContent = "X";
    loeschbutton.setAttribute("id", "mitgliedEntfernen");
    loeschbutton.setAttribute("class", "standard"); 

    
    li.insertAdjacentElement("afterbegin", spaniban);
    li.insertAdjacentElement("afterbegin", spanhausnummer);
    li.insertAdjacentElement("afterbegin", spanstrasse);
    li.insertAdjacentElement("afterbegin", spangeburtsdatum);
    li.insertAdjacentElement("afterbegin", spannachname);
    li.insertAdjacentElement("afterbegin", spanname);
    li.insertAdjacentElement("beforeend", loeschbutton);
    ul.insertAdjacentElement("afterbegin", li);
    
    spaniban.textContent= " " + objektMitEinträgen.iban;
    spanhausnummer.textContent=" " + objektMitEinträgen.hausnummer;
    spanstrasse.textContent=" " + objektMitEinträgen.strasse;
    spangeburtsdatum.textContent=" " + objektMitEinträgen.geburtsdatum;
    spanname.textContent = objektMitEinträgen.name;
    spannachname.textContent = " " + objektMitEinträgen.nachname;

    let htmlEinbindung = document.getElementById("eintraegeHier");
    htmlEinbindung.insertAdjacentElement("afterend", ul);

    mitgliedEntfernenButton(li);

}


const mitgliedEntfernenButton = function(){
    //Mitglied auswählen durch den Timestamp & Entfernen
    let button = document.getElementById("mitgliedEntfernen");
    console.log(button)
    button.onclick = e => {
        let test = e.target.parentElement
        test.remove();
    }
}

                                        //News//
const  newsAktuelles= function(){
    let form = document.querySelector("#newsFormular");
    form.addEventListener("submit", e => {
        e.preventDefault();
        let text = e.target.elements.news.value;
        newsAktuellesHtmlHinzufügen(text);
        e.target.reset();
    })
}
newsAktuelles();

const newsAktuellesHtmlHinzufügen = function(text){
    
    // es wsoll ein Timesatamp aufescghebene werden von wann es gemacht wurde     
let article = document.createElement("article");
article.textContent = text;
let hr = document.createElement("hr");
article.insertAdjacentElement("afterbegin", hr);

let htmlEinbindung = document.getElementById("newsEinfugen");
htmlEinbindung.insertAdjacentElement("afterbegin", article);
}


                                        //Stundenplan//
const stundenplanValidieren = function(eingabe){
    let fehler = [];
    if (eingabe.turnart.trim() === ""){
      fehler.push("Turnart");
    }
    if (eingabe.trainer.trim() === ""){
      fehler.push("Nachname");
    } 
    if (eingabe.datum.trim() === ""){
        fehler.push("Datum");
    }
    if (eingabe.dauer.trim() === ""){
      fehler.push("Dauer");
    }
   
    return fehler;
}

const stundenplanHTML = function(stundenplanObjekt){
    let spanTurnart = document.createElement("span");
    let spanTrainer = document.createElement("span");
    let spanDauer = document.createElement("span");
    let spanDatum = document.createElement("span")
    let loeschbutton = document.createElement("button");
    let div = document.createElement("div");
    div.setAttribute("class", "item")
    let br = document.createElement("br");
    let br2 = document.createElement("br");
    let br3 = document.createElement("br");
    let br4 = document.createElement("br");
    div.setAttribute("data-timestamp", Date.now());

    let p = document.createElement("p");
    p.textContent= "hallo"

    loeschbutton.textContent = "x";
    loeschbutton.setAttribute("id", "stundenplanEntfernen");
    loeschbutton.setAttribute("class", "standard"); 


    div.insertAdjacentElement("afterbegin", spanDauer);
    div.insertAdjacentElement("afterbegin", spanDatum)
    div.insertAdjacentElement("afterbegin", spanTrainer);
    div.insertAdjacentElement("afterbegin", spanTurnart);

    spanDauer.insertAdjacentElement("afterend",br4)
    spanDatum.insertAdjacentElement("afterend", br3)
    spanTrainer.insertAdjacentElement("afterend",br2);
    spanTurnart.insertAdjacentElement("afterend",br);
    div.insertAdjacentElement("beforeend", loeschbutton);

    spanTurnart.textContent= "Turnart: " + stundenplanObjekt.turnart;
    spanTrainer.textContent="Trainer: " + stundenplanObjekt.trainer;
    spanDauer.textContent="Dauer: " + stundenplanObjekt.dauer;
    spanDatum.textContent="Datum: " + stundenplanObjekt.datum;

    let htmlEinbindung = document.getElementById("stundenplanEinbinden")
    htmlEinbindung.insertAdjacentElement("afterbegin",div)
    stundenplanEntfernenButton(div);
    
}
const stundenplanAbesenden = function(){
    let form = document.getElementById("stundenPlanDialog")
    let eingabe = {};

    form.addEventListener("submit", e => {
        e.preventDefault();
        console.log(eingabe);
        eingabe = {
            turnart: e.target.elements.sportart.value,
            trainer: e.target.elements.trainer.value,
            datum: e.target.elements.datum.value,
            dauer: e.target.elements.dauer.value
        };
        console.log(eingabe.datum);
        let eingabeFehler = stundenplanValidieren(eingabe);
        console.log(eingabeFehler)

        if (eingabeFehler.length === 0){ 
            stundenplanHTML(eingabe);
            let bestehendeFehlerbox = document.querySelector(".fehlerbox");
            if (bestehendeFehlerbox !== null){
                bestehendeFehlerbox.remove();
            }
            e.target.reset();
        }else{
            var dialog = document.getElementById('stundenPlanDialog');  
            dialog.show();
            let fehler = new Fehler("Folgende Felder wurden nicht Korrekt ausgefüllt", eingabeFehler,"stundenPlanDialog");
            fehler.anzeigen();                
        }

    })
}
stundenplanAbesenden();

const stundenplanEntfernenButton = function(){
  let button = document.getElementById("stundenplanEntfernen");
  console.log(button)
  button.onclick = e => {
      let test = e.target.parentElement
      
      test.remove();
  }
}


//////////////////xml import export //////////////////


// Funktion zum Parsen der XML-Datei
function parseXML(xml) {
    // Mitgliederdaten aus der XML-Datei extrahieren
    let members = [];
    $(xml).find('member').each(function () {
      let name = $(this).find('Name').text();
      let surname = $(this).find('Nachname').text();
      let street = $(this).find('Strasse').text();
      let houseNumber = $(this).find('Hausnummer').text();
      let birthDate = $(this).find('Geburtsdatum').text();
      let iban = $(this).find('Iban').text();
  
      members.push({ name, surname, street, houseNumber, birthDate, iban });
    });
    xmlHtmlGenerieren(members);

    members.forEach(e => {
      alleEintraege.push(e);
    })
    return members;

}
const xmlHtmlGenerieren = function(arrayMitDaten){
    
    arrayMitDaten.forEach((e)=> {
      let spaniban = document.createElement("span");
      let spanname = document.createElement("span");
      let spannachname = document.createElement("span");
      let spangeburtsdatum = document.createElement("span");
      let spanstrasse = document.createElement("span");
      let spanhausnummer = document.createElement("span");
  
      let loeschbutton = document.createElement("button");
      let ul = document.createElement("ul");
      let li = document.createElement("li");
      li.setAttribute("data-timestamp", Date.now());
      
      loeschbutton.textContent = "X";
      loeschbutton.setAttribute("id", "mitgliedEntfernen");
      loeschbutton.setAttribute("class", "standard"); 

      li.insertAdjacentElement("afterbegin", spaniban);
      li.insertAdjacentElement("afterbegin", spanhausnummer);
      li.insertAdjacentElement("afterbegin", spanstrasse);
      li.insertAdjacentElement("afterbegin", spangeburtsdatum);
      li.insertAdjacentElement("afterbegin", spannachname);
      li.insertAdjacentElement("afterbegin", spanname);
      li.insertAdjacentElement("beforeend", loeschbutton);
      ul.insertAdjacentElement("afterbegin", li);     
      
      spaniban.textContent= " " + e.iban;
      spanhausnummer.textContent=" " + e.houseNumber;
      spanstrasse.textContent=" " + e.street;
      spangeburtsdatum.textContent=" " + e.birthDate;
      spanname.textContent = e.name;
      spannachname.textContent = " " + e.surname;

      let htmlEinbindung = document.getElementById("eintraegeHier");
      htmlEinbindung.insertAdjacentElement("afterend", ul);
  
      mitgliedEntfernenButton(li);

      
    })
    
}

// Funktion zum Importieren von Mitgliederdaten aus einer XML-Datei
function importMembers() {
    let input = document.createElement('input');
    input.type = 'file';
  
    input.onchange = function () {
      let file = this.files[0];
      let reader = new FileReader();
      reader.readAsText(file);
  
      reader.onload = function () {
          return parseXML(reader.result);
      };
    };
  
    input.click();
}

document.getElementById('import-btn').addEventListener('click', importMembers);


//Funktion für download xml 
function downloadXml(filename, data) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/xml;charset=utf-8,' + encodeURIComponent(data));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
    document.body.removeChild(element);
}

//neue Export-Funktion
function exportToXml(data) {

    const doc = document.implementation.createDocument(null, "data", null);
    data.forEach((entry) => {
        const entryNode = doc.createElement("entry");

        Object.keys(entry).forEach((key) => {
            const keyNode = doc.createElement(key);
            const valueNode = doc.createTextNode(entry[key]);
            keyNode.appendChild(valueNode);
            entryNode.appendChild(keyNode);
        });

        doc.documentElement.appendChild(entryNode);
    });
    
    const serializer = new XMLSerializer();
    const xmlString = serializer.serializeToString(doc);
    downloadXml('members.xml', xmlString);
}