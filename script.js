let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3,
    },
    {
        "question": "Was ist der längste Fluss der Welt?",
        "answer_1": "Der Amazonas",
        "answer_2": "Der Nil",
        "answer_3": "Der Rhein",
        "answer_4": "Der Niger",
        "right_answer": 2,
    },
    {
        "question": "Welche Farbe hat die Null auf einer klassischen Roulette-Scheibe?",
        "answer_1": "Rot",
        "answer_2": "Grün",
        "answer_3": "Blau",
        "answer_4": "Schwarz",
        "right_answer": 2,
    },
    {
        "question": "Was ist die meist gesprochene Sprache in Indien?",
        "answer_1": "Hindi",
        "answer_2": "Urdu",
        "answer_3": "Punjabi",
        "answer_4": "Bengali",
        "right_answer": 1,
    },
    {
        "question": "In welchem dieser Filme spielt Leonardo DiCaprio NICHT mit?",
        "answer_1": "The Wolf of Wallstreet",
        "answer_2": "12 Years a Slave",
        "answer_3": "Aviator",
        "answer_4": "The Revenant",
        "right_answer": 2,
    },
    {
        "question": "Wie viele Tasten hat ein Klavier?",
        "answer_1": "74 Tasten",
        "answer_2": "86 Tasten",
        "answer_3": "82 Tasten",
        "answer_4": "88 Tasten",
        "right_answer": 4,
    },
    {
        "question": "Welche Blumenzwiebeln wurden früher als Zahlungsmittel genutzt?",
        "answer_1": "Krokusse",
        "answer_2": "Lilien",
        "answer_3": "Gladiolen",
        "answer_4": "Tulpen",
        "right_answer": 4,
    },
];

let currentQuestion = 0;
let rightAnswers = 0;
let audioSuccess = new Audio("audio/success.mp3");
let audioFail = new Audio("audio/fail.mp3");

function init() {
    document.getElementById("all_questions").innerHTML = questions.length;
    showQuestion();
}

function showQuestion() {
    if (gameIsOver()) {
        showEndscreen();
    } else {
        let percent = currentQuestion/questions.length*100;
        let question = questions[currentQuestion];
        document.getElementById("progress_bar").style.width = `${percent}%`
        document.getElementById("question_number").innerHTML = currentQuestion + 1;
        document.getElementById("question_text").innerHTML = question.question;
        document.getElementById("answer_1").innerHTML = `<p class="answer-tag">A</p> ${question.answer_1}`;
        document.getElementById("answer_2").innerHTML = `<p class="answer-tag">B</p> ${question.answer_2}`;
        document.getElementById("answer_3").innerHTML = `<p class="answer-tag">C</p> ${question.answer_3}`;
        document.getElementById("answer_4").innerHTML = `<p class="answer-tag">D</p> ${question.answer_4}`;
    }
}

function gameIsOver(){
    return currentQuestion >= questions.length;
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNum = selection.slice(-1);
    let rightAnswerNum = question.right_answer;
    let right_answer = "answer_" + rightAnswerNum;

    if (selectedQuestionNum == rightAnswerNum) {
        document.getElementById(selection).classList.add("bg-success");
        rightAnswers++;
        audioSuccess.play();
    } else {
        document.getElementById(selection).classList.add("bg-danger");
        document.getElementById(right_answer).classList.add("bg-success");
        audioFail.play();
    }
    makeAnswersunclickable();
    document.getElementById("next_button").disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    showQuestion();
    document.getElementById("next_button").disabled = true;
    resetAnswerButtons();
    makeAnswersClickable();
}

function resetAnswerButtons() {
    for (let i = 1; i < 5; i++) {
        document.getElementById('answer_' + i).classList.remove("bg-danger");
        document.getElementById('answer_' + i).classList.remove("bg-success");
    }
}

function makeAnswersunclickable(){
    for (let i = 1; i < 5; i++) {
        document.getElementById('answer_' + i).parentNode.classList.add("unclickable");
    }
}

function makeAnswersClickable(){
    for (let i = 1; i < 5; i++) {
        document.getElementById('answer_' + i).parentNode.classList.remove("unclickable");
    }
}

function restartGame(){
    currentQuestion = 0;
    rightAnswers = 0;
    document.getElementById("endscreen").style = 'display: none;'; //Endscreen ausblenden
    document.getElementById("question_body").style = ''; //Frage wieder einblenden
    init();
}

function showEndscreen(){
    document.getElementById("endscreen").style = '';
    document.getElementById("question_body").style = 'display: none;';
    document.getElementById("progress_bar").style.width = `100%`
    document.getElementById("right_answers").innerHTML = rightAnswers;
    document.getElementById("number_questions").innerHTML = questions.length;
}