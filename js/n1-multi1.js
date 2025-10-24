const quizData = [
    {
      question: "(1). 会議での理不尽な決定に、彼は（憤懣）やるかたない様子だった。",
      options: ["ふんもん", "ふうまん", "ふんまん", "ふうもん"],
      answer: "ふんまん"
    },
    {
      question: "(2). さまざまな問題が絡み合って（錯綜）し、事態は一層複雑になった。",
      options: ["さっぞう", "さくぞう", "さっそう", "さくそう"],
      answer: "さくそう"
    },
    {
      question: "(3).個人の（嗜好）は人によって大きく異なる。",
      options: ["しつこう", "しこう　", "しっこう", "しゅこう"],
      answer: "しこう　"
    },
    {
      question: "(4).地震の後、街には崩れた建物の（瓦礫）が散乱していた。",
      options: ["がれぎ　", "がれき　", "かれき　", "かれぎ　"],
      answer: "がれき　"
    },
    {
      question: "(5).新しいリーダーも前任者の政策をそのまま（踏襲）するようだ。",
      options: ["とっじゅう", "とっしゅう", "とうしゅう", "とうじゅう"],
      answer: "とうしゅう"
    },
    {
      question: "(6).組織内の意見の対立が激化し、ついに（軋轢）が生じてしまった。",
      options: ["あつれき", "あすれき", "あすえき", "あつえき"],
      answer: "あつれき"
    },
    {
      question: "(7).彼は歴史に関する知識が（該博）で、どんな質問にも即座に答えられた。",
      options: ["がいはく", "かいはく", "がいばく", "かいばく"],
      answer: "がいはく"
    },
    {
      question: "(8).過去の失敗の記憶を（払拭）し、新たな気持ちで生きて行こうと決めた。",
      options: ["ふくしょく", "ふっしき　", "ふくしき　", "ふっしょく"],
      answer: "ふっしょく"
    },
    {
      question: "(9).彼の（専横）な振る舞いは、多くの部下の不満を買っていた。",
      options: ["せんほう", "せんおう", "さんおう", "さんほう"],
      answer: "せんおう"
    },
    {
      question: "(10).他人の失敗に対しても（寛容）な心を持つことが、人間関係を円滑にする。",
      options: ["かんよう", "かんゆう", "けんよう", "けんゆう"],
      answer: "かんよう"
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
