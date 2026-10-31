type RuntimeValue = number | string | boolean;

type ExpressionToken =
    | { type: "literal", value: RuntimeValue }
    | { type: "identifier", text: string }
    | { type: "operator", text: string }
    | { type: "leftParen" }
    | { type: "rightParen" }
    | { type: "end" };

class FlowchartInterpreter {
    private readonly variables = new Map<string, RuntimeValue>();
    private readonly output: string[] = [];
    private steps = 0;
    private static readonly MAX_STEPS = 10000;
    private static readonly MAX_OUTPUT_LINES = 1000;

    constructor(private readonly program: ProgramExport) {}

    execute(): string[] {
        this.runNodes(this.program.content);
        return this.output;
    }

    private runNodes(nodes: Export[]): void {
        for (const node of nodes) {
            this.tick();
            switch (node.type) {
                case CodeType.STATEMENT:
                    this.runStatement(node.text);
                    break;
                case CodeType.OUTPUT:
                    if (this.output.length >= FlowchartInterpreter.MAX_OUTPUT_LINES) {
                        throw new Error("Output limit exceeded.");
                    }
                    this.output.push(this.formatValue(this.evaluate(node.text)));
                    break;
                case CodeType.IF:
                    this.runNodes(this.requireBoolean(node.text, "if condition")
                        ? node.content["True"] || []
                        : node.content["False"] || []);
                    break;
                case CodeType.FOR:
                    this.runFor(node.text, node.content["Looped"] || []);
                    break;
                case CodeType.WHILE:
                    while (this.requireBoolean(node.text, "while condition")) {
                        this.tick();
                        this.runNodes(node.content["Looped"] || []);
                    }
                    break;
                case CodeType.DO_WHILE:
                    do {
                        this.tick();
                        this.runNodes(node.content["Looped"] || []);
                    } while (this.requireBoolean(node.text, "do-while condition"));
                    break;
                default:
                    throw new Error(`Unsupported flowchart node type: ${node.type}`);
            }
        }
    }

    private runStatement(text: string): void {
        const statement = text.trim();
        if (!statement || /^empty statement$/i.test(statement)) {
            return;
        }

        const assignment = /^([A-Za-z_][A-Za-z0-9_]*)\s*=(?!=|>)\s*(.+)$/s.exec(statement);
        if (!assignment) {
            throw new Error(`Unsupported statement "${statement}". Use name = expression.`);
        }
        this.variables.set(assignment[1], this.evaluate(assignment[2]));
    }

    private runFor(text: string, body: Export[]): void {
        const match = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s+(?:from|van)\s+(.+?)\s+(?:to|tot(?:\s+(?:en\s+met|\(en\s+met\)))?)\s+(.+?)\s*$/i.exec(text);
        if (!match) {
            throw new Error(`Invalid for loop "${text}". Use "i from 1 to 10" or "i van 1 tot en met 10".`);
        }

        const start = this.evaluate(match[2]);
        const end = this.evaluate(match[3]);
        if (typeof start !== "number" || typeof end !== "number" ||
            !Number.isFinite(start) || !Number.isFinite(end)) {
            throw new Error("For loop start and end values must be finite numbers.");
        }

        const increment = start <= end ? 1 : -1;
        for (let value = start; increment > 0 ? value <= end : value >= end; value += increment) {
            this.tick();
            this.variables.set(match[1], value);
            this.runNodes(body);
        }
    }

    private requireBoolean(expression: string, label: string): boolean {
        const result = this.evaluate(expression);
        if (typeof result !== "boolean") {
            throw new Error(`The ${label} must evaluate to true or false.`);
        }
        return result;
    }

    private evaluate(expression: string): RuntimeValue {
        return new ExpressionParser(expression, this.variables).parse();
    }

    private tick(): void {
        this.steps += 1;
        if (this.steps > FlowchartInterpreter.MAX_STEPS) {
            throw new Error(`Execution stopped after ${FlowchartInterpreter.MAX_STEPS} steps.`);
        }
    }

    private formatValue(value: RuntimeValue): string {
        return typeof value === "boolean" ? (value ? "true" : "false") : String(value);
    }
}

class ExpressionParser {
    private readonly tokens: ExpressionToken[];
    private position = 0;

    constructor(expression: string, private readonly variables: Map<string, RuntimeValue>) {
        this.tokens = this.tokenize(expression);
    }

    parse(): RuntimeValue {
        if (this.current.type === "end") {
            throw new Error("Expression cannot be empty.");
        }
        const value = this.parseExpression(0);
        if (!this.isAtEnd()) {
            const remaining = this.current;
            throw new Error(`Unexpected token "${this.describe(remaining)}" in expression.`);
        }
        return value;
    }

    private isAtEnd(): boolean {
        return this.current.type === "end";
    }

    private get current(): ExpressionToken {
        return this.tokens[this.position];
    }

    private parseExpression(minimumPrecedence: number): RuntimeValue {
        let left = this.parsePrefix();
        while (this.current.type === "operator") {
            const operator = this.current.text;
            const precedence = this.precedence(operator);
            if (precedence < minimumPrecedence) {
                break;
            }
            this.position += 1;
            const right = this.parseExpression(precedence + (operator === "**" ? 0 : 1));
            left = this.apply(operator, left, right);
        }
        return left;
    }

    private parsePrefix(): RuntimeValue {
        const token = this.current;
        this.position += 1;

        if (token.type === "literal") {
            return token.value;
        }
        if (token.type === "identifier") {
            const value = this.variables.get(token.text);
            if (value === undefined) {
                throw new Error(`Variable "${token.text}" has not been assigned.`);
            }
            return value;
        }
        if (token.type === "leftParen") {
            const value = this.parseExpression(0);
            if (this.current.type !== "rightParen") {
                throw new Error("Missing closing parenthesis.");
            }
            this.position += 1;
            return value;
        }
        if (token.type === "operator" && ["+", "-", "not", "!"].includes(token.text)) {
            const value = this.parseExpression(8);
            if (token.text === "not" || token.text === "!") {
                if (typeof value !== "boolean") {
                    throw new Error("The not operator requires a boolean value.");
                }
                return !value;
            }
            if (typeof value !== "number") {
                throw new Error(`The ${token.text} operator requires a number.`);
            }
            return this.checkedNumber(token.text === "-" ? -value : value);
        }
        throw new Error(`Expected a value, found "${this.describe(token)}".`);
    }

    private apply(operator: string, left: RuntimeValue, right: RuntimeValue): RuntimeValue {
        if (operator === "and" || operator === "or" || operator === "&&" || operator === "||") {
            if (typeof left !== "boolean" || typeof right !== "boolean") {
                throw new Error(`The ${operator} operator requires boolean values.`);
            }
            return operator === "and" || operator === "&&" ? left && right : left || right;
        }
        if (operator === "==" || operator === "=") {
            return left === right;
        }
        if (operator === "!=") {
            return left !== right;
        }
        if (operator === "+" && (typeof left === "string" || typeof right === "string")) {
            return this.format(left) + this.format(right);
        }
        if (["<", "<=", ">", ">="].includes(operator)) {
            if (typeof left !== typeof right || typeof left === "boolean") {
                throw new Error(`The ${operator} operator requires two numbers or two strings.`);
            }
            if (operator === "<") return left < right;
            if (operator === "<=") return left <= right;
            if (operator === ">") return left > right;
            return left >= right;
        }
        if (typeof left !== "number" || typeof right !== "number") {
            throw new Error(`The ${operator} operator requires numeric values.`);
        }
        switch (operator) {
            case "+": return this.checkedNumber(left + right);
            case "-": return this.checkedNumber(left - right);
            case "*": return this.checkedNumber(left * right);
            case "/": return this.checkedNumber(left / right);
            case "%": return this.checkedNumber(left % right);
            case "**": return this.checkedNumber(left ** right);
            default: throw new Error(`Unsupported operator "${operator}".`);
        }
    }

    private precedence(operator: string): number {
        if (operator === "or" || operator === "||") return 1;
        if (operator === "and" || operator === "&&") return 2;
        if (["==", "!=", "="].includes(operator)) return 3;
        if (["<", "<=", ">", ">="].includes(operator)) return 4;
        if (operator === "+" || operator === "-") return 5;
        if (["*", "/", "%"].includes(operator)) return 6;
        if (operator === "**") return 7;
        return -1;
    }

    private tokenize(expression: string): ExpressionToken[] {
        const tokens: ExpressionToken[] = [];
        let index = 0;
        while (index < expression.length) {
            const remaining = expression.slice(index);
            const whitespace = /^\s+/.exec(remaining);
            if (whitespace) {
                index += whitespace[0].length;
                continue;
            }

            const number = /^(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/.exec(remaining);
            if (number) {
                tokens.push({ type: "literal", value: Number(number[0]) });
                index += number[0].length;
                continue;
            }

            const character = expression[index];
            if (character === "'" || character === "\"") {
                const parsed = this.readString(expression, index);
                tokens.push({ type: "literal", value: parsed.value });
                index = parsed.end;
                continue;
            }

            const identifier = /^[A-Za-z_][A-Za-z0-9_]*/.exec(remaining);
            if (identifier) {
                const text = identifier[0];
                const keyword = text.toLowerCase();
                if (["true", "waar"].includes(keyword)) {
                    tokens.push({ type: "literal", value: true });
                } else if (["false", "onwaar"].includes(keyword)) {
                    tokens.push({ type: "literal", value: false });
                } else if (["and", "en"].includes(keyword)) {
                    tokens.push({ type: "operator", text: "and" });
                } else if (["or", "of"].includes(keyword)) {
                    tokens.push({ type: "operator", text: "or" });
                } else if (["not", "niet"].includes(keyword)) {
                    tokens.push({ type: "operator", text: "not" });
                } else {
                    tokens.push({ type: "identifier", text });
                }
                index += text.length;
                continue;
            }

            if (character === "(") {
                tokens.push({ type: "leftParen" });
                index += 1;
                continue;
            }
            if (character === ")") {
                tokens.push({ type: "rightParen" });
                index += 1;
                continue;
            }

            const operator = ["**", "<=", ">=", "==", "!=", "&&", "||", "+", "-", "*", "/", "%", "<", ">", "=", "!"]
                .find(candidate => remaining.startsWith(candidate));
            if (!operator) {
                throw new Error(`Unexpected character "${character}" in expression.`);
            }
            tokens.push({ type: "operator", text: operator });
            index += operator.length;
        }
        tokens.push({ type: "end" });
        return tokens;
    }

    private readString(expression: string, start: number): { value: string, end: number } {
        const quote = expression[start];
        let value = "";
        let index = start + 1;
        while (index < expression.length) {
            const character = expression[index];
            if (character === quote) {
                return { value, end: index + 1 };
            }
            if (character === "\\") {
                index += 1;
                if (index >= expression.length) break;
                const escaped = expression[index];
                value += escaped === "n" ? "\n" :
                    escaped === "r" ? "\r" :
                    escaped === "t" ? "\t" : escaped;
            } else {
                value += character;
            }
            index += 1;
        }
        throw new Error("String value is missing its closing quote.");
    }

    private checkedNumber(value: number): number {
        if (!Number.isFinite(value)) {
            throw new Error("Expression resulted in a non-finite number.");
        }
        return value;
    }

    private format(value: RuntimeValue): string {
        return typeof value === "boolean" ? (value ? "true" : "false") : String(value);
    }

    private describe(token: ExpressionToken): string {
        if (token.type === "literal") return String(token.value);
        if (token.type === "identifier") return token.text;
        if (token.type === "operator") return token.text;
        return token.type === "end" ? "end of expression" : token.type;
    }
}

class FlowchartRunPopup extends PopUp {
    constructor(result: string, isError: boolean) {
        super();
        const heading = document.createElement("h2");
        heading.textContent = isError ? "Execution stopped" : "Output";
        const content = document.createElement("pre");
        content.textContent = result || (isError ? "" : "Program finished with no output.");
        content.style.whiteSpace = "pre-wrap";
        this.add(heading);
        this.add(content);
        this.setFullScreen();
        this.open();
    }
}

function runFlowchart(): void {
    try {
        const result = new FlowchartInterpreter(main.export).execute();
        new FlowchartRunPopup(result.join("\n"), false);
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        new FlowchartRunPopup(message, true);
    }
}
