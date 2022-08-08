var questionContainer = document.getElementById("questionCard");
var introContainer = document.getElementById("starter-container");
var finalContainer = document.getElementById("finishCard");
var scoreContainer = document.getElementById("score-banner");
var formInitials = document.getElementById("initial-form");
var highScoreContianer = document.getElementById("high-Score-Contianer");
var viewHighScore = document.getElementById("view-high-score");
var listHighScore = document.getElementById("high-score-list");
var correct = document.getElementById("correct");
var wrong = document.getElementById("wrong");

var btnStart = document.querySelector("#startQuiz");
var btnGoBack = document.querySelector("#go-back");
var btnClearScore = document.querySelector("#clear-high-scores");

var questionEl = document.getElementById("question");
var answerbuttonsEl = document.getElementById("answerButton");
var timer = document.querySelector("#timer");
var score= 0;
var timeleft;
var gameover;
timer.innerText = 0;

var HighScores = [];

var arrayShuffleQuestions
var questionIndex = 0

//Array of questions for quiz
var questions = [
    { q: "Commonly used data types DO Not Include:",
        a: "3. Alerts",
        choices: [{choice: "1. strings"}, {choice: "2. booleans"}, {choice: "3. alerts"}, {choice: "4. numbers"}]
    },

    { q: "The condition in an if / else statement is enclosed with ________.",
        a: "3. Parenthesis",
        choices: [{choice: "1. quotes"}, {choice: "2. curly brackets"}, {choice: "3. parenthesis"}, {choice: "4. square brackets"}]
    },

    { q: "Arrays in JavaScript can be used to store _______.",
        a: "4. all of the above",
        choices: [{choice: "1. numbers and strings"}, {choice: "2. other arrays"}, {choice: "3. booleans"}, {choice: "4. all of the above"}]
    },

    { q: "String values must be enclosed within _______ when being assigned to variables.",
        a: "3. quotes",
        choices: [{choice: "1. commas"}, {choice: "2. curly brackets"}, {choice: "3. quotes"}, {choice: "4. parenthesis"}]
    },

    { q: "A very useful tool used during development and debugging for print content to the debugger is:",
        a: "4. console.log",
        choices: [{choice: "1. Javascript"}, {choice: "2. terminal/bash"}, {choice: "3. for loops"}, {choice: "4. console.log"}]
    },
];

var renderStartPage = function () {
    highScoreContianer.classList.add("hide")
    highScoreContianer.classList.remove("show")
    introContainer.classList.remove("hide")
    introContainer.classList.add("show")
    scoreContainer.removeChild(scoreContainer.lastChild)
    questionIndex = 0
    gameover = ""
    timer.textContent = 0 
    score = 0

    if (correct.className = "show") {
        correct.classList.remove("show");
        correct.classList.add("hide")
    }
    if (wrong.className = "show") {
        wrong.classList.remove("show");
        wrong.classList.add("hide");
    }
}

var setTime = function () {
    timeleft = 30;

var timercheck = setInterval(function(){
    timer.innerText = timeleft;
    timeleft--

    if (gameover) {
        clearInterval(timercheck) 
    }
   
    if (timeleft < 0) {
        showScore()
        timer.innerText = 0
        clearInterval(timercheck)
    }

}, 1000)
}

var startQuiz = function () {
    introContainer.classList.add("hide");
    introContainer.classList.remove("show");
    questionContainer.classList.remove("hide");
    questionContainer.classList.add("show");

    arrayShuffleQuestions = questions.sort(() => Math.random() -0.5)
    setTime()
    nextQuestion()
}



var nextQuestion = function() {
    resetAnswers()
    displayQuestion(arrayShuffleQuestions[questionIndex])
}

var resetAnswers = function() {
   while (answerbuttonsEl.firstChild) {
     answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)
    };
};

var displayQuestion = function(index) {
    questionEl.innerText = index.q 
    for (var i = 0; i < index.choices.length; i++) {
        var answerbutton = document.createElement("button")
        answerbutton.innerText = index.choices[i].choice
        answerbutton.classList.add("btn")
        answerbutton.classList.add("answerbtn")
        answerbutton.addEventListener("click", answerCheck)
        answerbuttonsEl.appendChild(answerbutton)
    }
};

var answerCorrect = function() {
    if (correct.className = "hide") {
        correct.classList.remove("hide")
        correct.classList.add("banner")
        wrong.classList.remove("banner")
        wrong.classList.add("hide")
        }
    } 

    var answerWrong = function() {
        if (wrong.className = "hide") {
            wrong.classList.remove("hide")
            wrong.classList.add("banner")
            correct.classList.remove("banner")
            correct.classList.add("hide")
        }
    }

    var answerCheck = function(event) {
        var selectedanswer = event.target
            if (arrayShuffleQuestions[questionIndex].a === selectedanswer.innerText){
                answerCorrect()
                score = score + 7
            }

            else {
              answerWrong()
              score = score - 1;
              timeleft = timeleft - 3;
          };

          questionIndex++
          if  (arrayShuffleQuestions.length > questionIndex + 1) {
              nextQuestion()
          }   
          else {
             gameover = "true";
             showScore();
              }
  }

  var showScore = function () {
    questionContainer.classList.add("hide");
    finalContainer.classList.remove("hide");
    finalContainer.classList.add("show");

    var scoreDisplay = document.createElement("p");
    scoreDisplay.innerText = ("Your final score is " + score + "!");
    scoreContainer.appendChild(scoreDisplay);
}  

var createHighScore = function(event) { 
    event.preventDefault() 
    var initials = document.querySelector("#initials").value;
    if (!initials) {
      alert("Enter your intials!");
      return;
    }

  formInitials.reset();

  var HighScore = {
  initials: initials,
  score: score
  } 

  HighScores.push(HighScore);
  HighScores.sort((a, b) => {return b.score-a.score});

while (listHighScore.firstChild) {
       listHighScore.removeChild(listHighScore.firstChild)
    }
    //create elements in order of high scores
    for (var i = 0; i < HighScores.length; i++) {
      var highscoreEl = document.createElement("li");
      highscoreEl.ClassName = "high-score";
      highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
      listHighScore.appendChild(highscoreEl);
    }
    saveHighScore();
    displayHighScores();
}

var saveHighScore = function () {
    localStorage.setItem("HighScores", JSON.stringify(HighScores))
        
}

//load values/ called on page load
var loadHighScore = function () {
    var LoadedHighScores = localStorage.getItem("highScores")
        if (!LoadedHighScores) {
        return false;
    }

    LoadedHighScores = JSON.parse(LoadedHighScores);
    LoadedHighScores.sort((a, b) => {return b.score-a.score})


    for (var i = 0; i < LoadedHighScores.length; i++) {
        var highScores = document.createElement("li");
        highScores.ClassName = "high-score";
        highScores.innerText = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
        listHighScore.appendChild(highScores);

        HighScores.push(LoadedHighScores[i]);
        
    }
}  

var displayHighScores = function() {

    highScoreContianer.classList.remove("hide");
    highScoreContianer.classList.add("show");
    gameover = "true"

    if (finalContainer.className = "show") {
        finalContainer.classList.remove("show");
        finalContainer.classList.add("hide");
        }
    if (introContainer.className = "show") {
        introContainer.classList.remove("show");
        introContainer.classList.add("hide");
        }
        
    if (containerQuestion.className = "show") {
        containerQuestion.classList.remove("show");
        containerQuestion.classList.add("hide");
        }

    if (correct.className = "show") {
        correct.classList.remove("show");
        correct.classList.add("hide");
    }

    if (wrong.className = "show") {
        wrong.classList.remove("show");
        wrong.classList.add("hide");
        }
    
}

var clearScore = function () {
    HighScores = [];

    while (listHighScore.firstChild) {
        listHighScore.removeChild(listHighScore.firstChild);
    }

    localStorage.clear(HighScores);

} 

loadHighScore()
        
//on start click, start game
btnStart.addEventListener("click", startQuiz)
//on submit button -- enter or click
formInitials.addEventListener("submit", createHighScore)
//when view high-scores is clicked
viewHighScore.addEventListener("click", displayHighScores)
//Go back button
btnGoBack.addEventListener("click", renderStartPage)
//clear scores button
btnClearScore.addEventListener("click", clearScore)
