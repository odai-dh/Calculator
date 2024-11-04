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
  if (currentInput === '0') {
    currentInput = num;
  } else {
    currentInput += num;
  }
  updateDisplay();
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

  currentInput = result.toString();
  operator = '';
  previousInput = '';
  updateDisplay();
}

function updateDisplay() {
  display.innerText = currentInput || '0';
}