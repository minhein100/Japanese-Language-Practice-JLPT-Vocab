$(document).ready(function () {

	var vocabbank = [
	["沿岸", "えんがん👉海や湖などの水辺に沿った陸地。", "ကမ်းခြေ။ ကမ်းရိုးတန်း။", "Eng: Coast/ Shore/ Coastal area"],
	["観測", "かんそく👉自然現象などを注意深く見て、その変化を記録すること。", "(သဘာဝဖြစ်စဉ်ပြောင်းလဲမှုကို) လေ့လာတိုင်းတာခြင်း။ စောင့်ကြည့်လေ့လာခြင်း။", "Eng: Observation/ Measurement/ Monitoring"],
	["縮小", "しゅくしょう👉規模や範囲を縮めて小さくすること。⇔（対義語：拡大　かくだい）", "ကျုံခြင်း။ လျှော့ချခြင်း။ ကျဉ်းမြောင်းစေခြင်း။", "Eng: Contraction/ Reduction"],
	["妥当", "だとう👉適切であること。道理に合っていること。", "သင့်လျော်ခြင်း။ မှန်ကန်သင့်မြတ်ခြင်း။", "Eng: Suitable/ Appropriate/ Reasonable/ Valid"],
	["彫刻", "ちょうこく👉木や石などに形を彫りつけること。また、その作品。", "ပန်းပုထုခြင်း။ ပန်းပုလက်ရာ။", "Eng: Sculpture/ Craving/ Engraving"],
	["負傷", "ふしょう👉けがをすること。", "ဒဏ်ရာရခြင်း။ ထိခိုက်ဒဏ်ရာ။", "Eng: Being injured/ Injury/ Wound"],
	["保管", "ほかん👉預かった物品を傷つけたり紛失したりしないように大切に預かって、しまっておくこと。", "(မပျောက်ပျက်၊ မပျက်စီးရန်) သိမ်းဆည်းခြင်း။ ", "Eng: Storage/ Custody/ Safekeeping"],
	["漁業", "ぎょぎょう👉魚や貝などを捕る仕事。", "ငါးဖမ်းလုပ်ငန်း။ ရေလုပ်ငန်း။", "Eng: Fishing Industry/ Fishery"],
	["隔週", "かくしゅう👉一週間おきに繰り返すこと。", "တပတ်ခြား။", "Eng: Every other week/ Bi-weekly"],
	["執筆", "しっぴつ👉文章を書くこと。", "စာရေးသားခြင်း။ စာပြုစုခြင်း။", "Eng: Writing (especially for publication)"]];


	beginActivity();


	function beginActivity() {
		$("#menubtn").append('<div><span style="font-size:18px;font-weight:bold;color:red;background-color:yellow;cursor:pointer">語彙一覧</span></div>');
		$("#closebtn").append('<div><a href="javascript:void(0)" class="closebtn">&times;</a></div>');
		$("#infoMsg").append('<div><h4 style="text-align: center;">画面左の「語彙一覧」から言葉の選択ができます。</h4></div>');
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
