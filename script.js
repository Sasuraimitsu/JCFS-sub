// --- 1. VIEW SWITCHING ---
function switchView(id) {
    document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
    const target = document.getElementById('view-' + id);
    if (target) {
        target.classList.add('active');
        window.scrollTo(0, 0);
        if (id === 'home') { updateSim(); }
        if (id === 'tech') { initMarketChart(); }
    }
}

// --- 2. SIMULATION LOGIC ---
function updateSim() {
    const amt = parseInt(document.getElementById('investRange').value);
    const rate = parseFloat(document.getElementById('taxRate').value);
    
    const yieldAmt = amt * 0.08;
    const savingAmt = amt * rate;
    const outlayAmt = amt - savingAmt - yieldAmt;

    // UI Update
    document.getElementById('investValue').innerText = '¥' + amt.toLocaleString();
    document.getElementById('annualReturn').innerText = '¥' + Math.floor(yieldAmt).toLocaleString();
    document.getElementById('taxSaving').innerText = '¥' + Math.floor(savingAmt).toLocaleString();
    document.getElementById('netOutlay').innerText = '¥' + Math.floor(outlayAmt).toLocaleString();

    updateSimChart(savingAmt, yieldAmt, amt);
}

// --- 3. CHART INITIALIZATION ---
let simChart;
function updateSimChart(saving, yield, amt) {
    const data = [0, (saving + yield) - amt, (saving + yield * 2) - amt, (saving + yield * 3) - amt, (saving + yield * 4) - amt, (saving + yield * 5)];
    const ctx = document.getElementById('simChart').getContext('2d');

    if (simChart) {
        simChart.data.datasets[0].data = data;
        simChart.update();
    } else {
        simChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['投資前', '1年目', '2年目', '3年目', '4年目', '5年目'],
                datasets: [{
                    data: data,
                    borderColor: '#1e3a8a',
                    backgroundColor: 'rgba(30, 58, 138, 0.05)',
                    fill: true,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } }
            }
        });
    }
}

// --- INIT ---
window.onload = () => {
    updateSim();
    document.getElementById('investRange').addEventListener('input', updateSim);
    document.getElementById('taxRate').addEventListener('change', updateSim);
};
let simChart;

function updateSim() {
    const range = document.getElementById('investRange');
    const tax = document.getElementById('taxRate');
    const amt = parseInt(range.value);
    const rate = parseFloat(tax.value);
    
    // 計算ロジック
    const yieldAmt = amt * 0.08;
    const savingAmt = amt * rate;
    const netOutlay = amt - savingAmt - yieldAmt;

    // テキスト更新
    document.getElementById('investValue').innerText = '¥' + amt.toLocaleString();
    document.getElementById('annualReturn').innerText = '¥' + Math.floor(yieldAmt).toLocaleString();
    document.getElementById('taxSaving').innerText = '¥' + Math.floor(savingAmt).toLocaleString();
    document.getElementById('netOutlay').innerText = '¥' + Math.floor(netOutlay).toLocaleString();

    // グラフデータ更新 (5年間の累積)
    const chartData = [
        0, 
        (savingAmt + yieldAmt) - amt,
        (savingAmt + yieldAmt * 2) - amt,
        (savingAmt + yieldAmt * 3) - amt,
        (savingAmt + yieldAmt * 4) - amt,
        (savingAmt + yieldAmt * 5)
    ];

    if (simChart) {
        simChart.data.datasets[0].data = chartData;
        simChart.update();
    } else {
        const ctx = document.getElementById('simChart').getContext('2d');
        simChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['投資前', '1年目', '2年目', '3年目', '4年目', '5年目(元本)'],
                datasets: [{
                    data: chartData,
                    borderColor: '#1e3a8a',
                    backgroundColor: 'rgba(30, 58, 138, 0.05)',
                    fill: true,
                    tension: 0.3,
                    pointBackgroundColor: '#b45309',
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { ticks: { callback: v => '¥' + (v/10000).toLocaleString() + '万' } }
                }
            }
        });
    }
}

// 初期化とイベント登録
window.onload = () => {
    updateSim();
    document.getElementById('investRange').addEventListener('input', updateSim);
    document.getElementById('taxRate').addEventListener('change', updateSim);
};
