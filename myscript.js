'use strict'

function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    return a / b;
}

function operate(e) {
    
}

function storeNumber(e) {
    const numberSelected = e.target.className.slice(2);
    updateNumber(numberSelected);
}

function updateNumber(string) {
    displayBar.textContent = displayBar.textContent.concat(string);
    firstNo = firstNo.concat(string);
}

function clearCalculator(e) {
    displayBar.textContent = '';
    firstNo = '';
    secondNo = '';
}

let firstNo = '';
let secondNo = '';
let result = 0;

const displayBar = document.querySelector("div.display");

const numberButtons = document.querySelectorAll("button#numberButton");
numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", storeNumber);
});

const operatorButtons = document.querySelectorAll("button#operatorButton");
operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener("click", operate);
});

const clearButton = document.querySelector("button.clear");
clearButton.addEventListener("click", clearCalculator);

