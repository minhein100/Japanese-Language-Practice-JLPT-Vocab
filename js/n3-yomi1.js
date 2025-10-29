$(document).ready(function () {

	var colorArray = ["#019875", "#1E8BC3", "#74B72E"];
	var cardState;
	var currentQuestion = 0;
	var qbank = [["錯覚", "さっかく"],
		["往復", "おうふく"],
		["装置", "そうち"],
		["郊外", "こうがい"],
		["尊敬", "そんけい"],
		["偏見", "へんけん"],
		["貢献", "こうけん"],
		["懸命", "けんめい"],
		["朗読", "ろうどく"],
		["眺望", "ちょうぼう"]];


	beginActivity();

	function beginActivity() {
    	// ... (前略：ここまでは変更なし) ...
    	cardState = 0; // 0: card1表示状態, 1: card2表示状態

    	// ... (カードの生成と初期設定：ここまでは変更なし) ...
    	var color1 = colorArray[Math.floor(Math.random() * colorArray.length)];
    	$("#cardArea").empty();
    	$("#cardArea").append('<div id="card1" class="card">' + qbank[currentQuestion][0] + '</div>');
    	$("#cardArea").append('<div id="card2" class="card">' + qbank[currentQuestion][1] + '</div>');
    	$("#card1").css("background-color", color1);
    	$("#card2").css("background-color", "#34495E");
    	$("#card2").css("top", "200px"); // card2を初期位置から200px下に設定（card1の下に隠す）

    	$("#cardArea").on("click", function () {
        	// cardStateが1でない場合（つまり0の場合）のみ、カードを切り替え（アニメーション実行中に重複実行を防ぐため）
        	if (cardState == 0) {
            	cardState = 1; // アニメーション開始前に状態を「切り替え中」に設定

            	// card1とcard2を上に200px移動させて、card2が表示されるようにする
            	$("#card1").animate({ top: "-=200" }, 150);
            	$("#card2").animate({ top: "-=200" }, 150, function () {
                	// アニメーション完了後に状態を「card2表示状態」に設定
                	cardState = 2; // cardStateを2にして、次回クリック時には元に戻せるようにする
                	// togglePosition, togglePosition2 の関数が不明なため、この行は削除しました。
            	});
        	} else if (cardState == 2) {
            	cardState = 1; // アニメーション開始前に状態を「切り替え中」に設定

            	// card1とcard2を下に200px移動させて、card1が表示されるようにする（初期位置に戻す）
            	$("#card1").animate({ top: "+=200" }, 150);
            	$("#card2").animate({ top: "+=200" }, 150, function () {
                	// アニメーション完了後に状態を「card1表示状態」に設定
                	cardState = 0; // cardStateを0にして、次回クリック時には再び切り替えられるようにする
            	});
        	}
    	});//click function
    	// ... (後略：ここまでは変更なし) ...
    	currentQuestion++;
    	$("#buttonArea").empty();
    	$("#buttonArea").append('<div id="nextButton">次へ</div>');
    	$("#buttonArea").append('<div id="otherButton"> <a href=\"./n3_yomikata_lesson.html\" style="text-decoration:none;">他の練習を選ぶ</a></div>');
    	$("#nextButton").on("click", function () {
        	if (currentQuestion < qbank.length) { beginActivity(); }
        	else { displayFinalMessage(); }
    	});//click function
	}//beginactivity

	function togglePosition() {
		if ($("#card1").position().top == -200) { $("#card1").css("top", "200px"); };
	}//toggle

	function togglePosition2() {
		if ($("#card2").position().top == -200) { $("#card2").css("top", "200px"); };
	}//toggle2

	function displayFinalMessage() {
		$("#buttonArea").empty();
		$("#cardArea").empty();
		$("#cardArea").append('<div id="finalMessage"><p>終了！<br>よく頑張りました！<br>問題に挑戦しましょう！</p></div>');
		$("#buttonArea").append('<div id="otherButton"> <a href=\"./n3_yomi1.html\" style="text-decoration:none;">最初からやり直す</a></div>');
		$("#buttonArea").append('<div id="otherButton"> <a href=\"./n3_yomikata_lesson.html\" style="text-decoration:none;">他の練習を選ぶ</a></div>');
	}//final message

});

