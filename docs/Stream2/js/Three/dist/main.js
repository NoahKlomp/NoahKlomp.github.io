// Global SVG setup
const SVG_NS = "http://www.w3.org/2000/svg";
const SVG = document.createElementNS(SVG_NS, "svg");
let CONFIG = {
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
fetch("https://noahklomp.github.io/Stream2/js/Three/config.json").then(e => e.json()).then(e => {
    CONFIG = {
        ...CONFIG,
        ...e
    }; // override with config.json
}).then(() => {
    init();
}).catch((e) => {
    init();
    throw e;
});
var CodeType;
(function (CodeType) {
    CodeType["STATEMENT"] = "StatementCode";
    CodeType["WHILE"] = "WhileLoopCode";
    CodeType["FOR"] = "ForLoopCode";
    CodeType["DO_WHILE"] = "DoWhileLoopCode";
    CodeType["FUNCTION"] = "FunctionCode";
    CodeType["IF"] = "IfCode";
    CodeType["MAIN"] = "Main";
})(CodeType || (CodeType = {}));
function c(x, y) {
    return { x: x, y: y };
}
const ids = {
    current: 0,
    get() {
        return this.current++;
    }
};
class ConnectingLine {
    parent;
    index;
    line = document.createElementNS(SVG_NS, "polyline");
    element = document.createElementNS(SVG_NS, "svg");
    id = ids.get();
    constructor(parent, index) {
        this.parent = parent;
        this.index = index;
        this.line.id = `line_for_${parent.id}_${this.id}`;
        this.element.id = `element_line_for_${parent.id}_${this.id}`;
        this.element.setAttribute("width", `${4 * CONFIG.LINE_WIDTH}`);
        this.element.appendChild(this.line);
        this.line.setAttribute("points", `${2 * CONFIG.LINE_WIDTH},${0} 
        ${2 * CONFIG.LINE_WIDTH},${CONFIG.SHAPE_MARGIN / 2} 
        ${2 * CONFIG.LINE_WIDTH},${CONFIG.SHAPE_MARGIN}`);
        parent.view.appendChild(this.element);
        this.line.setAttribute("marker-mid", "url(#arrow)");
        this.line.setAttribute("stroke-width", `${CONFIG.LINE_WIDTH}`);
        this.setColour(CONFIG.LINE_COLOUR);
        this.element.ondblclick = this.element.onclick = this.element.oncontextmenu = this.menuFunction.bind(this);
    }
    setMid(cor) {
        this.element.setAttribute("x", `${cor.x - 2 * CONFIG.LINE_WIDTH}`);
        this.element.setAttribute("y", `${cor.y}`);
        return this;
    }
    setColour(newColour) {
        this.line.setAttribute("stroke", newColour);
        return this;
    }
    remove() {
        this.element.remove();
    }
    menuFunction(e) {
        e.preventDefault();
        openAddMenu(c(e.clientX, e.clientY), this.parent, this.index);
    }
}
function openAddMenu(cors, parent, indexToAdd) {
    requestAnimationFrame(() => {
        const map = new Map();
        for (let t in CodeType) {
            if (!["FUNCTION", "MAIN"].includes(t)) {
                map.set(Words.get("Add") + " " + Words.get(t) + Words.get("add2"), (() => {
                    Creator.exportToCode(Creator.getExport(t), parent, indexToAdd);
                }));
            }
        }
        CustomMenu.show(cors.x, cors.y, map);
    });
}
class CodeContainer {
    parentElement;
    parent;
    content = [];
    view = document.createElementNS(SVG_NS, "svg");
    lines = [new ConnectingLine(this, 0)];
    _line_colour = CONFIG.LINE_COLOUR;
    id = ids.get();
    constructor(parentElement, parent) {
        this.parentElement = parentElement;
        this.parent = parent;
        parentElement.appendChild(this.view);
        this.view.setAttribute("id", `container_${this.id}`);
        this.view.setAttribute("class", "code-container");
        requestAnimationFrame(this.update.bind(this));
    }
    get line_colour() {
        return this._line_colour;
    }
    set line_colour(new_colour) {
        this._line_colour = new_colour;
        this.lines.forEach((line) => { line.setColour(new_colour); });
    }
    get width() {
        return Math.max(4 * CONFIG.LINE_WIDTH, this.leftSpace + this.rightSpace);
    }
    get leftSpace() {
        return Math.max(2 * CONFIG.LINE_WIDTH, ...this.content.map((i) => i.leftSpace));
    }
    get rightSpace() {
        return Math.max(2 * CONFIG.LINE_WIDTH, ...this.content.map((i) => i.rightSpace));
    }
    get height() {
        return this.content.map(e => e.height).reduce((p, c) => p + c + CONFIG.SHAPE_MARGIN, CONFIG.SHAPE_MARGIN);
    }
    get export() {
        return this.content.map(c => c.export);
    }
    add(newCode, index) {
        if (index < 0 || index > this.content.length) {
            throw new Error("Index out of bounds");
        }
        this.lines.splice(index, 0, new ConnectingLine(this, index));
        this.content.splice(index, 0, newCode);
        newCode.addTo(this.view);
        newCode.update();
    }
    remove(index) {
        if (index < 0 || index >= this.content.length) {
            throw new Error("Index out of bounds");
        }
        const removed = this.content.splice(index, 1)[0];
        this.lines.splice(index, 1)[0].remove();
        removed._innerElement.remove();
        this.update();
    }
    update() {
        let newY = 0;
        this.content.forEach((e, i) => {
            e.index = i;
            this.lines[i].index = i;
        });
        this.lines[this.content.length].index = this.content.length;
        const middle = this.leftSpace;
        this.content.forEach((e, i) => {
            this.lines[i].setMid(c(middle, newY));
            newY += CONFIG.SHAPE_MARGIN;
            e.setTopMid(c(middle, newY));
            newY += e.height;
        });
        this.lines[this.content.length].setMid(c(middle, newY));
        newY += CONFIG.SHAPE_MARGIN;
        this.view.setAttribute("height", `${newY}`);
        this.view.setAttribute("width", `${this.width}`);
        requestAnimationFrame(this.parent.update.bind(this.parent));
    }
    setTopMid(coords) {
        this.view.setAttribute("x", `${coords.x - this.leftSpace}`);
        this.view.setAttribute("y", `${coords.y}`);
    }
    clear() {
        this.content.forEach(() => {
            this.remove(0);
        });
    }
}
class Code {
    parent;
    index;
    _innerElement;
    id = ids.get();
    lines = [];
    /*
        TODO:
          - Incoming arrow instead of first line
     */
    constructor(parent, index, _innerElement = document.createElementNS(SVG_NS, "svg")) {
        this.parent = parent;
        this.index = index;
        this._innerElement = _innerElement;
        this._innerElement.setAttribute("x", `${0}`);
        this._innerElement.setAttribute("y", `${CONFIG.SHAPE_MARGIN}`);
        this._innerElement.setAttribute("id", `${this.constructor.name}_inner_${this.id}`);
        this._innerElement.classList.add(`${this.constructor.name}`);
        requestAnimationFrame(() => {
            parent.add(this, index);
            requestAnimationFrame(() => {
                this.update();
            });
        });
    }
    menuFunction(e) {
        e.preventDefault();
        const parent = this.parent;
        const map = this.getContextMenuMap(e);
        CustomMenu.show(e.clientX, e.clientY, map);
    }
    ;
    getContextMenuMap(e) {
        const parent = this.parent;
        const map = new Map();
        map.set(Words.get("Remove"), (() => {
            parent.remove(this.index);
        }));
        map.set(Words.get("Add After"), (() => {
            openAddMenu(c(e.clientX, e.clientY), this.parent, this.index + 1);
        }));
        map.set(Words.get("Edit Text"), (() => {
            new TextEditor(this, e, (newText) => {
                this.text = newText;
            });
        }));
        return map;
    }
    get width() {
        return this._innerElement.getBBox().width;
    }
    get innerHeight() {
        return this._innerElement.getBBox().height;
    }
    ;
    get height() {
        return this.innerHeight;
    }
    get leftSpace() {
        return this.width / 2;
    }
    get rightSpace() {
        return this.width / 2;
    }
    update() {
        this.innerUpdate();
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                this.parent.update();
            });
        });
    }
    ;
    setTopMid(coords) {
        requestAnimationFrame(() => {
            this._innerElement.setAttribute("x", `${coords.x - this.leftSpace}`);
            this._innerElement.setAttribute("y", `${coords.y}`);
        });
    }
    addTo(parentElement) {
        parentElement.appendChild(this._innerElement);
    }
}
class StatementCode extends Code {
    _textElement = document.createElementNS(SVG_NS, "text");
    _rectangle = document.createElementNS(SVG_NS, "rect");
    textbbox = this._textElement.getBBox();
    /*
        TODO:
          - Shape border?
     */
    constructor(parent, index, text) {
        super(parent, index);
        this._innerElement.setAttribute("class", "statement");
        this._innerElement.appendChild(this._rectangle);
        this._innerElement.appendChild(this._textElement);
        this.text = text;
        this._innerElement.oncontextmenu =
            this._innerElement.ondblclick = this.menuFunction.bind(this);
        this._innerElement.onclick = (e) => new TextEditor(this, e, (newText) => { this.text = newText; });
    }
    get export() {
        return {
            type: CodeType.STATEMENT,
            content: null,
            text: this._textElement.textContent || ""
        };
    }
    get width() {
        return this.textbbox.width + 2 * CONFIG.TEXT_MARGIN;
    }
    get innerHeight() {
        return this.textbbox.height + 2 * CONFIG.TEXT_MARGIN;
    }
    innerUpdate() {
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
    set text(newText) {
        this._textElement.innerHTML = newText.replace("\n", "<br/>");
        requestAnimationFrame(() => {
            this.textbbox = this._textElement.getBBox();
            this.update();
        });
    }
    get text() {
        return this._textElement.textContent || "";
    }
}
class GeneralLoopCode extends Code {
    type;
    loopBox = document.createElementNS(SVG_NS, "svg");
    loopBoxShape = document.createElementNS(SVG_NS, "polygon");
    loopText = document.createElementNS(SVG_NS, "text");
    textbbox = this.loopText.getBBox();
    skipLoopLine = document.createElementNS(SVG_NS, "polyline");
    restartLoopLine = document.createElementNS(SVG_NS, "polyline");
    trueLabel = document.createElementNS(SVG_NS, "text");
    falseLabel = document.createElementNS(SVG_NS, "text");
    container;
    /*
        TODO:
          - Add arrows to restart- and skip lines
          - Add labels "True" and "False" for lines
     */
    constructor(parent, index, type, text) {
        super(parent, index);
        this.type = type;
        this.container = new CodeContainer(this._innerElement, this);
        this.container.line_colour = "green";
        this.text = text;
        this.loopText.setAttribute("x", `${CONFIG.TEXT_MARGIN}`);
        this.loopText.setAttribute("y", `${CONFIG.TEXT_MARGIN}`);
        this.loopText.setAttribute("text-anchor", "start");
        this.loopText.setAttribute("dominant-baseline", "hanging");
        this.loopBoxShape.setAttribute("points", this.getLoopBoxPoints());
        this.loopBox.appendChild(this.loopBoxShape);
        this.loopBox.appendChild(this.loopText);
        this.loopBox.setAttribute("id", `loopbox_${ids.get()}`);
        this.loopBox.classList.add("loopbox");
        this.loopBox.classList.add(type + "loopbox");
        this._innerElement.appendChild(this.loopBox);
        this._innerElement.setAttribute("class", "loop_" + type);
        this._innerElement.appendChild(this.skipLoopLine);
        this._innerElement.appendChild(this.restartLoopLine);
        this._innerElement.appendChild(this.falseLabel);
        this._innerElement.appendChild(this.trueLabel);
        this.loopBox.ondblclick = this.loopBox.oncontextmenu = this.menuFunction.bind(this);
        this.loopBox.onclick = (e) => new TextEditor(this, e, (newText) => { this.text = newText; });
        this._innerElement.ondblclick = this._innerElement.oncontextmenu = (e) => { };
        this.trueLabel.textContent = "true";
        this.falseLabel.textContent = "false";
        this.trueLabel.setAttribute("text-anchor", "start");
        this.trueLabel.setAttribute("dominant-baseline", "hanging");
        this.falseLabel.setAttribute("dominant-baseline", "ideographic");
        this.falseLabel.setAttribute("text-anchor", "end");
        requestAnimationFrame(() => {
            this.update();
        });
    }
    innerUpdate() {
        this.container.setTopMid(c(this.leftSpace, this.loopBox.getBBox().height));
        this._innerElement.setAttribute("height", `${this.height}`);
        this.loopBoxShape.setAttribute("fill", this.MAINBOX_COLOUR);
        this.loopBoxShape.setAttribute("stroke", this.parent.line_colour);
        this.loopBoxShape.setAttribute("stroke-width", `${CONFIG.LINE_WIDTH}`);
        this.loopBox.setAttribute("width", `${this.textbbox.width + 2 * CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH}`);
        this.loopBox.setAttribute("height", `${this.textbbox.height + 3 * CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH}`);
        this.loopBox.setAttribute("x", `${this.leftSpace - (this.textbbox.width + 2 * CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH) / 2}`);
        this.trueLabel.setAttribute("x", `${this.leftSpace + 2 * CONFIG.LINE_WIDTH}`);
        this.trueLabel.setAttribute("y", `${this.textbbox.height + 3 * CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH}`);
        this.falseLabel.setAttribute("x", `${this.leftSpace - (this.textbbox.width + 2 * CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH) / 2}`);
        this.falseLabel.setAttribute("y", `${(this.textbbox.height - CONFIG.LINE_WIDTH) / 2 + CONFIG.TEXT_MARGIN}`);
        this.skipLoopLine.setAttribute("fill", "none");
        this.skipLoopLine.setAttribute("stroke", "red");
        this.skipLoopLine.setAttribute("stroke-width", `${CONFIG.LINE_WIDTH}`);
        this.skipLoopLine.setAttribute("marker-start", "url(#arrowStart)");
        this.restartLoopLine.setAttribute("fill", "none");
        this.restartLoopLine.setAttribute("stroke", "green");
        this.restartLoopLine.setAttribute("stroke-width", `${CONFIG.LINE_WIDTH}`);
        this.restartLoopLine.setAttribute("marker-end", "url(#arrowEnd)");
        this.loopBoxShape.setAttribute("points", this.getLoopBoxPoints());
        this.skipLoopLine.setAttribute("points", this.getSkipLinePoints());
        this.restartLoopLine.setAttribute("points", this.getRestartLinePoints());
    }
    get leftSpace() {
        return Math.max(this.textbbox.width / 2 + CONFIG.TEXT_MARGIN, this.container.leftSpace) +
            CONFIG.SHAPE_MARGIN +
            CONFIG.LINE_WIDTH / 2;
    }
    get rightSpace() {
        return Math.max(this.textbbox.width / 2 + CONFIG.TEXT_MARGIN, this.container.rightSpace) +
            CONFIG.SHAPE_MARGIN +
            CONFIG.LINE_WIDTH / 2;
    }
    /**
     * Generates the points for the loop box shape.
     * @private
     */
    getLoopBoxPoints() {
        const height = this.textbbox.height + 2 * CONFIG.TEXT_MARGIN;
        const width = this.textbbox.width + 2 * CONFIG.TEXT_MARGIN;
        return [
            `${CONFIG.LINE_WIDTH / 2},${CONFIG.LINE_WIDTH / 2}`,
            `${width - CONFIG.LINE_WIDTH / 2},${CONFIG.LINE_WIDTH / 2}`,
            `${width - CONFIG.LINE_WIDTH / 2},${height}`,
            `${width / 2},${height + CONFIG.TEXT_MARGIN}`,
            `${CONFIG.LINE_WIDTH / 2},${height - CONFIG.LINE_WIDTH / 2}`,
            `${CONFIG.LINE_WIDTH / 2},${CONFIG.LINE_WIDTH / 2}`
        ].join(" ");
    }
    /**
     * Generates the points for the skip line.
     * This is used to visually connect the loop box to the code container.
     * @returns {string} - The points for the skip line in SVG format.
     * @private
     */
    getSkipLinePoints() {
        const heightLoopBox = (this.textbbox.height + 2 * CONFIG.TEXT_MARGIN) + CONFIG.LINE_WIDTH;
        const widthLoopBox = (this.textbbox.width + 2 * CONFIG.TEXT_MARGIN) + CONFIG.LINE_WIDTH;
        const contentHeight = this.container.height;
        const contentWidth = this.width - (2 * CONFIG.SHAPE_MARGIN);
        const maxLeftSize = Math.max(widthLoopBox / 2, this.leftSpace);
        return [
            `${maxLeftSize - widthLoopBox / 2},${heightLoopBox / 2}`,
            `${CONFIG.LINE_WIDTH / 2},${heightLoopBox / 2}`,
            `${CONFIG.LINE_WIDTH / 2},${heightLoopBox / 2 + contentHeight + 2 * CONFIG.SHAPE_MARGIN + CONFIG.LINE_WIDTH / 2}`,
            `${maxLeftSize},${heightLoopBox / 2 + contentHeight + 2 * CONFIG.SHAPE_MARGIN + CONFIG.LINE_WIDTH / 2}`,
            `${maxLeftSize},${heightLoopBox / 2 + contentHeight + 3 * CONFIG.SHAPE_MARGIN + CONFIG.LINE_WIDTH}`
        ].join(" ");
    }
    /**
     * Generates the points for the restart line.
     * <p> This is used to visually connect the loop box to the code container.
     * @returns {string} - The points for the restart line in SVG format.
     * @private
     */
    getRestartLinePoints() {
        const heightLoopBox = (this.textbbox.height + 2 * CONFIG.TEXT_MARGIN) + CONFIG.LINE_WIDTH;
        const widthLoopBox = (this.textbbox.width + 2 * CONFIG.TEXT_MARGIN) + CONFIG.LINE_WIDTH;
        const contentHeight = this.container.height;
        const contentWidth = this.container.width;
        const maxRightSize = Math.max(widthLoopBox / 2, this.rightSpace);
        const maxLeftSize = Math.max(widthLoopBox / 2, this.leftSpace);
        const maxWidth = Math.max(widthLoopBox, this.width);
        return [
            `${maxLeftSize},${heightLoopBox / 2 + contentHeight + CONFIG.SHAPE_MARGIN + CONFIG.LINE_WIDTH}`,
            `${maxWidth - CONFIG.LINE_WIDTH / 2},${heightLoopBox / 2 + contentHeight + CONFIG.SHAPE_MARGIN + CONFIG.LINE_WIDTH}`,
            `${maxWidth - CONFIG.LINE_WIDTH / 2},${heightLoopBox / 2}`,
            `${widthLoopBox / 2 + maxLeftSize},${heightLoopBox / 2}`
        ].join(" ");
    }
    get export() {
        return {
            type: this.type,
            content: { "Looped": this.container.export },
            text: this.loopText.textContent || ""
        };
    }
    get width() {
        return this.leftSpace + this.rightSpace;
    }
    get height() {
        return (this.textbbox.height + 2 * CONFIG.TEXT_MARGIN) + 2 * CONFIG.LINE_WIDTH +
            this.container.height +
            2 * CONFIG.SHAPE_MARGIN;
    }
    set text(newText) {
        this.loopText.innerHTML = newText.replace("\n", "<br/>");
        requestAnimationFrame(() => {
            this.textbbox = this.loopText.getBBox();
            this.update();
        });
    }
    get text() {
        return this.loopText.textContent || "";
    }
    getContextMenuMap(e) {
        return super.getContextMenuMap(e)
            .set("Add to start of loop", () => {
            openAddMenu(c(e.clientX, e.clientY), this.container, 0);
        }).set("Clear", () => {
            this.container.clear();
        });
    }
}
class WhileLoopCode extends GeneralLoopCode {
    MAINBOX_COLOUR = CONFIG.WHILE_SHAPE_COLOUR;
    constructor(parent, index, text) {
        super(parent, index, CodeType.WHILE, text);
    }
}
class ForLoopCode extends GeneralLoopCode {
    MAINBOX_COLOUR = CONFIG.FOR_SHAPE_COLOUR;
    constructor(parent, index, text) {
        super(parent, index, CodeType.FOR, text);
    }
}
class DoWhileLoop extends Code {
    doBox = document.createElementNS(SVG_NS, "svg");
    doText = document.createElementNS(SVG_NS, "text");
    doTextBBox = this.doText.getBBox();
    doBBox = this.doBox.getBBox();
    doShape = document.createElementNS(SVG_NS, "polygon");
    loopBox = document.createElementNS(SVG_NS, "svg");
    loopText = document.createElementNS(SVG_NS, "text");
    textBBox = this.loopText.getBBox();
    loopShape = document.createElementNS(SVG_NS, "polygon");
    loopBBox = this.loopBox.getBBox();
    container;
    restartLine = document.createElementNS(SVG_NS, "polyline");
    trueLabel = document.createElementNS(SVG_NS, "text");
    falseLabel = document.createElementNS(SVG_NS, "text");
    /*
        TODO:
          - Add arrows to restart line and after loop box
          - Add labels to lines
     */
    constructor(parent, index, text) {
        super(parent, index);
        this.container = new CodeContainer(this._innerElement, this);
        this.loopBox.appendChild(this.loopShape);
        [this.doShape, this.loopShape].forEach(shape => {
            shape.setAttribute("fill", CONFIG.DO_WHILE_SHAPE_COLOUR);
            shape.setAttribute("stroke", this.parent.line_colour);
            shape.setAttribute("stroke-width", `${CONFIG.LINE_WIDTH}`);
        });
        this.restartLine.setAttribute("fill", "none");
        this.restartLine.setAttribute("stroke", "green");
        this.restartLine.setAttribute("stroke-width", `${CONFIG.LINE_WIDTH}`);
        this.restartLine.setAttribute("marker-end", "url(#arrowEnd)");
        this.restartLine.setAttribute("marker-start", "url(#arrowStart)");
        this._innerElement.appendChild(this.restartLine);
        this.doBox.appendChild(this.doShape);
        this.doBox.appendChild(this.doText);
        this.doText.textContent = "Do";
        this.doText.setAttribute("text-anchor", "start");
        this.doText.setAttribute("dominant-baseline", "hanging");
        this.doText.setAttribute("x", `${2 * CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH}`);
        this.doText.setAttribute("y", `${CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH}`);
        this._innerElement.appendChild(this.doBox);
        this.doBox.classList.add("DoWhileLoopDoBox");
        this.loopBox.appendChild(this.loopText);
        this._innerElement.appendChild(this.loopBox);
        this.loopBox.classList.add("DoWhileLoopBox");
        this.text = text;
        this.loopText.setAttribute("text-anchor", "start");
        this.loopText.setAttribute("dominant-baseline", "hanging");
        this.loopText.setAttribute("x", `${CONFIG.TEXT_MARGIN}`);
        this.loopText.setAttribute("y", `${CONFIG.TEXT_MARGIN}`);
        this.loopBox.ondblclick = this.loopBox.oncontextmenu = this.menuFunction.bind(this);
        this.loopBox.onclick = (e) => new TextEditor(this, e, (newText) => { this.text = newText; });
        this.doBox.ondblclick = this.doBox.oncontextmenu = this.menuFunction.bind(this);
        this._innerElement.ondblclick = this._innerElement.oncontextmenu = (e) => { };
        this._innerElement.classList.add("DoWhileLoop");
        this.trueLabel.setAttribute("text-anchor", "start");
        this.trueLabel.setAttribute("dominant-baseline", "hanging");
        this.trueLabel.textContent = "true";
        this.falseLabel.setAttribute("text-anchor", "end");
        this.falseLabel.textContent = "false";
        this.falseLabel.setAttribute("dominant-baseline", "ideographic");
        this._innerElement.appendChild(this.trueLabel);
        this._innerElement.appendChild(this.falseLabel);
        requestAnimationFrame(() => {
            this.doTextBBox = this.doText.getBBox();
            this.textBBox = this.loopText.getBBox();
            this.loopShape.setAttribute("points", this.getLoopBoxPoints());
            this.doShape.setAttribute("points", this.getDoBoxPoints());
            this.doBox.setAttribute("width", `${this.doTextBBox.width + 4 * CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH}`);
            this.doBox.setAttribute("height", `${this.doTextBBox.height + 4 * CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH}`);
            requestAnimationFrame(() => {
                this.doBBox = this.doBox.getBBox();
                this.loopBBox = this.loopBox.getBBox();
                this.update();
            });
        });
    }
    innerUpdate() {
        const wLoop = this.loopBBox.width + 2 * CONFIG.LINE_WIDTH;
        const hLoop = this.loopBBox.height + 2 * CONFIG.LINE_WIDTH;
        const wDo = (this.doTextBBox.width + 4 * CONFIG.TEXT_MARGIN) + 2 * CONFIG.LINE_WIDTH;
        const hDo = this.doBBox.height + 2 * CONFIG.LINE_WIDTH;
        const cPoint = Math.max(0, wLoop / 2, wDo / 2, this.container.leftSpace);
        this.trueLabel.setAttribute("x", `${cPoint + wLoop / 2}`);
        this.trueLabel.setAttribute("y", `${hDo + this.container.height + hLoop / 2}`);
        this.falseLabel.setAttribute("x", `${cPoint - 3 * CONFIG.LINE_WIDTH}`);
        this.falseLabel.setAttribute("y", `${hDo + this.container.height + hLoop + CONFIG.LINE_WIDTH}`);
        this.loopShape.setAttribute("points", this.getLoopBoxPoints());
        this.doBox.setAttribute("x", `${cPoint - wDo / 2}`);
        this.doBox.setAttribute("y", `${0}`);
        this.container.setTopMid(c(cPoint, hDo));
        this.loopBox.setAttribute("x", `${cPoint - wLoop / 2}`);
        this.loopBox.setAttribute("y", `${hDo + this.container.height}`);
        this.loopBox.setAttribute("height", `${this.textBBox.height + 3 * CONFIG.TEXT_MARGIN + 1.5 * CONFIG.LINE_WIDTH}`);
        this.loopBox.setAttribute("width", `${this.textBBox.width + 2 * CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH}`);
        this.restartLine.setAttribute("points", this.getRestartPoints());
    }
    set text(newText) {
        this.loopText.textContent = newText.replace("\n", "<br/>");
        requestAnimationFrame(() => {
            this.textBBox = this.loopText.getBBox();
            this.loopBBox = {
                height: this.textBBox.height + 3 * CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH,
                width: this.textBBox.width + 2 * CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH
            };
            this.update();
        });
    }
    get text() {
        return this.loopText.textContent || "";
    }
    getDoBoxPoints() {
        const height = this.doTextBBox.height + 4 * CONFIG.TEXT_MARGIN;
        const width = this.doTextBBox.width + 4 * CONFIG.TEXT_MARGIN;
        return [
            `${CONFIG.LINE_WIDTH},${CONFIG.LINE_WIDTH}`,
            `${width - CONFIG.LINE_WIDTH},${CONFIG.LINE_WIDTH}`,
            `${width / 2 + CONFIG.LINE_WIDTH},${height - CONFIG.LINE_WIDTH}`,
        ].join(" ");
    }
    /**
     * Generates the points for the loop box shape.
     * @private
     */
    getLoopBoxPoints() {
        const height = this.textBBox.height + 2 * CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH;
        const width = this.textBBox.width + 2 * CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH;
        return [
            `${CONFIG.LINE_WIDTH / 2},${CONFIG.LINE_WIDTH / 2}`,
            `${width - CONFIG.LINE_WIDTH / 2},${CONFIG.LINE_WIDTH / 2}`,
            `${width - CONFIG.LINE_WIDTH / 2},${height - CONFIG.TEXT_MARGIN}`,
            `${(width + CONFIG.LINE_WIDTH) / 2},${height + CONFIG.TEXT_MARGIN}`,
            `${CONFIG.LINE_WIDTH / 2},${height - CONFIG.TEXT_MARGIN}`
        ].join(" ");
    }
    getRestartPoints() {
        const heightDoBox = this.doBBox.height;
        const widthDoBox = this.doBBox.width;
        const heightLoopBox = this.loopBBox.height;
        const widthLoopBox = this.loopBBox.width;
        const heightContent = this.container.height;
        return [
            `${this.leftSpace + widthLoopBox / 2},${heightContent + heightDoBox + heightLoopBox / 2}`,
            `${this.width - CONFIG.LINE_WIDTH},${heightContent + heightDoBox + heightLoopBox / 2}`,
            `${this.width - CONFIG.LINE_WIDTH},${heightDoBox / 2}`,
            `${this.leftSpace + widthDoBox / 4},${heightDoBox / 2}`
        ].join(" ");
    }
    get innerHeight() {
        return this.doBBox.height + this.container.height + this.loopBBox.height + 2 * CONFIG.LINE_WIDTH;
    }
    get width() {
        return this.leftSpace + this.rightSpace;
    }
    get leftSpace() {
        return Math.max(0, (this.doTextBBox.width + 4 * CONFIG.TEXT_MARGIN) / 2 + CONFIG.LINE_WIDTH, (this.textBBox.width + 2 * CONFIG.TEXT_MARGIN) / 2 + CONFIG.LINE_WIDTH, this.container.leftSpace);
    }
    get rightSpace() {
        return Math.max(0, (this.doTextBBox.width + 4 * CONFIG.TEXT_MARGIN) / 2, (this.textBBox.width + 2 * CONFIG.TEXT_MARGIN) / 2, this.container.rightSpace) + 2 * CONFIG.SHAPE_MARGIN;
    }
    get export() {
        return {
            type: CodeType.DO_WHILE,
            content: {
                "Looped": this.container.export
            },
            text: this.loopText.textContent || ""
        };
    }
    getContextMenuMap(e) {
        return super.getContextMenuMap(e)
            .set("Add to start of loop", () => {
            openAddMenu(c(e.clientX, e.clientY), this.container, 0);
        }).set("Clear", () => {
            this.container.clear();
        });
    }
}
class IfStatementCode extends Code {
    _falseContent;
    _trueContent;
    ifBox = document.createElementNS(SVG_NS, "svg");
    ifBoxShape = document.createElementNS(SVG_NS, "polygon");
    textBox = document.createElementNS(SVG_NS, "text");
    textBBox = this.textBox.getBBox();
    _falseLine1 = document.createElementNS(SVG_NS, "polyline");
    _falseLine2 = document.createElementNS(SVG_NS, "polyline");
    _trueLine1 = document.createElementNS(SVG_NS, "polyline");
    _trueLine2 = document.createElementNS(SVG_NS, "polyline");
    trueLabel = document.createElementNS(SVG_NS, "text");
    falseLabel = document.createElementNS(SVG_NS, "text");
    /*
        TODO:
          - add labels 'True' and 'False'
     */
    constructor(parent, index, text) {
        super(parent, index);
        this._falseContent = new CodeContainer(this._innerElement, this);
        this._falseContent.line_colour = "red";
        this._trueContent = new CodeContainer(this._innerElement, this);
        this._trueContent.line_colour = "green";
        this.ifBox.appendChild(this.ifBoxShape);
        this.ifBox.appendChild(this.textBox);
        this.ifBox.classList.add("IfBox");
        this._innerElement.appendChild(this.ifBox);
        this._innerElement.appendChild(this.trueLabel);
        this._innerElement.appendChild(this.falseLabel);
        this.trueLabel.setAttribute("text-anchor", "start");
        this.trueLabel.setAttribute("dominant-baseline", "ideographic");
        this.trueLabel.textContent = "true";
        this.falseLabel.setAttribute("text-anchor", "end");
        this.falseLabel.textContent = "false";
        this.falseLabel.setAttribute("dominant-baseline", "ideographic");
        this.textBox.setAttribute("x", `${CONFIG.TEXT_MARGIN}`);
        this.textBox.setAttribute("y", `${CONFIG.TEXT_MARGIN}`);
        this.textBox.setAttribute("text-anchor", "start");
        this.textBox.setAttribute("dominant-baseline", "hanging");
        this.textBox.textContent = text;
        this.ifBoxShape.setAttribute("fill", CONFIG.IF_SHAPE_COLOUR);
        this.ifBoxShape.setAttribute("stroke", this.parent.line_colour);
        this.ifBoxShape.setAttribute("stroke-width", `${CONFIG.LINE_WIDTH}`);
        this.ifBox.ondblclick = this.ifBox.oncontextmenu = this.menuFunction.bind(this);
        this.ifBox.onclick = (e) => new TextEditor(this, e, (newText) => { this.text = newText; });
        this._innerElement.ondblclick = this._innerElement.oncontextmenu = () => { };
        this._falseLine1.setAttribute("stroke", "red");
        this._falseLine2.setAttribute("stroke", "red");
        this._trueLine1.setAttribute("stroke", "green");
        this._trueLine2.setAttribute("stroke", "green");
        [this._falseLine1, this._falseLine2, this._trueLine1, this._trueLine2].forEach(line => {
            this._innerElement.appendChild(line);
            line.setAttribute("fill", "none");
            line.setAttribute("stroke-width", `${CONFIG.LINE_WIDTH}`);
        });
        [this._trueLine1, this._falseLine1].forEach(line => line.setAttribute("marker-start", "url(#arrowStart)"));
        this.textBox.setAttribute("x", `${CONFIG.TEXT_MARGIN}`);
        this.textBox.setAttribute("y", `${CONFIG.TEXT_MARGIN}`);
        this.ifBox.ondblclick = this.ifBox.oncontextmenu = this.menuFunction.bind(this);
        this._innerElement.ondblclick = this._innerElement.oncontextmenu = (e) => {
        };
        requestAnimationFrame(() => {
            this.textBBox = this.textBox.getBBox();
            this.update();
        });
    }
    innerUpdate() {
        this.ifBoxShape.setAttribute("points", this.getIfBoxPoints());
        this.ifBox.setAttribute("x", `${this.leftSpace - ((this.textBBox.width + 2 * CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH) / 2)}`);
        this.trueLabel.setAttribute("x", `${this.leftSpace + (this.textBBox.width + 2 * CONFIG.TEXT_MARGIN - CONFIG.LINE_WIDTH) / 2}`);
        this.trueLabel.setAttribute("y", `${this.textBBox.height + 2 * CONFIG.TEXT_MARGIN}`);
        this.falseLabel.setAttribute("x", `${this.leftSpace - (this.textBBox.width + 2 * CONFIG.TEXT_MARGIN - CONFIG.LINE_WIDTH) / 2}`);
        this.falseLabel.setAttribute("y", `${this.textBBox.height + 2 * CONFIG.TEXT_MARGIN}`);
        this.arrangeContainers();
    }
    get_FalseLine1Points(heightIfBox, widthIfBox, widthTrue, heightTrue, widthFalse, heightFalse, yContent, xTrue, xFalse) {
        return [
            `${this.leftSpace - widthIfBox / 2},${heightIfBox / 2}`,
            `${xTrue},${heightIfBox / 2}`,
            `${xTrue},${yContent}`
        ].join(" ");
    }
    get_FalseLine2Points(heightIfBox, widthIfBox, widthTrue, heightTrue, widthFalse, heightFalse, yContent, xTrue, xFalse) {
        const maxLowY = Math.max(heightTrue, heightFalse) + yContent;
        return [
            `${xTrue},${yContent + heightTrue}`,
            `${xTrue},${maxLowY + CONFIG.SHAPE_MARGIN}`,
            `${this.leftSpace},${maxLowY + CONFIG.SHAPE_MARGIN}`
        ].join(" ");
    }
    get_TrueLine1Points(heightIfBox, widthIfBox, widthTrue, heightTrue, widthFalse, heightFalse, yContent, xTrue, xFalse) {
        return [
            `${this.leftSpace + widthIfBox / 2},${heightIfBox / 2}`,
            `${xFalse},${heightIfBox / 2}`,
            `${xFalse},${yContent}`
        ].join(" ");
    }
    get_TrueLine2Points(heightIfBox, widthIfBox, widthTrue, heightTrue, widthFalse, heightFalse, yContent, xTrue, xFalse) {
        const maxLowY = Math.max(heightTrue, heightFalse) + yContent;
        return [
            `${xFalse},${yContent + heightFalse}`,
            `${xFalse},${maxLowY + CONFIG.SHAPE_MARGIN}`,
            `${this.leftSpace},${maxLowY + CONFIG.SHAPE_MARGIN}`
        ].join(" ");
    }
    /**
     * Arranges the True and False containers and their corresponding connecting lines to their right position in the if statement.
     * @private
     */
    arrangeContainers() {
        const heightIfBox = this.textBBox.height + 2 * CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH, widthIfBox = this.textBBox.width + 2 * CONFIG.TEXT_MARGIN /*+ 2 * CONFIG.LINE_WIDTH*/, widthTrue = this._falseContent.width, widthFalse = this._trueContent.width, heightTrue = this._falseContent.height, heightFalse = this._trueContent.height, yContent = heightIfBox + CONFIG.SHAPE_MARGIN, xTrue = this._falseContent.leftSpace, xFalse = this.width - this._trueContent.rightSpace;
        this._falseContent.setTopMid(c(xTrue, yContent));
        this._trueContent.setTopMid(c(xFalse, yContent));
        this._trueLine1.setAttribute("points", this.get_TrueLine1Points(heightIfBox, widthIfBox, widthTrue, heightTrue, widthFalse, heightFalse, yContent, xTrue, xFalse));
        this._trueLine2.setAttribute("points", this.get_TrueLine2Points(heightIfBox, widthIfBox, widthTrue, heightTrue, widthFalse, heightFalse, yContent, xTrue, xFalse));
        this._falseLine1.setAttribute("points", this.get_FalseLine1Points(heightIfBox, widthIfBox, widthTrue, heightTrue, widthFalse, heightFalse, yContent, xTrue, xFalse));
        this._falseLine2.setAttribute("points", this.get_FalseLine2Points(heightIfBox, widthIfBox, widthTrue, heightTrue, widthFalse, heightFalse, yContent, xTrue, xFalse));
    }
    get width() {
        return this.leftSpace + this.rightSpace;
    }
    get rightSpace() {
        const minHalfSize = (this.textBBox.width + 4 * CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH + CONFIG.SHAPE_MARGIN) / 2;
        if (this._trueContent.leftSpace + CONFIG.SHAPE_MARGIN < minHalfSize) {
            return minHalfSize + this._trueContent.rightSpace + CONFIG.SHAPE_MARGIN;
        }
        return this._trueContent.width + CONFIG.SHAPE_MARGIN;
    }
    get leftSpace() {
        const minHalfSize = (this.textBBox.width + 4 * CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH + CONFIG.SHAPE_MARGIN) / 2;
        if (this._falseContent.rightSpace + CONFIG.SHAPE_MARGIN < minHalfSize) {
            return minHalfSize + this._falseContent.leftSpace + CONFIG.SHAPE_MARGIN;
        }
        return this._falseContent.width + CONFIG.SHAPE_MARGIN;
    }
    get export() {
        return {
            type: CodeType.IF,
            content: {
                "False": this._falseContent.export,
                "True": this._trueContent.export
            },
            text: this.textBox.textContent ? this.textBox.textContent : ""
        };
    }
    get text() {
        return this.textBox.textContent ? this.textBox.textContent : "";
    }
    set text(newText) {
        this.textBox.innerHTML = newText.replace("\n", "<br/>");
        requestAnimationFrame(() => {
            this.textBBox = this.textBox.getBBox();
            this.update();
        });
    }
    getIfBoxPoints() {
        const height = this.textBBox.height + 2 * CONFIG.TEXT_MARGIN;
        const width = this.textBBox.width + 2 * CONFIG.TEXT_MARGIN;
        return [
            `${CONFIG.LINE_WIDTH},${CONFIG.LINE_WIDTH / 2 + height / 2}`,
            `${CONFIG.LINE_WIDTH + CONFIG.TEXT_MARGIN * 2},${CONFIG.LINE_WIDTH / 2}`,
            `${CONFIG.LINE_WIDTH + width - CONFIG.TEXT_MARGIN * 2},${CONFIG.LINE_WIDTH / 2}`,
            `${CONFIG.LINE_WIDTH + width - 2},${CONFIG.LINE_WIDTH / 2 + height / 2}`,
            `${CONFIG.LINE_WIDTH + width - CONFIG.TEXT_MARGIN * 2},${CONFIG.LINE_WIDTH / 2 + height}`,
            `${CONFIG.LINE_WIDTH + CONFIG.TEXT_MARGIN * 2},${CONFIG.LINE_WIDTH / 2 + height}`,
            `${CONFIG.LINE_WIDTH},${CONFIG.LINE_WIDTH / 2 + height / 2}`
        ].join(" ");
    }
    getContextMenuMap(e) {
        return super.getContextMenuMap(e)
            .set("Add to start of true block", () => {
            openAddMenu(c(e.clientX, e.clientY), this._trueContent, 0);
        })
            .set("Clear true block", () => {
            this._trueContent.clear();
        })
            .set("Add to start of false block", () => {
            openAddMenu(c(e.clientX, e.clientY), this._falseContent, 0);
        }).set("Clear false block", () => {
            this._falseContent.clear();
        });
    }
}
/**
 * Beginning node of the flowchart.
 * should only occur once per flowchart
 */
class StartNode {
    parent;
    container;
    id = ids.get();
    _element = document.createElementNS(SVG_NS, "svg");
    _textElement = document.createElementNS(SVG_NS, "text");
    _ellipseElement = document.createElementNS(SVG_NS, "ellipse");
    constructor(parent, container) {
        this.parent = parent;
        this.container = container;
        this._element.setAttribute("id", `startNode_${ids.get()}`);
        this._element.setAttribute("class", "start-node");
        this._textElement.id = `textElement_${this.id}`;
        this._textElement.classList.add("textElement");
        this._textElement.classList.add("StartNode_text");
        this._textElement.textContent = Words.get("Start");
        this._textElement.setAttribute("x", `${CONFIG.TEXT_MARGIN}`);
        this._textElement.setAttribute("y", `${CONFIG.TEXT_MARGIN}`);
        this._textElement.setAttribute("text-anchor", "start");
        this._textElement.setAttribute("dominant-baseline", "hanging");
        this._ellipseElement.setAttribute("fill", CONFIG.MAIN_SHAPE_COLOUR);
        this._ellipseElement.id = `ellipseElement_${this.id}`;
        this._element.appendChild(this._ellipseElement);
        this._element.appendChild(this._textElement);
        parent.appendChild(this._element);
        this._element.appendChild(this._ellipseElement);
        this._element.appendChild(this._textElement);
        this.parent.appendChild(this._element);
        requestAnimationFrame(this.update.bind(this));
    }
    get width() {
        return this._textElement.getBBox().width + 2 * CONFIG.TEXT_MARGIN;
    }
    get height() {
        return this._textElement.getBBox().height + 2 * CONFIG.TEXT_MARGIN;
    }
    update() {
        const width = this._textElement.getBBox().width + 2 * CONFIG.TEXT_MARGIN;
        const height = this._textElement.getBBox().height + 2 * CONFIG.TEXT_MARGIN;
        this._element.setAttribute("width", `${width}`);
        this._element.setAttribute("height", `${height + CONFIG.SHAPE_MARGIN}`);
        this._ellipseElement.setAttribute("cx", `${width / 2}`);
        this._ellipseElement.setAttribute("cy", `${height / 2}`);
        this._ellipseElement.setAttribute("rx", `${width / 2}`);
        this._ellipseElement.setAttribute("ry", `${height / 2}`);
        this._element.oncontextmenu =
            this._element.ondblclick = this.menuFunction.bind(this);
    }
    updateTopMid(coords) {
        this._element.setAttribute("x", `${coords.x - this._element.getBBox().width / 2}`);
        this._element.setAttribute("y", `${coords.y}`);
    }
    menuFunction(e) {
        e.preventDefault();
        const map = this.getContextMenuMap(e);
        CustomMenu.show(e.clientX, e.clientY, map);
    }
    ;
    getContextMenuMap(e) {
        const parent = this.container;
        return new Map()
            .set("Add after", (() => {
            openAddMenu(c(e.clientX, e.clientY), this.container, 0);
        }));
    }
}
/**
 * Ending node of the flowchart.
 * should only occur once per flowchart
 */
class EndNode {
    parent;
    id = ids.get();
    _element = document.createElementNS(SVG_NS, "svg");
    _textElement = document.createElementNS(SVG_NS, "text");
    _ellipseElement = document.createElementNS(SVG_NS, "ellipse");
    constructor(parent) {
        this.parent = parent;
        this._element.setAttribute("id", `endNode_${ids.get()}`);
        this._element.setAttribute("class", "end-node");
        this._textElement.id = `textElement_${this.id}`;
        this._textElement.classList.add("textElement");
        this._textElement.classList.add("EndNode_text");
        this._textElement.textContent = Words.get("End");
        this._textElement.setAttribute("x", `${CONFIG.TEXT_MARGIN}`);
        this._textElement.setAttribute("y", `${CONFIG.TEXT_MARGIN}`);
        this._textElement.setAttribute("text-anchor", "start");
        this._textElement.setAttribute("dominant-baseline", "hanging");
        this._ellipseElement.setAttribute("fill", CONFIG.MAIN_SHAPE_COLOUR);
        this._ellipseElement.id = `ellipseElement_${this.id}`;
        this._element.appendChild(this._ellipseElement);
        this._element.appendChild(this._textElement);
        parent.appendChild(this._element);
        this._element.appendChild(this._ellipseElement);
        this._element.appendChild(this._textElement);
        this.parent.appendChild(this._element);
        requestAnimationFrame(this.update.bind(this));
    }
    get width() {
        return this._textElement.getBBox().width + 2 * CONFIG.TEXT_MARGIN;
    }
    get height() {
        return this._textElement.getBBox().height + CONFIG.TEXT_MARGIN;
    }
    update() {
        const width = this._textElement.getBBox().width + 2 * CONFIG.TEXT_MARGIN;
        const height = this._textElement.getBBox().height + 2 * CONFIG.TEXT_MARGIN;
        this._element.setAttribute("width", `${width}`);
        this._element.setAttribute("height", `${height}`);
        this._textElement.setAttribute("x", `${CONFIG.TEXT_MARGIN}`);
        this._textElement.setAttribute("y", `${CONFIG.TEXT_MARGIN}`);
        this._ellipseElement.setAttribute("cx", `${width / 2}`);
        this._ellipseElement.setAttribute("cy", `${height / 2}`);
        this._ellipseElement.setAttribute("rx", `${width / 2}`);
        this._ellipseElement.setAttribute("ry", `${height / 2}`);
    }
    updateTopMid(coords) {
        this._element.setAttribute("x", `${coords.x - this._element.getBBox().width / 2}`);
        this._element.setAttribute("y", `${coords.y}`);
    }
}
class Main {
    useUrl;
    SVG = document.createElementNS(SVG_NS, "svg");
    id = ids.get();
    container;
    startNode;
    endNode;
    constructor(bodyElement, useUrl = true) {
        this.useUrl = useUrl;
        bodyElement.appendChild(this.SVG);
        this.SVG.setAttribute("id", `mainCode_${this.id}`);
        this.SVG.innerHTML += `<defs>
    <marker id="arrow" markerWidth="${CONFIG.LINE_WIDTH}" markerHeight="${CONFIG.LINE_WIDTH}" refX="${CONFIG.LINE_WIDTH / 2}" refY="${CONFIG.LINE_WIDTH / 2}" orient="auto">
      <path d="M 0 0 L ${CONFIG.LINE_WIDTH} ${CONFIG.LINE_WIDTH / 2} L 0 ${CONFIG.LINE_WIDTH} z" />
    </marker>
    <marker id="arrowEnd" markerWidth="${CONFIG.LINE_WIDTH}" markerHeight="${CONFIG.LINE_WIDTH}" refX="${CONFIG.LINE_WIDTH}" refY="${CONFIG.LINE_WIDTH / 2}" orient="auto">
      <path d="M 0 0 L ${CONFIG.LINE_WIDTH} ${CONFIG.LINE_WIDTH / 2} L 0 ${CONFIG.LINE_WIDTH} z" fill="black" />
    </marker>
    <marker id="arrowStart" markerWidth="${CONFIG.LINE_WIDTH}" markerHeight="${CONFIG.LINE_WIDTH}" refX="0" refY="${CONFIG.LINE_WIDTH / 2}" orient="auto">
      <path d="M 0 0 L ${CONFIG.LINE_WIDTH} ${CONFIG.LINE_WIDTH / 2} L 0 ${CONFIG.LINE_WIDTH} z" fill="black" />
    </marker>
  </defs>`;
        this.container = new CodeContainer(this.SVG, this);
        this.startNode = new StartNode(this.SVG, this.container);
        this.endNode = new EndNode(this.SVG);
        requestAnimationFrame(this.init.bind(this));
    }
    init() {
        this.container.update();
        this.startNode.update();
        this.endNode.update();
    }
    update() {
        const middle = Math.max(this.startNode._element.getBBox().width / 2, this.endNode._element.getBBox().width / 2, this.container.leftSpace);
        const width = Math.max(this.startNode._element.getBBox().width, this.endNode._element.getBBox().width, this.container.width);
        this.startNode.updateTopMid(c(middle, 0));
        this.container.setTopMid(c(middle, this.startNode._element.getBBox().height));
        this.endNode.updateTopMid(c(middle, this.startNode._element.getBBox().height + this.container.height));
        this.SVG.setAttribute("width", `${width}`);
        this.SVG.setAttribute("height", `${(this.container.height + this.startNode._element.getBBox().height + this.endNode._element.getBBox().height)}`);
        if (this.useUrl) {
            updateURLParams({ init: JSON.stringify(this.export) });
        }
    }
    get programTitle() {
        return Words.get("Main Program");
    }
    get export() {
        return {
            type: "Program",
            content: this.container.export,
            name: this.programTitle,
            functions: [] //TODO: implement functions here
        };
    }
}
let main;
const recursiveContentAdder = (content, i, container) => {
    if (i < content.length) {
        Creator.exportToCode(content[i], container, i);
        requestAnimationFrame(() => {
            recursiveContentAdder(content, i + 1, container);
        });
    }
};
function init() {
    main = new Main(document.querySelector("#flowchartcontainer") || document.body);
    const recursiveContentAdder = (content, i, container) => {
        if (i < content.length) {
            Creator.exportToCode(content[i], container, i);
            requestAnimationFrame(() => {
                recursiveContentAdder(content, i + 1, container);
            });
        }
    };
    try {
        const url = new URLSearchParams(window.location.search);
        if (url.has("init")) {
            const content = JSON.parse(url.get("init") || "");
            if (content.type == "Program") {
                recursiveContentAdder(content.content, 0, main.container);
            }
            else
                throw Error();
        }
        else {
            if (!window.localStorage.getItem("tutorialSeen")) {
                new Tutorial();
                window.localStorage.setItem("tutorialSeen", "1");
            }
            throw Error();
        }
    }
    catch {
    }
}
function exportAll() {
    return JSON.stringify(main.export);
}
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
class Creator extends PopUp {
    form = document.createElement('form');
    types = document.createElement('select');
    /*
        TODO: Add layout
     */
    /**
     * Creates an instance of Creator.
     * This constructor is protected to prevent direct instantiation.
     * Use subclasses to create specific instances.
     */
    constructor(doAfter) {
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
            try {
                return Creator.getExport(this.types.value);
            }
            finally {
                this.close();
            }
        };
        this.setSize("300", "300");
        this.setPosition("50", 50);
        this.setFullScreen();
        this.open();
    }
    static exportToCode(export1, parent, index) {
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
    static getExport(s) {
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
    constructor(message) {
        super(message);
    }
}
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
const languages = ["nl", "en"];
function updateURLParams(params) {
    const searchParams = new URLSearchParams(window.location.search);
    for (const [key, value] of Object.entries(params)) {
        if (value)
            searchParams.set(key, value); // Only set non-empty values
    }
    const newURL = `${window.location.pathname}?${searchParams.toString()}`;
    history.replaceState(params, '', newURL); // Update URL without reloading
}
(() => {
    const current_lan = new URLSearchParams(window.location.search);
    updateURLParams({
        lan: current_lan.get("lan") || window.navigator.language.split("-")[0]
    });
})();
class Translator {
    static fullMap = new Map()
        .set("nl", new Map([
        ["Main Program", "Hoofdprogramma"],
        ["true", "waar"],
        ["false", "onwaar"],
        ["Submit", "Pas toe"],
        ["Quick tutorial", "Korte handleiding"],
        ["Adding nodes", "Blokken toevoegen"],
        ["addingNodesGuide", "Klik op de pijl tussen de begin en eind cirkel om een nieuw blok toe te voegen. Probeer hieronder."],
        ["Changing nodes", "Blokken aanpassen"],
        ["changingNodesGuide", "Klik op een blok om de tekst erop aan te passen."],
        ["Edit me!", "Pas me aan!"],
        ["Deleting nodes", "Blokken aanpassen"],
        ["Delete me!", "Verwijder me!"],
        ["deletingNodesGuide", "Klik met rechter muisknop op een blok om deze aan te passen."],
        ["Select", "Selecteer"],
        ["STATEMENT", "Opdracht"],
        ["WHILE", "Zolang lus"],
        ["FOR", "Voor-elke lus"],
        ["DO_WHILE", "Doe-zolang lus"],
        ["IF", "Als keuze"],
        ["Add", "Voeg"],
        ["add2", " toe"],
        ["Remove", "Verwijderen"],
        ["Add After", "Hierna toevoegen"],
        ["Edit Text", "Tekst aanpassen"],
        ["Copy Code", "Kopieer code"],
        ["Copy URL", "Kopieer URL"],
        ["Unknown code", "Onbekende code"],
        ["To Python Comments", "Naar Python commentaar"],
        ["To Java Comments", "Naar Java commentaar"],
        ["Reset", "Reset"],
        ["End", "Einde"],
        ["Start", "Start"],
        ["Export to image", "Als afbeelding opslaan"]
    ]))
        .set("en", new Map([
        ["Main Program", "Main Program"],
        ["addingNodesGuide", "Click on the arrow between two nodes to add a new node in between. You can try below."],
        ["changingNodesGuide", "Click on a node to edit the text inside it."],
        ["deletingNodesGuide", "Right-click on a node and left-click on remove, to remove the node from the flowchart."],
        ["STATEMENT", "Statement"],
        ["WHILE", "While loop"],
        ["FOR", "For-each loop"],
        ["DO_WHILE", "Do-While loop"],
        ["IF", "If choice"],
        ["Add", "Add"],
        ["add2", " "]
    ]));
    static get urlpars() {
        return new URLSearchParams(location.search);
    }
    static get(word, lan = this.lan) {
        if (this.fullMap.has(lan)) {
            const map = this.fullMap.get(lan);
            return map ? (map.get(word) || word) : word;
        }
        else
            return word;
    }
    static get lan() {
        return languages.includes(this.urlpars.get("lan") || "") ? (this.urlpars.get("lan") || "") : "en";
    }
}
class Words extends Translator {
}
class PopUp {
    element = document.createElement('div');
    background_element = document.createElement('div');
    fullscreen = false;
    closeButton = document.createElement('a');
    constructor(closeOthers = true) {
        this.background_element.className = 'pop-up-bg';
        this.background_element.style.position = 'fixed';
        this.background_element.style.left = "0";
        this.background_element.style.top = "0";
        this.background_element.style.bottom = "0";
        this.background_element.style.right = "0";
        this.background_element.style.zIndex = '1000';
        this.background_element.style.borderRadius = '0';
        this.background_element.style.padding = '10px';
        this.background_element.style.background = 'rgba(0, 0, 0, 0.45)';
        this.background_element.style.display = 'none'; // Initially hidden
        this.background_element.appendChild(this.element);
        this.background_element.onclick = (e) => {
            if (e.target === this.background_element) {
                this.close();
            }
        };
        this.element.className = 'pop-up';
        this.element.style.position = 'fixed';
        this.element.style.left = "50px";
        this.element.style.top = "50px";
        this.background_element.style.zIndex = '1001';
        this.element.style.backgroundColor = '#cececeff';
        this.element.style.border = '1px solid #ccc';
        this.element.style.borderRadius = '5px';
        this.element.style.padding = '10px';
        this.element.style.overflow = 'auto';
        this.element.style.zIndex = '1001';
        this.element.style.boxShadow = '0 2px 10px rgba(255, 255, 255, 0.1)';
        this.element.style.display = 'none'; // Initially hidden
        document.body.appendChild(this.background_element);
        document.body.appendChild(this.element);
        this.add(this.closeButton);
        this.closeButton.innerHTML = 'X';
        this.closeButton.className = 'close-button';
        this.closeButton.style.display = 'block';
        this.closeButton.style.background = "red";
        this.closeButton.style.position = "fixed";
        this.closeButton.style.right = "60px";
        this.closeButton.style.top = "60px";
        this.closeButton.style.borderRadius = "5px";
        this.closeButton.style.padding = `${CONFIG.LINE_WIDTH}px`;
        this.closeButton.onclick = this.close.bind(this);
    }
    setBG(background) {
        this.element.style.background = background;
    }
    add(element) {
        this.element.appendChild(element);
    }
    empty() {
        this.element.innerHTML = '';
    }
    open() {
        this.element.style.display = 'block';
        this.background_element.style.display = 'block';
        document.body.appendChild(this.element);
    }
    close() {
        this.element.style.display = 'none';
        this.background_element.style.display = 'none';
        if (this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
            this.element.parentNode.removeChild(this.background_element);
        }
    }
    setPosition(x, y) {
        this.element.style.left = Number.isFinite(x) ? `${x}px` : x.toString();
        this.element.style.top = Number.isFinite(y) ? `${y}px` : y.toString();
        this.fullscreen = false;
    }
    setFullScreen() {
        this.element.style.left = '50px';
        this.element.style.top = '50px';
        this.element.style.width = 'calc(100% - 100px)';
        this.element.style.height = 'calc(100% - 100px)';
        this.element.style.margin = '0';
        this.element.style.padding = '20px';
        this.element.style.boxSizing = 'border-box';
        this.fullscreen = true;
    }
    setSize(width, height) {
        this.element.style.width = width;
        this.element.style.height = height;
        this.element.style.boxSizing = 'border-box';
        this.fullscreen = false;
    }
}
class CopyCodePopUp extends PopUp {
    static current;
    preElement = document.createElement("pre");
    codeElement = document.createElement("CODE");
    contentElement = document.createElement("textarea");
    copyButton = document.createElement("button");
    constructor(lan, code) {
        super();
        if (CopyCodePopUp.current) {
            CopyCodePopUp.current.close();
        }
        CopyCodePopUp.current = this;
        this.codeElement.classList.add("language-" + lan);
        this.preElement.appendChild(this.codeElement);
        this.contentElement.style.display = "none";
        this.copyButton.innerHTML = Words.get("Copy Code");
        const codeString = lan === "python" ? new PythonCodeMaker(code).toCode() : lan === "java" ? new JavaCodeMaker(code).toCode() : "";
        this.copyButton.onclick = () => {
            var copyText = this.contentElement;
            copyText.select();
            navigator.clipboard.writeText(codeString);
        };
        this.add(this.copyButton);
        this.add(this.preElement);
        this.add(this.contentElement);
        this.codeElement.innerHTML = this.contentElement.textContent = codeString;
        this.setFullScreen();
        this.open();
    }
    close() {
        super.close();
        CopyCodePopUp.current = null;
    }
}
class Tutorial extends PopUp {
    constructor() {
        super();
        let main = document.createElement("div");
        this.add(main);
        let content = [];
        content.push(document.createElement("h1"));
        main.appendChild(content[0]);
        content[0].innerHTML = Words.get(`Quick tutorial`);
        content.push(document.createElement("ol"));
        main.appendChild(content[1]);
        // Steps:
        // Step 1
        let steps = [document.createElement("li")];
        content[1].appendChild(steps[0]);
        steps[0].innerHTML = `<h2>${Words.get("Adding nodes")}</h2>
                            <p>
                                ${Words.get("addingNodesGuide")} 
                            </p>`;
        let first = document.createElement("div");
        steps[0].appendChild(first);
        let main_first_step = new Main(first, false);
        //step 2
        steps.push(document.createElement("li"));
        content[1].appendChild(steps[1]);
        steps[1].innerHTML = `<h2>${Words.get("Changing nodes")}</h2>
                            <p>
                                ${Words.get("changingNodesGuide")}
                            </p>`;
        let second = document.createElement("div");
        steps[1].appendChild(second);
        let main_second_step = new Main(second, false);
        recursiveContentAdder([{ type: "StatementCode", content: null, text: Words.get("Edit me!") }], 0, main_second_step.container);
        steps.push(document.createElement("li"));
        content[1].appendChild(steps[2]);
        steps[2].innerHTML = `<h2>${Words.get("Deleting nodes")}</h2>
                            <p>
                                ${Words.get("deletingNodesGuide")}
                            </p>`;
        let third = document.createElement("div");
        steps[2].appendChild(third);
        let main_third_step = new Main(third, false);
        recursiveContentAdder([{ type: "StatementCode", content: null, text: Words.get("Delete me!") }], 0, main_third_step.container);
        this.open();
        this.setFullScreen();
    }
}
class CustomMenu {
    static menu;
    static container;
    static opened = false;
    static initialize() {
        CustomMenu.container = document.createElement("div");
        CustomMenu.menu = document.createElement('div');
        CustomMenu.container.appendChild(CustomMenu.menu);
        CustomMenu.container.style.display = "none";
        CustomMenu.container.style.position = 'fixed';
        CustomMenu.menu.className = 'custom-menu';
        CustomMenu.menu.style.display = 'flex';
        CustomMenu.menu.style.flexDirection = 'column';
        CustomMenu.menu.style.alignContent = 'stretch';
        CustomMenu.menu.style.maxHeight = '200px';
        CustomMenu.menu.style.margin = 'auto';
        CustomMenu.menu.style.width = '100%';
        CustomMenu.container.style.zIndex = "1020";
        document.body.appendChild(CustomMenu.container);
    }
    static show(x, y, items) {
        if (CustomMenu.opened) {
            CustomMenu.hide();
            CustomMenu.opened = false;
        }
        console.log("CustomMenu.show", x, y, items);
        CustomMenu.reset();
        if (items.size > 0) {
            items.forEach((item, name) => {
                const menuItem = CustomMenu.customItemElement();
                menuItem.textContent = name;
                menuItem.onclick = () => {
                    item();
                    CustomMenu.hide();
                };
                CustomMenu.menu.appendChild(menuItem);
            });
        }
        CustomMenu.container.style.left = `${x}px`;
        CustomMenu.container.style.top = `${y}px`;
        CustomMenu.container.style.backgroundColor = CONFIG.MENU_COLOUR;
        CustomMenu.container.style.display = 'block';
        CustomMenu.opened = true;
    }
    static reset() {
        CustomMenu.menu.innerHTML = '';
    }
    static hide() {
        CustomMenu.container.style.display = 'none';
        CustomMenu.opened = false;
    }
    static customItemElement() {
        const item = document.createElement('div');
        item.style.margin = '2px';
        item.style.padding = '5px';
        item.style.backgroundColor = '#f0f0f0';
        item.style.border = '1px solid #ccc';
        item.style.borderRadius = '5px';
        item.className = 'clickable';
        return item;
    }
}
CustomMenu.initialize();
document.onclick = () => { CustomMenu.hide(); };
(document.getElementById('CopyUrlButton') || document.createElement("button")).innerHTML = Words.get('Copy URL');
(document.getElementById('PythonButton') || document.createElement("button")).innerHTML = Words.get('To Python Comments');
(document.getElementById('JavaButton') || document.createElement("button")).innerHTML = Words.get('To Java Comments');
(document.getElementById('ResetButton') || document.createElement("button")).innerHTML = Words.get('Reset');
(document.getElementById('toImgButton') || document.createElement("button")).innerHTML = Words.get('Export to image');
