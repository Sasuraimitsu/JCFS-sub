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
    
    // --- 1. 基本計算ロジック ---
    const yieldAmt = amt * 0.08;   // 年間配当 (8.0%)
    const savingAmt = amt * rate;  // 初年度節税額 (投資額 × 実効税率)
    const netOutlay = amt - savingAmt; // 実質投資負担額 (投資直後の持ち出し)

    // --- 2. 実質利回りの計算 (投資家が最も重視する指標) ---
    // 年間配当 ÷ 実質的な投資負担額
    const effectiveYield = (yieldAmt / netOutlay) * 100;

    // --- 3. 数値の表示更新 ---
    document.getElementById('investValue').innerText = '¥' + amt.toLocaleString();
    document.getElementById('annualReturn').innerText = '¥' + Math.floor(yieldAmt).toLocaleString();
    document.getElementById('taxSaving').innerText = '¥' + Math.floor(savingAmt).toLocaleString();
    document.getElementById('netOutlay').innerText = '¥' + Math.floor(netOutlay).toLocaleString();
    
    // 実質利回りの表示更新
    const yieldDisplay = document.getElementById('effectiveYield');
    if (yieldDisplay) {
        yieldDisplay.innerText = effectiveYield.toFixed(1) + '%';
    }

    // --- 4. 累積キャッシュフローデータ (5年間) ---
    // 0点: 投資した瞬間 (-投資額)
    // 1年目: 投資額 + 節税額 + 1年目配当
    // 2年目以降: 前年 + 配当
    const chartData = [
        -amt, // 0: 投資実行
        (-amt + savingAmt + yieldAmt), // 1年目 (節税が乗る)
        (-amt + savingAmt + (yieldAmt * 2)), // 2年目
        (-amt + savingAmt + (yieldAmt * 3)), // 3年目
        (-amt + savingAmt + (yieldAmt * 4)), // 4年目
        (-amt + savingAmt + (yieldAmt * 5))  // 5年目
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
                labels: ['投資実行', '1年目', '2年目', '3年目', '4年目', '5年目'],
                datasets: [{
                    label: '累計損益推移',
                    data: chartData,
                    borderColor: '#1e3a8a', // 信頼のネイビー
                    borderWidth: 4,
                    backgroundColor: 'rgba(30, 58, 138, 0.05)',
                    fill: true,
                    tension: 0.3,
                    pointBackgroundColor: '#c5a059', // シャンパンブロンズ
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return '累積損益: ¥' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
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
