

$(function () {
  //storing the user response in an array
  var userResponse = [];
  var $list = $('#choices');
  var $title = $('h1');
  var $description = $('p');
  var current_id = null;
  var currentQuestion = null;
  var renderList = function (items) {
    currentQuestion = items;
    var title = items.question;


    $title.text(title);
    $list.empty();


      for (var i = 0; i < items.answers.length; i++) {
        var item = items.answers[i];
        $list.append('<li class="liContainer"><div class="answerImage"><img data-choice="' 
        +i  
        + '" src=' + item.image + 
        '></div> <div class="resultDescriptionContainer"><button class="resultDescription">' 
        + item.value + 
        '</button>'+
        addDetailDescription(item)+
        '</div></li>');
      }
    
  };

  function addDetailDescription(item){
    if(item.description == null)
    {
     return "";
    }
    else{
      return '<div class="outerspace"><div class="content"><span class="detailDescription">'+item.description+'</span></div></div>';
    }
  }

  var renderResults = function (userResponse, ) {
    $('.resultForm').show();
  }
  var _doInitial = function () {
    //renderList(getQuizData());
    
  };

  $(document).on('click', 'li', function (e) {
    e.preventDefault();
    var choiceId = $(this).find('img').data('choice');
    current_id = selectAnswer(choiceId);
  });

  $('.restartQuiz').on('click', function (e) {
    $('.resultForm').hide();
    _doInitial();
  });

  $('#back').on('click', function (e) {
    e.preventDefault();
    if (!current_id) return false;

    var parents = tree.getParents(current_id);
    $('.resultForm').hide();
    if (parents.length > 0) {
      var prev_node = parents.pop();
      userResponse.pop(prev_node.id);
      console.log(userResponse);
      current_id = prev_node.id;
      if (current_id.includes('a_')) {
        prev_node = parents.pop();
      }
      renderList(tree.getChildren(prev_node.id));
    } else {
      _doInitial();
    }
  });

  function selectAnswer(choiceId) {
    var answer = currentQuestion.answers[choiceId];
    userResponse.push(answer.value);
    renderList(answer.next);
    updateProgressBar();
    return current_id;
  }

  function updateProgressBar() {
    var number = userResponse.length + 1;
    $("#currentNumber").text(number);
    $(".progressTick").each(function (index) {
      if (index < number) {
        $(this).addClass("active");
      }
      else {
        $(this).removeClass("active");
      }
    });
  }

  window.onload = function () {
   //selectAnswer(0);
   renderList(getQuizData());
   $(window).trigger("resize");
  }


  _doInitial();


});


