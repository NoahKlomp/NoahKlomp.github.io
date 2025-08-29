"use strict";
class Editor extends PopUp {
}
class TextEditor extends Editor {
    constructor(current, e, doAfter) {
        super();
        this.textInput = document.createElement("textarea");
        this.submitButton = document.createElement("button");
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
        this.setSize("fit-content", "fit-content");
        this.setPosition(e.clientX, e.clientY);
        this.open();
        this.textInput.select();
    }
}
