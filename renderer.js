// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { DictionaryView } = require('./DictionaryView');

function main() {
  new DictionaryView();
}

document.addEventListener('DOMContentLoaded', main);
