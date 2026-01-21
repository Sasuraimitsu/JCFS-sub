let simChart = null;

function updateSim() {
    // 要素の取得
    const rangeInput = document.getElementById('investRange');
    const taxSelect = document.getElementById('taxRate');
    const canvas = document.getElementById('simChart');

    // 要素が一つでも足りなければ処理を中断
    if (!rangeInput || !taxSelect || !canvas) {
        console.error("必要な要素が見つかりません。IDを確認してください。");
        return;
    }

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

    // 累積キャッシュフローデータ
    const chartData = [
        0, 
        (savingAmt + yieldAmt) - amt,
        (savingAmt + (yieldAmt * 2)) - amt,
        (savingAmt + (yieldAmt * 3)) - amt,
        (savingAmt + (yieldAmt * 4)) - amt,
        (savingAmt + (yieldAmt * 5))
    ];

    const ctx = canvas.getContext('2d');

    if (simChart) {
        // 既存のグラフがあればデータを更新
        simChart.data.datasets[0].data = chartData;
        simChart.update();
    } else {
        // 初回描画
        simChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['投資前', '1年目', '2年目', '3年目', '4年目', '5年目'],
                datasets: [{
                    label: '累計キャッシュフロー',
                    data: chartData,
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

// ページ読み込み完了時に実行
document.addEventListener('DOMContentLoaded', () => {
    updateSim();
    
    const rangeInput = document.getElementById('investRange');
    const taxSelect = document.getElementById('taxRate');
    
    if(rangeInput) rangeInput.addEventListener('input', updateSim);
    if(taxSelect) taxSelect.addEventListener('change', updateSim);
});
