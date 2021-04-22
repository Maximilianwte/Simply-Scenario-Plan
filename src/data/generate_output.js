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
    const scenarioVars = store.state.scenarioVariables;
    const inputData = this.aggregateImpacts();
    var calculationData = {
      likelihood: [],
      consequence: [],
    };
    for (var i = 0; i < outputVars.length; i++) {
      for (var j = 0; j < inputData[outputVars[i].title].length; j++) {
        // build array of all likelihoods and impacts first to check whats how high compared
        calculationData.likelihood.push(
          inputData[outputVars[i].title][j].pathProb
        );
        calculationData.consequence.push(
          inputData[outputVars[i].title][j].impact
        );
      }
    }
    calculationData.likelihood.sort((a, b) => a - b);
    calculationData.consequence.sort((a, b) => a - b);
    const quantil25 = (calculationData.likelihood.length / 4).toFixed(0),
      quantil75 = ((calculationData.likelihood.length / 4) * 3).toFixed(0);
    const breakPoints = {
      likelihood: {
        low: calculationData.likelihood[quantil25],
        medium: calculationData.likelihood[quantil75],
      },
      consequence: {
        low: calculationData.consequence[quantil25],
        medium: calculationData.consequence[quantil75],
      },
    };
    for (var i = 0; i < outputVars.length; i++) {
      output[outputVars[i].title] = {
        lowLLowC: inputData["Happiness"].filter(
          (item) =>
            item.pathProb <= breakPoints.likelihood.low &&
            item.impact <= breakPoints.consequence.low
        ),
        medLLowC: inputData["Happiness"].filter(
          (item) =>
            item.pathProb > breakPoints.likelihood.low &&
            item.pathProb <= breakPoints.likelihood.medium &&
            item.impact <= breakPoints.consequence.low
        ),
        highLLowC: inputData["Happiness"].filter(
          (item) =>
            item.pathProb > breakPoints.likelihood.medium &&
            item.impact <= breakPoints.consequence.low
        ),
        lowLMedC: inputData["Happiness"].filter(
            (item) =>
              item.pathProb <= breakPoints.likelihood.low &&
              item.impact > breakPoints.consequence.low &&
              item.impact <= breakPoints.consequence.medium
          ),
        medLMedC: inputData["Happiness"].filter(
          (item) =>
            item.pathProb > breakPoints.likelihood.low &&
            item.pathProb <= breakPoints.likelihood.medium &&
            item.impact > breakPoints.consequence.low &&
            item.impact <= breakPoints.consequence.medium
        ),
        highLMedC: inputData["Happiness"].filter(
            (item) =>
              item.pathProb > breakPoints.likelihood.medium &&
              item.impact > breakPoints.consequence.low &&
              item.impact <= breakPoints.consequence.medium
          ),
        lowLHighC: inputData["Happiness"].filter(
          (item) =>
            item.pathProb <= breakPoints.likelihood.low &&
            item.impact > breakPoints.consequence.medium
        ),
        medLHighC: inputData["Happiness"].filter(
          (item) =>
            item.pathProb > breakPoints.likelihood.low &&
            item.pathProb <= breakPoints.likelihood.medium &&
            item.impact > breakPoints.consequence.medium
        ),
        highLHighC: inputData["Happiness"].filter(
          (item) =>
            item.pathProb > breakPoints.likelihood.medium &&
            item.impact > breakPoints.consequence.medium
        ),
      };
      console.log(output)
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
