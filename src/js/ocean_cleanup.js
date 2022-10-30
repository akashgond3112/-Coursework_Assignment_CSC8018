console.log("I am in ur JS!!!!!");

const itemObject = {
  "Plastic bottles": "0.730",
  "Plastic bags": "0.417",
  "Food wrapping": "0.583",
  "Yogurt, cream, etc. containers": "0.383",
  "Take-away plastic boxes": "0.383",
  "Take-away cups": "0.240",
  "Plastic-wrapped packages": "0.834",
  "Detergent & cleaning product bottles": "0.120",
  "Shampoo, conditioner & toiletries": "0.080",
  "Plastic toothbrushes": "0.020",
  "Toothpaste": "0.015"
};

// console.log(itemObject["Plastic bottles"]);

function calculate() {
  console.log("I am in ur function!!!!!");

  const x = document.getElementById("updateForm");
  let i;
  for (i = 0; i < x.length; i++) {
    console.log(`Your input is ${x.elements[i].value}`);
    x.elements[i].value = "90";
  }
}

function numberOfPeople() {
  peopleCount = document.forms[0].no_of_people.value;
  alert("Number of Peopel are : " + peopleCount);
}

(function () {
  console.log("This code is invoked immediately as soon as it is defined");
})();
