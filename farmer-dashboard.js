document.getElementById('yieldForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const seedName = document.getElementById('seedName').value;
    const seedQuantity = document.getElementById('seedQuantity').value;
    const isGMO = document.getElementById('isGMO').value;
    const pesticideName = document.getElementById('pesticideName').value;
    const pesticideType = document.getElementById('pesticideType').value;
    const vendors = document.getElementById('vendors').value;

    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/farmer/yield', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ seedName, seedQuantity, isGMO, pesticideName, pesticideType, vendors })
        });

        const data = await response.json();
        alert(data.message);

        if (response.status === 201) {
            fetchYields(); // Refresh the list of yields
        }
    } catch (error) {
        console.error(error);
        alert('Failed to submit yield.');
    }
});

// Fetch and display yields
async function fetchYields() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/farmer/yields', {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        });

        const data = await response.json();
        const yieldList = document.getElementById('yieldList');
        yieldList.innerHTML = '';

        data.forEach(yieldEntry => {
            const listItem = document.createElement('li');
            listItem.textContent = `${yieldEntry.seedName} - ${yieldEntry.seedQuantity} (GMO: ${yieldEntry.isGMO})`;
            yieldList.appendChild(listItem);
        });
    } catch (error) {
        console.error(error);
        alert('Failed to fetch yields.');
    }
}

// Fetch yields on page load
fetchYields();
