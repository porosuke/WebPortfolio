For English instructions, please see [README.md](./README.md).

# Porosuke のポートフォリオ

## サイト

https://porosuke-webportfolio.pages.dev/

## スクリーンショット

### プロフィール

![profile](/images/projects/PoroPF/PFProfile-1600.webp)

---

### スキル

![skills](/images/projects/PoroPF/PFSkills-1600.webp)

---

### 制作物

![projects](/images/projects/PoroPF/PFProjects-1600.webp)

---

### 過程

![journey](/images/projects/PoroPF/PFJourney-1600.webp)

---

### モーダル

![modal](/images/projects/PoroPF/PFModal-1600.webp)

---

### モバイル表示

![mobile](/images/projects/PoroPF/PFMobile-1600.webp)

---

### ダークモード

![dark](/images/projects/PoroPF/PFDark-1600.webp)

## 概要

本リポジトリは、個人Webポートフォリオサイトのソースコードです。\
HTML / CSS / JavaScript のみを用いて実装しており、フレームワークに依存しない軽量な構成を採用しています。\
本サイトでは、プロジェクトや活動履歴を時系列で可視化し、タグによるフィルタリングによって表示内容を動的に切り替えることができます。  \
各プロジェクトの詳細はモーダルで表示され、画像ギャラリーを含む情報を直感的に閲覧できるよう設計されています。\
また、プロジェクト一覧やイベント情報はJSONデータから動的に生成されるデータ駆動UIとして構築されており、データの変更のみで表示内容を更新できる柔軟な構造を持っています。\
デザイン面では「シャープにシンプルに」というコンセプトのもと、幾何学的なレイアウトと統一されたスタイルによって、視認性と操作性の両立を目指しています。

## 機能

* タイムラインのフィルタリング
    タグを指定することで表示されるコンテンツをフィルタリングすることができます。また、Production/Eventの表示データに応じて中央の時間軸の内容も変わるようになっています。
* ダークモード対応
    使用する色を変数で扱い、カラーモードに応じて代入する色を変えることで管理しやすくしています。ブラウザのストレージ（localStorage）を用いて以前の仕様モードを記憶するようにしています。
* レスポンシブ対応
    画面幅に合わせてコンテンツサイズや余白、UIの配置を変えることで小さな画面でも見やすくしています。特に、画面上の固定ヘッダー、プロジェクトモーダル、過程タイムラインは大きく表現が変わります。
* 細かなインタラクションの整備
    ボタンが押せる（押せた）ことを強調する、アニメーション速度を早くする、表示状態に応じてボタンなどの操作要素の位置を変えていつでもアクセスできるようにするなどの、手触りを良くする工夫をしています。\
    メールアドレスコピーボタンでは、コピー時にJSでボタンの文字を変更することで、ユーザーにフィードバックを返します。

## アーキテクチャ

本プロジェクトは、データ駆動型のUI構成を採用しています。

---

### データ管理

プロジェクトデータやイベントデータ、スキル情報はJSONデータとして定義し、表示内容をコードから分離しています。\
これにより、データの追加・変更のみでUIを更新できる構造としています。
また、プロジェクトには識別子（slug）を付与し、リストによって表示内容を制御しています。\
同様にタグ情報もJSONで管理することで、表記揺れや入力ミスを防いでいます。

---

### UI生成フロー

JSONデータ
    ↓
JavaScriptによるUI生成
    ↓
DOM生成

この構造により、静的HTMLの重複記述を避け、柔軟なUI生成を可能にしています。

---

### コンポーネント設計

機能ごとに処理を分離し、独立したコンポーネントとして管理しています。\
これにより、各機能の独立性を保ちつつ、保守性と再利用性を高めています。

* プロジェクトモーダル
    モーダルは独立したテンプレートとして定義し、データを流し込むことで表示します。  
    開閉制御もモーダル側で完結させ、処理の混在を防いでいます。

* スキルバッジ
    バッジは動的に生成され、互い違いにかみ合うレイアウトを維持するよう配置されています。  
    JavaScriptで制御することで、画面幅が変化しても整列を維持します。

* ボタンアクション
    「コンテンツボタン」と「通常ボタン」の2種類に分類し、ホバー・アクティブ時の挙動を共通化しています。

---

### スタイル設計

色・余白・アニメーション時間などはCSS変数として定義し、マジックナンバーを排除しています。\
また、UIは15°の角度を基準とした幾何学的デザインで統一しています。\
clip-pathで使用するpolygonは関数化し、再利用可能な形で管理しています。

## 用いた技術

* HTML5
* CSS3
* JavaScript
* Cloudflare Pages
* GitHub

## ディレクトリ構成

```
├── css/
│   ├── base.css
│   ├── fixedHeader.css
│   ├── icon.css
│   ├── journey.css
│   ├── journeySection.css
│   ├── journeyTab.css
│   ├── modal.css
│   ├── modalDescription.css
│   ├── modalGallery.css
│   ├── profile.css
│   ├── projects.css
│   ├── sectionHeader.css
│   └── skills.css
├── images/
│   ├── events/
│   ├── header/
│   ├── profile/
│   ├── projects/
│   ├── skills/
│   ├── favicon.ico
│   └── noImage.webp
├── js/
│   ├── dataManager.js
│   ├── eventData.js
│   ├── journey.js
│   ├── journeySection.js
│   ├── journeyTab.js
│   ├── main.js
│   ├── modal.js
│   ├── modalDescription.js
│   ├── modalGallery.js
│   ├── profile.js
│   ├── projectData.js
│   ├── projects.js
│   ├── skillData.js
│   ├── skills.js
│   └── tags.js
└── index.html
```

## 著者

Porosuke

## ライセンス

このプロジェクトのライセンスはMITライセンスです。\
詳細はLICENSEファイルをご覧ください。
