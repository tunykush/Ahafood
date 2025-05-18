// Khôi phục trạng thái khi tải lại trang
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const chartId = params.get('chart') || 'menu';
    document.getElementById('chart-dropdown').value = chartId;
    navigateToChart(chartId);
});

// Chuyển đổi giữa các biểu đồ
function navigateToChart(chartId) {
    // Ẩn tất cả các section
    document.querySelectorAll('.chart-section').forEach(section => {
        section.style.display = 'none';
    });

    // Hiển thị section được chọn
    if (chartId) {
        document.getElementById(chartId).style.display = 'block';
    }
}

// 🥧 Best-Selling Menu Items (Pie Chart)
new Chart(document.getElementById('menuChart'), {
    type: 'pie',
    data: {
        labels: ['Milk Tea (40%)', 'Matcha Latte (38%)', 'Peach Tea (22%)'],
        datasets: [{
            data: [40, 38, 22],
            backgroundColor: ['#FF7F32', '#FFA500', '#A5D6A7'],
            borderColor: '#fff',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,  // 🔥 Fix kích thước
        plugins: {
            legend: { position: 'bottom' },
            tooltip: {
                callbacks: {
                    label: context => `${context.label}`
                }
            }
        }
    }
});

// 📈 Revenue Growth (Line Chart)
new Chart(document.getElementById('revenueChart'), {
    type: 'line',
    data: {
        labels: ['Last Month', 'This Month'],
        datasets: [{
            label: 'Revenue (VND)',
            data: [75000000, 160000000],
            borderColor: '#FF7F32',
            backgroundColor: '#FF7F32',
            tension: 0.3,
            fill: false
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,  // 🔥 Fix kích thước
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: value => value.toLocaleString('vi-VN') + ' VND'
                }
            }
        }
    }
});

// 🏆 Ranking Insight (Horizontal Bar Chart)
new Chart(document.getElementById('rankingChart'), {
    type: 'bar',
    data: {
        labels: ['#11', '#12', '#13', '👑 You (#14)', '#15', '#16', '#17'],
        datasets: [{
            data: [180, 165, 150, 140, 120, 100, 90],
            backgroundColor: ['#c2c2c2', '#c2c2c2', '#c2c2c2', '#FF7F32', '#e0e0e0', '#e0e0e0', '#e0e0e0']
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,  // 🔥 Fix kích thước
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    callback: value => value + ' triệu'
                }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: context => `${context.parsed.x} triệu VND`
                }
            }
        }
    }
});

// 🍑 Price Perception Map (Bubble Chart)
new Chart(document.getElementById('pricePerceptionChart'), {
    type: 'bubble',
    data: {
        datasets: [
            {
                label: 'You',
                data: [{ x: 45, y: 60, r: 20 }],
                backgroundColor: '#0077b6',
                borderColor: '#0077b6'
            },
            {
                label: 'Opponent Average',
                data: [
                    { x: 30, y: 20, r: 15 },
                    { x: 60, y: 80, r: 15 },
                    { x: 40, y: 50, r: 15 },
                    { x: 50, y: 30, r: 15 }
                ],
                backgroundColor: '#adb5bd',
                borderColor: '#adb5bd'
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,  // 🔥 Fix kích thước
        scales: {
            x: {
                title: { display: true, text: 'Price' },
                min: 20,
                max: 80
            },
            y: {
                title: { display: true, text: 'Units Sold' },
                min: 0,
                max: 100
            }
        },
        plugins: {
            legend: { position: 'bottom' }
        }
    }
});

// 💡 Revenue Performance (Bubble Heatmap)
new Chart(document.getElementById('revenuePerformanceHeatmap'), {
    type: 'bubble',
    data: {
        datasets: [
            {
                label: 'Revenue Performance',
                data: [
                    { x: 30, y: 60, r: 20 },
                    { x: 60, y: 30, r: 15 },
                    { x: 70, y: 70, r: 25 },
                    { x: 90, y: 40, r: 30 },
                    { x: 50, y: 90, r: 20 },
                    { x: 20, y: 20, r: 10 }
                ],
                backgroundColor: context => {
                    const value = context.raw.r;
                    const alpha = Math.min(value / 30, 1);
                    return `rgba(255, 127, 50, ${alpha})`;
                },
                borderWidth: 2,
                borderColor: '#fff'
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,  // 🔥 Fix kích thước
        scales: {
            x: { min: 0, max: 100 },
            y: { min: 0, max: 100 }
        },
        plugins: {
            legend: { display: false }
        }
    }
});
