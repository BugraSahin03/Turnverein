"use strict";

class Fehler {
    constructor(fehlertext, fehlerliste, fehlerdialog){
        this._fehlerdialog = fehlerdialog
        this._fehlertext = fehlertext;
        this._fehlerliste = fehlerliste;        
        this._html = this._htmlGenerieren();
    }

    _htmlGenerieren(){
        let fehlerDiv = document.createElement("div");
        fehlerDiv.setAttribute("class", "fehlerbox");

        let fehlerSpan = document.createElement("span");
        fehlerSpan.textContent = this._fehlertext;
        fehlerDiv.insertAdjacentElement("afterbegin", fehlerSpan);
        
        let ul = document.createElement("ul");

        
        this._fehlerliste.forEach(e => {
            let li = document.createElement("li");
            li.textContent = e;
            ul.insertAdjacentElement("beforeend", li);
        });
        fehlerDiv.insertAdjacentElement("beforeend", ul);

        return fehlerDiv
    }

    entfernen(){
        let bestehendeFehlerbox = document.querySelector(".fehlerbox");
        if (bestehendeFehlerbox !== null){
            bestehendeFehlerbox.remove();
        }
    }

    anzeigen(){
        this.entfernen();
        let eingabeFormular = document.getElementById(this._fehlerdialog);
        if(eingabeFormular !== null){
            eingabeFormular.insertAdjacentElement("afterbegin", this._html);
        }
    }

}
