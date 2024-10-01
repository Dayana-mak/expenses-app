const LIMIT = 10000;
const CURRECY = 'руб.';
const STATUS_IN_LIMIT = 'все хорошо';
const STATUS_OUT_OF_LIMIT = 'все плохо';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'status_red'

const expenses = [];

const inputNode = document.querySelector(".js-expense-input");
const buttonNode = document.querySelector(".js-add-button");
const historyNode = document.querySelector(".js-history");
const sumNode = document.querySelector(".js-sum");
const limitNode = document.querySelector(".js-limit");
const statusNode = document.querySelector(".js-status");

initApp(expenses);

buttonNode.addEventListener('click', function() {
  const expense = getExpenseFromUser();
  if (!expense) {
    return;
  }

  trackExpense(expense);

  render(expenses);
});

function initApp(expenses) {
  limitNode.innerText = LIMIT;
  statusNode.innerTEXT = STATUS_IN_LIMIT;
  sumNode.innerText = calculateExpenses(expenses);
}

function trackExpense(expense) {
  expenses.push(expense);
}

function getExpenseFromUser() {
  if (!inputNode.value) {
    return null;
  }

  const expense = parseInt(inputNode.value);

  clearInput()
  
  return expense;
}

function clearInput() {
  inputNode.value = '';
}

function calculateExpenses(expenses) {
  let sum = 0;

  expenses.forEach(element => {
     sum += element;
  });

  return sum;
}

function render(expenses) {
  const sum = calculateExpenses(expenses);

  renderHistory(expenses);
  renderSum(sum);
  renderStatus(sum);
}

function renderHistory(expenses) {
  let expensesListHTML = '';

  expenses.forEach(expense => {
    expensesListHTML += `<li>${expense} ${CURRECY}</li>`;
  });

  historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;  
}

function renderSum(sum) {
  sumNode.innerText = sum;
}

function renderStatus(sum) {
  const overspent = calculateOverspent(expenses);
  if (sum <= LIMIT) {
    statusNode.innerText = STATUS_IN_LIMIT;
  } else {
    statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${overspent} ${CURRECY})`;
    statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
  }
}

function calculateOverspent(expenses) {
  const sum = calculateExpenses(expenses);

  const overspent = LIMIT - sum;
  return overspent;
}