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
            if (secondNo == '') secondNo = repeatNo;
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
        default:
            console.log("oops operate() error, event is", e);
    } 
}

function storeNumber(e) {
    const numberSelected = e.target.className.slice(2);
    if (operator == '') {
        if (firstNo == '' || firstNo == '0') {
            firstNo = numberSelected;
        } else {
            firstNo = firstNo.concat(numberSelected);
        }
        updateDisplay(firstNo);
    }
    if (operator != '') {
        if (secondNo == '' || secondNo == '0') {
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
    firstNo = parseFloat(firstNo);
    secondNo = parseFloat(secondNo);

    switch (operator) {
        case "divide":
            if (secondNo == 0) {
                displayBar.textContent = "Can't divide by 0!"
                firstNo = '';
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
            console.log("oops calculateResult() error");
    }
    updateDisplay(roundNumber(result,8));
    
    firstNo = result;
    repeatNo = secondNo;
    firstNo = firstNo.toString();
    secondNo = '';
}

function storeDecimal() {
    if (secondNo == '') {
        if (firstNo.includes('.')) return;
        firstNo = firstNo.concat('.');
        updateDisplay(firstNo);
    }
    if (firstNo != '' && secondNo != '') {
        if (secondNo.includes('.')) return;
        secondNo = secondNo.concat('.');
        updateDisplay(secondNo);
    }
}

function calculatePercentageOfNo() {
    if (secondNo == '') {
        firstNo = getPercentageOfString(firstNo);
        updateDisplay(firstNo);
    }
    else if (secondNo != '') {
        secondNo = getPercentageOfString(secondNo);
        updateDisplay(secondNo);
    }
}

function getPercentageOfString(stringNo) {
    stringNo = parseFloat(stringNo) * 0.01;
    const result = stringNo.toString();
    return result;
}

//got from StackOverflow
function roundNumber(num, scale) {
    if(!("" + num).includes("e")) {
      return +(Math.round(num + "e+" + scale)  + "e-" + scale);
    } else {
      var arr = ("" + num).split("e");
      var sig = ""
      if(+arr[1] + scale > 0) {
        sig = "+";
      }
      return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
    }
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
/*
To-do list
- add positiveNegative functio,
- add backspace button at the All clear button
- Add keyboard support

- fix big number overflowing the display
*/