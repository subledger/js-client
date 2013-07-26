/*!
 * Subledger v1.0.0-beta1 - JavaScript library for Subledger
 * http://subledger.com
 *
 * Copyright (c) 2013 Subledger
 * Released under MIT license
 * https://github.com/boocx2/Subledger_JS_Library/blob/master/LICENSE.txt
 */ 
(function (exports) {


  /**
   * Create a new Subledger connection
   * @param {String} url The account URL to connect to the Subledger API
   * @example
   * var subledger = new Subledger('https://mySubledgerAccount.api.boocx.com/v1');
   * @constructor
   */
  var Subledger = function (url) {
    this.url = url ? helpers.removeTrailingSlash(url) : '';
  };


  /**
   * subledger.book()
   * @param {String} [book_id]
   * @returns {Object} Return Subledger Book Methods
   */
  Subledger.prototype.book = function (book_id) {
    var subledger = this,
      url = subledger.url,
      book = {};

    url = url + '/books';


    /**
     * Get Subledger Book by calling "/books/{book_id}" with GET HTTP method or get Subledger Books by calling "/books" with GET HTTP method
     * @summary Get Subledger Book(s)
     * @param {Object} [param]
     * @param {String} [param.state=active]
     * @param {Number} [param.starting=0]
     * @param {Function} callback
     * @example
     * //Get a book
     * subledger.book('myBookId').get(function (error,apiRes){...});
     * //Get active books
     * subledger.book().get({'state':'active'},function (error,apiRes){...});
     * @returns {*} Return the API Response
     */
    book.get = function (param, callback) {
      if (helpers.isFunction(param)) {
        callback = param;
        param = {};
      }

      if (!book_id) {
        param.state = param.state ? param.state : 'active';
        param.starting = param.starting ? param.starting : 0;

        url = url + '?' + helpers.encodeQueryObj(param);
      }

      ajax.get(url, callback);
    };


    /**
     * Create Subledger Book by calling "/books" with POST HTTP method
     * @summary Create Subledger Book
     * @param {Object} data
     * @param {Function} callback
     * @example
     * //Create a book
     * subledger.book().create({'description':'foo','reference':'bar'},function (error,apiRes){...});
     * @returns {*} Return the API Response
     */
    book.create = function (data, callback) {
      ajax.post(url, data, callback);
    };

    if (book_id) {
      url = url + '/' + book_id;


      /**
       * Update Subledger Book by calling "/books/{book_id}" with PATCH HTTP method
       * @summary Update Subledger Book
       * @param {Object} data
       * @param {Function} callback
       * @example
       * //Update a book
       * subledger.book('myBookId').update({'description':'baz'},function (error,apiRes){...});
       * @returns {*} Return the API Response
       */
      book.update = function (data, callback) {
        ajax.patch(url, data, callback);
      };


      /**
       * Activate Subledger Book by calling "/books/{book_id}/activate" with POST HTTP method
       * @summary Activate Subledger Book
       * @param {Function} callback
       * @example
       * //Activate a book
       * subledger.book('myBookId').activate(function (error,apiRes){...});
       * @returns {*} Return the API Response
       */
      book.activate = function (callback) {
        ajax.post(url + '/activate', callback);
      };


      /**
       * Archive Subledger Book by calling "/books/{book_id}/archive" with POST HTTP method
       * @summary Archive Subledger Book
       * @param {Function} callback
       * @example
       * //Archive a book
       * subledger.book('myBookId').archive(function (error,apiRes){...});
       * @returns {*} Return the API Response
       */
      book.archive = function (callback) {
        ajax.post(url + '/archive', callback);
      };


      /**
       * subledger.book('myBookId').account('myAccountId')
       * @param {String} [account_id]
       * @returns {Object} Return Subledger Book Account Methods
       */
      book.account = function (account_id) {
        var account = {};
        url = url + '/accounts';


        /**
         * Get Subledger Book Account by calling "/books/{book_id}/accounts/{account_id}" with GET HTTP method or get Subledger Book Accounts by calling "/books/{book_id}/accounts" with GET HTTP method
         * @summary Get Subledger Book Account(s)
         * @param {Object} [param]
         * @param {String} [param.state=active]
         * @param {Number} [param.starting=0]
         * @param {Function} callback
         * @example
         * //Get a book account
         * subledger.book('myBookId').account('myAccountId').get(function (error,apiRes){...});
         * //Get active book accounts
         * subledger.book('myBookId').account().get({'state':'active'},function (error,apiRes){...});
         * @returns {*} Return the API Response
         */
        account.get = function (param, callback) {
          if (helpers.isFunction(param)) {
            callback = param;
            param = {};
          }

          if (!account_id) {
            param.state = param.state ? param.state : 'active';
            param.starting = param.starting ? param.starting : 0;

            url = url + '?' + helpers.encodeQueryObj(param);
          }

          ajax.get(url, callback);
        };


        /**
         * Create Subledger Book Account by calling "/books/{book_id}/accounts" with POST HTTP method
         * @summary Create Subledger Book Account
         * @param {Object} data
         * @param {Function} callback
         * @example
         * //Create a book account
         * subledger.book('myBookId').account().create({'description':'foo','reference':'bar'},function (error,apiRes){...});
         * @returns {*} Return the API Response
         */
        account.create = function (data, callback) {
          ajax.post(url, data, callback);
        };

        if (account_id) {
          url = url + '/' + account_id;


          /**
           * Update Subledger Book Account by calling "/books/{book_id}/accounts/{account_id}" with PATCH HTTP method
           * @summary Update Subledger Book Account
           * @param {Object} data
           * @param {Function} callback
           * @example
           * //Update a book account
           * subledger.book('myBookId').account('myAccountId').create({'description':'baz'},function (error,apiRes){...});
           * @returns {*} Return the API Response
           */
          account.update = function (data, callback) {
            ajax.patch(url, data, callback);
          };


          /**
           * Activate Subledger Book Account by calling "/books/{book_id}/accounts/{account_id}/activate" with POST HTTP method
           * @summary Activate Subledger Book Account
           * @param {Function} callback
           * @example
           * //Activate a book account
           * subledger.book('myBookId').account('myAccountId').activate(function (error,apiRes){...});
           * @returns {*} Return the API Response
           */
          account.activate = function (callback) {
            ajax.post(url + '/activate', callback);
          };


          /**
           * Archive Subledger Book Account by calling "/books/{book_id}/accounts/{account_id}/archive" with POST HTTP method
           * @summary Archive Subledger Book Account
           * @param {Function} callback
           * @example
           * //Archive a book account
           * subledger.book('myBookId').account('myAccountId').archive(function (error,apiRes){...});
           * @returns {*} Return the API Response
           */
          account.archive = function (callback) {
            ajax.post(url + '/archive', callback);
          };


          /**
           * Get Subledger Book Account Balance by calling "/books/{book_id}/accounts/{account_id}/balance" with GET HTTP method
           * @summary Get Subledger Book Account Balance
           * @param {Object} [param]
           * @param {String} [param.at=new Date().toISOString()]
           * @param {Function} callback
           * @example
           * //Get a book account balance at July 23, 2013, 20:00 (UTC)
           * subledger.book('myBookId').account('myAccountId').balance({'at':'2013-07-23T22:00:26.111Z'},function (error,apiRes){...});
           * @returns {*} Return the API Response
           */
          account.balance = function (param, callback) {
            if (helpers.isFunction(param)) {
              callback = param;
              param = {};
            }

            param.at = param.at ? param.at : new Date().toISOString();

            ajax.get(url + '/balance?' + helpers.encodeQueryObj(param), callback);
          };


          /**
           * subledger.book('myBookId').account('myAccountId').line('myLineId')
           * @param {String} [line_id]
           * @returns {Object} Return Subledger Book Account Line Methods
           */
          account.line = function (line_id) {
            var line = {};
            url = url + '/lines';


            /**
             * Get Subledger Book Account Line or by calling "/books/{book_id}/accounts/{account_id}/lines/{line_id}" with GET HTTP method get Subledger Book Account Lines by calling "/books/{book_id}/accounts/{account_id}/lines" with GET HTTP method
             * @summary Get Subledger Book Account Line(s)
             * @param {Object} [param]
             * @param {Number} [param.starting=0]
             * @param {Function} callback
             * @example
             * //Get a book account line
             * subledger.book('myBookId').account('myAccountId').line('myLineId').get(function (error,apiRes){...});
             * //Get book account lines starting at 0
             * subledger.book('myBookId').account('myAccountId').line().get({'starting':0},function (error,apiRes){...});
             * @returns {*} Return the API Response
             */
            line.get = function (param, callback) {
              if (helpers.isFunction(param)) {
                callback = param;
                param = {};
              }

              if (!line_id) {
                param.before = param.before ? param.before : new Date().toISOString();

                url = url + '?' + helpers.encodeQueryObj(param);
              }

              ajax.get(url, callback);
            };

            if (line_id) {
              url = url + '/' + line_id;
            }

            return line;
          };
        }

        return account;
      };


      /**
       * subledger.book('myBookId').journalEntry('myJournalEntryId')
       * @param {String} [journal_entry_id]
       * @returns {Object} Return Subledger Book Journal-Entry Methods
       */
      book.journalEntry = function (journal_entry_id) {
        var journalEntry = {};
        url = url + '/journal_entries';


        /**
         * Get Subledger Book Journal-Entry by calling "/books/{book_id}/journal_entries/{journal_entry_id}" with GET HTTP method or get Subledger Book Journal-Entries by calling "/books/{book_id}/journal_entries" with GET HTTP method
         * @summary Get Subledger Book Journal-Entry(ies)
         * @param {Object} [param]
         * @param {String} [param.before=new Date().toISOString()]
         * @param {String} [param.state=active]
         * @param {Function} callback
         * @example
         * //Get a book journal-entry
         * subledger.book('myBookId').journalEntry('myJournalEntryId').get(function (error,apiRes){...});
         * //Get book journal-entries before July 23, 2013, 20:00 (UTC)
         * subledger.book('myBookId').journalEntry().get({'before':'2013-07-23T22:00:26.111Z'},function (error,apiRes){...});
         * @returns {*} Return the API Response
         */
        journalEntry.get = function (param, callback) {
          if (helpers.isFunction(param)) {
            callback = param;
            param = {};
            param.before = new Date().toISOString();
          }

          if (!journal_entry_id) {
            param.state = param.state ? param.state : 'active';

            url = url + '?' + helpers.encodeQueryObj(param);
          }

          ajax.get(url, callback);
        };


        /**
         * Create Subledger Book Journal-Entry by calling "/books/{book_id}/journal_entries" with POST HTTP method
         * @summary Create Subledger Book Journal-Entry
         * @param {Object} data
         * @param {Function} callback
         * @example
         * //Create a book journal-entry
         * subledger.book('myBookId').journalEntry().create({'description':'foo','reference':'bar'},function (error,apiRes){...});
         * @returns {*} Return the API Response
         */
        journalEntry.create = function (data, callback) {
          ajax.post(url, data, callback);
        };


        /**
         * Create and Post Subledger Book Journal-Entry by calling "/books/{book_id}/journal_entries/create_and_post" with POST HTTP method
         * @summary Create and Post Subledger Book Journal-Entry
         * @param {Object} data
         * @param {Function} callback
         * @example
         * //Create and post a book journal-entry
         * subledger.book('myBookId').journalEntry().createAndPost({...},function (error,apiRes){...});
         * @returns {*} Return the API Response
         */
        journalEntry.createAndPost = function (data, callback) {
          ajax.post(url + '/create_and_post', data, callback);
        };


        if (journal_entry_id) {
          url = url + '/' + journal_entry_id;


          /**
           * Post Subledger Book Journal-Entry by calling "/books/{book_id}/journal_entries/{journal_entry_id}" with POST HTTP method
           * @summary Post Subledger Book Journal-Entry
           * @param {Function} callback
           * @example
           * //Post a book journal-entry
           * subledger.book('myBookId').journalEntry('myJournalEntryId').post(function (error,apiRes){...});
           * @returns {*} Return the API Response
           */
          journalEntry.post = function (callback) {
            ajax.post(url, callback);
          };


          /**
           * Update Subledger Book Journal-Entry by calling "/books/{book_id}/journal_entries/{journal_entry_id}" with PATCH HTTP method
           * @summary Update Subledger Book Journal-Entry
           * @param {Object} data
           * @param {Function} callback
           * @example
           * //Update a book journal-entry
           * subledger.book('myBookId').journalEntry('myJournalEntryId').update({'description':'baz'},function (error,apiRes){...});
           * @returns {*} Return the API Response
           */
          journalEntry.update = function (data, callback) {
            ajax.patch(url, data, callback);
          };


          /**
           * Activate Subledger Book Journal-Entry by calling "/books/{book_id}/journal_entries/{journal_entry_id}/activate" with POST HTTP method
           * @summary Activate Subledger Book Journal-Entry
           * @param {Function} callback
           * @example
           * //Activate a book journal-entry
           * subledger.book('myBookId').journalEntry('myJournalEntryId').activate(function (error,apiRes){...});
           * @returns {*} Return the API Response
           */
          journalEntry.activate = function (callback) {
            ajax.post(url + '/activate', callback);
          };


          /**
           * Archive Subledger Book Journal-Entry by calling "/books/{book_id}/journal_entries/{journal_entry_id}/archive" with POST HTTP method
           * @summary Archive Subledger Book Journal-Entry
           * @param {Function} callback
           * @example
           * //Archive a book journal-entry
           * subledger.book('myBookId').journalEntry('myJournalEntryId').archive(function (error,apiRes){...});
           * @returns {*} Return the API Response
           */
          journalEntry.archive = function (callback) {
            ajax.post(url + '/archive', callback);
          };


          /**
           * Get Subledger Book Journal-Entry Balance by calling "/books/{book_id}/journal_entries/{journal_entry_id}/balance" with GET HTTP method
           * @summary Get Subledger Book Journal-Entry Balance
           * @param {Function} callback
           * @example
           * //Get a book journal-entry balance
           * subledger.book('myBookId').journalEntry('myJournalEntryId').balance(function (error,apiRes){...});
           * @returns {*} Return the API Response
           */
          journalEntry.balance = function (callback) {
            ajax.post(url + '/balance', callback);
          };


          /**
           * Get Subledger Book Journal-Entry Progress by calling "/books/{book_id}/journal_entries/{journal_entry_id}/progress" with GET HTTP method
           * @summary Get Subledger Book Journal-Entry Progress
           * @param {Function} callback
           * @example
           * //Get a book journal-entry progress
           * subledger.book('myBookId').journalEntry('myJournalEntryId').progress(function (error,apiRes){...});
           * @returns {*} Return the API Response
           */
          journalEntry.progress = function (callback) {
            ajax.get(url + '/progress', callback);
          };


          /**
           * subledger.book('myBookId').journalEntry('myJournalEntryId').line('myLineId')
           * @param {String} [line_id]
           * @returns {Object} Return Subledger Book Journal-Entry Line Methods
           */
          journalEntry.line = function (line_id) {
            var line = {};


            /**
             * Get Subledger Book Journal-Entry Line by calling "/books/{book_id}/journal_entries/{journal_entry_id}/lines/{line_id}" with GET HTTP method or get Subledger Book Journal-Entry Lines by calling "/books/{book_id}/journal_entries/{journal_entry_id}/lines" with GET HTTP method
             * @summary Get Subledger Book Journal-Entry Line(s)
             * @param {Object} [param]
             * @param {Number} [param.starting=0]
             * @param {String} [param.state=active]
             * @param {Function} callback
             * @example
             * //Get a book journal-entry line
             * subledger.book('myBookId').journalEntry('myJournalEntryId').line('myLineId').get(function (error,apiRes){...});
             * //Get book journal-entry lines starting at 0
             * subledger.book('myBookId').journalEntry('myJournalEntryId').line().get({'starting':0},function (error,apiRes){...});
             * @returns {*} Return the API Response
             */
            line.get = function (param, callback) {
              if (helpers.isFunction(param)) {
                callback = param;
                param = {};
              }

              if (!line_id) {
                param.before = param.starting ? param.starting : new Date().toISOString();
                param.state = param.state ? param.state : 'active';

                url = url + '/lines?' + helpers.encodeQueryObj(param);
              }

              ajax.get(url, callback);
            };


            /**
             * Create Subledger Book Journal-Entry Line by calling "/books/{book_id}/journal_entries/{journal_entry_id}/create_line" with POST HTTP method
             * @summary Create Subledger Book Journal-Entry Line
             * @param {Object} data
             * @param {Function} callback
             * @example
             * //Create a book journal-entry line
             * subledger.book('myBookId').journalEntry('myJournalEntryId').line().create({...},function (error,apiRes){...});
             * @returns {*} Return the API Response
             */
            line.create = function (data, callback) {
              ajax.post(url + '/create_line', data, callback);
            };

            if (line_id) {
              url = url + '/lines' + line_id;


              /**
               * Update Subledger Book Journal-Entry Line by calling "/books/{book_id}/journal_entries/{journal_entry_id}/lines/{line_id}" with PATCH HTTP method
               * @summary Update Subledger Book Journal-Entry Line
               * @param {Object} data
               * @param {Function} callback
               * @example
               * //Update a book journal-entry line
               * subledger.book('myBookId').journalEntry('myJournalEntryId').line('myLineId').update({...},function (error,apiRes){...});
               * @returns {*} Return the API Response
               */
              line.update = function (data, callback) {
                ajax.patch(url, data, callback);
              };


              /**
               * Activate Subledger Book Journal-Entry Line by calling "/books/{book_id}/journal_entries/{journal_entry_id}/lines/{line_id}/activate" with POST HTTP method
               * @summary Activate Subledger Book Journal-Entry Line
               * @param {Function} callback
               * @example
               * //Activate a book journal-entry line
               * subledger.book('myBookId').journalEntry('myJournalEntryId').line('myLineId').activate(function (error,apiRes){...});
               * @returns {*} Return the API Response
               */
              line.activate = function (callback) {
                ajax.post(url + '/activate', callback);
              };


              /**
               * Archive Subledger Book Journal-Entry Line by calling "/books/{book_id}/journal_entries/{journal_entry_id}/lines/{line_id}/archive" with POST HTTP method
               * @summary Archive Subledger Book Journal-Entry Line
               * @param {Function} callback
               * @example
               * //Archive a book journal-entry line
               * subledger.book('myBookId').journalEntry('myJournalEntryId').line('myLineId').archive(function (error,apiRes){...});
               * @returns {*} Return the API Response
               */
              line.archive = function (callback) {
                ajax.post(url + '/archive', callback);
              };
            }

          };
        }

        return journalEntry;
      };
    }

    return book;
  };


  /**
   * Helpers
   */
  var helpers = {
    'isArray': Array.isArray || function (obj) {
      return toString.call(obj) === '[object Array]';
    },
    'isObject': function (obj) {
      return toString.call(obj) === '[object Object]';
    },
    'isFunction': function (obj) {
      return !!(obj && obj.constructor && obj.call && obj.apply);
    },
    'encodeQueryObj': function (obj) {
      var query = [];
      for (var k in obj) {
        query.push(encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]));
      }
      return query.join('&');
    },
    'removeTrailingSlash': function (str) {
      return str.replace(/\/*$/, '');
    }
  };

  /**
   * Ajax
   */
  var ajax = (function () {
    function Promise() {
      this._callbacks = [];
    }

    Promise.prototype.then = function (func, context) {
      var p;
      if (this._isdone) {
        p = func.apply(context, this.result);
      } else {
        p = new Promise();
        this._callbacks.push(function () {
          var res = func.apply(context, arguments);
          if (res && typeof res.then === 'function') {
            res.then(p.done, p);
          }
        });
      }
      return p;
    };

    Promise.prototype.done = function () {
      this.result = arguments;
      this._isdone = true;
      for (var i = 0; i < this._callbacks.length; i++) {
        this._callbacks[i].apply(null, arguments);
      }
      this._callbacks = [];
    };

    /*
     * AJAX requests
     */
    function _encode(data) {
      var result = "";
      if (typeof data === "string") {
        result = data;
      } else {
        var e = encodeURIComponent;
        for (var k in data) {
          if (data.hasOwnProperty(k)) {
            result += '&' + e(k) + '=' + e(data[k]);
          }
        }
      }
      return result;
    }

    function new_xhr() {
      var xhr;
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        try {
          xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
      }
      return xhr;
    }


    function ajax(method, url, data, headers) {
      var p = new Promise();
      var xhr, payload;
      data = data || {};
      headers = headers || {};

      try {
        xhr = new_xhr();
      } catch (e) {
        p.done(promise.ENOXHR, "");
        return p;
      }

      payload = _encode(data);
      if (method === 'GET' && payload) {
        url += '?' + payload;
        payload = null;
      }

      xhr.open(method, url);
      xhr.setRequestHeader('Content-type',
        'application/x-www-form-urlencoded');
      for (var h in headers) {
        if (headers.hasOwnProperty(h)) {
          xhr.setRequestHeader(h, headers[h]);
        }
      }

      function onTimeout() {
        xhr.abort();
        p.done(promise.ETIMEOUT, "", xhr);
      }

      var timeout = promise.ajaxTimeout;
      if (timeout) {
        var tid = setTimeout(onTimeout, timeout);
      }

      xhr.onreadystatechange = function () {
        if (timeout) {
          clearTimeout(tid);
        }
        if (xhr.readyState === 4) {
          var err = (!xhr.status ||
            (xhr.status < 200 || xhr.status >= 300) &&
              xhr.status !== 304);
          p.done(err, xhr.responseText, xhr);
        }
      };

      xhr.send(payload);
      return p;
    }

    function _ajaxer(method) {
      return function (url, data, headers) {
        return ajax(method, url, data, headers);
      };
    }

    var promise = {
      get: _ajaxer('GET'),
      post: _ajaxer('POST'),
      put: _ajaxer('PUT'),
      patch: _ajaxer('PATCH'),
      del: _ajaxer('DELETE'),
      ENOXHR: 1,
      ETIMEOUT: 2,
      ajaxTimeout: 0
    };

    function resHandling(err, data) {
      var res = {};

      res.data = JSON.parse(data);
      res.err = err ? new Error(res.data.exception || '') : null;

      return res;
    }

    var ajaxInterface = {
      get: function (url, callback) {
        promise.get(url).then(function (err, data) {
          data = resHandling(err, data);
          return (callback(data.err, data.data));
        });
      },
      post: function (url, data, callback) {
        if (helpers.isFunction(data)) {
          callback = data;
          data = {};
        }
        promise.post(url, data).then(function (err, data) {
          data = resHandling(err, data);
          return (callback(data.err, data.data));
        });
      },
      put: function (url, data, callback) {
        if (helpers.isFunction(data)) {
          callback = data;
          data = {};
        }
        promise.put(url, data).then(function (err, data) {
          data = resHandling(err, data);
          return (callback(data.err, data.data));
        });
      },
      patch: function (url, data, callback) {
        if (helpers.isFunction(data)) {
          callback = data;
          data = {};
        }
        promise.patch(url, data).then(function (err, data) {
          data = resHandling(err, data);
          return (callback(data.err, data.data));
        });
      },
      del: function (url, callback) {
        promise.del(url).then(function (err, data) {
          data = resHandling(err, data);
          return (callback(data.err, data.data));
        });
      }
    };

    return ajaxInterface;
  })();

  /**
   * Add toISOString() method to Date object if ECMAScript is older than 5.1
   */
  if (!Date.prototype.toISOString) {
    Date.prototype.toISOString = function () {
      function pad(n) {
        return n < 10 ? '0' + n : n;
      }

      return this.getUTCFullYear() + '-' +
        pad(this.getUTCMonth() + 1) + '-' +
        pad(this.getUTCDate()) + 'T' +
        pad(this.getUTCHours()) + ':' +
        pad(this.getUTCMinutes()) + ':' +
        pad(this.getUTCSeconds()) + 'Z';
    };
  }

  exports.Subledger = Subledger;
})(this);

//TODO : ADD & Include JSON2.js into Subledger (support JSON.parse in IE6)