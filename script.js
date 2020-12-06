const startButton = document.getElementById('start-btn');
const viewScoresButton = document.getElementById('highscore-btn');
const timeRemaining = document.getElementById('time-remaining');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const timerContainerElement = document.getElementById('timer-container');
const finishedContainerElement = document.getElementById('finished-container');
const submitScoreElement = document.getElementById('submit-score');
const finalScore = document.getElementById('user-score');
const highscoreContainerElement = document.getElementById('highscore-containe');
const viewButtonsElement = document.getElementById('view-score-button');

const totalSeconds = 100;
const secondsElapsed = 0;
let interval;

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

}

function setNextQuestion() {

}

function displayQuestion () {

}

function resetState() {

}

function selectAnswer() {

}

function endQuiz () {

}

function renderTime() {

}

function stopTime() {

}


