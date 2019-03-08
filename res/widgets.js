class _Button {
  constructor(container, label, tooltip) {
    let domEl = "_B_" + _Button.count;
    $('#' + container).html("<button id='" + domEl + "' title='" + tooltip + "' class='ui-button ui-widget ui-corner-all'>" + label + "</button>");
    this.domEl = $('#' + domEl);
    this.state = 0;
    _Button.count++;
  }

  getId() { return this.domEl.attr('id'); }

  getLabel() { return this.domEl.html(); }

  setLabel(label) { this.domEl.html(label); }

  setAction(fun) { this.domEl.on('click', fun); }

  setActions(...args) {
    let me = this;
    this.domEl.on('click', function() {
      args[2 * me.state]();
      me.state = me.state < args.length / 2 - 1 ? me.state + 1 : 0;
      me.setLabel(args[2 * me.state + 1]);
    });
  }
}

_Button.count = 0;


class _Slider {
  constructor(container, text, tooltip, min, max, step, initialValue) {
    let domEl = "_S_" + _Slider.count;
    $('#' + container).html("<div id='" + domEl + "' title='" + tooltip + "'><span id='h" + domEl + "' class='ui-slider-handle'></span></div>");
    this.domEl = $('#' + domEl);
    this.domEl2 = $('#h' + domEl);
    this.boundFun;
    let me = this;
    this.domEl.slider({
      value: initialValue,
      min: min,
      max: max,
      step: step,
      create: function() { me.domEl2.text($(this).slider('value')); },
      slide: function(event, ui) { me.domEl2.text(ui.value); },
      change: function(event, ui) { if(me.boundFun != undefined) me.boundFun(); }
    });
    if(text.length > 0) {
      this.domEl.before(text);
      this.domEl.css({"margin-left": "5em", "margin-top": "-.8em", "width": "10em"});
    } else this.domEl.css({"width": "10em"});
    this.domEl2.css({"width": "3em", "height": "1.6em", "top": "50%", "margin-top": "-.8em", "text-align": "center", "line-height": "1.6em"});
    _Slider.count++;
  }

  getValue() { return this.domEl.slider('value'); }

  setValue(value) { this.domEl.slider('value', value); }

  setMax(max) {
    if(this.getValue() > max) {
      this.domEl.slider('value', max);
      this.domEl2.text(max);
    }
    this.domEl.slider('option', 'max', max);
  }

  onChange(fun) { this.boundFun = fun; }
}

_Slider.count = 0;
