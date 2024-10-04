const STATUS_IN_LIMIT = "все хорошо";
const STATUS_OUT_OF_LIMIT = "все плохо";
const STATUS_IN_LIMIT_CLASSNAME = "stats__status_positive";
const STATUS_OUT_OF_LIMIT_CLASSNAME = "stats__status_negative";

const inputNode = document.getElementById("expenseInput");
const addButtonNode = document.getElementById("addButton");
const resetButtonNode = document.getElementById("resetButton");
const totalValueNode = document.getElementById("totalValue");
const statusNode = document.getElementById("statusText");
const historyNode = document.getElementById("historyList");
const categorySelectNode = document.getElementById("CategorySelect");

const limitNode = document.getElementById("limitValue");
let limit = parseInt(limitNode.innerText);

//POPUP LIMIT CONSTS
const POPUP_OPENED_CLASSNAME = 'popup_open';
const BODY_FIXED_CLASSNAME = 'body_fixed';

const bodyNode = document.querySelector("body");
const popupNode = document.getElementById("popup");
const popupContentNode = document.getElementById("popupContent")
const popupOpenButtonNode = document.getElementById("changeLimitButton");
const popupCloseButtonNode = document.getElementById("popupCloseButton");
const inputLimitNode = document.getElementById("limitInput");
const setLimitButtonNode = document.getElementById("setLimitButton");

let expenses = [];

const getAmountFromUser = (input) => {
  if (!input.value) {
    return null;
  }

  const amount = parseInt(input.value);

  return amount;
}

const clearInput = (input) => {
  input.value = '';
}

const getTotal = () => {
  let sum = 0;
  expenses.forEach(expense => {
    sum += expense.amount;
  });

  return sum;
}

const getSelectedCategory = () => {
  return categorySelectNode.value;
}

const renderTotal = (sum) => {
  totalValueNode.innerText = sum;
}

const renderStatus = (sum) => {
  if (sum <= limit) {
    statusNode.innerText = STATUS_IN_LIMIT;
    statusNode.className = STATUS_IN_LIMIT_CLASSNAME;
  } else {
    statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${limit - sum} руб.)`;
    statusNode.className = STATUS_OUT_OF_LIMIT_CLASSNAME;
  }
}

const renderHistory = () => {
  historyList.innerHTML = "";

  expenses.forEach((expense) => {
    const historyItem = document.createElement("li");
    historyItem.className = "currency";
    historyItem.innerText = `${expense.category} - ${expense.amount}`;

    historyList.appendChild(historyItem);
  });
}

const render = () => {
  const sum = getTotal();

  renderTotal(sum);
  renderStatus(sum);
  renderHistory();
}

const addButtonHandler = () => {
  const currentAmount = getAmountFromUser(inputNode);
  if (!currentAmount) {
    return;
  }

  const currentCategory = getSelectedCategory();
  if (currentCategory === "Категория") {
    alert('Выбери категорию')
    return;
  }

  const newExpense = {amount: currentAmount, category: currentCategory};
  expenses.push(newExpense);

  render();
  clearInput(inputNode);
}

const resetButtonHandler = () => {
  expenses = [];
  render();
}

const togglePopup = () => {
  popupNode.classList.toggle(POPUP_OPENED_CLASSNAME);
  bodyNode.classList.toggle(BODY_FIXED_CLASSNAME);
}

const popupNodeHandler = (event) => {
  const isClickOutsideContent = !event.composedPath().includes(popupContentNode);

  if (isClickOutsideContent) {
    togglePopup();
  }
}

const setLimitButtonHandler = () => {
  const newLimit = getAmountFromUser(inputLimitNode);
  if (!newLimit) {
    return;
  }

  limitNode.innerText = newLimit;
  limit = newLimit;

  togglePopup();
  render();
  clearInput(inputLimitNode);
}

addButtonNode.addEventListener("click", addButtonHandler);
resetButtonNode.addEventListener("click", resetButtonHandler);
popupOpenButtonNode.addEventListener("click", togglePopup);
popupCloseButtonNode.addEventListener("click", togglePopup);
popupNode.addEventListener("click", popupNodeHandler);
setLimitButtonNode.addEventListener("click", setLimitButtonHandler);

//LIMIT POPUP