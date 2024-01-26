import { visualize } from '../../application/services/visualize';

async function fetchDataFromDataVisualizer() {
   const apiUrl = 'http://localhost:3001/api/';
   await fetch(apiUrl)
      .then(response => {
         if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
         }
         return response.json();
      })
      .then(data => {
         DATA = data;
      })
      .catch(error => {
         alert('Data Analyzer Service is not running...');
         console.error('Error:', error.message);
      });
}

function getMetaphorSelection() {
   let dimensionAttributeSelection = document.getElementById('dimension-attribute-selection');
   let heightAttributeSelection = document.getElementById('height-attribute-selection');
   let colorAttributeSelection = document.getElementById('color-attribute-selection');

   return {
      dimension: dimensionAttributeSelection.value,
      height: heightAttributeSelection.value,
      color: colorAttributeSelection.value,
   };
}

// document
//    .getElementById('dimensions-form')
//    .addEventListener('submit', async function (event) {
//       event.preventDefault();
//
//       await fetchDataFromDataVisualizer();
//
//       await visualize(event, DATA);
//    });

document.getElementById('btn-go').addEventListener('click', async function (event) {
   event.preventDefault();

   await fetchDataFromDataVisualizer();

   let metaphorSelection = getMetaphorSelection();
   let citySelection = {
      dimension: document.getElementById('city-dimension').value,
      spread: document.getElementById('city-spread').value,
   };
   document.getElementById('metaphors-form').style.display = 'none';

   await visualize(event, DATA, metaphorSelection, citySelection);
});

export function initGroupingMenu(data) {
   const groupingSource = document.getElementById('groupingSource');
   groupingSource.addEventListener('drop', event => {
      event.preventDefault();
      const data = event.dataTransfer.getData('text');
      const draggableElement = document.getElementById(data);
      event.target.appendChild(draggableElement);
   });
   groupingSource.addEventListener('dragover', event => {
      event.preventDefault();
   });

   const groupingTarget = document.getElementById('groupingTarget');
   groupingTarget.addEventListener('drop', event => {
      event.preventDefault();
      const data = event.dataTransfer.getData('text');
      const draggableElement = document.getElementById(data);
      event.target.appendChild(draggableElement);
   });
   groupingTarget.addEventListener('dragover', event => {
      event.preventDefault();
   });

   for (let columnName in data[0]) {
      const newElement = document.createElement('div');
      newElement.classList.add('draggable');
      newElement.draggable = true;
      newElement.id = columnName;
      newElement.addEventListener('dragstart', event => {
         console.log(event);
         event.dataTransfer.setData('text', event.target.id);
      });
      newElement.textContent = columnName;
      groupingSource.appendChild(newElement);
   }
}

export function initMetaphorsAttributeList(data) {
   let dimensionAttributeSelectionList = document.getElementById('dimension-attribute-selection');
   let heightAttributeSelectionList = document.getElementById('height-attribute-selection');
   let colorAttributeSelectionList = document.getElementById('color-attribute-selection');

   // Clear the lists
   dimensionAttributeSelectionList.replaceChildren();
   heightAttributeSelectionList.replaceChildren();
   colorAttributeSelectionList.replaceChildren();

   for (let attributeName in data.data[0]) {
      const newElement = document.createElement('option');
      newElement.value = attributeName;
      newElement.innerText = attributeName;
      dimensionAttributeSelectionList.appendChild(newElement);
   }
   for (let attributeName in data.data[0]) {
      const newElement = document.createElement('option');
      newElement.value = attributeName;
      newElement.innerText = attributeName;
      heightAttributeSelectionList.appendChild(newElement);
   }
   for (let attributeName in data.data[0]) {
      const newElement = document.createElement('option');
      newElement.value = attributeName;
      newElement.innerText = attributeName;
      colorAttributeSelectionList.appendChild(newElement);
   }
}

export function getData() {
   return DATA;
}

document.getElementById('upload-data-button').addEventListener('click', function (event) {
   const fileInput = document.getElementById('file');
   const file = fileInput.files[0];

   var reader = new FileReader();
   reader.readAsText(file);

   reader.onload = function (event) {
      var csvData = event.target.result;

      const postData = {
         data: csvData,
      };

      // Get the respective type of data
      var fileFormat = document.getElementById('file-format').value;

      const apiUrl = `http://localhost:3001/api/setCsv/${fileFormat}/`;

      fetch(apiUrl, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(postData),
      })
         .then(response => response.json())
         .then(async data => {
            await fetchDataFromDataVisualizer();

            initGroupingMenu(getData());
            initMetaphorsAttributeList(getData());
            alert('Data successfully uploaded.');
            document.getElementById('upload-form').style.display = 'none';
         })
         .catch(error => {
            alert('Data Analyzer Service is not running...');
            console.error('Error:', error);
         });
   };
});

let DATA;
await fetchDataFromDataVisualizer();
initGroupingMenu(DATA);
initMetaphorsAttributeList(DATA);
