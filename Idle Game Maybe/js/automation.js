var num_employees = 0;
var employees_buttons_div;
var employee_efficency = 0.25;

var num_employees_selling = 0;
var num_employees_making = 0;

var employee_cost = -100;

function SetUpEmployeesTab() {
    document.getElementById("employees_button").className.replace(" active", "");
    document.getElementById("employees_button").style.display = "none";
    employees_buttons_div = document.getElementById("employees");

    document.getElementById("employee_hire_info").textContent = "for $"
        + Math.abs(employee_cost);

    AddUnlockToArray(
        function () {
            if (money >= 100) {
                return true;
            }
            return false;
        },
        function () {
            var object = document.getElementById("employees_button");
            object.className += " active";
            object.className += " fadeIn";
            object.style.display = "inline-block";

            setInterval(UpdateAutomation(), 1000);
        }
    );
}

function UpdateAutomation() {
    SellChocolate(num_employees_selling * employee_efficency);
    MakeChocolate(num_employees_making * employee_efficency);
}

function HireEmployee() {
    if (CheckIfBuyable(employee_cost)) {
        AddEmployees(1);
        let new_button = document.createElement('button');
        new_button.textContent = 'Employee';
        employees_buttons_div.appendChild(new_button);
	}
}

function UpdateEmployees() {
	var num_sold = num_employees_selling * chocolate_bars_sold * employee_efficency;
}

function AddEmployees(num) {
    if (num_employees + num > 0) {
        num_employees += num;
        document.getElementById("employee_number").textContent = "You have "
            + num_employees + " employees!";
	}
}