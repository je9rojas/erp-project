document.addEventListener('DOMContentLoaded', () => {
    const purchaseForm = document.getElementById('purchaseForm');
    const purchaseTable = document.getElementById('purchaseHistoryTable').getElementsByTagName('tbody')[0];

    // Enviar formulario al backend
    purchaseForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Obtener datos del formulario
        const purchaseData = {
            code: document.getElementById('code').value,
            productType: document.getElementById('productType').value,
            marca: document.getElementById('marca').value,
            quantity: parseInt(document.getElementById('quantity').value, 10),
            price: parseFloat(document.getElementById('price').value),
            purchaseDate: document.getElementById('purchaseDate').value,
        };

        try {
            // Enviar datos al backend
            const response = await fetch('http://localhost:3000/purchases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(purchaseData),
            });

            const result = await response.json();
            if (response.ok) {
                alert('Compra registrada exitosamente.');
                addPurchaseToTable(result.data);
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error submitting purchase:', error);
            alert('Error al registrar la compra.');
        }
    });

    // Agregar una fila a la tabla
    function addPurchaseToTable(purchase) {
        const row = purchaseTable.insertRow();
        row.innerHTML = `
            <td>${purchase.code}</td>
            <td>${purchase.productType}</td>
            <td>${purchase.marca}</td>
            <td>${purchase.quantity}</td>
            <td>${purchase.price}</td>
            <td>${purchase.purchaseDate}</td>
        `;
    }
});
