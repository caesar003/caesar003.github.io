$(document).ready(function(){
  "use strict";
  /*============================================================================
  VARIABLES
  ============================================================================*/

  const QuizTracker = {
    questionId : 0,
    questionNumber : 0,
    totalQuestion : 0,
    answers : [],
    correctAnswers : [],
    score : 0,
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
    let Question = '';
    if(questionType==='mc'){
      Question += `
        <p class="font-weight-bold">${QuestionList[q].title}</p>
        <p>Question ${n+1} of ${QuizTracker.totalQuestion}</p>
        <p>${question}</p>`;
      for(let letter in answer){
        Question +=
          `<div class="form-check">
            <input class="form-check-input" type="radio" name="answer${n}" id="answer${n}${letter}" value="${letter}">
            <label class="form-check-label" for="answer${n}${letter}">
              ${letter}. ${answer[letter]}
            </label>
          </div>`;
      }
    } else {
      const Q = question;
      const A = answer;
      Question += `<p class="font-weight-bold">${QuestionList[q].title}</p>
      <p>Question ${n+1} of ${QuizTracker.totalQuestion}</p>`;
      for(let i=0; i<Q.length; i++){
        if(Q[i]==='_a'||Q[i]==='_b'||Q[i]==='_c'||Q[i]==='_d'){
          Question += `
            <input
              class="cm"
              type="radio"
              name="answer${n}"
              id="answer${n}${Q[i]}"
              value="${Q[i].replace('_','')}">
            <label
              class="cm-label"
              for="answer${n}${Q[i]}"> ${A[Q[i]]} </label> `;
        } else {
          Question += ` ${Q[i]} `;
        }
      }
    }
      Question +=
        `<div class="container d-flex justify-content-center mt-3">
          <button class="btn btn-outline-info btn-answer">
            <i class="fas fa-check"></i>
            Submit
          </button>
        </div>`;
    Render(Question);
  }

  const renderScore = () => {
    const score = QuizTracker.score;
    const totalQuestion = QuizTracker.totalQuestion;
    const Score = `<h3>You correctly answered ${score} out of ${totalQuestion} question!</h3>`;
    $('#main-content').css('display', 'none');
    $('#main-content').html(Score);
    $('#main-content').fadeIn('fast');
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
    renderQuestion();
  });

  $('#main-content').on('click', '.btn-answer', function(){
    const answer = $('input:checked').val();
    const questionNumber = QuizTracker.questionNumber;
    QuizTracker.answers.push(answer);
    QuizTracker.questionNumber = questionNumber+1;
    if(answer===QuizTracker.correctAnswers[questionNumber]){
      QuizTracker.score++;
    }
    if(QuizTracker.questionNumber===QuizTracker.totalQuestion){
      renderScore();
    } else {
      renderQuestion();
    }
  });

  $('#main-content').on('click', '.cm-label', function(){
    $(this).siblings().removeClass('selected');
    $(this).addClass('selected');
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
