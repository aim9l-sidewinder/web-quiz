let questions = [];
let current = 0;
let score = 0;

async function loadQuestions() {
    const res = await fetch("/questions");
    questions = await res.json();
    document.getElementById("progress").textContent = `Question 1 of ${questions.length}`;
    showQuestion();
}

function showQuestion() {
    const q = questions[current];
    document.getElementById("question").textContent = q.question;
    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";
    q.answers.forEach((ans, index) => {
        const btn = document.createElement("button");
        btn.textContent = ans;
        btn.onclick = () => checkAnswer(btn, index);
        answersDiv.appendChild(btn);
    });
}

function checkAnswer(button, index) {
    const q = questions[current];
    const buttons = document.querySelectorAll("#answers button");
    buttons.forEach(b => b.disabled = true);

    if (index === q.correct) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");
        buttons[q.correct].classList.add("correct");
    }

    document.getElementById("score").textContent = `Score: ${score}`;
    setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
    current++;
    if (current < questions.length) {
        document.getElementById("progress").textContent = `Question ${current+1} of ${questions.length}`;
        showQuestion();
    } else {
        document.getElementById("question").textContent = `Quiz finished! Final score: ${score}/${questions.length}`;
        document.getElementById("answers").innerHTML = "";
    }
}

loadQuestions();
