const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('#equalsBtn');
const clearButton = document.querySelector('#clearBtn');
const deleteButton = document.querySelector('#deleteBtn');
const pointButton = document.querySelector('#pointBtn');
const topLine = document.querySelector('.top-line');
const bottomLine = document.querySelector('.bottom-line');
const modeToggle = document.querySelector('#mode');

let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let shouldResetDisplay = false;

equalsButton.addEventListener('click', evaluate)
clearButton.addEventListener('click', clear)
deleteButton.addEventListener('click', deleteNumber)
pointButton.addEventListener('click', appendPoint)

numberButtons.forEach(button => {
    button.addEventListener('click', () => appendNumber(button.textContent));
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => setOperation(button.textContent));
});

function appendNumber(number) {
    if (bottomLine.textContent === '0' || shouldResetDisplay) resetDisplay();
    bottomLine.textContent += number;
}

function setOperation(operator) {
    if (currentOperation !== null) evaluate();
    firstOperand = bottomLine.textContent;
    currentOperation = operator;
    topLine.textContent = `${firstOperand} ${currentOperation}`;
    shouldResetDisplay = true;
}

function appendPoint() {
    if (shouldResetDisplay) resetDisplay()
    if (bottomLine.textContent === '')
    bottomLine.textContent = '0'
    if (bottomLine.textContent.includes('.')) return
    bottomLine.textContent += '.'
}  

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}  

function evaluate() {
    if (currentOperation === null || shouldResetDisplay) return;
    if (currentOperation === '÷' && bottomLine.textContent === '0') {
        alert('You cannot divide by 0!');
        clear();
        return;
    }
    secondOperand = parseFloat(bottomLine.textContent);
    bottomLine.textContent = roundResult(operate(currentOperation, parseFloat(firstOperand), secondOperand));
    topLine.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
    currentOperation = null;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '×':
            return multiply(a, b);
        case '÷':
            return divide(a, b);
        default:
            return 'error';
    }
}

function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide (a, b) {
    if (b === 0) {
        return 'error';
    }
    return a / b;
}

modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    modeToggle.textContent == '☾' ? modeToggle.textContent = '☼' : modeToggle.textContent = '☾';
});

function resetDisplay() {
    bottomLine.textContent = '';
    shouldResetDisplay = false;
}
  
function clear() {
    bottomLine.textContent = '0';
    topLine.textContent = '';
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
}

function deleteNumber() {
    bottomLine.textContent = bottomLine.textContent.toString().slice(0, -1);
    if (bottomLine.textContent.length === 0) bottomLine.textContent = '0';
}
  
window.addEventListener('keydown', handleKeyboardInput);

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === '.') appendPoint();
    if (e.key === '=' || e.key === 'Enter') evaluate();
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'Escape') clear();
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
      setOperation(convertOperator(e.key));
}

function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷';
    if (keyboardOperator === '*') return '×';
    if (keyboardOperator === '-') return '−';
    if (keyboardOperator === '+') return '+';
  }