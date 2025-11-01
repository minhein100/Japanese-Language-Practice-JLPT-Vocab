$(document).ready(function () {

	var vocabbank = [
	["閑散", "かんさん👉暇で静かなこと。人や店が少なく寂しい様子。", "ငြိမ်သက်ခြင်း။ လူရှင်းခြင်း။ ခြောက်ကပ်ခြင်း။ (စီးပွားရေး၊ အရောင်းအဝယ်)ပါးခြင်း။", "Eng: Quiet/ Sluggish"],
	["頻繁", "ひんぱん👉物事が何度も繰り返されること。しばしば。", "မကြာမကြာ။ မကြာခဏ။ ခဏခဏ။", "Eng: Frequent/ Often"],
	["携わる", "たずさわる👉ある仕事や物事に関係する、従事する。", "ပါဝင်ပတ်သက်ခြင်း။ ပါဝင်ဆောင်ရွက်ခြင်း။", "Eng: To be involved in/ To participate in"],
	["奔走", "ほんそう👉目的達成のために忙しく走り回ること。", "ကြိုးစားအားထုတ်ခြင်း။ ", "Eng: Efforts"],
	["阻害", "そがい👉邪魔をして、物事の進行を妨げること。", "အနှောင့်အယှက်ဖြစ်စေခြင်း။ အဟန့်အတားဖြစ်ခြင်း။", "Eng: Hindrance/ Obstruction/ Inhibition"],
	["潤沢", "じゅんたく👉物資などが豊富にあること。うるおいがあること。", "ပေါများခြင်း။ ကြွယ်ဝခြင်း။", "Eng: Abundance/ Plentiful/ Richness"],
	["窮屈", "きゅうくつ👉ゆとりがなく、自由がきかないこと。気持ちが張り詰めること。", "ကျဉ်းမြောင်းခြင်း။ အနေရခက်ခြင်း။ စိတ်ကျဉ်းကျပ်ခြင်း။", "Eng: Uncomfortable/ Suffocate/ Tight/ Cramped"],
	["懸賞", "けんしょう👉賞金や賞品をかけて募集すること。", "ဆုပေးခြင်း။ ဆုပေးငွေ။", "Eng: Prize/ Reward"],
	["沈殿", "ちんでん👉液体中の固形物が底に沈み積もること。", "အနည်ထိုင်ခြင်း။ အနည်ကျခြင်း။", "Eng: Sedimentation"],
	["耐久", "たいきゅう👉外部からの力に耐え、長く持ちこたえること。", "တာရှည်ခံခြင်း။ ကြံ့ခိုင်ခြင်း။", "Eng: Durability/ Endurance/ Resistance"]];


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
