import "./styles.css";

class Calculator {
  constructor(prevOperandTextContent, currentOperandTextContent) {
    this._prevOperandTextContent = prevOperandTextContent;
    this._currentOparandTextContent = currentOperandTextContent;

    this._$prevDisplay = document.getElementById("prev");
    this._$currentDisplay = document.getElementById("current");

    this.clear();
  }

  clear() {
    this._prevOperand = "";
    this._currentOperand = "";
    this._operation = undefined;

    this.updateDisplay();
  }

  delete() {
    this._currentOperand = this._currentOperand.slice(0, -1);
    this.updateDisplay();
  }

  appendNumber(numberText) {
    if (numberText === ".") {
      if (this._currentOperand.includes(".")) return;
      if (this._currentOperand === "") this._currentOperand += 0;
    }

    this._currentOperand += numberText;
    this.updateDisplay();
  }

  chooseOperation(operation) {
    if (this._currentOperand) {
      this.compute();
    }

    this._operation = operation;
    this._prevOperand = this._currentOperand;
    this._currentOperand = "";

    this.updateDisplay();
  }

  compute() {
    let output;
    const prev = Number(this._prevOperand);
    const current = Number(this._currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this._operation) {
      case "+":
        output = prev + current;
        break;
      case "-":
        output = prev - current;
        break;
      case "*":
        output = prev * current;
        break;
      case "/":
        output = prev / current;
        break;
      default:
        return;
    }

    this._currentOperand = output.toString();
    this._prevOperand = "";
    this._operation = undefined;

    this.updateDisplay();
  }

  updateDisplay() {
    this._$prevDisplay.textContent = this._prevOperand;
    this._$currentDisplay.textContent = this._currentOperand;

    if (this._operation) {
      this._$prevDisplay.textContent = this._prevOperand + this._operation;
    }
  }
}

const $numpad = document.getElementById("numpad");
const calculator = new Calculator();

$numpad.addEventListener("click", (e) => {
  const button = e.target;
  if (button.classList.contains("number")) {
    calculator.appendNumber(button.textContent);
  } else if (button.classList.contains("operator")) {
    calculator.chooseOperation(button.textContent);
  } else if (button.id === "equals") {
    calculator.compute();
  } else if (button.id === "all-clear") {
    calculator.clear();
  } else if (button.id === "delete") {
    calculator.delete();
  }
});

const toggleThemeButton = document.querySelector("#toggle-theme");
toggleThemeButton.addEventListener("click", () => {
  const currentIcon = document.querySelector("#toggle-theme i");
  document.getElementById("container").classList.toggle("dark-theme");
  if (currentIcon.classList.contains("fa-moon")) {
    currentIcon.classList.remove("fa-moon");
    currentIcon.classList.add("fa-sun");
  } else {
    currentIcon.classList.remove("fa-sun");
    currentIcon.classList.add("fa-moon");
  }
});
