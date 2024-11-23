const form = document.querySelector("form");
const resultWrapper = document.querySelector("#result-wrapper");

const calculateValues = (first, second, operation) => {
  if (!first) {
    alert("É necessário digitar algum valor!");
    return;
  }

  if (!second) {
    alert("É necessário digitar algum valor!");
    return;
  }

  if (!operation) {
    alert("É necessário escolher a operação!");
    return;
  }

  let calculation;

  switch (operation) {
    case "sum":
      calculation = first + second;
      break;
    case "subtraction":
      calculation = first - second;
      break;
    case "multiplication":
      calculation = first * second;
      break;
    case "division":
      calculation = first / second;
      break;
  }

  resultWrapper.innerHTML = `
    <p id="result">
      O resultado é igual a: ${calculation.toFixed(2)}
    </p>
  `;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const firstValue = Number(document.querySelector("#first-value").value);
  const secondValue = Number(document.querySelector("#second-value").value);
  const operation = document.querySelector("#operation").value;

  calculateValues(firstValue, secondValue, operation);

  form.reset();
});
