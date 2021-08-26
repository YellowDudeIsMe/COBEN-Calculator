//COBEN Calculator (Testing #2)
//
//To use, go to https://rextester.com/l/js_online_compiler, paste the codes and run
//
//Thank you for other COBEN Calculators that inspired me to create this
//Thank you for my friends who helped me tested this
//Thank you for using this calculator
//The calculator is currently in its testing period, so it would be a pleasure for you to help me pointing out any errors or miscalculations, or even help me with the codes.
//               ~YellowDude
//
const playerPoints = [100, 50, 25, 0]; //Put the list of players' current points here. Remember to sort the list from the largest value to the smallest.
const addPoints = [100, 50, 25, 0]; //Put the list of event points here. Remember to sort the list from the largest value to the smallest. DO NOT put two or more identical values.
const roundToDecimal = 5; //The number of nearest decimals the results will be rounded to. For the sake of hiding floating-point errors, I've limited this number to be between 0 and 12. A value between 2 and 5 is recommended.

//Unless you know what you're doing, it is not recommended to change anything below this line.

let coben = [];
let lastCoben = 100;
let decimal = 0;
if (roundToDecimal > 12) {
    decimal = 12;
}
else if (roundToDecimal < 0) {
    decimal = 0;
}
else {
    decimal = roundToDecimal;
};

function modifiedSubsets(list) {
    let finalSubsets = [list];
    let length1 = list.length
    for (let i = 0; i < length1; i++) {
        let length2 = finalSubsets.length;
        for (let k = 0; k < length2; k++) {
            let newElement = finalSubsets[k].slice(0);
            newElement[i] = newElement[i].slice(0, newElement[i].length - 1);
            finalSubsets = finalSubsets.concat([newElement]);
        };
    };
    return finalSubsets;
};

function tieAdd(list) {
    let finalAdd = 0;
    for (let i = 0; i < list.length; i++) {
        let divi = 0;
        let subset = list[i];
        let add = 1;
        for (let k = 0; k < subset.length; k++) {
            for (let n = 0; n < subset[k].length; n++) {
                add *= subset[k][n];
            };
            if (list[0][k].length > subset[k].length) {
                add *= list[0][k].length;
                divi++;
            };
        };
        add /= (divi + 1);
        finalAdd += add;
    };
    return finalAdd;
};

for (let pP = 0; pP < playerPoints.length - 1; pP++) {
    let cobenThis = 0;
    for (let aP = addPoints.length - 1; aP > addPoints.length - pP - 2; aP--) {
        let cobenCase = 100;
        let countP = playerPoints.length - 1;
        let countA = 0;
        let immune = 1;
        let divi = 1;
        let tie = [];
        let tieA = -1;
        let passP = 0;
        let passA = 0;
        while (countP > -1) {
            if (countP != pP && countA != aP) {
                if (playerPoints[countP] + addPoints[countA] > playerPoints[pP] + addPoints[aP]) {
                    if (countA > addPoints.length - 2 || (countA > addPoints.length - 3 && aP == addPoints.length - 1)) {
                        cobenCase *= immune / divi;
                        countP--;
                        immune++;
                        divi++;
                    }
                    else {
                        countA++;
                    };
                }
                else {
                    if (playerPoints[countP] + addPoints[countA] == playerPoints[pP] + addPoints[aP]) {
                        if (tieA == countA) {
                            tie[(tie.length - 1)] = tie[(tie.length - 1)].concat([countA - (playerPoints.length - countP - passP - 1) - passA]);
                        }
                        else {
                            tie = tie.concat([[countA - (playerPoints.length - countP - passP - 1) - passA]]);
                            tieA = countA;
                        };
                    }
                    else {
                        cobenCase *= (countA - (playerPoints.length - countP - passP - 1) - passA);
                    };
                    cobenCase = cobenCase / divi;
                    countP--;
                    divi++;
                };
            }
            else {
                if (countP == pP) {
                    countP--;
                    passP = 1;
                };
                if (countA == aP) {
                    countA++;
                    passA = 1;
                };
            };
        };
        cobenCase *= tieAdd(modifiedSubsets(tie)) / divi;
        cobenThis += cobenCase;
    };
    coben = coben.concat([cobenThis]);
};

for (let i = 0; i < coben.length; i++) {
    lastCoben -= coben[i];
};

coben.push(lastCoben);

print("------- COBEN ---------------")
for (let i = 0; i < coben.length; i++) {
    print("Contestant #" + (i + 1) + " : " + (Math.round(coben[i] * Math.pow(10, decimal)) / Math.pow(10, decimal)) + "%");
};