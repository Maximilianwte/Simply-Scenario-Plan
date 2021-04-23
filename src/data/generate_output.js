import store from "../store";
let output_functions = {
  aggregateImpacts() {
    // Used to aggregate all scenario impacts and include path probabilities
    var output = {};
    const outputVars = store.state.outcomeVariables;
    const scenarioVars = store.state.scenarioVariables;
    const connectedShapes = store.state.connectedShapes;
    // variator i: output variables, j: scenario layers, k: scenario variables in layer, l: connections
    for (var i = 0; i < outputVars.length; i++) {
      output[outputVars[i].title] = [];
      for (var j = 0; j < scenarioVars.length; j++) {
        // If j > 0, it's the second scenario layer or more
        if (j > 0) {
          for (var k = 0; k < scenarioVars[j].length; k++) {
            var curVar = scenarioVars[j][k];
            var shapeID = "scenarioVariables_" + (j + 1) + "#" + curVar.id;
            // find if the shape is somewhere in connections
            var connectionIndex = undefined;
            for (var l = 0; l < connectedShapes.length; l++) {
              var connectionIndex = connectedShapes[l].findIndex(
                (item) => item == shapeID
              );
              if (connectionIndex != -1) {
                var otherIndex = connectionIndex == 0 ? 1 : 0;
                // first item in here is the list, second one is the varId
                var pathOtherVar = {
                  scenarioLayer: connectedShapes[l][otherIndex].substring(
                    connectedShapes[l][otherIndex].indexOf("_") + 1,
                    connectedShapes[l][otherIndex].indexOf("#")
                  ),
                  varId: connectedShapes[l][otherIndex].substring(
                    connectedShapes[l][otherIndex].indexOf("#") + 1
                  ),
                };
                var otherObject = output[outputVars[i].title].find(
                  (element) =>
                    element.list == pathOtherVar.scenarioLayer &&
                    element.id == pathOtherVar.varId
                );
                if (curVar.impact[i] != null) {
                  var item = {
                    id: curVar.id,
                    list: j + 1,
                    title: curVar.title,
                    prob: curVar.prob,
                    pathProb: (
                      (curVar.prob / 100) *
                      (otherObject.pathProb / 100) *
                      100
                    ).toFixed(2),
                    impact: curVar.impact[i],
                    unit: curVar.unit[i],
                  };
                  outputVars[i].title in output
                    ? output[outputVars[i].title].push(item)
                    : (output[outputVars[i].title] = [item]);
                }
                break;
              }
            }
          }
        } else {
          for (var k = 0; k < scenarioVars[j].length; k++) {
            var curVar = scenarioVars[j][k];
            if (curVar.impact[i] != null) {
              var item = {
                id: curVar.id,
                list: j + 1,
                title: curVar.title,
                prob: curVar.prob,
                pathProb: curVar.prob,
                impact: curVar.impact[i],
                unit: curVar.unit[i],
              };
              outputVars[i].title in output
                ? output[outputVars[i].title].push(item)
                : (output[outputVars[i].title] = [item]);
            }
          }
        }
      }
    }
    return output;
  },
  buildRiskMatrixData() {
    var output = {};
    const outputVars = store.state.outcomeVariables;
    const inputData = this.aggregateImpacts();
    var calculationData = {
      likelihood: [],
      consequence: [],
    };
    for (var i = 0; i < outputVars.length; i++) {
      for (var j = 0; j < inputData[outputVars[i].title].length; j++) {
        // calculate impact as number instead of "k", "m", "b" units
        switch (inputData[outputVars[i].title][j].unit) {
          case " ": {
            var multiplier = 1;
            break;
          }
          case "k": {
            multiplier = 1000;
            break;
          }
          case "m": {
            multiplier = 1*10**6;
            break;
          }
          case "b": {
            multiplier = 1*10**9;
            break;
          }
          default: {
            multiplier = 1;
            break;
          }
        }
        inputData[outputVars[i].title][j].impactAsAbsNumber = Math.abs(inputData[outputVars[i].title][j].impact * multiplier);
        // build array of all likelihoods and impacts first to check whats how high compared
        calculationData.likelihood.push(
          inputData[outputVars[i].title][j].pathProb
        );
        calculationData.consequence.push(
          inputData[outputVars[i].title][j].impactAsAbsNumber
        );
      }
    }
    calculationData.likelihood.sort((a, b) => a - b);
    calculationData.consequence.sort((a, b) => a - b);
    const medianL = calculationData.likelihood[(calculationData.likelihood.length / 2).toFixed(0)],
    medianC = calculationData.consequence[(calculationData.likelihood.length / 2).toFixed(0)]

    for (var i = 0; i < outputVars.length; i++) {
      output[outputVars[i].title] = {
        lowLLowC: inputData[outputVars[i].title].filter(
          (item) =>
            item.pathProb <= (medianL * 0.66) &&
            item.impactAsAbsNumber <= (medianC * 0.66)
        ),
        medLLowC: inputData[outputVars[i].title].filter(
          (item) =>
            item.pathProb > (medianL * 0.66) &&
            item.pathProb <= (medianL * 1.75) &&
            item.impactAsAbsNumber <= (medianC * 0.66)
        ),
        highLLowC: inputData[outputVars[i].title].filter(
          (item) =>
            item.pathProb > (medianL * 1.75) &&
            item.impactAsAbsNumber <= (medianC * 0.66)
        ),
        lowLMedC: inputData[outputVars[i].title].filter(
            (item) =>
              item.pathProb <= (medianL * 0.66) &&
              item.impactAsNumber > (medianC * 0.66) &&
              item.impactAsAbsNumber <= (medianC * 1.75)
          ),
        medLMedC: inputData[outputVars[i].title].filter(
          (item) =>
            item.pathProb > (medianL * 0.66) &&
            item.pathProb <= (medianL * 1.75) &&
            item.impactAsAbsNumber > (medianC * 0.66) &&
            item.impactAsAbsNumber <= (medianC * 1.75)
        ),
        highLMedC: inputData[outputVars[i].title].filter(
            (item) =>
              item.pathProb > (medianL * 1.75) &&
              item.impactAsAbsNumber > (medianC * 0.66) &&
              item.impactAsAbsNumber <= (medianC * 1.75)
          ),
        lowLHighC: inputData[outputVars[i].title].filter(
          (item) =>
            item.pathProb <= (medianL * 0.66) &&
            item.impactAsAbsNumber > (medianC * 1.75)
        ),
        medLHighC: inputData[outputVars[i].title].filter(
          (item) =>
            item.pathProb > (medianL * 0.66) &&
            item.pathProb <= (medianL * 1.75) &&
            item.impactAsAbsNumber > (medianC * 1.75)
        ),
        highLHighC: inputData[outputVars[i].title].filter(
          (item) =>
            item.pathProb > (medianL * 1.75) &&
            item.impactAsAbsNumber > (medianC * 1.75)
        ),
      };
    }
    return output;
  },
  buildDistribution() {
    const data = this.buildRiskMatrixData();
    const outputVarNames = Object.keys(data);
    var output = {};

    for (var i = 0; i < outputVarNames.length; i++) {
      var curOutputVarName = outputVarNames[i];
      for (var j = 0; j < data[curOutputVarName].length; j++) {
        if (curOutputVarName in output) {
          var currentImpact = output[curOutputVarName].find(
            (item) => item.impact == data[curOutputVarName][j].impact
          );
          if (currentImpact == undefined) {
            output[curOutputVarName].push({
              impact: data[curOutputVarName][j].impact,
              prob: data[curOutputVarName][j].prob,
            });
          } else {
            // the point to test: does it work if I add to the reference?
            currentImpact.prob =
              currentImpact.prob + data[curOutputVarName][j].prob;
          }
        } else {
          output[curOutputVarName] = [
            {
              impact: data[curOutputVarName][j].impact,
              prob: data[curOutputVarName][j].prob,
            },
          ];
        }
      }
    }
    return output;
  },
};

export default output_functions;
