/*
    File with the logic behind the game
    Author: Alejandro Meza Tudela
 */


//set start button variable
const startButton = document.getElementById('start-btn')
//set questions container variable
const questionContainerElements = document.getElementById('question-container')
//set question variable
const  questionElement = document.getElementById('question')
//set variables for answer buttons
const answerButtonsElement = document.getElementById('answer-buttons')
//set var for the next button
const nextButton = document.getElementById('next-btn')
//set var for the form
const sendForm = document.getElementById('form-send')
//set bunch of questions for our app
const questions = [
    //q1
    {   question: ' "its not a good day for rain" Who said that? ' ,
        answers:[{text: 'Roy Mustang', correct: true}, {text: 'Sasuke', correct: false}, {text: 'Jogo', correct: false},
            {text: 'Subaru', correct: false},
        ]},
    //q2
    {   question: 'The OP Again is from the anime called: ',
        answers:[{text: 'Black Clover', correct: false}, {text: 'Jujutsu Kaisen', correct: false}, {text: 'FMAB', correct: true},
            {text: 'Fruit Basket', correct: false},
        ]},
    //q3
    {   question: 'I like pizza, however Rize like...',
        answers:[{text: 'Sushi', correct: false}, {text: 'Ramen', correct: false}, {text: 'Also pizza', correct: false},
            {text: 'Kaneki', correct: true},
        ]},
    //q4
    {   question: 'Naruto favourite food is...',
        answers:[{text: 'Ramen', correct: true}, {text: 'Hamburger', correct: false}, {text: 'sushi', correct: false},
            {text: 'tsukemen', correct: false},
        ]},
    //q5
    {   question: '"Everlasting Shine" , the 13th OP from Black Clover is created by...',
        answers:[{text: 'TXT', correct: true}, {text: 'Straykids', correct: false}, {text: 'Ling Tosite Sigure', correct: false},
            {text: 'BTS', correct: false},
        ]},
    //q6
    {   question: 'DBZ start broadcasting in year...',
        answers:[{text: '2000', correct: false}, {text: '1986', correct: true}, {text: '1999', correct: false},
            {text: '2002', correct: false},
        ]},
    //q7
    {   question: 'Who of the following characters have killed more titans? (in the TV show)',
        answers:[{text: 'Levi', correct: false}, {text: 'Eren', correct: false}, {text: 'Reiner', correct: false},
            {text: 'Mikasa', correct: true},
        ]},
    //q8
    {   question: 'Yato is the main character in the anime...',
        answers:[{text: 'Black Clover', correct: false}, {text: 'Noragami', correct: true}, {text: 'Fruit Basket', correct: false},
            {text: 'Hiromiya', correct: false},
        ]}
]

//some random stuff (variables) in order to shuffle the questions
let shuffledQuestions ,currentQuestionIndex
//total number of right answers
let countRightAnswers = 0

//add listener to the buttons
startButton.addEventListener('click', startGame)
//add these listener too, increment by one the index and show the next question if we have one
nextButton.addEventListener('click',()=>{
    currentQuestionIndex++
    setNextQuestion()
} )


function startGame(){
    //at first, when we click the button is OK to hide it
    startButton.classList.add('hide')
    //shuffle the question and obtain them
    shuffledQuestions = questions.sort(()=> Math.random() - .5)
    currentQuestionIndex = 0
    countRightAnswers = 0
    //After star game, remove hide property from the button
    questionContainerElements.classList.remove('hide')
    //show next question
    setNextQuestion()
}

function showQuestion(question){
    //put the question as text
    questionElement.innerText = question.question
    //loop through answers and show them
    question.answers.forEach(answer=>{
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        //check if answer is correct
        if(answer.correct){
            //add some properties to the button if the answer is Ok
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click',selectAnswer)
        //add stuff to the real buttons
        answerButtonsElement.appendChild(button)
    })
    //show current question
    document.getElementById('number-questions').innerHTML = "||" + " " + "Question number:"+ " " + (currentQuestionIndex+1);
}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    //remove all the children
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function setNextQuestion(){
    //reset the previous question
    resetState()
    //show current question
    showQuestion(shuffledQuestions[currentQuestionIndex])
}


function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}


function setStatusClassBody(element, correct){
    clearStatusClass(element)
    //check whether is true or not
    if(correct){
        element.classList.add('correct')
        countRightAnswers+=1
        document.getElementById('right-answers').innerHTML = "Your current score is:"+ " " + countRightAnswers;
    }else{
        element.classList.add('wrong')
        document.getElementById('right-answers').innerHTML = "Your current score is:"+ " " + countRightAnswers;
    }
}


function setStatusClass(element, correct){
    clearStatusClass(element)
    //check whether is true or not
    if(correct){
        element.classList.add('correct')
    }else{
        element.classList.add('wrong')
    }
}


function selectAnswer(e){
    //prevent the fact that the user click multiple answers at the time
    document.getElementById('answer-buttons').classList.add('no-click');
    //target:
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    //console.log(correct) --> debug line
    setStatusClassBody(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button=>{
        setStatusClass(button, button.dataset.correct)
        })
    //if we are not in the last question
    if(shuffledQuestions.length> currentQuestionIndex+1){
        nextButton.classList.remove('hide')
    }else{ //if we are in the last question
        //1)Change text in the button to start another attempt
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
        //2)Give the possibility to send the data
        document.getElementById('number_input').value= countRightAnswers; //assign new value
        sendForm.classList.remove('hide')
    }
}