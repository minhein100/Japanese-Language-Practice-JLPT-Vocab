$(document).ready(function () {

	var colorArray = ["#019875", "#1E8BC3", "#74B72E"];
	var cardState;
	var currentQuestion = 0;
	var qbank = [["顧慮", "こりょ"],
		["憤慨", "ふんがい"],
		["抵触", "ていしょく"],
		["遂行", "すいこう"],
		["基盤", "きばん"],
		["摂取", "せっしゅ"],
		["謙虚", "けんきょ"],
		["煩雑", "はんざつ"],
		["網羅", "もうら"],
		["踏襲", "とうしゅう"]];


	beginActivity();


	function beginActivity() {
		cardState = 0;
		var color1 = colorArray[Math.floor(Math.random() * colorArray.length)];
		$("#cardArea").empty();
		$("#cardArea").append('<div id="card1" class="card">' + qbank[currentQuestion][0] + '</div>');
		$("#cardArea").append('<div id="card2" class="card">' + qbank[currentQuestion][1] + '</div>');
		$("#card1").css("background-color", color1);
		$("#card2").css("background-color", "#34495E");
		$("#card2").css("top", "200px");
		$("#cardArea").on("click", function () {
			if (cardState != 1) {
				cardState = 1;
				//togglePosition();
				$("#card1").animate({ top: "-=200" }, 150, function () { cardState = 0; togglePosition(); });
				$("#card2").animate({ top: "-=200" }, 150, function () { togglePosition2(); });
			}//if
		});//click function
		currentQuestion++;
		$("#buttonArea").empty();
		$("#buttonArea").append('<div id="nextButton">次へ</div>');
		$("#buttonArea").append('<div id="otherButton"> <a href=\"./n1_yomikata_lesson.html\" style="text-decoration:none;">他の練習を選ぶ</a></div>');
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
		$("#buttonArea").append('<div id="otherButton"> <a href=\"./n1_yomi1.html\" style="text-decoration:none;">最初からやり直す</a></div>');
		$("#buttonArea").append('<div id="otherButton"> <a href=\"./n1_yomikata_lesson.html\" style="text-decoration:none;">他の練習を選ぶ</a></div>');
	}//final message

});
