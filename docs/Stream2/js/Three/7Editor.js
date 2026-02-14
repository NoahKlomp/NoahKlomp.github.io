"use strict";
class Editor extends PopUp {
}
;
class TextEditor extends Editor {
    static current = null;
    textInput = document.createElement("textarea");
    submitButton = document.createElement("button");
    constructor(current, e, doAfter) {
        super();
        if (TextEditor.current) {
            TextEditor.current.close();
        }
        TextEditor.current = this;
        if (current instanceof StatementCode) {
            this.setBG(CONFIG.STATEMENT_COLOUR);
        }
        else if (current instanceof IfStatementCode) {
            this.setBG(CONFIG.IF_SHAPE_COLOUR);
        }
        else if (current instanceof ForLoopCode) {
            this.setBG(CONFIG.FOR_SHAPE_COLOUR);
        }
        else if (current instanceof WhileLoopCode) {
            this.setBG(CONFIG.WHILE_SHAPE_COLOUR);
        }
        else if (current instanceof DoWhileLoop) {
            this.setBG(CONFIG.DO_WHILE_SHAPE_COLOUR);
        }
        this.textInput.innerText = current.text;
        this.add(this.textInput);
        this.add(this.submitButton);
        this.submitButton.textContent = Words.get("Submit");
        this.submitButton.onclick = (e) => {
            doAfter(this.textInput.value);
            this.close();
        };
        // bla bla
        this.setSize("fit-content", "fit-content");
        this.setPosition(e.clientX, e.clientY);
        this.open();
        this.textInput.select();
    }
}
