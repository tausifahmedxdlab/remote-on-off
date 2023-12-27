// Fetch data using AJAX
fetch('/getData')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('data-body');

        // Clear existing table rows
        tableBody.innerHTML = '';

        // Add rows for each item in the data
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.imei}</td>
                <td>${item.simNo}</td>
                <td>${item.appStatus}</td>
                <td>${item.serverStatus}</td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
