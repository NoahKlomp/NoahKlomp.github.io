// Global SVG setup

const SVG_NS = "http://www.w3.org/2000/svg";
const SVG = document.createElementNS(SVG_NS, "svg");
// SVG.setAttribute("width", "800");
// SVG.setAttribute("height", "600");
let CONFIG = { //standard config
    "TEXT_COLOUR": "#000",
    "STATEMENT_COLOUR": "#fd83fd",
    "SHAPE_MARGIN": 15,
    "TEXT_MARGIN": 10,
    "LINE_WIDTH": 2,
    "LINE_COLOUR": "#000",
    "MAIN_SHAPE_COLOUR": "#0ff",
    "WHILE_SHAPE_COLOUR": "#f80",
    "DO_WHILE_SHAPE_COLOUR": "#ff5833",
    "IF_SHAPE_COLOUR": "#0f0",
    "FOR_SHAPE_COLOUR": "#4c4cff",
    "FUNCTION_SHAPE_COLOUR": "#ff6b6b",
    "MENU_COLOUR": "#ccc"
};
fetch("js/Three/config.json").then(e => e.json()).then(e => {
    CONFIG = {
        ...CONFIG,
        ...e
    };// override with config.json
}).then(() => {
    init();
});
type XCor = number;
type YCor = number;
type Coordinates = { x: XCor, y: YCor }
type Export = {
    type: CodeType,
    content: Content | null,
    text: string
}
type Content = {
    [key: string]: Export[] | undefined;
};
type ContentType = "Looped"|
    "True"|
    "False"|
    "Try"|
    "Catch"|
    "Finally"|
    "Else"|
    "ElseIf"|
    "FunctionCall"|
    "FunctionDefinition"|
    "MainCode";

function emptyContent():Content {
    return {
        "Looped": undefined,
        "True": undefined,
        "False": undefined,
        "Try": undefined,
        "Catch": undefined,
        "Finally": undefined,
        "Else": undefined,
        "ElseIf": undefined,
        "FunctionCall": undefined,
        "FunctionDefinition": undefined,
        "MainCode": undefined
    };
}

enum CodeType {
    STATEMENT = "StatementCode",
    WHILE = "WhileLoopCode",
    FOR = "ForLoopCode",
    DO_WHILE = "DoWhileLoopCode",
    FUNCTION = "FunctionCode",
    IF = "IfCode",
    MAIN = "Main"
}

function c(x: number, y: number): Coordinates {
    return {x: x, y: y};
}

const ids = {
    current: 0,
    get(): number {
        return this.current++;
    }
}

interface Updatable {
    update(): void;
}

class CodeContainer implements Updatable {
    protected content: Array<Code> = [];
    protected view: SVGSVGElement = document.createElementNS(SVG_NS, "svg");
    public line_colour: string = CONFIG.LINE_COLOUR;
    constructor(protected parentElement: SVGSVGElement,
                protected parent: Updatable) {
        parentElement.appendChild(this.view);
        this.view.setAttribute("id", `${ids.get()}`)
        this.view.setAttribute("class", "code-container");
    }

    get id() {
        return this.view.getAttribute("id");
    }

    get width(): number {
        return Math.max(0, ...this.content.map((i: Code): number => i.width));
    }

    get leftSpace(): number {
        return Math.max(0, ...this.content.map((i: Code): number => i.leftSpace));
    }

    get rightSpace(): number {
        return Math.max(0, ...this.content.map((i: Code): number => i.rightSpace));
    }

    get height() {
        return this.content.map(e => e.height).reduce((p: number, c: number) => p + c, 0);
    }

    get export(): Export[] {
        return this.content.map(c => c.export);
    }

    add(newCode: Code, index: number): void {
        this.content.splice(index, 0, newCode);
        newCode.addTo(this.view);
        newCode.update();
    }

    remove(index: number): void {
        if (index < 0 || index >= this.content.length) {
            throw new Error("Index out of bounds");
        }
        const removed: Code = this.content.splice(index, 1)[0];
        removed._outerElement.remove();
        this.update();
    }

    update(): void {
        let newY = 0;
        this.content.forEach((e: Code, i: number): void => {
            e.index = i
        });
        const middle: number = this.leftSpace;
        for (const e of this.content) {
            e.setTopMid(c(middle, newY));
            newY += e.height;
        }
        this.view.setAttribute("height", `${newY}`);
        this.view.setAttribute("width", `${this.width}`);
        requestAnimationFrame(this.parent.update.bind(this.parent));
        // TODO:
        //  - let CodeContainer handle line drawing
        //  - let line color depend on CodeContainer
    }

    setTopMid(coords: Coordinates) {
        this.view.setAttribute("x", `${coords.x - this.leftSpace}`);
        this.view.setAttribute("y", `${coords.y}`);
    }
    clear() {
        this.content.forEach((): void => {
            this.remove(0);
        });
    }

}

abstract class Code implements Updatable {
    public readonly _outerElement: SVGSVGElement = document.createElementNS(SVG_NS, "svg");
    public readonly id = ids.get();
    protected lines: Array<SVGLineElement> = [];

    constructor(
        public readonly parent: CodeContainer,
        public index: number,
        protected _innerElement: SVGSVGElement = document.createElementNS(SVG_NS, "svg")
    ) {
        this._innerElement.setAttribute("x", `${0}`);
        this._innerElement.setAttribute("y", `${CONFIG.SHAPE_MARGIN}`);
        this._innerElement.setAttribute("id", `${this.constructor.name}_inner_${this.id}`);
        this._outerElement.classList.add(`${this.constructor.name}`);

        this._outerElement.setAttribute("id", `${this.constructor.name}_outer_${this.id}`)
        this._outerElement.appendChild(this._innerElement);
        this._outerElement.classList.add("prevent-select");
        this._outerElement.oncontextmenu =
            this._outerElement.ondblclick = this.menuFunction.bind(this);

        requestAnimationFrame(() => {
            this.lines.push(
                document.createElementNS(SVG_NS, "line")
            );
            this.lines.push(
                document.createElementNS(SVG_NS, "line")
            );
            this.lines[0].setAttribute("id", `${this.constructor.name}_line1_${this.id}`);
            this.lines[1].setAttribute("id", `${this.constructor.name}_line2_${this.id}`);
            this.lines[0].setAttribute("stroke", `${parent.line_colour}`);
            this.lines[0].setAttribute("stroke-width", `${CONFIG.LINE_WIDTH}`);
            this.lines[1].setAttribute("stroke", `${parent.line_colour}`);
            this.lines[1].setAttribute("stroke-width", `${CONFIG.LINE_WIDTH}`);
            this.lines.forEach(l => this._outerElement.appendChild(l));
            parent.add(this, index);
            requestAnimationFrame(() => {
                this.update();
            });
        });
    }

    menuFunction(e: MouseEvent): void {
        e.preventDefault();
        const parent:CodeContainer = this.parent;
        const map:Map<string,()=>void> = this.getContextMenuMap()
        CustomMenu.show(e.pageX, e.pageY, map);
    };
    getContextMenuMap():Map<string,() => void> {
        const parent:CodeContainer = this.parent;
        const map = new Map<string, () => void>();
        map.set("Remove", (() => {
            parent.remove(this.index);
        }));
        map.set("Add After", (() => {
            new Creator((e:Export) => {
                Creator.exportToCode(e, this.parent, this.index + 1);
            });
        }));
        map.set("Edit Text", (() => {
            new TextEditor(this,(newText:string) => {
                this.text = newText;
            });
        }));
        return map;
    }
    abstract get text():string;
    abstract set text(newText:string);
    get width(): number {
        return this._innerElement.getBBox().width;
    }

    get innerHeight(): number {
        return this._innerElement.getBBox().height;
    };

    get height(): number {
        return this.innerHeight + CONFIG.SHAPE_MARGIN * 2;
    }

    get leftSpace(): number {
        return this.width / 2;
    }

    get rightSpace(): number {
        return this.width / 2;
    }

    abstract get export(): Export;

    update() {
        this.innerUpdate();
        requestAnimationFrame(() => {
            this.lines.forEach((l) => {
                l.setAttribute("x1", `${this.leftSpace}`);
                l.setAttribute("x2", `${this.leftSpace}`);
            });
            this.lines[0].setAttribute("y1", `${0}`);
            this.lines[0].setAttribute("y2", `${CONFIG.SHAPE_MARGIN}`);
            this.lines[1].setAttribute("y1", `${CONFIG.SHAPE_MARGIN + this.innerHeight}`);
            this.lines[1].setAttribute("y2", `${2 * CONFIG.SHAPE_MARGIN + this.innerHeight}`);
            this._outerElement.setAttribute("height", `${this.height}`);
            this._outerElement.setAttribute("width", `${this.width}`);
            requestAnimationFrame((): void => {
                this.parent.update();
            });
        });
    };

    protected abstract innerUpdate(): void;

    setTopMid(coords: Coordinates) {
        requestAnimationFrame(() => {
            this._outerElement.setAttribute("x", `${coords.x - this.leftSpace}`);
            this._outerElement.setAttribute("y", `${coords.y}`);
        });
    }

    addTo(parentElement: SVGSVGElement) {
        parentElement.appendChild(this._outerElement);
    }
}


class StatementCode extends Code {
    private _textElement = document.createElementNS(SVG_NS, "text");
    private _rectangle = document.createElementNS(SVG_NS, "rect");

    constructor(parent: CodeContainer, index: number, text: string) {
        super(parent, index);
        this._innerElement.setAttribute("class", "statement");
        this._innerElement.appendChild(this._rectangle);
        this._innerElement.appendChild(this._textElement);
        this._textElement.textContent = text;
        this.update();
    }

    get export(): Export {
        return {
            type: CodeType.STATEMENT,
            content: null,
            text: this._textElement.textContent || ""
        };
    }

    get width(): number {
        return this._textElement.getBBox().width + 2 * CONFIG.TEXT_MARGIN;
    }

    get innerHeight(): number {
        return this._textElement.getBBox().height + 2 * CONFIG.TEXT_MARGIN;
    }

    innerUpdate(): void {

        this._textElement.setAttribute("text-anchor", "start");
        this._textElement.setAttribute("dominant-baseline", "hanging");
        this._textElement.setAttribute("x", `${CONFIG.TEXT_MARGIN}`);
        this._textElement.setAttribute("y", `${CONFIG.TEXT_MARGIN}`);
        this._rectangle.setAttribute("x", `${0}`);
        this._rectangle.setAttribute("y", `${0}`);
        this._rectangle.setAttribute("class", "statement-rect");
        this._rectangle.setAttribute("fill", CONFIG.STATEMENT_COLOUR);
        this._rectangle.setAttribute("width", `${this.width}`);
        this._rectangle.setAttribute("height", `${this.innerHeight}`);
    }

    set text(newText: string) {
        this._textElement.innerHTML = newText.replace("\n","<br/>");
        requestAnimationFrame(this.update.bind(this));
    }
    get text():string {
        return this._textElement.textContent || "";
    }
}


type RegularLoopType = CodeType.FOR | CodeType.WHILE;

abstract class GeneralLoopCode extends Code {
    private loopBox: SVGSVGElement = document.createElementNS(SVG_NS, "svg");
    private loopBoxShape: SVGPolygonElement = document.createElementNS(SVG_NS, "polygon");
    private loopText: SVGTextElement = document.createElementNS(SVG_NS, "text");
    private skipLoopLine: SVGPolylineElement = document.createElementNS(SVG_NS, "polyline");
    private restartLoopLine: SVGPolylineElement = document.createElementNS(SVG_NS, "polyline");
    public container: CodeContainer;

    protected constructor(parent: CodeContainer, index: number, protected readonly type: RegularLoopType, text: string) {
        super(parent, index);
        this.container = new CodeContainer(this._innerElement, this);
        this.container.line_colour = "green";
        this.loopText.textContent = text;
        this.loopText.setAttribute("x", `${CONFIG.TEXT_MARGIN}`);
        this.loopText.setAttribute("y", `${CONFIG.TEXT_MARGIN}`);
        this.loopText.setAttribute("text-anchor", "start");
        this.loopText.setAttribute("dominant-baseline", "hanging");

        this.loopBoxShape.setAttribute("points", this.getLoopBoxPoints());

        this.loopBox.appendChild(this.loopBoxShape);
        this.loopBox.appendChild(this.loopText);
        this.loopBox.setAttribute("id", `loopbox_${ids.get()}`);

        this._innerElement.appendChild(this.loopBox);
        this._innerElement.setAttribute("class", "loop_" + type);
        this._innerElement.appendChild(this.skipLoopLine);
        this._innerElement.appendChild(this.restartLoopLine);
        this.loopBox.ondblclick = this.loopBox.oncontextmenu = this.menuFunction.bind(this);
        this._outerElement.ondblclick = this._outerElement.oncontextmenu = (e: MouseEvent) => {
        };
        requestAnimationFrame((): void => this.update());
    }


    innerUpdate(): void {
        this.container.setTopMid(c(this.leftSpace, this.loopBox.getBBox().height));

        this._innerElement.setAttribute("height", `${this.height - 2 * CONFIG.SHAPE_MARGIN}`);

        this.loopBoxShape.setAttribute("fill", this.MAINBOX_COLOUR);
        this.loopBoxShape.setAttribute("stroke", this.parent.line_colour);
        this.loopBoxShape.setAttribute("stroke-width", `${CONFIG.LINE_WIDTH}`);

        this.loopBox.setAttribute("x", `${this.leftSpace - this.loopBox.getBBox().width / 2}`);
        this.loopBox.setAttribute("width", `${this.loopBoxShape.getBBox().width}`);
        this.loopBox.setAttribute("height", `${this.loopBoxShape.getBBox().height}`);

        this.skipLoopLine.setAttribute("fill", "none");
        this.skipLoopLine.setAttribute("stroke", "red");
        this.skipLoopLine.setAttribute("stroke-width", `${CONFIG.LINE_WIDTH}`);

        this.restartLoopLine.setAttribute("fill", "none");
        this.restartLoopLine.setAttribute("stroke", "green");
        this.restartLoopLine.setAttribute("stroke-width", `${CONFIG.LINE_WIDTH}`);
        this.loopBoxShape.setAttribute("points", this.getLoopBoxPoints());
        requestAnimationFrame((): void => {
            this.skipLoopLine.setAttribute("points", this.getSkipLinePoints());
            this.restartLoopLine.setAttribute("points", this.getRestartLinePoints());
        });
    }

    protected abstract MAINBOX_COLOUR: string;


    get leftSpace(): number {
        return Math.max(this.loopText.getBBox().width / 2 + CONFIG.TEXT_MARGIN, this.container.leftSpace) +
            CONFIG.SHAPE_MARGIN +
            CONFIG.LINE_WIDTH / 2;
    }

    get rightSpace(): number {
        return Math.max(this.loopText.getBBox().width / 2 + CONFIG.TEXT_MARGIN, this.container.rightSpace) +
            CONFIG.SHAPE_MARGIN +
            CONFIG.LINE_WIDTH / 2;
    }

    /**
     * Generates the points for the loop box shape.
     * @private
     */
    private getLoopBoxPoints(): string {
        const height: number = this.loopText.getBBox().height + 2 * CONFIG.TEXT_MARGIN;
        const width: number = this.loopText.getBBox().width + 2 * CONFIG.TEXT_MARGIN;
        return [
            `0,0`,
            `${width},0`,
            `${width},${height}`,
            `${width / 2},${height + CONFIG.TEXT_MARGIN}`,
            `0,${height}`,
            `0,0`
        ].join(" ")
    }

    /**
     * Generates the points for the skip line.
     * This is used to visually connect the loop box to the code container.
     * @returns {string} - The points for the skip line in SVG format.
     * @private
     */
    private getSkipLinePoints(): string {
        const heightLoopBox: number = this.loopBox.getBBox().height;
        const widthLoopBox: number = this.loopBox.getBBox().width;
        const contentHeight: number = this.container.height;
        const contentWidth: number = this.width - (2 * CONFIG.SHAPE_MARGIN);
        const maxLeftSize: number = Math.max(widthLoopBox / 2, this.leftSpace);

        return [
            `${maxLeftSize - widthLoopBox / 2},${heightLoopBox / 2}`,
            `${CONFIG.LINE_WIDTH / 2},${heightLoopBox / 2}`,
            `${CONFIG.LINE_WIDTH / 2},${heightLoopBox / 2 + contentHeight + 2.5 * CONFIG.SHAPE_MARGIN + CONFIG.LINE_WIDTH}`,
            `${maxLeftSize},${heightLoopBox / 2 + contentHeight + 2.5 * CONFIG.SHAPE_MARGIN + CONFIG.LINE_WIDTH}`
        ].join(" ");
    }

    /**
     * Generates the points for the restart line.
     * <p> This is used to visually connect the loop box to the code container.
     * @returns {string} - The points for the restart line in SVG format.
     * @private
     */
    private getRestartLinePoints(): string {
        const heightLoopBox: number = this.loopBox.getBBox().height;
        const widthLoopBox: number = this.loopBox.getBBox().width;
        const contentHeight: number = this.container.height;
        const contentWidth: number = this.container.width;
        const maxRightSize: number = Math.max(widthLoopBox / 2, this.rightSpace);
        const maxLeftSize: number = Math.max(widthLoopBox / 2, this.leftSpace);
        const maxWidth: number = Math.max(widthLoopBox, this.width);
        return [
            `${maxLeftSize},${heightLoopBox / 2 + contentHeight + 1.5 * CONFIG.SHAPE_MARGIN}`,
            `${maxWidth - CONFIG.LINE_WIDTH},${heightLoopBox / 2 + contentHeight + 1.5 * CONFIG.SHAPE_MARGIN}`,
            `${maxWidth - CONFIG.LINE_WIDTH},${heightLoopBox / 2}`,
            `${widthLoopBox / 2 + maxLeftSize},${heightLoopBox / 2}`
        ].join(" ");
    }

    get export(): Export {

        return {
            type: this.type,
            content: {...emptyContent(),"Looped": this.container.export},
            text: this.loopText.textContent || ""
        };
    }

    get width(): number {
        return this.leftSpace + this.rightSpace;
    }

    get height(): number {
        return this.loopText.getBBox().height +
            3 * CONFIG.TEXT_MARGIN +
            3 * CONFIG.SHAPE_MARGIN +
            CONFIG.LINE_WIDTH +
            this.container.height;
    }

    set text(newText: string) {
        this.loopText.innerHTML = newText.replace("\n","<br/>");
        requestAnimationFrame(this.update.bind(this));
    }
    get text(): string {
        return this.loopText.textContent || ""
    }

    getContextMenuMap():Map<string,() => void> {
        return super.getContextMenuMap()
            .set("Add to start of loop", () => {
                new Creator((e:Export) => {
                    Creator.exportToCode(e, this.container, 0);
                })
            }).set("Clear", () => {
                this.container.clear();
            });
    }
}

class WhileLoopCode extends GeneralLoopCode {
    protected MAINBOX_COLOUR: string = CONFIG.WHILE_SHAPE_COLOUR;


    constructor(parent: CodeContainer, index: number, text: string) {
        super(parent, index, CodeType.WHILE, text);
    }
}

class ForLoopCode extends GeneralLoopCode {
    protected MAINBOX_COLOUR: string = CONFIG.FOR_SHAPE_COLOUR;


    constructor(parent: CodeContainer, index: number, text: string) {
        super(parent, index, CodeType.FOR, text);
    }
}

class DoWhileLoop extends Code {
    protected doBox: SVGSVGElement = document.createElementNS(SVG_NS, "svg");
    private doText: SVGTextElement = document.createElementNS(SVG_NS, "text");
    private doShape: SVGPolygonElement = document.createElementNS(SVG_NS, "polygon");
    protected loopBox: SVGSVGElement = document.createElementNS(SVG_NS, "svg");
    private loopText: SVGTextElement = document.createElementNS(SVG_NS, "text");
    private loopShape: SVGPolygonElement = document.createElementNS(SVG_NS, "polygon");
    public container: CodeContainer;
    private restartLine = document.createElementNS(SVG_NS, "polyline");
    constructor(parent: CodeContainer, index: number, text: string) {
        super(parent, index);
        this.doBox.appendChild(this.doShape);
        this.doBox.appendChild(this.doText);
        this.doText.textContent = "Do";

        this.doText.setAttribute("text-anchor", "start");
        this.doText.setAttribute("dominant-baseline", "hanging");
        this.doText.setAttribute("x", `${2 * CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH}`);
        this.doText.setAttribute("y", `${CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH}`);

        this._innerElement.appendChild(this.doBox);
        this.doBox.classList.add("DoWhileLoopDoBox");

        this.container = new CodeContainer(this._innerElement, this);

        this.loopBox.appendChild(this.loopShape);
        [this.doShape, this.loopShape].forEach(shape => {
            shape.setAttribute("fill", CONFIG.DO_WHILE_SHAPE_COLOUR);
            shape.setAttribute("stroke", this.parent.line_colour);
            shape.setAttribute("stroke-width", `${CONFIG.LINE_WIDTH}`);
        })
        this.restartLine.setAttribute("fill", "none");
        this.restartLine.setAttribute("stroke", "green");
        this.restartLine.setAttribute("stroke-width", `${CONFIG.LINE_WIDTH}`);
        this.loopBox.appendChild(this.loopText);
        this._innerElement.appendChild(this.loopBox);
        this.loopBox.classList.add("DoWhileLoopBox");
        this.loopText.textContent = text;
        this.loopText.setAttribute("text-anchor", "start");
        this.loopText.setAttribute("dominant-baseline", "hanging");
        this.loopText.setAttribute("x", `${CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH}`);
        this.loopText.setAttribute("y", `${CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH}`);
        this.loopBox.ondblclick = this.loopBox.oncontextmenu = this.menuFunction.bind(this);
        this.doBox.ondblclick = this.doBox.oncontextmenu = this.menuFunction.bind(this);
        this._outerElement.ondblclick = this._outerElement.oncontextmenu = (e: MouseEvent) => {};

        this._innerElement.appendChild(this.restartLine);
        this._innerElement.classList.add("DoWhileLoop");



        requestAnimationFrame(() =>{
            this.loopShape.setAttribute("points", this.getLoopBoxPoints());
            this.doShape.setAttribute("points", this.getDoBoxPoints());
            requestAnimationFrame(this.update.bind(this));
        });
    }

    protected innerUpdate():void {
        // const wLoop: number = this.loopText.getBBox().width + 2 * CONFIG.TEXT_MARGIN + 2 * CONFIG.LINE_WIDTH;
        // const hLoop: number = this.loopText.getBBox().height + 2 * CONFIG.TEXT_MARGIN + 2 * CONFIG.LINE_WIDTH;
        // const wDo: number = this.doText.getBBox().width + 4 * CONFIG.TEXT_MARGIN + 2 * CONFIG.LINE_WIDTH;
        // const hDo: number = this.doText.getBBox().height + 4 * CONFIG.TEXT_MARGIN + 2 * CONFIG.LINE_WIDTH;
        const wLoop: number = this.loopShape.getBBox().width + 2 * CONFIG.LINE_WIDTH;
        const hLoop: number = this.loopShape.getBBox().height + 2 * CONFIG.LINE_WIDTH;
        const wDo: number = this.doShape.getBBox().width + 2 * CONFIG.LINE_WIDTH;
        const hDo: number = this.doShape.getBBox().height + 2 * CONFIG.LINE_WIDTH;

        const cPoint = Math.max(0,wLoop / 2, wDo / 2, this.container.leftSpace);
        this.doBox.setAttribute("x",`${cPoint - wDo / 2}`);
        this.doBox.setAttribute("y",`${0}`);
        this.doBox.setAttribute("width",`${this.doText.getBBox().width + 4 * CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH}`);
        this.doBox.setAttribute("height",`${this.doText.getBBox().height + 4 * CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH}`);
        this.container.setTopMid(c(cPoint, hDo));
        this.loopBox.setAttribute("x",`${cPoint - wLoop / 2}`);
        this.loopBox.setAttribute("y",`${hDo + this.container.height}`);
        this.loopBox.setAttribute("height",`${this.loopText.getBBox().height + 3 * CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH}`);
        this.loopBox.setAttribute("width",`${this.loopText.getBBox().width + 2 * CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH}`);
        this.restartLine.setAttribute("points", this.getRestartPoints());
    }
    set text(newText:string) {
        this.loopText.innerHTML = newText.replace("\n","<br/>");
        requestAnimationFrame(this.update.bind(this));
    }
    get text(): string {
        return this.loopText.textContent || "";
    }

    protected getDoBoxPoints(): string {
        const height: number = this.doText.getBBox().height + 4 * CONFIG.TEXT_MARGIN;
        const width: number = this.doText.getBBox().width + 4 * CONFIG.TEXT_MARGIN;
        return [
            `${CONFIG.LINE_WIDTH},${CONFIG.LINE_WIDTH}`,
            `${width - CONFIG.LINE_WIDTH},${CONFIG.LINE_WIDTH}`,
            `${width / 2 + CONFIG.LINE_WIDTH},${height - CONFIG.LINE_WIDTH}`,
        ].join(" ")
    }


    /**
     * Generates the points for the loop box shape.
     * @private
     */
    private getLoopBoxPoints(): string {
        const height: number = this.loopText.getBBox().height + 2 * CONFIG.TEXT_MARGIN;
        const width: number = this.loopText.getBBox().width + 2 * CONFIG.TEXT_MARGIN;
        return [
            `${CONFIG.LINE_WIDTH / 2},${CONFIG.LINE_WIDTH / 2}`,
            `${width - CONFIG.LINE_WIDTH},${CONFIG.LINE_WIDTH / 2}`,
            `${width - CONFIG.LINE_WIDTH},${height - CONFIG.LINE_WIDTH / 2}`,
            `${width / 2 + CONFIG.LINE_WIDTH},${height + CONFIG.TEXT_MARGIN}`,
            `${CONFIG.LINE_WIDTH / 2},${height - CONFIG.LINE_WIDTH / 2}`
        ].join(" ")
    }

    getRestartPoints(): string {
        const heightDoBox = this.doBox.getBBox().height;
        const widthDoBox = this.doBox.getBBox().width;
        const heightLoopBox = this.loopBox.getBBox().height;
        const widthLoopBox = this.loopBox.getBBox().width;
        const heightContent = this.container.height;
        return [
            `${this.leftSpace + widthLoopBox / 2},${heightContent + heightDoBox + heightLoopBox / 2 }`,
            `${this.width - CONFIG.LINE_WIDTH},${heightContent + heightDoBox + heightLoopBox / 2 }`,
            `${this.width - CONFIG.LINE_WIDTH},${heightDoBox / 2}`,
            `${this.leftSpace + widthDoBox / 4},${heightDoBox / 2}`
        ].join(" ");
    }

    get width(): number {
        return this.leftSpace + this.rightSpace;
    }
    get leftSpace():number {
        return Math.max(0,
                (this.doText.getBBox().width + 4 * CONFIG.TEXT_MARGIN) / 2,
                (this.loopText.getBBox().width + 2 * CONFIG.TEXT_MARGIN) / 2,
                this.container.leftSpace
            );
    }
    get rightSpace():number {
        return Math.max(0,
            (this.doText.getBBox().width + 4 * CONFIG.TEXT_MARGIN) / 2,
            (this.loopText.getBBox().width + 2 * CONFIG.TEXT_MARGIN) / 2,
            this.container.rightSpace
        ) + 2 * CONFIG.SHAPE_MARGIN;
    }

    get export(): Export {
        return {
            type: CodeType.DO_WHILE,
            content: {
                "Looped": this.container.export
            },
            text: this.loopText.textContent || ""
        }
    }
    getContextMenuMap():Map<string,() => void> {
        return super.getContextMenuMap()
            .set("Add to start of loop", () => {
                new Creator((e:Export) => {
                    Creator.exportToCode(e, this.container, 0);
                })
            }).set("Clear", () => {
                this.container.clear();
            });
    }
}

class IfStatementCode extends Code {
    public readonly trueContent: CodeContainer;
    public readonly falseContent: CodeContainer;
    private ifBox: SVGSVGElement = document.createElementNS(SVG_NS, "svg");
    private ifBoxShape: SVGPolygonElement = document.createElementNS(SVG_NS, "polygon");
    private textBox: SVGTextElement = document.createElementNS(SVG_NS, "text");
    private trueLine1: SVGPolylineElement = document.createElementNS(SVG_NS, "polyline");
    private trueLine2: SVGPolylineElement = document.createElementNS(SVG_NS, "polyline");
    private falseLine1: SVGPolylineElement = document.createElementNS(SVG_NS, "polyline");
    private falseLine2: SVGPolylineElement = document.createElementNS(SVG_NS, "polyline");

    constructor(parent: CodeContainer, index: number, text: string) {
        super(parent, index);
        this.trueContent = new CodeContainer(this._innerElement, this);
        this.trueContent.line_colour = "green";
        this.falseContent = new CodeContainer(this._innerElement, this);
        this.falseContent.line_colour = "red";
        this.ifBox.appendChild(this.ifBoxShape);
        this.ifBox.appendChild(this.textBox);
        this._innerElement.appendChild(this.ifBox);

        this.textBox.setAttribute("x", `${CONFIG.TEXT_MARGIN}`);
        this.textBox.setAttribute("y", `${CONFIG.TEXT_MARGIN}`);
        this.textBox.setAttribute("text-anchor", "start");
        this.textBox.setAttribute("dominant-baseline", "hanging");
        this.textBox.textContent = text;

        this.ifBoxShape.setAttribute("fill", CONFIG.IF_SHAPE_COLOUR);
        this.ifBoxShape.setAttribute("stroke", this.parent.line_colour);
        this.ifBoxShape.setAttribute("stroke-width", `${CONFIG.LINE_WIDTH}`);
        this.ifBox.ondblclick = this.ifBox.oncontextmenu = this.menuFunction.bind(this);
        this._outerElement.ondblclick = this._outerElement.oncontextmenu = () => {
        };
        this.trueLine1.setAttribute("stroke","green");
        this.trueLine2.setAttribute("stroke","green");
        this.falseLine1.setAttribute("stroke","red");
        this.falseLine2.setAttribute("stroke","red");
        [this.trueLine1, this.trueLine2, this.falseLine1, this.falseLine2].forEach(line => {
            this._innerElement.appendChild(line);
            line.setAttribute("fill", "none")
            line.setAttribute("stroke-width", `${CONFIG.LINE_WIDTH}`);
        });

        this.ifBox.ondblclick = this.ifBox.oncontextmenu = this.menuFunction.bind(this);
        this._outerElement.ondblclick = this._outerElement.oncontextmenu = (e: MouseEvent) => {
        };
        requestAnimationFrame(this.update.bind(this));
    }

    innerUpdate(): void {
        this.ifBoxShape.setAttribute("points", this.getIfBoxPoints());
        this.textBox.setAttribute("x", `${CONFIG.TEXT_MARGIN}`);
        this.textBox.setAttribute("y", `${CONFIG.TEXT_MARGIN}`);
        this.ifBox.setAttribute("x", `${this.leftSpace - ((this.textBox.getBBox().width + 2 * CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH) / 2)}`);
        this.arrangeContainers();
    }

    private getTrueLine1Points(heightIfBox: number, widthIfBox: number, widthTrue: number, heightTrue: number,
                               widthFalse: number, heightFalse: number, yContent: number,xTrue: number,xFalse: number): string {
        return [
            `${this.leftSpace - widthIfBox / 2},${heightIfBox / 2}`,
            `${xTrue},${heightIfBox / 2}`,
            `${xTrue},${yContent}`
        ].join(" ");
    }

    private getTrueLine2Points(heightIfBox: number, widthIfBox: number, widthTrue: number, heightTrue: number,
                               widthFalse: number, heightFalse: number, yContent: number,xTrue: number,xFalse: number): string {
        const maxLowY: number = Math.max(heightTrue, heightFalse) + yContent;
        return [
            `${xTrue},${yContent + heightTrue}`,
            `${xTrue},${maxLowY + CONFIG.SHAPE_MARGIN}`,
            `${this.leftSpace},${ maxLowY + CONFIG.SHAPE_MARGIN}`
        ].join(" ");
    }

    private getFalseLine1Points(heightIfBox: number, widthIfBox: number, widthTrue: number, heightTrue: number,
                                widthFalse: number, heightFalse: number, yContent: number, xTrue: number, xFalse: number): string {
        return [
            `${this.leftSpace + widthIfBox / 2},${heightIfBox / 2}`,
            `${xFalse},${heightIfBox / 2}`,
            `${xFalse},${yContent}`
        ].join(" ");
    }

    private getFalseLine2Points(heightIfBox: number, widthIfBox: number, widthTrue: number, heightTrue: number,
                                widthFalse: number, heightFalse: number, yContent: number,xTrue: number,xFalse: number): string {
        const maxLowY: number = Math.max(heightTrue, heightFalse) + yContent;
        return [
            `${xFalse},${yContent + heightFalse}`,
            `${xFalse},${ maxLowY + CONFIG.SHAPE_MARGIN}`,
            `${this.leftSpace},${ maxLowY + CONFIG.SHAPE_MARGIN}`
        ].join(" ");
    }

    /**
     * Arranges the True and False containers and their corresponding connecting lines to their right position in the if statement.
     * @private
     */
    private arrangeContainers(): void {
        const heightIfBox: number = this.textBox.getBBox().height + 2 * CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH,
            widthIfBox: number = this.textBox.getBBox().width + 2 * CONFIG.TEXT_MARGIN + 2 * CONFIG.LINE_WIDTH,
            widthTrue: number = this.trueContent.width, widthFalse: number = this.falseContent.width,
            heightTrue: number = this.trueContent.height, heightFalse: number = this.falseContent.height,
            yContent: number = heightIfBox + CONFIG.SHAPE_MARGIN,
            xTrue: number = this.trueContent.leftSpace,
            xFalse: number = this.width - this.falseContent.rightSpace;
        this.trueContent.setTopMid(c(xTrue, yContent));
        this.falseContent.setTopMid(c(xFalse, yContent));
        this.falseLine1.setAttribute("points", this.getFalseLine1Points(heightIfBox, widthIfBox, widthTrue, heightTrue, widthFalse, heightFalse, yContent, xTrue, xFalse));
        this.falseLine2.setAttribute("points", this.getFalseLine2Points(heightIfBox, widthIfBox, widthTrue, heightTrue, widthFalse, heightFalse, yContent, xTrue, xFalse));
        this.trueLine1.setAttribute("points", this.getTrueLine1Points(heightIfBox, widthIfBox, widthTrue, heightTrue, widthFalse, heightFalse, yContent, xTrue, xFalse));
        this.trueLine2.setAttribute("points", this.getTrueLine2Points(heightIfBox, widthIfBox, widthTrue, heightTrue, widthFalse, heightFalse, yContent, xTrue, xFalse));

    }

    get width(): number {
        //TODO:
        // - implement?
        return this.leftSpace + this.rightSpace;
    }

    get rightSpace(): number { //TODO: FIX
        const minHalfSize: number = (this.textBox.getBBox().width + 4 * CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH + CONFIG.SHAPE_MARGIN) / 2;
        if (this.falseContent.leftSpace + CONFIG.SHAPE_MARGIN < minHalfSize) {
            return minHalfSize + this.falseContent.rightSpace + CONFIG.SHAPE_MARGIN;
        }
        return this.falseContent.width + CONFIG.SHAPE_MARGIN;
    }

    get leftSpace(): number {
        const minHalfSize: number = (this.textBox.getBBox().width + 4 * CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH + CONFIG.SHAPE_MARGIN) / 2;
        if (this.trueContent.rightSpace + CONFIG.SHAPE_MARGIN < minHalfSize) {
            return minHalfSize + this.trueContent.leftSpace + CONFIG.SHAPE_MARGIN;
        }
        return this.trueContent.width + CONFIG.SHAPE_MARGIN;
    }

    get export(): Export {

        return {
            type: CodeType.IF,
            content: {...emptyContent(),
                "True": this.trueContent.export,
                "False": this.falseContent.export
            },
            text: this.textBox.textContent ? this.textBox.textContent : ""
        }
    }

    get text(): string {
        return this.textBox.textContent ? this.textBox.textContent : "";
    }
    set text(newText:string) {
        this.textBox.innerHTML = newText.replace("\n","<br/>");
        requestAnimationFrame(()=>this.update());
    }

    private getIfBoxPoints(): string {
        const height: number = this.textBox.getBBox().height + 2 * CONFIG.TEXT_MARGIN;
        const width: number = this.textBox.getBBox().width + 2 * CONFIG.TEXT_MARGIN;
        return [
            `${CONFIG.LINE_WIDTH},${CONFIG.LINE_WIDTH / 2 + height / 2}`,
            `${CONFIG.LINE_WIDTH + CONFIG.TEXT_MARGIN * 2},${CONFIG.LINE_WIDTH / 2}`,
            `${CONFIG.LINE_WIDTH + width - CONFIG.TEXT_MARGIN * 2},${CONFIG.LINE_WIDTH / 2}`,
            `${CONFIG.LINE_WIDTH + width - 2},${CONFIG.LINE_WIDTH / 2 + height / 2}`,
            `${CONFIG.LINE_WIDTH + width - CONFIG.TEXT_MARGIN * 2},${CONFIG.LINE_WIDTH / 2 + height}`,
            `${CONFIG.LINE_WIDTH + CONFIG.TEXT_MARGIN * 2},${CONFIG.LINE_WIDTH / 2 + height}`,
            `${CONFIG.LINE_WIDTH},${CONFIG.LINE_WIDTH / 2 + height / 2}`
        ].join(" ")
    }

    getContextMenuMap():Map<string,() => void> {
        return super.getContextMenuMap()
            .set("Add to start of false block", () => {
                new Creator((e:Export) => {
                    Creator.exportToCode(e, this.falseContent, 0);
                })
            })
            .set("Clear false block", () => {
                this.falseContent.clear();
            })
            .set("Add to start of true block", () => {
                new Creator((e:Export) => {
                    Creator.exportToCode(e, this.trueContent, 0);
                })
            }).set("Clear true block", () => {
                this.trueContent.clear();
            });
    }
}

/**
 * Beginning node of the flowchart.
 * should only occur once per flowchart
 */
class StartNode {
    public readonly _element: SVGSVGElement = document.createElementNS(SVG_NS, "svg");
    private _textElement: SVGTextElement = document.createElementNS(SVG_NS, "text");
    private _ellipseElement: SVGEllipseElement = document.createElementNS(SVG_NS, "ellipse");
    public readonly line: SVGLineElement = document.createElementNS(SVG_NS, "line");

    constructor(parent: SVGSVGElement, private container:CodeContainer) {
        this._element.setAttribute("id", `startNode_${ids.get()}`);
        this._element.setAttribute("class", "start-node");
        this._textElement.textContent = "Start";
        this._textElement.setAttribute("x", `${CONFIG.TEXT_MARGIN}`);
        this._textElement.setAttribute("y", `${CONFIG.TEXT_MARGIN}`);
        this._textElement.setAttribute("text-anchor", "start");
        this._textElement.setAttribute("dominant-baseline", "hanging");
        this._ellipseElement.setAttribute("fill", CONFIG.MAIN_SHAPE_COLOUR);
        this._element.appendChild(this._ellipseElement);
        this._element.appendChild(this._textElement);
        this._element.appendChild(this.line);
        parent.appendChild(this._element);
        requestAnimationFrame(() => {
            this.update();
        });
    }

    get width(): number {
        return this._textElement.getBBox().width + 2 * CONFIG.TEXT_MARGIN;
    }

    get height(): number {
        return this._textElement.getBBox().height + CONFIG.TEXT_MARGIN;
    }

    update() {
        const width = this._textElement.getBBox().width + 2 * CONFIG.TEXT_MARGIN;
        const height = this._textElement.getBBox().height + 2 * CONFIG.TEXT_MARGIN;
        this._element.setAttribute("width", `${width}`);
        this._element.setAttribute("height", `${height + CONFIG.SHAPE_MARGIN}`);
        this.line.setAttribute("x1", `${width / 2}`);
        this.line.setAttribute("x2", `${width / 2}`);
        this.line.setAttribute("y1", `${height}`);
        this.line.setAttribute("y2", `${height + CONFIG.SHAPE_MARGIN}`);
        this.line.setAttribute("stroke", `${CONFIG.LINE_COLOUR}`);
        this.line.setAttribute("stroke-width", `${CONFIG.LINE_WIDTH}`);
        this._ellipseElement.setAttribute("cx", `${width / 2}`);
        this._ellipseElement.setAttribute("cy", `${height / 2}`);
        this._ellipseElement.setAttribute("rx", `${width / 2}`);
        this._ellipseElement.setAttribute("ry", `${height / 2}`);
        this._element.oncontextmenu =
            this._element.ondblclick = this.menuFunction.bind(this);
    }

    updateTopMid(coords: Coordinates) {
        this._element.setAttribute("x", `${coords.x - this._element.getBBox().width / 2}`);
        this._element.setAttribute("y", `${coords.y}`);
    }
    menuFunction(e: MouseEvent): void {
        e.preventDefault();
        const parent:CodeContainer = this.container;
        const map:Map<string,()=>void> = this.getContextMenuMap()
        CustomMenu.show(e.pageX, e.pageY, map);
    };
    getContextMenuMap():Map<string,() => void> {
        const parent:CodeContainer = this.container;
        return new Map<string, () => void>()
            .set("Add", (() => {
                new Creator((e:Export) => {
                    Creator.exportToCode(e, this.container, 0);
                });
            }));
    }
}

/**
 * Ending node of the flowchart.
 * should only occur once per flowchart
 */
class EndNode {
    public readonly _element: SVGSVGElement = document.createElementNS(SVG_NS, "svg");
    private _textElement: SVGTextElement = document.createElementNS(SVG_NS, "text");
    private _ellipseElement: SVGEllipseElement = document.createElementNS(SVG_NS, "ellipse");
    public readonly line: SVGLineElement = document.createElementNS(SVG_NS, "line");

    constructor(parent: SVGSVGElement) {
        this._element.setAttribute("id", `endNode_${ids.get()}`);
        this._element.setAttribute("class", "end-node");
        this._textElement.textContent = "End";
        this._textElement.setAttribute("x", `${CONFIG.TEXT_MARGIN}`);
        this._textElement.setAttribute("y", `${CONFIG.TEXT_MARGIN + CONFIG.SHAPE_MARGIN}`);
        this._textElement.setAttribute("text-anchor", "start");
        this._textElement.setAttribute("dominant-baseline", "hanging");
        this._ellipseElement.setAttribute("fill", CONFIG.MAIN_SHAPE_COLOUR);
        this._element.appendChild(this._ellipseElement);
        this._element.appendChild(this._textElement);
        this._element.appendChild(this.line);
        parent.appendChild(this._element);
        requestAnimationFrame(() => {
            this.update();
        });

    }

    get width(): number {
        return this._textElement.getBBox().width + 2 * CONFIG.TEXT_MARGIN;
    }

    get height(): number {
        return this._textElement.getBBox().height + CONFIG.TEXT_MARGIN;
    }

    update() {
        const width = this._textElement.getBBox().width + 2 * CONFIG.TEXT_MARGIN;
        const height = this._textElement.getBBox().height + 2 * CONFIG.TEXT_MARGIN;
        this._element.setAttribute("width", `${width}`);
        this._element.setAttribute("height", `${height + CONFIG.SHAPE_MARGIN}`);
        this.line.setAttribute("x1", `${width / 2}`);
        this.line.setAttribute("x2", `${width / 2}`);
        this.line.setAttribute("y1", `${0}`);
        this.line.setAttribute("y2", `${CONFIG.SHAPE_MARGIN}`);
        this.line.setAttribute("stroke", `${CONFIG.LINE_COLOUR}`);
        this.line.setAttribute("stroke-width", `${CONFIG.LINE_WIDTH}`);
        this._textElement.setAttribute("x", `${CONFIG.TEXT_MARGIN}`);
        this._textElement.setAttribute("y", `${CONFIG.TEXT_MARGIN + CONFIG.SHAPE_MARGIN}`);
        this._ellipseElement.setAttribute("cx", `${width / 2}`);
        this._ellipseElement.setAttribute("cy", `${height / 2 + CONFIG.SHAPE_MARGIN}`);
        this._ellipseElement.setAttribute("rx", `${width / 2}`);
        this._ellipseElement.setAttribute("ry", `${height / 2}`);
    }

    updateTopMid(coords: Coordinates) {
        this._element.setAttribute("x", `${coords.x - this._element.getBBox().width / 2}`);
        this._element.setAttribute("y", `${coords.y}`);
    }
}

class Main {
    public SVG: SVGSVGElement = document.createElementNS(SVG_NS, "svg");
    public readonly container: CodeContainer = new CodeContainer(this.SVG, this);
    public readonly startNode: StartNode = new StartNode(this.SVG, this.container);
    public readonly endNode: EndNode = new EndNode(this.SVG);

    constructor(bodyElement: HTMLElement) {
        bodyElement.appendChild(this.SVG); // Attach to DOM for rendering

        this.init();
    }

    init() {
        this.container.update();
        this.startNode.update();
        this.endNode.update();
    }

    update() {
        this.container.update();
        const middle = Math.max(this.startNode._element.getBBox().width / 2, this.container.leftSpace);
        const width = Math.max(this.startNode._element.getBBox().width, this.container.width);
        this.startNode.updateTopMid(c(middle, 0));
        this.container.setTopMid(c(middle, this.startNode._element.getBBox().height));
        this.endNode.updateTopMid(c(middle, this.startNode._element.getBBox().height + this.container.height));
        this.SVG.setAttribute("width", `${width}`);
        this.SVG.setAttribute("height", `${this.container.height + this.startNode._element.getBBox().height + this.endNode._element.getBBox().height}`);
    }
    get programTitle():string {
        return "Main Program";
    }
    get export():Export {
        return {
            type: CodeType.MAIN,
            content: {
                "MainCode": this.container.export
            },
            text: this.programTitle
        }
    }
}

let main: Main;

function init() {
    main = new Main(document.body);

}
function exportAll() {
    return JSON.stringify(main.export);
}



