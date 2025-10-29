$(document).ready(function () {

	var colorArray = ["#019875", "#1E8BC3", "#74B72E"];
	var cardState;
	var currentQuestion = 0;
	var qbank = [["憤懣", "ふんまん"],
		["錯綜", "さくそう"],
		["嗜好", "しこう"],
		["瓦礫", "がれき"],
		["踏襲", "とうしゅう"],
		["軋轢", "あつれき"],
		["該博", "がいはく"],
		["払拭", "ふっしょく"],
		["専横", "せんおう"],
		["寛容", "かんよう"]];


	// ★追加: 最初に表示するカード (0: card1/問題, 1: card2/答え)
    var firstCard = 0;
    // ★追加: 表示順序 ('noRandom' or 'random')
    var displayOrder = 'noRandom';
    // ★追加: ランダム表示のための問題順序
    var randomOrder = [];


    // 初期化とイベント設定
    function initialize() {
        // ラジオボタンの初期設定
        $('input[name="firstCardSelect"]').val(['card1']); // デフォルト: card1
        $('input[name="displayOrder"]').val(['noRandom']); // デフォルト: 順番に

        // ★修正: ラジオボタンの変更イベントに一括で処理をバインド
        $('input[name="firstCardSelect"]').on('change', function() {
            firstCard = ($(this).val() === 'card2') ? 1 : 0;
            // 最初のカードが切り替わった場合、現在の問題をリロードして反映
            restartActivity();
        });

        $('input[name="displayOrder"]').on('change', function() {
            displayOrder = $(this).val();
            // 順序が切り替わった場合、最初からアクティビティをリスタート
            currentQuestion = 0;
            if (displayOrder === 'random') {
                setupRandomOrder();
            }
            beginActivity();
            // ラジオボタンを無効化 (ロック)
            $('input[name="displayOrder"]').prop('disabled', true);
        });

        // 最初の問題をセットアップ
        beginActivity();
    }

    // 現在の問題をリロードしてカードの初期表示を切り替えるためのヘルパー関数
    function restartActivity() {
        // currentQuestionを一つ前に戻してからbeginActivityを呼び出すことで、
        // 現在表示中の問題をリロードしてカードの初期表示を切り替える。
        currentQuestion = (currentQuestion > 0) ? currentQuestion - 1 : 0;
        beginActivity();
    }

    // ランダム表示順序を設定
    function setupRandomOrder() {
        randomOrder = Array.from({length: qbank.length}, (_, i) => i);
        // Fisher-Yates shuffleアルゴリズムで配列をシャッフル
        for (let i = randomOrder.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [randomOrder[i], randomOrder[j]] = [randomOrder[j], randomOrder[i]];
        }
    }


    function beginActivity() {
        // 表示する問題のインデックスを決定
        let qIndex;
        if (displayOrder === 'random') {
            qIndex = randomOrder[currentQuestion];
        } else {
            qIndex = currentQuestion;
        }

        // 終了判定
        if (currentQuestion >= qbank.length) {
            displayFinalMessage();
            return;
        }

        // cardStateの初期設定
        // 0: card1/問題が上, 2: card2/答えが上
        cardState = (firstCard === 0) ? 0 : 2;

        var color1 = colorArray[Math.floor(Math.random() * colorArray.length)];

        $("#cardArea").empty();
        // ★修正: qIndexを使って問題/答えを取得
        $("#cardArea").append('<div id="card1" class="card">' + qbank[qIndex][0] + '</div>');
        $("#cardArea").append('<div id="card2" class="card">' + qbank[qIndex][1] + '</div>');
        $("#card1").css("background-color", color1);
        $("#card2").css("background-color", "#34495E");

        // ★修正: firstCardの値に応じて初期位置を決定
        if (firstCard === 0) {
            // card1/問題が上
            $("#card1").css("top", "0px");
            $("#card2").css("top", "200px");
        } else {
            // card2/答えが上
            $("#card1").css("top", "-200px"); // card1を上に隠す
            $("#card2").css("top", "0px");
        }

        // イベントの重複登録を防ぐ
        $("#cardArea").off("click");
        $("#cardArea").on("click", function () {
            // カードの切り替えロジック
            if (cardState == 0) {
                // card1が上 -> card2が上へ
                cardState = 1; // アニメーション中
                $("#card1").animate({ top: "-=200" }, 150);
                $("#card2").animate({ top: "-=200" }, 150, function () {
                    cardState = 2; // card2表示状態
                });
            } else if (cardState == 2) {
                // card2が上 -> card1が上へ
                cardState = 1; // アニメーション中
                $("#card1").animate({ top: "+=200" }, 150);
                $("#card2").animate({ top: "+=200" }, 150, function () {
                    cardState = 0; // card1表示状態
                });
            }
        });

        currentQuestion++;

        // 「次へ」ボタンのセットアップ
        $("#nextButton").off("click");
        $("#buttonArea").empty();
        $("#buttonArea").append('<div id="nextButton">次へ</div>');
        // '他の練習を選ぶ'のリンクは元のままとします
        $("#buttonArea").append('<div id="otherButton"> <a href="./n1_yomikata_lesson.html" style="text-decoration:none;">他の練習を選ぶ</a></div>');

        $("#nextButton").on("click", function () {
            // if (currentQuestion < qbank.length) {
                beginActivity(); // beginActivity内で終了判定を行う
            // } else {
            //    displayFinalMessage();
            // }
        });
    }

    // ★削除: 単独で呼び出されていた random/noRandom/beginNoRandom 関数は、
    // ラジオボタンのイベントハンドラとbeginActivityに統合されたため削除しました。
    // 代わりにinitialize()を呼び出します。

    // 最初に実行する
    initialize();

    // 未使用だが元のコードに残されていた関数
    function togglePosition() {
        if ($("#card1").position().top == -200) { $("#card1").css("top", "200px"); };
    }

    function togglePosition2() {
        if ($("#card2").position().top == -200) { $("#card2").css("top", "200px"); };
    }

    function displayFinalMessage() {
        $("#buttonArea").empty();
        $("#cardArea").empty();
        $("#cardArea").append('<div id="finalMessage"><p>終了！<br>よく頑張りました！<br>問題に挑戦しましょう！</p></div>');
        $("#buttonArea").append('<div id="otherButton"> <a href="./n1_yomi1.html" style="text-decoration:none;">最初からやり直す</a></div>');
        $("#buttonArea").append('<div id="otherButton"> <a href="./n1_yomikata_lesson.html" style="text-decoration:none;">他の練習を選ぶ</a></div>');
    }

});
