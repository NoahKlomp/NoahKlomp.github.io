import {Elipse, Rectangle, Shape, Line, LoopBox} from "./Shapes.js";

let svg: SVGElement;
const queried = document.querySelector("#flowchart");
if (queried instanceof SVGElement) {
    svg = queried;
} else {
    svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("id", "flowchart");
    document.body.appendChild(svg);
}

interface PlainNode {
    get type():String;
    get id():number;
    updatePos():void;
    getExport():Object;
    get highY():number;
    get lowY():number;
    get cx():number;
    get cy():number;
    get width():number;
    get height():number;
    show():void;
}
interface TextNode extends PlainNode {
    set text(newText:string);
    get text():string;
}

let nextID = 0;

interface CanHaveNextNode extends PlainNode {
    get next():PlainNode|null;
    set next(newNode:CanHavePreviousNode|null);
}
interface CanHavePreviousNode extends PlainNode {
    get previous():PlainNode|null;
    set previous(newNode:CanHaveNextNode|null);
}
interface CanHaveContentNode extends PlainNode {
    get content():PlainNode|null;
    set content(newNode:CanHaveNextNode|null);
}
abstract class CodeNode implements CanHaveNextNode, CanHavePreviousNode{
    private idVal:number;
    protected line:Line;
    constructor(
        private typeVal:String,
        private nextVal:CanHavePreviousNode|null,
        private previousVal:CanHaveNextNode|null
    ){
        this.idVal = nextID++;
        this.line = new Line(this.id, svg, 0, 0, 0, 0);
    }
    get id(): number {
        return this.idVal;
    }
    abstract updatePos(): void;
    abstract getExport():Object;
    putBefore(newNode:CodeNode) {
        if (newNode){
            if (newNode.next === null && newNode.previous === null){
                newNode.previous = this.previous;
                newNode.next = this;
                this.previous = newNode;
            }
        }
    }
    set next(newNode:CanHavePreviousNode|null) {
        if (newNode){
            this.nextVal = newNode;
        }
    }
    get next():CanHavePreviousNode|null {
        return this.nextVal;
    }
    putAfter(newNode:CodeNode) {
        if (newNode){
            if (newNode.next === null && newNode.previous === null){
                newNode.previous = this;
                newNode.next = this.next;
                if (this.next)
                    this.next.previous = newNode;
                this.next= newNode;
            } else {
                throw new Error("already placed node");
            }
        }
        updateView();
        newNode.show();
    }
    set previous(newNode:CanHaveNextNode|null) {
        if (newNode){
            this.previousVal = newNode;
        }
    }
    get previous():CanHaveNextNode|null {
        return this.previousVal;
    }

    get type():String {
        return this.typeVal;
    }
    get lowY() {
        return this.cy + this.height / 2;
    }
    get highY() {
        return this.cy - this.height / 2;
    }
    abstract get cx():number;
    abstract get cy():number;
    abstract get height():number;
    abstract get width():number;
    abstract show():void;
}

class StartCodeNode implements CanHaveNextNode {
    private static exists:boolean = false;
    private nextVal:CanHavePreviousNode|null;
    private idVal:number;
    protected shape:Shape;
    private readonly typeVal:string = "START";
    constructor(next:CanHavePreviousNode|null) {
        if (!StartCodeNode.exists ){
            StartCodeNode.exists = true;
            if (next){
                next.previous = this;
                next.show();
            }
            this.nextVal = next;
            this.idVal = nextID++;
            this.shape = new Elipse(this.id, svg, "START", 50, 10 );
            this.shape.colour="green";
        } else {
            throw new Error("Too many start nodes.")
        }

    }
    get id(): number {
        return this.idVal;
    }
    get next(): CanHavePreviousNode | null {
        return this.nextVal;
    }

    set next(newNode: CanHavePreviousNode | null) {
        this.nextVal = newNode;
        if (newNode) {
            newNode.previous = this;
        }
    }

    get type(): String {
        return this.typeVal;
    }

    updatePos() {
        this.shape.cx = this.next? this.width/2: this.cx;
        this.shape.cy = this.height/2;
        if (this.next)
            this.next.updatePos();
    }

    getExport() {
        // Return a plain object representation if needed
        return {
            type: this.type,
            next: this.nextVal ? this.nextVal.getExport() : null,
            id:this.id
        };
    }
    putAfter(newNode:CodeNode) {
        if (newNode){
            if (newNode.next === null && newNode.previous === null){
                newNode.previous = this;
                newNode.next = this.next;
                if (this.next)
                    this.next.previous = newNode;
                this.next= newNode;
            } else {
                throw new Error("already placed node");
            }
        }
        updateView();
        newNode.show();
    }
    
    show() {
        this.shape.show();
    }
    get lowY() {
        return this.shape.lowY;
    }
    get highY() {
        return this.shape.highY;
    }

    get cx() {
        return this.shape.cx;
    }
    get cy() {
        return this.shape.cy;
    }
    get width():number {
        return this.next? Math.max(this.next.width, this.shape.width) : this.shape.width;
    }
    get height():number {
        return this.shape.height;
    }
}
class EndCodeNode implements CanHavePreviousNode {
    private readonly typeVal:string = "END";
    private static exists:boolean = false;
    private previousVal:CanHaveNextNode|null =null;
    private idVal:number;
    private shape:Shape;
    private line:Line;
    constructor(previous:CanHaveNextNode|null) {
        if (!EndCodeNode.exists){
            EndCodeNode.exists = true;
            if (previous)
                previous.next = this;
            this.previous= previous;
            this.idVal = nextID++;
            this.shape = new Elipse(this.id, svg, "END", 50, 50 );
            this.shape.colour = "red";
            this.line = new Line(this.id, svg, 0, 0, 0, 0);
        } else {
            throw new Error("Too many end nodes.")
        }
    }
    get id(): number {
        return this.idVal;
    }
    get lowY() {
        return this.shape.lowY;
    }
    get highY() {
        return this.shape.highY;
    }
    get cx(): number {
        return this.shape.cx;
    }
    get cy(): number {
        return this.shape.cy;
    }
    get width(): number {
        return this.shape.width;
    }
    get height(): number {
        return this.shape.height;
    }
    get type(): String {
        return this.typeVal;
    }
    show() {
        this.shape.show();
        this.line.show();
    }
    
    updatePos() {
        // Example: position below previous node if exists
        if (this.previous) {
            this.shape.cx = this.previous.cx;
            this.shape.cy = this.previous.lowY + Shape.NODE_MARGIN + this.height / 2;
            this.line.x1 = this.cx;
            this.line.y1 = this.cy - this.height/2 - Shape.NODE_MARGIN;
            this.line.x2 = this.cx;
            this.line.y2 = this.cy - this.height/2;
        }

    }

    getExport() {
        // Return a plain object representation if needed
        return {
            type: this.type,
            id:this.id
        };
    }
    get previous():CanHaveNextNode|null {
        return this.previousVal;
    }
    set previous(previous:CanHaveNextNode|null) {
        this.previousVal = previous;
    }
}

class StatementNode extends CodeNode implements TextNode{
    private shape: Shape;
    constructor(text: string = "statement") {
        super("StatementNode", null, null);
        this.shape = new Rectangle(this.id, svg, text, 80, 30);
        this.shape.colour = "lightgreen";
    }

    getExport(): Object {
        return {
            type: this.type,
            id: this.id,
            text: this.text,
            next: this.next ? this.next.getExport() : null
            // previous: this.previous ? this.previous.getExport() : null
        };
    }
    show() {
        this.shape.show();
        this.line.show();
        this.updatePos();
    }

    get cx(): number {
        return this.shape.cx;
    }

    get cy(): number {
        return this.shape.cy;
    }

    get height(): number {
        return this.shape.height;
    }

    get width(): number {// recursive
        return this.next? Math.max(this.next.width, this.shape.width) : this.shape.width;
    }

    updatePos(): void {
        // Example: position below previous node if exists
        if (this.previous) {
            this.shape.cx = this.previous.cx;
            this.shape.cy = this.previous.lowY + Shape.NODE_MARGIN + this.height / 2;
            this.line.x1 = this.cx;
            this.line.y1 = this.cy - this.height/2 - Shape.NODE_MARGIN;
            this.line.x2 = this.cx;
            this.line.y2 = this.cy - this.height/2;
        }
        if (this.next) {
            this.next.updatePos();
        }
    }
    get text():string {
        return this.shape.text;
    }
    set text(newText:string) {
        this.shape.text = newText;
        this.updatePos();
    }
}

abstract class LoopNode extends CodeNode  implements TextNode {
    protected shape: Shape;
    protected content:HiddenStartNode;
    constructor(text: string = "Loop", type:string) {
        super(type, null, null);
        this.shape = new LoopBox(this.id, svg, text, 80, 30);
        this.shape.colour = "lightpink";
        this.content = new HiddenStartNode(this,Placement.CENTER);
    }
    

    getExport(): Object {
        return {
            type: this.type,
            id: this.id,
            text: this.text,
            next: this.next ? this.next.getExport() : null
            // previous: this.previous ? this.previous.getExport() : null
        };
    }
    show() {
        this.shape.show();
        this.line.show();
    }

    get cx(): number {
        return this.shape.cx;
    }

    get cy(): number {
        return this.shape.cy;
    }

    get height(): number {
        return this.shape.height;
    }

    get width(): number {// recursive
        return this.next? Math.max(this.next.width, this.innerWidth) : this.innerWidth;
    }
    get innerWidth():number {
        return Math.max( this.content.width, this.shape.width );
    }

    updatePos(): void {
        // Example: position below previous node if exists
        if (this.previous) {
            this.shape.cx = this.previous.cx;
            this.shape.cy = this.previous.lowY + Shape.NODE_MARGIN + this.height / 2;
            this.line.x1 = this.cx;
            this.line.y1 = this.cy - this.height/2 - Shape.NODE_MARGIN;
            this.line.x2 = this.cx;
            this.line.y2 = this.cy - this.height/2;
        }
        if (this.next) {
            this.next.updatePos();
        }
    }
    get text():string {
        return this.shape.text;
    }
    set text(newText:string) {
        this.shape.text = newText;
    }
    get lowY():number {
        return this.shape.lowY;
    }
}
class ForLoopNode extends LoopNode {
    constructor(text:string = "For Loop") {
        super(text, "ForLoop");
    }
}

enum Placement {
    LEFT, CENTER, RIGHT
}
class HiddenStartNode implements CanHaveNextNode {
    private nextVal: CanHavePreviousNode | null = null;
    private readonly typeVal: String = "HiddenStart";
    private readonly idVal: number = nextID++;
    private _cx:number = 0;
    private _cy:number = 0;

    constructor(private parent:LoopNode, private placement:Placement, next?: CanHavePreviousNode | null) {
        if (next) this.next = next;
        this.updatePos();
    }

    get next(): CanHavePreviousNode | null {
        return this.nextVal;
    }
    set next(newNode: CanHavePreviousNode | null) {
        this.nextVal = newNode;
        if (newNode) {
            newNode.previous = this;
        }
    }
    get type(): String {
        return this.typeVal;
    }
    get id(): number {
        return this.idVal;
    }
    updatePos(): void {
        switch (this.placement){
            case Placement.LEFT:
                this._cx = this.parent.cx - this.width/2 - Shape.NODE_MARGIN;
                this._cy = this.parent.lowY + 2 * Shape.NODE_MARGIN;
            case Placement.CENTER:
                this._cx = this.parent.cx;
                this._cy = this.parent.lowY + Shape.NODE_MARGIN;
            case Placement.RIGHT:
                this._cx = this.parent.cx + this.width/2 + Shape.NODE_MARGIN;
                this._cy = this.parent.lowY + 2 * Shape.NODE_MARGIN;
        }

        if (this.next) this.next.updatePos();
    }
    getExport(): Object {
        return {
            type: this.type,
            id: this.id,
            next: this.next ? this.next.getExport() : null
        };
    }
    get cx(): number { return this._cx; }
    get cy(): number { return this._cy; }
    show(): void { /* nothing to show */ }
    get lowY(): number { return this.cy; }
    get highY(): number { return this.cy; }
    get width(): number { return this.next? this.next.width : 0; }
    get height(): number { return this.next? this.next.height : 0; }
}

class HiddenEndNode implements CanHavePreviousNode {
    private readonly typeVal:string = "END";
    private static exists:boolean = false;
    private previousVal:CanHaveNextNode|null =null;
    private idVal:number;
    private shape:Shape;
    private line:Line;
    constructor(previous:CanHaveNextNode|null) {
        if (previous)
            previous.next = this;
        this.previous= previous;
        this.idVal = nextID++;
        this.shape = new Elipse(this.id, svg, "END", 50, 50 );
        this.shape.colour = "red";
        this.line = new Line(this.id, svg, 0, 0, 0, 0);
    }
    get id(): number {
        return this.idVal;
    }
    get lowY() {
        return this.shape.lowY;
    }
    get highY() {
        return this.shape.highY;
    }
    get cx(): number {
        return this.shape.cx;
    }
    get cy(): number {
        return this.shape.cy;
    }
    get width(): number {
        return Math.max(this.shape.width);
    }
    get height(): number {
        return this.shape.height;
    }
    get type(): String {
        return this.typeVal;
    }
    show() {
        this.shape.show();
        this.line.show();
    }
    
    updatePos() {
        // Example: position below previous node if exists
        if (this.previous) {
            this.shape.cx = this.previous.cx;
            this.shape.cy = this.previous.lowY + Shape.NODE_MARGIN + this.height / 2;
            this.line.x1 = this.cx;
            this.line.y1 = this.cy - this.height/2 - Shape.NODE_MARGIN;
            this.line.x2 = this.cx;
            this.line.y2 = this.cy - this.height/2;
        }

    }

    getExport() {
        // Return a plain object representation if needed
        return {
            type: this.type,
            id:this.id
        };
    }
    get previous():CanHaveNextNode|null {
        return this.previousVal;
    }
    set previous(previous:CanHaveNextNode|null) {
        this.previousVal = previous;
    }
    
}

let START_NODE:StartCodeNode = new StartCodeNode(new EndCodeNode(null));
START_NODE.show();
if (START_NODE.next)
    START_NODE.next.previous = START_NODE;

function updateView() {
    START_NODE.updatePos();
    console.log(START_NODE.getExport());
}
let statement:StatementNode = new StatementNode("Statement 1");
let statement2:LoopNode = new ForLoopNode("Really long statementdhjkahfjkamx") ;
START_NODE.putAfter(statement);
statement.putAfter(statement2);
updateView();

