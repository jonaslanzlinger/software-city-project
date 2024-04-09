import { getData } from "./data.js";
import { formatDate } from "./utils.js";


const buttonClearData = document.getElementById("button-clear-data");

const buildTable = () => {
   while (thead.firstChild) {
      thead.removeChild(thead.firstChild);
   }
   while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
   }

   let data = getData();
   let tr = document.createElement("tr");
   data.attributeNames.forEach(attribute => {
      let th = document.createElement("th");
      th.innerText = attribute;
      tr.appendChild(th);
   });
   thead.appendChild(tr);
   data.data.forEach(entry => {
      tr = document.createElement("tr");
      for (let key in entry) {
         let td = document.createElement("td");
         if (key === "timestamp") {
            // td.innerText = formatDate(entry[key]);
            td.innerText = entry[key];
         } else {
            td.innerText = entry[key];
         }
         tr.appendChild(td);
      }
      tbody.appendChild(tr);
   });

   if (data.data.length > 0) {
      buttonClearData.style.display = "block";
   } else {
      buttonClearData.style.display = "none";
   }

   $("#table-data").DataTable();
}

export { buildTable }