class Creator extends PopUp {
    private form: HTMLFormElement = document.createElement('form');
    private types: HTMLSelectElement = document.createElement('select');


    /*
        TODO: Add layout
     */
    /**
     * Creates an instance of Creator.
     * This constructor is protected to prevent direct instantiation.
     * Use subclasses to create specific instances.
     */
    constructor(doAfter: (export1: Export) => void) {
        super();
        this.add(this.form);
        this.form.appendChild(this.types);

        let thing = document.createElement("option");
        thing.textContent = "select";
        thing.disabled = true;
        this.types.appendChild(thing);

        for (let t in CodeType) {
            if (!(t == "FUNCTION" || t == "MAIN")) {
                let thing = document.createElement("option");
                thing.textContent = Words.get(t);
                thing.value = t;
                this.types.appendChild(thing);
            }

        }
        this.types.value = Words.get("Select");
        this.types.onchange = (e) => {
            e.preventDefault();
            try{
                return Creator.getExport(this.types.value);
            } finally {
                this.close();
            }
        }
        this.setSize("300","300");
        this.setPosition("50",50);
        this.setFullScreen();
        this.open();
    }

    static exportToCode(export1: Export, parent: CodeContainer, index: number): Code {
        switch (export1.type) {
            case CodeType.STATEMENT:
                return new StatementCode(parent, index, export1.text);
            case CodeType.WHILE.toString():
                if (export1.content) {
                    if (export1.content["Looped"]) {
                        const element = new WhileLoopCode(parent, index, export1.text);
                        export1.content['Looped'].forEach((value, i) => {
                            Creator.exportToCode(value, element.container, i);
                        });
                        return element;
                    }

                }
                throw new InvalidExportError("Cannot obtain Looped content");

            case CodeType.FOR.toString():
                if (export1.content) {
                    if (export1.content["Looped"]) {
                        const element = new ForLoopCode(parent, index, export1.text);
                        export1.content['Looped'].forEach((value, i) => {
                            Creator.exportToCode(value, element.container, i);
                        });
                        return element;
                    }
                }
                throw new InvalidExportError("Cannot obtain Looped content");
            case CodeType.DO_WHILE.toString():
                if (export1.content) {
                    if (export1.content["Looped"]) {
                        const element = new DoWhileLoop(parent, index, export1.text);
                        export1.content['Looped'].forEach((value, i) => {
                            Creator.exportToCode(value, element.container, i);
                        });
                        return element;
                    }
                }
                throw new InvalidExportError("Cannot obtain Looped content");
            case CodeType.IF.toString():
                if (export1.content) {
                    if (export1.content["True"] && export1.content["False"]) {
                        const element = new IfStatementCode(parent, index, export1.text);
                        export1.content['True'].forEach((value, i) => {
                            Creator.exportToCode(value, element._trueContent, i);
                        });
                        export1.content['False'].forEach((value, i) => {
                            Creator.exportToCode(value, element._falseContent, i);
                        });
                        return element;
                    }
                }
                throw new InvalidExportError("Cannot obtain True and False content");

            default:
                throw new InvalidExportError("Given Export is not readable, export:" + export1);

        }
    }
    static programExportToMain(pe:ProgramExport, parentElement: HTMLElement): Main {
        const m = new Main(parentElement);
        const titleEl = document.querySelector("title")
        if (titleEl) {
            titleEl.innerHTML = pe.name;
        }
        pe.content.forEach((value, i) => {
            Creator.exportToCode(value, m.container, i);
        })
        return m;
    }
    static getExport(s:string):Export {
        switch (s) {
            case 'STATEMENT':
                return ({
                    type: CodeType.STATEMENT,
                    content: {},
                    text: "Empty Statement"
                });
            case 'WHILE':
                return ({
                    type: CodeType.WHILE,
                    content: {
                        Looped: [
                            {
                                type: CodeType.STATEMENT,
                                content: {},
                                text: "Empty Statement"
                            }
                        ]
                    },
                    text: "empty condition"
                });
            case 'FOR':
                return ({
                    type: CodeType.FOR,
                    content: {
                        Looped: [
                            {
                                type: CodeType.STATEMENT,
                                content: {},
                                text: "Empty Statement"
                            }
                        ]
                    },
                    text: "empty iteration"
                });
            case 'DO_WHILE':
                return ({
                    type: CodeType.DO_WHILE,
                    content: {
                        Looped: [
                            {
                                type: CodeType.STATEMENT,
                                content: {},
                                text: "Empty Statement"
                            }
                        ]
                    },
                    text: "empty condition"
                });
            case 'FUNCTION':
                return ({
                    type: CodeType.FUNCTION,
                    content: {
                        FunctionDefinition: [
                            {
                                type: CodeType.STATEMENT,
                                content: {},
                                text: "Empty Statement"
                            }
                        ]
                    },
                    text: "empty condition"
                });
            case 'IF':
                return ({
                    type: CodeType.IF,
                    content: {
                        True: [
                            {
                                type: CodeType.STATEMENT,
                                content: {},
                                text: "Empty Statement"
                            }
                        ],
                        False: [
                            {
                                type: CodeType.STATEMENT,
                                content: {},
                                text: "Empty Statement"
                            }
                        ]
                    },
                    text: "empty condition"
                });
            default:
                throw new InvalidExportError("Not recognized type name: " + s);
        }
    }
}

class InvalidExportError extends Error {
    constructor(message: string) {
        super(message);
    }
}

