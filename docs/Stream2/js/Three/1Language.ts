const languages = ["nl","en"];

const FLOWCHART_COMPRESSION_PREFIX = "gzip:";
let lastFlowchartJson = "";
let flowchartUrlRevision = 0;

async function compressFlowchart(json: string): Promise<string | null> {
    if (typeof CompressionStream === "undefined" || typeof DecompressionStream === "undefined") {
        return null;
    }

    const stream = new Blob([json]).stream().pipeThrough(new CompressionStream("gzip"));
    const bytes = new Uint8Array(await new Response(stream).arrayBuffer());
    let binary = "";
    for (let i = 0; i < bytes.length; i += 0x8000) {
        binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
    }
    const base64Url = btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    return FLOWCHART_COMPRESSION_PREFIX + base64Url;
}

async function decompressFlowchart(value: string): Promise<string> {
    if (!value.startsWith(FLOWCHART_COMPRESSION_PREFIX)) {
        return value;
    }
    if (typeof DecompressionStream === "undefined") {
        throw new Error("This browser cannot open compressed flowchart links. Try a current browser.");
    }

    const base64 = value.slice(FLOWCHART_COMPRESSION_PREFIX.length)
        .replace(/-/g, "+")
        .replace(/_/g, "/");
    const paddedBase64 = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const binary = atob(paddedBase64);
    const bytes = Uint8Array.from(binary, character => character.charCodeAt(0));
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));
    return new Response(stream).text();
}

function updateFlowchartUrl(json: string): void {
    if (json === lastFlowchartJson) {
        return;
    }
    lastFlowchartJson = json;
    const revision = ++flowchartUrlRevision;

    void (async () => {
        let value: string;
        try {
            const compressed = await compressFlowchart(json);
            value = compressed && encodeURIComponent(compressed).length < encodeURIComponent(json).length
                ? compressed
                : json;
        } catch (error) {
            console.warn("Could not compress the flowchart; keeping the URL compatible with older links.", error);
            value = json;
        }

        if (revision !== flowchartUrlRevision) {
            return;
        }

        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("init", value);
        const newURL = `${window.location.pathname}?${searchParams.toString()}${window.location.hash}`;
        history.replaceState(history.state, "", newURL);
    })();
}

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
            ["OUTPUT", "Uitvoer"],
            ["WHILE", "While lus"],
            ["While","Zolang"],
            ["For","Voor elke"],
            ["FOR", "for lus"],
            ["DO_WHILE", "Do-While lus"],
            ["IF", "keuze"],
            ["Run", "Uitvoeren"],
            ["RunHelp", "Gebruik opdrachten zoals naam = expressie. Uitvoerblokken evalueren expressies. For-lussen: i from 1 to 10 of i van 1 tot en met 10."],
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
            ["OUTPUT", "Output"],
            ["Run", "Run"],
            ["RunHelp", "Assignments use name = expression. Output blocks evaluate expressions. For loops use i from 1 to 10 or i van 1 tot en met 10."],
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
