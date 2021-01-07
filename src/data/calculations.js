import store from "../store";

let calculations = {
    calElectricity() {
        let input = store.state.input;
        var data = {}

        if (input.electricity.doKnowAmount) {
            data.electricityCost = input.electricity.electricityAmount * 0.3
        }
        else {
            data.kWh = input.electricity.electricityBill / 0.3
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
    }
}