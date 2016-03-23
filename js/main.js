jQuery(document).ready(function() {
	//constant values
	var EMPTY = "";

	//select the DOM element
	var textbox = jQuery("#input-text");
   	var regexbox = jQuery("#input-regex");
   	var alertbox = jQuery("#alert-box");
   	var resultsbox = jQuery("#results-box");
   	var testButton = jQuery("#test-button");

   	//get the string values
   	var text = textbox.val();
   	var regex = regexbox.val();

   	testButton.on('click', function(event) {
   		event.preventDefault();
   		
   		// clear page from the previous run
   		clearResultsandErrors();

   		//Check for empty values and create the Regex
   		if (text == EMPTY) {
   			errorLog("Please enter Text to test.");
   		} else if (regex == EMPTY) {
   			errorLog("Enter a Regex to test the Text.");
   		} else {
   			regex = createRegex(regex);
   		}
   	});

   	/*Helper Functions*/
   	function clearResultsandErrors () {
   		// body...
   	};


});