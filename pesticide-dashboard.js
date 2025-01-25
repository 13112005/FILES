// Update pesticide stock
document.getElementById('updateStockForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const pesticideName = document.getElementById('pesticideName').value;
    const quantity = document.getElementById('quantity').value;

    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/pesticide/stock', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify({ pesticideName, quantity }),
        });

        const data = await response.json();
        alert(data.message);

        if (response.status === 201) {
            fetchStock(); // Refresh stock list
        }
    } catch (error) {
        console.error(error);
        alert('Failed to update stock.');
    }
});

// Fetch and display stock details
async function fetchStock() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/pesticide/stock', {
            method: 'GET',
            headers: { 'Authorization': token },
        });

        const data = await response.json();
        const stockList = document.getElementById('stockList');
        stockList.innerHTML = '';

        data.forEach((stock) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${stock.pesticideName} - ${stock.quantity}`;
            stockList.appendChild(listItem);
        });
    } catch (error) {
        console.error(error);
        alert('Failed to fetch stock details.');
    }
}

// Fetch and display sales records
async function fetchSales() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/pesticide/sales', {
            method: 'GET',
            headers: { 'Authorization': token },
        });

        const data = await response.json();
        const salesList = document.getElementById('salesList');
        salesList.innerHTML = '';

        data.forEach((sale) => {
            const listItem = document.createElement('li');
            listItem.textContent = `Farmer Aadhar: ${sale.farmerAadhar}, Pesticide: ${sale.pesticideName}, Quantity: ${sale.quantity}`;
            salesList.appendChild(listItem);
        });
    } catch (error) {
        console.error(error);
        alert('Failed to fetch sales records.');
    }
}

// Fetch stock and sales on page load
fetchStock();
fetchSales();
