const orders = [
    {
        code: "1111", food: "1 PIZZA BÒ BĂM", qty: 1, shipper: "Nguyễn Thanh Hùng",
        distance: 2, time: "10:30", eta: "10:40", status: "XÁC NHẬN", confirmed: true
    },
    {
        code: "1112", food: "1 PIZZA HẢI SẢN, 4 CÁNH GÀ", qty: 5, shipper: "Lê Thành Nhân",
        distance: 0.5, time: "10:35", eta: "10:40", status: "XÁC NHẬN", confirmed: true
    },
    {
        code: "1114", food: "2 PIZZA GÀ, 3 SALAD", qty: 5, shipper: "Trần Trọng Nghĩa",
        distance: 3, time: "10:40", eta: "11:00", status: "CHỜ", confirmed: false
    },
    {
        code: "1113", food: "10 ỨC GÀ, 5 PIZZA, 10 COCA", qty: 25, shipper: "Nguyễn Thu Hường",
        distance: 5, time: "11:00", eta: "11:10", status: "CHỜ", confirmed: false
    },
    {
        code: "1115", food: "5 PIZZA, 10 COCA", qty: 15, shipper: "Công Dương Danh",
        distance: 10, time: "12:00", eta: "12:20", status: "CHỜ", confirmed: false
    },
    {
        code: "1117", food: "10 COCA", qty: 10, shipper: "Công Dương Danh",
        distance: 10, time: "10:00", eta: "10:20", status: "CHỜ", confirmed: false
    },
    {
        code: "1119", food: "2 DA GÀ, 3 KHOAI TÂY CHIÊN", qty: 5, shipper: "Nguyễn Thu Hường",
        distance: 3, time: "13:00", eta: "13:10", status: "CHỜ", confirmed: false
    },
    {
        code: "1116", food: "1 PIZZA, 1 COCA", qty: 2, shipper: "Lê Thành Nhân",
        distance: 7, time: "12:10", eta: "12:25", status: "CHỜ", confirmed: false
    },
    {
        code: "1118", food: "1 PIZZA, 1 BÁNH MÌ BƠ TỎI, 1 COCA", qty: 3, shipper: "Nguyễn Thanh Hùng",
        distance: 9, time: "12:00", eta: "12:20", status: "CHỜ", confirmed: false
    },
    {
        code: "1120", food: "3 KHOAI TÂY CHIÊN", qty: 3, shipper: "Trần Trọng Nghĩa",
        distance: 5, time: "11:30", eta: "11:45", status: "CHỜ", confirmed: false
    }
];

function renderTable() {
    const tbody = document.getElementById("orderBody");
    tbody.innerHTML = "";
    orders.forEach((o, i) => {
        const tr = document.createElement("tr");
        if (o.confirmed) tr.classList.add("confirmed");
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
            ${o.confirmed ? "" : `
                <button onclick="confirmOrder(${i})">Xác nhận</button>
                <button onclick="cannotDeliver(${i})" style="margin-top:5px; background:red;">Không thể đến</button>
            `}
        </td>
        `;
        tbody.appendChild(tr);
    });
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
        order.status = "CHUYỂN ĐƠN";
        alert(`Đơn hàng đã được chuyển cho shipper khác: ${newShipper.name}`);
    } else {
        alert("Không có shipper dự phòng phù hợp.");
    }

    renderTable();
}

function confirmOrder(index) {
    const order = orders[index];

    const orderTime = parseInt(order.time.split(":")[0]) * 60 + parseInt(order.time.split(":")[1]);

    const now = 10 * 60 + 15;
    const delay = now - orderTime;

    if (delay > 10) {
        alert(`Shipper quá giờ (${delay} phút). Đơn hàng sẽ được chuyển cho người khác.`);
        cannotDeliver(index);
        return;
    }

    order.confirmed = true;
    order.status = "XÁC NHẬN";

    const fixed = orders.slice(0, 2);
    const toSort = orders.slice(2);

    toSort.sort((a, b) => {
        if (a.distance !== b.distance) return a.distance - b.distance;
        if (a.qty !== b.qty) return a.qty - b.qty;
        return a.time.localeCompare(b.time);
    });

    const newOrders = [...fixed, ...toSort];

    for (let i = 0; i < orders.length; i++) {
        orders[i] = newOrders[i];
    }

    renderTable();
}

