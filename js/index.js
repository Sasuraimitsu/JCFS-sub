/* ==========================================
   JCFS Project - index.html 専用JS
   投資シミュレーター
   ========================================== */

let simChart = null;

function updateSim() {
    const rangeInput = document.getElementById('investRange');
    const taxSelect = document.getElementById('taxRate');
    const canvas = document.getElementById('simChart');

    if (!rangeInput || !taxSelect || !canvas) {
        console.error("必要な要素が見つかりません。IDを確認してください。");
        return;
    }

    const amt = parseInt(rangeInput.value);
    const rate = parseFloat(taxSelect.value);

    // 基本計算
    const yieldAmt = amt * 0.08;
    const savingAmt = amt * rate;
    const netOutlay = amt - savingAmt;
    const effectiveYield = (yieldAmt / netOutlay) * 100;

    // 数値表示更新
    document.getElementById('investValue').innerText = '¥' + amt.toLocaleString();
    document.getElementById('annualReturn').innerText = '¥' + Math.floor(yieldAmt).toLocaleString();
    document.getElementById('taxSaving').innerText = '¥' + Math.floor(savingAmt).toLocaleString();
    document.getElementById('netOutlay').innerText = '¥' + Math.floor(netOutlay).toLocaleString();

    const yieldDisplay = document.getElementById('effectiveYield');
    if (yieldDisplay) {
        yieldDisplay.innerText = effectiveYield.toFixed(1) + '%';
    }

    // 累積キャッシュフローデータ（5年間）
    const chartData = [
        -amt,
        (-amt + savingAmt + yieldAmt),
        (-amt + savingAmt + (yieldAmt * 2)),
        (-amt + savingAmt + (yieldAmt * 3)),
        (-amt + savingAmt + (yieldAmt * 4)),
        (-amt + savingAmt + (yieldAmt * 5))
    ];

    const ctx = canvas.getContext('2d');

    if (simChart) {
        simChart.data.datasets[0].data = chartData;
        simChart.update();
    } else {
        simChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['投資実行', '1年目', '2年目', '3年目', '4年目', '5年目'],
                datasets: [{
                    label: '累計損益推移',
                    data: chartData,
                    borderColor: '#1e3a8a',
                    borderWidth: 4,
                    backgroundColor: 'rgba(30, 58, 138, 0.05)',
                    fill: true,
                    tension: 0.3,
                    pointBackgroundColor: '#c5a059',
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
                            callback: v => '¥' + (v / 10000).toLocaleString() + '万',
                            font: { weight: 'bold' }
                        }
                    },
                    x: { grid: { display: false } }
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateSim();

    const rangeInput = document.getElementById('investRange');
    const taxSelect = document.getElementById('taxRate');

    if (rangeInput) rangeInput.addEventListener('input', updateSim);
    if (taxSelect) taxSelect.addEventListener('change', updateSim);
});
