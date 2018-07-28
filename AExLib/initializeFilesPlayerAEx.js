/* 
 * initializeFilesPlayerAEx
 */
function initializeFilesPlayerAEx(files, startTimeFiles) {
	//console.log('initializeFilesPlayerAEx');
	
	// Initializes the audio context
	context = initAudioContextAEx();
	
	//console.log('Context ' + context);
	//console.log('Files ' + files);
	
	// Creates the object that initializes and loads the buffer
	bLoader = new bufferLoaderAEx( context, files, startTimeFiles, finishedLoadingAEx);
	bLoader.load();
} 

/* 
 * finishedLoading
 */
function finishedLoadingAEx(bufferList, startTimeFiles) {
	// Create two sources and play them both together.
	//console.log('finishedLoadingAEx');
	var source = new Array();
	for (var i = 0; i < bufferList.length; i++) {
		source[i] = context.createBufferSource();
		//console.log('source ' + i + ' -> ' + source[i]);
	}
	for (var i = 0; i < bufferList.length; i++) {
		source[i].buffer = bufferList[i];
		//console.log('source.buffer[' + i + '] -> ' + source[i].buffer);
	}
	for (var i = 0; i < bufferList.length; i++) {
		source[i].connect(context.destination);
		//console.log('source.connect[' + i + '] -> ' + source[i].buffer);
	}
	for (var i = 0; i < bufferList.length; i++) {
		source[i].start(this.startTimeFiles[i]);
		var data = new Date();
		console.log('source.start[' + i + '] -> ' + source[i].buffer + ' at ' + data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds() + ' ' + data.getMilliseconds());
	}
}