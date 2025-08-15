"use strict";
class PopUp {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'pop-up';
        this.element.style.position = 'fixed';
        this.element.style.zIndex = '1000';
        this.element.style.backgroundColor = '#fff';
        this.element.style.border = '1px solid #ccc';
        this.element.style.borderRadius = '5px';
        this.element.style.padding = '10px';
        this.element.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        this.element.style.display = 'none'; // Initially hidden
    }
    open() {
        this.element.style.display = 'block';
        document.body.appendChild(this.element);
    }
    close() {
        this.element.style.display = 'none';
        if (this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
    setPosition(x, y) {
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
    }
    setFullScreen() {
        this.element.style.left = '50px';
        this.element.style.top = '50px';
        this.element.style.width = 'calc(100% - 100px)'; // 50px padding on each side
        this.element.style.height = 'calc(100% - 100px)'; // 50px padding on each side
        this.element.style.margin = '0';
        this.element.style.padding = '20px';
        this.element.style.boxSizing = 'border-box'; // Ensure padding is included in width/height
    }
    setSize(width, height) {
        this.element.style.width = width;
        this.element.style.height = height;
        this.element.style.boxSizing = 'border-box'; // Ensure padding is included in width/height
    }
}
