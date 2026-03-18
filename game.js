const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const scoreText = document.getElementById("score");

const progressText = document.getElementById("progressText");
const progressBarFull = document.getElementById("progressBarFull");

const container = document.querySelector(".container");
const endScreen = document.getElementById("endScreen");
const finalScore = document.getElementById("finalScore");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

let questions = [
  {
    question: "Inside which HTML element do we put JavaScript?",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1,
  },
  {
    question: "Correct syntax for external script?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3,
  },
  {
    question: "How do you write Hello World?",
    choice1: "msg()",
    choice2: "alert('Hello World')",
    choice3: "msgBox()",
    choice4: "alertBox()",
    answer: 2,
  },
  {
    question: "Which company developed JavaScript?",
    choice1: "Google",
    choice2: "Microsoft",
    choice3: "Netscape",
    choice4: "Apple",
    answer: 3,
  },
  {
    question: "Which symbol is used for comments?",
    choice1: "//",
    choice2: "#",
    choice3: "<!-- -->",
    choice4: "**",
    answer: 1,
  },
  {
    question: "How do you declare a variable?",
    choice1: "var x;",
    choice2: "int x;",
    choice3: "x := 10;",
    choice4: "declare x;",
    answer: 1,
  },
  {
    question: "Which operator assigns value?",
    choice1: "=",
    choice2: "*",
    choice3: "+",
    choice4: "-",
    answer: 1,
  },
  {
    question: "Print to console?",
    choice1: "print()",
    choice2: "console.log()",
    choice3: "echo()",
    choice4: "write()",
    answer: 2,
  },
  {
    question: "Keyword to define function?",
    choice1: "func",
    choice2: "function",
    choice3: "define",
    choice4: "method",
    answer: 2,
  },
  {
    question: "Which is NOT JS datatype?",
    choice1: "Number",
    choice2: "String",
    choice3: "Boolean",
    choice4: "Float",
    answer: 4,
  }
];

function startGame(){
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];

  container.style.display = "block";
  endScreen.style.display = "none";

  getNewQuestion();
}

function getNewQuestion(){

  if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
    localStorage.setItem("mostRecentScore", score);

    container.style.display = "none";
    endScreen.style.display = "block";
    finalScore.innerText = score;
    return;
  }

  questionCounter++;

  progressText.innerText = questionCounter + "/" + MAX_QUESTIONS;
  progressBarFull.style.width = (questionCounter / MAX_QUESTIONS) * 100 + "%";

  const index = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[index];

  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(index,1);
}

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if(!acceptingAnswers) return;

    acceptingAnswers = false;

    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if(classToApply === "correct"){
      score += CORRECT_BONUS;
      scoreText.innerText = score;
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      acceptingAnswers = true;
      getNewQuestion();
    }, 800);
  });
});

startGame();