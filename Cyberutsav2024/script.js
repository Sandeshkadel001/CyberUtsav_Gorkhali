const questions = [
    { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: 0 },
    { question: "What is the cause of a grinding wheel becoming glazed in a grinding machine?", options: ["Grinding wheel's grade is too shaft", "Grinding wheel's grade is too large", "Feed and traverse are less", "Grinding wheel's speed is too high and work speed is low"], answer: 3 },
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
const scoreEl = document.getElementById("score");  // Corrected selector
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

function showResults() {
    // Display results logic here (e.g., show score, correct answers, etc.)
    resultSection.style.display = "block";  // Make results visible

    // After showing results, prompt to restart the timer
    setTimeout(() => {
        if (confirm("Would you like to restart the quiz?")) {
            resetQuiz();
        }
    }, 100);
}

function resetQuiz() {
    // Reset all quiz state
    timeRemaining = 100;
    score = 0;
    currentQuestion = 0;
    selectedOption = null;
    questionNumberEl.textContent = currentQuestion + 1;
    scoreEl.textContent = score;

    // Hide the result section
    resultSection.style.display = "none";

    // Restart the timer
    startTimer();
}

// Start the quiz initially by starting the timer
startTimer();


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
    // Stop the timer permanently by clearing the interval and displaying results
    clearInterval(timerInterval);
    timerDisplay.textContent = "0";  // Ensure the timer shows 0 when the quiz ends
    
    resultSection.style.display = "block"; // Show result section
    scoreEl.textContent = score;  // Show score
    alert("Congratulations! You've completed the quiz!");
}

function resetQuiz() {
    timeRemaining = 100;
    score = 0;
    currentQuestion = 0;
    selectedOption = null;
    document.getElementById("time").textContent = timeRemaining;
    document.querySelector(".quiz-container").style.display = "none";
    document.querySelector(".intro").style.display = "block";
    resultSection.style.display = "none"; // Hide result section
    document.getElementById("restart").style.display = "block"; // Show restart button
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
            showResults(); // Show results and stop timer
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
    resetQuiz();
    startTimer();
    loadQuestion(currentQuestion);
    document.querySelectorAll(".option").forEach(button => {
        button.disabled = false;
    });
});

startTimer();

document.querySelectorAll(".option").forEach(button => {
    button.addEventListener("click", () => {
        document.getElementById("next").disabled = false;
    });
});