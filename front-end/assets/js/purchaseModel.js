// Esperar a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {
    const purchaseForm = document.getElementById('purchaseForm'); // Referencia al formulario de compras
    const purchaseTable = document.getElementById('purchaseHistoryTable').getElementsByTagName('tbody')[0]; // Referencia al cuerpo de la tabla de historial

    // Cargar el historial de compras al iniciar la aplicación
    async function loadPurchaseHistory() {
        try {
            console.log('Fetching purchase history...');
            // Solicitar historial de compras al backend
            const response = await fetch('http://localhost:3000/purchases', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const purchases = await response.json();
                // Agregar cada compra al historial de la tabla
                purchases.forEach(addPurchaseToTable);
                console.log('Purchase history loaded successfully.');
            } else {
                console.error('Error fetching purchase history:', await response.text());
                alert('Error al cargar el historial de compras.');
            }
        } catch (error) {
            console.error('Error loading purchase history:', error);
            alert('Error al conectar con el servidor para cargar el historial de compras.');
        }
    }

    // Llamar a la función para cargar el historial de compras al iniciar
    loadPurchaseHistory();

    // Manejar el evento de envío del formulario
    purchaseForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevenir el envío estándar del formulario

        // Obtener los datos ingresados en el formulario
        const purchaseData = {
            code: document.getElementById('code').value,
            productType: document.getElementById('productType').value,
            marca: document.getElementById('marca').value,
            quantity: parseInt(document.getElementById('quantity').value, 10),
            price: parseFloat(document.getElementById('price').value),
            purchaseDate: document.getElementById('purchaseDate').value,
        };

        try {
            console.log('Submitting purchase data:', purchaseData);
            // Enviar los datos al backend mediante una solicitud POST
            const response = await fetch('http://localhost:3000/purchases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(purchaseData),
            });

            const result = await response.json();
            if (response.ok) {
                alert('Compra registrada exitosamente.');
                addPurchaseToTable(result.data); // Agregar la nueva compra a la tabla
            } else {
                console.error('Error response from server:', result.message);
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error submitting purchase:', error);
            alert('Error al registrar la compra.');
        }
    });

    // Función para agregar una fila a la tabla de historial
    function addPurchaseToTable(purchase) {
        const row = purchaseTable.insertRow(); // Crear una nueva fila en el cuerpo de la tabla
        row.innerHTML = `
            <td>${purchase.code}</td>
            <td>${purchase.productType}</td>
            <td>${purchase.marca}</td>
            <td>${purchase.quantity}</td>
            <td>${purchase.price}</td>
            <td>${purchase.purchaseDate}</td>
            <td>
                <button class="delete-btn" data-id="${purchase._id}">Eliminar</button>
            </td>
        `;

        // Agregar evento al botón de eliminar
        const deleteButton = row.querySelector('.delete-btn');
        deleteButton.addEventListener('click', () => deletePurchase(purchase._id, row));
    }

    // Función para eliminar una compra
    async function deletePurchase(purchaseId, row) {
        try {
            console.log(`Deleting purchase with ID: ${purchaseId}`);
            // Enviar solicitud DELETE al backend
            const response = await fetch(`http://localhost:3000/purchases/${purchaseId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                alert('Compra eliminada exitosamente.');
                row.remove(); // Eliminar la fila de la tabla
            } else {
                console.error('Error deleting purchase:', await response.text());
                alert('Error al eliminar la compra.');
            }
        } catch (error) {
            console.error('Error deleting purchase:', error);
            alert('Error al conectar con el servidor para eliminar la compra.');
        }
    }
});
