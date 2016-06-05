$(document).ready(function(){
	var questions = [{
		question:'What is the capital of Luxembourg?',
		choices: ['Diddeleng', 'Dikrech', 'Luxembourg', 'Wolz', 'Remich'],
		correctAnswer: 2
	}, {
		question: 'In what country is Vatican City located?',
		choices: ['USA', 'Italy', 'Venezuela', 'Africa', 'Spain'],
		correctAnswer: 1
	}, {
		question: 'France, Switzerland, Austria, and _________ are the four countires that border Italy.',
		choices: ['Slovenia', 'Germany', 'Croatia', 'Serbia', 'Sicilia'],
		correctAnswer: 0
	}, {
		question: 'In June 1944 the Western Allies of WWII invaded Normandy Beach.  What country is Normandy in?',
		choices: ['Germany', 'Italy', 'Japan', 'Netherlands', 'France'],
		correctAnswer: 4
	}, {
		question: 'What is the capital of Germany?',
		choices: ['Munich', 'Frankfurt', 'Berlin', 'Ja Und Becks', 'Dusseldorf'],
		correctAnswer: 2
	}, {
		question: 'Borat, an accomplished diplomat, is from which country?',
		choices: ['Uzbekistan', 'Kyrgyzstan', 'England', 'Turkmenistan', 'Kazakhstan'],
		correctAnswer: 4		
	}, {
		question: 'What is the capital of Finland?',
		choices: ['Espoo', 'Jyvaskyla', 'Helsinki', 'Kristiinankaupunki', 'Hakunamatata'],
		correctAnswer: 2
	}, {
		question: 'Niagara Falls is located in which country?',
		choices: ['Canada', 'USA', 'Mexico', 'Nigeria', 'USA & Canada'],
		correctAnswer: 4
	}];

	var questionCounter = 0; //Tracks question number
	var selections = []; //Array containing user choices
	var quiz = $('#quiz'); //quiz div object

	//Display first question

	displayNext();
	timer();
	$('#done').hide();

	$('#nextBtn').on('click', function() {
		choose();
		// if no answer is selected
		if (isNaN(selections[questionCounter])) {
			alert('Please make a selection!');
		}
		else {
			questionCounter++;
			displayNext();
		}
	});

	//sets timer
	function timer(){
		t = setTimeout(timeUp, 1000 * 60);
	}

	function stopFunction() {
		clearTimeout(t);
	}

	function timeUp(){
		$('#done').show();
		$('#startBtn').show();
		$('#nextBtn').hide();
		$('#quiz').hide();
		$('#time').hide();
		stopFunction();
		stopFunctionTwo();
	}

	var seconds;
	var temp;

	function countDown() {
		seconds = document.getElementById('countDown').innerHTML;
		seconds = parseInt(seconds, 10);

		if (seconds == 1) {
			temp = document.getElementById('countDown');
			return;
		}

		seconds--;
		temp = document.getElementById('countDown');
		temp.innerHTML = seconds;
		setTimeoutMyTimer = setTimeout(countDown, 1000);

	}

	countDown();

	function stopFunctionTwo() {
		clearTimeout(setTimeoutMyTimer);
	}

	//resets game when the Start Over button is clicked

	$('#startBtn').on('click', function () {
		questionCounter = 0;
		selections = [];
		displayNext();
		$('#startBtn').hide();
		$('#nextBtn').show();
		$('#done').hide();
		$('#time').show();
		timer();
		document.getElementById('countDown').innerHTML = 60;
		countDown();
	});

	//Creates div with questions and choices

	function makeQuiz(index) {
		var quizDiv = $('<div>', {
			id: 'question'
		});

		var question = $('<p>').append(questions[index].question);
		quizDiv.append(question);

	 var radioButtons = createRadios(index);
	  quizDiv.append(radioButtons);
	  return quizDiv;
	};

	//creates a list of choices

	function createRadios(index) {
		var radioList = $('<ul>');
		var input = ''; // creates space where choices will go
		for (var i = 0; i < questions[index].choices.length; i++) {
			var item = $('<li>');
			input = '<input type="radio" name="answer" value=' + i + ' />';
			input += questions[index].choices[i];
			item.append(input);
			radioList.append(item);
		}
		return radioList;
	}

	//Grabs user selection and pushes value to array
	function choose() {
		selections[questionCounter] = +$('input[name="answer"]:checked').val();
	}

	//display next requested element
	function displayNext() {
		quiz.fadeOut(function() {
			$('#question').remove();
			if (questionCounter < questions.length){
				var nextQuestion = makeQuiz(questionCounter);
				quiz.append(nextQuestion).show();
				if (!(isNaN(selections[questionCounter]))) {
					$('input[value='+selections[questionCounter]+']').prop('checked', true);
				}
				else if (questionCounter === 0) {
					$('#nextBtn').show();
				}
			}
			 else {
			 	var scoreElem = displayScore();
			 	quiz.append(scoreElem).fadeIn();
			 	$('#nextBtn').hide();
			 	$('#startBtn').show();
			 }
		});
	};

	// Totals score and creates <p> to display

	function displayScore() {
		clearTimeout(t);
		$('#time').hide();
		stopFunctionTwo();
		stopFunction();
		var score = $('<p>',{id: 'question'});
		var numCorrect = 0;
		for (var i = 0; i < selections.length; i++) {
			if (selections[i] === questions[i].correctAnswer) {
				numCorrect++;
			}
		}

		score.append('You got ' + numCorrect + ' out of ' + questions.length + ' questions right!!!');
			return score;

	};
});