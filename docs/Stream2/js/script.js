
let newID = 1;
const svg = document.querySelector("#mysvg");
const TEXT_MARGIN = 10;
const ELEMENT_MARGIN = 20;


class Node {
    constructor(type, next) {
        this.id = newID++;
        this.type = type;
        this.next = next;
        
    }

    show() {
        console.log(`Node ID: ${this.id}, Type: ${this.type}, Next: ${this.next}`);
    }
    get height() {
        return this.next.height() + elementMargin; // Default size for all nodes
    }
    get width() {
        return this.next.width() + elementMargin; // Default width for all nodes
    }
    
    get x() {

    }

}

class Edge {
    constructor(from, to, arrow=false) {
        this.from = from;
        this.to = to;
        this.arrow = arrow;
    }

    show() {
        console.log(`Edge from ${this.from} to ${this.to}, Arrow: ${this.arrow}`);
    }
}

// function xOf(node) {
//     return node.getBBox().x;
// }
// function yOf(node) {
//     return node.getBBox().y;
// }
let startExists = false;
class StartNode {
    constructor(child) {
        if (!startExists){
            this.xVal = 100;
            this.yVal = 20;
            this.id = newID++;
            startExists = true;
            this.child = child;

            this.circleElement = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
            this.circleElement.setAttribute("cx", this.x );
            this.circleElement.setAttribute("cy", this.y);
            this.circleElement.setAttribute("rx", 40);
            this.circleElement.setAttribute("ry", 20);

            
            this.circleElement.setAttribute("fill", "blue");
            this.textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
            this.textElement.setAttribute("fill", "black");
            this.textElement.textContent = "START";
            this.textElement.setAttribute("text-anchor", "middle");
            this.textElement.setAttribute("dominant-baseline", "middle");
            this.textElement.setAttribute("x", this.x);
            this.textElement.setAttribute("y", this.y);
            svg.appendChild(this.circleElement);
            svg.appendChild(this.textElement);
        } else {
            alert("start already exists");
            delete this;
        }
    }

    #updatePos() {
        this.element.setAttribute("cx", this.x );
        this.element.setAttribute("cy", this.y );

        // Center the text
        this.textElement.setAttribute("x", this.x);
        this.textElement.setAttribute("y", this.y);
        this.textElement.setAttribute("text-anchor", "middle");
        this.textElement.setAttribute("dominant-baseline", "middle");
    }
    get x() {
        return this.xVal;
    }
    get y() {
        return this.yVal;
    }
    get height() {
        return 40;
    }
    get lowY() {
        return this.y + this.height / 2
    }
    syncXParent() {
        this.x = Math.max(this.x, this.child.x);
    }
    syncX() {
        this.xVal = Math.max(this.xVal, this.child.x);
        this.child.syncX();
    }

}
let endExists = false;
class EndNode {
    constructor(parent) {
        if (!endExists){
            this.parent = parent;
            this.x = this.parent.x;
            this.y = this.parent.lowY + this.parent.height / 2 + ELEMENT_MARGIN;
            this.id = newID++;
            endExists = true;

            this.circleElement = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
            this.circleElement.setAttribute("cx", this.x );
            this.circleElement.setAttribute("cy", this.parent.lowY + 20 + ELEMENT_MARGIN);
            this.circleElement.setAttribute("rx", 40);
            this.circleElement.setAttribute("ry", 20);

            
            this.circleElement.setAttribute("fill", "blue");
            this.textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
            this.textElement.setAttribute("fill", "black");
            this.textElement.textContent = "END";
            this.textElement.setAttribute("text-anchor", "middle");
            this.textElement.setAttribute("dominant-baseline", "middle");
            this.textElement.setAttribute("x", this.x);
            this.textElement.setAttribute("y", this.y);


            svg.appendChild(this.circleElement);
            svg.appendChild(this.textElement);
        } else {
            alert("End already exists");
            delete this;
        }
    }
    #updatePos() {
        // Rectangle position
        this.element.setAttribute("x", this.x - this.width / 2);
        this.element.setAttribute("y", this.y - this.height / 2);

        // Center the text
        this.textElement.setAttribute("x", this.x);
        this.textElement.setAttribute("y", this.y);
        this.textElement.setAttribute("text-anchor", "middle");
        this.textElement.setAttribute("dominant-baseline", "middle");

        // Update line position
        this.lineElement.setAttribute("x1", this.x);
        this.lineElement.setAttribute("y1", this.y - 2 * ELEMENT_MARGIN);
        this.lineElement.setAttribute("x2", this.x );
        this.lineElement.setAttribute("y2", this.y - ELEMENT_MARGIN);
    }
    syncXParent() {}
    syncX() {
        this.xVal = Math.max(this.xVal, this.child.x);
        this.child.syncX();
    }

}
class Statement {
    constructor(parent, child) {
        this.child = child;
        this.id = newID++;
        this.parent = parent;
        this.xVal = parent.x + parent.width / 2 + ELEMENT_MARGIN;
        this.yVal = parent.y + parent.height / 2 + ELEMENT_MARGIN;
        this.element = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        // this.element.setAttribute("text", "10");
        this.element.setAttribute("id", "rect_"+this.id);

        this.textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
        this.textElement.setAttribute("fill", "black");
        this.textElement.setAttribute("id", "text_"+this.id);

        this.element.setAttribute("fill", "lightblue");
        
        svg.appendChild(this.element);
        svg.appendChild(this.textElement);
        this.textElement.style.fontSize = "16px";
        this.lineElement = document.createElementNS("http://www.w3.org/2000/svg", "line");
        this.lineElement.setAttribute("stroke", "black");
        this.lineElement.setAttribute("stroke-width", "2");
        svg.appendChild(this.lineElement);
        this.text = "Rectangle";
        this.next = null;
    }
    syncX() {
        if (this.parent && this.child) {
            this.x = Math.max(this.xVal, this.parent.x, this.child.x);
            this.child.syncX();
            this.parent.syncX();
        } else if (this.parent) {
            this.xVal = Math.max(this.xVal, this.parent.x);
            this.parent.syncX();
        } else if (this.child) {
            this.xVal = Math.max(this.xVal, this.child.x);
            this.child.syncX();
        }
    }
    syncXParent() {
        if (this.parent && this.child) {
            this.x = Math.max(this.xVal, this.parent.x, this.child.x);
            this.parent.syncXParent();
        } else if (this.parent) {
            this.xVal = Math.max(this.xVal, this.parent.x);
            this.parent.syncXParent();
        } else if (this.child) {
            this.xVal = Math.max(this.xVal, this.child.x);
        }
    }

    syncXChild() {
        if (this.parent && this.child) {
            this.x = Math.max(this.xVal, this.parent.x, this.child.x);
            this.child.syncXChild();
        } else if (this.parent) {
            this.xVal = Math.max(this.xVal, this.parent.x);
        } else if (this.child) {
            this.xVal = Math.max(this.xVal, this.child.x);
            this.child.syncXChild();
        }
    }

    syncY() {
        if (this.parent)
            this.parent.syncY();
        this.y = this.parent.lowY;
    }

    #updatePos() {
        // Rectangle position
        this.element.setAttribute("x", this.x - this.width / 2);
        this.element.setAttribute("y", this.y - this.height / 2);

        // Center the text
        this.textElement.setAttribute("x", this.x);
        this.textElement.setAttribute("y", this.y);
        this.textElement.setAttribute("text-anchor", "middle");
        this.textElement.setAttribute("dominant-baseline", "middle");

        // Update line position
        this.lineElement.setAttribute("x1", this.x);
        this.lineElement.setAttribute("y1", this.y - 2 * ELEMENT_MARGIN);
        this.lineElement.setAttribute("x2", this.x );
        this.lineElement.setAttribute("y2", this.y - ELEMENT_MARGIN);
    }

    #updateText(text) {
        this.textElement.textContent = text;
        this.textElement.style.fontSize = "16px";
        this.textElement.style.fill = "black";
        this.element.setAttribute("width", this.textWidth + 2 * TEXT_MARGIN);
        this.element.setAttribute("height", this.textHeight + 2 * TEXT_MARGIN);

        this.#updateSize();
    }
    #updateSize() {
        this.element.setAttribute("width", this.textWidth + 2 * TEXT_MARGIN);
        this.element.setAttribute("height", this.textHeight + 2 * TEXT_MARGIN);

        this.#updatePos();
    }
    remove() {
        this.element.remove();
        this.textElement.remove();
        delete this;
    }
    append(child) {
        this.next = child;
        this.x = child.x = Math.max(this.x, child.x);
    }
    get width() {
        return this.textWidth + 2 * TEXT_MARGIN;
    }
    get height() {
        return this.textHeight + 2 * TEXT_MARGIN;
    }
    get textWidth() {
        return this.textElement.getBBox().width;
    }
    get textHeight() {
        return this.textElement.getBBox().height;
    }
    set x(value) {
        this.#updatePos();
    }
    set y(value) {
        this.y = Math.max(value, this.parent.y, this.child.y);
        this.#updatePos();
    }
    set text(value) {
        this.#updateText(value);
    }
    get x() {
        return this.xVal;
    }
    get y() {
        return this.yVal;
    }
    get lowY() {
        return this.y + this.height / 2;
    }
}