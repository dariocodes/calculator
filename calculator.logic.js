//math functions
function add(firstInput, secondInput) {
  return +firstInput + +secondInput;
}

function subtract(firstInput, secondInput) {
  return firstInput - secondInput;
}

function multiply(firstInput, secondInput) {
  return firstInput * secondInput;
}

function divide(firstInput, secondInput) {
  return firstInput / secondInput;
}

function operate(operator, firstInput, secondInput) {
  switch (operator) {
    case "+":
      return add(firstInput, secondInput);
    case "-":
      return subtract(firstInput, secondInput);
    case "x":
      return multiply(firstInput, secondInput);
    case "÷":
      return divide(firstInput, secondInput);
    default:
      return "unrecognized operator";
  }
}

//display and input gathering
const display = document.getElementById("screen");
//variables for calculations
let firstInput;
let secondInput;
let operator;
// get buttons
const numberButtons = document.querySelectorAll(".number");
const numberButtonsArr = Array.from(numberButtons);
const equalsButton = document.getElementById("equals");
const operatorButtons = document.querySelectorAll(".operator");
const operatorButtonsArr = Array.from(operatorButtons);
const dotBtn = document.getElementById("dot");

// add event listener to number buttons
numberButtonsArr.forEach((button) =>
  button.addEventListener("click", inputFirstNumber)
);

let executedOnce = true;
let dotUsed = false;
function inputFirstNumber(event) {
  if (!executedOnce) {
    resetCalc();
    let dotUsed = false;
  }
  display.innerText += event.target.innerText;
  dotBtn.addEventListener("click", addDot);
}

//handle dot
function addDot(event) {
  if (!dotUsed) {
    display.innerText += event.target.innerText;
    dotUsed = true;
  }
}

//add event listener to operator buttons
operatorButtonsArr.forEach((button) =>
  button.addEventListener("click", inputOperator)
);

//once operator button is clicked remove listeners for all buttons except secondnumber
function inputOperator(event) {
  operatorButtonsArr.forEach((button) =>
    button.removeEventListener("click", inputOperator)
  );

  numberButtonsArr.forEach((button) =>
    button.removeEventListener("click", inputFirstNumber)
  );
  clearBtn.removeEventListener("click", deleteChar);

  numberButtonsArr.forEach((button) =>
    button.addEventListener("click", inputSecondNumber)
  );
  operator = event.target.innerText;
  firstInput = display.innerText;
  display.innerText = `${firstInput} ${event.target.innerText}`;
}

//once user inputs second number clear display and get ready to calculate
let executed = false;
function inputSecondNumber(event) {
  if (!executed) {
    display.innerText = "";
    executed = true;
    dotUsed = false;
    clearBtn.addEventListener("click", deleteChar);
  }
  dotBtn.addEventListener("click", addDot);
  display.innerHTML += event.target.innerText;
  equalsButton.addEventListener("click", calculateCurrent);
  operatorButtonsArr.forEach((button) =>
    button.addEventListener("click", calculateContinue)
  );
}

// calculate upon equals press
function calculateCurrent() {
  secondInput = display.innerText;
  display.innerText = operate(operator, firstInput, secondInput);
  firstInput = display.innerText;
  numberButtonsArr.forEach((button) =>
    button.removeEventListener("click", inputSecondNumber)
  );
  equalsButton.removeEventListener("click", calculateCurrent);
  executed = false;
  executedOnce = false;
  dotUsed = true;
  numberButtonsArr.forEach((button) =>
    button.addEventListener("click", inputFirstNumber)
  );
  operatorButtonsArr.forEach((button) =>
    button.removeEventListener("click", calculateContinue)
  );
  operatorButtonsArr.forEach((button) =>
    button.addEventListener("click", inputOperator)
  );
}

function calculateContinue(event) {
  secondInput = display.innerText;
  display.innerText = operate(operator, firstInput, secondInput);
  firstInput = display.innerText;
  operator = event.target.innerText;
  operatorButtonsArr.forEach((button) =>
    button.removeEventListener("click", calculateContinue)
  );
  executed = false;
  dotUsed = true;
  secondInput = "";
  numberButtonsArr.forEach((button) =>
    button.addEventListener("click", inputSecondNumber)
  );
}

// clearing logic
const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", deleteChar);
clearBtn.addEventListener("dblclick", resetCalc);

// handle single clicks
function deleteChar() {
  let newDisplay = display.innerText.substring(0, display.innerText.length - 1);
  display.innerText = newDisplay;
}

//handle double clicks
function resetCalc() {
  display.innerText = "";
  firstInput = "";
  secondInput = "";
  operator = "";
  executed = false;
  executedOnce = true;
  dotUsed = false;
  numberButtonsArr.forEach((button) =>
    button.addEventListener("click", inputFirstNumber)
  );
  operatorButtonsArr.forEach((button) =>
    button.addEventListener("click", inputOperator)
  );
  clearBtn.addEventListener("click", deleteChar);

  numberButtonsArr.forEach((button) =>
    button.removeEventListener("click", inputSecondNumber)
  );
  equalsButton.removeEventListener("click", calculateCurrent);
  operatorButtonsArr.forEach((button) =>
    button.removeEventListener("click", calculateContinue)
  );
}
