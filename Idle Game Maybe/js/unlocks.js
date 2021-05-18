var unlocks_;

function AddUnlockToArray(condition, unlock) {
    this.unlocks_.push({ conditions: condition, unlocks: unlock });
}

function CheckUnlockConditions() {
    for (i = 0; i < this.unlocks_.length; i++) {
        if (unlocks_[i].conditions.func()) {
            switch (unlocks_[i].conditions.type) {
                case "Upgrade":
                    AddUpgrade(unlocks_[i].unlocks);
                    break;
                case "UI":
                    EditUI(unlocks_[i].unlocks);
                    break;
            }
            unlocks_.splice(i, 1);
            i--;
        }
    }
}