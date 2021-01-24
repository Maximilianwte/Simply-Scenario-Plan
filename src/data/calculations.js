import store from "../store";

let calculations = {
    calElectricity() {
        let input = store.state.input;
        var data = {};

        if (input.electricity.doKnowAmount) {
            data.electricityCost = input.electricity.electricityAmount * 0.3;
        } else if (input.electricity.doKnowCost) {
            data.kWh = input.electricity.electricityBill / 0.3;
        } else {
            data.kWh = 800 + input.electricity.peopleInHouse * 800;
            input.general.typeOfHouse != "Appartement" ? data.kWh + 400 : null;
            input.electricity.peopleInHouse > 4 ? data.kWh - 500 * (input.electricity.peopleInHouse - 5): null;
            data.electricityCost = data.kWh * 0.3;
        }

        return data;
    },
    calHeating() {
        let input = store.state.input;
        var data = {};

        if (input.heating.doKnowAmount) {
            switch (input.heating.doKnowType) {
                case "electricity": {
                    data.heatingCost = input.heating.heatingAmount * 0.3;
                    break;
                }
                case "oil": {
                    data.heatingCost = input.heating.heatingAmount * 0.056;
                    break;
                }
                case "gas": {
                    data.heatingCost = input.heating.heatingAmount * 0.0502;
                    break;
                }
                case "pellets", "wood": {
                    data.heatingCost = input.heating.heatingAmount * 0.049;
                    break;
                }
                case "heatpump": {
                    data.heatingCost = input.heating.heatingAmount * (0.3/2.8);
                    break;
                }
            }
        }
        else if (input.heating.doKnowCost) {
            switch (input.heating.doKnowType) {
                case "electricity": {
                    data.heatingAmount = input.heating.heatingCost / 0.3;
                    break;
                }
                case "oil": {
                    data.heatingAmount = input.heating.heatingCost / 0.056;
                    break;
                }
                case "gas": {
                    data.heatingAmount = input.heating.heatingCost / 0.0502;
                    break;
                }
                case "pellets", "wood": {
                    data.heatingAmount = input.heating.heatingCost / 0.049;
                    break;
                }
                case "heatpump": {
                    data.heatingAmount = input.heating.heatingCost / (0.3/2.8);
                    break;
                }
            }
        }
        return data;
    },
    calPV() {
        let input = store.state.input;
        if (input.general.haveHouse) {
            if (input.general.typeOfHouse != "Appartement") {
                var roofSpace = input.general.sizeOfHouse / input.general.nFloors;
            }
        }
        return null;
    },
    calWindowFoil() {
        let input = store.state.input;
        var data = {};
        // thats just a super random approximation, I take .3 of the squaremeters for start
        data.windowArea = input.general.sizeOfHouse * 0.3;
        data.cost = windowArea * 22;
        return data;
    }
}