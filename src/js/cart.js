document.addEventListener('DOMContentLoaded', function () {
    // Retrieve liked items from local storage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Get a reference to the table body
    const tableBody = document.querySelector('table tbody');

    // Loop through the liked items and create table rows
    cart.forEach(function (item, index) {
        const row = tableBody.insertRow(index);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);

        // Create image element and set the source
        const img = document.createElement('img');
        img.src = item.imgSrc;
        img.style.width = "200px"; // Set the image size to 200px
        img.style.height = "200px"; // Set the image size to 200px
        cell1.appendChild(img);

        // Set the description
        cell2.textContent = item.description;
    });
});
