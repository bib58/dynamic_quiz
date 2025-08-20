const question_bank = [
{   question: "Who has the most centuries in international cricket?",
    options: ["Sachin Tendulkar", "Virat Kohli", "Ricky Ponting", "Jacques Kallis"],
    answer: "Sachin Tendulkar"
},
{
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris"
},
{
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
},
{
    question: "Who invented the light bulb?",
    options: ["Nikola Tesla", "Thomas Edison", "Alexander Graham Bell", "Isaac Newton"],
    answer: "Thomas Edison"
},
{
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Giraffe", "Blue Whale", "Hippopotamus"],
    answer: "Blue Whale"
},
{
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Quartz"],
    answer: "Diamond"
},
{
    question: "In which year did World War II end?",
    options: ["1942", "1945", "1939", "1950"],
    answer: "1945"
},
{
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Leo Tolstoy", "Jane Austen"],
    answer: "William Shakespeare"
},
{
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    answer: "2"
},
{
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Hydrogen", "Nitrogen", "Carbon Dioxide"],
    answer: "Carbon Dioxide"
},
{
    question: "What is the boiling point of water?",
    options: ["90°C", "100°C", "110°C", "120°C"],
    answer: "100°C"
},
{
    question: "What is the longest river in the world?",
    options: ["Amazon", "Yangtze", "Nile", "Ganges"],
    answer: "Nile"
},
{
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "India", "Australia", "Japan"],
    answer: "Japan"
},
{
    question: "How many continents are there in the world?",
    options: ["5", "6", "7", "8"],
    answer: "7"
},
{
    question: "Which is the largest ocean in the world?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: "Pacific"
},
{
    question: "Who discovered gravity?",
    options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Marie Curie"],
    answer: "Isaac Newton"
},
{
    question: "Which vitamin is produced when a person is exposed to sunlight?",
    options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
    answer: "Vitamin D"
},
{
    question: "What is the square root of 64?",
    options: ["6", "7", "8", "9"],
    answer: "8"
},
{
    question: "Which is the most spoken language in the world?",
    options: ["English", "Hindi", "Mandarin", "Spanish"],
    answer: "Mandarin"
},
{
    question: "Who was the first man to walk on the Moon?",
    options: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "John Glenn"],
    answer: "Neil Armstrong"
},
{
    question: "Which is the fastest land animal?",
    options: ["Lion", "Tiger", "Cheetah", "Leopard"],
    answer: "Cheetah"
},
{
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Gd", "Go"],
    answer: "Au"
},
{
    question: "Who painted the Mona Lisa?",
    options: ["Vincent Van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
    answer: "Leonardo da Vinci"
},
{
    question: "Which country won the FIFA World Cup in 2018?",
    options: ["Brazil", "Germany", "France", "Croatia"],
    answer: "France"
},
{
    question: "What is the national animal of India?",
    options: ["Lion", "Tiger", "Elephant", "Leopard"],
    answer: "Tiger"
} ];


function getRandomQuestions() {
    const selected = new Set();
    while (selected.size < 5) {
        const index = Math.floor(Math.random() * question_bank.length);
        selected.add(question_bank[index]);
    }
    return [...selected];
}

const selectedQuestions = getRandomQuestions();


function lockQuiz() {
    const inputs = document.querySelectorAll("#quizForm input[type='radio']");
    inputs.forEach(input => input.disabled = true);

    const submitBtn = document.querySelector("#quizForm button[type='submit']");
    if (submitBtn) submitBtn.disabled = true;
}

selectedQuestions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";

    const questionHeader = document.createElement("h3");
    questionHeader.textContent = `${index + 1}. ${q.question}`;
    questionDiv.appendChild(questionHeader);

    q.options.forEach(opt => {
        const label = document.createElement("label");
        label.style.display = "block";
        const input = document.createElement("input");
        input.type = "radio";
        input.name = `${index}`;
        input.value = opt;
        label.appendChild(input);
        label.appendChild(document.createTextNode(" " + opt));
        questionDiv.appendChild(label);
    });

    const quizForm = document.getElementById("quizForm");
    quizForm.insertBefore(questionDiv, quizForm.lastElementChild);
});


let timeLeft = 20;
const timerElement = document.getElementById("timer");

let minutes = Math.floor(timeLeft / 60);
let seconds = timeLeft % 60;
timerElement.textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

const timerInterval = setInterval(() => {
    timeLeft--;

    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerElement.textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        alert("Time's up! Submitting your quiz.");
        document.getElementById("quizForm").requestSubmit();
        lockQuiz();
    }
}, 1000);




document.getElementById("quizForm").addEventListener("submit", (event) => {
    event.preventDefault();
    let score = 0;

    const formData = new FormData(event.target);

    for (let [name, userAnswer] of formData.entries()) {
        const questionIndex = parseInt(name);
        const correctAnswer = selectedQuestions[questionIndex].answer;
        if (userAnswer === correctAnswer) {
            score++;
        }
    }

    const result = document.getElementById("result");
    result.textContent = `You scored ${score} out of ${selectedQuestions.length}! 🎯`;

    if (score >= 4) result.style.color = "green";
    else if (score >= 2) result.style.color = "#f39c12";
    else result.style.color = "red";

    clearInterval(timerInterval);
    lockQuiz();
});
