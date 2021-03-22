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

function numberSelect(e) {
    const numberSelected = e.target.className.slice(2);
    console.log(numberSelected);
    if (operator == '') updateUI("updateFirstNo", numberSelected);
    else updateUI("updateSecondNo", numberSelected);
}

function updateUI(func, string) {
    switch (func) {
        case "clear":
            displayBar.textContent = '';
            //un-highlight operator
            break;
        case "updateFirstNo":
            firstNo = firstNo.concat(string);
            displayBar.textContent = firstNo;
            break;
        case "updateSecondNo":
            secondNo = secondNo.concat(string);
            displayBar.textContent = secondNo;
            break;    
        case "selectOperator":
            //highlight operator
            break;
        case "displayResult":
            displayBar.textContent = result;
            break;
        default:
            displayBar.textContent = "oops";
    }
}

function operate(e) {
    updateUI("selectOperator");
    operator = e.target.className;
}

function calculateTotal() {
    firstNo = parseInt(firstNo);
    secondNo = parseInt(secondNo);

    switch (operator) {
        case "divide":
            result = divide(firstNo,secondNo);
            break;
        case "multiply":
            result = multiply(firstNo,secondNo);
            break;
        case "subtract":
            result = subtract(firstNo,secondNo);
            break;
        case "add":
            result = add(firstNo,secondNo);
            break;
        default:
            console.log("oops calculateTotal() error");
    }
    updateUI('displayResult');
    firstNo = firstNo.toString();
    secondNo = secondNo.toString();
}

function clearCalculator(e) {
    displayBar.textContent = '';
    firstNo = '';
    secondNo = '';
    operator = '';
    result = 0;
}

let operator = '';
let firstNo = '';
let secondNo = '';
let result = 0;

const displayBar = document.querySelector("div.display");

const numberButtons = document.querySelectorAll("button#numberButton");
numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", numberSelect);
});

const operatorButtons = document.querySelectorAll("button#operatorButton");
operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener("click", operate);
});

const clearButton = document.querySelector("button.clear");
clearButton.addEventListener("click", clearCalculator);

const equalButton = document.querySelector("button.equal");
equalButton.addEventListener("click", calculateTotal);