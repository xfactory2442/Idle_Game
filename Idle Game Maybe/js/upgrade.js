var upgrade_id;

function AddUpgrade(upgrade) {
    let new_div = document.createElement("div");
    new_div.id = upgrade.uniqueid;
    let new_button = document.createElement('button');
    new_button.textContent = '$' + upgrade.cost;
    let new_text = document.createElement('text');
    new_text.textContent = upgrade.description;
    new_button.onclick = function () {
        if (CheckIfBuyable(-upgrade.cost, 0)) {
            InterpretUpgrade(upgrade.type, upgrade.amount);
            document.getElementById(upgrade.uniqueid).remove();
        }
    }
    new_div.appendChild(new_button);
    new_div.appendChild(new_text);
    upgrade_id.appendChild(new_div);
}

function InterpretUpgrade(type, num) {
    switch (String(type)) {
        case "MultiplySell":
            AddChocolateBarsSold(chocolate_bars_sold * (num - 1));
            break;
        case "MultiplyCreate":
            AddChocolateBarsMade(chocolate_bars_made * (num - 1));
            break;
    }
}

function SetUpUpgrades() {
    upgrade_id = document.getElementById('upgrades_tab');

    //Add all upgrades to unlocks.
    AddUnlockToArray(
        function () {
            if (money >= 10) {
                return true;
            }
            return false;
        },
        function () {
            AddUpgrade({
                uniqueid: "sell1",
                description: "Multiply Amount of Chocolate Bars Sold per Click by 2",
                type: "MultiplySell",
                amount: 2,
                cost: 10
            })
        }
    );

    AddUnlockToArray(
        function () {
            if (money >= 30) {
                return true;
            }
            return false;
        },
        function () {
            AddUpgrade({
                uniqueid: "make",
                description: "Multiply Amount of Chocolate Bars Made per Click by 2",
                type: "MultiplyCreate",
                amount: 2,
                cost: 30
            })
        }
    );
}