let display = "0";
let historyList = [];

const screen = document.getElementById("ecran");
const operationText = document.getElementById("operations");
const previewText = document.getElementById("historique");
const historyDiv = document.getElementById("avan");


function update() {
  screen.value = display;
  operationText.textContent = display;

  try {
    let expr = display.replace(/\s+/g, ""); 
    expr = expr.replace(/(\d+)%/g, "($1/100)"); 

    let func = new Function("return " + expr);
    let result = func();

    if (!isNaN(result)) {
      previewText.textContent = "= " + result; 
    } else {
      previewText.textContent = "";
    }
  } catch {
    previewText.textContent = "";
  }
}

// Ajoute chif oswa operatè
function append(value) {
  if (display === "0" || display === "Erreur") {
    if (value === ".") {
      display = "0.";
    } else {
      display = value;
    }
  } else {
    let lastNumber = display.split(/[\+\-\*\/]/).pop();
    if (value === "." && lastNumber.includes(".")) {
      return; // anpeche dezyèm pwen nan menm nimewo a
    }
    display += value;
  }
  update();
}


function clearScreen() {
  display = "0";
  update();
}


function deleteLast() {
  display = display.slice(0, -1) || "0";
  update();
}

function historicite() {
  if (historyList.length === 0) {
    historyDiv.innerHTML = "Aucun calcul effectué";
  }
  historyDiv.classList.toggle("liste");
}

// Dark mode
const themeBtn = document.getElementById("boutonTheme");
const themeIcon = themeBtn.querySelector("i");

function theme() {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }
}

// Fonksyon 
function addition(a, b) {
  return a + b;
}
function soustraction(a, b) {
  return a - b;
}
function multiplication(a, b) {
  return a * b;
}
function division(a, b) {
  if (b === 0) return "Division par 0 impossible";
  return a / b;
}
function modulo(a, b) {
  if (b === 0) return "Division par 0 impossible";
  return a % b;
}
function pourcentage(a) {
  return a / 100;
}

// =
function calculate() {
  try {
    let expr = display.replace(/\s+/g, "");
    expr = expr.replace(/(\d+)%/g, "($1/100)");

    let func = new Function("return " + expr);
    let result = func();

    if (isNaN(result)) {
      display = "Erreur";
    } else {

      // ajoute nan istorik
      historyList.unshift(display + " = " + result);
      historyDiv.innerHTML = historyList.join("<br>");
      display = result.toString();
    }
  } catch {
    display = "Erreur";
  }

  update();

  previewText.textContent = "";
}


update();
