import store from "../store";
let output_functions = {
    aggregateImpacts() {
        const outputVars = store.state.outcomeVariables;
        const connections = store.state.connectedShapes;
        const scenarioVars = store.state.scenarioVariables;
        for (var indexOutputVar = 0; indexOutputVar < outputVars.length; indexOutputVar++) {
            
        }
    }
}

export default output_functions;