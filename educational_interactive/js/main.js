$(document).ready(function() {
    $('#pagepiling').pagepiling({
      direction: 'horizontal',
      menu: '#menu',
      anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6'],
      sectionsColor: ['#4B9CD3', '#4B9CD3', '#4B9CD3', '#4B9CD3', '#4B9CD3', '#4B9CD3'],
      navigation: {
        'position': 'right',
        'tooltips': ['Home', 'Name & Title', 'Dates & Time', 'Numbers', 'Punctuation', 'Quiz']
      },
      afterRender: function(){
        $('#pp-nav').addClass('custom');
      },
      afterLoad: function(anchorLink, index){
        if(index>1){
          $('#pp-nav').removeClass('custom');
        }else{
          $('#pp-nav').addClass('custom');
        }
      }
  });
  });

// Quiz help from https://www.sitepoint.com/simple-javascript-quiz/
  (function() {
const myQuestions = [
  {
    question: "Which sentence is incorrect?",
    answers: {
      a: "5 college students protested outside of South Building on Tuesday.",
      b: "She is 5 feet, 6 inches tall.",
      c: "I live about 3 miles from campus."
    },
    correctAnswer: "a"
  },
  {
    question: "What is the correct way to structure a date?",
    answers: {
      a: "September 5 2019",
      b: "Sept. 5 2019",
      c: "Sept. 5, 2019"
    },
    correctAnswer: "c"
  },
  {
    question: "How would you address Donald Trump on second reference?",
    answers: {
      a: "President Trump",
      b: "Mr. Trump",
      c: "Donald",
      d: "A unless your organizations specifies differently"
    },
    correctAnswer: "d"
  }
];


  function buildQuiz() {
    const output = [];
    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answers = [];

      for (letter in currentQuestion.answers) {
        answers.push(
          `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
        );
      }
      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    const answerContainers = quizContainer.querySelectorAll(".answers");
    let numCorrect = 0;
    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      if (userAnswer === currentQuestion.correctAnswer) {
        numCorrect++;
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        answerContainers[questionNumber].style.color = "red";
      }
    });

    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;

    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }

    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
