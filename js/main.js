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
   	var pattern = regexbox.val();

   	testButton.on('click', function(event) {
   		event.preventDefault();
   		
   		// clear page from the previous run
   		clearResultsandErrors();

   		//Check for empty values and create the Regex
   		if (text == EMPTY) {
   			errorLog("Please enter Text to test.");
   		} else if (pattern == EMPTY) {
   			errorLog("Enter a Regex to test the Text.");
   		} else {
   			pattern = createRegex(pattern);
   		}
   	});

   	/*Helper Functions*/

   	//clears text from results and hides previous errors
   	function clearResultsandErrors () {
   		resultsbox.text(EMPTY);
   		alertbox.addClass('hide').text(EMPTY);
   	};

   	//displays errors in the alertbox
   	function errorLog (message) {
   		alertbox.removeClass('hide').text(message);
   	}

   	//Function to create actual regular expression object 
   	//from the value given in the Regex text field
   	function createRegex (pattern) {
   		//if incorrect flags, Regex throws errors
   		//to catch these errors use try...catch block
   		try {
   			/* There are two syntaxes for Regular expressions:
			 * 1. Expressions that start with "/" and contain flags
			 * 2. Expressions that don't start with "/"
			 *
			 * For Expresssions that start with "/", we split them by "/",
			 * remove the first element which will be an empty string(text before the first /),
			 * then pop the last element which will be flags
			 *
			 * For expressions not starting with "/" we pass the expression string as is
			 * and add the global flag so that it catches all the matches 
   			*/
   			if (pattern.charAt(0) == "/") {
   				pattern = pattern.split("/");
   				pattern.shift();

   				var flags = pattern.pop();
   				pattern =  pattern.join("/");

   				pattern = new Regex(pattern, flags);
   			} else {
   				pattern = new Regex(pattern, "g");
   			}

   			return pattern;
   		} catch(e) {
   			errorLog("The Regex is invalid.");
   			return false;
   		}
   	};

   	//Executing Regex and generating its matches
   	function generateMatches(pattern, text) {
   		/* Regex.exec() command works such that it returns the first match every time 
		 * it runs if the global flag has not been set.
		 * If the global flag has been set, then exec command cycles through results
		 * unless the last match returns null.
   		*/
   		var results = []; //stores all the matches
   		var result ;

   		//checking if global flag has been set
   		if (pattern.global) {
   			//cycling through the results
   			while ((result = pattern.exec(text)) != null) results.push(result);
   		} else {
   			//returns only the first match it finds
   			results.push(pattern.exec(text));
   		}

   		return results;
   	};

    //function to display the number of matches found
    function displayMatchesFoundCount(results) {
        if (results.length === 1) {
            return "<p>There is one match.</p>";
        } else {
            return "<p>There are " + results.length + " matches.</p>";
        }
    };

    //creates html string to display on the page
    function displayResults(results, text) {
        for (var i = results.length - 1; i >= 0; i--) {
            var result = results[i];
            var match = result.toString();
            var prefix = text.substr(0, result.index);
            var suffix = text.substr(result.index + match.length);
            text = prefix + '<span class="label label-info">' + match + '</span>' + suffix;
        }
        return "<h4>" + text + "</h4>";
    }

});