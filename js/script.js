window.addEventListener('DOMContentLoaded', function() {

const tabs = require('./modules/tabs'),
      modal = require('./modules/modal'),
      timer = require('./modules/timer'),
      cards = require('./modules/cards'),
      calc = require('./modules/calc'),
      form = require('./modules/forms'),
      slider = require('./modules/slider');

tabs();
modal();
timer();
cards();
calc();
form();
slider();
});