"use strict";
class Creator extends PopUp {
    /*
        TODO:
          - Add layout
     */
    /**
     * Creates an instance of Creator.
     * This constructor is protected to prevent direct instantiation.
     * Use subclasses to create specific instances.
     */
    constructor(doAfter) {
        super();
        this.form = document.createElement('form');
        this.types = document.createElement('select');
        this.add(this.form);
        this.form.appendChild(this.types);
        let thing = document.createElement("option");
        thing.textContent = "select";
        thing.disabled = true;
        this.types.appendChild(thing);
        for (let t in CodeType) {
            if (!(t == "FUNCTION" || t == "MAIN")) {
                let thing = document.createElement("option");
                thing.textContent = t;
                this.types.appendChild(thing);
            }
        }
        this.types.value = "select";
        this.types.onchange = (e) => {
            e.preventDefault();
            try {
                switch (this.types.value) {
                    case 'STATEMENT':
                        doAfter({
                            type: CodeType.STATEMENT,
                            content: {},
                            text: "Empty Statement"
                        });
                        break;
                    case 'WHILE':
                        doAfter({
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
                        break;
                    case 'FOR':
                        doAfter({
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
                        break;
                    case 'DO_WHILE':
                        doAfter({
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
                        break;
                    case 'FUNCTION':
                        doAfter({
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
                        break;
                    case 'IF':
                        doAfter({
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
                        break;
                    default:
                        throw new InvalidExportError("Not recognised type name: " + this.types.value);
                }
            }
            finally {
                this.close();
            }
        };
        this.setFullScreen();
        this.open();
    }
    static exportToCode(export1, parent, index) {
        switch (export1.type) {
            case CodeType.STATEMENT:
                return new StatementCode(parent, index, export1.text);
            case CodeType.WHILE:
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
            case CodeType.FOR:
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
            case CodeType.DO_WHILE:
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
            case CodeType.IF:
                if (export1.content) {
                    if (export1.content["True"] && export1.content["False"]) {
                        const element = new IfStatementCode(parent, index, export1.text);
                        export1.content['True'].forEach((value, i) => {
                            Creator.exportToCode(value, element._falseContent, i);
                        });
                        export1.content['False'].forEach((value, i) => {
                            Creator.exportToCode(value, element._trueContent, i);
                        });
                        return element;
                    }
                }
                throw new InvalidExportError("Cannot obtain True and False content");
            default:
                throw new InvalidExportError("Given Export is not readable, export:" + export1);
        }
    }
    static programExportToMain(pe, parentElement) {
        const m = new Main(parentElement);
        const titleEl = document.querySelector("title");
        if (titleEl) {
            titleEl.innerHTML = pe.name;
        }
        pe.content.forEach((value, i) => {
            Creator.exportToCode(value, m.container, i);
        });
        return m;
    }
}
class InvalidExportError extends Error {
    constructor(message) {
        super(message);
    }
}
