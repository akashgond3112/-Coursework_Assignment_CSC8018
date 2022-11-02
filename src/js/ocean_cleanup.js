const itemObject = {
  "Plastic bottles": { usageTime: "week", unit: 0.73 },
  "Plastic bags": { usageTime: "week", unit: 0.417 },
  "Food wrapping": { usageTime: "week", unit: 0.583 },
  "Yogurt cream etc containers": { usageTime: "week", unit: 0.383 },
  "Take away plastic boxes": { usageTime: "month", unit: 0.383 },
  "Take away cups": { usageTime: "month", unit: 0.24 },
  "Plastic wrapped packages": { usageTime: "month", unit: 0.834 },
  "Detergent cleaning product bottles": { usageTime: "month", unit: 0.12 },
  "Shampoo conditioner toiletries": { usageTime: "month", unit: 0.08 },
  "Plastic Toothbrushes": { usageTime: "month", unit: 0.02 },
  'Toothpaste': { usageTime: "month", unit: 0.01 },
};

const behaviourTip = {
  "Plastic bottles":
    "Many beverages can be purchased in glass bottles. Consider to bring reusable bottles for water and hot beverages when you are out and about.",
  "Plastic bags":
    "Bring reusable fabric totes for shopping and refuse plastic bags when offered.",
  "Food wrapping": "Consider to buy more unpackaged food at local markets.",
  "Yogurt, cream, etc. containers":
    "Some places offer dairy in glass containers. You could even explore recipes to make your own yogurt.",
  "Take-away plastic boxes":
    "Cut down on take-out packaging by preparing more meals at home.",
  "Take-away cups": "Bring your own tumbler when ordering hot beverages to go.",
  "Plastic-wrapped packages":
    "Try to purchase more products in shops rather than online.",
  "Detergent & cleaning product bottles":
    "Explore refill stations in your neighborhood to cut down on bottles from detergents and cleaning products.",
  "Shampoo, conditioner & toiletries":
    "Explore refill stations in your neighborhood to cut down on plastic waste from toiletries.",
  "Plastic toothbrushes":
    "Seriously? How often do you brush your teeth? Anyway, Did you know there are toothbrushes made from wood?",
  "Toothpaste":
    "Seriously? How much toothpaste do you use? Did you know there are plastic-free alternatives available?",
};

const calculator = document.querySelector("#updateForm"),
  form = document.querySelectorAll(".updateForm");

const inputFields = document.querySelectorAll('input[type="number"]');

const tipElement = document.querySelector(".unknown-sources");

const totalPlasticWasteAmount = document.querySelector(
  ".totalPlasticWasteAmount"
);

const userInputData = new Map();

let totalSum = 0;

/* 
To get the item that accounts for the highest amount of plastic waste.
*/
function gethighestAmountOfWaste() {
  const highestAmountOfWaste = [...userInputData.entries()].reduce((a, e) =>
    e[1] > a[1] ? e : a
  );

  console.log(`"Max:" ${highestAmountOfWaste}`);
  updateTip(highestAmountOfWaste[0]);
  calculateEstimatedPlasticFootPrints();
  updatePlasticWasteData(totalSum);
}

/* 

*/
function calculateEstimatedPlasticFootPrints() {
  const filterData = [...userInputData.entries()].filter(function (userInput) {
    return userInput[1] > 0 && userInput[0] !== "no_of_people";
  });

  for (let data in filterData) {
    let tempData = filterData[data];
    console.log(`tempData ${tempData}`);

    const item = itemObject[tempData[0]];
    console.log(` item: ${item}`);

    switch (item["usageTime"]) {
      case "week":
        totalSum += tempData[1] * 52 * item["unit"];
        break;
      case "month":
        totalSum += tempData[1] * 12 * item["unit"];
        break;
      case "year":
        totalSum += tempData[1] * item["unit"];
        break;
      default:
      // code block
    }
  }

  console.log(`number of people: ${getNumberOfPeople()}`);

  if (getNumberOfPeople() > 1) {
    totalSum = totalSum / getNumberOfPeople();
  }

  console.log(`Total Sum: ${totalSum}`);
}

/* 
This function is to Update the tip in the dom 
its expect one of the following values called tip
which is going to be updated in the DOMContent
*/
function updateTip(tip) {
  console.log(`New tip: ${tip}`);
  tipElement.innerText = tip;
}

/* 
This function is to Update the amount of plastic waste
used per by the user kg/year
which is going to be updated in the DOMContent
*/

function updatePlasticWasteData(totalPlasticWaste) {
  console.log(
    `totalPlasticWaste: ${roundTotalSumUpToTwoDecimals(totalPlasticWaste)}`
  );
  totalPlasticWasteAmount.innerText = `${roundTotalSumUpToTwoDecimals(
    totalPlasticWaste
  )} kg / year.`;
}

/* 
The behaviour of this function is to get all the input fields
data from the form and add them to the temp list.
*/
function getDataForm(e) {
  e.preventDefault();

  var formData = new FormData(form[0]);
  console.log(`form data: ${formData}`);

  for (var pair of formData.entries()) {
    if (!pair[0] !== "no_of_people") {
      userInputData.set(pair[0], pair[1]);
    }
  }

  gethighestAmountOfWaste();
}

document.addEventListener(
  "DOMContentLoaded",
  function () {
    for (var i = 0; i < inputFields.length; i++) {
      inputFields[i].addEventListener(
        "focus",
        (event) => {
          event.target.value = "";
        },
        false
      );

      inputFields[i].addEventListener("blur", getDataForm, false);
    }
  },
  false
);

function resetCalculator() {
  const x = document.getElementById("updateForm");
  let i;
  for (i = 0; i < x.length; i++) {
    x.elements[i].value = "";
  }
}

function getNumberOfPeople() {
  return document.forms[0].no_of_people.value;
}

function caculateDataBasedOnNumberOfPeople() {
  console.log(`New totalSum ${totalSum / getNumberOfPeople()}}`);
  updatePlasticWasteData(totalSum / getNumberOfPeople());
}

function roundTotalSumUpToTwoDecimals(totalSum) {
  return Number.parseFloat(totalSum).toFixed(2);
}
