$(document).ready(function () {

	var vocabbank = [
	["錯覚", "さっかく👉実際とは違うように感じること", "ထင်ယောင်ထင်မှားဖြစ်ခြင်း။", "Eng: optical illusion/ illusion"],
	["往復", "おうふく👉行って帰ること。", "အသွားအပြန်။", "Eng: Round trip"],
	["装置", "そうち👉機械などを備えること。またその設備。", "စက်ပစ္စည်းကိရိယာ။ တပ်ဆင်ခြင်း။", "Eng: Device/ Equpiment/ Installation"],
	["郊外", "こうがい👉町や市の中心から少し離れる所。", "ဆင်ခြေဖုံး။", "Eng: Suburb"],
	["尊敬", "そんけい👉相手の人格や業績などを優れたものと認め、心から敬意を払う気持ち", "လေးစားခြင်း။", "Eng: Respect"],
	["偏見", "へんけん👉偏った見方、考え方。", "ဘက်လိုက်မှု။ အစွဲ။", "Eng: Prejudice/ Bias"],
	["貢献", "こうけん👉ある物事や社会のために役立つこと。", "ပံ့ပိုးကူညီမှု။", "Eng: Contribution"],
	["懸命", "けんめい👉命がけで、または一生懸命に。", "ကြိုးစားအားထုတ်မှု။", "Eng: Eagerness"],
	["朗読", "ろうどく👉声を出して読み上げること", "အသံကျယ်ကျယ်ထွက်၍ စာဖတ်ခြင်း။", "Eng: Reading aloud"],
	["眺望", "ちょうぼう👉遠くまで見晴らすこと。その景色。", "ရှုခင်း။ မြင်ကွင်း။", "Eng: View/ Prospect"]];


	beginActivity();


	function beginActivity() {
		$("#menubtn").append('<div><span style="font-size:18px;font-weight:bold;color:red;background-color:yellow;cursor:pointer">語彙一覧</span></div>');
		$("#closebtn").append('<div><a href="javascript:void(0)" class="closebtn">&times;</a></div>');
		$("#infoMsg").append('<div><h5 style="text-align: center;">「語彙一覧」をクリックすると言葉の選択ができます。</h5></div>');
		$(vocabbank).each(function(i , item) {
			$("#sideMenuArea" + i ).append('<div id="sideMenuList">' + item[0] + '</div>');
			$("#sideMenuArea" + i ).on("click", function () {
				vocabNo = parseInt(i);
				vocabNo = i + 1;
				$("#infoMsg").empty();
				$("#activityTitle").empty();
				$("#activityTitle").append('<div id="showImi">' + "(" + vocabNo + "). " + item[0] +'</div>')
				$("#cardArea").empty();
				$("#cardArea").append('<div id="showImi">' + item[1] +'</br>' + item[2] + '</br>' + item[3] +'</div>')
				$("#sideMenuArea").animate({ width: "0px" }, 100);
				$("#main").animate({ marginLeft: "0px" }, 100);
				$("#buttonArea2").empty();
				currentVocab = i;
			});
		});

		// Insert button to choose befre and next vocab.
		$("#buttonArea1").append('<div id="beforeButton"><< 前</div>');
		// $("#buttonArea2").append('<div id="startButton">スタート</div>');
		$("#buttonArea3").append('<div id="nextButton2">次 >></div>');

		// Function for before button
		$("#beforeButton").on("click", function () {
			if (currentVocab == 0) {
				alert("これは最初の語彙です。");
			}
			else {
				if (currentVocab >= 1) {
					beforeVocab(currentVocab);
					currentVocab --;
				}
			}
			$("#sideMenuArea").animate({ width: "0px" }, 100);
			$("#main").animate({ marginLeft: "0px" }, 100);
		});

		// Fucntion for next button
		$("#nextButton2").on("click", function () {
			if (currentVocab == vocabbank.length - 1) {
				alert("これは最後の語彙です。");
			}
			else {
				if (currentVocab < vocabbank.length - 1 && currentVocab >= 0) {
					// alert(currentVocab);
					nextVocab(currentVocab + 1);
					currentVocab ++;
				}
			}
			$("#sideMenuArea").animate({ width: "0px" }, 100);
			$("#main").animate({ marginLeft: "0px" }, 100);
			$("#buttonArea2").empty();
			});
		}

	$("#menubtn").on("click", function () {
		$("#sideMenuArea").animate({ width: "150px" }, 100);
		$("#main").animate({ marginLeft: "150px" }, 100);
		// $("body").css("background-color", "rgba(0, 0, 0, 0.4)");
	});


	$("#closebtn").on("click", function () {
		$("#sideMenuArea").animate({ width: "0px" }, 100);
		$("#main").animate({ marginLeft: "0px" }, 100);
		// $("body").css("background-color", "white");
	});

	function nextVocab(j) {
		vocabNo = parseInt(j);
		vocabNo += 1;
		$("#infoMsg").empty();
		$("#activityTitle").empty();
		$("#activityTitle").append('<div id="showImi">' +  "(" + vocabNo + "). " + vocabbank[j][0] +'</div>')
		$("#cardArea").empty();
		$("#cardArea").append('<div id="showImi">' + vocabbank[j][1] +'</br>' + vocabbank[j][2] + '</br>' + vocabbank[j][3] +'</div>')

	};

	function beforeVocab(j) {
		if (j >= 1) {
			$("#infoMsg").empty();
			$("#activityTitle").empty();
			$("#activityTitle").append('<div id="showImi">' +  "(" + j + "). " + vocabbank[j-1][0] +'</div>')
			$("#cardArea").empty();
			$("#cardArea").append('<div id="showImi">' + vocabbank[j-1][1] +'</br>' + vocabbank[j-1][2] + '</br>' + vocabbank[j-1][3] +'</div>')
		}
	};
});

