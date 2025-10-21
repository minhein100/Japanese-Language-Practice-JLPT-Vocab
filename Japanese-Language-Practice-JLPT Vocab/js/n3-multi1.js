const quizData = [
    {
      question: "(1). あの絵は目の（錯覚）を利用している。",
      options: ["さっがく", "さっかく", "さくがく", "さくかく"],
      answer: "さっかく"
    },
    {
      question: "(2). 自宅と会社を（往復）する毎日を送っている。",
      options: ["おおふく　", "じゅうふく", "おうふく　", "おうぷく　"],
      answer: "おうふく　"
    },
    {
      question: "(3).その（装置）は精密な部品で構成されている。",
      options: ["そうち", "そち　", "そっち", "ぞうち"],
      answer: "そうち"
    },
    {
      question: "(4).彼は都会の喧騒を離れて（郊外）に住むことを選んだ。",
      options: ["こうかい", "ぶかい　", "こうがい", "ぶがい　"],
      answer: "こうがい"
    },
    {
      question: "(5).私は彼の知識と経験を心から（尊敬）している。",
      options: ["そんちょう", "すんけい　", "すんちょう", "そんけい　"],
      answer: "そんけい　"
    },
    {
      question: "(6).彼女は国籍による（偏見）を持たずに人々と接する。",
      options: ["はんけん", "へんけん", "はんかん", "へんかん"],
      answer: "へんけん"
    },
    {
      question: "(7).彼はボランティア活動を通して社会に（貢献）している。",
      options: ["こうけん", "こけん　", "こげん　", "こうげん"],
      answer: "こうけん"
    },
    {
      question: "(8).彼女は夢を叶えるために（懸命）に努力した。",
      options: ["けんめい", "けんめ　", "きんめい", "きんめ　"],
      answer: "けんめい"
    },
    {
      question: "(9).教室では、生徒たちが順番に詩を（朗読）した。",
      options: ["ろっどく", "ろうとく", "ろうどく", "ろっとく"],
      answer: "ろうどく"
    },
    {
      question: "(10).タワーの最上階からは素晴らしい（眺望）が広がる。",
      options: ["ちゅうぼう", "ちょうほう", "ちゅうぼう", "ちょうぼう"],
      answer: "ちょうぼう"
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
            <p style="font-size:30px;">　スコア: ${score}/${totalQuestions}</p>
            <p style="font-size:20px; font-weight:bold;">　　おめでとう！よくできました！</p>`;
    } else if (score >= score_80_percent) { // High Score (80% to <100%)
        multiChoiceArea.innerHTML = `
            <h1>　Test Completed!</h1>
            <p style="font-size:30px; color:green;">　スコア: ${score}/${totalQuestions}</p>
            <p style="font-size:20px; color:green; font-weight:bold;">　すごい！満点を目指しましょう！</p>`;
    } else if (score >= score_50_percent && score < score_80_percent) { // Mid Score (50% to <80%)
        multiChoiceArea.innerHTML = `
            <h1>　Test Completed!</h1>
            <p style="font-size:30px; color:green;">　スコア: ${score}/${totalQuestions}</p>
            <p style="font-size:20px; color:green; font-weight:bold;">　　もう少し頑張りましょう！</p>`;
    } else if (score >= 0 && score < score_50_percent) { // Low Score (0% to <50%)
        multiChoiceArea.innerHTML = `
            <h1>　Test Completed!</h1>
            <p style="font-size:30px; color:red;">　スコア: ${score}/${totalQuestions}</p>
            <p style="font-size:20px; color:red; font-weight:bold;">　　残念！もう一度勉強しましょう！</p>`;
    }
}
