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
    // DO_WHILE = "DoWhileLoopCode",
    // FUNCTION = "FunctionCode",
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
class CodeContainer {
    constructor(parentElement, parent, main) {
        this.parentElement = parentElement;
        this.parent = parent;
        this.main = main;
        this.content = [];
        this.view = document.createElementNS(SVG_NS, "svg");
        this.line_colour = CONFIG.LINE_COLOUR;
        parentElement.appendChild(this.view);
        this.view.setAttribute("id", `${ids.get()}`);
        this.view.setAttribute("class", "code-container");
    }
    get id() {
        return this.view.getAttribute("id");
    }
    get width() {
        return Math.max(0, ...this.content.map((i) => i.width));
    }
    get leftSpace() {
        return Math.max(0, ...this.content.map((i) => i.leftSpace));
    }
    get rightSpace() {
        return Math.max(0, ...this.content.map((i) => i.rightSpace));
    }
    get height() {
        return this.content.map(e => e.height).reduce((p, c) => p + c, 0);
    }
    get export() {
        return this.content.map(c => c.export);
    }
    add(newCode, index) {
        this.content.splice(index, 0, newCode);
        newCode.addTo(this.view);
        newCode.update();
    }
    remove(index) {
        if (index < 0 || index >= this.content.length) {
            throw new Error("Index out of bounds");
        }
        const removed = this.content.splice(index, 1)[0];
        removed._outerElement.remove();
        this.update();
    }
    update() {
        let newY = 0;
        this.content.forEach((e, i) => {
            e.index = i;
        });
        const middle = this.leftSpace;
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
    setTopMid(coords) {
        this.view.setAttribute("x", `${coords.x - this.leftSpace}`);
        this.view.setAttribute("y", `${coords.y}`);
    }
}
class Code {
    constructor(parent, index, _innerElement = document.createElementNS(SVG_NS, "svg")) {
        this.parent = parent;
        this.index = index;
        this._innerElement = _innerElement;
        this._outerElement = document.createElementNS(SVG_NS, "svg");
        this.id = ids.get();
        this.lines = [];
        this._innerElement.setAttribute("x", `${0}`);
        this._innerElement.setAttribute("y", `${CONFIG.SHAPE_MARGIN}`);
        this._innerElement.setAttribute("id", `${this.constructor.name}_inner_${this.id}`);
        this._outerElement.setAttribute("id", `${this.constructor.name}_outer_${this.id}`);
        this._outerElement.appendChild(this._innerElement);
        this._outerElement.classList.add("prevent-select");
        this._outerElement.oncontextmenu =
            this._outerElement.ondblclick = this.menuFunction.bind(this);
        requestAnimationFrame(() => {
            this.lines.push(document.createElementNS(SVG_NS, "line"));
            this.lines.push(document.createElementNS(SVG_NS, "line"));
            this.lines[0].setAttribute("id", `${this.constructor.name}_line1_${this.id}`);
            this.lines[1].setAttribute("id", `${this.constructor.name}_line2_${this.id}`);
            this.lines[0].setAttribute("stroke", `${CONFIG.LINE_COLOUR}`);
            this.lines[0].setAttribute("stroke-width", `${CONFIG.LINE_WIDTH}`);
            this.lines[1].setAttribute("stroke", `${CONFIG.LINE_COLOUR}`);
            this.lines[1].setAttribute("stroke-width", `${CONFIG.LINE_WIDTH}`);
            this.lines.forEach(l => this._outerElement.appendChild(l));
            parent.add(this, index);
            requestAnimationFrame(() => {
                this.update();
            });
        });
    }
    menuFunction(e) {
        e.preventDefault();
        const parent = this.parent;
        const map = this.getContextMenuMap();
        CustomMenu.show(e.pageX, e.pageY, map);
    }
    ;
    getContextMenuMap() {
        const parent = this.parent;
        const map = new Map();
        map.set("Remove", (() => {
            parent.remove(this.index);
        }));
        map.set("Add After", (() => {
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
        return this.innerHeight + CONFIG.SHAPE_MARGIN * 2;
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
            requestAnimationFrame(() => {
                this.parent.update();
            });
        });
    }
    ;
    setTopMid(coords) {
        requestAnimationFrame(() => {
            this._outerElement.setAttribute("x", `${coords.x - this.leftSpace}`);
            this._outerElement.setAttribute("y", `${coords.y}`);
        });
    }
    addTo(parentElement) {
        parentElement.appendChild(this._outerElement);
    }
}
class StatementCode extends Code {
    constructor(parent, index, text) {
        super(parent, index);
        this._textElement = document.createElementNS(SVG_NS, "text");
        this._rectangle = document.createElementNS(SVG_NS, "rect");
        this._innerElement.setAttribute("class", "statement");
        this._innerElement.appendChild(this._rectangle);
        this._innerElement.appendChild(this._textElement);
        this._textElement.textContent = text;
        this.update();
    }
    get export() {
        return {
            type: CodeType.STATEMENT,
            content: null,
            text: this._textElement.textContent || ""
        };
    }
    get width() {
        return this._textElement.getBBox().width + 2 * CONFIG.TEXT_MARGIN;
    }
    get innerHeight() {
        return this._textElement.getBBox().height + 2 * CONFIG.TEXT_MARGIN;
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
    setText(text) {
        this._textElement.textContent = text;
        requestAnimationFrame(this.update.bind(this));
    }
}
class GeneralLoopCode extends Code {
    constructor(parent, index, type, text, main) {
        super(parent, index);
        this.type = type;
        this.main = main;
        this.loopBox = document.createElementNS(SVG_NS, "svg");
        this.loopBoxShape = document.createElementNS(SVG_NS, "polyline");
        this.loopText = document.createElementNS(SVG_NS, "text");
        this.skipLoopLine = document.createElementNS(SVG_NS, "polyline");
        this.restartLoopLine = document.createElementNS(SVG_NS, "polyline");
        this.container = new CodeContainer(this._innerElement, this, this.main);
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
        this._outerElement.ondblclick = this._outerElement.oncontextmenu = (e) => {
        };
        requestAnimationFrame(() => this.update());
    }
    innerUpdate() {
        this.container.setTopMid(c(this.leftSpace, this.loopBox.getBBox().height));
        this._innerElement.setAttribute("height", `${this.height - 2 * CONFIG.SHAPE_MARGIN}`);
        this.loopBoxShape.setAttribute("fill", this.MAINBOX_COLOUR);
        this.loopBoxShape.setAttribute("stroke", CONFIG.LINE_COLOUR);
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
        requestAnimationFrame(() => {
            this.skipLoopLine.setAttribute("points", this.getSkipLinePoints());
            this.restartLoopLine.setAttribute("points", this.getRestartLinePoints());
        });
    }
    get leftSpace() {
        return Math.max(this.loopText.getBBox().width / 2 + CONFIG.TEXT_MARGIN, this.container.leftSpace) +
            CONFIG.SHAPE_MARGIN +
            CONFIG.LINE_WIDTH / 2;
    }
    get rightSpace() {
        return Math.max(this.loopText.getBBox().width / 2 + CONFIG.TEXT_MARGIN, this.container.rightSpace) +
            CONFIG.SHAPE_MARGIN +
            CONFIG.LINE_WIDTH / 2;
    }
    /**
     * Generates the points for the loop box shape.
     * @private
     */
    getLoopBoxPoints() {
        const height = this.loopText.getBBox().height + 2 * CONFIG.TEXT_MARGIN;
        const width = this.loopText.getBBox().width + 2 * CONFIG.TEXT_MARGIN;
        return [
            `0,0`,
            `${width},0`,
            `${width},${height}`,
            `${width / 2},${height + CONFIG.TEXT_MARGIN}`,
            `0,${height}`,
            `0,0`
        ].join(" ");
    }
    /**
     * Generates the points for the skip line.
     * This is used to visually connect the loop box to the code container.
     * @returns {string} - The points for the skip line in SVG format.
     * @private
     */
    getSkipLinePoints() {
        const heightLoopBox = this.loopBox.getBBox().height;
        const widthLoopBox = this.loopBox.getBBox().width;
        const contentHeight = this.container.height;
        const contentWidth = this.width - (2 * CONFIG.SHAPE_MARGIN);
        const maxLeftSize = Math.max(widthLoopBox / 2, this.leftSpace);
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
    getRestartLinePoints() {
        const heightLoopBox = this.loopBox.getBBox().height;
        const widthLoopBox = this.loopBox.getBBox().width;
        const contentHeight = this.container.height;
        const contentWidth = this.container.width;
        const maxRightSize = Math.max(widthLoopBox / 2, this.rightSpace);
        const maxLeftSize = Math.max(widthLoopBox / 2, this.leftSpace);
        const maxWidth = Math.max(widthLoopBox, this.width);
        return [
            `${maxLeftSize},${heightLoopBox / 2 + contentHeight + 1.5 * CONFIG.SHAPE_MARGIN}`,
            `${maxWidth - CONFIG.LINE_WIDTH},${heightLoopBox / 2 + contentHeight + 1.5 * CONFIG.SHAPE_MARGIN}`,
            `${maxWidth - CONFIG.LINE_WIDTH},${heightLoopBox / 2}`,
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
        return this.loopText.getBBox().height +
            3 * CONFIG.TEXT_MARGIN +
            3 * CONFIG.SHAPE_MARGIN +
            CONFIG.LINE_WIDTH +
            this.container.height;
    }
    set text(s) {
        this.loopText.textContent = s;
        requestAnimationFrame(this.innerUpdate.bind(this));
    }
}
class WhileLoopCode extends GeneralLoopCode {
    constructor(parent, index, text, main) {
        super(parent, index, CodeType.WHILE, text, main);
        this.MAINBOX_COLOUR = CONFIG.WHILE_SHAPE_COLOUR;
    }
}
class ForLoopCode extends GeneralLoopCode {
    constructor(parent, index, text, main) {
        super(parent, index, CodeType.FOR, text, main);
        this.MAINBOX_COLOUR = CONFIG.FOR_SHAPE_COLOUR;
    }
}
/*
class DoWhileLoop extends Code {
    private loopBox: SVGSVGElement = document.createElementNS(SVG_NS, "svg");
    private loopBoxShape: SVGPolylineElement = document.createElementNS(SVG_NS, "polyline");
    private loopText: SVGTextElement = document.createElementNS(SVG_NS, "text");
    private doBox: SVGSVGElement = document.createElementNS(SVG_NS, "svg");
    private doBoxShape: SVGPolylineElement = document.createElementNS(SVG_NS, "polyline");
    private doText: SVGTextElement = document.createElementNS(SVG_NS, "text");
    private skipLoopLine: SVGPolylineElement = document.createElementNS(SVG_NS, "polyline");
    private restartLoopLine: SVGPolylineElement = document.createElementNS(SVG_NS, "polyline");
    public container: CodeContainer;
    protected constructor(parent: CodeContainer, index: number, text: string, protected main: Main) {
        super(parent, index);
        this.container = new CodeContainer(this._innerElement, this, this.main);
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
        this.loopBoxShape.setAttribute("stroke", CONFIG.LINE_COLOUR);
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
}
*/
class IfStatementCode extends Code {
    constructor(parent, index, text, main) {
        super(parent, index);
        this.ifBox = document.createElementNS(SVG_NS, "svg");
        this.ifBoxShape = document.createElementNS(SVG_NS, "polyline");
        this.textBox = document.createElementNS(SVG_NS, "text");
        this.trueLine1 = document.createElementNS(SVG_NS, "polyline");
        this.trueLine2 = document.createElementNS(SVG_NS, "polyline");
        this.falseLine1 = document.createElementNS(SVG_NS, "polyline");
        this.falseLine2 = document.createElementNS(SVG_NS, "polyline");
        this.trueContent = new CodeContainer(this._innerElement, this, main);
        this.falseContent = new CodeContainer(this._innerElement, this, main);
        this.ifBox.appendChild(this.ifBoxShape);
        this.ifBox.appendChild(this.textBox);
        this._innerElement.appendChild(this.ifBox);
        this.textBox.setAttribute("x", `${CONFIG.TEXT_MARGIN}`);
        this.textBox.setAttribute("y", `${CONFIG.TEXT_MARGIN}`);
        this.textBox.setAttribute("text-anchor", "start");
        this.textBox.setAttribute("dominant-baseline", "hanging");
        this.textBox.textContent = text;
        this.ifBoxShape.setAttribute("fill", CONFIG.IF_SHAPE_COLOUR);
        this.ifBoxShape.setAttribute("stroke", CONFIG.LINE_COLOUR);
        this.ifBoxShape.setAttribute("stroke-width", `${CONFIG.LINE_WIDTH}`);
        this.ifBox.ondblclick = this.ifBox.oncontextmenu = this.menuFunction.bind(this);
        this._outerElement.ondblclick = this._outerElement.oncontextmenu = (e) => {
        };
        [this.trueLine1, this.trueLine2, this.falseLine1, this.falseLine2].forEach(line => {
            this._innerElement.appendChild(line);
            line.setAttribute("fill", "none");
            line.setAttribute("stroke", CONFIG.LINE_COLOUR);
            line.setAttribute("stroke-width", `${CONFIG.LINE_WIDTH}`);
        });
        requestAnimationFrame(this.update.bind(this));
    }
    innerUpdate() {
        this.ifBoxShape.setAttribute("points", this.getIfBoxPoints());
        this.textBox.setAttribute("x", `${CONFIG.TEXT_MARGIN}`);
        this.textBox.setAttribute("y", `${CONFIG.TEXT_MARGIN}`);
        this.ifBox.setAttribute("x", `${this.leftSpace - ((this.textBox.getBBox().width + 2 * CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH) / 2)}`);
        this.arrangeContainers();
    }
    getTrueLine1Points(heightIfBox, widthIfBox, widthTrue, heightTrue, widthFalse, heightFalse, yContent, xTrue, xFalse) {
        return [
            `${this.leftSpace - widthIfBox / 2},${heightIfBox / 2}`,
            `${xTrue},${heightIfBox / 2}`,
            `${xTrue},${yContent}`
        ].join(" ");
    }
    getTrueLine2Points(heightIfBox, widthIfBox, widthTrue, heightTrue, widthFalse, heightFalse, yContent, xTrue, xFalse) {
        const maxLowY = Math.max(heightTrue, heightFalse) + yContent;
        return [
            `${xTrue},${yContent + heightTrue}`,
            `${xTrue},${maxLowY + CONFIG.SHAPE_MARGIN}`,
            `${this.width / 2},${maxLowY + CONFIG.SHAPE_MARGIN}`
        ].join(" ");
    }
    getFalseLine1Points(heightIfBox, widthIfBox, widthTrue, heightTrue, widthFalse, heightFalse, yContent, xTrue, xFalse) {
        return [
            `${this.leftSpace + widthIfBox / 2},${heightIfBox / 2}`,
            `${xFalse},${heightIfBox / 2}`,
            `${xFalse},${yContent}`
        ].join(" ");
    }
    getFalseLine2Points(heightIfBox, widthIfBox, widthTrue, heightTrue, widthFalse, heightFalse, yContent, xTrue, xFalse) {
        const maxLowY = Math.max(heightTrue, heightFalse) + yContent;
        return [
            `${xFalse},${yContent + heightFalse}`,
            `${xFalse},${maxLowY + CONFIG.SHAPE_MARGIN}`,
            `${this.width / 2},${maxLowY + CONFIG.SHAPE_MARGIN}`
        ].join(" ");
    }
    /**
     * Arranges the True and False containers and their corresponding connecting lines to their right position in the if statement.
     * @private
     */
    arrangeContainers() {
        const heightIfBox = this.textBox.getBBox().height + 2 * CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH, widthIfBox = this.textBox.getBBox().width + 2 * CONFIG.TEXT_MARGIN + 2 * CONFIG.LINE_WIDTH, widthTrue = this.trueContent.width, widthFalse = this.falseContent.width, heightTrue = this.trueContent.height, heightFalse = this.falseContent.height, yContent = heightIfBox + CONFIG.SHAPE_MARGIN, xTrue = this.trueContent.leftSpace, xFalse = xTrue + Math.max(this.trueContent.rightSpace, widthIfBox / 2) + 4 * CONFIG.SHAPE_MARGIN +
            Math.max(widthIfBox / 2, this.falseContent.leftSpace);
        this.trueContent.setTopMid(c(xTrue, yContent));
        this.falseContent.setTopMid(c(xFalse, yContent));
        this.falseLine1.setAttribute("points", this.getFalseLine1Points(heightIfBox, widthIfBox, widthTrue, heightTrue, widthFalse, heightFalse, yContent, xTrue, xFalse));
        this.falseLine2.setAttribute("points", this.getFalseLine2Points(heightIfBox, widthIfBox, widthTrue, heightTrue, widthFalse, heightFalse, yContent, xTrue, xFalse));
        this.trueLine1.setAttribute("points", this.getTrueLine1Points(heightIfBox, widthIfBox, widthTrue, heightTrue, widthFalse, heightFalse, yContent, xTrue, xFalse));
        this.trueLine2.setAttribute("points", this.getTrueLine2Points(heightIfBox, widthIfBox, widthTrue, heightTrue, widthFalse, heightFalse, yContent, xTrue, xFalse));
    }
    get width() {
        //TODO:
        // - implement?
        return this.leftSpace + this.rightSpace;
    }
    get rightSpace() {
        const minHalfSize = (this.textBox.getBBox().width + 4 * CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH + CONFIG.SHAPE_MARGIN) / 2;
        if (this.falseContent.leftSpace + CONFIG.SHAPE_MARGIN < minHalfSize) {
            return minHalfSize + this.falseContent.rightSpace + CONFIG.SHAPE_MARGIN;
        }
        return this.falseContent.width;
    }
    get leftSpace() {
        const minHalfSize = (this.textBox.getBBox().width + 4 * CONFIG.TEXT_MARGIN + CONFIG.LINE_WIDTH + CONFIG.SHAPE_MARGIN) / 2;
        if (this.trueContent.rightSpace + CONFIG.SHAPE_MARGIN < minHalfSize) {
            return minHalfSize + this.trueContent.leftSpace + CONFIG.SHAPE_MARGIN;
        }
        return this.trueContent.width;
    }
    get export() {
        return {
            type: CodeType.IF,
            content: Object.assign(Object.assign({}, emptyContent()), { "True": this.trueContent.export, "False": this.falseContent.export }),
            text: this.textBox.textContent ? this.textBox.textContent : ""
        };
    }
    get text() {
        return this.textBox.textContent ? this.textBox.textContent : "";
    }
    getIfBoxPoints() {
        const height = this.textBox.getBBox().height + 2 * CONFIG.TEXT_MARGIN;
        const width = this.textBox.getBBox().width + 2 * CONFIG.TEXT_MARGIN;
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
}
/**
 * Beginning node of the flowchart.
 * should only occur once per flowchart
 */
class StartNode {
    constructor(parent) {
        this._element = document.createElementNS(SVG_NS, "svg");
        this._textElement = document.createElementNS(SVG_NS, "text");
        this._ellipseElement = document.createElementNS(SVG_NS, "ellipse");
        this.line = document.createElementNS(SVG_NS, "line");
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
    }
    updateTopMid(coords) {
        this._element.setAttribute("x", `${coords.x - this._element.getBBox().width / 2}`);
        this._element.setAttribute("y", `${coords.y}`);
    }
}
/**
 * Ending node of the flowchart.
 * should only occur once per flowchart
 */
class EndNode {
    constructor(parent) {
        this._element = document.createElementNS(SVG_NS, "svg");
        this._textElement = document.createElementNS(SVG_NS, "text");
        this._ellipseElement = document.createElementNS(SVG_NS, "ellipse");
        this.line = document.createElementNS(SVG_NS, "line");
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
        this.startNode = new StartNode(this.SVG);
        this.container = new CodeContainer(this.SVG, this, this);
        this.endNode = new EndNode(this.SVG);
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
    get programTitle() {
        return "Main Program";
    }
    get export() {
        return {
            type: CodeType.MAIN,
            content: {
                "MainCode": this.container.export
            },
            text: this.programTitle
        };
    }
}
let main;
function init() {
    main = new Main(document.body);
    // const looped = new StatementCode(while1.codeContainer, 0, "This is a statement inside a loop");
    // const looped2 = new StatementCode(while1.codeContainer, 1, "This is another  hhhhhhhhhhhhh    statement inside a loop");
    const while1 = new WhileLoopCode(main.container, 0, "This is another statement", main);
    const while2 = new WhileLoopCode(while1.container, 0, "while", main);
    const if1 = new IfStatementCode(while1.container, 0, "zomaar wat, maar dan wat langer. Waarom ziet dit er zo raar uit? bla bla bla bla", main);
    // const statement1 = new StatementCode(if1.trueContent, 0, "TrueTrue");
    // const statement2 = new StatementCode(if1.falseContent, 0, "FalseFalseFalsebhjfbrghtfyfhjgdvjkhjjhkgfhhgbjtbhdxhcfvgnjg");
    requestAnimationFrame(() => {
    });
}
function exportAll() {
    return JSON.stringify(main.export);
}
