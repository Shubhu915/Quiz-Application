const startBtn = document.getElementById("start-btn");
const quizScreen = document.getElementById("quiz-screen");
const startScreen = document.getElementById("start-screen");
const resultScreen = document.getElementById("result-screen");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const questionNumber = document.getElementById("question-number");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", () => window.location.reload());

function startQuiz() {
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  resetState();
  const q = questions[currentQuestion];
  questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  questionText.textContent = q.question;

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.textContent = option;
    btn.addEventListener("click", () => selectAnswer(index, q.correctAnswer, btn));
    optionsContainer.appendChild(btn);
  });

  startTimer();
}

function selectAnswer(selected, correct, btn) {
  stopTimer();
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach(b => b.disabled = true);

  if (selected === correct) {
    btn.classList.add("correct");
    score++;
  } else {
    btn.classList.add("wrong");
    buttons[correct].classList.add("correct");
  }

  nextBtn.disabled = false;
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  scoreElement.textContent = `Your Score: ${score} / ${questions.length}`;
}

function resetState() {
  optionsContainer.innerHTML = "";
  nextBtn.disabled = true;
  timeLeft = 30;
  timerElement.textContent = timeLeft;
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft === 0) {
      stopTimer();
      selectAnswer(-1, questions[currentQuestion].correctAnswer, {});
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}
