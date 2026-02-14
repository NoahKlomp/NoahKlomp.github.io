class CodeMaker {
    codeExport;
    constructor(codeExport) {
        this.codeExport = codeExport;
    }
    toCode() {
        return this.toCodeRecursive(this.codeExport.content);
    }
    static indent(size) {
        let s = "";
        for (let i = 0; i < size; i++) {
            s += "    ";
        }
        return s;
    }
}
class PythonCodeMaker extends CodeMaker {
    toCodeRecursive(codeExport, indent = 0) {
        return codeExport.map((val) => {
            const ind = CodeMaker.indent(indent);
            switch (val.type) {
                case CodeType.STATEMENT:
                    return `${CodeMaker.indent(indent)}# ${val.text.replace("\n", "\n" + CodeMaker.indent(indent) + "# ")}`;
                case CodeType.IF:
                    const trueCode = val.content["True"] || [];
                    const falseCode = val.content["False"] || [];
                    return `${ind}if ${val.text.replace("\n", " ")}:\n` +
                        `${this.toCodeRecursive(trueCode, indent + 1)}\n` +
                        ((falseCode.length == 0) ? "" : (falseCode.length == 1 && falseCode[0].type == CodeType.IF) ? (`el${this.toCodeRecursive(falseCode, indent).trimStart()}`) : (`${ind}else:\n` +
                            `${this.toCodeRecursive(falseCode, indent + 1)}`));
                case CodeType.DO_WHILE:
                    const dowhilecode = val.content["Looped"] || [];
                    return `${ind}while True:\n` +
                        `${this.toCodeRecursive(dowhilecode, indent + 1)}\n` +
                        `${CodeMaker.indent(indent + 1)}if not (${val.text.replace("\n", " ")}):\n` +
                        `${CodeMaker.indent(indent + 2)}break`;
                case CodeType.FOR:
                    const forcode = val.content["Looped"] || [];
                    return `${ind}for ${val.text.replace("\n", " ")}:\n` +
                        `${this.toCodeRecursive(forcode, indent + 1)}`;
                case CodeType.WHILE:
                    const whilecode = val.content["Looped"] || [];
                    return `${ind}while ${val.text.replace("\n", " ")}:\n` +
                        `${this.toCodeRecursive(whilecode, indent + 1)}`;
                default:
                    return "# " + Words.get("Unknown code");
            }
        }).join("\n");
    }
}
class JavaCodeMaker extends CodeMaker {
    toCodeRecursive(codeExport, indent = 0) {
        return codeExport.map((val) => {
            const ind = CodeMaker.indent(indent);
            switch (val.type) {
                case CodeType.STATEMENT:
                    return `${CodeMaker.indent(indent)}// ${val.text.replace("\n", "\n" + CodeMaker.indent(indent) + "# ")}`;
                case CodeType.IF:
                    const trueCode = val.content["True"] || [Creator.getExport("STATEMENT")];
                    const falseCode = val.content["False"] || [Creator.getExport("STATEMENT")];
                    return `${ind}if (/*${val.text.replace("\n", " ")}*/) {\n` +
                        `${this.toCodeRecursive(trueCode, indent + 1)}\n` +
                        `${ind}} ` +
                        ((falseCode.length == 0) ? "" : (falseCode.length == 1 && falseCode[0].type == CodeType.IF) ?
                            `else ${this.toCodeRecursive(falseCode, indent).trimStart()}` :
                            `else {\n` +
                                `${this.toCodeRecursive(falseCode, indent + 1)}\n` +
                                `${ind}}`);
                case CodeType.DO_WHILE:
                    const dowhilecode = val.content["Looped"] || [Creator.getExport("STATEMENT")];
                    return `${ind}do {\n` +
                        `${this.toCodeRecursive(dowhilecode, indent + 1)}\n` +
                        `${ind}} while (/*${val.text.replace("\n", " ")}*/);`;
                case CodeType.FOR:
                    const forcode = val.content["Looped"] || [Creator.getExport("STATEMENT")];
                    return `${ind}for (/*${val.text.replace("\n", " ")}*/) {\n` +
                        `${this.toCodeRecursive(forcode, indent + 1)}\n` +
                        `${ind}}`;
                case CodeType.WHILE:
                    const whilecode = val.content["Looped"] || [Creator.getExport("STATEMENT")];
                    return `${ind}while (/*${val.text.replace("\n", " ")}*/) {\n` +
                        `${this.toCodeRecursive(whilecode, indent + 1)}\n` +
                        `}`;
                default:
                    return "// " + Words.get("Unknown code");
            }
        }).join("\n");
    }
}
