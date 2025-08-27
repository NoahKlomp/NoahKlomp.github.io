abstract class Editor extends PopUp {}

class TextEditor extends Editor {
    
    private static current:TextEditor | null;
    textInput:HTMLTextAreaElement = document.createElement("textarea");
    submitButton:HTMLButtonElement = document.createElement("button");
    constructor(current: Code,e:MouseEvent, doAfter: (newText: string) => void) {
        super();
        if (TextEditor.current) {
            TextEditor.current.close();
        }
        TextEditor.current = this;
        if (current instanceof StatementCode) {
            this.setBG(CONFIG.STATEMENT_COLOUR);
        } else if (current instanceof IfStatementCode) {
            this.setBG(CONFIG.IF_SHAPE_COLOUR);
        } else if (current instanceof ForLoopCode) {
            this.setBG(CONFIG.FOR_SHAPE_COLOUR);
        } else if (current instanceof WhileLoopCode) {
            this.setBG(CONFIG.WHILE_SHAPE_COLOUR);
        } else if (current instanceof DoWhileLoop) {
            this.setBG(CONFIG.DO_WHILE_SHAPE_COLOUR);
        }
        //todo: finish
        this.textInput.innerText = current.text;
        this.add(this.textInput);
        this.add(this.submitButton);
        this.submitButton.textContent = Words.get("Submit");
        this.submitButton.onclick = (e: Event) => {
            doAfter(this.textInput.value);
            this.close();
        }
        
        this.setSize("fit-content","fit-content");
        this.setPosition(e.pageX, e.pageY);
        this.open();
        // this.textInput.focus();
        // // Select the text field
        this.textInput.select();

    }

}