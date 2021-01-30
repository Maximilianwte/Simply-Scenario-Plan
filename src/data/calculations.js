import store from "../store";

let calculations = {
    calElectricity() {
        var input = store.state.input;

        if (input.electricity.doKnowAmount) {
            input.electricity.electricityCost = input.electricity.electricityAmount * 0.3;
        } else if (input.electricity.doKnowCost) {
            input.electricity.kWh = input.electricity.electricityBill / 0.3;
        } else {
            input.electricity.kWh = 800 + input.electricity.peopleInHouse * 800;
            input.electricity.general.typeOfHouse != "Appartement" ? input.electricity.kWh + 400 : null;
            input.electricity.peopleInHouse > 4 ? input.electricity.kWh - 500 * (input.electricity.peopleInHouse - 5) : null;
            input.electricity.electricityCost = input.electricity.kWh * 0.3;
        }
        // the commit should identify thats its electricity because the object
        // contains the electricity id
        store.commit("pushData", input.electricity);
        return input;
    },
    calHeating() {
        var input = store.state.input;

        if (input.heating.doKnowAmount) {
            switch (input.heating.doKnowType) {
                case "electricity": {
                    input.heating.heatingCost = input.heating.heatingAmount * 0.3;
                    break;
                }
                case "oil": {
                    input.heating.heatingCost = input.heating.heatingAmount * 0.056;
                    break;
                }
                case "gas": {
                    input.heating.heatingCost = input.heating.heatingAmount * 0.0502;
                    break;
                }
                case "pellets", "wood": {
                    input.heating.heatingCost = input.heating.heatingAmount * 0.049;
                    break;
                }
                case "heatpump": {
                    input.heating.heatingCost = input.heating.heatingAmount * (0.3 / 2.8);
                    break;
                }
            }
        } else if (input.heating.doKnowCost) {
            switch (input.heating.doKnowType) {
                case "electricity": {
                    input.heating.heatingAmount = input.heating.heatingCost / 0.3;
                    break;
                }
                case "oil": {
                    input.heating.heatingAmount = input.heating.heatingCost / 0.056;
                    break;
                }
                case "gas": {
                    input.heating.heatingAmount = input.heating.heatingCost / 0.0502;
                    break;
                }
                case "pellets", "wood": {
                    input.heating.heatingAmount = input.heating.heatingCost / 0.049;
                    break;
                }
                case "heatpump": {
                    input.heating.heatingAmount = input.heating.heatingCost / (0.3 / 2.8);
                    break;
                }
            }
        }
        store.commit("pushData", input.heating);
        return input;
    },
    calUpgrades() {

    },
    calPV() {
        var input = store.state.input;
        if (input.general.haveHouse) {
            if (input.general.typeOfHouse != "Appartement") {
                //var roofSpace = input.general.sizeOfHouse / input.general.nFloors;
                input.upgrades.PV.OutputKW = Math.round(input.electricity.electricityAmount * 2 * 500) / 500;
                if (input.upgrades.PV.OutputKW < 3000) {
                    input.upgrades.PV.investC = input.upgrades.PV.OutputKW * 1.4;
                } else if (input.upgrades.PV.OutputKW >= 3000 && input.electricity.electricityAmount < 6000) {
                    input.upgrades.PV.investC = 3000 * 1.4 + (input.upgrades.PV.OutputKW - 3000) * 0.8;
                } else if (input.upgrades.PV.OutputKW >= 6000 && input.electricity.electricityAmount < 10000) {
                    input.upgrades.PV.investC = 6000 * 1 + (input.upgrades.PV.OutputKW - 6000) * 0.8;
                } else {
                    input.upgrades.PV.investC = input.upgrades.PV.OutputKW * 0.8
                }
                input.upgrades.PV.savings = input.electricity.electricityAmount * 0.7 * 0.3 + input.upgrades.PV.OutputKW / 2 * 2400 * 0.3 * 0.1;
            }
        }
        store.commit("pushData", input.upgrades);
        return null;
    },
    calWindowFoil() {
        var input = store.state.input;
        // thats just a super random approximation, I take .3 of the squaremeters for start
        input.windowArea = input.general.sizeOfHouse * 0.3;
        input.cost = windowArea * 22;
        return data;
    },
    calLights() {
        var input = store.state.input;
        input.upgrades.lights.investC = int(input.general.sizeOfHouse / 4);
        input.upgrades.lights.savings = (input.electricity.electricityAmount / 70 * (60 - 8) * 4 * 300) / 1000 * 0.3;
        store.commit("pushData", input.heating);
    },
    calHeatPump() {
        var input = store.state.input;
        input.upgrades.heatPump.investC = 9000;
        if (input.general.sizeOfHouse > 89 && input.general.sizeOfHouse < 140) {
            input.upgrades.heatPump.investC = input.upgrades.heatPump.investC + 3000;
        }
        else if (nput.general.sizeOfHouse >= 140) {
            input.upgrades.heatPump.investC = input.upgrades.heatPump.investC + 6000;
        }
        //input.upgrades.heatPump.savings = "bisherigerPreisproKW" <- muss ich irgendwo speichern
    }
}

export default calculations;