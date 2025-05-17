const orders = [
    {
        code: "1112", food: "1 Minced Beef Pizza", qty: 1, shipper: "Nguyen Thanh Hung",
        distance: 1.0, time: "10:05", eta: "10:15", status: "CONFIRMED", confirmed: true
    },
    {
        code: "1111", food: "1 Seafood Pizza, 2 Crispy Fried Chicken Wings", qty: 3, shipper: "Le Thanh Nhan",
        distance: 1.5, time: "10:00", eta: "10:25", status: "CONFIRMED", confirmed: true
    },
    {
        code: "1113", food: "1 Chicken Pizza", qty: 5, shipper: "Tran Trong Nghia",
        distance: 2.0, time: "10:10", eta: "10:40", status: "PENDING", confirmed: false
    },
    {
        code: "1115", food: "5 Mixed Pizzas, 5 Fried Chicken Wings with Fish Sauce", qty: 10, shipper: "Nguyen Thu Huong",
        distance: 2.5, time: "10:20", eta: "10:45", status: "PENDING", confirmed: false
    },
    {
        code: "1114", food: "5 Seafood Pizzas, 10 Cokes", qty: 15, shipper: "Nguyen Minh Khoa",
        distance: 4.0, time: "10:30", eta: "10:55", status: "PENDING", confirmed: false
    }
];


function renderTable() {
    const tbody = document.getElementById("orderBody");
    tbody.innerHTML = "";
    orders.forEach((o, i) => {
        const tr = document.createElement("tr");
        
        // Phân loại trạng thái
        if (o.status === "COMPLETED") tr.classList.add("completed");
        else if (o.confirmed) tr.classList.add("confirmed");

        // Tạo nội dung cho mỗi hàng
        tr.innerHTML = `
        <td>${i + 1}</td>
        <td>${o.code}</td>
        <td>${o.food}</td>
        <td>${o.qty}</td>
        <td>${o.shipper}</td>
        <td>${o.distance}</td>
        <td>${o.time}</td>
        <td>${o.eta}</td>
        <td>${o.status}</td>
        <td>
            ${o.status === "COMPLETED" ? "" : o.confirmed ? `
                <button onclick="completeOrder(${i})" style="background: #28a745; color: white;">Completed</button>
            ` : `
                <button onclick="confirmOrder(${i})">Confirm</button>
                <button onclick="cannotDeliver(${i})" style="margin-top:5px; background:red;">Cannot Arrive</button>
            `}
        </td>
        `;
        tbody.appendChild(tr);
    });
}
function completeOrder(index) {
    const order = orders[index];
    if (order.confirmed && order.status !== "COMPLETED") {
        order.status = "COMPLETED";
        renderTable();
    }
}


function confirmOrder(index) {
    orders[index].confirmed = true;
    orders[index].status = "XÁC NHẬN";

    const fixed = orders.slice(0, 2);
    const toSort = orders.slice(2);

    toSort.sort((a, b) => {
        if (a.distance !== b.distance) {
        return a.distance - b.distance;
        }
        if (a.qty !== b.qty) {
        return a.qty - b.qty;
        }
        return a.time.localeCompare(b.time);
    });

    const newOrders = [...fixed, ...toSort];

    for (let i = 0; i < orders.length; i++) {
        orders[i] = newOrders[i];
    }

    renderTable();
}

renderTable();

const shipperPositions = [
    { name: "Nguyễn Thanh Hùng", lat: 10.7812, lng: 106.7199 },
    { name: "Lê Thành Nhân", lat: 10.7798, lng: 106.6991 },
    { name: "Trần Trọng Nghĩa", lat: 10.7752, lng: 106.7035 },
    { name: "Nguyễn Thu Hường", lat: 10.7743, lng: 106.6987 },
    { name: "Công Dương Danh", lat: 10.7700, lng: 106.6870 }
];

const map = L.map('map').setView([10.7769, 106.7009], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

shipperPositions.forEach((shipper, index) => {
    L.marker([shipper.lat, shipper.lng])
        .addTo(map)
        .bindPopup(`<strong>Ship#${index + 1}</strong><br>${shipper.name}`);
});

const backupShippers = [
  { name: "Phạm Hồng Quân", distance: 1.5 },
  { name: "Vũ Minh Hiếu", distance: 1.2 },
  { name: "Ngô Thị Bích", distance: 2.0 }
];

function cannotDeliver(index) {
    const order = orders[index];
    const newShipper = backupShippers.find(s => s.distance < order.distance);

    if (newShipper) {
        order.shipper = newShipper.name;
        order.distance = newShipper.distance;
        order.status = "Transfered";
        alert(`The parcel has been transfered to another person: ${newShipper.name}`);
    } else {
        alert("No backup delivery man fit on this situation");
    }

    renderTable();
}

function confirmOrder(index) {
    const order = orders[index];

    // Check for delivery delay
    const orderTime = parseInt(order.time.split(":")[0]) * 60 + parseInt(order.time.split(":")[1]);
    const now = 10 * 60 + 15;
    const delay = now - orderTime;

    if (delay > 10) {
        alert(`Delivery man got overtime (${delay} minutes). The parcel will be transferred to another person.`);
        cannotDeliver(index);
        return;
    }

    // Confirm the order
    order.confirmed = true;
    order.status = "CONFIRMED";

    // Separate fixed and flexible orders
    const fixedOrders = orders.slice(0, 2);  // First two fixed orders
    const flexibleOrders = orders.slice(2);  // Remaining orders

    // Move the confirmed order to the first position of the flexible list
    flexibleOrders.splice(flexibleOrders.indexOf(order), 1);  // Remove the order from its current position
    flexibleOrders.unshift(order);  // Add it to the start of the flexible section

    // Reorganize the full order list
    const newOrders = [...fixedOrders, ...flexibleOrders];

    // Update the main orders list
    for (let i = 0; i < orders.length; i++) {
        orders[i] = newOrders[i];
    }

    renderTable();
}

