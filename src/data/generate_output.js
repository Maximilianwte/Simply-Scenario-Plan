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
                if (output[outputVars[i].title].length > 0) {
                  var otherObject = output[outputVars[i].title].find(
                    (element) =>
                    element.list == pathOtherVar.scenarioLayer &&
                    element.id == pathOtherVar.varId
                  );
                  if (otherObject == undefined) {
                    console.log("outputVar ", outputVars[i].title);
                    console.log(
                      "data in that var ",
                      output[outputVars[i].title].length
                    );
                    console.log(
                      "pathOtherVar that coudlnt be found ",
                      pathOtherVar
                    );
                    /* connectedShapes.splice(l, 1);
                    break; */
                  }
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
                    outputVars[i].title in output ?
                      output[outputVars[i].title].push(item) :
                      (output[outputVars[i].title] = [item]);
                  }
                  break;
                }
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
              outputVars[i].title in output ?
                output[outputVars[i].title].push(item) :
                (output[outputVars[i].title] = [item]);
            }
          }
        }
      }
    }
    return output;
  },
  aggregateToProcess() {
    var output = {};
    const outputVars = store.state.outcomeVariables;
    const scenarioVars = store.state.scenarioVariables;

    for (var i = 0; i < outputVars.length; i++) {
      output[outputVars[i].title] = [];
      output[outputVars[i].title][0] = [];
      // Fill all layer 1 scemario variables

      for (var j = 0; j < scenarioVars[0].length; j++) {
        if (
          scenarioVars[0][j].impact[i] != undefined
        ) {
          output[outputVars[i].title][0].push({
            title: scenarioVars[0][j].title,
            id: scenarioVars[0][j].id,
            prob: scenarioVars[0][j].prob,
            pathProb: scenarioVars[0][j].prob,
            impact: scenarioVars[0][j].impact[i],
            unit: scenarioVars[0][j].unit[i],
            color: scenarioVars[0][j].color,
          });
          // Here add that findConnected goes over the next layer as well -> so copy
          // copy the loop and build below where 0 is replaced with iteration
          var connectedVarPaths = this.findConnectedVariables(
            0,
            output[outputVars[i].title][0][j].id
          );
          for (var k = 0; k < connectedVarPaths.length; k++) {
            var layerInObject = connectedVarPaths[k].scenarioLayer - 1;
            var idInObject = connectedVarPaths[k].varId;
            output[outputVars[i].title][layerInObject] == undefined ?
              (output[outputVars[i].title][layerInObject] = []) :
              null;
            if (
              output[outputVars[i].title][layerInObject].find(
                item => (item.id == idInObject)
              ) == undefined
            ) {
              output[outputVars[i].title][layerInObject].push({
                title: scenarioVars[layerInObject][idInObject].title,
                id: scenarioVars[layerInObject][idInObject].id,
                prob: scenarioVars[layerInObject][idInObject].prob,
                // here I should multiply with the var before
                pathProb: scenarioVars[layerInObject][idInObject].prob,
                impact: scenarioVars[layerInObject][idInObject].impact[i],
                unit: scenarioVars[layerInObject][idInObject].unit[i],
                color: scenarioVars[layerInObject][idInObject].color,
              });
            }
          }
        }
      }
      /*       for (var j = 1; j < output[outputVars[i].title].length; j++) {
              for (var l = 0; l < output[outputVars[i].title][j].length; l++) {
                var connectedVarPaths = this.findConnectedVariables(
                  j,
                  output[outputVars[i].title][j][l].id
                );
                for (var k = 0; k < connectedVarPaths.length; k++) {
                  var layerInObject = connectedVarPaths[k].scenarioLayer - 1;
                  var idInObject = connectedVarPaths[k].varId;
                  output[outputVars[i].title][layerInObject] == undefined
                    ? (output[outputVars[i].title][layerInObject] = [])
                    : null;
                  if (
                    output[outputVars[i].title][layerInObject].find(
                      item => (item.id == idInObject)
                    ) == undefined
                  ) {
                    console.log(output[outputVars[i].title][layerInObject])
                    console.log(scenarioVars[layerInObject][idInObject].title)
                    output[outputVars[i].title][layerInObject].push({
                      title: scenarioVars[layerInObject][idInObject].title,
                      id: scenarioVars[layerInObject][idInObject].id,
                      prob: scenarioVars[layerInObject][idInObject].prob,
                      // here I should multiply with the var before
                      pathProb: scenarioVars[layerInObject][idInObject].prob,
                      impact: scenarioVars[layerInObject][idInObject].impact[i],
                      unit: scenarioVars[layerInObject][idInObject].unit[i],
                      color: scenarioVars[layerInObject][idInObject].color,
                    });
                  }
                }
              }
            } */
    }
    return output;
  },
  buildRiskMatrixData() {
    var output = {};
    const outputVars = store.state.outcomeVariables;
    const inputData = this.aggregateImpacts();
    for (var i = 0; i < outputVars.length; i++) {
      var calculationData = {
        likelihood: [],
        consequence: [],
      };
      inputData[outputVars[i].title] = inputData[outputVars[i].title].filter(
        (item) => item.impact != 0
      );

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
            multiplier = 1 * 10 ** 6;
            break;
          }
          case "b": {
            multiplier = 1 * 10 ** 9;
            break;
          }
          default: {
            multiplier = 1;
            break;
          }
        }
        inputData[outputVars[i].title][j].impactAsAbsNumber = Math.abs(
          inputData[outputVars[i].title][j].impact * multiplier
        );
        // build array of all likelihoods and impacts first to check whats how high compared
        calculationData.likelihood.push(
          inputData[outputVars[i].title][j].pathProb
        );
        calculationData.consequence.push(
          inputData[outputVars[i].title][j].impactAsAbsNumber
        );
      }

      calculationData.likelihood.sort((a, b) => a - b);
      calculationData.consequence.sort((a, b) => a - b);
      const medianL =
        calculationData.likelihood[
          (calculationData.likelihood.length / 2).toFixed(0) - 1
        ],
        medianC =
        calculationData.consequence[
          (calculationData.likelihood.length / 2).toFixed(0) - 1
        ];
      output[outputVars[i].title] = {
        lowLLowC: inputData[outputVars[i].title].filter(
          (item) =>
          item.pathProb <= medianL * 0.66 &&
          item.impactAsAbsNumber <= medianC * 0.66
        ),
        medLLowC: inputData[outputVars[i].title].filter(
          (item) =>
          item.pathProb > medianL * 0.66 &&
          item.pathProb <= medianL * 1.75 &&
          item.impactAsAbsNumber <= medianC * 0.66
        ),
        highLLowC: inputData[outputVars[i].title].filter(
          (item) =>
          item.pathProb > medianL * 1.75 &&
          item.impactAsAbsNumber <= medianC * 0.66
        ),
        lowLMedC: inputData[outputVars[i].title].filter(
          (item) =>
          item.pathProb <= medianL * 0.66 &&
          item.impactAsAbsNumber > medianC * 0.66 &&
          item.impactAsAbsNumber <= medianC * 1.75
        ),
        medLMedC: inputData[outputVars[i].title].filter(
          (item) =>
          item.pathProb > medianL * 0.66 &&
          item.pathProb <= medianL * 1.75 &&
          item.impactAsAbsNumber > medianC * 0.66 &&
          item.impactAsAbsNumber <= medianC * 1.75
        ),
        highLMedC: inputData[outputVars[i].title].filter(
          (item) =>
          item.pathProb > medianL * 1.75 &&
          item.impactAsAbsNumber > medianC * 0.66 &&
          item.impactAsAbsNumber <= medianC * 1.75
        ),
        lowLHighC: inputData[outputVars[i].title].filter(
          (item) =>
          item.pathProb <= medianL * 0.66 &&
          item.impactAsAbsNumber > medianC * 1.75
        ),
        medLHighC: inputData[outputVars[i].title].filter(
          (item) =>
          item.pathProb > medianL * 0.66 &&
          item.pathProb <= medianL * 1.75 &&
          item.impactAsAbsNumber > medianC * 1.75
        ),
        highLHighC: inputData[outputVars[i].title].filter(
          (item) =>
          item.pathProb > medianL * 1.75 &&
          item.impactAsAbsNumber > medianC * 1.75
        ),
      };
    }
    return output;
  },
  buildDistribution() {
    var output = {};
    const outputVars = store.state.outcomeVariables;
    const inputData = this.aggregateImpacts();

    for (var i = 0; i < outputVars.length; i++) {
      var calculationData = {
        likelihood: [],
        consequence: [],
      };
      inputData[outputVars[i].title] = inputData[outputVars[i].title].filter(
        (item) => item.impact != 0
      );
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
            multiplier = 1 * 10 ** 6;
            break;
          }
          case "b": {
            multiplier = 1 * 10 ** 9;
            break;
          }
          default: {
            multiplier = 1;
            break;
          }
        }
        inputData[outputVars[i].title][j].impactAsNumber =
          inputData[outputVars[i].title][j].impact * multiplier;
        // build array of all likelihoods and impacts first to check whats how high compared
        calculationData.consequence.push(
          inputData[outputVars[i].title][j].impactAsNumber
        );
      }

      calculationData.consequence.sort((a, b) => a - b);

      output[outputVars[i].title] = {
        labels: [" "],
        series: [
          [0]
        ],
      };

      for (var j = 0; j < calculationData.consequence.length; j++) {
        var filteredItems = inputData[outputVars[i].title].filter(
          (item) => item.impactAsNumber == calculationData.consequence[j]
        );
        filteredItems.forEach(function (item) {
          if (item.pathProb != 0) {
            output[outputVars[i].title].labels.push(item.impact + item.unit);
            output[outputVars[i].title].series[0].push(
              (item.pathProb / 100).toFixed(3)
            );
          }
        });
      }

      output[outputVars[i].title].labels.push("");
      output[outputVars[i].title].series[0].push(0);
    }
    return output;
  },
  buildText2() {
    var output = {};
    const outputVars = store.state.outcomeVariables;
    const inputData = this.aggregateImpacts();
    for (var i = 0; i < outputVars.length; i++) {
      var calculationData = {
        likelihood: [],
        consequence: [],
        consequenceAbs: [],
      };
      inputData[outputVars[i].title] = inputData[outputVars[i].title].filter(
        (item) => item.impact != 0
      );
      if (inputData[outputVars[i].title].length != 0) {
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
              multiplier = 1 * 10 ** 6;
              break;
            }
            case "b": {
              multiplier = 1 * 10 ** 9;
              break;
            }
            default: {
              multiplier = 1;
              break;
            }
          }
          inputData[outputVars[i].title][j].impactAsNumber = inputData[outputVars[i].title][j].impact * multiplier;
          inputData[outputVars[i].title][j].impactAsAbsNumber = Math.abs(
            inputData[outputVars[i].title][j].impactAsNumber
          );

          // build array of all likelihoods and impacts first to check whats how high compared
          calculationData.likelihood.push(
            inputData[outputVars[i].title][j].pathProb
          );
          calculationData.consequenceAbs.push(
            inputData[outputVars[i].title][j].impactAsAbsNumber
          );
          calculationData.consequence.push(
            inputData[outputVars[i].title][j].impactAsNumber
          );
        }

        calculationData.likelihood.sort((a, b) => a - b);
        calculationData.consequence.sort((a, b) => a - b);
        calculationData.consequenceAbs.sort((a, b) => a - b);
        const medianL =
          calculationData.likelihood[
            (calculationData.likelihood.length / 2).toFixed(0) - 1
          ],
          medianC =
          calculationData.consequence[
            (calculationData.likelihood.length / 2).toFixed(0) - 1
          ];

        // build text for var with maximum positive consequence
        var variable = inputData[outputVars[i].title].find(item => item.impactAsNumber == calculationData.consequence[calculationData.consequence.length - 1])
        var slctText = "The variable with the highest positive impact for success in variable {outputvar} is {variable}. The impact is {impact} and the estimated probability for occuring is {prob} %. Is there any way of increasing the likelihood that variable {variable} occurs?"
        slctText = slctText.replace("{outputvar}", outputVars[i].title);
        slctText = slctText.replace("{variable}", variable.title);
        slctText = slctText.replace("{variable}", variable.title);
        slctText = slctText.replace("{impact}", variable.impact + " " + variable.unit);
        slctText = slctText.replace("{prob}", variable.pathProb);
        var slctTextMaxC = slctText;

        // build text for var with maximum negative consequence
        variable = inputData[outputVars[i].title].find(item => item.impactAsNumber == calculationData.consequence[0])
        slctText = "The variable with the highest negative impact for success in variable {outputvar} is {variable}. The impact is {impact} and the estimated probability for occuring is {prob} %. Is there any way, you could lower the likelihood of that variable {variable} occuring?"
        slctText = slctText.replace("{outputvar}", outputVars[i].title);
        slctText = slctText.replace("{variable}", variable.title);
        slctText = slctText.replace("{variable}", variable.title);
        slctText = slctText.replace("{impact}", variable.impact + " " + variable.unit);
        slctText = slctText.replace("{prob}", variable.pathProb);
        var slctTextMaxNegC = slctText;

        // build text for var with maximum likelihood thats positive.
        // does that work?
        var varsToSort = inputData[outputVars[i].title].filter(item => item.impactAsNumber > 0);
        varsToSort = varsToSort.map(item => item.pathProb);
        varsToSort.sort((a, b) => a - b);
        variable = inputData[outputVars[i].title].filter(item => item.impactAsNumber > 0).find(item => item.pathProb == varsToSort[varsToSort.length - 1])
        if (variable != undefined) {
          var slctText = 'The variable with the highest likelihood and a positive impact for variable "{outputvar}" is "{variable}". The estimated probability for occuring is {prob} % and the the impact if the variable occurs is {impact}. Is there any way of increasing the likelihood that variable "{variable}" occurs even further?'
          slctText = slctText.replace("{outputvar}", outputVars[i].title);
          slctText = slctText.replace("{variable}", variable.title);
          slctText = slctText.replace("{variable}", variable.title);
          slctText = slctText.replace("{impact}", variable.impact + " " + variable.unit);
          slctText = slctText.replace("{prob}", variable.pathProb);
          var slctTextMaxL = slctText;
        }

        // build text for var with maximum likelihood thats negative.
        varsToSort = inputData[outputVars[i].title].filter(item => item.impactAsNumber < 0);
        varsToSort = varsToSort.map(item => item.pathProb);
        varsToSort.sort((a, b) => a - b);
        variable = inputData[outputVars[i].title].filter(item => item.impactAsNumber < 0).find(item => item.pathProb == varsToSort[varsToSort.length - 1]);
        if (variable != undefined) {
          var slctText = 'The variable with the highest likelihood and a negative impact for variable "{outputvar}" is "{variable}". The estimated probability for occuring is {prob} % and the the impact if the variable occurs is {impact}. Is there any way of lowering the likelihood that variable "{variable}" occurs?'
          slctText = slctText.replace("{outputvar}", outputVars[i].title);
          slctText = slctText.replace("{variable}", variable.title);
          slctText = slctText.replace("{variable}", variable.title);
          slctText = slctText.replace("{impact}", variable.impact + " " + variable.unit);
          slctText = slctText.replace("{prob}", variable.pathProb);
          var slctTextMaxLNegC = slctText;
        }

        // build text for var with the median consequence
        variable = inputData[outputVars[i].title].find(item => item.impactAsNumber == calculationData.consequence[0])
        slctText = "The median consequence for your variable {outputvar} is {medianC}. The median likelihood on the other hand is {medianL} %. Could better your odds of something positive happening or reduce the impact of a negative scenario?"
        slctText = slctText.replace("{outputvar}", outputVars[i].title);
        slctText = slctText.replace("{medianC}", medianC);
        slctText = slctText.replace("{medianL}", medianL);
        var slctTextMedianImpact = slctText;

        output[outputVars[i].title] = {
          "maximumConsequence": slctTextMaxC,
          "maximumNegConsequence": slctTextMaxNegC,
          "medianImpact": slctTextMedianImpact,
          "maximumLikelihoodPos": slctTextMaxL,
          "maximumLikelihoodNegC": slctTextMaxLNegC
        }

        // build text for var with the 3 maximum negative consequence
        if (calculationData.consequence.length > 3) {
          var variable1 = inputData[outputVars[i].title].find(item => item.impactAsNumber == calculationData.consequence[0]),
            variable2 = inputData[outputVars[i].title].find(item => item.impactAsNumber == calculationData.consequence[1]),
            variable3 = inputData[outputVars[i].title].find(item => item.impactAsNumber == calculationData.consequence[2]);
          slctText = 'The variables with the largest negative impact for your your variable {outputvar} are "{variable1}", "{variable2}" and "{variable3}". Is there a way you could reduce the impact or the likelihood of one of these?'
          slctText = slctText.replace("{outputvar}", outputVars[i].title);
          slctText = slctText.replace("{variable1}", variable1.title);
          slctText = slctText.replace("{variable2}", variable2.title);
          slctText = slctText.replace("{variable3}", variable3.title);
          var slctText3MaxNegC = slctText;
          output[outputVars[i].title]["3maximumNegConsequence"] = slctText3MaxNegC;
        }
      }
    }
    return output;
  },
  /* This was a try of an alternative method, but doesnt seem more efficient. */
  buildText3(outcomeVarId, key) {
    const outputVar = store.state.outcomeVariables[outcomeVarId];
    const inputData = this.aggregateImpacts();
    var calculationData = {
      likelihood: [],
      consequence: [],
      consequenceAbs: [],
    };
    inputData[outputVar.title] = inputData[outputVar.title].filter(
      (item) => item.impact != 0
    );

    for (var j = 0; j < inputData[outputVar.title].length; j++) {
      // calculate impact as number instead of "k", "m", "b" units
      switch (inputData[outputVar.title][j].unit) {
        case " ": {
          var multiplier = 1;
          break;
        }
        case "k": {
          multiplier = 1000;
          break;
        }
        case "m": {
          multiplier = 1 * 10 ** 6;
          break;
        }
        case "b": {
          multiplier = 1 * 10 ** 9;
          break;
        }
        default: {
          multiplier = 1;
          break;
        }
      }
      inputData[outputVar.title][j].impactAsNumber = inputData[outputVar.title][j].impact * multiplier;
      inputData[outputVar.title][j].impactAsAbsNumber = Math.abs(
        inputData[outputVar.title][j].impactAsNumber
      );

      // build array of all likelihoods and impacts first to check whats how high compared
      calculationData.likelihood.push(
        inputData[outputVar.title][j].pathProb
      );
      calculationData.consequenceAbs.push(
        inputData[outputVar.title][j].impactAsAbsNumber
      );
      calculationData.consequence.push(
        inputData[outputVar.title][j].impactAsNumber
      );
    }

    calculationData.likelihood.sort((a, b) => a - b);
    calculationData.consequence.sort((a, b) => a - b);
    calculationData.consequenceAbs.sort((a, b) => a - b);
    const medianL =
      calculationData.likelihood[
        (calculationData.likelihood.length / 2).toFixed(0) - 1
      ],
      medianC =
      calculationData.consequence[
        (calculationData.likelihood.length / 2).toFixed(0) - 1
      ];

    switch (key) {
      case "maximumConsequence": {
        var variable = inputData[outputVar.title].find(item => item.impactAsNumber == calculationData.consequence[calculationData.consequence.length - 1])
        var slctText = "The variable with the highest positive impact for success in variable {outputvar} is {variable}. The impact is {impact} and the estimated probability for occuring is {prob} %. Is there any way of increasing the likelihood that variable {variable} occurs?"
        slctText = slctText.replace("{outputvar}", outputVars[i].title);
        slctText = slctText.replace("{variable}", variable.title);
        slctText = slctText.replace("{variable}", variable.title);
        slctText = slctText.replace("{impact}", variable.impact + " " + variable.unit);
        slctText = slctText.replace("{prob}", variable.pathProb);
        return slctText;
      }
      case "maximumNegConsequence": {
        variable = inputData[outputVar.title].find(item => item.impactAsNumber == calculationData.consequence[0])
        slctText = "The variable with the highest negative impact for success in variable {outputvar} is {variable}. The impact is {impact} and the estimated probability for occuring is {prob} %. Is there any way, you could lower the likelihood of that variable {variable} occuring?"
        slctText = slctText.replace("{outputvar}", outputVars[i].title);
        slctText = slctText.replace("{variable}", variable.title);
        slctText = slctText.replace("{variable}", variable.title);
        slctText = slctText.replace("{impact}", variable.impact + " " + variable.unit);
        slctText = slctText.replace("{prob}", variable.pathProb);
        return slctText;
      }
      case "medianImpact": {
        variable = inputData[outputVar.title].find(item => item.impactAsNumber == calculationData.consequence[0])
        slctText = "The median consequence for your variable {outputvar} is {medianC}. The median likelihood on the other hand is {medianL} %. Could better your odds of something positive happening or reduce the impact of a negative scenario?"
        slctText = slctText.replace("{outputvar}", outputVars[i].title);
        slctText = slctText.replace("{medianC}", medianC);
        slctText = slctText.replace("{medianL}", medianL);
        return slctText;
      }
      case "3maximumNegConsequence": {
        var variable1 = inputData[outputVars[i].title].find(item => item.impactAsNumber == calculationData.consequence[0]),
          variable2 = inputData[outputVars[i].title].find(item => item.impactAsNumber == calculationData.consequence[1]),
          variable3 = inputData[outputVars[i].title].find(item => item.impactAsNumber == calculationData.consequence[2]);
        slctText = 'The variables with the largest negative impact for your your variable {outputvar} are "{variable1}", "{variable2}" and "{variable3}". Is there a way you could reduce the impact or the likelihood of one of these?'
        slctText = slctText.replace("{outputvar}", outputVars[i].title);
        slctText = slctText.replace("{variable1}", variable1.title);
        slctText = slctText.replace("{variable2}", variable2.title);
        slctText = slctText.replace("{variable3}", variable3.title);
        return slctText;
      }
    }
  },
  buildText(variable, index) {
    const impactTexts = [{
        text: "The possible impact of '{name}' is {impact}. That's the price of {amount} liters of milk.",
        unit: 0.8,
      },
      {
        text: "The possible impact of '{name}' is {impact}. That's the price of {amount} liters of water. Do you have an idea what you could do about that?",
        unit: 0.02,
      },
      {
        text: "The possible impact of '{name}' is {impact}. That's the price of {amount} liters of gasoline.",
        unit: 1.4,
      },
      {
        text: "The possible impact of '{name}' is {impact}. You could buy {amount} iPhone 12's with that money.",
        unit: 1149,
      },
    ];

    switch (variable.unit) {
      case " ": {
        var multiplier = 1;
        break;
      }
      case "k": {
        multiplier = 1000;
        break;
      }
      case "m": {
        multiplier = 1 * 10 ** 6;
        break;
      }
      case "b": {
        multiplier = 1 * 10 ** 9;
        break;
      }
      default: {
        multiplier = 1;
        break;
      }
    }
    var impactAsAbsNumber = Math.abs(variable.impact) * multiplier
    var slctItem = impactTexts[index],
      slctText = slctItem.text;

    var amount = Math.round(impactAsAbsNumber / slctItem.unit);
    switch (true) {
      case (amount > 10 ** 9): {
        var unitAdd = "billion";
        amount = amount / (10 ** 9);
        break;
      }
      case (amount > 10 ** 6): {
        var unitAdd = "million";
        amount = amount / (10 ** 6);
        break;
      }
      case (amount > 10 ** 3): {
        var unitAdd = "thousand";
        amount = amount / (10 ** 3);
        break;
      }
      default: {
        var unitAdd = "";
        break;
      }
    }

    slctText = slctText.replace("{name}", variable.title);
    slctText = slctText.replace("{impact}", variable.impact + " " + variable.unit);
    slctText = slctText.replace("{amount}", Math.round(amount) + " " + unitAdd);
    return slctText;
  },
  findConnectedVariables(layer, id) {
    const connectedShapes = store.state.connectedShapes;
    var pathOtherVar = [];
    var shapeID = "scenarioVariables_" + (layer + 1) + "#" + id;
    // find if the shape is somewhere in connections
    var connectionIndex = undefined;
    for (var i = 0; i < connectedShapes.length; i++) {
      var connectionIndex = connectedShapes[i].findIndex(
        (item) => item == shapeID
      );
      if (connectionIndex != -1) {
        var otherIndex = connectionIndex == 0 ? 1 : 0;
        // first item in here is the list, second one is the varId
        pathOtherVar.push({
          scenarioLayer: connectedShapes[i][otherIndex].substring(
            connectedShapes[i][otherIndex].indexOf("_") + 1,
            connectedShapes[i][otherIndex].indexOf("#")
          ),
          varId: connectedShapes[i][otherIndex].substring(
            connectedShapes[i][otherIndex].indexOf("#") + 1
          ),
        });
      }
    }
    return pathOtherVar;
  },
};

export default output_functions;