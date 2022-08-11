//variables from htmlviewHighScoreEl
var questionCardEl = document.getElementById("questionCard");
var startCardEl = document.getElementById("startCard");
var endCardEl = document.getElementById("endCard")
var scoreCardEl = document.getElementById("score-banner")
var initialsForm = document.getElementById("initials-form")
var highscoreCardEl = document.getElementById("highScoreContainer")
var viewHighScoreEl = document.getElementById("viewHighScores")
var highScoreListEl = document.getElementById("highScoreList")
var correctEl = document.getElementById("correct")
var wrongEl = document.getElementById("wrong")
//buttons
var btnStartEl = document.querySelector("#startQuiz");
var btnGoBackEl = document.querySelector("#go-back")
var btnClearScoresEl = document.querySelector("#clear-high-scores")
//questions/answers element
var questionEl = document.getElementById("question")
var answerbuttonsEl = document.getElementById("answer-buttons")
var timerEl = document.querySelector("#timer");
var score = 0;
var timeleft;
var gameover
timerEl.innerText = 0;
var HighScores = [];
var arrayShuffledQuestions
var QuestionIndex = 0

//start quiz function
var startGame = function() {
  //add classes to show/hide start and quiz screen
  startCardEl.classList.add('hide');
  startCardEl.classList.remove('show');
  questionCardEl.classList.remove('hide');
  questionCardEl.classList.add('show');
  //Shuffle the questions so they show in random order
  arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5)
  setTime()
  nextQuestion()
}

//every second, check if game-over is true, or if there is time left. Start time at 30. 
var setTime = function () {
  timeleft = 30;

var timercheck = setInterval(function() {
  timerEl.innerText = timeleft;
  timeleft--

  if (gameover) {
      clearInterval(timercheck)
  }
 
  if (timeleft < 0) {
      showScore()
      timerEl.innerText = 0
      clearInterval(timercheck)
  }

  }, 1000)
}

// The array of questions for quiz 
var questions = [
  { q: 'Commonly used data types DO Not Include:', 
    a: '3. Alerts', 
    choices: [{choice: '1. strings'}, {choice: '2. booleans'}, {choice: '3. Alerts'}, {choice: '4. numbers'}]
  },
  { q: 'The condition in an if / else statement is enclosed with _______.', 
    a: '2. curly brackets', 
    choices: [{choice: '1. quotes'}, {choice: '2. curly brackets'}, {choice: '3. parenthesis'}, {choice: '4. square brackets'}]
  },
  { q: 'Arrays in Javascript can be used to store _______.', 
    a: '4. All of the above', 
    choices: [{choice: '1. numbers and strings'}, {choice: '2. other arrays'}, {choice: '3. booleans'}, {choice: '4. All of the above'}]
  },
  { q: 'String values must be enclosed within _________ when being assigned to variables.', 
    a: '3. quotes', 
    choices: [{choice: '1. commas'}, {choice: '2. curly brackets'}, {choice: '3. quotes'}, {choice: '4. parenthesis'}]
  },

  { q: 'A very useful tool used during development and debugging for printing content to the debugger is:', 
    a: '4. console.log', 
    choices: [{choice: '1. Javascript'}, {choice: '2. terminal/bash'}, {choice: '3. for loops'}, {choice: '4. console.log'}]
  },
];

//display question information (including answer buttons)
var displayQuestion = function(index) {
  questionEl.innerText = index.q
  for (var i = 0; i < index.choices.length; i++) {
      var answerbutton = document.createElement('button')
      answerbutton.innerText = index.choices[i].choice
      answerbutton.classList.add('btn')
      answerbutton.classList.add('answerbtn')
      answerbutton.addEventListener("click", answerCheck)
      answerbuttonsEl.appendChild(answerbutton)
      }
  };
//display correct on screen
var answerCorrect = function() {
  if (correctEl.className = "hide") {
      correctEl.classList.remove("hide")
      correctEl.classList.add("banner")
      wrongEl.classList.remove("banner")
      wrongEl.classList.add("hide")
      }
  }  
//display wrong on screen
var answerWrong = function() {
  if (wrongEl.className = "hide") {
      wrongEl.classList.remove("hide")
      wrongEl.classList.add("banner")
      correctEl.classList.remove("banner")
      correctEl.classList.add("hide")
  }
}

//set next question for quiz
var nextQuestion= function() {
  resetAnswers()
  displayQuestion(arrayShuffledQuestions[QuestionIndex])
}

//remove answer buttons
var resetAnswers = function() {
  while (answerbuttonsEl.firstChild) {
      answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)
  };
};
//check if answer is correct    
var answerCheck = function(event) {
  var selectedanswer = event.target
      if (arrayShuffledQuestions[QuestionIndex].a === selectedanswer.innerText){
          answerCorrect()
          score = score + 7
      }

      else {
        answerWrong()
        score = score - 1;
        timeleft = timeleft - 10;
    };

  //go to next question, check if there is more questions
    QuestionIndex++
      if  (arrayShuffledQuestions.length > QuestionIndex + 1) {
          nextQuestion()
      }   
      else {
         gameover = "true";
         showScore();
          }
}

  //Display total score screen at end of quiz
var showScore = function () {
  questionCardEl.classList.add("hide");
  endCardEl.classList.remove("hide");
  endCardEl.classList.add("show");

  var scoreDisplay = document.createElement("p");
  scoreDisplay.innerText = ("Your final score is " + score + "!");
  scoreCardEl.appendChild(scoreDisplay);
}       

//create high score values
var createHighScore = function(event) { 
  event.preventDefault() 
  var initials = document.querySelector("#initials").value;
  if (!initials) {
    alert("Enter your intials!");
    return;
  }

initialsForm.reset();

var HighScore = {
initials: initials,
score: score
} 

//push and sort scores
HighScores.push(HighScore);
HighScores.sort((a, b) => {return b.score-a.score});

//clear visibile list to resort
while (highScoreListEl.firstChild) {
 highScoreListEl.removeChild(highScoreListEl.firstChild)
}
//create elements in order of high scores
for (var i = 0; i < HighScores.length; i++) {
var highscoreEl = document.createElement("li");
highscoreEl.ClassName = "high-score";
highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
highScoreListEl.appendChild(highscoreEl);
}

saveHighScore();
displayHighScores();

}
//save high score
var saveHighScore = function () {
  localStorage.setItem("HighScores", JSON.stringify(HighScores))
      
}

//load values/ called on page load
var loadHighScore = function () {
  var LoadedHighScores = localStorage.getItem("HighScores")
      if (!LoadedHighScores) {
      return false;
  }

  LoadedHighScores = JSON.parse(LoadedHighScores);
  LoadedHighScores.sort((a, b) => {return b.score-a.score})


  for (var i = 0; i < LoadedHighScores.length; i++) {
      var highscoreEl = document.createElement("li");
      highscoreEl.ClassName = "high-score";
      highscoreEl.innerText = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
      highScoreListEl.appendChild(highscoreEl);

      HighScores.push(LoadedHighScores[i]);
      
  }
}  

//display high score screen from link or when intiials entered
var displayHighScores = function() {

  highscoreCardEl.classList.remove("hide");
  highscoreCardEl.classList.add("show");
  gameover = "true"

  if (endCardEl.className = "show") {
      endCardEl.classList.remove("show");
      endCardEl.classList.add("hide");
      }
  if (startCardEl.className = "show") {
      startCardEl.classList.remove("show");
      startCardEl.classList.add("hide");
      }
      
  if (questionCardEl.className = "show") {
      questionCardEl.classList.remove("show");
      questionCardEl.classList.add("hide");
      }

  if (correctEl.className = "show") {
      correctEl.classList.remove("show");
      correctEl.classList.add("hide");
  }

  if (wrongEl.className = "show") {
      wrongEl.classList.remove("show");
      wrongEl.classList.add("hide");
      }
  
}
//clears high scores
var clearScores = function () {
  HighScores = [];

  while (highScoreListEl.firstChild) {
      highScoreListEl.removeChild(highScoreListEl.firstChild);
  }

  localStorage.clear(HighScores);

} 

  //if go back button is hit on high score page
  //restarts page/quiz
loadHighScore()
  var renderStartPage = function () {
  highscoreCardEl.classList.add("hide")
  highscoreCardEl.classList.remove("show")
  startCardEl.classList.remove("hide")
  startCardEl.classList.add("show")
  scoreCardEl.removeChild(scoreCardEl.lastChild)
  QuestionIndex = 0
  gameover = ""
  timerEl.textContent = 0 
  score = 0

  //shows and hides appropriate containers
  if (correctEl.className = "show") {
      correctEl.classList.remove("show");
      correctEl.classList.add("hide")
  }
  if (wrongEl.className = "show") {
      wrongEl.classList.remove("show");
      wrongEl.classList.add("hide");
  }
}

//on start click, start game
btnStartEl.addEventListener("click", startGame)
//on submit button enter or click
initialsForm.addEventListener("submit", createHighScore)
//when view high-scores is clicked
viewHighScoreEl.addEventListener("click", displayHighScores)
//Go back button
btnGoBackEl.addEventListener("click", renderStartPage)
//clear scores button
btnClearScoresEl.addEventListener("click", clearScores)