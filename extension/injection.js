console.log("hello from inject.js");

chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
    var state = response.state;
    console.log("State: " + state);

    var regexp_str = "";

    for(var property in grammar_words){
      if(grammar_words.hasOwnProperty(property)){
	regexp_str += property + "|";
      }
    }
    regexp_str = regexp_str.substring(0, regexp_str.length-1);

    console.log(regexp_str);

    $(document).ready(function(){
      var count = 0;

      findAndReplaceDOMText(document, {
	find: new RegExp(regexp_str, "g"), 
	replace: function(portion, match) {
	  count++;
	  return grammar_words[match[0]][0];
	}
      });

      console.log(count + " words have been changed.");
    });

});
