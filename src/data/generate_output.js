import store from "../store";
let output_functions = {
    aggregateImpacts() {
        // build in connections here, currently its just all impacts
        // for all layers from layer 2 check if the vars are connected
        var output = {};
        const outputVars = store.state.outcomeVariables;
        const scenarioVars = store.state.scenarioVariables;
        // variator i: output variables, j: scenario layers, k: scenario variables in layer
        for (var i = 0; i < outputVars.length; i++) {
            for (var j = 0; j < scenarioVars.length; j++) {
                for (var k = 0; k < scenarioVars[j].length; k++) {
                    var curVar = scenarioVars[j][k]
                    if (curVar.impact[i] != null) {
                        var item = {
                            id : curVar.id,
                            title : curVar.title,
                            prob : curVar.prob,
                            impact : curVar.impact[i],
                            unit : curVar.unit[i],
                        };
                        outputVars[i].title in output ? output[outputVars[i].title].push(item) : output[outputVars[i].title] = [item]; 
                    }
                }
            }
        }
    return output;
    },
    buildRiskMatrixData() {
        var output = {};
        const outputVars = store.state.outcomeVariables;
        const scenarioVars = store.state.scenarioVariables;
        for (var i = 0; i < outputVars.length; i++) {
            for (var j = 0; j < scenarioVars.length; j++) {
                if (scenarioVars[j].impact[i] != 0) {
                    var item = {
                        id : scenarioVars[j].id,
                        title : scenarioVars[j].title,
                        prob : scenarioVars[j].prob,
                        impact : scenarioVars[j].impact,
                        unit : scenarioVars[j].unit,
                    };
                    output[outputVars[i]].length > 0 ? output[outputVars[i]].push(item) : output[outputVars[i]] = [item]; 
                }
            }
        }
    return output;
    }
}

export default output_functions;