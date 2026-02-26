// Result mapping
const RESULTS_MAP = {
  gryffindor: "Brave and Chivalrous, gryffindor",
  slytherin: "Cunning and Ambitious, slytherin",
  hufflepuff: "Loyal and Dedicated, hufflepuff"
};

const scores = {
  gryffindor: 0,
  slytherin: 0,
  hufflepuff: 0
};

let answersChosen = 0;
let quizLocked = false;

document.body.addEventListener("click", function (event) {
  if (quizLocked) return;

  const choice = event.target.closest(".choice");
  if (!choice) return;

  const questionSection = choice.closest(".question");

  if (!questionSection.dataset.answered) {
    questionSection.dataset.answered = "true";
    answersChosen++;
  }

  const allChoices = questionSection.querySelectorAll(".choice");
  allChoices.forEach(c => {
    c.classList.remove("selected");
    c.classList.add("dimmed");
  });

  choice.classList.add("selected");
  choice.classList.remove("dimmed");

  const personality = choice.dataset.choiceId;

  calculateScores();

  if (answersChosen === 3) {
    finishQuiz();
  }
});

function calculateScores() {
    
  for (let key in scores) {
    scores[key] = 0;
  }

  const selected = document.querySelectorAll(".selected");
  selected.forEach(choice => {
    const id = choice.dataset.choiceId;
    scores[id]++;
  });
}

function finishQuiz() {
  quizLocked = true;

  let winner = null;
  let highest = 0;

  for (let key in scores) {
    if (scores[key] > highest) {
      highest = scores[key];
      winner = key;
    }
  }

  const resultBox = document.getElementById("result-box");
  const winnerText = document.getElementById("winner");

  winnerText.textContent = "You are: " + RESULTS_MAP[winner];
  resultBox.style.display = "block";
}