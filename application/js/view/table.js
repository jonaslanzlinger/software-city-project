const buttonClearData = document.getElementById("button-clear-data");

const buttonConfig = document.getElementById("button-config");
const buttonVisualize = document.getElementById("button-visualize");
const buttonViewData = document.getElementById("button-view-data");
const buttonModelTree = document.getElementById("button-model-tree");

const alertSuccessClearData = document.getElementById("alert-success-clear-data");

const buildTable = (handleGetOriginalData, handleGetAttributeNames) => {

   while (thead.firstChild) {
      thead.removeChild(thead.firstChild);
   }
   while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
   }

   let data = handleGetOriginalData();
   let tr = document.createElement("tr");
   handleGetAttributeNames().forEach(attribute => {
      let th = document.createElement("th");
      th.innerText = attribute;
      tr.appendChild(th);
   });
   thead.appendChild(tr);
   data.forEach(entry => {
      tr = document.createElement("tr");
      for (let key in entry) {
         let td = document.createElement("td");
         if (key === "timestamp") {
            td.innerText = entry[key];
         } else {
            td.innerText = entry[key];
         }
         tr.appendChild(td);
      }
      tbody.appendChild(tr);
   });

   if (data.length > 0) {
      buttonClearData.style.display = "block";
   } else {
      buttonClearData.style.display = "none";
   }

   $("#table-data").DataTable();
}

const bindClearTable = (handleClearData, handleGetOriginalData, handleGetAttributeNames) => {
   buttonClearData.addEventListener("click", () => {
      handleClearData();
      alertSuccessClearData.style.display = "block";
      $("#alert-success-clear-data").delay(2000).fadeOut(800);
      buildTable(handleGetOriginalData, handleGetAttributeNames);

      buttonConfig.disabled = true;
      buttonViewData.disabled = true;
      buttonVisualize.disabled = true;
      buttonModelTree.disabled = true;

      document.getElementById("view-data").style.display = "none";
      document.getElementById("instructions").style.display = "block";
   });
}

export { buildTable, bindClearTable }