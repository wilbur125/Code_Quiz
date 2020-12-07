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
const submitScoreElement = document.getElementById('submit-score');
const finalScore = document.getElementById('user-score');
const highscoreContainerElement = document.getElementById('highscore-container');
const viewButtonsElement = document.getElementById('highscore-btn');

let timeLeft = 100;

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

let quizQuestions, currentQuestionIndex

function startQuiz() {
    let timerId = setInterval(countdown, 1000);
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
        setStatusClass(button, button.dataset.correct)
    });
    if (quizQuestions.length > currentQuestionIndex + 1) {
       nextButton.classList.remove('hide'); 
    } else {
        startButton.innerText = "Restart";
        startButton.classList.remove('hide');
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

}

function countdown() {
    timerContainerElement.classList.remove('hide');
    if (timeLeft == -1) {
        clearTimeout(timerId);
    } else {
        timeRemaining.innerHTML = timeLeft;
        timeLeft--;
    }
}

function displayScore() {

}

startButton.addEventListener('click', startQuiz);
startButton.addEventListener('click', countdown);
nextButton.addEventListener('click', ( ) => {
    currentQuestionIndex++;
    setNextQuestion()
});
