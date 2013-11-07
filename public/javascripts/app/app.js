$(document).ready(initialize);

function initialize(){
  $(document).foundation();

  $('#loginButton').on('click', clickLogin);
  $('#registerButton').on('click', clickRegister);
  $('#loginForm').on('submit', submitLogin);
  $('#registerForm').on('submit', submitRegister);
  $('#gameForm').on('submit', submitGame);
  $('#game').on('click', '.card:not(.guess, .correct)', clickCard);
}

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//----------AJAX-FUNCTIONS-----------------------------------------------------


function submitAjaxForm(event, form, fn) {
  var url = $(form).attr('action');
  var data = $(form).serialize();

  var options = {};
  options.url = url;
  options.type = 'POST';
  options.data = data;
  options.success = function(data, status, jqXHR){
    fn(data, form);
  };
  options.error = function(jqXHR, status, error){
    console.log(error);
  };


  $.ajax(options)

  event.preventDefault();
}

function sendGenericAjaxRequest(url, data, verb, altVerb, event, fn, form){
  var options = {};
  options.url = url;
  options.type = verb;
  options.data = data;
  options.success = function(data, status, jqXHR){
    fn(data, form);
  };
  options.error = function(jqXHR, status, error){console.log(error);};

  if(altVerb) options.data._method = altVerb;
  $.ajax(options);
  if(event) event.preventDefault();
}

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//----------HANDLERS-----------------------------------------------------------

function clickLogin(event) {
  hideParentRow(this);
  showParentRow('#loginForm');
}
function clickRegister(event) {
  hideParentRow(this);
  showParentRow('#registerForm');
}

function submitLogin(event) {
  submitAjaxForm(event, this, showGameForm);
  hideParentRow(this);
}

function submitRegister(event) {
  submitAjaxForm(event, this, showGameForm);
}

function submitGame(event) {
  submitAjaxForm(event, this, startGame);
}

function clickCard(event) {
  var index = $(this).data('position');
  sendGenericAjaxRequest('/' + index, {}, 'POST', null, null, receiveCard, this);
}

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//----------VIEW-FUNCTIONS-----------------------------------------------------

function hideParentRow(element) {
  $(element).closest('.row').hide();
}

function showParentRow(element) {
  $(element).closest('.row').fadeIn();
}

function showGameForm(data, form) {
  hideParentRow(form);
  $('#gameForm input[name=player]').value(data._id);
  showParentRow('#gameForm');
}

function receiveCard(data, card) {
  if ($('.guesses').length == 1) {
    //second guess, flip card and check for match
    $(card).addClass('guess').text(data.number);
  } else {
    // either very first guess or first guess on new set
    // remove text from guesses, hide all guessed cards, flip new card
    $('.guess:not(correct)').text('');
    $('.card').removeClass('guess');
    $(card).addClass('guess').text(data.number);
  }
}

function populateCards(squares) {
  for (var i = 0; i < squares; i++) {
    $('#game').append($('<div>').addClass('card').data('position', i));
  }
}