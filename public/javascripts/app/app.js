$(document).ready(initialize);

function initialize(){
  $(document).foundation();
}



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