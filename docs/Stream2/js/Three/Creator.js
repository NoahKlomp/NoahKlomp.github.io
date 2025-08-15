"use strict";
class Creator extends PopUp {
    /**
     * Creates an instance of Creator.
     * This constructor is protected to prevent direct instantiation.
     * Use subclasses to create specific instances.
     */
    constructor(doAfter) {
        super();
        this.closeButton = document.createElement('a');
        this.form = document.createElement('form');
        this.types = document.createElement('select');
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
        };
    }
    close() {
    }
    static exportToCode(parent, index, text, main) {
        throw Error("not supported yet");
    }
}
