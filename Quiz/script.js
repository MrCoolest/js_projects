const date = new Date();
const QuizData = [
     {
          questions: "How old is Salman Khan?",
          a: '52',
          b: '55',
          c: '50',
          d: '110',
          correct: 'b'
     },
     {
          questions: "How many siblings does salman khan have?",
          a: '3',
          b: '2',
          c: '4',
          d: '5',
          correct: 'c'
     },
     {
          questions: "Who is the current President of India",
          a: 'Ram Nath Kovind',
          b: 'Narendar Modi',
          c: 'Pranab Mukherjee',
          d: 'Rajendra Prasad',
          correct: 'a'
     },
     {
          questions: "Who is the current Prime Minister of India",
          a: 'Ram Nath Kovind',
          b: 'Narendar Modi',
          c: 'Pranab Mukherjee',
          d: 'Rajendra Prasad',
          correct: 'b'
     },
     {
          questions: "Who is the first President of India",
          a: 'Ram Nath Kovind',
          b: 'Narendar Modi',
          c: 'Pranab Mukherjee',
          d: 'Rajendra Prasad',
          correct: 'd'
     },
     {
          questions: "Who is the First Prime Minister of India",
          a: 'Ram Nath Kovind',
          b: 'Narendar Modi',
          c: 'Jawaharlal Nehru',
          d: 'Rajendra Prasad',
          correct: 'c'
     },
     {
          questions: "Python  Version 3 was Launch in?",
          a: 'Dec 3 2008',
          b: 'Apr 12 2002',
          c: 'Jan 5 2001',
          d: 'Sep 6 2005',
          correct: 'a'
     },
     {
          questions: "Which one is the first search engine in internet",
          a: 'Google',
          b: 'Archie',
          c: 'Altavista',
          d: 'WAIS',
          correct: 'b'
     },
     {
          questions: "Number of bit used by the IPv6 address",
          a: '32 bit',
          b: '64 bit',
          c: '128 bit',
          d: '256 bit',
          correct: 'c'
     },
     {
          questions: "Which one is the first web browser invented in 1990",
          a: 'Internet Explorer',
          b: 'Mosaic',
          c: 'Mozilla',
          d: 'Nexus',
          correct: 'c'
     },

]

let currentQuiz = 0;

let score = 0;
const answerElm = document.querySelectorAll('.answer');
const question = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const btn_submit = document.getElementById('submit');


loadquiz();

function loadquiz() {
     answerElm.forEach((ans) => {
          ans.checked = false;
     });
     const currentQuestion = QuizData[currentQuiz];
     question.innerHTML = currentQuestion.questions;
     a_text.innerHTML = currentQuestion.a
     b_text.innerHTML = currentQuestion.b
     c_text.innerHTML = currentQuestion.c
     d_text.innerHTML = currentQuestion.d

}



function getAnswer() {
     let answer = undefined;
     answerElm.forEach((ans) => {
          if (ans.checked) {
               answer = ans.id;
          }
     });

     return answer;
}

btn_submit.addEventListener('click', () => {
     const answer = getAnswer();
     //     console.log(answer)
     if (answer) {

          if (currentQuiz < QuizData.length && answer == QuizData[currentQuiz].correct) {
               score++;
          }

          currentQuiz++;
          currentQuiz < QuizData.length ? loadquiz() : document.querySelector('.quiz-container').innerHTML = `<h2>Total Correct anwer is ${score}/${QuizData.length}</h2> <button onclick="location.reload();">Reload</button>`;
     } else {
          alert('Please check any option');
     }


})

// console.log(currentquiz)