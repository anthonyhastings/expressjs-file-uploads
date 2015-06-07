// Caching selectors.
var formElement = document.querySelector('.js-form'),
    progressElement = document.querySelector('.js-progress')
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

    // Progress listener.
    request.addEventListener('progress', function(event) {
        console.info('XHR::progress', event);
        progressElement.setAttribute('value', (event.loaded / event.total) * 100);
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