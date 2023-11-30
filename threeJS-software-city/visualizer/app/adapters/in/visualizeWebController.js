import { visualize } from '../../application/services/visualize';

document.getElementById('form').addEventListener('submit', async function (event) {
    event.preventDefault();

    let DATA;

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
            console.error('Error:', error.message);
        });

    console.log(DATA);

    visualize(event, DATA);

});