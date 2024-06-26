const questions = [
    {
        question: "Que color me gusta más?",
        answers: [
            {text: "Blanco", correct: false},
            {text: "Azul", correct: false},
            {text: "Negro", correct: true},
            {text: "Amarillo", correct: false},
        ]
    },
    {
        question: "Que música escucho regularmente?",
        answers: [
            {text: "Pop", correct: false},
            {text: "Rock", correct: false},
            {text: "Reggae", correct: true},
            {text: "Rap", correct: true},
        ] 
    },
    {
        question: "Me amas?",
        answers: [
            {text: "Si", correct: false},
            {text: "Un chingo", correct: true},
            {text: "Cada vez menos", correct: false},
            {text: "No", correct: false},
        ]
    },
    {
        question: "Me extrañas?",
        answers: [
            {text: "Aveces", correct: false},
            {text: "Nel", correct: false},
            {text: "Sisi", correct: true},
            {text: "Quiero hablar con mi abogado", correct: false},
        ]
    },
    {
        question: "Quieres vivir conmigo?",
        answers: [
            {text: "Puedes ir olvidandolo", correct: false},
            {text: "Simon", correct: false},
            {text: "Clarooooo....", correct: false},
            {text: "Cuando me mudo?", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

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
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answers.correct){
            button.dataset.correct = answers.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function resetState(){
    nextButton.style.display = "none"
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
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct == "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`; 
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();