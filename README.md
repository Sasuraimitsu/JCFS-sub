# GitHubアップロード手順

## 今回アップするファイル一覧

### 新規作成（フォルダごと追加）
```
css/common.css   ← 全ページ共通スタイル
css/index.css    ← index.html専用スタイル（ヒーローなど）
js/common.js     ← 全ページ共通JS（ナビ・フッター自動生成）
js/index.js      ← index.html専用JS（シミュレーター）
```

### 差し替え
```
index.html       ← 共通化対応済み
strategy.html    ← 共通化対応済み＋内容リニューアル
```

### 削除
```
style.css        ← common.css + index.css に統合済み
app.js           ← js/index.js にリネーム済み
```

---

## アップ後の確認ポイント

1. **ナビゲーション**が表示されるか
2. **フッター**が表示されるか
3. **シミュレーター**が動作するか（index.htmlのみ）
4. 表示がおかしい場合は `Ctrl+Shift+R` でキャッシュクリア

---

## 次回対応予定
- tech.html（共通化対応）
- governance.html（共通化対応）
