"use strict";
class TextEditor extends PopUp {
    constructor(current, doAfter) {
        super();
        this.textInput = document.createElement("textarea");
        this.submitButton = document.createElement("button");
        if (current instanceof StatementCode) {
            this.setBG(CONFIG.STATEMENT_COLOUR);
        }
        //todo: finish
        this.textInput.innerText = current.text;
        this.add(this.textInput);
        this.add(this.submitButton);
        this.submitButton.textContent = "Submit";
        this.submitButton.onclick = (e) => {
            doAfter(this.textInput.value);
            this.close();
        };
        this.setFullScreen();
        this.open();
    }
}
