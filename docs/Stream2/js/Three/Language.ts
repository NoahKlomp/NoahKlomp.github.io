const languages = ["nl","en"];

function updateURLParams(params: Record<string, string>): void {
    
    const searchParams = new URLSearchParams(window.location.search);
    for (const [key, value] of Object.entries(params)) {
        if (value) searchParams.set(key, value); // Only set non-empty values
    }
    const newURL = `${window.location.pathname}?${searchParams.toString()}`;
    history.replaceState(params, '', newURL); // Update URL without reloading
}
(()=>{
const current_lan = new URLSearchParams(window.location.search);
updateURLParams({
    lan: current_lan.get("lan") || window.navigator.language.split("-")[0]
});
})()
class Translator {
    private static fullMap:Map<string,Map<string,string>> = new Map<string,Map<string,string>>()
        .set("nl",new Map<string,string>()
            .set("Main Program", "Hoofdprogramma")
            .set("true", "waar")
            .set("false", "onwaar")
            .set("Submit", "Pas toe")
            .set("Quick tutorial", "Korte handleiding")
            .set("Adding nodes", "Blokken toevoegen")
            .set("addingNodesGuide", "Klik op de pijl tussen de begin en eind cirkel om een nieuw blok toe te voegen. Probeer hieronder.")
            .set("Changing nodes", "Blokken aanpassen")
            .set("changingNodesGuide", "Klik op een blok om de tekst erop aan te passen.")
            .set("Edit me!", "Pas me aan!")
            .set("Deleting nodes", "Blokken aanpassen")
            .set("Delete me!", "Verwijder me!")
            .set("deletingNodesGuide", "Klik met rechter muisknop op een blok om deze aan te passen.")
            .set("Select", "Selecteer")
            .set("STATEMENT", "Opdracht")
            .set("WHILE", "Zolang lus")
            .set("FOR", "Voor-elke lus")
            .set("DO_WHILE", "Doe-zolang lus")
            .set("IF", "Als keuze")
            .set("Add", "Voeg")
            .set("add2"," toe")
            .set("Remove", "Verwijderen")
            .set("Add After", "Hierna toevoegen")
            .set("Edit Text", "Tekst aanpassen")
            .set("Copy Code", "Kopieer code")
            .set("Copy URL", "Kopieer URL")
            .set("Unknown code", "Onbekende code")
            .set("To Python Comments", "Naar Python commentaar")
            .set("To Java Comments", "Naar Java commentaar")
            .set("Reset", "Reset")
            .set("End", "Einde")
            .set("Start", "Start")
            .set("Export to image", "Als afbeelding opslaan")
        )
        .set("en",new Map<string,string>()
            .set("Main Program", "Main Program")
            .set("addingNodesGuide", "Click on the arrow between two nodes to add a new node in between. You can try below.")
            .set("changingNodesGuide", "Click on a node to edit the text inside it.")
            .set("deletingNodesGuide", "Right-click on a node and left-click on remove, to remove the node from the flowchart.")
            .set("STATEMENT", "Statement")
            .set("WHILE", "While loop")
            .set("FOR", "For-each loop")
            .set("DO_WHILE", "Do-While loop")
            .set("IF", "If choice")
            .set("Add", "Add")
            .set("add2", " ")
        );
    private static get urlpars() {
        return new URLSearchParams(location.search);
    } 
    static get(word:string, lan:string = this.lan):string {
        if (this.fullMap.has(lan)){
            const map = this.fullMap.get(lan);
            return map ? (map.get(word) || word) : word;
        } else return word;
    }
    private static get lan():string {
        return languages.includes(this.urlpars.get("lan")||"")? (this.urlpars.get("lan")||""): "en" ;
    }
}
class Words extends Translator {}

(document.getElementById('CopyUrlButton')||document.createElement("button")).innerHTML = Words.get('Copy URL');
(document.getElementById('PythonButton')||document.createElement("button")).innerHTML = Words.get('To Python Comments');
(document.getElementById('JavaButton')||document.createElement("button")).innerHTML = Words.get('To Java Comments');
(document.getElementById('ResetButton')||document.createElement("button")).innerHTML = Words.get('Reset');
(document.getElementById('toImgButton')||document.createElement("button")).innerHTML = Words.get('Export to image');