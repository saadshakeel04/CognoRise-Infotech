//import the required classes by DOM
document.addEventListener('DOMContentLoaded', () => {
    const inputBox = document.getElementById('input');
    const buttons = document.querySelectorAll('.grid button');
    let exp = ''; // This tells u about the ongoing calculative expression

    function updateDisplay(val) {
        inputBox.value = val;
    }

    function calculate() {
        try {
            exp = eval(exp).toString(); // Calculate the required expression 
        } catch (error) {
            exp = 'Error'; //Error handling
        }
        updateDisplay(exp); //then updates it
    }


    buttons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const buttonText = event.target.textContent;

            if (buttonText === 'AC') {
                exp = '';
                updateDisplay('0');
            } else if (buttonText === 'DEL') {
                exp = exp.slice(0, -1);//using slice for deleting 1 character(number), the last written 
                updateDisplay(exp || '0');//display expression or 0 if none there
            } else if (buttonText === '=') {
                calculate(); //equals tells u that we need to perform calculation
            } else {
                exp += buttonText;
                updateDisplay(exp);
            }
        });
    });

    //below is functionality to write numbers with keyboards
    document.addEventListener('keydown', (event) => {
        const key = event.key;

        if (!isNaN(key) || ['+', '-', '*', '/', '%', '.'].includes(key)) {

            exp += key;
            updateDisplay(exp);
            event.preventDefault(); //preventing duplicate

        } else if (key === 'Enter') {
            calculate();
            event.preventDefault(); 

        } else if (key === 'Backspace') {
            exp = exp.slice(0, -1); //removing last entered number
            updateDisplay(exp || '0');
            event.preventDefault();

        } else if (key.toLowerCase() === 'c') {
            exp = ''; //clears everything in input
            updateDisplay('0');
            event.preventDefault(); 
        }
    });
});
