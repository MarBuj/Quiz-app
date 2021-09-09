import { startBtnActive, nextBtnActive, startBtnHide, infoCardActive, quizCardActive, resultCardActive, cardHide } from './animations.js';

const startBtn = document.querySelector('.startBtn');
const exitBtn = document.querySelector('.exitBtn');
const continueBtn = document.querySelector('.continueBtn');
const nextBtn = document.querySelector('.nextBtn');
const quitBtn = document.querySelector('.quitBtn');
const replyBtn = document.querySelector('.replyBtn');

const infoCard = document.querySelector('.infoCard');
const quizCard = document.querySelector('.quizCard');
const resultCard = document.querySelector('.resultCard');

const timeCounter = document.querySelector('.time_counter');

startBtnActive();

startBtn.addEventListener('click', () => {
    startBtnHide();
    setTimeout(infoCardActive, 300)
})

exitBtn.addEventListener('click', () => {
    cardHide();
    setTimeout(startBtnActive, 300)
})

continueBtn.addEventListener('click', () => {
    cardHide();
    setTimeout(quizCardActive, 1000)
    nextBtn.style.display = 'none';
    nextBtn.style.opacity = '0';
    showQuestion(0);
    quizQuestionCounter(1);
    StartTimer(timeSecs);
})

let questionCount = 0;
let questionNumber = 1;
let counter; 
let timeSecs = 15;
let userScore = 0;

replyBtn.addEventListener('click', () => {
    cardHide();
    setTimeout(quizCardActive, 300)
    resultCard.style.display = 'none';
    quizCard.style.display = 'block';
    questionCount = 0;
    questionNumber = 1;
    timeSecs = 15;
    userScore = 0;
    resetStyles();
    nextBtn.style.display = 'none';
    showQuestion(questionCount);
    quizQuestionCounter(questionNumber);
    clearInterval(counter);
    StartTimer(timeSecs);
})

quitBtn.addEventListener('click', () => {
    window.location.reload();
    startBtnActive();
})

nextBtn.addEventListener('click', () => {
    if (questionCount < questions.length - 1) {
        cardHide();
        resetStyles();
        setTimeout(quizCardActive, 300)
        nextBtn.style.display = 'none';
        nextBtn.style.opacity = '0';
        questionCount++;
        questionNumber++;
        showQuestion(questionCount);
        quizQuestionCounter(questionNumber);
        clearInterval(counter);
        StartTimer(timeSecs);
    } else {
        cardHide();
        ShowResult();
    }
})

const question = document.querySelector('.question');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');
const options = document.querySelectorAll('.option');

function showQuestion(index) {
    let questionTitle = questions[index].numb + '. ' + questions[index].question;
    let optionTitle1 = questions[index].options[0];
    let optionTitle2 = questions[index].options[1];
    let optionTitle3 = questions[index].options[2];
    let optionTitle4 = questions[index].options[3];

    question.innerHTML = questionTitle;
    option1.innerHTML = optionTitle1;
    option2.innerHTML = optionTitle2;
    option3.innerHTML = optionTitle3;
    option4.innerHTML = optionTitle4;

    for (let i = 0; i < options.length; i++) {
        options[i].addEventListener("click", optionSelected)
    }
}

const correctIcon = '<i class="far fa-check-circle"></i>';
const incorrectIcon = '<i class="far fa-times-circle"></i>';

function optionSelected(answer){
    clearInterval(counter);
    nextBtnActive();
    let userAnswer = answer.target.innerText;
    let correctAnswer = questions[questionCount].answer;
    if (userAnswer == correctAnswer) {
        userScore++;
        answer.target.classList.add('list-group-item-action');
        answer.target.classList.add('list-group-item-success');
        answer.target.insertAdjacentHTML('beforeend', correctIcon);
    } else {
        answer.target.classList.add('list-group-item-action');
        answer.target.classList.add('list-group-item-danger');
        answer.target.insertAdjacentHTML('beforeend', incorrectIcon);

        for (let i = 0; i < options.length; i++){
            if (options[i].innerText == correctAnswer) {
                options[i].classList.add('list-group-item-action');
                options[i].classList.add('list-group-item-success');
                options[i].insertAdjacentHTML('beforeend', correctIcon);
            }
        }
    }
    for (let i = 0; i < options.length; i++){
        options[i].classList.add('disable');
    }
}

function resetStyles() {
    for (let i = 0; i < options.length; i++){
        if (options[i].classList.contains('list-group-item-action')) {
            options[i].classList.remove('list-group-item-action');
        }
        if (options[i].classList.contains('list-group-item-success')) {
            options[i].classList.remove('list-group-item-success');
        }
        if (options[i].classList.contains('list-group-item-danger')) {
            options[i].classList.remove('list-group-item-danger');
        }
        if (options[i].classList.contains('disable')) {
            options[i].classList.remove('disable');
        }
    }
}

function ShowResult() {
    setTimeout(resultCardActive, 300)
    const result = document.querySelector('.result');
    result.innerHTML = userScore;
    let resultAmount = document.querySelector('.resultAmount');
    resultAmount.innerHTML = questions.length;
}

function StartTimer(time) {
    counter = setInterval(timer, 1000)
    function timer() {
        timeCounter.innerText = time;
        time--;
        if (time < 0) {
            clearInterval(counter);
            timeCounter.innerText = '0';

            let correctAnswer = questions[questionCount].answer;
            for (let i = 0; i < options.length; i++){
                if (options[i].innerText == correctAnswer) {
                    options[i].classList.add('list-group-item-action');
                    options[i].classList.add('list-group-item-success');
                    options[i].insertAdjacentHTML('beforeend', correctIcon);
                    options[i].classList.add('disable');
                    nextBtnActive();
                }
            }
        }
    }
}

function quizQuestionCounter(index){
    const quizCardQuestionCounter = document.querySelector('.questionCounter');
    let quizCardQuestionCounterTitle = index;
    quizCardQuestionCounter.innerHTML = quizCardQuestionCounterTitle;
}
 
const questionAmount = document.querySelector('.questionAmount');
let questionAmountTitle = questions.length; 
questionAmount.innerHTML = questionAmountTitle; 