let simChart;

function updateSim() {
    const rangeInput = document.getElementById('investRange');
    const taxSelect = document.getElementById('taxRate');
    
    if (!rangeInput || !taxSelect) return;

    const amt = parseInt(rangeInput.value);
    const rate = parseFloat(taxSelect.value);
    
    // 計算ロジック
    const yieldAmt = amt * 0.08;
    const savingAmt = amt * rate;
    const netOutlay = amt - savingAmt - yieldAmt;

    // 数値の表示更新
    document.getElementById('investValue').innerText = '¥' + amt.toLocaleString();
    document.getElementById('annualReturn').innerText = '¥' + Math.floor(yieldAmt).toLocaleString();
    document.getElementById('taxSaving').innerText = '¥' + Math.floor(savingAmt).toLocaleString();
    document.getElementById('netOutlay').innerText = '¥' + Math.floor(netOutlay).toLocaleString();

    // グラフデータの生成 (累積キャッシュフロー)
    const data = [
        0, 
        (savingAmt + yieldAmt) - amt,        // 1年目 (節税+配当 - 投資額)
        (savingAmt + yieldAmt * 2) - amt,    // 2年目
        (savingAmt + yieldAmt * 3) - amt,    // 3年目
        (savingAmt + yieldAmt * 4) - amt,    // 4年目
        (savingAmt + yieldAmt * 5)           // 5年目 (元本返還を想定した累積)
    ];

    if (simChart) {
        simChart.data.datasets[0].data = data;
        simChart.update();
    } else {
        const ctx = document.getElementById('simChart').getContext('2d');
        simChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['投資前', '1年目', '2年目', '3年目', '4年目', '5年目'],
                datasets: [{
                    label: '累計キャッシュフロー',
                    data: data,
                    borderColor: '#1e3a8a',
                    borderWidth: 4,
                    backgroundColor: 'rgba(30, 58, 138, 0.05)',
                    fill: true,
                    tension: 0.3,
                    pointBackgroundColor: '#b45309',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { 
                        grid: { color: '#f1f5f9' },
                        ticks: { 
                            callback: v => '¥' + (v/10000).toLocaleString() + '万',
                            font: { weight: 'bold' }
                        } 
                    },
                    x: { grid: { display: false } }
                }
            }
        });
    }
}

// 初期実行とリスナー登録
window.onload = updateSim;
document.getElementById('investRange').addEventListener('input', updateSim);
document.getElementById('taxRate').addEventListener('change', updateSim);
