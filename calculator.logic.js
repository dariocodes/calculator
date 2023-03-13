//math functions
function add(firstInput, secondInput) {
  return firstInput + secondInput;
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
let display = document.getElementById("screen");
let firstInput;
let operator;
const numberButtons = document.querySelectorAll(".number");
const numberButtonsArr = Array.from(numberButtons);

numberButtonsArr.forEach((button) =>
  button.addEventListener("click", inputFirstNumber)
);

function inputFirstNumber(event) {
  display.innerText += event.target.innerText;
}

const operatorButtons = document.querySelectorAll(".operator");
const operatorButtonsArr = Array.from(operatorButtons);

operatorButtonsArr.forEach((button) =>
  button.addEventListener("click", inputOperator)
);

function inputOperator(event) {
  operatorButtonsArr.forEach((button) =>
    button.removeEventListener("click", inputOperator)
  );
  numberButtonsArr.forEach((button) =>
    button.removeEventListener("click", inputFirstNumber)
  );
  operator = event.target.innerText;
  firstInput = display.innerText;
  display.innerText = `${firstInput} ${event.target.innerText}`;
}
