// Generated by CoffeeScript 1.7.1
jQuery.fn.extend({
  backspace: function(num, options) {
    var callback, keypress, ms;
    ms = options.ms || 100;
    keypress = options.keypress || function() {};
    callback = options.callback || function() {};
    return this.each(function() {
      var elem;
      elem = this;
      return jQuery(elem).queue(function() {
        var attr, backsp;
        attr = elem.tagName === 'input'.toUpperCase() || elem.tagName === 'textarea'.toUpperCase() ? 'value' : 'innerHTML';
        return (backsp = function(n) {
          if (n) {
            elem[attr] = elem[attr].slice(0, -1);
            keypress.call(elem);
            setTimeout((function() {
              return backsp(n - 1);
            }), Math.random() * ms);
          } else {
            callback.call(elem);
            jQuery(elem).dequeue();
          }
        })(num);
      });
    });
  },
  typetype: function(txt, options) {
    var callback, e, interval, keypress, ms;
    ms = options.ms || 100;
    e = options.e || 0.04;
    keypress = options.keypress || function() {};
    callback = options.callback || function() {};
    interval = function(i) {
      return Math.random() * ms * (txt[i - 1] === txt[i] ? 1.6 : txt[i - 1] === '.' ? 12 : txt[i - 1] === '!' ? 12 : txt[i - 1] === '?' ? 12 : txt[i - 1] === '\n' ? 12 : txt[i - 1] === ',' ? 8 : txt[i - 1] === ';' ? 8 : txt[i - 1] === ':' ? 8 : txt[i - 1] === ' ' ? 3 : 2);
    };
    return this.each(function() {
      var elem;
      elem = this;
      return jQuery(elem).queue(function() {
        var append, attr, backsp, typeTo;
        attr = elem.tagName === 'input'.toUpperCase() || elem.tagName === 'textarea'.toUpperCase() ? 'value' : 'innerHTML';
        append = function(str, cont) {
          if (str) {
            elem[attr] += str[0];
            keypress.call(elem);
            setTimeout((function() {
              return append(str.slice(1), cont);
            }), ms);
          } else {
            cont();
          }
        };
        backsp = function(num, cont) {
          if (num) {
            elem[attr] = elem[attr].slice(0, -1);
            keypress.call(elem);
            setTimeout((function() {
              return backsp(num - 1, cont);
            }), ms);
          } else {
            cont();
          }
        };
        return (typeTo = function(i) {
          var afterErr, len, r;
          if (i <= (len = txt.length)) {
            afterErr = function() {
              return setTimeout((function() {
                return typeTo(i);
              }), interval(i));
            };
            r = Math.random() / e;
            if (r < 0.3 && txt[i - 1] !== txt[i] && i + 4 < len) {
              append(txt.slice(i, i + 4), function() {
                return backsp(4, afterErr);
              });
            } else if (r < 0.7 && i > 1 && /[A-Z]/.test(txt[i - 2] && i + 4 < len)) {
              append(txt[i - 1].toUpperCase() + txt.slice(i, i + 4), function() {
                return backsp(5, afterErr);
              });
            } else if (r < 0.5 && txt[i - 1] !== txt[i] && i < len) {
              append(txt[i], function() {
                return backsp(1, afterErr);
              });
            } else if (r < 1.0 && txt[i - 1] !== txt[i] && i < len) {
              append(txt[i] + txt[i - 1], function() {
                return backsp(2, afterErr);
              });
            } else if (r < 0.5 && /[A-Z]/.test(txt[i])) {
              append(txt[i].toLowerCase(), function() {
                return backsp(1, afterErr);
              });
            } else {
              elem[attr] += txt[i - 1];
              keypress.call(elem);
              setTimeout((function() {
                return typeTo(i + 1);
              }), interval(i));
            }
          } else {
            callback.call(elem);
            jQuery(elem).dequeue();
          }
        })(1);
      });
    });
  }
});
