const questions = [
    {
        question: "Question 1: What is the capital of France?",
        options: [
            { text: "Madrid", correct: false },
            { text: "Sydney", correct: false },
            { text: "Paris", correct: true },
            { text: "Toronto", correct: false }
        ]
    },
    {
        question: "Question 2: Which is the largest country in the world by land area?",
        options: [
            { text: "Morocco", correct: false },
            { text: "Canada", correct: false },
            { text: "Russia", correct: true },
            { text: "Australia", correct: false }
        ]
    },
    {
        question: "Question 3: What is the largest ocean on Earth?",
        options: [
            { text: "Pacific Ocean", correct: true },
            { text: "Arctic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Atlantic Ocean", correct: false }
        ]  
    },
    {
        question: "Question 4: How may continents are there on Earth?",
        options: [
            { text: "5", correct: false },
            { text: "10", correct: false },
            { text: "7", correct: true },
            { text: "12", correct: false }
        ]   
    },
    {
        question: "Question 5: The part of the earth's atmosphere that is fastest from land is called...",
        options: [
            { text: "Stratosphere", correct: false },
            { text: "Lithosphere", correct: false },
            { text: "Exosphere", correct: true },
            { text: "thermosphere", correct: false }
        ] 
    },
    {
        question: "Question 6: What is the capital of China?",
        options: [
            { text: "Nairobi", correct: false },
            { text: "Hong Kong", correct: false },
            { text: "Moscow", correct: false },
            { text: "Beijing", correct: true }
        ]   
    },
    {
        question: "Question 7: How many countries are there in Africa?",
        options: [
            { text: "30", correct: false },
            { text: "49", correct: false },
            { text: "50", correct: false },
            { text: "54", correct: true }
        ] 
    },
    {
        question: "Question 8: Which Continent is Sahara desert located in?",
        options: [
            { text: "Europe", correct: false },
            { text: "North America", correct: false },
            { text: "Africa", correct: true },
            { text: "Oceania", correct: false }
        ]  
    },

    // Add more questions here...
];
// CONSTANTS DECLARATIONS
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const optionButtons = document.getElementsByClassName("option-btn");
const timerElement = document.getElementById("timer");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("score");


let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 120;

// Start the quiz
function startQuiz() {
    quizContainer.style.display = "block";
    resultContainer.style.display = "none";
    nextButton.disabled = true;
    score = 0;
    currentQuestionIndex = 0;
    setQuestion();
    startTimer();
}

// Set the current question and options
function setQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    // Clear previous options
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }

    // Create options buttons
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option.text;
        button.classList.add("option-btn");
        optionsContainer.appendChild(button);
        button.addEventListener("click", () => {
            checkAnswer(index);
        });
    });
}

// Check the selected answer
function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedOption = currentQuestion.options[selectedIndex];

    if (selectedOption.correct) {
        score++;
    }

    for (let i = 0; i < optionButtons.length; i++) {
        optionButtons[i].disabled = true;
        if (currentQuestion.options[i].correct) {
            optionButtons[i].classList.add("correct");
        } else if (i === selectedIndex) {
            optionButtons[i].classList.add("incorrect");
        }
    }

    nextButton.disabled = false;
}



// Handle the next button click
function handleNextButton() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        setQuestion();
        resetOptions();
    } else {
        endQuiz();
    }
}

// Reset the options to initial state
function resetOptions() {
    for (let i = 0; i < optionButtons.length; i++) {
        optionButtons[i].disabled = false;
        optionButtons[i].classList.remove("correct", "incorrect");
    }

    nextButton.disabled = true;
}


// End the quiz and show the result in percentage  
function endQuiz() {
    clearInterval(timerInterval);
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    
    const percentageScore = (score / questions.length) * 100;
    scoreElement.textContent = `${percentageScore}`;
}

// Timer function
function startTimer() {
    timerElement.textContent = formatTime(timeLeft);

    timerInterval = setInterval(() => {
        timeLeft--;

        if (timeLeft >= 0) {
            timerElement.textContent = formatTime(timeLeft);
        } else {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

// Time formatting
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// Start the quiz when the page loads
window.onload = startQuiz;

nextButton.addEventListener("click", handleNextButton);













