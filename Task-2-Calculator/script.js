const display = document.getElementById("display");

function appendValue(value) {
    if (display.value === "0" || display.value === "Error") {
        display.value = value;
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    display.value = "0";
}

function deleteNumber() {
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = "0";
    }
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = "Error";
    }
}

document.addEventListener("keydown", function (event) {

    const key = event.key;

    if (
        !isNaN(key) ||
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "." ||
        key === "%"
    ) {
        appendValue(key);
    }

    if (key === "Enter" || key === "=") {
        calculate();
    }

    if (key === "Backspace") {
        deleteNumber();
    }

    if (key === "Escape") {
        clearDisplay();
    }
});