(function(){
	var banner = $('#nodeunit-banner'),
      tests = $('#nodeunit-tests'),
      passed = 0,
      failed = 0,
      total = 0;

	function updateTest(_passed, _failed) {
		passed += _passed;
		failed += _failed;
		updateTotals(passed, failed);
	}

  function updateTotals(_passed, _failed) {
    if (_failed) {
      banner.removeClass('pass');
      banner.addClass('fail');
    }
    banner.html('<h3>' + _passed + ' tests passed. ' + _failed + ' failed.</h3>');
  }

	nodeunit.runModules(exports, {
		moduleStart : function (name) {
			tests.append('<h3>' + name + '</h3>');
		},
		testDone : function (name, assertions) {
			var testEl = $('<li>'),
				testHtml = '',
				assertUl = $('<ul>'),
				assertLi,
				assertHtml = '',
				assert;

			total++;

			// each test
			testHtml += '<div class="title"><strong>' + name + '</strong> ';
			if (assertions.failures()) {
				testEl.addClass('fail open');
				testHtml += assertions.passes() + ' passed,';
				testHtml += assertions.failures() + ' failed.</div>';
			} else {
				testEl.addClass('pass');
				testHtml += 'All ' + assertions.passes() + ' passed.</div>';
			}
			testEl.addClass('test');
			testEl.html(testHtml);

			// each assert
			for (var i = 0; i < assertions.length; i++) {
				assert = assertions[i];
				assertLi = $('<li>');
				assertHtml = '<strong>' + total + '.' + (i + 1) + '</strong> ';
				assertHtml += (assert.message || assert.method || 'no message');
				if (assert.failed()) {
					assertHtml += ' (' + assert.error.expected + ' ' + assert.error.operator + ' ' + assert.error.actual + ')';
					assertHtml += '<pre>' + (assert.error.stack || assert.error) + '</pre>';
					assertLi.addClass('fail');
				} else {
					assertLi.addClass('pass');
				}
				assertLi.html(assertHtml);
				assertUl.append(assertLi);
			}

			testEl.append(assertUl);
			tests.append(testEl);
			updateTest(assertions.passes(), assertions.failures());
		},
		done : function (assertions) {
        var failures = assertions.failures(),

        toStr = '<pre>' + [
          "Please submit an issue to " +
            "<a href='https://github.com/boocx2/Subledger_JS_Library/issues'>https://github.com/boocx2/Subledger_JS_Library/issues</a> " +
            "with the information below and the failing tests.",
          "",
          "Date.prototype.toString = " + (new Date()).toString(),
          "Date.prototype.toLocaleString = " + (new Date()).toLocaleString(),
          "Date.prototype.getTimezoneOffset = " + (new Date(1000)).getTimezoneOffset(),
          "navigator.userAgent = " + navigator.userAgent
        ].join("<br/>") + '</pre>';

      if (failures) {
        banner.after('<p>' + [
          "Hmm, looks like some of the unit tests are failing.",
          "It's hard to catch all the bugs across all browsers, so if you have a minute, " +
            "please submit an issue with the failing test and the info below. Thanks!",
          toStr].join('</p><p>') + '</p>');
      } else {
        banner.after("<p class='success'>Awesome, all the unit tests passed!</p>");
      }

      updateTotals(assertions.passes(), failures);
		}
	});

	tests.on('click', 'li.test', function(){
		$(this).toggleClass('open');
	});
})();
