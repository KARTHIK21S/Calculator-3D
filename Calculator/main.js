// Helper functions to access the values on the screen
function getHistoryValue() {
    return document.getElementById("history").innerText;
}

function printHistoryValue(value) {
    document.getElementById("history").innerText = value;
}

function getOutputValue() {
    return document.getElementById("output").innerText;
}

function printOutputValue(value) {
    document.getElementById("output").innerText = value;
}

// Format numbers with commas
function getFormattedNumber(num) {
    if (num === "-") return "";
    const n = Number(num);
    return n.toLocaleString('en');
}

// Reverse the formatted number
function reverseNumberFormat(num) {
    return num.replace(/,/g, "");
}

document.addEventListener("DOMContentLoaded", () => {
    // Operators click event handling
    const operators = document.querySelectorAll(".op__key");
    operators.forEach(op => {
        op.addEventListener("click", () => {
            if (op.id === "clear") {
                printHistoryValue("");
                printOutputValue("");
            } else if (op.id === "backspace") {
                let output = reverseNumberFormat(getOutputValue()).toString();
                if (output) {
                    output = output.slice(0, -1);
                    printOutputValue(output);
                }
            } else {
                let output = getOutputValue();
                let history = getHistoryValue();

                if (output === "" && history !== "") {
                    if (isNaN(history[history.length - 1])) {
                        history = history.slice(0, -1);
                    }
                }

                if (output !== "" || history !== "") {
                    output = output === "" ? output : reverseNumberFormat(output);
                    history += output;

                    if (op.id === "=") {
                        try {
                            const result = eval(history);
                            printOutputValue(result);
                            printHistoryValue("");
                        } catch (error) {
                            alert("Error: Invalid operation!");
                        }
                    } else {
                        history += op.id;
                        printHistoryValue(history);
                        printOutputValue("");
                    }
                }
            }
        });
    });

    // Number keys click event handling
    const numbers = document.querySelectorAll(".num__key");
    numbers.forEach(num => {
        num.addEventListener("click", () => {
            let output = reverseNumberFormat(getOutputValue());
            if (!isNaN(output)) {
                output += num.id;
                printOutputValue(output);
            }
        });
    });
});
