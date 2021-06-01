var unlocks_;
var num_times = 0;

function AddUnlockToArray(condition, unlock) {
    this.unlocks_.push({ conditions: condition, unlocks: unlock });
}

function CheckUnlockConditions() {
    for (i = 0; i < this.unlocks_.length; i++) {
        if (this.unlocks_[i].conditions()) {
            this.unlocks_[i].unlocks();
            this.unlocks_.splice(i, 1)
            i--;
        }
    }
}