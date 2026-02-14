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
        .set("nl",new Map<string,string>([
            ["Main Program", "Hoofdprogramma"],
            ["true", "waar"],
            ["false", "onwaar"],
            ["Submit", "Pas toe"],
            ["Quick tutorial", "Korte handleiding"],
            ["Adding nodes", "Blokken toevoegen"],
            ["addingNodesGuide", "Klik op de pijl tussen de begin en eind cirkel om een nieuw blok toe te voegen. Probeer hieronder."],
            ["Changing nodes", "Blokken aanpassen"],
            ["changingNodesGuide", "Klik op een blok om de tekst erop aan te passen."],
            ["Edit me!", "Pas me aan!"],
            ["Deleting nodes", "Blokken aanpassen"],
            ["Delete me!", "Verwijder me!"],
            ["deletingNodesGuide", "Klik met rechter muisknop op een blok om deze aan te passen."],
            ["Select", "Selecteer"],
            ["STATEMENT", "Opdracht"],
            ["WHILE", "While lus"],
            ["FOR", "for lus"],
            ["DO_WHILE", "Do-While lus"],
            ["IF", "keuze"],
            ["Add", "Voeg"],
            ["add2"," toe"],
            ["Remove", "Verwijderen"],
            ["Add After", "Hierna toevoegen"],
            ["Edit Text", "Tekst aanpassen"],
            ["Copy Code", "Kopieer code"],
            ["Copy URL", "Kopieer URL"],
            ["Unknown code", "Onbekende code"],
            ["To Python Comments", "Naar Python commentaar"],
            ["To Java Comments", "Naar Java commentaar"],
            ["Reset", "Reset"],
            ["End", "Einde"],
            ["Start", "Start"],
            ["Export to image", "Als afbeelding opslaan"]]
        ))
        .set("en",new Map<string,string>([
            ["Main Program", "Main Program"],
            ["addingNodesGuide", "Click on the arrow between two nodes to add a new node in between. You can try below."],
            ["changingNodesGuide", "Click on a node to edit the text inside it."],
            ["deletingNodesGuide", "Right-click on a node and left-click on remove, to remove the node from the flowchart."],
            ["STATEMENT", "Statement"],
            ["WHILE", "While loop"],
            ["FOR", "For-each loop"],
            ["DO_WHILE", "Do-While loop"],
            ["IF", "If choice"],
            ["Add", "Add"],
            ["add2", " "]
        ]));
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

