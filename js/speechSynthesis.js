/*eslint-env es6 */
(function () {
	'use strict';

	var inTestingMode = false;

    // Getting html elements
	var speakBtn = document.getElementById('speak-btn');
	var testingBtn = document.getElementById('test-btn');
	var textToSpeechEle = document.getElementById('text-to-speech');
	var voiceSelect = document.getElementById('voice');
	var rateRange = document.getElementById('rate');
    var pitchRange = document.getElementById('pitch');

    var log = function (message) {
		console.log(`${message}<br/>`);
	};

	// Loading available voices for this browser/platform
	// And displaying them into the combobox
	var loadVoices = function () {
		var voices = speechSynthesis.getVoices();

		voices.forEach((voice) => {
			var option = document.createElement('option');
			option.value = voice.name;
			option.innerHTML = voice.name;
			if (voice.name === "Microsoft David Desktop - English (United States)") {
				option.selected = true;
			}
			voiceSelect.appendChild(option);
		});
	};

	var speak = function (textToSpeech) {
		var synUtterance = new SpeechSynthesisUtterance();
		synUtterance.text = textToSpeech;
		if (voiceSelect.value) {
			synUtterance.voice = speechSynthesis
				.getVoices()
				.filter(function (voice) {
					return voice.name === voiceSelect.value;
				})[0];
		}
		synUtterance.rate = parseFloat(rateRange.value);
		synUtterance.pitch = parseFloat(pitchRange.value);

		const eventList = ['start', 'end', 'mark', 'pause', 'resume', 'error', 'boundary'];
		eventList.forEach((event) => {
			synUtterance.addEventListener(event, (speechSynthesisEvent) => {
				log(`Fired '${speechSynthesisEvent.type}' event at time '${speechSynthesisEvent.elapsedTime}' and character '${speechSynthesisEvent.charIndex}'.`);
			});
		});

		window.speechSynthesis.speak(synUtterance);
	};

	loadVoices();

	// Chrome loads voices asynchronously.
	window.speechSynthesis.onvoiceschanged = () => {
		loadVoices();
	};

    var testingMode = function () {
        var numbers = [];
        for (var i = 0; i < 10; i++) {
            numbers.push(getRandomInt(0, 100));
        }

        for (var i = 0; i < numbers.length; i++) {
            speak(numbers[i]);
        }
    };

    speakBtn.addEventListener('click', () => {

		if (window.speechSynthesis.speaking){
			return;
		}

		if (textToSpeechEle.value.length === 0) {
			textToSpeechEle.value = "This sentence isn't question";
		}
		speak(textToSpeechEle.value);
	});

	testingBtn.addEventListener('click', () => {
		if (!inTestingMode) {
			window.speechSynthesis.cancel();
			inTestingMode = true;
			testingMode();
			inTestingMode = false;
		}
	});

    function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	};
}());
