/*
 * CONTEXT:
 * A context is defined as an object that references an audio media
 */

/*
 * contextGeneratorAEx
 */
 function contextGeneratorAEx(files) {
 	//console.log('contextGeneratorAEx');

 	// Initializes the audio context
 	this.context = initAudioContextAEx();
  this.startTime = 0;
  this.startOffset = 0;
  this.source = new Array();
 	// Creates the object that initializes and loads the buffer
 	this.bLoader = new bufferLoaderAEx(this.context, files);
 	this.bLoader.load();
 }

  /*
   * contextGeneratorAEx.playContext
   */
  contextGeneratorAEx.prototype.playContext = function(loop, startOffset) {
    console.log('PlayContext');
    this.startOffset = startOffset;
    var startTime = this.bLoader.context.currentTime;
    //var source = new Array();
    for (var i = 0; i < this.bLoader.bufferList.length; i++) {
      this.source[i] = this.context.createBufferSource();
      this.source[i].buffer = this.bLoader.bufferList[i];
      this.source[i].loop = loop;
      this.source[i].connect(this.context.destination);
    }
    for (var i = 0; i < this.bLoader.bufferList.length; i++) {
      console.log(startOffset);
      this.source[i].start(startOffset, this.startOffset % this.bLoader.bufferList[0].duration);
    }
    this.startTime = startTime;
  };

  /*
   * contextGeneratorAEx.pauseContext
   */
  contextGeneratorAEx.prototype.pauseContext = function() {
    console.log('PauseContext');
    for (var i = 0; i < this.bLoader.bufferList.length; i++) {
      this.source[0].stop();
    }
    this.startOffset += this.context.currentTime - this.startTime;
  };

  /*
   * contextGeneratorAEx.stopContext
   */
  contextGeneratorAEx.prototype.stopContext = function() {
    console.log('StopContext');
    for (var i = 0; i < this.bLoader.bufferList.length; i++) {
      this.source[i].stop();
    }
    this.startOffset = 0;
  };
