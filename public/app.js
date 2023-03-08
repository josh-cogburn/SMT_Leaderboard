// Initialize variables
let dataset = [];
let currentIndex = 0;
const batchSize = 10;
const dataRefreshRate = 5000; // 1 second
const htmlUpdateRate = 8000; // 8 seconds

// Clear table
function clearTable() {
    var tbody = document.getElementById("leaderboard-table-body");
    tbody.innerHTML = "";
    for (var i = 0; i < 10; i++) {
        var row = "<tr>";
        for (var j = 0; j < 10; j++) {
            row += "<td>&nbsp;</td>";
        }
        row += "</tr>";
        tbody.innerHTML += row;
    }
}

// Fetch data and update dataset
async function fetchData() {
    try {
        // const response = await fetch('http://localhost:5500/leaderboard.json');
        const response = await fetch('http://localhost:3001/data');        
        const data = await response.json();
        data.Players.sort((a, b) => a.Order - b.Order);
        dataset = data['Players'];

        console.log('Data fetched successfully');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Update table
function updateHTML() {
    const tbody = document.getElementById("leaderboard-table-body");
    tbody.innerHTML = "";
    
    let endIndex = currentIndex + batchSize;
    if (endIndex > dataset.length) {
        endIndex = dataset.length;
    }
 
    for (let i = currentIndex; i < endIndex; i++) {
        const player = dataset[i];
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${player.Order}</td>
        <td>${player.Rank}</td>        
        <td>${player.LastName}, ${player.FirstName} (${player.Nationality})</td>
        <td>${player.CurrentParRelativeScore}</td>
        <td>${player.TotalParRelativeScore}</td>
        <td>${player.Round1Score}</td>
        <td>${player.Round2Score}</td>
        <td>${player.Round3Score}</td>
        <td>${player.Round4Score}</td>
        <td>${player.TotalScore}</td>
        `;
        tbody.appendChild(row);
    }
    currentIndex += batchSize;
    if (currentIndex >= dataset.length) {

        let empty_rows = currentIndex - dataset.length;

        // console.log('currentIndex: ' + currentIndex);
        // console.log('dataset.length: ' + dataset.length);
        // console.log('empty_rows: ' + empty_rows);

        for (let i = 0; i < empty_rows; i++) {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            `;
            tbody.appendChild(row);

        }

        currentIndex = 0;
    }
}        

// Clear table
clearTable();

// Initialize dataset
fetchData();
updateHTML();

// Refresh dataset every 1 second
setInterval(() => fetchData(), dataRefreshRate);

// Update HTML table every 8 seconds
setInterval(() => updateHTML(), htmlUpdateRate);

