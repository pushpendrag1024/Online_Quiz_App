const questions = [
    {
        question: "Which is the largest animal in the World?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ] 
    },
    {
        question: "How many consonants are there in the English alphabet?",
        answers: [
            {text: "21", correct: true},
            {text: "25", correct: false},
            {text: "19", correct: false},
            {text: "5", correct: false},
        ] 
    },
    {
        question: "Which is the smallest continent in the World?",
        answers: [
            {text: "Australia", correct: true},
            {text: "Asia", correct: false},
            {text: "Africa", correct: false},
            {text: "Arctic", correct: false},
        ] 
    },
    {
        question: " Which animal is known as the king of the jungle?",
        answers: [
            {text: "Tiger", correct: false},
            {text: "Elephant", correct: false},
            {text: "Lion", correct: true},
            {text: "Monkey", correct: false},
        ] 
    },
    {
        question: "Which is the largest desert in the World?",
        answers: [
            {text: "Sahara", correct: false},
            {text: "Thar", correct: false},
            {text: "Gobi", correct: false},
            {text: "Antarctica", correct: true},
        ] 
    },
    {
        question: "What is the capital of India?",
        answers: [
            {text: "Mumbai", correct: false},
            {text: "New Delhi", correct: true},
            {text: "Chadigarh", correct: false},
            {text: "Kerala", correct: false},
        ] 
    },
    {
        question: "Which is the smallest country in the World?",
        answers: [
            {text: "Vatican City", correct: true},
            {text: "Bhutan", correct: false},
            {text: "Nepal", correct: false},
            {text: "Sri Lanka", correct: false},
        ] 
    },
    {
        question: "How many days are there in a week?",
        answers: [
            {text: "9", correct: false},
            {text: "4", correct: false},
            {text: "7", correct: true},
            {text: "5", correct: false},
        ] 
    },
    {
        question: "How many letters are there in the English alphabet?",
        answers: [
            {text: "22", correct: false},
            {text: "16", correct: false},
            {text: "11", correct: false},
            {text: "26", correct: true},
        ] 
    },
    {
        question: "  Which colour symbolises peace?",
        answers: [
            {text: "Yellow", correct: false},
            {text: "White", correct: true},
            {text: "Black", correct: false},
            {text: "Red", correct: false},
        ] 
    }
]

const questionElement = document.getElementById("quest");
const answerButtons = document.getElementById("answer");
const nextButton = document.getElementById("next");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;   
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();