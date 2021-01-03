let calculations = {
    calculate_electricity() {
        var data = {
            kWhKnown: true,
            kWh : 1440,
            electricityCost: 297
        }

        if (kWhKnown) {
            data.electricityCost = data.kWh * 0.3
        }
        else {
            data.kWh = data.electricityCost / 0.3
        }
        
        return data;
    }
}