document.getElementById('purchaseForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const item = document.getElementById('item').value;
    const quantity = document.getElementById('quantity').value;

    try {
        const response = await fetch('http://localhost:3000/purchases', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item, quantity })
        });
        const data = await response.json();
        console.log('Response:', data);
        alert('Purchase saved!');
    } catch (error) {
        console.error('Error submitting purchase:', error);
        alert('Failed to save purchase.');
    }
});
