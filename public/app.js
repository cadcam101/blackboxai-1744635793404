document.getElementById('trackForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const phone = document.getElementById('phone').value;
    const resultDiv = document.getElementById('result');
    const locationInfo = document.getElementById('locationInfo');
    
    try {
        const response = await fetch('/track', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phone })
        });
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        
        locationInfo.innerHTML = `
            Phone: ${data.phone}<br>
            Location: ${data.location}<br>
            Accuracy: ${data.accuracy} meters<br>
            Time: ${new Date(data.timestamp).toLocaleString()}
        `;
        
        resultDiv.classList.remove('hidden');
    } catch (error) {
        alert('Error tracking location: ' + error.message);
        console.error('Error:', error);
    }
});
