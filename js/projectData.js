import { TAGS } from "./tags.js";

export const projectData = {
    project1: {
        slug: "EscGame",
        title: "謎解きゲーム",
        images: [
            "EscHeader",
            "EscTitle",
            "EscRouter",
            "EscDesk",
            "EscDoor",
            "EscPC",
            "EscPass",
            "EscLamp",
        ],
        description: [
            "ふと思い立ち、初めてUnityで制作したゲームです。脱出ゲームに似た形式です。",
            "友人用に作ったこともあり、制作者自身でも理解できないほど難解な謎解きになっています。",
            "初の挑戦だったこともあって、様々な処理の作りが甘くなってしまっています。",
            "まず、視点移動はカメラの動かし方が分からなかったため4方向に置いて切り替えています。",
            "また、フルスクリーン表示すると進行に必要なアイテムがUIの下に隠れて取得できないというバグもあります。",
            "しかし、記念すべきUnityの1作目であることは確かです。",
        ].join("\n"),
        link: [
            
        ],
        compYear: 2023,
        compMonth: 1,
        period: "制作期間：2日",
        tag: [
            TAGS.UNITY, TAGS.CSHARP, 
        ]
    },
    project2: {
        slug: "ZHold",
        title: "旧ZombieHunter",
        images: [
            "ZHoldHeader",
            "ZHoldHG",
            "ZHoldSG",
            "ZHoldAR",
            "ZHoldSR",
            "ZHoldBoss",
            "ZHoldWayPoint1",
            "ZHoldWayPoint2",
        ],
        description: [
            "高校でオブジェクト指向について学んだ際に制作した、見下ろし形2Dシューティングゲームです。",
            "WindowsFormというフレームワークを用いています。",
            "工夫点は経路探索の実装です。ゾンビが障害物を避けて向かってくるようにするには、経路探索システムを作る必要がありました。",
            "WayPoint法という方式を採用しました。マップに等間隔に点を取り、他の全ての点に対して直線的に到達可能かどうかを調べます。",
            "2週目の走査では直接行けない点に対し、周囲の点を経由して到達できないか調べます。この探索を繰り返すことで経路テーブルを作成することができます。",
            "実際に最短経路を求めるには、目標地点（プレイヤー）と現在地点（ゾンビ自身）に最も近い点のインデックスをそれぞれ調べ、経路情報が格納されている2次元配列を参照します。",
            "この方式を用いる場合、テーブル参照自体は高速ですが作成には時間がかかります。そのため事前に計算し、テキストファイルに書き出します。",
            "また、精度を高める（点を取る間隔を狭める）とテーブル生成に時間がかかりすぎる、ゾンビが障害物の角で止まるバグがある、効果音が同時に複数鳴らせないなどの問題もあります。",
            "実際のゲームやプレイ動画を公開しているので、良ければ下のURLからご覧ください。",
            "詳しい制作内容については今後Zennで公開する予定です。",
        ].join("\n"),
        link: [
            "https://github.com/porosuke/ZombieHunter-old",
            "https://youtu.be/7UH0r9AzJHI",
            "https://youtu.be/fqQrgr7RFYg",
        ],
        compYear: 2023,
        compMonth: 2,
        period: "制作期間：1ヶ月 / LOC：2749",
        tag: [
            TAGS.WIN, TAGS.CSHARP, 
        ]
    },
    project3: {
        slug: "RotD",
        title: "Ruler of the Depths",
        images: [
            "RotDTitle",
            "RotDSelect",
            "RotDStage1",
            "RotDStage3",
            "RotDStage5",
            "RotDOption",
            "RotDView",
            "RotDData",
            "RotDResult",
        ],
        description: [
            "高校の課題研究で制作した、TPS潜水艦アクションゲームです。",
            "基本的なゲーム性は、マップやソナー、潜望鏡を使いこなして敵艦と魚雷戦を行うものです。",
            "主な目的は、複雑な地形や上下の空間を活かしてリスクとリターンを考えながら戦闘を行い、より良いスコア（タイム）を目指すことです。",
            "また、実装機能としては以下があります。",
            "・音量や画質などの簡易的な設定",
            "・発見した艦や兵器の詳細な情報や3Dモデルを閲覧できる図鑑",
            "・セーブデータや設定値のローカル保存",
            "その他の工夫点は、作中の3DモデルやUIを全て自作したことです。これにより作品にあった世界観の表現を行うことができました。",
            "システム面では、敵艦の経路探索と魚雷回避を工夫しています。Unityに実装されているNavMeshという機能は平面空間での経路探索のみに対応しているため、NavMeshを何層にも重ねることで上下を含む3次元空間での経路探索を実現しました。",
            "魚雷回避ではPlane構造体を用いて、艦体の角度を考慮した上下/左右判定を行うことで最適な回避を実現しています。",
            "しかし、1年間の制作期間で断念したことも多くあるため、それらを実装したものを作り直したいと考えています。",
            "プレイ動画を公開しているので、良ければ下のURLからご覧ください。",
            "詳しい制作内容については今後Zennで公開する予定です。",
        ].join("\n"),
        link: [
            "https://youtu.be/IGQBN6Vd3m0",
            "https://youtu.be/2Rv3D41powg",
            "https://youtu.be/26CVl-LuH5A",
        ],
        compYear: 2024,
        compMonth: 1,
        period: "制作期間：1年 / LOC：9946",
        tag: [
            TAGS.UNITY, TAGS.CSHARP, TAGS.MAYA, 
        ]
    },
    project4: {
        slug: "ZH",
        title: "ZombieHunter",
        images: [
            "ZHHeader",
            "ZHKN",
            "ZHHG",
            "ZHSG",
            "ZHAR",
            "ZHSR",
            "ZHBoss",
            "ZHWayPoint1",
            "ZHWayPoint2",
        ],
        description: [
            "以前作ったゾンビハンターを改良したものです。",
            "主な改善点は、経路探索の精度向上、グラフィックの一新、効果音の同時複数再生対応です。",
            "以前用いていたWayPoint法では計算量が多く、事前生成が必要なうえ、精度やバグの問題がありました。",
            "改良版の目標は、「事前生成ではなくゲーム開始時に生成できるくらい高速化する」ことだったため、考え方を見直す必要がありました。",
            "ワーシャルフロイド法を用いた最短経路解決や、バウンディングボックスとスラブ法による衝突判定により計算時間短縮を図りました。",
            "さらに、「目標に直接到達できない場合の最短経路は、必ず障害物の頂点を経由する」という法則性に気付いたことで、計算対象となる点の数を極めて少なくすることに成功しました。",
            "これにより、ゲーム開始時のテーブル生成が実現し、テキストファイルに書き出す必要が無くなりました。テーブルの精度も理論上これ以上高くできない極致に至りました。",
            "音の複数再生は非同期バックグラウンド実行や、ミックス出力を行うことで実現しました。",
            "実際のゲームやプレイ動画を公開しているので、良ければ下のURLからご覧ください。",
            "詳しい制作内容については今後Zennで公開する予定です。",
        ].join("\n"),
        link: [
            "https://github.com/porosuke/ZombieHunter",
            "https://youtu.be/EolGluaawUo",
            "https://youtu.be/z4bp5_l_fjY",
        ],
        compYear: 2025,
        compMonth: 5,
        period: "制作期間：1ヶ月 / LOC：3710",
        tag: [
            TAGS.WIN, TAGS.CSHARP, 
        ]
    },
    project5: {
        slug: "NE4SC",
        title: "NoteEditorforSlideCore",
        images: [
            "NE4SCNote",
            "NE4SCChart",
            "NE4SCModal",
            "NE4SCScaleMax",
            "NE4SCScaleMin",
            "NE4SCLog",
        ],
        description: [
            "友人と共同制作しているリズムゲーム「SlideCore」のために制作したノーツ・譜面エディターです。",
            "Jsonファイルに独自の譜面データを書き出して管理しています。",
            "グリッドスナップによるノーツ配置、オフセット、メトロノーム、履歴操作、拡大縮小、音楽の波形表示、時間目盛り、曲中のBPM/拍子変更など多くの機能を備えています。",
            "エディターはゲームと違い、操作の自由度が高い（履歴操作や範囲外に配置しようとするなど）ので、多くの例外処理が必要でした。",
            "また、あらゆる処理に対し適切なフィードバック（完全に成功したのか、一部成功したのか、完全に失敗したのか、その理由は何か）も伝える必要があり、想像以上に困難でした。",
            "実装において特に大変だったのは最適化です。長い時間使うソフトウェアのため、時々カクついたりするとストレスに繋がってしまいます。",
            "徹底的なキャッシュやプーリング、表示領域のみの描画、線描画コンポーネントの自作など、地道な最適化を行い、60FPSを常に維持することに成功しました。",
            "高品質なグラフィックなどは一切使用していないにも関わらず、単純な計算が積み重なるとここまでの負荷になると知って驚きました。",
            "ソフトや使用動画を公開しているので、良ければ下のURLからご覧ください。",
            "詳しい制作内容については今後Zennで公開する予定です。",
        ].join("\n"),
        link: [
            "https://github.com/porosuke/NoteEditorForSlideCore",
            "https://youtu.be/B1ZAtA6fYjM",
            "https://youtu.be/s0J7_qJrRJU",
            "https://youtu.be/3pw9psCvnP8",
            "https://youtu.be/CWYa62CPAlQ",
        ],
        compYear: 2025,
        compMonth: 12,
        period: "制作期間：4ヶ月 / LOC：10111",
        tag: [
            TAGS.UNITY, TAGS.CSHARP, 
        ]
    },
    project6: {
        slug: "NE4SCManual",
        title: "NEforSC Manual",
        images: [
            "NE4SCMTop",
            "NE4SCMUI",
            "NE4SCMTable",
            "NE4SCMCode",
        ],
        description: [
            "友人と共同制作しているリズムゲーム「SlideCore」のために制作したノーツ・譜面エディターの、Web説明書です。",
            "Cloudflare Pagesを使いデプロイしています。Githubに配置したMarkdownファイルをHTMLに変換しています。",
            "JekyllのJust the Docsというテーマを用いて、検索やサイドバー、パンくずリストなどを手間なく導入し、利便性を高めています。",
            "サイトを公開しているので、良ければ下のURLからご覧ください。",
        ].join("\n"),
        link: [
            "https://noteeditorforslidecore.pages.dev/",
        ],
        compYear: 2025,
        compMonth: 12,
        period: "制作期間：1ヶ月",
        tag: [
            TAGS.JSON, TAGS.CF, 
        ]
    },
    project7: {
        slug: "PoroPF",
        title: "Poro's Portfolio",
        images: [
            "PFProfile",
            "PFSkills",
            "PFProjects",
            "PFJourney",
            "PFModal",
            "PFMobile",
            "PFDark",
        ],
        description: [
            "自分のことを知ってもらうために、Webポートフォリオを作ろうと考えました。",
            "Webに関しては初心者だったため、まずはHTML/CSSといったシンプルな環境で作ることにしました。",
            "コンセプトは「シンプルかつシャープに」で、角度を付けたUIや基本的なアニメーションで統一しました。",
            "SKillsでは、技能をバッジのように表示していますが、これはJson形式で定義したデータを読み取ってJavaScriptで生成しています。また、ハニカム（6角形）が互い違いに並ぶように画面サイズによる制御も行っています。",
            "My Journeyでは、過去の出来事や制作物を時系列順に並べています。タグによるフィルタリングにより、表示される内容を絞り込むことができます。",
            "My JourneyまたはProjectから開かれるモーダルはテンプレートで管理されており、JSの関数にデータを与えるだけで表示することができます。",
            "また、PC/モバイルのレスポンシブ対応や、ライト/ダークモード切り替えも実装しています。",
        ].join("\n"),
        link: [
            "https://porosuke-webportfolio.pages.dev",
            "https://github.com/porosuke/WebPortfolio",
        ],
        compYear: 2026,
        compMonth: 2,
        period: "制作期間：1ヶ月",
        tag: [
            TAGS.HTML, TAGS.CSS, TAGS.JS, 
        ]
    },
    project8: {
        slug: "RotDRemake",
        title: "RotD Remake（制作中）",
        images: [
            "dummy",
        ],
        description: [
            "高校の課題研究で制作した、TPS潜水艦アクションゲームのリメイク作品を制作中です。",
            "課題研究の1年という制限で、オンライン対戦、ストーリーなど実装できなかった要素が数多くありました。",
            "また、クエストが用意されているだけで動機が用意されていない、頭を使って戦闘をする設計になっていない、操作が直感的でないなど、多くの問題点が残されています。",
            "問題点を挙げ、それらを改善するにはどうしたらいいかを考え、1から再構築した結果、ソナーや音に重きを置いた「ステルス情報戦」を主軸とすることに決めました。",
            "おそらくRuler of the Depthsと大きく違った作品になると思います。",
            "完成した後、Steamで一般公開する予定です。",
        ].join("\n"),
        link: [
            
        ],
        compYear: 2099,
        compMonth: 1,
        period: "制作期間：Y年Mヶ月（2024/9~）",
        tag: [
            TAGS.UE, TAGS.CPLPL, 
        ]
    },
};