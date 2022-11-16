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
  "Toothpaste": { usageTime: "month", unit: 0.01 },
};

const behaviourTip = {
  "Plastic bottles":
    "Many beverages can be purchased in glass bottles. Consider to bring reusable bottles for water and hot beverages when you are out and about.",
  "Plastic bags":
    "Bring reusable fabric totes for shopping and refuse plastic bags when offered.",
  "Food wrapping": "Consider to buy more unpackaged food at local markets.",
  "Yogurt cream etc containers":
    "Some places offer dairy in glass containers. You could even explore recipes to make your own yogurt.",
  "Take away plastic boxes":
    "Cut down on take-out packaging by preparing more meals at home.",
  "Take-away cups": "Bring your own tumbler when ordering hot beverages to go.",
  "Plastic wrapped packages":
    "Try to purchase more products in shops rather than online.",
  "Detergent cleaning product bottles":
    "Explore refill stations in your neighborhood to cut down on bottles from detergents and cleaning products.",
  "Shampoo conditioner toiletries":
    "Explore refill stations in your neighborhood to cut down on plastic waste from toiletries.",
  "Plastic Toothbrushes":
    "Seriously? How often do you brush your teeth? Anyway, Did you know there are toothbrushes made from wood?",
  "Toothpaste":
    "Seriously? How much toothpaste do you use? Did you know there are plastic-free alternatives available?",
  "unknown sources": "",
};

const form = document.querySelectorAll("#updateForm");

const inputFields = document.querySelectorAll('input[type="number"]');

const tipElement = document.querySelector(".unknown-sources");

const behaviourTipParent = document.querySelector(".behaviourTip");

const totalPlasticWasteAmount = document.querySelector(
  ".totalPlasticWasteAmount"
);

const userInputData = new Map(); // initalised a map store user input for each item

let totalSum = 0; // intialised a total sum variable.

/* 
To get the item that accounts for the highest amount of plastic waste.
*/
function gethighestAmountOfWaste() {
  const highestAmountOfWaste = [...userInputData.entries()].reduce((a, e) =>
    e[1] > a[1] ? e : a
  );

  updateTip(highestAmountOfWaste[0]); // call the method to update the tip
  calculateEstimatedPlasticFootPrints(); // calcute the total sum
  updatePlasticWasteData(totalSum); // update the DOM with total sum
}

/* 
Calculate the estimated foot print , we will get all input fields value those are non zero
and also we will skip the number of people value,and then total the sum of all.
If number of people is more than 1 then we will divide the total by the number of people.
*/
function calculateEstimatedPlasticFootPrints() {
  const filterData = [...userInputData.entries()];

  for (let data in filterData) {
    let tempData = filterData[data];
    totalSum += tempData[1]; // increment the total sum
  }

  // if number of people is increased divide the total sum with no. of people.
  if (getNumberOfPeople() > 1) {
    caculateDataBasedOnNumberOfPeople();
  }
}

/* 
This function is to Update the tip in the dom 
its expect one of the following values called tip
which is going to be updated in the DOMContent
*/
function updateTip(tip) {
  tipElement.innerText = tip;
  behaviourTipParent.innerText = behaviourTip[tip];
}

/* 
This function is to Update the amount of plastic waste
used per by the user kg/year
which is going to be updated in the DOMContent
*/

function updatePlasticWasteData(totalPlasticWaste) {
  totalPlasticWasteAmount.innerText = `${roundTotalSumUpToTwoDecimals(
    totalPlasticWaste
  )} kg / year.`;
}

/* 
The behaviour of this function is to get all the input fields
data from the form whose value is 0 and greater than 0 and add them to the temp map.
*/
function getDataForm() {
  var formData = new FormData(form[0]);

  for (var pair of formData.entries()) {
    if (pair[0] !== "no_of_people" && pair[1] >= 0) {
      // we will except all the input even 0 also.
      const item = itemObject[pair[0]]; // get the matching item from the item object
      const itemUnitValue = pair[1] * item["unit"]; // multiply the input value * unit for item

      userInputData.set(pair[0], itemUnitValue); // insert into to map < item, value>
    }
  }

  gethighestAmountOfWaste();
}

/* 
Add event listeners to the form and all the input fields.
*/
document.addEventListener("DOMContentLoaded", function () {
  for (var i = 0; i < inputFields.length; i++) {
    // Once user ckick on the input field set clear the input field
    inputFields[i].addEventListener(
      "focus",
      (event) => {
        event.target.value = "";
        totalSum = 0;
        if (event.target.getAttribute("class") !== null) {
          event.target.removeAttribute("class");
        }
      },
      false
    );

    let isInputValid = false;

    inputFields[i].addEventListener("change", (event) => {
      event.target.removeAttribute("class");
      isInputValid = validateInputFields(event);
      if (isInputValid) {
        // check if input is valid or npt
        getDataForm();
      } else {
        event.target.setAttribute("class", "input_error");
      }
    });
  }
});

// validate if user input is in negative number
function validateInputFields(event) {
  if (event.target.value >= 0 && event.target.value.length >= 0) {
    return true;
  } else {
    return false;
  }
}

/* 
Add the event listeners to the reset button in order to reset the form.
*/
function resetCalculator() {
  const x = document.getElementById("updateForm");
  let i;
  for (i = 0; i < x.length; i++) {
    // console.log(x.elements[i].tagName);
    if (x.elements[i].tagName === "INPUT") {
      x.elements[i].value = "0";
    } else if (x.elements[i].tagName === "SELECT") {
      x.elements[i].value = "1";
    }
  }

  totalSum = 0; // setting the total sum to
  updatePlasticWasteData(totalSum); // i.e will be set to 0
  updateTip("unknown sources");
}

/* Get the numer of people */
function getNumberOfPeople() {
  return document.forms[0].no_of_people.value;
}

/* Calaclate the the totalsum based on the number of value. */
function caculateDataBasedOnNumberOfPeople() {
  updatePlasticWasteData(totalSum / getNumberOfPeople());
}

/* Round the totalsum upto 2 decimal places */
function roundTotalSumUpToTwoDecimals(totalSum) {
  return Number.parseFloat(totalSum).toFixed(2);
}
