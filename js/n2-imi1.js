$(document).ready(function () {

	var vocabbank = [
	["顧慮", "こりょ👉ある物事や人の状況を、気遣いながら考えること。", "ထည့်သွင်းစဉ်စားခြင်း။ စာနာထောက်ထားခြင်း", "Eng: Consideration/ Concern"],
	["憤慨", "ふんがい👉ひどく腹を立てること。", "ယမ်းပုံမီးကျ ဒေါသထွက်ခြင်း။ မခံမရပါနိုင် ဒေါသထွက်ခြင်း။", "Eng: Outrage/ Indignation"],
	["抵触", "ていしょく👉法律や規則などに触れること。ぶつかり合うこと。", "ချိုးဖောက်ခြင်း။ ထိပါးခြင်း။ ဆန့်ကျင်ခြင်း။", "Eng: Violation/ Contravention"],
	["遂行", "すいこう👉計画や任務などを最後までやりとげること。", "ဆောင်ရွက်ပြီးစီးခြင်း။ အကောင်အထည်ဖော်ခြင်း။", "Eng: Implementation/ Execution"],
	["基盤", "きばん👉活動や組織の土台となるもの。基礎。", "အခြေခံ။ အုတ်မြစ်။", "Eng: Foundation/ Basis/ Base"],
	["摂取", "せっしゅ👉外部から栄養や物質を取り入れること。", "စားသုံးခြင်း။ (ဆေး)သောက်သုံးခြင်း။", "Eng: Intake/ Ingestion"],
	["謙虚", "けんきょ👉へりくだって、控えめな態度であること。", "နှိမ့်ချမှု။ ရိုကျိုးမှု။", "Eng: Humility/ Modesty"],
	["煩雑", "はんざつ👉手数や雑事が多く、込み入っていること。", "⓵ကသီလင်တဖြစ်ခြင်း။ ⓶စိတ်အနှောင့်အယှက်ဖြစ်စရာများ။", "Eng: ⓵hassle.⓶troublesome "],
	["網羅", "もうら👉全てをもれなく取り入れること。", "အားလုံးပါဝင်ခြင်း။ လွှမ်းခြုံထားခြင်း။", "Eng: Comprehensive coverage"],
	["踏襲", "とうしゅう👉これまでの方針や方法などをそのまま受け継ぐこと。", "(မူဝါဒစသည်)ထိန်းသိမ်းလိုက်နာခြင်း။", "Eng: Adherence"]];


	beginActivity();


	function beginActivity() {
		$("#menubtn").append('<div><span style="font-size:18px;cursor:pointer">語彙一覧</span></div>');
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
