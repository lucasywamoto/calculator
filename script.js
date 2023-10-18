let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let shouldUpdateDisplay = false;

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('#equalsBtn');
const clearButton = document.querySelector('#clearBtn');
const deleteButton = document.querySelector('#deleteBtn');
const pointButton = document.querySelector('#pointBtn');
const lastOperationDisplay = document.querySelector('.last-operation');
const currentOperationDisplay = document.querySelector('.current-operation');

clear();

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(currentOperationDisplay.textContent == 0) {
            clear();
            currentOperationDisplay.textContent = button.textContent;
        }
        else
            currentOperationDisplay.textContent += button.textContent;
    })
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(currentOperationDisplay.textContent == '0') {
            clear();
        }
        else
            currentOperationDisplay.textContent += button.textContent;
    })
});

equalsButton.addEventListener('click', () => {
    currentOperation = currentOperationDisplay.textContent;
    console.log(currentOperation);
});

clearButton.addEventListener('click', clear);

deleteButton.addEventListener('click', () => {
    currentOperationDisplay.textContent = currentOperationDisplay.textContent.toString().slice(0, -1);
    if(currentOperationDisplay.textContent == '')
        clear();
});

function clear() {
    currentOperationDisplay.textContent = '0';
    lastOperationDisplay.textContent = '';
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
  }
  
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

