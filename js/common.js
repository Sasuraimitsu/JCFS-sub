/* ==========================================
   JCFS Project - 共通JS
   全ページで読み込む
   ナビゲーション・フッターを動的生成
   ========================================== */

// 現在のページ名を取得
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

// ナビゲーションHTML
const navHTML = `
<nav class="fixed top-0 left-0 w-full z-50 bg-white/95 border-b border-slate-200 shadow-sm" id="main-nav">
    <div class="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">

        <!-- ロゴ -->
        <a href="index.html" class="flex items-center no-underline">
            <img src="assets/metis-logo.jpg" alt="株式会社METIS"
                 class="h-10 w-auto mr-3 object-contain"
                 onerror="this.style.display='none'">
            <span class="text-2xl font-bold text-slate-900 tracking-tighter italic">JCFS Project</span>
        </a>

        <!-- PCナビ -->
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

        <!-- 右側：お問い合わせ + ハンバーガー -->
        <div class="flex items-center gap-3">
            <a href="https://line.me/R/ti/p/WA5-yz4DJQ"
               target="_blank" rel="noopener noreferrer"
               class="bg-[#06C755] hover:bg-[#05a346] text-white font-bold py-2.5 px-6 rounded shadow-md transition-all no-underline flex items-center">
                お問い合わせ
            </a>

            <!-- ハンバーガーボタン（モバイルのみ表示） -->
            <button id="menu-btn"
                    class="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-slate-100 transition-all"
                    aria-label="メニュー">
                <span id="bar1" class="block w-6 h-0.5 bg-slate-700 transition-all duration-300"></span>
                <span id="bar2" class="block w-6 h-0.5 bg-slate-700 mt-1.5 transition-all duration-300"></span>
                <span id="bar3" class="block w-6 h-0.5 bg-slate-700 mt-1.5 transition-all duration-300"></span>
            </button>
        </div>
    </div>

    <!-- モバイルメニュー（初期非表示） -->
    <div id="mobile-menu"
         class="lg:hidden hidden bg-white border-t border-slate-100 shadow-lg">
        <div class="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            <a href="index.html"
               class="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all
                      ${currentPage === 'index.html'
                          ? 'bg-blue-50 text-blue-800'
                          : 'text-slate-700 hover:bg-slate-50'}">
                <span class="text-lg">🏠</span>
                ホーム
            </a>
            <a href="tech.html"
               class="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all
                      ${currentPage === 'tech.html'
                          ? 'bg-blue-50 text-blue-800'
                          : 'text-slate-700 hover:bg-slate-50'}">
                <span class="text-lg">🚢</span>
                <span>
                    <span class="text-xs font-black text-blue-500 block uppercase tracking-widest">Deep Dive 01</span>
                    何故、FRP漁船を?
                </span>
            </a>
            <a href="strategy.html"
               class="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all
                      ${currentPage === 'strategy.html'
                          ? 'bg-blue-50 text-blue-800'
                          : 'text-slate-700 hover:bg-slate-50'}">
                <span class="text-lg">📍</span>
                <span>
                    <span class="text-xs font-black text-blue-500 block uppercase tracking-widest">Deep Dive 02</span>
                    何故、この地域に?
                </span>
            </a>
            <a href="governance.html"
               class="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all
                      ${currentPage === 'governance.html'
                          ? 'bg-blue-50 text-blue-800'
                          : 'text-slate-700 hover:bg-slate-50'}">
                <span class="text-lg">🏛️</span>
                <span>
                    <span class="text-xs font-black text-blue-500 block uppercase tracking-widest">Deep Dive 03</span>
                    何故、JCFSが展開できるのか?
                </span>
            </a>
            <div class="mt-2 pt-2 border-t border-slate-100">
                <a href="index.html#simulation-start"
                   class="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-blue-600 text-white font-black text-sm hover:bg-blue-700 transition-all no-underline">
                    📊 投資シミュレーションへ
                </a>
            </div>
        </div>
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

// DOMに挿入 + ハンバーガーメニューの動作を設定
document.addEventListener('DOMContentLoaded', () => {

    // ナビゲーション挿入
    const navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) {
        navPlaceholder.innerHTML = navHTML;

        // ハンバーガーボタンの動作
        const menuBtn = document.getElementById('menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const bar1 = document.getElementById('bar1');
        const bar2 = document.getElementById('bar2');
        const bar3 = document.getElementById('bar3');

        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => {
                const isOpen = !mobileMenu.classList.contains('hidden');

                if (isOpen) {
                    // 閉じる → ハンバーガーに戻す
                    mobileMenu.classList.add('hidden');
                    bar1.style.transform = '';
                    bar2.style.opacity = '1';
                    bar3.style.transform = '';
                } else {
                    // 開く → ✕に変える
                    mobileMenu.classList.remove('hidden');
                    bar1.style.transform = 'translateY(8px) rotate(45deg)';
                    bar2.style.opacity = '0';
                    bar3.style.transform = 'translateY(-8px) rotate(-45deg)';
                }
            });

            // メニュー外クリックで閉じる
            document.addEventListener('click', (e) => {
                const nav = document.getElementById('main-nav');
                if (nav && !nav.contains(e.target)) {
                    mobileMenu.classList.add('hidden');
                    bar1.style.transform = '';
                    bar2.style.opacity = '1';
                    bar3.style.transform = '';
                }
            });
        }
    }

    // フッター挿入
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) footerPlaceholder.innerHTML = footerHTML;
});
