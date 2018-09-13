/**
* Simple decision tree parser and traversal.
* @author njmcode
* @param data - object {
*     initial: [], (list of choice IDs for the root node)
*     choices: {}  (keyed object of all possible choices)
* }
**/
var DecisionTree = function(data) {
 this.initial = data.initial;
 this.choices = data.choices;

 /* Return an array of choice objects for the root of the tree */
 this.getInitial = function() {
   if (!this.initial) throw 'DecisionTree: no initial choice(s) specified';
   return this.getChoices(this.initial);

 };

 /* Get full choice data by specific id */
 this.getChoice = function(id) {
   if (!(id in this.choices)) return false;
   if (!('id' in this.choices[id])) this.choices[id].id = id;
   return this.choices[id];

 };

 /* As above, but passing an array of choice IDs */
 this.getChoices = function(idList) {
   if(!idList) return [];
   var list = [];
   for(var i = 0, ln = idList.length; i < ln; i++) {
     var childChoice = this.getChoice(idList[i]);
     list.push(childChoice);
   }
   return list;

 };

 /* Get an array of choice data for a parent id */
 this.getChildren = function(parentId) {

   if (!(parentId in this.choices)) return false;
   if (!('children' in this.choices[parentId])) return false;

   var childIds = this.choices[parentId].children;
   return this.getChoices(childIds);

 };

 /* Get an array of choice data for the parent(s) of an id */
 this.getParents = function(id) {

   var parents = [];
   var node = this.getChoice(id);

   while(node.parent) {
     node = this.getChoice(node.parent);
     parents.unshift(node);
   }

   return parents;

 };

 /* Get just an array of ids for the parents of a specific id */
 this.getParentIds = function(id) {
   var parents = this.getParents(id);
   var parentIds = [];
   for(var i = 0, ln = parents.length; i < ln; i++) {
     parentIds.push(parents[i].id);
   }
   return parentIds;
 };

 /* Get the 'name' prop for the parent of an id */
 this.getParentName = function(id) {
   var parent = this.getParents(id).pop();
   if(!parent) {
     return false;
   } else {
     return parent.name;
   }
 };

  /* Get the 'name' prop for the parent of an id */
  this.getParentId = function(id) {
    var parent = this.getParents(id).pop();
    if(!parent) {
      return false;
    } else {
      return parent.id;
    }
  };

 /* Init - insert ids into choice objects, check dups, associate parents, etc */
 this.init = function() {

   var idList = [];
   for(var k in this.choices) {
  //   if(idList.indexOf(k) !== -1) throw 'DecisionTree: duplicate ID "' + k + '" in choice set';

     var choice = this.getChoice(k);
     choice.id = k;

     var children = this.getChildren(k);
     for(var i = 0; i < children.length; i++) {

       var child = children[i];
    //   if(child.parent) throw 'DecisionTree: tried to assign parent "' + k + '" to child "' + choice.children[i] + '" which already has parent "' + child.parent + '"';
       child.parent = k;

     }
   }
   console.log('init', this.initial, this.choices);

 };

 this.init();

};


/*** TEST DATA ***/

var data = {
 initial: ["a_him"],
 //initial: ["a_myself", "a_him", "a_her", "a_coworker", "a_elephant"],
 "choices": {
   "q_who": {
     "name": "Who are you shopping for?",
    // "children": ["a_myself", "a_him", "a_her", "a_coworker", "a_elephant"]
     "children": ["a_him"]
   },
   "a_myself": {
     "name": "Myself",
     "img": "randomwine.png",
     "children": ["q_interests_self"]
   },
   "a_him": {
     "name": "Him",
     "img": "randomwine.png",
     "children": ["q_interests_him"]
   },
   "a_her": {
     "name": "For Her",
     "img": "randomwine.png",
     "children": ["q_interests_her"]
   },
   "a_coworker": {
     "name": "Coworker",
     "img": "randomwine.png",
     "children": ["q_interests_their"]
   },
   "a_elephant": {
     "name": "White Elephant",
     "img": "randomwine.png",
     "children": ["q_gift_type"]
   },
   "q_interests_self": {
     "name": "What are your interests?",
     "img": "randomwine.png",
     //"children": ["a_foodie", "a_trendy", "a_cocktail", "a_award"]
     "children": ["a_foodie"]
   },
   "q_interests_him": {
     "name": "What are his interests?",
     //"children":  ["a_foodie_him", "a_trendy_him", "a_cocktail_him", "a_award"]
     "children":  ["a_foodie_him"]
   },
   "q_interests_her": {
     "name": "What are her interests?",
     "children":  ["a_foodie_her", "a_trendy_her", "a_cocktail_her", "a_award"]
   },
   "q_interests_their": {
     "name": "What are their interests?",
     "children": ["a_foodie", "a_trendy", "a_cocktail", "a_award"]
   },
   "q_gift_type": {
     "name": "What are kind of gift are you looking for?",
     "children": ["a_unique", "a_funny", "a_practical"]
   },
   "a_foodie": {
     "name": "Foodie",
     "img": "randomwine.png",
     "children": ["q_foodie_desc"]
   },
   "a_foodieher": {
     "name": "Foodie",
     "img": "randomwine.png",
     "children": ["q_taste"]
   },
   "a_foodiehim": {
     "name": "Foodie",
     "img": "randomwine.png",
     "children": ["q_taste"]
   },
   "a_trendy": {
     "name": "Trendy",
     "img": "https://image1.totalwine.com/media/sys_master/twmmedia/hfb/hd7/11402965778462.png",
     "children": ["q_price"]
   },
   "a_cocktail": {
     "name": "Cocktails",
     "img": "randomwine.png",
     "children": ["q_price"]
   },
   "a_award": {
     "name": "Award Winning",
     "img": "randomwine.png",
     "children": ["q_price"]
   },
   "a_unique": {
     "name": "Unique",
     "img": "https://image1.totalwine.com/media/sys_master/twmmedia/hfb/hd7/11402965778462.png",
     "children": ["q_price"]
   },
   "a_funny": {
     "name": "Funny",
     "img": "https://image1.totalwine.com/media/sys_master/twmmedia/hfb/hd7/11402965778462.png",
     "children": ["q_price"]
   },
   "a_practical": {
     "name": "Practical",
     "img": "https://image1.totalwine.com/media/sys_master/twmmedia/hfb/hd7/11402965778462.png",
     "children": ["q_price"]
   },
   "q_foodie_desc" : {
     "name": "What best describes your personality",
     "img": "https://image1.totalwine.com/media/sys_master/twmmedia/hfb/hd7/11402965778462.png",
     "children": ["a_adventurous", "a_casual", "a_sweet"]
   },
   "a_adventurous" : {
     "name": "The adventurous foodie",
     "img": "https://image1.totalwine.com/media/sys_master/twmmedia/hfb/hd7/11402965778462.png",
     "children": ["q_price"]
   },
   "a_casual" : {
     "name": "The casual foodie",
     "img": "https://image1.totalwine.com/media/sys_master/twmmedia/hfb/hd7/11402965778462.png",
     "children": ["q_price"]
   },
   "a_sweet" : {
     "name": "The foodie with a sweet tooth",
     "img": "https://image1.totalwine.com/media/sys_master/twmmedia/hfb/hd7/11402965778462.png",
     "children": ["q_price"]
   },
   "q_price" : {
     "name": "What is your price range?",
     "children": ["a_cheap", "a_moderate", "a_expensive"]
   },
   "a_cheap": {
     "name": "$",
     "img": "https://image1.totalwine.com/media/sys_master/twmmedia/hfb/hd7/11402965778462.png",
     "children": ["results"]
   },
   "a_moderate": {
     "name": "$$",
     "img": "https://image1.totalwine.com/media/sys_master/twmmedia/hfb/hd7/11402965778462.png",
     "children": ["results"]
   },
   "a_expensive": {
     "name": "$$$$$$",
     "img": "https://image1.totalwine.com/media/sys_master/twmmedia/hfb/hd7/11402965778462.png",
     "children": ["results"]
   },
   "results": {
     "name": "Calculating Results"
   },
 }
};


/** TEST CODE **/

$(function() {
  //storing the user response in an array
 var userResponse = [];
 var tree = new DecisionTree(data);
 var $list = $('#choices');
 var $title = $('h1');
 var $description = $('p');
 var current_id = null;
 var renderList = function(items) {
   var title = tree.getParentName(items[0].id);
   var parentId = tree.getParentId(items[0].id);
   var currentId = items[0].id;
   $('.resultDescription').hide();

   if(title) {
     if(currentId.includes('results')){
          $title.text('');
       renderResults(userResponse);

     }
     else if(parentId.includes('a_')){
       $title.text(tree.getChildren(parentId)[0].name);
     }
     else{
       $title.text(title);
     }
   }
   $list.empty();
     if(parentId.includes('a_')){
      items = tree.getChildren(parentId)[0].children;
       for(var i = 0; i < items.length; i++) {
         var item = items[i];
         var listItem = tree.getChoice(item);
        console.log(listItem);
         $list.append('<li><img data-choice="' + listItem.id + '" src='+listItem.img+'> <p>'+listItem.name+'</p></li>');
         }
     }
     else{
       for(var i = 0; i < items.length; i++) {
         var item = items[i];
         $list.append('<li class="liContainer"><img data-choice="' + item.id + '" src='+item.img+'> <div class="resultDescriptionContainer"><button class="resultDescription">'+item.name+'</button></div></li>');

        // $list.append('<li><a href="#" data-choice="' + item.id + '">' + item.name + '</a></li>');
       }
   }
 };
var renderResults = function(userResponse, ){
  $('.resultForm').show();
}
 var _doInitial = function() {
     var initData = tree.getInitial();
     current_id = null;
     renderList(initData);
 };

 $(document).on('click', 'li', function(e) {
   e.preventDefault();
   var choiceId = $(this).find('img').data('choice');
   current_id = selectAnswer(choiceId);
 });

$('.restartQuiz').on('click', function(e) {
  $('.resultForm').hide();
  _doInitial();
});

 $('#back').on('click', function(e) {
   e.preventDefault();
   if(!current_id) return false;

   var parents = tree.getParents(current_id);
   $('.resultForm').hide();
   if(parents.length > 0) {
     var prev_node = parents.pop();
     userResponse.pop(prev_node.id);
     console.log(userResponse);
     current_id = prev_node.id;
     if(current_id.includes('a_')){
       prev_node = parents.pop();
     }
     renderList(tree.getChildren(prev_node.id));
   } else {
     _doInitial();
   }
 });

 function selectAnswer(choiceId) {
  userResponse.push(choiceId);
  console.log("userResponse: ",userResponse);
  console.log("choiceId: ",choiceId);
  var kids = tree.getChildren(choiceId);

  if (kids) {
    current_id = choiceId;
    renderList(kids);
  }
  updateProgressBar();
  return current_id;
}

function updateProgressBar(){
  var number = userResponse.length+1;
  $("#currentNumber").text(number);
  $(".progressTick").each(function(index){
    if(index < number){
    $(this).addClass("active");
    }
    else{
      $(this).removeClass("active");
    }
  });
}

window.onload = function(){
  selectAnswer("a_him");
}


 _doInitial();


});


