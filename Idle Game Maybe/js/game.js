var money = 100;//0;
var money_increase_from_chocolate_selling = 1;
var sell_chocolate_button_string = 'Sell Chocolate Bar for $';
var money_decrease_for_chocolate_making = -0.5;
var chocolate_bars = 5;
var chocolate_bars_sold = -1;
var chocolate_bars_made = 1;
var marketing_price = -20;

function OnLoad() {
    //Initialise hidden elements.
    document.getElementById("make_chocolate").className.replace(" active", "");
    document.getElementById("make_chocolate").style.display = "none";
    document.getElementById("market_chocolate").className.replace(" active", "");
    document.getElementById("market_chocolate").style.display = "none";

    //Initialise market chocolate text.
    document.getElementById("market_chocolate").textContent =
        'Market Your Chocolate For $' + Math.abs(this.marketing_price);

    LoadOptions();

    //Setup unlocks array.
    unlocks_ = new Array(0);

    //Setup unlocks for functionality.
    CreateUnlocks();

    //Setup upgrades.
    SetUpUpgrades();

    //Initialise employees tab.
    SetUpEmployeesTab();

    //Make the site start on the upgrades tab.
    document.getElementById("upgrades_button").click();

    //Update all text to starting values.
    UpdateText();
}

function UpdateText() {
    CheckIfBuyable(0, 0);
    AddChocolateBarsMade(0);
    AddMoneyIncreaseFromChocolateSelling(0);
}

function SellChocolate(amount) {
    for (i = amount; i < 0; i++) {
        var money_increase = this.money_increase_from_chocolate_selling * Math.abs(i);
        if (CheckIfBuyable(money_increase, i)) {
            CheckUnlockConditions();
            return;
        }
    }
}

function MakeChocolate(amount) {
    for (i = amount; i > 0; i--) {
        var money_decrease = this.money_decrease_for_chocolate_making * Math.abs(i);
        if (CheckIfBuyable(money_decrease, i)) {
            CheckUnlockConditions();
            return;
        }
    }
}

function Market() {
    /*Check that the marketing is viable and that the player will be left with either
     some money or some chocolate bars on completion*/
    if (CheckIfBuyable(marketing_price, 0)) {
        AddMoneyIncreaseFromChocolateSelling(this.money_increase_from_chocolate_selling);
        this.marketing_price *= 3;
        document.getElementById("market_chocolate").textContent =
            'Market Your Chocolate For $' + Math.abs(this.marketing_price);

        CheckUnlockConditions();
    }
}

/*Check if an upgrade or something else is buyable by checking if there will be any 
 money or chocolate bars left afterwards to continue the game.*/
function CheckIfBuyable(money_added, chocolate_added) {
    if (money + money_added >= 0 && chocolate_bars + chocolate_added >= 0 &&
        (this.money + money_added > this.money_decrease_for_chocolate_making
        || this.chocolate_bars + chocolate_added > 0)) {
        this.money += money_added;
        document.getElementById("show_money").innerHTML = '$' + this.money;
        this.chocolate_bars += chocolate_added;
        document.getElementById("show_chocolate_bars").innerHTML =
            'Chocolate Bars: ' + this.chocolate_bars;
        return true;
    }
    return false;
}

function AddChocolateBarsSold(num) {
    this.chocolate_bars_sold += num;
    this.sell_chocolate_button_string = "Sell Up To " + Math.abs(this.chocolate_bars_sold)
        + " Chocolate Bar(s) for $";
    document.getElementById("increase_money").textContent =
        this.sell_chocolate_button_string
        + Math.abs(this.money_increase_from_chocolate_selling);
}

function AddChocolateBarsMade(num) {
    this.chocolate_bars_made += num;
    document.getElementById("make_chocolate").textContent =
        'Make Up To ' + Math.abs(this.chocolate_bars_made) + ' Chocolate Bar(s) for $' +
        Math.abs(this.money_decrease_for_chocolate_making) + ' each';
}

function AddMoneyIncreaseFromChocolateSelling(num) {
    this.money_increase_from_chocolate_selling += num;
    document.getElementById("increase_money").textContent =
        this.sell_chocolate_button_string
        + Math.abs(this.money_increase_from_chocolate_selling);
}

function CreateUnlocks() {
    AddUnlockToArray(
        function () {
            if (chocolate_bars == 0) {
                return true;
            }
            return false;
        }, 
        function () {
            var object = document.getElementById("make_chocolate");
            object.className += " active";
            object.className += " fadeIn";
            object.style.display = "inline-block";
		}
    );

    AddUnlockToArray(
        function () {
            if (money >= 20) {
                return true;
            }
            return false;
        },
        function () {
            var object = document.getElementById("market_chocolate");
            object.className += " active";
            object.className += " fadeIn";
            object.style.display = "inline-block";
        }
    );
}