(function() {
  // import mozjpeg script.
  // importScripts('cjpeg.min.js');

  /* bind on message event handler */
  onmessage = function(event) {
    var message = event.data;
    if (message.type === 'task') {
      var time = performance.now();
      var result = cjpeg(message.data.image, ['-quality', message.data.quality.toString()], '-progressive');

      var totalTime = performance.now() - time;
      postMessage({
        type: 'done',
        data: {
          image: result,
          id: message.data.id
        },
        time: totalTime
      });
    } else if (message.type === 'deployUrl') {
      importScripts(message.data + '/wasm/cjpeg/cjpeg.min.js');
      postMessage({ type: 'ready' });
    }
  };
})();
