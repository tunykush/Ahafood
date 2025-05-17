// Chart.js - Best-Selling Menu Items (Pie Chart)
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

// Chart.js - Revenue Growth (Line Chart)
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

// Chart.js - Ranking (Horizontal Bar Chart)
new Chart(document.getElementById('rankingChart'), {
    type: 'bar',
    data: {
        labels: ['#11', '#12', '#13', '👑 You (#14)', '#15', '#16', '#17'],
        datasets: [{
            data: [180, 165, 150, 140, 120, 100, 90],
            backgroundColor: [
                '#c2c2c2', '#c2c2c2', '#c2c2c2',
                '#FF7F32', 
                '#e0e0e0', '#e0e0e0', '#e0e0e0'
            ]
        }]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
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


// Chart.js - Price Perception Map
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
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Price'
                },
                min: 20,
                max: 80,
                grid: {
                    color: 'rgba(0,0,0,0.05)'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Units Sold'
                },
                min: 0,
                max: 100,
                grid: {
                    color: 'rgba(0,0,0,0.05)'
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: context => 
                        context.dataset.label === 'You'
                        ? 'Me (Peach Tea)'
                        : 'Opponent Average'
                }
            },
            legend: {
                position: 'bottom'
            }
        }
    }
});

// Gradient Heatmap for Revenue Performance
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
                backgroundColor: function(context) {
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
        scales: {
            x: {
                min: 0,
                max: 100,
                grid: { display: false },
                title: { display: true, text: 'Performance (%)' }
            },
            y: {
                min: 0,
                max: 100,
                grid: { display: false },
                title: { display: true, text: 'Market Position (%)' }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: context => `Revenue: ${context.raw.r * 10}M VND`
                }
            }
        }
    }
});

// Section Filter Logic for Dropdown
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.filter-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show the selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// Show the first section by default
document.addEventListener('DOMContentLoaded', () => {
    showSection('menu');
});
