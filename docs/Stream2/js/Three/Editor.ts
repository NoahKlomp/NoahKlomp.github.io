interface Editor {}

class TextEditor extends PopUp implements Editor {
    textInput:HTMLTextAreaElement = document.createElement("textarea");
    submitButton:HTMLButtonElement = document.createElement("button");
    constructor(current: Code, doAfter: (newText: string) => void) {
        super();
        if (current instanceof StatementCode) {
            this.setBG(CONFIG.STATEMENT_COLOUR);
        }
        //todo: finish
        this.textInput.innerText = current.text;
        this.add(this.textInput);
        this.add(this.submitButton);
        this.submitButton.textContent = "Submit";
        this.submitButton.onclick = (e: Event) => {
            doAfter(this.textInput.value);
            this.close();
        }
        this.setFullScreen();
        this.open();


    }

}