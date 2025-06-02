document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-btn');
    const nextButton = document.getElementById('next-btn');
    const restartButton = document.getElementById('restart-btn');
    const questionContainer = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const answerButtons = document.getElementById('answer-buttons');
    const questionCounter = document.getElementById('question-counter');
    const scoreElement = document.getElementById('score');
    const progressBar = document.getElementById('progress');
    const feedbackElement = document.getElementById('feedback');
    
    let shuffledQuestions, currentQuestionIndex, score;
    
    // Quiz questions
    const questions = [
        {
            question: 'What does HTML stand for?',
            answers: [
                { text: 'Hyper Text Markup Language', correct: true },
                { text: 'Hyperlinks and Text Markup Language', correct: false },
                { text: 'Home Tool Markup Language', correct: false },
                { text: 'Hyper Transfer Markup Language', correct: false }
            ]
        },
        {
            question: 'Which of the following is NOT a JavaScript data type?',
            answers: [
                { text: 'Number', correct: false },
                { text: 'String', correct: false },
                { text: 'Boolean', correct: false },
                { text: 'Float', correct: true }
            ]
        },
        {
            question: 'What does CSS stand for?',
            answers: [
                { text: 'Creative Style Sheets', correct: false },
                { text: 'Cascading Style Sheets', correct: true },
                { text: 'Computer Style Sheets', correct: false },
                { text: 'Colorful Style Sheets', correct: false }
            ]
        },
        {
            question: 'Which symbol is used for single-line comments in JavaScript?',
            answers: [
                { text: '//', correct: true },
                { text: '/*', correct: false },
                { text: '<!--', correct: false },
                { text: '#', correct: false }
            ]
        },
        {
            question: 'Which method adds new items to the end of an array?',
            answers: [
                { text: 'push()', correct: true },
                { text: 'pop()', correct: false },
                { text: 'shift()', correct: false },
                { text: 'unshift()', correct: false }
            ]
        }
    ];
    
    // Start the quiz
    startButton.addEventListener('click', startQuiz);
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });
    restartButton.addEventListener('click', startQuiz);
    
    function startQuiz() {
        score = 0;
        currentQuestionIndex = 0;
        shuffledQuestions = questions.sort(() => Math.random() - 0.5);
        questionContainer.classList.remove('hide');
        startButton.classList.add('hide');
        restartButton.classList.add('hide');
        feedbackElement.classList.add('hide');
        scoreElement.textContent = `Score: ${score}`;
        setNextQuestion();
    }
    
    function setNextQuestion() {
        resetState();
        if (currentQuestionIndex < shuffledQuestions.length) {
            showQuestion(shuffledQuestions[currentQuestionIndex]);
            updateProgress();
            questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`;
        } else {
            endQuiz();
        }
    }
    
    function showQuestion(question) {
        questionElement.textContent = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtons.appendChild(button);
        });
    }
    
    function resetState() {
        nextButton.classList.add('hide');
        feedbackElement.classList.add('hide');
        while (answerButtons.firstChild) {
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }
    
    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct === 'true';
        
        if (correct) {
            score++;
            scoreElement.textContent = `Score: ${score}`;
            feedbackElement.textContent = 'Correct!';
            feedbackElement.className = 'feedback correct';
        } else {
            feedbackElement.textContent = 'Incorrect!';
            feedbackElement.className = 'feedback incorrect';
        }
        
        Array.from(answerButtons.children).forEach(button => {
            setStatusClass(button, button.dataset.correct === 'true');
            button.disabled = true;
        });
        
        feedbackElement.classList.remove('hide');
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide');
        } else {
            restartButton.classList.remove('hide');
        }
    }
    
    function setStatusClass(element, correct) {
        if (correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('incorrect');
        }
    }
    
    function updateProgress() {
        const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }
    
    function endQuiz() {
        questionElement.textContent = `Quiz completed! Your score: ${score}/${shuffledQuestions.length}`;
        resetState();
        restartButton.classList.remove('hide');
        progressBar.style.width = '100%';
    }
    
    // Initialize the quiz in a ready state
    resetState();
    startButton.classList.remove('hide');
});