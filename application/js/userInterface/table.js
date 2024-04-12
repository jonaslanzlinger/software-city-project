import { getOriginalData, getAttributeNames } from "../data.js";


const buttonClearData = document.getElementById("button-clear-data");

const buildTable = () => {
   while (thead.firstChild) {
      thead.removeChild(thead.firstChild);
   }
   while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
   }

   let data = getOriginalData();
   let tr = document.createElement("tr");
   getAttributeNames().forEach(attribute => {
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

export { buildTable }