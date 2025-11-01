$(document).ready(function () {

	var vocabbank = [
	["猶予", "ゆうよ👉物事の実行や期限を一時的に延ばすこと。または、判断や決定を保留して時間的な余裕を持たせること。", "ရွှေ့ဆိုင်းခြင်း။ ဆိုင်းငံ့ခြင်း။", "Eng: Postponement/ Moratorium"],
	["憂鬱", "ゆううつ👉気分がふさいで晴れないこと。気が重く、沈んだ状態。気分だけでなく、その場の雰囲気などにも使われることがあります。", "စိတ်အားငယ်ခြင်း။ စိတ်ဓာတ်ကျခြင်း။", "Eng: Depression/ Melancholy"],
	["頒布", "はんぷ👉品物や資料などを、広く配り分けること。特に、対価を得て販売する（有料）場合にも、無料で配布する場合にも使われる、やや硬い表現。", "ဖြန့်ဝေခြင်း။ ပေးဝေခြင်း။", "Eng: Distribution/ Dissemination (of goods,pamphlets, etc.)"],
	["畏敬", "いけい👉恐れ敬うこと。神や偉大な人物、自然の力など、偉大で尊いものに対し、恐れつつも心から敬う気持ちを抱くこと。", "ကြောက်ရွံ့လေးစားမှု။", "Eng: Awe/ Reverence/ Veneration"],
	["罷免", "ひめん👉職務についている者を、その職をやめさせること。特に公務員などの公的な職位にある者に対して、懲戒処分などによって解雇する場合に使われます。", "ရာထူးမှထုတ်ပယ်ခြင်း။", "Eng: Dismissal/ Removal/ Impeachment"],
	["懸念", "けねん👉気にかかって心配すること。何か悪いことや、望ましくない事態が起こるのではないかと危惧する気持ち。", "စိုးရိမ်ပူပန်မှု။ ပူပင်ကြောက်လန့်မှု။", "Eng: Concern/ Worry/ Apprehension"],
	["閑散", "かんさん👉人の出入りが少なく静かな様子。店や場所などが賑わいを失ってひっそりとしている状態。仕事などが暇でゆったりとしている様子にも使われます。", "ငြိမ်သက်ခြင်း။ လူရှင်းခြင်း။ အရောင်းအဝယ်ပါးခြင်း။ ", "Eng: Deserted/ Quiet/ Dull/ Inactivity"],
	["享受", "きょうじゅ👉恵まれたものや良い状況を、受け入れて自分のものとして味わい楽しむこと。恩恵や利益、権利などを受けるという意味合いで用いられます。", "အကျိုးခံစားခွင့်ရရှိခြင်း။", "Eng: Receiving benefits"],
	["遡及", "そきゅう👉ある事柄を、過去にさかのぼって適用すること。特に法律や契約などで、効力を過去の時点にまで及ぼす場合に用いられる言葉です。", "နောက်ကြောင်းပြန်အကျိုးသက်ရောက်မှု။", "Eng: Retroactivity"],
	["踏破", "とうは👉困難な道のりや長い距離を、最後まで歩き通すこと。また、比喩的に、難題を克服することにも使われます。", "ပြီးဆုံးအောင် လျှောက်လှမ်းခြင်း။ ကျော်လွှားအောင်မြင်ခြင်း။", "Eng: Completion"]];


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
