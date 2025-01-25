// Sell yield
document.getElementById('sellYieldForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const sellTo = document.getElementById('sellTo').value;
    const yieldName = document.getElementById('yieldName').value;
    const quantity = document.getElementById('quantity').value;
    const buyerDetails = document.getElementById('buyerDetails').value;

    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/vendor/sell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify({ sellTo, yieldName, quantity, buyerDetails }),
        });

        const data = await response.json();
        alert(data.message);

        if (response.status === 201) {
            fetchStock(); // Refresh stock list
            fetchSales(); // Refresh sales history
        }
    } catch (error) {
        console.error(error);
        alert('Failed to sell yield.');
    }
});

// Fetch stock details
async function fetchStock() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/vendor/stock', {
            method: 'GET',
            headers: { 'Authorization': token },
        });

        const data = await response.json();
        const stockList = document.getElementById('stockList');
        stockList.innerHTML = '';

        data.forEach((stock) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${stock.yieldName} - ${stock.quantity}`;
            stockList.appendChild(listItem);
        });
    } catch (error) {
        console.error(error);
        alert('Failed to fetch stock.');
    }
}

// Fetch sales history
async function fetchSales() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/vendor/sales', {
            method: 'GET',
            headers: { 'Authorization': token },
        });

        const data = await response.json();
        const salesList = document.getElementById('salesList');
        salesList.innerHTML = '';

        data.forEach((sale) => {
            const listItem = document.createElement('li');
            listItem.textContent = `Sold ${sale.quantity} of ${sale.yieldName} to ${sale.buyerDetails}`;
            salesList.appendChild(listItem);
        });
    } catch (error) {
        console.error(error);
        alert('Failed to fetch sales history.');
    }
}

// Fetch stock and sales on page load
fetchStock();
fetchSales();
// Generate QR Code
document.getElementById('qrCodeForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const yieldNameForQR = document.getElementById('yieldNameForQR').value;

    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/vendor/generate-qr', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify({ yieldName: yieldNameForQR }),
        });

        const data = await response.json();

        if (response.status === 200) {
            // Display the QR code
            document.getElementById('qrCodeImage').src = data.qrCodeUrl;
        } else {
            alert(data.message || 'Failed to generate QR Code.');
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred while generating the QR Code.');
    }
});
