function setSlider(container, slider, text, tooltip, min, max, step, initialValue) {
  $('#' + container).html("<div id='" + slider + "' title='" + tooltip + "'><span id='h" + slider + "' class='ui-slider-handle'></span></div>");
  let s = $('#' + slider);
  s.slider({
    value: initialValue,
    min: min,
    max: max,
    step: step,
    create: function() { $('#h' + slider).text($(this).slider("value")); },
    slide: function(event, ui) { $('#h' + slider).text(ui.value); }
  });
  if(text.length > 0) {
    s.before(text);
    s.css({"margin-left": "5em", "margin-top": "-.8em", "width": "10em"});
  } else s.css({"width": "10em"});
  $('#h' + slider).css({"width": "3em", "height": "1.6em", "top": "50%", "margin-top": "-.8em", "text-align": "center", "line-height": "1.6em"});
}

function setSliderMax(slider, max) {
  if(getSliderValue(slider) > max) {
    $('#' + slider).slider('value', max);
    $($('#h' + slider)).text(max);
  }
  $('#' + slider).slider('option', 'max', max);
}

function setSliderValue(slider, value) { $('#' + slider).slider('value', value); }

function getSliderValue(slider) { return $('#' + slider).slider('value'); }
