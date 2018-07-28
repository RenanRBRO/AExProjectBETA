/* 
 * initAudioContextAEx
 */
function initAudioContextAEx() {
	//console.log('initAudioContextAEx');
	var contextClass = (window.AudioContext ||
						window.webkitAudioContext ||
						window.mozAudioContext ||
						window.oAudioContext ||
						window.msAudioContext);
	if (contextClass) {
		// Web Audio API is available.
		var context;
		//console.log('Web Audio API is available.');
		var context;
		context = new contextClass();
		//console.log('Context ' + context);
		return context;
	} else {
		//console.log('Web Audio API is not available.');
		alert('Web Audio API is not available.');
	}
}