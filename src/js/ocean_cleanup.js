const itemObject = {
  "Plastic bottles": 0.73,
  "Plastic bags": 0.417,
  "Food wrapping": 0.583,
  "Yogurt cream etc containers": 0.383,
  "Take away plastic boxes": 0.383,
  "Take away cups": 0.24,
  "Plastic wrapped packages": 0.834,
  "Detergent cleaning product bottles": 0.12,
  "Shampoo conditioner toiletries": 0.08,
  "Plastic Toothbrushes": 0.02,
  Toothpaste: 0.01,
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
  Toothpaste:
    "Seriously? How much toothpaste do you use? Did you know there are plastic-free alternatives available?",
};

const calculator = document.querySelector("#updateForm"),
  form = document.querySelectorAll(".updateForm");

const inputFields = document.querySelectorAll('input[type="number"]');

const tipElement = document.querySelector(".unknown-sources");

const userInputData = new Map();

/* 
To get the item that accounts for the highest amount of plastic waste.
*/
function gethighestAmountOfWaste() {
  const highestAmountOfWaste = [...userInputData.entries()].reduce((a, e) =>
    e[1] > a[1] ? e : a
  );

  console.log(`"Max:" ${highestAmountOfWaste}`);
  updateTip(highestAmountOfWaste[0]);
}

/* 
Update the tip.
*/

function updateTip(tip) {
  console.log(`New tip: ${tip}`);
  tipElement.innerText = tip;
}

/* 
The behaviour of this function is to get all the input fields
data from the form and add them to the temp list.
*/
function getDataForm(e) {
  e.preventDefault();

  var formData = new FormData(form[0]);
  for (var pair of formData.entries()) {
    if (!pair[0] != "no_of_people") {
      userInputData.set(pair[0], pair[1]);
    }
  }
  console.log(userInputData);
  gethighestAmountOfWaste();
}

document.addEventListener(
  "DOMContentLoaded",
  function () {
    for (var i = 0; i < inputFields.length; i++) {
      inputFields[i].addEventListener(
        "focus",
        (event) => {
          event.target.style.background = "red";
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
    // for (const attr of x.elements[i].attributes) {
    //   console.log(`${attr.name} -> ${attr.value}\n`);
    // }
  }
}

function numberOfPeople() {
  peopleCount = document.forms[0].no_of_people.value;
  alert("Number of Peopel are : " + peopleCount);
}
