$(document).ready(function(){
  "use strict";
  /*============================================================================
  VARIABLES
  ============================================================================*/
  let Minute = 3;
  let Second = 0;
  const QuizTracker = {
    questionId : 0,
    questionNumber : 0,
    totalQuestion : 0,
    answers : [],
    correctAnswers : [],
    score : 0,
    answered : false,
  }

  /*============================================================================
  FUNCTIONS
  ============================================================================*/
  const Render = (msg) => {
    const main = $('#main-content');
    main.css('display', 'none');
    main.html(msg);
    main.fadeIn('slow');
  }

  const showNavbar = (style) => {
    $('#navbar').css('display', style);
  }

  const renderHeader = (msg) => {
    if(!msg){
      $('#header').html("");
    } else {
      $('#header').html(msg);
    }
  }

  const displayError = (el, msg) => {
    el.addClass('alert alert-danger');
    el.html(msg);
  }

  const renderSignIn = () => {
    const form = `
    <div class="row justify-content-center">
      <div class="col-9">
        <h3>Sign in to continue</h3>
        <form id="signInForm">
          <div class="form-group">
            <label for="username">User Name</label>
            <input type="email" class="form-control" id="username" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" required>
          </div>
          <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Remember me</label>
          </div>
          <button type="button" class="btn btn-primary signInButton"><i class="fas fa-sign-in-alt"></i> Sign in</button> <br>
          <small>Don't have an account yet? <a class="newAccountRedirect" href="javascript:void(0);">register </a>here</small>
        </form>
      </div>
      <div id="form-feedback" class="col-9 text-center mx-4 my-2">
      </div>
    </div>`;
    showNavbar('none');
    Render(form);
  }

  const renderSignUp = () => {
    const form = `
    <div class="row justify-content-center">
      <div class="col-9">
        <h3>Create a new account</h3>
        <form id="signUpForm">
          <div class="form-group">
            <label for="username">User name</label>
            <input type="email" class="form-control" id="username">
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password">
          </div>

          <div class="form-group">
            <label for="password2">Verify password</label>
            <input type="password" class="form-control" id="password2">
          </div>

          <button type="button" class="btn btn-warning newAccountButton"><i class="fas fa-user-plus"></i> Sign Up</button> <br>
          <small>Have an account already? <a class="signInRedirect" href="javascript:void(0);">login  </a>here.</small>
        </form>
      </div>
      <div id="form-feedback" class="col-9 text-center mx-4 my-2">

      </div>
    </div>`;
    showNavbar('none');
    Render(form);
  }

  const renderQuestionList = () => {
    let questionList = '<ul class="list-group">';
    for(let i=0; i<QuestionList.length; i++){
      const {id, totalQuestion, title} = QuestionList[i];
      questionList += `
        <li
          data-id=${id}
          class="list-group-item question-list-item">
          ${title}
        </li>`;
    }
    questionList += '</ul>';
    Render(questionList);
  }

  /*
    currently there are two types of questions, multiple choice and correcting
    mistakes, (of course there will be third, fourth and so forth types of
    questions, but those two will be the focus at the time of writing this.)
    we recognized those two types based on their questionType property, 'mc'
    for multiple choice, and 'cm', for mistake correction.
      a. Multiple choice question,
        for this type we simply show the question, then loop through the answers
        and display them in the following way.
      b. Mistake correction,
        this second type has quite complex question and answer management and
        organization. It is basically the same multiple choice, but instead of
        displaying the question and choice of answers, we put them in single sentence.
  */
  const renderQuestion = (q = QuizTracker.questionId, n = QuizTracker.questionNumber) => {
    const {questionType, question, answer} = Questions[q][n];
    const header = `<p class="font-weight-bold">${QuestionList[q].title}</p>`;
    let Question = '';
    if(questionType==='mc'){
      Question += `
        <p>Question ${n+1} of ${QuizTracker.totalQuestion}</p>
        <p>${question}</p>`;
      for(let letter in answer){
        Question +=
          `<div class="form-check">
            <input
              data-answer="${letter}"
              data-number="${n}"
              class="form-check-input"
              type="radio"
              name="answer${n}"
              id="answer${n}${letter}"
              value="${letter}"
              ${QuizTracker.answers[n]===letter?'checked':''}>
            <label
              data-answer="${letter}"
              data-number="${n}"
              class="form-check-label"
              for="answer${n}${letter}">
              ${letter}. ${answer[letter]}
            </label>
          </div>`;
      }
    } else {
      const Q = question;
      const A = answer;
      Question += `
      <p>Question ${n+1} of ${QuizTracker.totalQuestion}</p>`;
      for(let i=0; i<Q.length; i++){
        if(Q[i]==='_a'||Q[i]==='_b'||Q[i]==='_c'||Q[i]==='_d'){
          const letter = Q[i].replace('_','');
          Question += `
            <input
              class="cm"
              data-answer="${letter}"
              data-number="${n}"
              type="radio"
              name="answer${n}"
              id="answer${n}${Q[i]}"
              value="${letter}">
            <label
              class="cm-label ${QuizTracker.answers[n]===letter?'selected':''}"
              data-number="${n}"
              data-answer="${letter}"
              for="answer${n}${Q[i]}"> ${A[Q[i]]} </label> `;
        } else {
          Question += ` ${Q[i]} `;
        }
      }
    }
      Question +=
        `<div class="container d-flex justify-content-center mt-3">`;
        if(n===0){
          Question +=`
          <button class="btn btn-outline-danger btn-prev mx-2" disabled>
            <i class="fas fa-angle-double-left fa-fw"></i>
            Prev
          </button>
            <button data-number="${n+1}" class="btn btn-outline-success btn-next mx-2">
              Next
              <i class="fas fa-angle-double-right fa-fw"></i>
            </button>`;
        } else if(n===QuizTracker.totalQuestion-1){
          Question +=`
            <button data-number="${n-1}" class="btn btn-outline-danger btn-prev mx-2">
              <i class="fas fa-angle-double-left fa-fw"></i>
              Prev
            </button>
            <button class="btn btn-outline-info btn-answer">
              <i class="fas fa-check"></i>
              Submit
            </button>`;
        } else {
          Question +=`
            <button data-number="${n-1}" class="btn btn-outline-danger btn-prev mx-2">
              <i class="fas fa-angle-double-left fa-fw"></i>
              Prev
            </button>
            <button data-number="${n+1}" class="btn btn-outline-success btn-next mx-2">
              Next
              <i class="fas fa-angle-double-right fa-fw"></i>
            </button>`;
        }

        Question +=`</div>`;
    renderHeader(header);
    Render(Question);
  }

  const renderIndicator = () => {
    const totalQuestion = QuizTracker.totalQuestion;
    let indicator = '';
    for(let i=0; i<totalQuestion; i++){
      indicator += `
      <li
        data-number="${i}"
        class="list-group-item indicator-item">
        ${i+1}
      </li>`;
    }
    $('#indicator').html(indicator);
  }

  const showTime = () => {
    if(Second === 0 && Minute > 0){
      Second = 59;
      Minute--;
    } else if(Second === 0 && Minute === 0){
      stopTimer();
      renderScore();
    } else {
      Second--;
    }
    $('#timer').css('display', 'block');
    $('#timer').html(`${Minute<10?'0'+Minute:Minute} : ${Second<10?'0'+Second:Second}`);
  }

  let startTimer;

  const stopTimer = () => {
    clearInterval(startTimer);
  }

  const handleAnswer = (n, answer) => {
    const ind = $('#indicator').find(`li[data-number=${n}]`);
    QuizTracker.answers[n] = answer;
    ind.addClass('answered');
  }

  const renderScore = () => {
    let score = 0;
    const userAnswers = QuizTracker.answers;
    const correctAnswers = QuizTracker.correctAnswers;
    for(let i=0; i<correctAnswers.length; i++){
      if(correctAnswers[i]===userAnswers[i]){
        score++;
      }
    }
    const totalQuestion = QuizTracker.totalQuestion;
    const Score = `<h3>You correctly answered ${score} out of ${totalQuestion} question!</h3>`;
    Render(Score);
    $('#indicator').css('display', 'none');
  }

  /*============================================================================
  EVENT HANDLERS
  ============================================================================*/

  // SUBMIT SIGN IN
  $('#main-content').on('click', '.signInButton', function(){
    const username = $('#username').val();
    const password = $('#password').val();
    if(!username||!password){
      displayError($('#form-feedback'), 'Please fill out all required fields!');
    } else {
      if(username.toLowerCase()!==localStorage.getItem('username').toLowerCase()){
        displayError($('#form-feedback'), 'User not found!');
      } else {
        if(password!==localStorage.getItem('password')){
          displayError($('#form-feedback'), 'Please enter the correct password!');
        } else {
          localStorage.setItem('isSignIn', 'true');
          renderQuestionList();
          showNavbar('block');
        }
      }
    }
  });

  // SIGN OUT
  $('#signOut').on('click', function(){
    localStorage.setItem('isSignIn', 'false');
    renderSignIn();
    renderHeader(null);
  });

  // NEW ACCOUNT LINK
  $('#main-content').on('click', '.newAccountRedirect', function(){
    renderSignUp();
  });

  // SUBMIT REGISTER
  $('#main-content').on('click', '.newAccountButton', function(){
    const username = $('#username').val();
    const password = $('#password').val();
    const password2 = $('#password2').val();
    if(!username||!password){
      displayError($('#form-feedback'), 'Please fill out all required fields!');
    } else {
      if(password!==password2){
        displayError($('#form-feedback'), 'Passwords don\'t match!');
      } else {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        renderSignIn();
      }
    }
  });

  // SIGN IN LINK
  $('#main-content').on('click', '.signInRedirect', function(){
    renderSignIn();
  });

  $('#main-content').on('click', '.question-list-item', function(){
    const id = $(this).data('id');
    QuizTracker.questionId = id;
    QuizTracker.totalQuestion = QuestionList[id].totalQuestion;
    for(let i=0; i<Questions[id].length; i++){
      QuizTracker.correctAnswers.push(Questions[id][i].correctAnswer);
    }
    QuizTracker.answers[QuizTracker.totalQuestion-1] = null;
    renderQuestion();
    renderIndicator();
    startTimer = setInterval(showTime, 1000);;
  });

  $('#indicator').on('click', '.indicator-item', function(){
    const n = $(this).data('number');
    QuizTracker.questionNumber = n;
    renderQuestion();
  });

  $('#main-content').on('click', '.btn-answer', function(){
    // $('#staticBackdrop').modal('show');
    renderScore();
  });

  $('#main-content').on('click', '.cm-label', function(){
    $(this).siblings().removeClass('selected');
    $(this).addClass('selected');
  });

  $('#main-content').on('click', '.btn-next, .btn-prev', function(){
    const n = $(this).data('number');
    QuizTracker.questionNumber = n;
    renderQuestion();
  });

  $('#main-content').on('click', '.form-check-input', '.form-check-label', function(){
    const n = $(this).data('number');
    const answer = $(this).data('answer');
    handleAnswer(n, answer);
  });

  $('#main-content').on('click', '.cm-label', function(){
    const n = $(this).data('number');
    const answer = $(this).data('answer');
    handleAnswer(n, answer);
  });

  /*============================================================================
  KICK 'em UP
  ============================================================================*/
  if(localStorage.getItem('isSignIn')==='true'){
    renderQuestionList();
    showNavbar('block')
  } else {
    renderSignIn();
  }
});
