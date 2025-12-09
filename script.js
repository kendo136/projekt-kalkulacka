var display = document.querySelector(".calc-display");
var numberButtons = document.querySelectorAll(".key-num");
var opButtons = document.querySelectorAll(".key-op");
var clearButton = document.querySelector(".key-clear");
var equalButton = document.querySelector(".key-equal");
var bracketButton = document.querySelector(".key-other");
var expression = "";
var addOpeningBracket = true;

function updateDisplay() {
    if (expression === "") {
        display.textContent = "0";
    } else {
        display.textContent = expression;
    }
}

for (var i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener("click", function () {
        var value = this.textContent.trim();
        expression += value;
        updateDisplay();
    });
}

// operátory +, –, ×, /
for (var j = 0; j < opButtons.length; j++) {
    opButtons[j].addEventListener("click", function () {
        var op = this.textContent.trim();
        if (expression === "") {
            return;
        }

        expression += op;
        updateDisplay();
    });
}

clearButton.addEventListener("click", function () {
    expression = "";
    updateDisplay();
});

bracketButton.addEventListener("click", function () {
    if (addOpeningBracket) {
        expression += "(";
        addOpeningBracket = false;
    } else {
        expression += ")";
        addOpeningBracket = true;
    }
    updateDisplay();
});

equalButton.addEventListener("click", function () {
    if (expression === "") {
        return;
    }

    var toEval = expression;
    toEval = toEval.replace(/×/g, "*");
    toEval = toEval.replace(/–/g, "-");

    try {
        var result = eval(toEval);
        expression = result.toString();
        updateDisplay();
    } catch (e) {
        display.textContent = "Error";
        expression = "";
    }
});

updateDisplay();
