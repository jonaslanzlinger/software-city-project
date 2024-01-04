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

document
   .getElementById('dimensions-form')
   .addEventListener('submit', async function (event) {
      event.preventDefault();

      await fetchDataFromDataVisualizer();

      await visualize(event, DATA);
   });

function initGroupingMenu(data) {
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

let DATA;
await fetchDataFromDataVisualizer();
console.log(DATA);
initGroupingMenu(DATA);
