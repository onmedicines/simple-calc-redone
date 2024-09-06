import "./styles.css";

class Calculator {
  constructor(prevOperandTextContent, currentOperandTextContent) {
    this._prevOperandTextContent = prevOperandTextContent;
    this._currentOparandTextContent = currentOperandTextContent;
  }

  clear() {
    this.prevOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }
}

const calculator = new Calculator();
