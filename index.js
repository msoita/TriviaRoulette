const questions = [
    {
        question: "What is the capital of France?",
        correct_answer: "Paris",
        incorrect_answers: [
            "Belgium",
            "Croissant",
            "Marseille"
        ]
    },

    {
        question: "What is the biggest fruit on average?",
        correct_answer: "Jackfruit",
        incorrect_answers: [
            "Pumpkin",
            "Watermelon",
            "Pineapple"
        ]
    },

    {
        question: "What is the tallest recorded human height?",
        correct_answer: "8ft. 11in.",
        incorrect_answers: [
            "9ft. 6in.",
            "7ft. 10in.",
            "10ft. 2in.",
            "8ft. 2in."
        ]
    },

    {
        question: "Which one of these buildings is the tallest?",
        correct_answer: "Burj Khalifa",
        incorrect_answers: [
            "World Trade Center",
            "Shanghai Tower",
            "Central Park Tower"
        ]
    },

    {
        question: "What animal has the most hearts?",
        correct_answer: "Earthworm",
        incorrect_answers: [
            "Octopus",
            "Jellyfish",
            "Horses"
        ]
    },

    {
        question: "Which planet spins backwards?",
        correct_answer: "Venus",
        incorrect_answers: [
            "Mars",
            "Saturn",
            "Neptune",
            "Jupiter",
            "Earth"
        ]
    },

    {
        question: "Where is the largest desert located?",
        correct_answer: "Antarctica",
        incorrect_answers: [
            "Africa",
            "Europe",
            "North America",
            "South America"
        ]
    },

    {
        question: "What is the best selling movie of all time?",
        correct_answer: "Avengers: Endgame",
        incorrect_answers: [
            "Avatar",
            "Spider-Man: Brand New Day",
            "Avengers: Infinity War",
            "Titanic",
            "The Godfather"
        ]
    }
];

let questionFooter = document.getElementById("questionFooter");
let questionWrapper = document.getElementById("questionWrapper");
let questionsRight = document.getElementById("questionsRight");

let questionHeader = document.getElementById("questionHeader");
let newQuestion = document.getElementById("newQuestion");
let playAgain = document.getElementById("playAgain");

let questionsCorrect = 0;
let questionsGuessed = [];

let lastQuestionIndex;
let currentQuestionGuessed;

playAgain.hidden = true;
questionWrapper.style.marginBottom = "24px";
questionsRight.style.marginLeft = "8px";

function getRandomQuestion(){
    const totalQuestions = questions.length;
    const questionsLeft = totalQuestions - questionsGuessed.length;

    if (questionsGuessed.length >= totalQuestions){
        return;
    }

    let questionIndex;
    do {
        questionIndex = Math.floor(Math.random() * totalQuestions);
        while ((questionsLeft > 1) && (questionIndex === lastQuestionIndex)){
            questionIndex = Math.floor(Math.random() * totalQuestions);
        }
    } while (questionsGuessed.includes(questionIndex));

    questionsGuessed.push(questionIndex);
    return questions[questionIndex];
}

function renderQuestion(){
    const question = getRandomQuestion();
    if (question){
        questionWrapper.innerHTML = "";
        questionHeader.innerText = question.question;
    
        const totalAnswers = 1 + question.incorrect_answers.length;
        const rightAnswerIndex = Math.floor(Math.random() * totalAnswers);

        let currentIndex = 0;
        let wrongIndex = 0;

        function onAnswerSelect(questionLabel){
            let inputs = document.getElementsByTagName("input");
            for (const input of inputs) {
                if (input.checked){
                    questionLabel.innerText += "; " + input.name;
                    currentQuestionGuessed = true;

                    if (input.name == "Correct"){
                        questionsCorrect++;
                    }
                    questionsRight.innerText = questionsCorrect + "/" + questionsGuessed.length;
                }
                input.disabled = true;
            }

            if (questionsGuessed.length >= questions.length){
                playAgain.hidden = false;
            }
        }

        while (currentIndex < totalAnswers){
            let questionContainer = document.createElement("div");
            let questionAnswer = document.createElement("input");
            let questionLabel = document.createElement("span");
            questionAnswer.type = "radio";

            if (currentIndex == rightAnswerIndex){
                questionAnswer.name = "Correct";
                questionLabel.innerText = question.correct_answer;
            }else{
                questionAnswer.name = "Incorrect";
                questionLabel.innerText = question.incorrect_answers[wrongIndex];
                wrongIndex++;
            }

            questionContainer.appendChild(questionAnswer);
            questionContainer.appendChild(questionLabel);

            questionWrapper.appendChild(questionContainer);
            questionAnswer.addEventListener("change", () => onAnswerSelect(questionLabel));
            currentIndex++;
        }
    }
}

newQuestion.addEventListener("click", () => {
    if (questions.length > questionsGuessed.length){
        if (!currentQuestionGuessed){
            lastQuestionIndex = questionsGuessed.pop();
        }

        currentQuestionGuessed = false;
        renderQuestion();
    }
});

playAgain.addEventListener("click", () =>{
    playAgain.hidden = true;
    currentQuestionGuessed = false;
    lastQuestionIndex = null;

    questionsCorrect = 0;
    questionsGuessed = [];

    questionsRight.innerText = "0/0";
    renderQuestion();
})
renderQuestion();