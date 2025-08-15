class Creator extends PopUp {
    private closeButton: HTMLAnchorElement = document.createElement('a');
    private form: HTMLFormElement = document.createElement('form');
    private types: HTMLSelectElement = document.createElement('select');
    /**
     * Creates an instance of Creator.
     * This constructor is protected to prevent direct instantiation.
     * Use subclasses to create specific instances.
     */
    constructor(doAfter:(export1: Export) => void) {
        super();
        this.element.appendChild(this.closeButton);
        this.element.appendChild(this.form);
        this.form.appendChild(this.types);
        this.closeButton.innerHTML = 'Close';
        this.closeButton.className = 'close-button';
        this.closeButton.style.display = 'block';
        this.closeButton.onclick = this.close.bind(this);
        for (let t in CodeType) {
            let thing = document.createElement("option");
            thing.textContent = t;
            this.types.appendChild(thing);
        }
        this.types.onchange = (e) => {
            e.preventDefault();
            switch (this.types.value) {
                case 'StatementCode':
                    return {
                        type: 'StatementCode',
                        content: null,
                        text: "Empty Statement"
                    };
                    break;
                //TODO: finish
            }
            this.close();
        }
    }
    close() {

    }
    static exportToCode(parent: CodeContainer, index: number, text: string, main:Main):Code {
        throw Error("not supported yet");
    }
}