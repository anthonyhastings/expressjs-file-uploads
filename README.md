# ExpressJS: File Uploads

## Introduction
This code example demonstrates a few things:
* How to accept and save file uploads via ExpressJS and Multer.
* How to use [FormData](https://developer.mozilla.org/en/docs/Web/API/FormData)
API to easily encapsulate all data needing sent to the server.
* How to listen for the [progress event](http://www.html5rocks.com/en/tutorials/file/xhr2/#toc-bin-data)
and show a percentage of remaining data to be sent to the server.

## Usage
Simply install node dependencies then run the server and ensure you are in the
root directory of the repository whenever you do so:

```
npm install
node server.js
```

The address including bound port will be output to the console. Load the address
in a browser, then open your console and examine messages and network requests
as you upload a file. All files are uploaded into `uploads/`.
