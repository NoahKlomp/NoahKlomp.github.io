abstract class Shape {
    public static readonly TEXT_MARGIN = 10;
    public static readonly NODE_MARGIN = 20;
    private shown:boolean=false;
    constructor(private connectedIDVal:number|string, private view:SVGElement|null = null) {
        
    }
    abstract set cx(newCX:number);
    abstract get cx():number;
    abstract set cy(newCY:number);
    abstract get cy():number;
    abstract get height():number;
    abstract get width():number;
    abstract set colour(newColour:string);
    get lowY():number {
        return this.cy + this.height / 2;
    }
    get highY():number {
        return this.cy - this.height / 2;
    }
    get rightX():number {
        return this.cx + this.width / 2;
    }
    get leftX():number {
        return this.cx - this.width / 2;
    }
    get connectedID():number|string {
        return this.connectedIDVal;
    }
    abstract set text(text:string);
    abstract get text():string;
    protected showNodes(...node:Node[]) {
        if (this.view && !this.shown){
            node.forEach(n =>this.view?.appendChild(n));
            this.shown = true;
        }
    }
    abstract show():void;
}

class Rectangle extends Shape {
    private shapeElement:SVGRectElement;
    private textElement:SVGTextElement;
    constructor(
            id:number|string, 
            view: SVGElement, 
            text:string, 
            private centerX:number = 0,
            private centerY:number = 0
    ) {
        super(id, view);
        this.shapeElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        this.textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
        this.shapeElement.setAttribute("id",`shape_${this.connectedID}`);
        this.textElement.setAttribute("id",`text_${this.connectedID}`);
        this.textElement.setAttribute("text-anchor", "middle");
        this.textElement.setAttribute("dominant-baseline", "middle");
        this.textElement.textContent = text;
    }
    private updateSize() {
        this.shapeElement.setAttribute("width",`${this.width}`);
        this.shapeElement.setAttribute("height",`${this.height}`);
        this.shapeElement.setAttribute("x", `${this.centerX - this.width / 2}`);
        this.shapeElement.setAttribute("y", `${this.centerY - this.height / 2}`);
        this.textElement.setAttribute("x", `${this.centerX}`);
        this.textElement.setAttribute("y", `${this.centerY}`);
        this.shapeElement.setAttribute("ry", Shape.TEXT_MARGIN / 2 + "px");
        this.shapeElement.setAttribute("rx", Shape.TEXT_MARGIN / 2 + "px");
    }
    show() {
        this.showNodes(this.shapeElement,this.textElement);
        this.updateSize();
    }
    set cx(newCX: number) {
        this.centerX = newCX;
        this.updateSize();
    }
    get cx(): number {
        return this.centerX;
    }
    set cy(newCY: number) {
        this.centerY = newCY;
        this.updateSize();
    }
    get cy(): number {
        return this.centerY;
    }
    get height(): number {
        return this.textElement.getBBox().height + 2 * Shape.TEXT_MARGIN;
    }
    get width(): number {
        return this.textElement.getBBox().width + 2 * Shape.TEXT_MARGIN;
    }
    set colour(newColour:string) {
        this.shapeElement.setAttribute("fill", newColour);
    }
    set text(text:string) {
        this.textElement.textContent = text;
        this.updateSize();
    }
    get text() {
        return this.textElement.textContent || "";
    }
    
}
class Elipse extends Shape {
    private ellipseElement: SVGEllipseElement;
    private textElement: SVGTextElement;
    constructor(
        id: number,
        view: SVGElement,
        text: string,
        private centerX: number = 0,
        private centerY: number = 0
    ) {
        super(id, view);
        this.centerX = centerX;
        this.centerY = centerY;
        this.ellipseElement = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        this.textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
        this.textElement.setAttribute("text-anchor", "middle");
        this.textElement.setAttribute("dominant-baseline", "middle");
        this.textElement.textContent = text;
    }

    private updateSize() {
        const rx = this.width / 2;
        const ry = this.height / 2;
        this.ellipseElement.setAttribute("cx", `${this.centerX}`);
        this.ellipseElement.setAttribute("cy", `${this.centerY}`);
        this.ellipseElement.setAttribute("rx", `${rx}`);
        this.ellipseElement.setAttribute("ry", `${ry}`);
        this.textElement.setAttribute("x", `${this.centerX}`);
        this.textElement.setAttribute("y", `${this.centerY}`);
    }
    show() {
        this.showNodes(this.ellipseElement,this.textElement);
        this.updateSize();
    }
    set cx(newCX: number) {
        this.centerX = newCX;
        this.updateSize();
    }
    get cx(): number {
        return this.centerX;
    }
    set cy(newCY: number) {
        this.centerY = newCY;
        this.updateSize();
    }
    get cy(): number {
        return this.centerY;
    }
    get height(): number {
        return this.textElement.getBBox().height + 2 * Shape.TEXT_MARGIN;
    }
    get width(): number {
        return this.textElement.getBBox().width + 2 * Shape.TEXT_MARGIN;
    }
    set colour(newColour: string) {
        this.ellipseElement.setAttribute("fill", newColour);
    }
    set text(text: string) {
        this.textElement.textContent = text;
        this.updateSize();
    }
    get text() {
        return this.textElement.textContent || "";
    }
}

class Line extends Shape {
    static readonly LINE_WIDTH = 2;
    private lineElement: SVGLineElement;
    private _x1: number;
    private _y1: number;
    private _x2: number;
    private _y2: number;
    private _colour: string = "#000";
    constructor(
        id: number|string,
        view: SVGElement,
        x1: number,
        y1: number,
        x2: number,
        y2: number
    ) {
        super(id, view);
        this._x1 = x1;
        this._y1 = y1;
        this._x2 = x2;
        this._y2 = y2;
        this.lineElement = document.createElementNS("http://www.w3.org/2000/svg", "line");
        this.lineElement.setAttribute("id", `line_${this.connectedID}`);
        this.updateLine();
    }

    private updateLine() {
        this.lineElement.setAttribute("x1", `${this._x1}`);
        this.lineElement.setAttribute("y1", `${this._y1}`);
        this.lineElement.setAttribute("x2", `${this._x2}`);
        this.lineElement.setAttribute("y2", `${this._y2}`);
        this.lineElement.setAttribute("stroke", this._colour);
        this.lineElement.setAttribute("stroke-width", Line.LINE_WIDTH + "");
    }

    show(): void {
        this.showNodes(this.lineElement);
        this.updateLine();
    }

    // cx/cy are the center of the line
    set cx(newCX: number) {
        const dx = newCX - this.cx;
        this._x1 += dx;
        this._x2 += dx;
        this.updateLine();
    }
    get cx(): number {
        return (this._x1 + this._x2) / 2;
    }
    set cy(newCY: number) {
        const dy = newCY - this.cy;
        this._y1 += dy;
        this._y2 += dy;
        this.updateLine();
    }
    get cy(): number {
        return (this._y1 + this._y2) / 2;
    }
    get height(): number {
        return Math.abs(this._y2 - this._y1);
    }
    get width(): number {
        return Math.abs(this._x2 - this._x1);
    }
    set colour(newColour: string) {
        this._colour = newColour;
        this.lineElement.setAttribute("stroke", newColour);
    }
    set text(text: string) {
        // Lines do not have text, so this is a no-op.
    }
    get text() {return ""}
    set x1(val:number) {
        this._x1 = val;
        this.updateLine();
    }
    set y1(val:number) {
        this._y1 = val;
        this.updateLine();
    }
    set x2(val:number) {
        this._x2 = val;
        this.updateLine();
    }
    set y2(val:number) {
        this._y2 = val;
        this.updateLine();
    }
}

class LoopBox extends Shape {
    private shapeElement:SVGPathElement;
    private textElement:SVGTextElement;
    constructor(
        id:number|string,
        view:SVGElement,
        text:string,
        private _cx:number,
        private _cy:number
    ) {
        super(id, view);
        this.shapeElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
        this.textElement.setAttribute("text-anchor", "middle");
        this.textElement.setAttribute("dominant-baseline", "middle");
        this.textElement.textContent = text;
    }
    show() {
        this.showNodes(this.shapeElement, this.textElement);
        this.updateLoopbox();
    }

    updateLoopbox() {
        this.shapeElement.setAttribute("d", this.generatePathD());
        this.textElement.setAttribute("x",this.cx+"");
        this.textElement.setAttribute("y",this.cy+"");

    }
    private generatePathD():string {
        return `M${this.cx-this.width/2},${  this.cy - this.height/2}
                H${this.cx + this.width/2}
                V${this.cy + this.height/2}
                L${this.cx},${this.cy+this.height}
                L${this.cx-this.width/2},${this.cy + this.height/2}
                Z`
    }

    set cx(newCX: number) {
        this._cx = newCX;
        this.show();
    }
    get cx(): number {
        return this._cx;
    }
    set cy(newCY: number) {
        this._cy = newCY;
        this.show();
    }
    get cy(): number {
        return this._cy;
    }
    get height(): number {
        return this.textElement.getBBox().height + 2 * Shape.TEXT_MARGIN;
    }
    get width(): number {
        return this.textElement.getBBox().width + 2 * Shape.TEXT_MARGIN;
    }
    set colour(newColour: string) {
        this.shapeElement.setAttribute("fill", newColour );
    }
    set text(text: string) {
        this.textElement.textContent = text;
        this.show();
    }
    get text() {
        return this.textElement.textContent || "";
    }
    get lowY() {
        return this.cy + this.height;
    }
}
class EmptyShape extends Shape {
    constructor(
        private _cx:number,
        private _cy:number,
        id:number|string,
        
    ) {
        super(id)
    }
    set cx(newCX: number) {
        this._cx = newCX
    }
    get cx(): number {
        return this._cx
    }
    set cy(newCY: number) {
        this._cy = newCY;
    }
    get cy(): number {
        return this._cy;
    }
    get height(): number {
        return 0;
    }
    get width(): number {
        return 0;
    }
    set colour(newColour: string) {
        
    }
    set text(text: string) {
        
    }
    get text(): string {
        return "";
    }
    show(): void {
    }
    
}




export {Elipse, Rectangle, Shape, Line, LoopBox};