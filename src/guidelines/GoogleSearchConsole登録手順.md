# Google Search Console 登録手順

このドキュメントでは、合同会社HACSのウェブサイトをGoogle Search Consoleに登録する方法を説明します。

## 📋 準備完了項目

以下の項目は既に実装済みです：

✅ **SEOメタタグ** - 全ページにSEO最適化されたメタタグを実装
✅ **構造化データ** - JSON-LD形式で企業情報を記述
✅ **サイトマップ** - `/public/sitemap.xml` に配置
✅ **robots.txt** - `/public/robots.txt` に配置
✅ **OGPタグ** - SNSシェア用のOpen Graphタグ
✅ **Twitter Card** - Twitter共有用のメタタグ

## 🚀 Google Search Console 登録手順

### ステップ1: Google Search Consoleにアクセス

1. [Google Search Console](https://search.google.com/search-console) にアクセス
2. Googleアカウントでログイン

### ステップ2: プロパティを追加

1. 左上の「プロパティを追加」をクリック
2. **URLプレフィックス**を選択
3. ウェブサイトのURL `https://h-a-c.com` を入力
4. 「続行」をクリック

### ステップ3: 所有権の確認（推奨方法：HTMLタグ）

Google Search Consoleが提供する確認方法から「HTMLタグ」を選択します。

#### 確認用メタタグの追加方法：

1. Google Search Consoleに表示される確認用メタタグをコピー
   ```html
   <meta name="google-site-verification" content="あなたの確認コード" />
   ```

2. `/components/SEOHelmet.tsx` を編集
   
3. `App.tsx` の `HomePage` 関数内の SEOHelmet 呼び出しに `googleSiteVerification` を追加：
   ```tsx
   <SEOHelmet 
     {...pageSEO.home} 
     googleSiteVerification="あなたの確認コード"
   />
   ```

4. ウェブサイトを再デプロイ

5. Google Search Consoleに戻り、「確認」ボタンをクリック

### 代替方法: HTMLファイルアップロード

もう一つの方法として、HTMLファイルをアップロードする方法もあります：

1. Google Search Consoleから提供されるHTMLファイルをダウンロード
2. `/public/` ディレクトリにファイルを配置
3. ウェブサイトを再デプロイ
4. `https://h-a-c.com/google確認ファイル名.html` にアクセスできることを確認
5. Google Search Consoleで「確認」をクリック

### ステップ4: サイトマップの送信

所有権の確認が完了したら、サイトマップを送信します：

1. 左メニューから「サイトマップ」を選択
2. 「新しいサイトマップの追加」に以下を入力：
   ```
   https://h-a-c.com/sitemap.xml
   ```
3. 「送信」をクリック

## 📊 実装済みSEO機能

### 1. ページごとのSEO最適化

全ページで個別に最適化されたタイトル、説明、キーワードを設定：

- **ホーム**: モバイル通信のプロフェッショナル
- **About**: 企業理念、ビジョン、会社概要
- **Services**: モバイル通信、IoT、セキュリティサービス
- **Recruit**: 採用情報、キャリア機会
- **Member**: チームメンバー紹介
- **Contact**: お問い合わせ情報

### 2. 構造化データ (JSON-LD)

Google検索結果で企業情報を正確に表示するため、以下の情報を構造化データとして実装：

```json
{
  "@type": "Organization",
  "name": "合同会社HACS",
  "url": "https://h-a-c.com",
  "foundingDate": "2023-11-14",
  "address": {
    "postalCode": "485-0036",
    "addressRegion": "愛知県",
    "addressLocality": "小牧市"
  },
  "email": "info@h-a-c.com"
}
```

### 3. OGP・Twitter Card

SNSでシェアされた際に適切に表示されるよう設定済み。

### 4. robots.txt

検索エンジンクローラーに対して、全ページのクロールを許可し、サイトマップの場所を指定。

## ✅ 確認項目

登録後、以下を確認してください：

- [ ] Google Search Consoleで所有権が確認されている
- [ ] サイトマップが正常に送信されている
- [ ] クロールエラーがない
- [ ] モバイルユーザビリティに問題がない
- [ ] Core Web Vitalsが良好

## 📈 次のステップ

1. **Google Analytics 連携**: ウェブサイトのアクセス解析
2. **Google My Business**: ローカルSEO対策
3. **定期的なコンテンツ更新**: 検索順位向上のため
4. **被リンク獲得**: 外部サイトからのリンク構築

## 🔗 参考リンク

- [Google Search Console ヘルプ](https://support.google.com/webmasters/)
- [サイトマップについて](https://developers.google.com/search/docs/advanced/sitemaps/overview)
- [構造化データ テストツール](https://search.google.com/test/rich-results)

---

**注意**: 実際のドメイン名が `h-a-c.com` と異なる場合は、上記のURLをすべて実際のドメインに置き換えてください。
