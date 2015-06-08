/**
 * Formats Bytes into a particular format.
 *
 * @param  {[int]} bytes
 * @param  {[int]} decimals
 * @return string
 */
function formatBytes(bytes,decimals) {
   if(bytes == 0) return '0 Byte';
   var k = 1000;
   var dm = decimals + 1 || 3;
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
   var i = Math.floor(Math.log(bytes) / Math.log(k));
   return (bytes / Math.pow(k, i)).toPrecision(dm) + ' ' + sizes[i];
};

// Caching selectors.
var formElement = document.querySelector('.js-form'),
    downloadProgressElement = document.querySelector('.js-download-meter'),
    downloadTextElement = document.querySelector('.js-download-text'),
    uploadProgressElement = document.querySelector('.js-upload-meter'),
    uploadTextElement = document.querySelector('.js-upload-text'),
    submitElement = document.querySelector('.js-submit');

/**
 *  Binding a form submit listener.
 */
formElement.addEventListener('submit', function(event) {
    event.preventDefault();

    var request = new XMLHttpRequest(),
        requestData = new FormData(formElement);

    // Error listener.
    request.addEventListener('error', function(event) {
        console.error('XHR::error', event, request.status);
    }, false);

    // Load listener.
    request.addEventListener('load', function() {
        console.info('XHR::load', event, request.status, request.status === 200);
        submitElement.disabled = true;
    }, false);

    // Progress listener (download).
    request.addEventListener('progress', function(event) {
        var totalLoadedKB = formatBytes(event.loaded, 2),
            totalSizeKB = formatBytes(event.total, 2);

        console.info('XHR::progress (download)', event);
        downloadProgressElement.setAttribute('value', (event.loaded / event.total) * 100);
        downloadTextElement.innerHTML = totalLoadedKB + ' / ' + totalSizeKB;
    }, false);

    // Progress listener (upload).
    request.upload.addEventListener('progress', function(event) {
        var totalLoadedKB = formatBytes(event.loaded, 2),
            totalSizeKB = formatBytes(event.total, 2);

        console.info('XHR::progress (upload)', event);
        uploadProgressElement.setAttribute('value', (event.loaded / event.total) * 100);
        uploadTextElement.innerHTML = totalLoadedKB + ' / ' + totalSizeKB;
    }, false);

    // Picking up the HTTP method and endpoint from the form attributes.
    request.open(formElement.getAttribute('method'), formElement.getAttribute('action'), true);

    /**
     *  The setting of the `Content-Type` header has been removed. This is because it
     *  needs to have a boundary parameter also applied which, if `Content-Type` is
     *  left blank, the browser will do for you.
     *
     *  Example:
     *  Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryNbbqAoLMMb4Bdirg
     */
    // request.setRequestHeader('Content-Type', 'multipart/form-data');

    // Start the request and send our populated FormData object.
    request.send(requestData);
});