import { visualize } from '../../application/services/visualize';

document.getElementById('upload-data-button').addEventListener('click', function (event) {
    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];

    var reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function(event) {
        var csvData = event.target.result;

        const postData = {
            data: csvData
        }

        // Get the respective type of data
        var fileFormat = document.getElementById('file-format').value;

        const apiUrl = `http://localhost:3001/api/setCsv/${fileFormat}/`;
        console.log(apiUrl);

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('API response:', data);
            })
            .catch(error => {
                alert('Data Analyzer Service is not running...');
                console.error('Error:', error);
            });

    };
});