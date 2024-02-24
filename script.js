const previousScreen = document.querySelector("[data-previous-operand]");
const currentScreen = document.querySelector("[data-current-operand]");
const allClearBtn = document.querySelector("[data-all-clear]");
const deleteBtn = document.querySelector("[data-delete]");
const equalBtn = document.querySelector("[data-equals]");
const decimalBtn = document.querySelector("[data-decimal]");
const opreratorBtns = document.querySelectorAll("[data-operation]");
const numberBtns = document.querySelectorAll("[data-number]");

let operator = "";
let previousValue = "";
let currentValue = "";

document.addEventListener("DOMContentLoaded", () => {

  numberBtns.forEach(numberBtn => {
    numberBtn.addEventListener("click", (e) =>{
      handleNumber(e.target.value);
      currentScreen.textContent = currentValue;
    })
  })

  opreratorBtns.forEach(op => {
    op.addEventListener("click", (e) => {
      handleOpearator(e.target.value);
      previousScreen.textContent = `${previousValue} ${operator}`;
      currentScreen.textContent = currentValue;
    })
  })

  allClearBtn.addEventListener("click", () => {
    dataClear();
    previousScreen.textContent = previousValue;
    currentScreen.textContent = "0";
  })

  deleteBtn.addEventListener("click", () => {
    dataDelete();
    if(currentValue.length > 0) {
      currentScreen.textContent = currentValue;
    } else {
      currentScreen.textContent = "0";
    }
  })

  equalBtn.addEventListener("click", () => {
    makeCalculation();

    if(previousValue.length <=9) {
      currentScreen.textContent = previousValue;
    } else {
      currentScreen.textContent = previousValue.slice(0, 9) + "...";
    }
    
    previousScreen.textContent = "";
  })

  decimalBtn.addEventListener("click", () => {
    addDecimal();
  })

})

const handleNumber = (num) => {
  if(currentValue.length <= 9) {
    currentValue += num;
  }
}

const handleOpearator = (op) => {
  operator = op;
  previousValue = currentValue;
  currentValue = "";
}

const dataClear = () => {
  currentValue = "";
  previousValue = "";
  operator = "";
}

const dataDelete = () => {
  currentValue = currentValue.slice(0, -1);
}

const makeCalculation = () => {
  previousValue = Number(previousValue);
  currentValue = Number(currentValue);
  if(operator === "+") {
    previousValue = previousValue += currentValue;
  } else if(operator === "-") {
    previousValue = previousValue -= currentValue;
  } else if(operator === "*") {
    previousValue = previousValue *= currentValue;
  } else {
    previousValue = previousValue /= currentValue;
  }
   previousValue = roundNumber(previousValue);
   previousValue = previousValue.toString();
   currentValue = previousValue.toString();
}

const roundNumber = (num) => {
return Math.round(num * 1000) / 1000;
}

const addDecimal = () => {
  if(!currentValue.includes(".")) {
    currentValue += ".";
  }
}