/*
 * initializeFilesPlayerAEx
 */
function initializeFilesPlayerAEx(files, OffsetFiles) {
	//console.log('initializeFilesPlayerAEx');

	// Initializes the audio context
	var context = initAudioContextAEx();

	//console.log('Context ' + context);
	//console.log('Files ' + files);

	// Creates the object that initializes and loads the buffer
	bLoader = new bufferLoaderWithOffsetCallbackAEx(context, files, OffsetFiles, finishedLoadingAEx);
	bLoader.load();
}

/*
 * finishedLoading
 */
function finishedLoadingAEx(bufferList, OffsetFiles, context) {
	// Create two sources and play them both together.
	//console.log('finishedLoadingAEx');
	var source = new Array();
	for (var i = 0; i < bufferList.length; i++) {
		source[i] = this.context.createBufferSource();
		//console.log('source ' + i + ' -> ' + source[i]);
	}
	for (var i = 0; i < bufferList.length; i++) {
		source[i].buffer = bufferList[i];
		//console.log('source.buffer[' + i + '] -> ' + source[i].buffer);
	}
	for (var i = 0; i < bufferList.length; i++) {
		source[i].connect(this.context.destination);
		//console.log('source.connect[' + i + '] -> ' + source[i].buffer);
	}
	for (var i = 0; i < bufferList.length; i++) {
		source[i].start(this.OffsetFiles[i]);
		var data = new Date();
		console.log('source.start[' + i + '] -> ' + source[i].buffer + ' at ' + data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds() + ' ' + data.getMilliseconds());
	}
}
