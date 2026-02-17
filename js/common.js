/* ==========================================
   JCFS Project - 共通JS
   全ページで読み込む
   ナビゲーション・フッターを動的生成
   ========================================== */

// 現在のページ名を取得
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

// ナビゲーションHTML
const navHTML = `
<nav class="sticky top-0 w-full z-50 bg-white/95 border-b border-slate-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
        <a href="index.html" class="flex items-center no-underline">
            <img src="assets/metis-logo.jpg" alt="株式会社METIS"
                 class="h-10 w-auto mr-3 object-contain"
                 onerror="this.style.display='none'">
            <span class="text-2xl font-bold text-slate-900 tracking-tighter italic">JCFS Project</span>
        </a>

        <div class="hidden lg:flex space-x-8">
            <a href="index.html"
               class="nav-link ${currentPage === 'index.html' ? 'active' : ''}">
                ホーム
            </a>
            <a href="tech.html"
               class="nav-link ${currentPage === 'tech.html' ? 'active' : ''}">
                深掘り01 何故、FRP漁船を?
            </a>
            <a href="strategy.html"
               class="nav-link ${currentPage === 'strategy.html' ? 'active' : ''}">
                深掘り02 何故、この地域に?
            </a>
            <a href="governance.html"
               class="nav-link ${currentPage === 'governance.html' ? 'active' : ''}">
                深掘り03 何故、JCFSが展開できるのか?
            </a>
        </div>

        <a href="https://line.me/R/ti/p/WA5-yz4DJQ"
           target="_blank" rel="noopener noreferrer"
           class="bg-[#06C755] hover:bg-[#05a346] text-white font-bold py-2.5 px-6 rounded shadow-md transition-all no-underline flex items-center">
            お問い合わせ
        </a>
    </div>
</nav>
`;

// フッターHTML
const footerHTML = `
<footer class="bg-slate-900 py-16 text-center border-t border-white/10">
    <p class="text-slate-500 text-xs font-bold">
        © 2026 JCFS Project / METIS Co., Ltd. All Rights Reserved.
    </p>
    <p class="text-slate-600 text-xs mt-2">
        証憑番号：7水管第842号（水産庁） / T-MA-25-300018（経済産業省）
    </p>
</footer>
`;

// DOMに挿入
document.addEventListener('DOMContentLoaded', () => {
    const navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) navPlaceholder.innerHTML = navHTML;

    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) footerPlaceholder.innerHTML = footerHTML;
});

