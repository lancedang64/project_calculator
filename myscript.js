'use strict'

const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;

function operate(e) {
    const userChoice = e.target.id;
    switch (userChoice) {
        case ("numberButton"):
            storeNumber(e);
            break;
        case ("operatorButton"):
            storeOperator(e);
            if (secondNo != '') calculateResult();
            break;
        case ("equalButton"):
            if (secondNo == '') secondNo = repeatNo;
            calculateResult();
            break;
        case ("clearButton"):
            clearCalculator();
            break;
        default:
            console.log("oops operate() error");
    } 
}

function storeNumber(e) {
    const numberSelected = e.target.className.slice(2);
    if (operator == '') {
        if (firstNo == '') {
            firstNo = numberSelected;
        } else {
            firstNo = firstNo.concat(numberSelected);
        }
        updateDisplay(firstNo);
    }
    if (operator != '') {
        if (secondNo == '') {
            secondNo = numberSelected;
        } else {
            secondNo = secondNo.concat(numberSelected);
        }
        updateDisplay(secondNo);
    }
}

function updateDisplay(text) {
    displayBar.textContent = text;
}

function storeOperator(e) {
    operator = e.target.className;
}

function calculateResult() {
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
        case "":
            firstNo = firstNo.toString();
            secondNo = '';
            return firstNo,secondNo;
        default:
            console.log("oops calculateResult() error");
    }
    updateDisplay(result);
    
    firstNo = result;
    repeatNo = secondNo;
    firstNo = firstNo.toString();
    secondNo = '';
}

function clearCalculator(e) {
    displayBar.textContent = '';
    firstNo = '';
    secondNo = '';
    result = 0;
    operator = '';
    repeatNo = 0;
}

let firstNo = '';
let secondNo = '';
let result = 0;
let repeatNo;
let operator = '';

const displayBar = document.querySelector("div.display");

const operateButtons = document.querySelectorAll("button");
operateButtons.forEach(operateButton => {
    operateButton.addEventListener("click", operate);
});
