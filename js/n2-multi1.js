const quizData = [
    {
      question: "(1). 相手の立場や気持ちを（顧慮）して発言する習慣をつけてください。",
      options: ["こりょ　", "こうりょ", "こりょう", "こうよ　"],
      answer: "こりょ　"
    },
    {
      question: "(2). 不当な扱いに、彼は人前で（憤慨）の意を示した。",
      options: ["ふうがい", "ふうかい", "ふんがい", "ふんかい"],
      answer: "ふんがい"
    },
    {
      question: "(3).その行為は、会社の定める倫理規定に（抵触）する恐れがある。",
      options: ["ていざわり", "ていしょく", "ていさわり", "ていしょう"],
      answer: "ていしょく"
    },
    {
      question: "(4).彼は与えられた任務を最後まで責任を持って（遂行）した。",
      options: ["つうこう", "すうこう", "ついこう", "すいこう"],
      answer: "すいこう"
    },
    {
      question: "(5).長期的な発展のためには、強固な経済（基盤）を築くことが不可欠だ。",
      options: ["きそばん", "きはん　", "きばん　", "きほん　"],
      answer: "きばん　"
    },
    {
      question: "(6).健康のために、バランスの良い食事から必要な栄養素を（摂取）している。",
      options: ["せっしゅ", "せいしゅ", "せっしょ", "せいしょ"],
      answer: "せっしゅ"
    },
    {
      question: "(7).彼はどれほど成功しても、常に（謙虚）な姿勢を崩さない。",
      options: ["かんぎょ", "けんきょ", "かんきょ", "けんぎょ"],
      answer: "けんきょ"
    },
    {
      question: "(8).この手続きは書類が多く、非常に（煩雑）で時間がかかる。",
      options: ["ふんざつ", "まんざつ", "ひんざつ", "はんざつ"],
      answer: "はんざつ"
    },
    {
      question: "(9).彼の書いた報告は、このテーマに関する情報を（網羅）している。",
      options: ["ほうら　", "おうら　", "あみら　", "もうら　"],
      answer: "もうら　"
    },
    {
      question: "(10).新しい担当者も、前任者の慣例をそのまま（踏襲）する方針を固めた。",
      options: ["とうしゅう", "とっしゅう", "とっじゅう", "とうじゅう"],
      answer: "とうしゅう"
    },
  ];

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
let currentQuestion = 0;
let score = 0;

function beginTestWith() {
  if(document.getElementById("withAnswer").checked == true) {
    document.getElementById("withAnswer").disabled = true;
    document.getElementById("withoutAnswer").disabled = true;
    flowMsg();
    showQuestionResult();
  }
}

function beginTestWithout() {
  if(document.getElementById("withoutAnswer").checked == true) {
    document.getElementById("withAnswer").disabled = true;
    document.getElementById("withoutAnswer").disabled = true;
    flowMsg();
    showQuestionOnly();
  }
}

function showQuestionResult() {
  const question = quizData[currentQuestion];
  questionElement.innerText = question.question;
  optionsElement.innerHTML = "";

  question.options.forEach(option => {
    const button = document.createElement("button");
    button.innerText = option;
    optionsElement.appendChild(button);
    button.addEventListener("click", selectWithAnswer);
  });
}

function showQuestionOnly() {
  const question = quizData[currentQuestion];
  questionElement.innerText = question.question;
  optionsElement.innerHTML = "";

  question.options.forEach(option => {
    const button = document.createElement("button");
    button.innerText = option;
    optionsElement.appendChild(button);
    button.addEventListener("click", selectWithoutAnswer);
  });
}

var msg = "　　　（）の中の漢字の正しい読み方を一つ選びなさい。　　　";
var scr_speed = 400;	//スクロール速度
function flowMsg() {
  document.forms[0].flowMsg.value = msg
  msg = msg.substring(1,msg.length) + msg.substring(0,1);
  flowSpeed = setTimeout("flowMsg()", scr_speed);
}

function selectWithAnswer(e) {
  const selectedButton = e.target;
  const answer = quizData[currentQuestion].answer;
  if (selectedButton.innerText === answer) {
    score++;
    finishedQuestion = currentQuestion + 1;
    document.getElementById("showResult").value = finishedQuestion + "番。" + "正解です！" + "   Score:" + score + "/" + finishedQuestion;
  }else {
    finishedQuestion = currentQuestion + 1;
    document.getElementById("showResult").value = finishedQuestion + "番。" + "不正解です！" + "   Score:" + score + "/" + finishedQuestion;
  }

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    showQuestionResult();
  } else {
    showResult();
  }
}

function selectWithoutAnswer(e) {
  const selectedButton = e.target;
  const answer = quizData[currentQuestion].answer;
  if (selectedButton.innerText === answer) {
    score++;
  }
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    showQuestionOnly();
  } else {
    showResult();
  }
}

function showResult() {
    const totalQuestions = quizData.length;
    // Calculate boundaries (e.g., if totalQuestions is 10):
    // 80% is 8, 50% is 5, 40% is 4
    const score_80_percent = (totalQuestions / 10) * 8;
    const score_50_percent = totalQuestions / 2;

    if (score === totalQuestions) { // Perfect Score (100%)
        multiChoiceArea.innerHTML = `
            <h1>　Test Completed!</h1>
            <p style="font-size:30px; color:green;">　スコア: ${score}/${totalQuestions}</p>
            <p style="font-size:20px; color:green; font-weight:bold;">　　おめでとう！よくできました！</p>`;
    } else if (score >= score_80_percent) { // High Score (80% to <100%)
        multiChoiceArea.innerHTML = `
            <h1>　Test Completed!</h1>
            <p style="font-size:30px; color:yellow;">　スコア: ${score}/${totalQuestions}</p>
            <p style="font-size:20px; color:yellow; font-weight:bold;">　すごい！満点を目指しましょう！</p>`;
    } else if (score >= score_50_percent && score < score_80_percent) { // Mid Score (50% to <80%)
        multiChoiceArea.innerHTML = `
            <h1>　Test Completed!</h1>
            <p style="font-size:30px; color:orange;">　スコア: ${score}/${totalQuestions}</p>
            <p style="font-size:20px; color:orange; font-weight:bold;">　　もう少し頑張りましょう！</p>`;
    } else if (score >= 0 && score < score_50_percent) { // Low Score (0% to <50%)
        multiChoiceArea.innerHTML = `
            <h1>　Test Completed!</h1>
            <p style="font-size:30px; color:red;">　スコア: ${score}/${totalQuestions}</p>
            <p style="font-size:20px; color:red; font-weight:bold;">　　残念！もう一度勉強しましょう！</p>`;
    }
}
