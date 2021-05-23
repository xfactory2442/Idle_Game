var money = 0;
var money_increase_from_chocolate_selling = 1;
var sell_chocolate_button_string = 'Sell Chocolate Bar for $';
var money_decrease_for_chocolate_making = 0.5;
var chocolate_bars = 5;
var chocolate_bars_sold = 1;
var chocolate_bars_made = 1;
var marketing_price = 20;

function OnLoad() {
    //Initialise hidden elements.
    document.getElementById("make_chocolate").className.replace(" active", "");
    document.getElementById("make_chocolate").style.display = "none";
    document.getElementById("market_chocolate").className.replace(" active", "");
    document.getElementById("market_chocolate").style.display = "none";

    //Make the site start on the upgrades tab.
    document.getElementById("upgrades_button").click();

    //Initialise market chocolate text.
    document.getElementById("market_chocolate").textContent =
        'Market Your Chocolate For $' + this.marketing_price;

    LoadOptions();

    //Update all text to starting values.
    Update();

    //Setup unlocks array.
    unlocks_ = new Array(0);

    //Setup unlocks for functionality.
    CreateUnlocks();

    //Setup upgrades.
    SetUpUpgrades();
}

function Update() {
    AddMoney(0);
    AddChocolateBars(0);
    AddChocolateBarsMade(0);
    AddMoneyIncreaseFromChocolateSelling(0);
}

function IncreaseMoneyFromClick() {
    for (i = this.chocolate_bars_sold; i > 0; i--) {
        if (AddChocolateBars(-i)) {
            AddMoney(this.money_increase_from_chocolate_selling * i);
            CheckUnlockConditions();
            return;
        }
    }
}

function MakeChocolate() {
    for (i = this.chocolate_bars_made; i > 0; i--) {
        var money_decrease = this.money_decrease_for_chocolate_making * i;
        if (AddMoney(-money_decrease)) {
            AddChocolateBars(i);
            CheckUnlockConditions();
            return;
        }
    }
}

function Market() {
    /*Check that the marketing is viable and that the player will be left with either
     some money or some chocolate bars on completion*/
    if (CheckIfBuyable(marketing_price) && AddMoney(-marketing_price)) {
        AddMoneyIncreaseFromChocolateSelling(this.money_increase_from_chocolate_selling);
        this.marketing_price *= 3;
        document.getElementById("market_chocolate").textContent =
            'Market Your Chocolate For $' + this.marketing_price;

        CheckUnlockConditions();
    }
}

/*Check if an upgrade or something else is buyable by checking if there will be any 
 money or chocolate bars left afterwards to continue the game.*/
function CheckIfBuyable(cost) {
    if ((this.money - cost > this.money_decrease_for_chocolate_making || this.chocolate_bars > 0)) {
        return true;
    }
    return false;
}

function AddMoney(num) {
    if (this.money + num >= 0) {
        this.money += num;
        document.getElementById("show_money").innerHTML = '$' + this.money;
        return true;
    }
    return false;
}

function AddChocolateBars(num) {
    if (this.chocolate_bars + num >= 0) {
        this.chocolate_bars += num;
        document.getElementById("show_chocolate_bars").innerHTML =
            'Chocolate Bars: ' + this.chocolate_bars;
        return true;
    }
    return false;
}

function AddChocolateBarsSold(num) {
    this.chocolate_bars_sold += num;
    this.sell_chocolate_button_string = "Sell Up To " + this.chocolate_bars_sold +
        " Chocolate Bar(s) for $";
    document.getElementById("increase_money").textContent =
        this.sell_chocolate_button_string + this.money_increase_from_chocolate_selling;
}

function AddChocolateBarsMade(num) {
    this.chocolate_bars_made += num;
    document.getElementById("make_chocolate").textContent =
        'Make Up To ' + this.chocolate_bars_made + ' Chocolate Bar(s) for $' +
        this.money_decrease_for_chocolate_making + ' each';
}

function AddMoneyIncreaseFromChocolateSelling(num) {
    this.money_increase_from_chocolate_selling += num;
    document.getElementById("increase_money").textContent =
        this.sell_chocolate_button_string + this.money_increase_from_chocolate_selling;
}

function EditUI(unlock) {
    var object = document.getElementById(unlock.name);
    if (unlock.type == "appear") {
        object.className += " active";
        object.className += " fadeIn";
        object.style.display = "inline-block";
        
    }
    else if (unlock.type == "dissapear") {
        object.className.replace(" active", "");
        object.className.replace(" fadeIn", "");
        object.style.display = "none";
    }
}

function CreateUnlocks() {
    AddUnlockToArray({
        type: "UI",
        func: function () {
            if (chocolate_bars == 0) {
                return true;
            }
            return false;
        }
    }, {
        type: "appear",
        name: "make_chocolate",
        action: true
    });

    AddUnlockToArray({
        type: "UI",
        func: function () {
            if (money >= 20) {
                return true;
            }
            return false;
        }
    }, {
        type: "appear",
        name: "market_chocolate",
        action: true
    });
}