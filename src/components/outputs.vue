<template>
  <div id="outputs" class="px-10 py-12 w-full">
    <!-- Output table -->

    <h4 class="ml-6 mb-6 text-xl">1. Output Tables</h4>
    <div class="md-grid-container">
      <tablev1
        class="table px-4 py-2 grid-item-3"
        v-for="item in getOutcomeVariables"
        :key="item.id"
        :title="item.title"
        :data="testData[item.title]"
        :color="item.color"
        :id="'table_' + item.title"
      />
          <div class="downloadMenu relative mt-6 flex-col" style="grid-column: 1 / span 10;">
      <button
        @click="showDownloadTablesMenu = !showDownloadTablesMenu"
        class="px-4 py-2 text-xl rounded bg-focus text-white"
      >
        Download all tables
      </button>
      <div
        v-if="showDownloadTablesMenu"
        class="dropdownBelow border-2 mt-1  py-2 w-56 px-2 bg-bg rounded"
      >
        <li>
          <ul>
            <button
              class="border-b-2 py-2 w-48 cursor-pointer hover:bg-gray-100"
              @click="exportTables('xlsx')"
            >
              Download Excel (.xlsx)
            </button>
          </ul>
          <ul>
            <button
              class="border-b-2 py-2 w-48 cursor-pointer hover:bg-gray-100"
              @click="exportTables('csv')"
            >
              Download CSV (.csv)
            </button>
          </ul>
          <ul>
            <button
              class="py-2 cursor-pointer w-48 hover:bg-gray-100"
              @click="exportTables('json')"
            >
              Download JSON (.json)
            </button>
          </ul>
        </li>
      </div>
    </div>
    </div>

    <!-- Risk Matrices -->

    <h4 class="ml-6 mt-20 mb-6 text-xl">2. Risk Matrices</h4>
    <riskMatrix class="mt-6" v-for="item in getOutcomeVariables" :key="item.id" :title="item.title" :data="testDataMatrix[item.title]" />

    <!-- UI Handling Buttons -->

    <div class="fixed left-0 top-0 h-screen">
      <button
      id="backUIStep"
      class="absolute left-0 centerY px-3 py-3 rounded-full text-2xl"
      style="transform: rotateY(180deg)"
      tooltip-content="Go back to editing scenario variables."
      tooltip-position="left-abs"
      @click="moveUI('dec')"
    >
      <svg
        class="w-10"
        viewBox="-74 0 362 362.667"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M213.668 181.332c0 4.27-1.281 8.535-3.629 11.734l-106.664 160c-3.84 5.762-10.242 9.602-17.707 9.602h-64c-11.734 0-21.336-9.602-21.336-21.336 0-4.266 1.281-8.531 3.629-11.73l98.773-148.27L3.961 33.066C1.613 29.867.332 25.602.332 21.332.332 9.602 9.934 0 21.668 0h64c7.465 0 13.867 3.84 17.707 9.602l106.664 160c2.348 3.199 3.629 7.464 3.629 11.73zm0 0"
        />
      </svg>
    </button>
    </div>
  </div>
</template>
<script>
import store from "../store";
import output_functions from "../data/generate_output";
import tablev1 from "./tablev1";
import riskMatrix from "./riskMatrix";
import $ from "jquery";
export default {
  components: { tablev1, riskMatrix },
  data() {
    return {
      showDownloadTablesMenu: false,
      testData: {
        Happiness: [
          {
            id: 0,
            title: "Recession",
            probability: 0.3,
            impact: -20,
            unit: "m",
          },
          {
            id: 1,
            title: "Boom",
            probability: 0.52,
            impact: 22.2,
            unit: "k",
          },
        ],
      },
      testDataMatrix: {
        Happiness: {
          lowLLowC: [
            {
              id: 0,
              title: "Recession",
              probability: 0.3,
              impact: -20,
              unit: "m",
            },
          ],
          lowLMedC: [
            {
              id: 2,
              title: "New product fails",
              probability: 0.52,
              impact: 22.2,
              unit: "k",
            },
            {
              id: 3,
              title: "Competitor launches product",
              probability: 0.52,
              impact: 22.2,
              unit: "k",
            },
          ],
          highLMedC: [
            {
              id: 1,
              title: "Boom",
              probability: 0.52,
              impact: 22.2,
              unit: "k",
            },
          ],
        },
      },
    };
  },
  computed: {
    getOutcomeVariables() {
      return store.state.outcomeVariables;
    },
  },
  methods: {
    moveUI(val) {
      store.commit("moveUI", val);
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
  },
};
</script>