const questions = [
    { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: 0 },
    { question: ".	What is the cause of a grinding wheel becoming glazed in a grinding machine", options: ["grinding wheels grade is to shaft ", "grinding wheels grade is too large ", "feed and traverse are less", "grinding wheels speed is too high and work speed is low "], answer: 3 },
    { question: "What is the capital of Japan?", options: ["Beijing", "Tokyo", "Seoul", "Bangkok"], answer: 1 }
    
];

let timeRemaining = 100;
let timerInterval;
let currentQuestion = 0;
let score = 0;
let selectedOption = null;

const timerDisplay = document.getElementById("time");
const questionEl = document.querySelector(".question");
const optionsEl = document.querySelectorAll(".option");
const scoreEl = document.getElementById("score");
const resultSection = document.querySelector(".result-section");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const questionNumberEl = document.getElementById("question-number");
const totalQuestionsEl = document.getElementById("total-questions");

totalQuestionsEl.textContent = questions.length;

function startTimer() {
    timerInterval = setInterval(() => {
        timeRemaining--;
        timerDisplay.textContent = timeRemaining;
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert("Time's up! Showing your results.");
            showResults();
        }
    }, 1000);
}

function loadQuestion(index) {
    const question = questions[index];
    questionEl.textContent = question.question;
    questionNumberEl.textContent = index + 1;
    optionsEl.forEach((optionEl, i) => {
        optionEl.textContent = question.options[i];
        optionEl.classList.remove("selected");
        optionEl.onclick = () => selectOption(i);
    });
    updateNavButtons();
}

function selectOption(selectedIndex) {
    selectedOption = selectedIndex;
    optionsEl.forEach(option => option.classList.remove("selected"));
    optionsEl[selectedIndex].classList.add("selected");
    nextBtn.disabled = false;
}

function checkAnswer() {
    if (selectedOption === questions[currentQuestion].answer) {
        score++;
    }
}

function showResults() {
    resultSection.style.display = "block";
    scoreEl.textContent = score;
    clearInterval(timerInterval);
}

function updateNavButtons() {
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = selectedOption === null;
}

function goToNextQuestion() {
    if (selectedOption !== null) {
        checkAnswer();
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            selectedOption = null;
            loadQuestion(currentQuestion);
        } else {
            alert("Congratulations! You've completed the quiz!");
            showResults();
        }
    }
}

function goToPrevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        selectedOption = null;
        loadQuestion(currentQuestion);
    }
}

nextBtn.onclick = goToNextQuestion;
prevBtn.onclick = goToPrevQuestion;


document.getElementById("start").addEventListener("click", () => {
    document.querySelector(".quiz-container").style.display = "block"; 
    document.querySelector(".intro").style.display = "none";
    startTimer(); 
    loadQuestion(currentQuestion); 
});


document.getElementById("restart").addEventListener("click", () => {
    timeRemaining = 100;
    document.getElementById("time").textContent = timeRemaining;
    score = 0;
    currentQuestion = 0;
    loadQuestion(currentQuestion);
    startTimer();
    document.getElementById("restart").style.display = "none";
    document.querySelectorAll(".option").forEach(button => {
        button.disabled = false;
    });
    resultSection.style.display = "none"; 
});


startTimer();


document.querySelectorAll(".option").forEach(button => {
    button.addEventListener("click", () => {
        document.getElementById("next").disabled = false;
    });
});

