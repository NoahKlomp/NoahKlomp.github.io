"use strict";
// Global SVG setup
const SVG_NS = "http://www.w3.org/2000/svg";
const SVG = document.createElementNS(SVG_NS, "svg");
// SVG.setAttribute("width", "800");
// SVG.setAttribute("height", "600");
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
fetch("js/Three/config.json").then(e => e.json()).then(e => {
    CONFIG = Object.assign(Object.assign({}, CONFIG), e); // override with config.json
}).then(() => {
    init();
});
function emptyContent() {
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
    constructor(parent, index) {
        this.parent = parent;
        this.index = index;
        this.line = document.createElementNS(SVG_NS, "polyline");
        this.element = document.createElementNS(SVG_NS, "svg");
        this.id = ids.get();
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
        openAddMenu(c(e.pageX, e.pageY), this.parent, this.index);
    }
}
function openAddMenu(cors, parent, indexToAdd) {
    requestAnimationFrame(() => {
        const map = new Map();
        for (let t in CodeType) {
            if (!["FUNCTION", "MAIN"].includes(t)) {
                map.set("Add " + t, (() => {
                    Creator.exportToCode(Creator.getExport(t), parent, indexToAdd);
                }));
            }
        }
        CustomMenu.show(cors.x, cors.y, map);
    });
}
class CodeContainer {
    constructor(parentElement, parent) {
        this.parentElement = parentElement;
        this.parent = parent;
        this.content = [];
        this.view = document.createElementNS(SVG_NS, "svg");
        this.lines = [new ConnectingLine(this, 0)];
        this._line_colour = CONFIG.LINE_COLOUR;
        this.id = ids.get();
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
    /*
        TODO:
          - Incoming arrow instead of first line
     */
    constructor(parent, index, _innerElement = document.createElementNS(SVG_NS, "svg")) {
        this.parent = parent;
        this.index = index;
        this._innerElement = _innerElement;
        this.id = ids.get();
        this.lines = [];
        this._innerElement.setAttribute("x", `${0}`);
        this._innerElement.setAttribute("y", `${CONFIG.SHAPE_MARGIN}`);
        this._innerElement.setAttribute("id", `${this.constructor.name}_inner_${this.id}`);
        this._innerElement.classList.add(`${this.constructor.name}`);
        this._innerElement.oncontextmenu =
            this._innerElement.ondblclick = this.menuFunction.bind(this);
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
        CustomMenu.show(e.pageX, e.pageY, map);
    }
    ;
    getContextMenuMap(e) {
        const parent = this.parent;
        const map = new Map();
        map.set("Remove", (() => {
            parent.remove(this.index);
        }));
        map.set("Add After", (() => {
            openAddMenu(c(e.pageX, e.pageY), this.parent, this.index + 1);
        }));
        map.set("Edit Text", (() => {
            new TextEditor(this, (newText) => {
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
    /*
        TODO:
          - Shape border?
     */
    constructor(parent, index, text) {
        super(parent, index);
        this._textElement = document.createElementNS(SVG_NS, "text");
        this._rectangle = document.createElementNS(SVG_NS, "rect");
        this.textbbox = this._textElement.getBBox();
        this._innerElement.setAttribute("class", "statement");
        this._innerElement.appendChild(this._rectangle);
        this._innerElement.appendChild(this._textElement);
        this.text = text;
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
    /*
        TODO:
          - Add arrows to restart- and skip lines
          - Add labels "True" and "False" for lines
     */
    constructor(parent, index, type, text) {
        super(parent, index);
        this.type = type;
        this.loopBox = document.createElementNS(SVG_NS, "svg");
        this.loopBoxShape = document.createElementNS(SVG_NS, "polygon");
        this.loopText = document.createElementNS(SVG_NS, "text");
        this.textbbox = this.loopText.getBBox();
        this.skipLoopLine = document.createElementNS(SVG_NS, "polyline");
        this.restartLoopLine = document.createElementNS(SVG_NS, "polyline");
        this.trueLabel = document.createElementNS(SVG_NS, "text");
        this.falseLabel = document.createElementNS(SVG_NS, "text");
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
        this._innerElement.appendChild(this.loopBox);
        this._innerElement.setAttribute("class", "loop_" + type);
        this._innerElement.appendChild(this.skipLoopLine);
        this._innerElement.appendChild(this.restartLoopLine);
        this._innerElement.appendChild(this.falseLabel);
        this._innerElement.appendChild(this.trueLabel);
        this.loopBox.ondblclick = this.loopBox.oncontextmenu = this.menuFunction.bind(this);
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
        this.falseLabel.setAttribute("y", `${(this.textbbox.height + CONFIG.LINE_WIDTH) / 2 + 2 * CONFIG.TEXT_MARGIN}`);
        this.skipLoopLine.setAttribute("fill", "none");
        this.skipLoopLine.setAttribute("stroke", "red");
        this.skipLoopLine.setAttribute("stroke-width", `${CONFIG.LINE_WIDTH}`);
        // this.skipLoopLine.setAttribute("marker-end","url(#arrowEnd)");
        this.skipLoopLine.setAttribute("marker-start", "url(#arrowStart)");
        this.restartLoopLine.setAttribute("fill", "none");
        this.restartLoopLine.setAttribute("stroke", "green");
        this.restartLoopLine.setAttribute("stroke-width", `${CONFIG.LINE_WIDTH}`);
        this.restartLoopLine.setAttribute("marker-end", "url(#arrowEnd)");
        // this.restartLoopLine.setAttribute("marker-start","url(#arrowStart)");
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
            content: Object.assign(Object.assign({}, emptyContent()), { "Looped": this.container.export }),
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
            openAddMenu(c(e.pageX, e.pageY), this.container, 0);
        }).set("Clear", () => {
            this.container.clear();
        });
    }
}
class WhileLoopCode extends GeneralLoopCode {
    constructor(parent, index, text) {
        super(parent, index, CodeType.WHILE, text);
        this.MAINBOX_COLOUR = CONFIG.WHILE_SHAPE_COLOUR;
    }
}
class ForLoopCode extends GeneralLoopCode {
    constructor(parent, index, text) {
        super(parent, index, CodeType.FOR, text);
        this.MAINBOX_COLOUR = CONFIG.FOR_SHAPE_COLOUR;
    }
}
class DoWhileLoop extends Code {
    /*
        TODO:
          - Add arrows to restart line and after loop box
          - Add labels to lines
     */
    constructor(parent, index, text) {
        super(parent, index);
        this.doBox = document.createElementNS(SVG_NS, "svg");
        this.doText = document.createElementNS(SVG_NS, "text");
        this.doTextBBox = this.doText.getBBox();
        this.doBBox = this.doBox.getBBox();
        this.doShape = document.createElementNS(SVG_NS, "polygon");
        this.loopBox = document.createElementNS(SVG_NS, "svg");
        this.loopText = document.createElementNS(SVG_NS, "text");
        this.textBBox = this.loopText.getBBox();
        this.loopShape = document.createElementNS(SVG_NS, "polygon");
        this.loopBBox = this.loopBox.getBBox();
        this.restartLine = document.createElementNS(SVG_NS, "polyline");
        this.trueLabel = document.createElementNS(SVG_NS, "text");
        this.falseLabel = document.createElementNS(SVG_NS, "text");
        this.doBox.appendChild(this.doShape);
        this.doBox.appendChild(this.doText);
        this.doText.textContent = "Do";
        this.doText.setAttribute("text-anchor", "start");
        this.doText.setAttribute("dominant-baseline", "hanging");
        this.doText.setAttribute("x", `${2 * CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH}`);
        this.doText.setAttribute("y", `${CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH}`);
        this.trueLabel.setAttribute("text-anchor", "start");
        this.trueLabel.setAttribute("dominant-baseline", "hanging");
        this.trueLabel.textContent = "true";
        this.falseLabel.setAttribute("text-anchor", "end");
        this.falseLabel.textContent = "false";
        this.falseLabel.setAttribute("dominant-baseline", "ideographic");
        this._innerElement.appendChild(this.trueLabel);
        this._innerElement.appendChild(this.falseLabel);
        this._innerElement.appendChild(this.doBox);
        this.doBox.classList.add("DoWhileLoopDoBox");
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
        this.loopBox.appendChild(this.loopText);
        this._innerElement.appendChild(this.loopBox);
        this.loopBox.classList.add("DoWhileLoopBox");
        this.text = text;
        this.loopText.setAttribute("text-anchor", "start");
        this.loopText.setAttribute("dominant-baseline", "hanging");
        this.loopText.setAttribute("x", `${CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH}`);
        this.loopText.setAttribute("y", `${CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH}`);
        this.loopBox.ondblclick = this.loopBox.oncontextmenu = this.menuFunction.bind(this);
        this.doBox.ondblclick = this.doBox.oncontextmenu = this.menuFunction.bind(this);
        this._innerElement.ondblclick = this._innerElement.oncontextmenu = (e) => { };
        this._innerElement.appendChild(this.restartLine);
        this._innerElement.classList.add("DoWhileLoop");
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
        // const wLoop: number = this.loopText.getBBox().width + 2 * CONFIG.TEXT_MARGIN + 2 * CONFIG.LINE_WIDTH;
        // const hLoop: number = this.loopText.getBBox().height + 2 * CONFIG.TEXT_MARGIN + 2 * CONFIG.LINE_WIDTH;
        // const wDo: number = this.doText.getBBox().width + 4 * CONFIG.TEXT_MARGIN + 2 * CONFIG.LINE_WIDTH;
        // const hDo: number = this.doText.getBBox().height + 4 * CONFIG.TEXT_MARGIN + 2 * CONFIG.LINE_WIDTH;
        const wLoop = this.loopBBox.width + 2 * CONFIG.LINE_WIDTH;
        const hLoop = this.loopBBox.height + 2 * CONFIG.LINE_WIDTH;
        const wDo = (this.doTextBBox.width + 4 * CONFIG.TEXT_MARGIN) + 2 * CONFIG.LINE_WIDTH;
        const hDo = this.doBBox.height + 2 * CONFIG.LINE_WIDTH;
        const cPoint = Math.max(0, wLoop / 2, wDo / 2, this.container.leftSpace);
        this.trueLabel.setAttribute("x", `${cPoint + wLoop / 2}`);
        this.trueLabel.setAttribute("y", `${hDo + this.container.height + hLoop / 2}`);
        this.falseLabel.setAttribute("x", `${cPoint - CONFIG.LINE_WIDTH}`);
        this.falseLabel.setAttribute("y", `${hDo + this.container.height + hLoop + CONFIG.LINE_WIDTH}`);
        this.loopShape.setAttribute("points", this.getLoopBoxPoints());
        this.doBox.setAttribute("x", `${cPoint - wDo / 2}`);
        this.doBox.setAttribute("y", `${0}`);
        this.container.setTopMid(c(cPoint, hDo));
        this.loopBox.setAttribute("x", `${cPoint - wLoop / 2}`);
        this.loopBox.setAttribute("y", `${hDo + this.container.height}`);
        this.loopBox.setAttribute("height", `${this.textBBox.height + 3 * CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH}`);
        this.loopBox.setAttribute("width", `${this.textBBox.width + 2 * CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH}`);
        this.restartLine.setAttribute("points", this.getRestartPoints());
    }
    set text(newText) {
        this.loopText.textContent = newText.replace("\n", "<br/>");
        requestAnimationFrame(() => {
            this.textBBox = this.loopText.getBBox();
            this.loopBBox = this.loopBox.getBBox();
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
        const height = this.textBBox.height + 2 * CONFIG.TEXT_MARGIN;
        const width = this.textBBox.width + 2 * CONFIG.TEXT_MARGIN;
        return [
            `${CONFIG.LINE_WIDTH / 2},${CONFIG.LINE_WIDTH / 2}`,
            `${width - CONFIG.LINE_WIDTH},${CONFIG.LINE_WIDTH / 2}`,
            `${width - CONFIG.LINE_WIDTH},${height - CONFIG.LINE_WIDTH / 2}`,
            `${width / 2 + CONFIG.LINE_WIDTH},${height + CONFIG.TEXT_MARGIN}`,
            `${CONFIG.LINE_WIDTH / 2},${height - CONFIG.LINE_WIDTH / 2}`
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
    get width() {
        return this.leftSpace + this.rightSpace;
    }
    get leftSpace() {
        return Math.max(0, (this.doTextBBox.width + 4 * CONFIG.TEXT_MARGIN) / 2, (this.textBBox.width + 2 * CONFIG.TEXT_MARGIN) / 2, this.container.leftSpace);
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
            openAddMenu(c(e.pageX, e.pageY), this.container, 0);
        }).set("Clear", () => {
            this.container.clear();
        });
    }
}
class IfStatementCode extends Code {
    /*
        TODO:
          - add labels 'True' and 'False'
     */
    constructor(parent, index, text) {
        super(parent, index);
        this.ifBox = document.createElementNS(SVG_NS, "svg");
        this.ifBoxShape = document.createElementNS(SVG_NS, "polygon");
        this.textBox = document.createElementNS(SVG_NS, "text");
        this.textBBox = this.textBox.getBBox();
        this._falseLine1 = document.createElementNS(SVG_NS, "polyline");
        this._falseLine2 = document.createElementNS(SVG_NS, "polyline");
        this._trueLine1 = document.createElementNS(SVG_NS, "polyline");
        this._trueLine2 = document.createElementNS(SVG_NS, "polyline");
        this.trueLabel = document.createElementNS(SVG_NS, "text");
        this.falseLabel = document.createElementNS(SVG_NS, "text");
        this._falseContent = new CodeContainer(this._innerElement, this);
        this._falseContent.line_colour = "red";
        this._trueContent = new CodeContainer(this._innerElement, this);
        this._trueContent.line_colour = "green";
        this.ifBox.appendChild(this.ifBoxShape);
        this.ifBox.appendChild(this.textBox);
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
        this._innerElement.ondblclick = this._innerElement.oncontextmenu = () => {
        };
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
        //TODO:
        // - implement?
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
            content: Object.assign(Object.assign({}, emptyContent()), { "False": this._falseContent.export, "True": this._trueContent.export }),
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
            openAddMenu(c(e.pageX, e.pageY), this._trueContent, 0);
        })
            .set("Clear true block", () => {
            this._trueContent.clear();
        })
            .set("Add to start of false block", () => {
            openAddMenu(c(e.pageX, e.pageY), this._falseContent, 0);
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
    constructor(parent, container) {
        this.parent = parent;
        this.container = container;
        this.id = ids.get();
        this._element = document.createElementNS(SVG_NS, "svg");
        this._textElement = document.createElementNS(SVG_NS, "text");
        this._ellipseElement = document.createElementNS(SVG_NS, "ellipse");
        this.line = document.createElementNS(SVG_NS, "line");
        this._element.setAttribute("id", `startNode_${ids.get()}`);
        this._element.setAttribute("class", "start-node");
        this._textElement.id = `textElement_${this.id}`;
        this.line.id = `low_line_${this.id}`;
        this.line.setAttribute("marker-start", "url(#arrowStart");
        this._textElement.classList.add("textElement");
        this._textElement.classList.add("StartNode_text");
        this._textElement.textContent = "Start";
        this._textElement.setAttribute("x", `${CONFIG.TEXT_MARGIN}`);
        this._textElement.setAttribute("y", `${CONFIG.TEXT_MARGIN}`);
        this._textElement.setAttribute("text-anchor", "start");
        this._textElement.setAttribute("dominant-baseline", "hanging");
        this._ellipseElement.setAttribute("fill", CONFIG.MAIN_SHAPE_COLOUR);
        this._ellipseElement.id = `ellipseElement_${this.id}`;
        this._element.appendChild(this._ellipseElement);
        this._element.appendChild(this._textElement);
        this._element.appendChild(this.line);
        parent.appendChild(this._element);
        this._element.appendChild(this._ellipseElement);
        this._element.appendChild(this._textElement);
        this._element.appendChild(this.line);
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
    updateTopMid(coords) {
        this._element.setAttribute("x", `${coords.x - this._element.getBBox().width / 2}`);
        this._element.setAttribute("y", `${coords.y}`);
    }
    menuFunction(e) {
        e.preventDefault();
        const parent = this.container;
        const map = this.getContextMenuMap(e);
        CustomMenu.show(e.pageX, e.pageY, map);
    }
    ;
    getContextMenuMap(e) {
        const parent = this.container;
        return new Map()
            .set("Add", (() => {
            openAddMenu(c(e.pageX, e.pageY), this.container, 0);
        }));
    }
}
/**
 * Ending node of the flowchart.
 * should only occur once per flowchart
 */
class EndNode {
    constructor(parent) {
        this.parent = parent;
        this.id = ids.get();
        this._element = document.createElementNS(SVG_NS, "svg");
        this._textElement = document.createElementNS(SVG_NS, "text");
        this._ellipseElement = document.createElementNS(SVG_NS, "ellipse");
        this.line = document.createElementNS(SVG_NS, "line");
        this._element.setAttribute("id", `endNode_${ids.get()}`);
        this._element.setAttribute("class", "end-node");
        this._textElement.id = `textElement_${this.id}`;
        this.line.id = `low_line_${this.id}`;
        this.line.setAttribute("marker-end", "url(#arrowEnd)");
        this._textElement.classList.add("textElement");
        this._textElement.classList.add("EndNode_text");
        this._textElement.textContent = "End";
        this._textElement.setAttribute("x", `${CONFIG.TEXT_MARGIN}`);
        this._textElement.setAttribute("y", `${CONFIG.TEXT_MARGIN}`);
        this._textElement.setAttribute("text-anchor", "start");
        this._textElement.setAttribute("dominant-baseline", "hanging");
        this._ellipseElement.setAttribute("fill", CONFIG.MAIN_SHAPE_COLOUR);
        this._ellipseElement.id = `ellipseElement_${this.id}`;
        this._element.appendChild(this._ellipseElement);
        this._element.appendChild(this._textElement);
        this._element.appendChild(this.line);
        parent.appendChild(this._element);
        this._element.appendChild(this._ellipseElement);
        this._element.appendChild(this._textElement);
        this._element.appendChild(this.line);
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
    updateTopMid(coords) {
        this._element.setAttribute("x", `${coords.x - this._element.getBBox().width / 2}`);
        this._element.setAttribute("y", `${coords.y}`);
    }
}
class Main {
    constructor(bodyElement) {
        this.SVG = document.createElementNS(SVG_NS, "svg");
        this.id = ids.get();
        bodyElement.appendChild(this.SVG); // Attach to DOM for rendering
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
        // this.init();
    }
    init() {
        this.container.update();
        this.startNode.update();
        this.endNode.update();
    }
    update() {
        // this.container.update();
        const middle = Math.max(this.startNode._element.getBBox().width / 2, this.container.leftSpace);
        const width = Math.max(this.startNode._element.getBBox().width, this.container.width);
        this.startNode.updateTopMid(c(middle, 0));
        this.container.setTopMid(c(middle, this.startNode._element.getBBox().height));
        this.endNode.updateTopMid(c(middle, this.startNode._element.getBBox().height + this.container.height));
        this.SVG.setAttribute("width", `${width}`);
        this.SVG.setAttribute("height", `${this.container.height + this.startNode._element.getBBox().height + this.endNode._element.getBBox().height}`);
        updateURLParams({ init: JSON.stringify(this.export) });
    }
    get programTitle() {
        return "Main Program";
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
function init() {
    main = new Main(document.querySelector("#flowchartcontainer") || document.body);
    try {
        const url = new URLSearchParams(window.location.search);
        if (url.has("init")) {
            const content = JSON.parse(url.get("init") || "{}");
            if (content.type == "Program") {
                content.content.forEach((code, i) => {
                    Creator.exportToCode(code, main.container, i);
                });
            }
            else
                throw Error();
        }
        else
            throw Error();
    }
    catch (_a) {
    }
}
function exportAll() {
    return JSON.stringify(main.export);
}
function updateURLParams(params) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
        if (value)
            searchParams.set(key, value); // Only set non-empty values
    }
    const newURL = `${window.location.pathname}?${searchParams.toString()}`;
    history.replaceState(params, '', newURL); // Update URL without reloading
}
