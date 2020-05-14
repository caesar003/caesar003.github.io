$(document).ready(function(){
  "use strict";
  /*=======================================================
  VARIABLES
  ========================================================*/

  const QuestionList = [
    {
      id : 0,
      totalQuestion : 40,
      title : "Stucture A",
    },
    // {
    //   id : 1,
    //   totalQuestion : 2,
    //   title : "Question 2",
    // },
  ];
  const Questions = [
    [
      { // 1
        questionType :"mc",
        question : "In 1879, _______, Alice Freeman Palmer became head of the history department at Wellesley College.",
        answer : {
          a: "twenty-four years",
          b: "at the age of twenty four",
          c: "age twenty-four",
          d: "of twenty-four years",
        },
        correctAnswer:"b",
      },
      { // 2
        questionType :"mc",
        question : "United States spends more money on advertising ______ country in the world.",
        answer : {
          a: "other",
          b: "other than",
          c: "than any other",
          d: "while other",
        },
        correctAnswer:"c",
      },
      { // 3
        questionType :"mc",
        question : "Penicillin, probably _____, came into widespread use after the Second World War.",
        answer : {
          a: "an antibiotic of known",
          b: "was known the antibiotic",
          c: "the best-known antibiotic",
          d: "known best antibiotic",
        },
        correctAnswer:"c",
      },
      { // 4
        questionType :"mc",
        question : "Although Emily Dickinson is now a well-known American poet, only seven of her poems _____ while she was alive.",
        answer : {
          a : "publishing",
          b : "to publish",
          c : "have published",
          d : "were published",
        },
        correctAnswer:"d"
      },
      { // 5
        questionType :"mc",
        question : "Thomas Jefferson served as president of American Philoshopical Society, an organization that encouraged ______ of scientific and intellectual research.",
        answer : {
          a : "ranging wide",
          b : "a wide range",
          c : "which ranged widely",
          d : "a widely ranging",
        },
        correctAnswer:"b"
      },
      { // 6
        questionType :"mc",
        question : "Part of the Great Plains, Kansas is famous for ______ fields of wheat.",
        answer : {
          a : "its seemingly endless",
          b : "it seems endless",
          c : "it is seemingly endless",
          d : "it is endless it seems",
        },
        correctAnswer:"a"
      },
      { // 7
        questionType :"mc",
        question : "Skimming along the surface of the ocean or rising from its depths like delicate balloons, _______ to their aquatic habitat.",
        answer : {
          a : "the perfect adaptation of jellyfish",
          b : "jellyfish are perfectly adapted",
          c : "jellyfish are adapted to perfectly",
          d : "and the adaptation is perfect for jellyfish",
        },
        correctAnswer:"b"
      },
      { // 8
        questionType :"mc",
        question : "The sidereal day is the period ______ the Earth completes one rotation on its axis",
        answer : {
          a : "when does it",
          b : "while it",
          c : "during which",
          d : "in that",
        },
        correctAnswer:"c"
      },
      { // 9
        questionType :"mc",
        question : "______ rainfall in the desert is low, it is one of the most important climatic factors in the formation of desert erosion features.",
        answer : {
          a : "Although",
          b : "Why",
          c : "Despite",
          d : "Due to",
        },
        correctAnswer:"a"
      },
      { // 10
        questionType :"mc",
        question : "A strong swimmer, ______.",
        answer : {
          a : "that fish and seal are eaten chiefly by the polar bear",
          b : "the polar bear eats chiefly fish and seal",
          c : "the polar bear eating chiefly fish and seal",
          d : "eating fish and seal chiefly by the polar bear",
        },
        correctAnswer:"b"
      },
      { // 11
        questionType :"mc",
        question : "Helicopters can rise or descend vertically, hover, and move forward, backward, ______.",
        answer : {
          a : "they move laterally",
          b : "and are lateral",
          c : "or lateral motion",
          d : "or laterally",
        },
        correctAnswer:"d"
      },
      { // 12
        questionType :"mc",
        question : "The Dallas Theater Center presents plays in two buildings, ______, was designed by the internationally renowned architect, Frank Lloyd Wright.",
        answer : {
          a : "which",
          b : "which one",
          c : "that which",
          d : "one of which",
        },
        correctAnswer:"d"
      },
      { // 13
        questionType :"mc",
        question : "______ stem from the everyday life of common people, the most popular themes are love, jealousy, revenge, disaster, and adventure.",
        answer : {
          a : "Because folk ballads",
          b : "There are folk ballads",
          d : "With folk ballads",
          e : "Folk ballads to",
        },
        correctAnswer:"a"
      },
      { // 14
        questionType :"mc",
        question : "______ around us gives us vital information about our environment.",
        answer : {
          a : "The sounds are heard",
          b : "That the hearing of sounds",
          d : "Hearing the sounds",
          e : "Whatever the sounds are heard",
        },
        correctAnswer:"c"
      },
      { // 15
        questionType :"mc",
        question : "Located in Boston, ______ in the United States was founded in 1852.",
        answer : {
          a : "the first public library was free",
          b : "the first free public library",
          d : "was the first free public library",
          e : "where the fist free public library was",
        },
        correctAnswer:"b"
      },
      { // 16
        questionType :"cm",
        question : [
          "A goose's neck is",
          "_a",
          "longer",
          "_b",
          "of a duck",
          "_c",
          "so",
          "_d",
          "curved as a swan's."],
        answer : {
          _a : "a little",
          _b : "that than",
          _c : "and not",
          _d : "gracefully",
        },
        correctAnswer:"b",
      },
      { // 17
        questionType : "cm",
        question : [
          "The introduction",
          "_a",
          "species of plants into the Hawaiian islands",
          "_b",
          "an opportunity to study the",
          "_c",
          "of a natural",
          "_d",
          "to stress."
        ],
        answer : {
          _a : "of new",
          _b : "offers",
          _c : "responsively",
          _d : "system",
        },
        correctAnswer:"c",
      },
      { // 18
        questionType : "cm",
        question : [
          "_a",
          "1939, television",
          "_b",
          "were being broadcast in the United States",
          "_c",
          "the World's Fair of that year",
          "_d",
          "demonstrations of this advance in technology."
        ],
        answer : {
          _a : "At",
          _b : "programs",
          _c : "and",
          _d : "featured",
        },
        correctAnswer:"a",
      },
      { // 19
        questionType : "cm",
        question : [
          "Nathaniel Hawthorne",
          "_a",
          "complained of how",
          "_b",
          "material his life",
          "_c",
          "for his",
          "_d",
          "."],
        answer : {
          _a : "often",
          _b : "few",
          _c : "provided",
          _d : "fiction",
        },
        correctAnswer:"b",
      },
      { // 20
        questionType : "cm",
        question : [
          "The United States capital in Washington, D.C., developed",
          "_a",
          "_b",
          "its",
          "_c",
          "gracious aspect, with",
          "_d",
          "avenues and many parks, only in the twentieth century."],
        answer : {
          _a : "slow,",
          _b : "assuming",
          _c : "present",
          _d : "wide",
        },
        correctAnswer:"a",
      },
      { // 21
        questionType : "cm",
        question : ["Soapberry trees and shrubs",
         "_a",
         "in tropical",
         "_b",
         "and",
         "_c",
         "ornamental plants in California",
         "_d",
         "Florida."],
        answer : {
          _a : "thrive",
          _b : "regions,",
          _c : "being",
          _d : "and",
        },
        correctAnswer:"c",
      },
      { // 22
        questionType : "cm",
        question : [
          "Throughout her",
          "_a",
          "career, Grace Paley has been known for her",
          "_b",
          "to capture the",
          "_c",
          "rhythms of New York",
          "_d",
          "in her short stories."],
        answer : {
          _a : "length",
          _b : "ability",
          _c : "distinct",
          _d : "speech",
        },
        correctAnswer:"a",
      },
      { // 23
        questionType : "cm",
        question : [
          "Scientists usually",
          "_a",
          "the disease leukemia",
          "_b",
          "an",
          "_c",
          "of white blood cells",
          "_d",
          "."],
        answer : {
          _a : "character",
          _b : "as",
          _c : "overabundance",
          _d : "in the bloodstream",
        },
        correctAnswer:"a",
      },
      { // 24
        questionType : "cm",
        question : [
          "Energy research",
          "_a",
          "tourism, and copper and molybdenum",
          "_b",
          "are important",
          "_c",
          "the",
          "_d",
          "of Butte, Montana."],
        answer : {
          _a : "medicinal",
          _b : "mining",
          _c : "to",
          _d : "economy",
        },
        correctAnswer:"a",
      },
      { // 25
        questionType : "cm",
        question : [
          "The New Deal",
          "_a",
          "President Franklin D. Roosevelt's",
          "_b",
          "_c",
          "the United States",
          "_d",
          "Great Depression in the 1930's."],
        answer : {
          _a : "was",
          _b : "program",
          _c : "to pull",
          _d : "out the",
        },
        correctAnswer:"d",
      },
      { // 26
        questionType : "cm",
        question : [
          "_a",
          "rowing a boat",
          "_b",
          "knows it is much",
          "_c",
          "to go with the wind than",
          "_d",
          "."],
        answer : {
          _a : "Anyone",
          _b : "in a strong wind",
          _c : "easy",
          _d : "against it",
        },
        correctAnswer:"c",
      },
      { // 27
        questionType : "cm",
        question : [
          "_a",
          "the monitoring of earthquake waves",
          "_b",
          "_c",
          "the Earth's outer core is liquid, whereas the inner core is",
          "_d",
          "."],
        answer : {
          _a : "From",
          _b : "it is evidence",
          _c : "that",
          _d : "solid",
        },
        correctAnswer:"b",
      },
      { // 28
        questionType : "cm",
        question : [
          "Dictionaries",
          "_a",
          "explain",
          "_b",
          "of the",
          "_c",
          "word, state its part of speech, and",
          "_d",
          "its correct use."],
        answer : {
          _a : "frequently",
          _b : "the origin",
          _c : "defined",
          _d : "indication",
        },
        correctAnswer:"d",
      },
      { // 29
        questionType : "cm",
        question : [
          "The Caldecott Medal, awarded",
          "_a",
          "to",
          "_b",
          "illustrated children's book,",
          "_c",
          "one award that",
          "_d",
          "excellent books."
        ],
        answer : {
          _a : "annual",
          _b : "the best",
          _c : "is",
          _d : "identifies",
        },
        correctAnswer:"a",
      },
      { // 30
        questionType : "cm",
        question : [
          "_a",
          "the spring the woodcock",
          "_b",
          "a simple",
          "_c",
          "of leaves and grass in a dry, quiet",
          "_d",
          "and lays four multicolored eggs."],
        answer : {
          _a : "In",
          _b : "builds",
          _c : "nest",
          _d : "spots",
        },
        correctAnswer:"d",
      },
      { // 31
        questionType : "cm",
        question : [
          "_a",
          "centuries",
          "_b",
          "spices of the Far East",
          "_c",
          "in",
          "_d",
          "the people of the East and West."],
        answer : {
          _a : "For",
          _b : "the aromatic",
          _c : "has been",
          _d : "demand by",
        },
        correctAnswer:"c",
      },
      { // 32
        questionType : "cm",
        question : [
          "Linseed oil is used as a",
          "_a",
          "oil in",
          "_b",
          "and varnishes and",
          "_c",
          "making linoleum, oilcloth, and",
          "_d",
          "inks."],
        answer : {
          _a : "drying",
          _b : "paints",
          _c : "as",
          _d : "certain",
        },
        correctAnswer:"c",
      },
      { // 33
        questionType : "cm",
        question : [
          "Phoenix, Arizona,",
          "_a",
          "where the Hohokam Indians built",
          "_b",
          "and",
          "_c",
          "irrigated farming",
          "_d",
          "the time of Columbus."],
        answer : {
          _a : "stands",
          _b : "a canal system",
          _c : "carried on",
          _d : "before long",
        },
        correctAnswer:"d",
      },
      { // 34
        questionType : "cm",
        question : [
          "_a",
          "of the rate",
          "_b",
          "a ship is traveling",
          "_c",
          "the water is important if the navigator",
          "_d",
          "estimate the time of arrival."],
        answer : {
          _a : "Knowledge",
          _b : "at which",
          _c : "through",
          _d : "need to",
        },
        correctAnswer:"d",
      },
      { // 35
        questionType : "cm",
        question : [
          "The wood of the tulip tree,",
          "_a",
          "_b",
          "American whitewood, is one of",
          "_c",
          "valuable timber",
          "_d",
          "in the United States."],
        answer : {
          _a : "sometimes",
          _b : "referred to as",
          _c : "the most",
          _d : "product",
        },
        correctAnswer:"d",
      },
      { // 36
        questionType : "cm",
        question : [
          "The foot is used",
          "_a",
          "for",
          "_b",
          "but some primates, notably the apes, also",
          "_c",
          "their feet for",
          "_d",
          "and picking up objects."],
        answer : {
          _a : "primary",
          _b : "locomotion",
          _c : "use",
          _d : "grasping",
        },
        correctAnswer:"a",
      },
      { // 37
        questionType : "cm",
        question : [
          "Although",
          "_a",
          "for",
          "_b",
          "prose works, Maya Angelou",
          "_c",
          "published several collections of",
          "_d",
          "."],
        answer : {
          _a : "best known",
          _b : "her",
          _c : "was also",
          _d : "poetry",
        },
        correctAnswer:"c",
      },
      { // 38
        questionType : "cm",
        question : [
          "_a",
          "the Spanish",
          "_b",
          "Yerba Buena in 1835, what is now San Francisco",
          "_c",
          "over by the United States in 1846 and later",
          "_d",
          "."],
        answer : {
          _a : "Founded by",
          _b : "as",
          _c : "was taken",
          _d : "renamed it",
        },
        correctAnswer:"d",
      },
      { // 39
        questionType : "cm",
        question : [
          "Human hair grows",
          "_a",
          "of",
          "_b",
          "one-half",
          "_c",
          "one inch",
          "_d",
          "month."
        ],
        answer : {
          _a : "at rate",
          _b : "about",
          _c : "to",
          _d : "a",
        },
        correctAnswer:"a",
      },
      { // 40
        questionType : "cm",
        question : [
          "_a",
          "of heavy-textured clay",
          "_b",
          "adobe",
          "_c",
          "great elasticity when moist, but when dry is able",
          "_d",
          "its shape."],
        answer : {
          _a : "Composed",
          _b : "soil",
          _c : "has",
          _d : "of holding",
        },
        correctAnswer:"d",
      },
    ],
    [
      { // 16
        questionType :"cm",
        question : [
          "A goose's neck is",
          "_a",
          "longer",
          "_b",
          "of a duck",
          "_c",
          "so",
          "_d",
          "curved as a swan's."],
        answer : {
          _a : "a little",
          _b : "that than",
          _c : "and not",
          _d : "gracefully",
        },
        correctAnswer:"b",
      },
      { // 17
        questionType : "cm",
        question : [
          "The introduction",
          "_a",
          "species of plants into the Hawaiian islands",
          "_b",
          "an opportunity to study the",
          "_c",
          "of a natural",
          "_d",
          "to stress."
        ],
        answer : {
          _a : "of new",
          _b : "offers",
          _c : "responsively",
          _d : "system",
        },
        correctAnswer:"c",
      },
    ],
  ];

  const QuizTracker = {
    questionId : 0,
    questionNumber : 0,
    totalQuestion : 0,
    answers : [],
    correctAnswers : [],
    score : 0,
  }

  /*=======================================================
  FUNCTIONS
  ========================================================*/

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
    $('#main-content').css('display', 'none');
    $('#main-content').html(form);
    $('#main-content').fadeIn('fast');
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
    $('#main-content').css('display', 'none');
    $('#main-content').html(form);
    $('#main-content').fadeIn('fast');
  }

  const renderQuestionList = () => {
    let questionList = '<ul class="list-group">';
    for(let i=0; i<QuestionList.length; i++){
      const {id, totalQuestion, title} = QuestionList[i];
      questionList += `<li data-id=${id} class="list-group-item question-list-item">${title}</li>`;
    }
    questionList += '</ul>';
    $('#main-content').css('display', 'none');
    $('#main-content').html(questionList);
    $('#main-content').fadeIn('fast');
  }

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
          <button class="btn btn-outline-info btn-answer"><i class="fas fa-check"></i> Submit</button>
        </div>`;
    $('#main-content').css('display', 'none');
    $('#main-content').html(Question);
    $('#main-content').fadeIn('fast');
  }

  const renderScore = () => {
    const score = QuizTracker.score;
    const totalQuestion = QuizTracker.totalQuestion;
    const Score = `<h3>You correctly answered ${score} out of ${totalQuestion} question!</h3>`;
    $('#main-content').css('display', 'none');
    $('#main-content').html(Score);
    $('#main-content').fadeIn('fast');
  }

  /*=======================================================
  EVENT HANDLERS
  ========================================================*/

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
      console.log('the answer is correct');
      QuizTracker.score++;
    }
    if(QuizTracker.questionNumber===QuizTracker.totalQuestion){
      renderScore();
    } else {
      renderQuestion();
    }
  });

  $('#main-content').on('click', '.cm-label', function(){
    console.log('clicked');
    $(this).siblings().removeClass('selected');
    $(this).addClass('selected');
  });

  /*=======================================================
  KICK 'em UP
  ========================================================*/
  // renderSignUp();
  if(localStorage.getItem('isSignIn')==='true'){
    renderQuestionList();
    showNavbar('block')
  } else {
    renderSignIn();
  }
  // renderQuestion();
  // renderQuestionList();
});
