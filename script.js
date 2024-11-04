const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let previousInput = '';
let operator = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonText = button.innerText;

    if (buttonText >= '0' && buttonText <= '9') {
      handleNumber(buttonText);
    } else if (buttonText === '.') {
      handleDecimal();
    } else if (buttonText === 'C') {
      clearDisplay();
    } else if (buttonText === '+/-') {
      toggleSign();
    } else if (buttonText === '%') {
      calculatePercentage();
    } else if (buttonText === '=') {
      calculateResult();
    } else {
      handleOperator(buttonText);
    }
  });
});

function handleNumber(num) {
  if (currentInput.length < 9) {
  if (currentInput === '0') {
    currentInput = num;
  } else {
    currentInput += num;
  }
  updateDisplay();
}
}

function handleDecimal() {
  if (!currentInput.includes('.')) {
    currentInput += '.';
  }
  updateDisplay();
}

function clearDisplay() {
  currentInput = '';
  previousInput = '';
  operator = '';
  updateDisplay();
}

function toggleSign() {
  currentInput = currentInput.charAt(0) === '-' ? currentInput.substring(1) : '-' + currentInput;
  updateDisplay();
}

function calculatePercentage() {
  currentInput = (parseFloat(currentInput) / 100).toString();
  if (currentInput.length > 9) {
    currentInput = currentInput.slice(0, 9);
  }
  updateDisplay();
}

function handleOperator(op) {
  if (currentInput === '') return;

  if (previousInput !== '') {
    calculateResult();
  }

  operator = op;
  previousInput = currentInput;
  currentInput = '';
}

function calculateResult() {
  if (previousInput === '' || currentInput === '' || operator === '') return;

  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  let result;

  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '−':
      result = prev - current;
      break;
    case '×':
      result = prev * current;
      break;
    case '÷':
      result = prev / current;
      break;
    default:
      return;
  }
  let resultString = result.toString();

  // If result exceeds 9 characters, format it
  if (resultString.length > 9) {
    if (result % 1 !== 0) {
      // For decimal numbers, round to fit within 9 characters
      resultString = result.toFixed(8 - Math.floor(result).toString().length);
    } else if (result >= 1e9 || result <= -1e9) {
      // For large integers, use scientific notation if they exceed 9 digits
      resultString = result.toExponential(4);
    } else {
      // For large integers that fit within 9 characters, slice to 9 digits
      resultString = resultString.slice(0, 9);
    }
  }

  currentInput = result.toString().slice(0, 9);
  currentInput = result.toString();
  operator = '';
  previousInput = '';
  updateDisplay();
}

function updateDisplay() {
  display.innerText = currentInput || '0';
}