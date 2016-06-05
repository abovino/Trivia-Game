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
		correctAnswer: 5		
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

	//Display initial question
	displayNext();

	$("#startBtn").on("click", function(){

    	//change the color of the button to red
    	$(this).addClass('btn-danger')

			var counter = 20;

			var intervalId = setInterval(function() {
				counter--;
				$("#startBtn").html(counter);

				if (counter === 0) {
					alert("Sorry, out of time");
					clearInterval(intervalId);
				}
			}, 1000);
    });

	$('#nextBtn').on('click', function(next) {
		next.preventDefault();

/*		if (isNaN(selections[questionCounter])) {
			alert('You must select an answer!');
		} else {
			questionCounter++;
			displayNext();
		}*/
	});

	$('#previousBtn').on('click', function(previous) {
		previous.preventDefault();

		questionCounter = 0;
		selections = [];
		displayNext();
		$('#startBtn').hide();
	});

	function createQuestionsDiv(index) {
		var qElement = $('<div>', {
			id: 'question'
		});
	

	var question = $('<p>').append(questions[index].question);
	qElement.append(question);

	var radioButtons = createRadios(index);
	qElement.append(radioButtons);

	return qElement;

}

function createRadios(index) {
	var radioList = $('<ul>');
	var item;
	var input = '';
	for (var i = 0; i < questions[index].choices.length; i++) {
		item = $('<li>');
		input = '<input type="radio" name="answer" value=' + i + ' />';
		input += questions[index].choices[i];
		item.append(input);
		radioList.append(item);
	}
	return radioList;
}

function choose() {
	selections[questionCounter] = +$('input[name="answer"]:checked').val();
}

function displayNext() {
	quiz.fadeOut(function() {
		$('#question').remove();

		if(questionCounter < questions.length){
			var nextQuestion = createQuestionsDiv(questionCounter);
			quiz.append(nextQuestion).fadeIn();
			/*if (isNan(selections[questionCounter])) {
				$('input[value='+selections[questionCounter]+']').prop('checked', true);
			}*/

			if(questionCounter === 1){
				$('#previousBtn').show();
			} else if(questionCounter === 0){
				$('#previousBtn').hide();
				$('#nextBtn').show();
			}
		} else {
			var scoreElem = displayscore();
			quiz.append(scoreElem).fadeIn();
			$('#nextBtn').hide();
			$('#previousBtn').hide();
			$('#startBtn').show();
		}
	});
}
})