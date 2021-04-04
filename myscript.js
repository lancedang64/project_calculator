'use strict'

const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;

function operate(e) {
    const userChoice = e.target.id;
    switch (userChoice) {
        case "number":
            storeNumber(e);
            break;
        case "operator":
            if (secondNo != '') calculateResult();
            storeOperator(e);
            break;
        case "equal":
            if (secondNo == '') secondNo = repeatNo; // to repeat previous operator
            calculateResult();
            break;
        case "clear":
            clearCalculator();
            break;
        case "decimal":
            storeDecimal();
            break;
        case "percentage":
            calculatePercentageOfNo();
            break;
        case "positiveNegative":
            changePositiveNegativeSign();
            break;
        case "backspace":
            backspaceNumber();
            break;
        default:
            console.log("oops operate() error, event is", e);
    } 
}

function storeNumber(e) {
    const numberSelected = e.target.className.slice(2);
    if (isFirstNoSelected()) {
        if (firstNo == '' || firstNo == '0') firstNo = numberSelected;
        else firstNo = firstNo.concat(numberSelected);
        updateDisplay(firstNo);
    } else {
        if (secondNo == '' || secondNo == '0') secondNo = numberSelected;
        else secondNo = secondNo.concat(numberSelected);
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
    firstNo = parseFloat(firstNo);
    secondNo = parseFloat(secondNo);

    switch (operator) {
        case "divide":
            if (secondNo == 0) {
                displayBar.textContent = "Can't divide by 0!"
                firstNo = '0'; //so it doesn't crash the calculator if user choose an operator afterward
                secondNo = '';
                operator = '';
                return firstNo, secondNo, operator;
            }
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
            console.log("oops calculateResult() error at", e);
    }
    updateDisplay(Number((result).toFixed(20)));
    
    firstNo = result;
    repeatNo = secondNo;
    firstNo = firstNo.toString();
    secondNo = '';
}

function storeDecimal() {
    if (isFirstNoSelected()) {
        if (firstNo.includes('.')) return;
        firstNo = firstNo.concat('.');
        updateDisplay(firstNo);
    } else {
        if (secondNo.includes('.')) return;
        secondNo = secondNo.concat('.');
        updateDisplay(secondNo);
    }
}

function calculatePercentageOfNo() {
    if (isFirstNoSelected()) {
        firstNo = (parseFloat(firstNo) * 0.01).toString();
        updateDisplay(firstNo);
    } else {
        secondNo = (parseFloat(secondNo) * 0.01).toString();
        updateDisplay(secondNo);
    }
}

function changePositiveNegativeSign() {
    if (isFirstNoSelected()) {
        firstNo = (0 - parseFloat(firstNo)).toString();
        updateDisplay(firstNo);
    } else {
        secondNo = (0 - parseFloat(secondNo)).toString();
        updateDisplay(secondNo);
    }
}

function clearCalculator(e) {
    displayBar.textContent = '';
    firstNo = '0';
    secondNo = '';
    result = 0;
    operator = '';
    repeatNo = 0;
    updateDisplay(firstNo);
}

function isFirstNoSelected() {
    if (operator == '') return true;
    else return false;
}

function backspaceNumber() {
    if (isFirstNoSelected()) {
        firstNo = firstNo.slice(0,-1);
        updateDisplay(firstNo);
    } else {
        secondNo = secondNo.slice(0,-1);
        updateDisplay(secondNo);
    }
}

let firstNo = '0';
let secondNo = '';
let result = 0;
let repeatNo;
let operator = '';

const displayBar = document.querySelector("div.display");

const operateButtons = document.querySelectorAll("button");
operateButtons.forEach(operateButton => {
    operateButton.addEventListener("click", operate);
});

updateDisplay(firstNo);
/*
To-do list
- Add keyboard support
*/