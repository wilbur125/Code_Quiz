const startButton = document.getElementById('start-btn');
const viewScoresButton = document.getElementById('highscore-btn');
const timeRemaining = document.getElementById('time-remaining');
const welcomeContainerElement = document.getElementById('welcome-container');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const timerContainerElement = document.getElementById('timer-container');
const finishedContainerElement = document.getElementById('finished-container');
const inputScoreButton = document.getElementById('submit-btn');
const userScore = document.getElementById('user-score');
const userId = document.getElementById('user-id');
const highscoreContainerElement = document.getElementById('highscore-container');
const viewScoresElement = document.getElementById('highscore-btn');
const viewScoreButtons = document.getElementById('view-score-buttons');
const backButton = document.getElementById('back-btn')
const clearButton = document.getElementById('clear-btn')
const viewButtonsElement = document.getElementById('welcome-btn-group');
const highScores = document.getElementById("highscores");

let quizQuestions, currentQuestionIndex, timeLeft, timerId;
let highScoreHistory = [];

const questions = [
    {
        question: 'What does HTML stand for?',
        answers: [
            { text: 'Hidden Made-up Language', correct: false },
            { text: 'Hypertext Markup Language', correct: true },
            { text: 'Hypertext Made-up Language', correct: false },
            { text: 'Hidden Markup Language', correct: false}
        ]
    }, 
    {
        question: 'Which of the following is not a string?',
        answers: [
            { text: '"one"', correct: false },
            { text: '"1"', correct: false },
            { text: 'true', correct: true },
            { text: '"true"', correct: false}
        ]
    }, 
    {
        question: 'Fill in the blank: A(n) ____ is a data type used to describe values being true or false.',
        answers: [
            { text: 'Integer', correct: false },
            { text: 'String', correct: false },
            { text: 'Boolean', correct: true },
            { text: 'Variable', correct: false}
        ]
    }, 
    {
        question: 'Which of the following is an example of a semantic tag?',
        answers: [
            { text: '<div>', correct: false },
            { text: '<head>', correct: false },
            { text: '<aside>', correct: true },
            { text: '<p>', correct: false}
        ]
    }
]

function startQuiz() {
    timeLeft = 100;
    timerId = setInterval(countdown, 1000);
    startButton.classList.add('hide');
    welcomeContainerElement.classList.add('hide');
    viewButtonsElement.classList.add('hide');
    quizQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    displayQuestion(quizQuestions[currentQuestionIndex]);
}

function displayQuestion (question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
    })
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (quizQuestions.length > currentQuestionIndex + 1) {
       nextButton.classList.remove('hide'); 
    } else {
        endQuiz();
    };
    if (e.target.classList.contains("wrong")) {
        timeLeft = timeLeft - 10;
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element) 
        if (correct) {
            element.classList.add('correct');
         } else {
            element.classList.add('wrong');
        }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function endQuiz () {
    stopTimer();
    displayScore();
}

function countdown() {
    timerContainerElement.classList.remove('hide');
    if (timeLeft == -1) {
        clearTimeout(timerId);
        endQuiz();
    } else {
        timeRemaining.innerHTML = timeLeft;
        timeLeft--;
    } 
}

function stopTimer() {
    clearTimeout(timerId);
}

function displayScore() {
    finishedContainerElement.classList.remove('hide');
    questionContainerElement.classList.add('hide');
    userScore.innerHTML = timeLeft;
}

function submitScore() {
    finishedContainerElement.classList.add('hide');
    highscoreContainerElement.classList.remove('hide');
    noScoresYet.classList.add('hide');
    const initials = userId.value; 
    let newHighScore = { 
        "user_id": initials,
        "score": timeLeft
    };
    highScoreHistory.push(newHighScore);
    localStorage.setItem("scores", JSON.stringify(highScoreHistory));

    let storedHighScores = JSON.parse(localStorage.getItem("scores"));

    storedHighScores.sort((a, b) => {
        return b.score - a.score;
    });
    
    highScores.innerHTML = storedHighScores.map(function(storedHighScore) {
        return (
            `
                <li>
                    ${storedHighScore.user_id}: Score: ${storedHighScore.score}
                </li> 
            `
        )
    }).join(''); 
 
       
}

function returnHome() {
    welcomeContainerElement.classList.remove('hide');
    highscoreContainerElement.classList.add('hide');
    viewButtonsElement.classList.remove('hide');
    startButton.classList.remove('hide');
    timerContainerElement.classList.add('hide');
    clearedSuccess.classList.add('hide');
}

function clearScores() {
    localStorage.clear();
    highScoreHistory = [];
    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
    removeAllChildNodes(highScores);
    clearedSuccess.classList.remove('hide');
}

function viewScores() {
    welcomeContainerElement.classList.add('hide');
    highscoreContainerElement.classList.remove('hide');
    backButton.classList.remove('hide');
    clearButton.classList.remove('hide');
    viewButtonsElement.classList.add('hide');
    
    let storedHighScores = JSON.parse(localStorage.getItem("scores"));

    if (storedHighScores === null) {
        noScoresYet.classList.remove('hide');
    } else {

        highScores.innerHTML = storedHighScores.map(function(storedHighScore) {
            return (
                `
                    <li>
                        ${storedHighScore.user_id}: Score: ${storedHighScore.score}
                    </li> 
                `
            )
        }).join(''); 
    }
}

startButton.addEventListener('click', startQuiz);
startButton.addEventListener('click', countdown);


nextButton.addEventListener('click', ( ) => {
    currentQuestionIndex++;
    setNextQuestion()
});

inputScoreButton.addEventListener('click', submitScore);


backButton.addEventListener('click', returnHome);
clearButton.addEventListener('click', clearScores);


viewScoresElement.addEventListener('click', viewScores);


