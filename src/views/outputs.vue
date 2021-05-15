<template>
  <div id="outputs" class="px-10 py-12 w-full">
    <div id="header" class="text-2xl mt-12 px-4 md:flex">
      <h2 class="text-4xl flex-col md:w-1/2">
        Output
      </h2>
      <p class="md:w-1/2 mt-10 md:mt-0">Here we have build some output views for you. You can analyze all possible
        scenarios in different ways and find ways what to do better.</p>
    </div>
    <!-- Output table -->

    <h4 class="mt-12 ml-6 mb-6 text-xl">1. Output Tables</h4>
    <div class="md-grid-container">
      <tablev1 class="table px-4 py-2 grid-item-3" v-for="item in getOutcomeVariables" :key="item.id"
        :title="item.title" :data="getTableData[item.title]" :color="item.color" :id="'table_' + item.title" />
      <div class="downloadMenu relative mt-6 w-48" style="grid-column: 9 / span 1">
        <button @click="showDownloadTablesMenu = !showDownloadTablesMenu"
          class="px-4 py-2 w-full rounded bg-gray-300 text-dark">
          Download all tables
        </button>
        <div v-if="showDownloadTablesMenu" class="dropdownBelow absolute border-2 mt-1 py-2 w-full px-2 bg-bg rounded">
          <ul>
            <li>
              <button class="border-b-2 py-2 cursor-pointer bg-gray-100 text-gray-300 hover:bg-gray-100">
                Download Excel (.xlsx)
              </button>
            </li>
            <li>
              <button class="border-b-2 py-2 cursor-pointer hover:bg-gray-100" @click="exportTables('csv')">
                Download CSV (.csv)
              </button>
            </li>
            <li>
              <button class="py-2 cursor-pointer hover:bg-gray-100" @click="exportTables('json')">
                Download JSON (.json)
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Text output -->
    <h4 class="ml-6 mt-20 mb-6 text-xl">2. Text view</h4>
    <textOutput class="mt-8 h-80 flex-col" :variables="getTableData[getOutcomeVariables[0].title]" />

    <!-- Risk Matrices -->

    <div class="headerRow flex ml-6 mt-20 mb-6">
      <h4 class="text-xl">3. Risk Matrices</h4>
      <div class="downloadMenu ml-4 relative">
        <button @click="showMatrixMenu = !showMatrixMenu" class="px-4 py-2 rounded bg-gray-300 text-dark">
          Select Variable
        </button>
        <div v-if="showMatrixMenu" class="absolute border-2 mt-1 py-2 w-48 px-2 bg-bg rounded">
          <ul>
            <li v-for="item in getOutcomeVariables" :key="item.id">
              <button class="py-2 cursor-pointer w-full hover:bg-gray-100" @click="setMatrix(item.title)">
                {{ item.title }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <riskMatrix class="mt-12" :title="getSelectedRiskMatrixValue"
      :data="getRiskMatrixData[getSelectedRiskMatrixValue]" />
    <!-- Charts -->

    <div class="headerRow flex ml-6 mt-20 mb-6">
      <h4 class="text-xl">4. Distributions</h4>
      <div class="downloadMenu ml-4 relative">
        <button @click="showDistributionMenu = !showDistributionMenu" class="px-4 py-2 rounded bg-gray-300 text-dark">
          Select Variable
        </button>
        <div v-if="showDistributionMenu" class="absolute border-2 mt-1 py-2 w-48 px-2 bg-bg rounded">
          <ul>
            <li v-for="item in getOutcomeVariables" :key="item.id">
              <button class="py-2 cursor-pointer w-full hover:bg-gray-100" @click="setDistribution(item.title)">
                {{ item.title }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <chartist class="mt-12 md:px-20 lg:px-64" type="Line" :data="getDistribution[getSelectedChartValue]"
      :options="chartOptions" ratio="ct-major-second" />
    <!-- Process View -->

    <div class="headerRow flex ml-6 mt-20 mb-6">
      <h4 class="text-xl">5. Process View</h4>
      <div class="downloadMenu ml-4 relative">
        <button @click="showProcessMenu = !showProcessMenu" class="px-4 py-2 rounded bg-gray-300 text-dark">
          Select Variable
        </button>
        <div v-if="showProcessMenu" class="absolute border-2 mt-1 py-2 w-48 px-2 bg-bg rounded">
          <ul>
            <li v-for="item in getOutcomeVariables" :key="item.id">
              <button class="py-2 cursor-pointer w-full hover:bg-gray-100" @click="setProcess(item.title)">
                {{ item.title }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <processView class="mt-12" :data="getProcessData[selectedProcess]"
      :outcomeVar="outcomeVar" />
    {{getProcessData[selectedProcess]}}

    <!-- UI Handling Buttons -->

    <div class="fixed left-0 top-0 h-screen">
      <button id="backUIStep" class="absolute left-0 centerY px-3 py-3 rounded-full text-2xl"
        style="transform: rotateY(180deg)" tooltip-content="Go back to editing scenario variables."
        tooltip-position="left-abs" @click="moveUI('dec')">
        <svg class="w-10" viewBox="-74 0 362 362.667" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M213.668 181.332c0 4.27-1.281 8.535-3.629 11.734l-106.664 160c-3.84 5.762-10.242 9.602-17.707 9.602h-64c-11.734 0-21.336-9.602-21.336-21.336 0-4.266 1.281-8.531 3.629-11.73l98.773-148.27L3.961 33.066C1.613 29.867.332 25.602.332 21.332.332 9.602 9.934 0 21.668 0h64c7.465 0 13.867 3.84 17.707 9.602l106.664 160c2.348 3.199 3.629 7.464 3.629 11.73zm0 0" />
        </svg>
      </button>
    </div>
  </div>
</template>
<script>
  import store from "../store";
  import output_functions from "../data/generate_output";
  import tablev1 from "../components/tablev1";
  import riskMatrix from "../components/riskMatrix";
  import processView from "../components/processView";
  import textOutput from "../components/textOutput";
  import $ from "jquery";
  export default {
    components: {
      tablev1,
      riskMatrix,
      processView,
      textOutput
    },
    data() {
      return {
        showDownloadTablesMenu: false,
        showMatrixMenu: false,
        showDistributionMenu: false,
        showProcessMenu: false,
        selectedRiskMatrix: store.state.outcomeVariables[0].title,
        selectedChart: store.state.outcomeVariables[0].title,
        selectedProcess: store.state.outcomeVariables[0].title,
        chartOptions: {
          height: "300px",
          lineSmooth: true,
          showArea: true,
          fullWidth: true,
          axisX: {
            showGrid: false,
          },
          low: 0,
          high: 1,
        },
      };
    },
    computed: {
      getOutcomeVariables() {
        return store.state.outcomeVariables;
      },
      getTableData() {
        return output_functions.aggregateImpacts();
      },
      getRiskMatrixData() {
        return output_functions.buildRiskMatrixData();
      },
      getProcessData() {
        return output_functions.aggregateToProcess();
      },
      getSelectedRiskMatrixValue() {
        return this.selectedRiskMatrix;
      },
      getSelectedChartValue() {
        return this.selectedChart;
      },
      getDistribution() {
        return output_functions.buildDistribution();
      },
    },
    methods: {
      moveUI(val) {
        store.commit("moveUI", val);
        this.$router.push({
          name: "app",
          params: {
            id: 1,
          },
        });
      },
      exportTables(type) {
        this.showDownloadTablesMenu = false;
        const tables = document.getElementsByClassName("table");

        switch (type) {
          case "xlsx": {
            var dataType = "application/vnd.ms-excel";
            var fileType = ".xlsx";

            var tableData = $("#tableEl_Happiness").html();
            console.log(tableData);
            break;
          }
          case "json": {
            var dataType = "text/json;charset=utf-8";
            var fileType = ".json";
            tableData = {};
            for (var i = 0; i < tables.length; i++) {
              var header = tables[i].getElementsByTagName("h5")[0].textContent;
              var currentTable = tables[i].getElementsByTagName("table")[0];
              tableData[header] = tableToJson(currentTable, header);
            }
            tableData = JSON.stringify(tableData);
            break;

            function tableToJson(table) {
              var data = [];

              // first row needs to be headers
              var headers = [];
              for (var i = 0; i < table.rows[0].cells.length; i++) {
                headers[i] = table.rows[0].cells[i].innerHTML
                  .toLowerCase()
                  .replace(/ /gi, "");
              }
              // go through cells
              for (var i = 1; i < table.rows.length; i++) {
                var tableRow = table.rows[i];
                var rowData = {};

                for (var j = 0; j < tableRow.cells.length; j++) {
                  rowData[headers[j]] = tableRow.cells[j].innerHTML;
                }

                data.push(rowData);
              }

              return data;
            }
          }
          default: {
            dataType = "text/csv;charset=utf-8";
            fileType = ".csv";

            for (var i = 0; i < tables.length; i++) {
              var header = tables[i].getElementsByTagName("h5")[0];
              var rows = tables[i].querySelectorAll("tr");
              tableData = tableData + header.textContent + "\n";
              var currentTableData = [].slice
                .call(rows)
                .map(function (row) {
                  // Query all cells
                  const cells = row.querySelectorAll("th,td");
                  return [].slice
                    .call(cells)
                    .map(function (cell) {
                      return cell.textContent;
                    })
                    .join(",");
                })
                .join("\n");
              tableData = tableData + currentTableData + "\n";
            }
          }
        }
        const link = document.createElement("a");
        link.setAttribute(
          "href",
          `data:${dataType},${encodeURIComponent(tableData)}`
        );
        link.setAttribute("download", "table" + fileType);
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      setMatrix(id) {
        this.selectedRiskMatrix = id;
        this.showMatrixMenu = false;
      },
      setDistribution(id) {
        this.selectedChart = id;
        this.showDistributionMenu = false;
      },
      setProcess(id) {
        this.selectedProcess = id;
        this.showProcessMenu = false;
      },
    },
    mounted() {},
  };
</script>