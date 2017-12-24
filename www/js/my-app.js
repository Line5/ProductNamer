// Determine theme depending on device
var isAndroid = Framework7.prototype.device.android === true;
var isIos = Framework7.prototype.device.ios === true;

// Set Template7 global devices flags
Template7.global = {
    android: isAndroid,
    ios: isIos
};

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Change Through navbar layout to Fixed
if (isAndroid) {
    // Change class
    $$('.navbar-through').removeClass('navbar-through').addClass('navbar-fixed');
    // And move Navbar into Page
    $$('.view .navbar').prependTo('.view .page');
	$$('.toolbar').appendTo('.view');
}

// Initialize app
var myApp = new Framework7({
    // Enable Material theme for Android device only
    material: isAndroid ? true : false,
    // Enable Template7 pages
    template7Pages: true
});
 

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});


// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        //myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})

$$('form').on('submit', function (e) {
	event.preventDefault();
	try {
		//$$(this).addClass('hello').attr('title', 'world').insertAfter('.something-else');
		var coreWords = $$('#coreWordsInput').val()
		var wordList = generateWords(coreWords);
		$$('#myResults').html(listWords(wordList));
	} catch (err) {}
	return false;
});

function generateWords(coreWords) {
	var singleWords = coreWords.split(' ');
	var numberOfWords = singleWords.length;
	var wordList = [];
	
	// mode 1: walk through all the words.
	for (i = 0; i < 100; i++) {
		var word = '';
		var parts = [];
		for (j = 0; j < numberOfWords; j++) {
			begin = Math.floor((Math.random()*(singleWords[j].length)));
			len = Math.floor(Math.random()*(singleWords[j].length - begin)+1);
			parts.push(singleWords[j].substr(begin, len));
		}
		var shuffledParts = shuffle(parts);
		for (j = 0; j < numberOfWords; j++) {
			word += shuffledParts[j];
		}
		
		// every 4th word gets a pre-syllable
		if (Math.floor(Math.random()*4) == 1) {
			word = getPreSyllable() + word;
		}
		
		// every 11th word gets a post-syllable
		if (Math.floor(Math.random()*11) == 1) {
			word = word + getPostSyllable();
		}
		
		if (wordList.indexOf(word) == -1) {
			wordList.push(word);
		}
	}
	return wordList;
}

function listWords(wordList) {
	$$('#myResults').html('');
	resultList = '<div class="content-block-title">Ergebnisse:</div>';
	resultList += '<div class="list-block"><ul>';
	var wordListLength = wordList.length;
	for (i = 0; i < wordListLength; i++) {
		resultList += '<li class="item-content">';
        resultList += '<div class="item-inner">';
        resultList += '<div class="item-title">';
        resultList += wordList[i];
        resultList += '</div>';
        resultList += '</div>';
		resultList += '</li>';
	}
	resultList += '</ul></div>';
    return resultList;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
   randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function getPreSyllable() {
	preSyllables = ['super', 'mega', 'all', 'fancy', 'crazy', 'go', 'perfect', 'premium ', 'first ', 'best '];
	return preSyllables[Math.floor(Math.random()*preSyllables.length)];
}

function getPostSyllable() {
	postSyllables = ['er', 'omat', 'robot', 'or', 'la', 'izer', 'ozer', 'azer', ' pro', 'os'];
	return postSyllables[Math.floor(Math.random()*postSyllables.length)];
}