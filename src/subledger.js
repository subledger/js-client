/*jslint nomen: true*/
(function (exports) {

  // Local variables
  var Subledger, helpers, Ajax, Base64;

  /**
   * Create a new Subledger connection
   * @example
   * var subledger = new Subledger();
   * @constructor
   */
  Subledger = function () {
    this.url = 'https://api.subledger.com/v2';
    this.oauth_consumer_key = null;
    this.oauth_consumer_secret = null;
    this._ajax = new Ajax();
  };


  /**
   * Sets the OAuth consumer key and secret
   * @param {string} key
   * @param {string} secret
   * @return {void}
   */
  Subledger.prototype.setCredentials = function (key, secret) {
    var subledger = this;

    subledger.oauth_consumer_key = key;
    subledger.oauth_consumer_secret = secret;
    subledger._ajax.setCredentials(subledger.oauth_consumer_key, subledger.oauth_consumer_secret);
  };


  /**
   * subledger.identity()
   * @returns {Object} Return Subledger Identity Methods
   */
  Subledger.prototype.identity = function (identity_id) {
    var subledger = this,
      url = subledger.url,
      identity = {},
      ajax = subledger._ajax;

    url = url + '/identities';


    /**
     * Create Subledger Identity by calling "/identities" with POST HTTP method
     * @summary Create Subledger Identity
     * @param {Object} data
     * @param {Function} callback
     * @example
     * //Create an identity
     * subledger.identity().create({...},function (error, response) {...});
     * @returns {*} Return the API Response
     */
    identity.create = function (data, callback) {
      ajax.post(url, data, callback);
    };

    if (identity_id && subledger.oauth_consumer_key !== null && subledger.oauth_consumer_secret !== null) {
      url = url + '/' + identity_id;

      /**
       * Get Subledger Identity by calling "/identities/{identity_id}" with GET HTTP method
       * @summary Get Subledger Identity
       * @param {Function} callback
       * @example
       * //Get an identity
       * subledger.identity('myIdentityId').get(function (error, response) {...});
       * @returns {*} Return the API Response
       */
      identity.get = function (callback) {
        ajax.get(url, callback);
      };


      /**
       * Update Subledger Identity by calling "/identities/{identity_id}" with PATCH HTTP method
       * @summary Update Subledger Identity
       * @param {Object} data
       * @param {Function} callback
       * @example
       * //Update an identity
       * subledger.identity('myIdentityId').update({...},function (error, response) {...});
       * @returns {*} Return the API Response
       */
      identity.update = function (data, callback) {
        ajax.patch(url, data, callback);
      };


      /**
       * subledger.identity('identity_id').key('myKeyId')
       * @param {String} [key_id]
       * @returns {Object} Return Subledger Identity Key Methods
       */
      identity.key = function (key_id) {
        var key = {};
        url = url + '/keys';


        /**
         * Create Subledger Identity Key by calling "/identities/{identity_id}/keys" with POST HTTP method
         * @summary Create Subledger Identity Key
         * @param {Object} data
         * @param {Function} callback
         * @example
         * //Create an identity key
         * subledger.identity('myIdentityId').key().create([{...}], function (error, response) {...});
         * @returns {*} Return the API Response
         */
        key.create = function (data, callback) {
          if (helpers.isFunction(data)) {
            callback = data;
            data = {};
          }
          ajax.post(url, data, callback);
        };

        if (key_id) {
          url = url + '/' + key_id;


          /**
           * Get Subledger Identity Key by calling "/identities/{identity_id}/keys/{key_id}" with GET HTTP method
           * @summary Get Subledger Identity Key
           * @param {Function} callback
           * @example
           * //Get an identity key
           * subledger.identity('myIdentityId').key('myKeyId').get(function (error, response) {...});
           * @returns {*} Return the API Response
           */
          key.get = function (callback) {
            ajax.get(url, callback);
          };


          /**
           * Activate Subledger Identity Key by calling "/identities/{identity_id}/keys/{key_id}/activate" with POST HTTP method
           * @summary Activate Identity Key
           * @param {Function} callback
           * @example
           * //Activate an identity key
           * subledger.identity('myIdentityId').key('myKeyId').activate(function (error, response) {...});
           * @returns {*} Return the API Response
           */
          key.activate = function (callback) {
            ajax.post(url + '/activate', callback);
          };


          /**
           * Archive Subledger Identity Key by calling "/identities/{identity_id}/keys/{key_id}/archive" with POST HTTP method
           * @summary Archive Identity Key
           * @param {Function} callback
           * @example
           * //Archive an identity key
           * subledger.identity('myIdentityId').key('myKeyId').archive(function (error, response) {...});
           * @returns {*} Return the API Response
           */
          key.archive = function (callback) {
            ajax.post(url + '/archive', callback);
          };
        }
        return key;
      };
    }
    return identity;
  };


  /**
   * subledger.organization()
   * @returns {Object} Return Subledger Organization Methods
   */
  Subledger.prototype.organization = function (org_id) {
    var subledger = this,
      url = subledger.url,
      organization = {},
      ajax = subledger._ajax;

    url = url + '/orgs';

    if (subledger.oauth_consumer_key !== null && subledger.oauth_consumer_secret !== null) {
      /**
       * Create Subledger Organization by calling "/orgs" with POST HTTP method
       * @summary Create Subledger Organization
       * @param {Object} data
       * @param {Function} callback
       * @example
       * //Create an organization
       * subledger.organization().create({...},function (error, response) {...});
       * @returns {*} Return the API Response
       */
      organization.create = function (data, callback) {
        ajax.post(url, data, callback);
      };

      if (org_id) {
        url = url + '/' + org_id;


        /**
         * Get Subledger Organization by calling "/orgs/{org_id}" with GET HTTP method
         * @summary Get Subledger Organization
         * @param {Function} callback
         * @example
         * //Get an organization
         * subledger.organization('myOrganizationId').get(function (error, response) {...});
         * @returns {*} Return the API Response
         */
        organization.get = function (callback) {
          ajax.get(url, callback);
        };


        /**
         * Update Subledger Organization by calling "/orgs/{org_id}" with PATCH HTTP method
         * @summary Update Subledger Organization
         * @param {Object} data
         * @param {Function} callback
         * @example
         * //Update an organization
         * subledger.organization('myOrganizationId').update({...},function (error, response) {...});
         * @returns {*} Return the API Response
         */
        organization.update = function (data, callback) {
          ajax.patch(url, data, callback);
        };


        /**
         * Activate Subledger Organization by calling "/orgs/{org_id}/activate" with POST HTTP method
         * @summary Activate Subledger Organization
         * @param {Function} callback
         * @example
         * //Activate an organization
         * subledger.organization('myOrganizationId').activate(function (error, response) {...});
         * @returns {*} Return the API Response
         */
        organization.activate = function (callback) {
          ajax.post(url + '/activate', callback);
        };


        /**
         * Archive Subledger Organization by calling "/orgs/{org_id}/archive" with POST HTTP method
         * @summary Archive Subledger Organization
         * @param {Function} callback
         * @example
         * //Archive an organization
         * subledger.organization('myOrganizationId').archive(function (error, response) {...});
         * @returns {*} Return the API Response
         */
        organization.archive = function (callback) {
          ajax.post(url + '/archive', callback);
        };


        /**
         * subledger.organization(org_id).book()
         * @param {String} [book_id]
         * @returns {Object} Return Subledger Book Methods
         */
        organization.book = function (book_id) {
          var book = {};
          url = url + '/books';


          /**
           * Get Subledger Book by calling "/orgs/{org_id}/books/{book_id}" with GET HTTP method or get Subledger Books by calling "/books" with GET HTTP method
           * @summary Get Subledger Book(s)
           * @param {Object} [param]
           * @param {String} [param.state=active]
           * @param {String} [param.action=ending]
           * @param {String} [param.description=0xFF]
           * @param {Function} callback
           * @example
           * //Get a book
           * subledger.organization('myOrganizationId').book('myBookId').get(function (error, response) {...});
           * //Get active books
           * subledger.organization('myOrganizationId').book().get({'state':'active'},function (error, response) {...});
           * @returns {*} Return the API Response
           */
          book.get = function (param, callback) {
            if (helpers.isFunction(param)) {
              callback = param;
              param = {};
            }

            if (!book_id) {
              param.state = (param.state || 'active');
              param.action = (param.action || 'ending');

              if ((param.action === 'ending' || param.action === 'before') && !param.description) {
                param.description = 0xFF;

              } else if ((param.action === 'starting' || param.action === 'after') && !param.description) {
                param.description = 0x00;
              }

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
           * subledger.organization('myOrganizationId').book().create({...},function (error, response) {...});
           * @returns {*} Return the API Response
           */
          book.create = function (data, callback) {
            ajax.post(url, data, callback);
          };

          if (book_id) {
            url = url + '/' + book_id;


            /**
             * Update Subledger Book by calling "/orgs/{org_id}/books/{book_id}" with PATCH HTTP method
             * @summary Update Subledger Book
             * @param {Object} data
             * @param {Function} callback
             * @example
             * //Update a book
             * subledger.organization('myOrganizationId').book('myBookId').update({...},function (error, response) {...});
             * @returns {*} Return the API Response
             */
            book.update = function (data, callback) {
              ajax.patch(url, data, callback);
            };


            /**
             * Activate Subledger Book by calling "/orgs/{org_id}/books/{book_id}/activate" with POST HTTP method
             * @summary Activate Subledger Book
             * @param {Function} callback
             * @example
             * //Activate a book
             * subledger.organization('myOrganizationId').book('myBookId').activate(function (error, response) {...});
             * @returns {*} Return the API Response
             */
            book.activate = function (callback) {
              ajax.post(url + '/activate', callback);
            };


            /**
             * Archive Subledger Book by calling "/orgs/{org_id}/books/{book_id}/archive" with POST HTTP method
             * @summary Archive Subledger Book
             * @param {Function} callback
             * @example
             * //Archive a book
             * subledger.organization('myOrganizationId').book('myBookId').archive(function (error, response) {...});
             * @returns {*} Return the API Response
             */
            book.archive = function (callback) {
              ajax.post(url + '/archive', callback);
            };


            /**
             * subledger.organization('myOrganizationId').book('myBookId').account('myAccountId')
             * @param {String} [account_id]
             * @returns {Object} Return Subledger Book Account Methods
             */
            book.account = function (account_id) {
              var account = {};
              url = url + '/accounts';


              /**
               * Get Subledger Book Account by calling "/orgs/{org_id}/books/{book_id}/accounts/{account_id}" with GET HTTP method or get Subledger Book Accounts by calling "/orgs/{org_id}/books/{book_id}/accounts" with GET HTTP method
               * @summary Get Subledger Book Account(s)
               * @param {Object} [param]
               * @param {String} [param.state=active]
               * @param {String} [param.action=ending]
               * @param {String} [param.description=0xFF]
               * @param {Function} callback
               * @example
               * //Get a book account
               * subledger.organization('myOrganizationId').book('myBookId').account('myAccountId').get(function (error, response) {...});
               * //Get active book accounts
               * subledger.organization('myOrganizationId').book('myBookId').account().get({'state':'active'},function (error, response) {...});
               * @returns {*} Return the API Response
               */
              account.get = function (param, callback) {
                if (helpers.isFunction(param)) {
                  callback = param;
                  param = {};
                }

                if (!account_id) {
                  param.state = (param.state || 'active');
                  param.action = (param.action || 'ending');

                  if ((param.action === 'ending' || param.action === 'before') && !param.description) {
                    param.description = 0xFF;

                  } else if ((param.action === 'starting' || param.action === 'after') && !param.description) {
                    param.description = 0x00;
                  }

                  url = url + '?' + helpers.encodeQueryObj(param);
                }

                ajax.get(url, callback);
              };


              /**
               * Create Subledger Book Account by calling "/orgs/{org_id}/books/{book_id}/accounts" with POST HTTP method
               * @summary Create Subledger Book Account
               * @param {Object} data
               * @param {Function} callback
               * @example
               * //Create a book account
               * subledger.organization('myOrganizationId').book('myBookId').account().create({...},function (error, response) {...});
               * @returns {*} Return the API Response
               */
              account.create = function (data, callback) {
                ajax.post(url, data, callback);
              };

              if (account_id) {
                url = url + '/' + account_id;


                /**
                 * Update Subledger Book Account by calling "/orgs/{org_id}/books/{book_id}/accounts/{account_id}" with PATCH HTTP method
                 * @summary Update Subledger Book Account
                 * @param {Object} data
                 * @param {Function} callback
                 * @example
                 * //Update a book account
                 * subledger.organization('myOrganizationId').book('myBookId').account('myAccountId').create({...},function (error, response) {...});
                 * @returns {*} Return the API Response
                 */
                account.update = function (data, callback) {
                  ajax.patch(url, data, callback);
                };


                /**
                 * Activate Subledger Book Account by calling "/orgs/{org_id}/books/{book_id}/accounts/{account_id}/activate" with POST HTTP method
                 * @summary Activate Subledger Book Account
                 * @param {Function} callback
                 * @example
                 * //Activate a book account
                 * subledger.organization('myOrganizationId').book('myBookId').account('myAccountId').activate(function (error, response) {...});
                 * @returns {*} Return the API Response
                 */
                account.activate = function (callback) {
                  ajax.post(url + '/activate', callback);
                };


                /**
                 * Archive Subledger Book Account by calling "/orgs/{org_id}/books/{book_id}/accounts/{account_id}/archive" with POST HTTP method
                 * @summary Archive Subledger Book Account
                 * @param {Function} callback
                 * @example
                 * //Archive a book account
                 * subledger.organization('myOrganizationId').book('myBookId').account('myAccountId').archive(function (error, response) {...});
                 * @returns {*} Return the API Response
                 */
                account.archive = function (callback) {
                  ajax.post(url + '/archive', callback);
                };


                /**
                 * Get Subledger Book Account Balance by calling "/orgs/{org_id}/books/{book_id}/accounts/{account_id}/balance" with GET HTTP method
                 * @summary Get Subledger Book Account Balance
                 * @param {Object} [param]
                 * @param {String} [param.at=new Date().toISOString()]
                 * @param {Function} callback
                 * @example
                 * //Get a book account balance at July 23, 2013, 20:00 (UTC)
                 * subledger.organization('myOrganizationId').book('myBookId').account('myAccountId').balance({'at':'2013-07-23T22:00:26.111Z'},function (error, response) {...});
                 * @returns {*} Return the API Response
                 */
                account.balance = function (param, callback) {
                  if (helpers.isFunction(param)) {
                    callback = param;
                    param = {};
                  }

                  param.at = (param.at || new Date().toISOString());

                  ajax.get(url + '/balance?' + helpers.encodeQueryObj(param), callback);
                };

                /**
                 * subledger.organization('myOrganizationId').book('myBookId').account('myAccountId').line('myLineId')
                 * @param {String} [line_id]
                 * @returns {Object} Return Subledger Book Account Line Methods
                 */
                account.line = function (line_id) {
                  var line = {};
                  url = url + '/lines';


                  /**
                   * Get Subledger Book Account Line or by calling "/orgs/{org_id}/books/{book_id}/accounts/{account_id}/lines/{line_id}" with GET HTTP method get Subledger Book Account Lines by calling "/orgs/{org_id}/books/{book_id}/accounts/{account_id}/lines" with GET HTTP method
                   * @summary Get Subledger Book Account Line(s)
                   * @param {Object} [param]
                   * @param {String} [param.action=ending]
                   * @param {String} [param.effective_at=new Date().toISOString()]
                   * @param {Function} callback
                   * @example
                   * //Get a book account line
                   * subledger.organization('myOrganizationId').book('myBookId').account('myAccountId').line('myLineId').get(function (error, response) {...});
                   * //Get book account lines starting at beginning of time
                   * subledger.organization('myOrganizationId').book('myBookId').account('myAccountId').line().get({action: 'starting', effective_at: new Date(0).toISOString()},function (error, response) {...});
                   * @returns {*} Return the API Response
                   */
                  line.get = function (param, callback) {
                    if (helpers.isFunction(param)) {
                      callback = param;
                      param = {};
                    }

                    if (!line_id) {
                      param.action = (param.action || 'ending');
                      param.effective_at = (param.effective_at || new Date().toISOString());

                      url = url + '?' + helpers.encodeQueryObj(param);
                    }

                    ajax.get(url, callback);
                  };

                  if (line_id) {
                    url = url + '/' + line_id;
                  }

                  return line;
                };

                /**
                 * Get Subledger Book Account First and Last Lines by calling "/orgs/{org_id}/books/{book_id}/accounts/{account_id}/first_and_last_line" with GET HTTP method
                 * @summary Get Subledger Book Account First and Last Journal Entry Lines
                 * @param {Function} callback
                 * @example
                 * // Get a book account first and last journal entry lines
                 * subledger.organization('myOrganizationId').book('myBookId').account('myAccountId').firstAndLastLine(function (error, response) {...});
                 * @returns {*} Return the API Response
                 */
                account.firstAndLastLine = function (callback) {
                  ajax.get(url + '/first_and_last_line', callback);
                };
              }

              return account;
            };


            /**
             * subledger.organization('myOrganizationId').book('myBookId').journalEntry('myJournalEntryId')
             * @param {String} [journal_entry_id]
             * @returns {Object} Return Subledger Book Journal-Entry Methods
             */
            book.journalEntry = function (journal_entry_id) {
              var journalEntry = {};
              url = url + '/journal_entries';


              /**
               * Get Subledger Book Journal-Entry by calling "/orgs/{org_id}/books/{book_id}/journal_entries/{journal_entry_id}" with GET HTTP method or get Subledger Book Journal-Entries by calling "/orgs/{org_id}/books/{book_id}/journal_entries" with GET HTTP method
               * @summary Get Subledger Book Journal-Entry(ies)
               * @param {Object} [param]
               * @param {String} [param.state=active]
               * @param {String} [param.action=ending]
               * @param {String} [param.effective_at=new Date().toISOString()]
               * @param {Function} callback
               * @example
               * //Get a book journal-entry
               * subledger.organization('myOrganizationId').book('myBookId').journalEntry('myJournalEntryId').get(function (error, response) {...});
               * //Get book journal-entries before July 23, 2013, 20:00 (UTC)
               * subledger.organization('myOrganizationId').book('myBookId').journalEntry().get({action: 'before', effective_at: '2013-07-23T22:00:26.111Z'},function (error, response) {...});
               * @returns {*} Return the API Response
               */
              journalEntry.get = function (param, callback) {
                if (helpers.isFunction(param)) {
                  callback = param;
                  param = {};
                }

                if (!journal_entry_id) {
                  param.state = (param.state || 'active');
                  param.action = (param.action || 'ending');
                  param.effective_at = (param.effective_at || new Date().toISOString());

                  url = url + '?' + helpers.encodeQueryObj(param);
                }

                ajax.get(url, callback);
              };


              /**
               * Create Subledger Book Journal-Entry by calling "/orgs/{org_id}/books/{book_id}/journal_entries" with POST HTTP method
               * @summary Create Subledger Book Journal-Entry
               * @param {Object} data
               * @param {Function} callback
               * @example
               * //Create a book journal-entry
               * subledger.organization('myOrganizationId').book('myBookId').journalEntry().create({...},function (error, response) {...});
               * @returns {*} Return the API Response
               */
              // *********************************************
              // **** DEPRECATED as of v1.1.1 - 2015-08-09 ***
              // *********************************************
              journalEntry.create = function (data, callback) {
                console.warn('journalEntry().create() is deprecated and should be replaced with journalEntry().createAndPost().');
                ajax.post(url, data, callback);
              };


              /**
               * Create and Post Subledger Book Journal-Entry by calling "/orgs/{org_id}/books/{book_id}/journal_entries/create_and_post" with POST HTTP method
               * @summary Create and Post Subledger Book Journal-Entry
               * @param {Object} data
               * @param {Function} callback
               * @example
               * //Create and post a book journal-entry
               * subledger.organization('myOrganizationId').book('myBookId').journalEntry().createAndPost({...},function (error, response) {...});
               * @returns {*} Return the API Response
               */
              journalEntry.createAndPost = function (data, callback) {
                ajax.post(url + '/create_and_post', data, callback);
              };


              if (journal_entry_id) {
                url = url + '/' + journal_entry_id;


                /**
                 * Post Subledger Book Journal-Entry by calling "/orgs/{org_id}/books/{book_id}/journal_entries/{journal_entry_id}" with POST HTTP method
                 * @summary Post Subledger Book Journal-Entry
                 * @param {Function} callback
                 * @example
                 * //Post a book journal-entry
                 * subledger.organization('myOrganizationId').book('myBookId').journalEntry('myJournalEntryId').post(function (error, response) {...});
                 * @returns {*} Return the API Response
                 */
                journalEntry.post = function (callback) {
                  ajax.post(url, callback);
                };


                /**
                 * Update Subledger Book Journal-Entry by calling "/orgs/{org_id}/books/{book_id}/journal_entries/{journal_entry_id}" with PATCH HTTP method
                 * @summary Update Subledger Book Journal-Entry
                 * @param {Object} data
                 * @param {Function} callback
                 * @example
                 * //Update a book journal-entry
                 * subledger.organization('myOrganizationId').book('myBookId').journalEntry('myJournalEntryId').update({...},function (error, response) {...});
                 * @returns {*} Return the API Response
                 */
                // *********************************************
                // **** DEPRECATED as of v1.1.1 - 2015-08-09 ***
                // *********************************************
                journalEntry.update = function (data, callback) {
                  console.warn('journalEntry().update() is deprecated and should not be used.');
                  ajax.patch(url, data, callback);
                };


                /**
                 * Activate Subledger Book Journal-Entry by calling "/orgs/{org_id}/books/{book_id}/journal_entries/{journal_entry_id}/activate" with POST HTTP method
                 * @summary Activate Subledger Book Journal-Entry
                 * @param {Function} callback
                 * @example
                 * //Activate a book journal-entry
                 * subledger.organization('myOrganizationId').book('myBookId').journalEntry('myJournalEntryId').activate(function (error, response) {...});
                 * @returns {*} Return the API Response
                 */
                journalEntry.activate = function (callback) {
                  ajax.post(url + '/activate', callback);
                };


                /**
                 * Archive Subledger Book Journal-Entry by calling "/orgs/{org_id}/books/{book_id}/journal_entries/{journal_entry_id}/archive" with POST HTTP method
                 * @summary Archive Subledger Book Journal-Entry
                 * @param {Function} callback
                 * @example
                 * //Archive a book journal-entry
                 * subledger.organization('myOrganizationId').book('myBookId').journalEntry('myJournalEntryId').archive(function (error, response) {...});
                 * @returns {*} Return the API Response
                 */
                journalEntry.archive = function (callback) {
                  ajax.post(url + '/archive', callback);
                };


                /**
                 * Get Subledger Book Journal-Entry Balance by calling "/orgs/{org_id}/books/{book_id}/journal_entries/{journal_entry_id}/balance" with GET HTTP method
                 * @summary Get Subledger Book Journal-Entry Balance
                 * @param {Function} callback
                 * @example
                 * //Get a book journal-entry balance
                 * subledger.organization('myOrganizationId').book('myBookId').journalEntry('myJournalEntryId').balance(function (error, response) {...});
                 * @returns {*} Return the API Response
                 */
                // *********************************************
                // **** DEPRECATED as of v1.1.1 - 2015-08-09 ***
                // *********************************************
                journalEntry.balance = function (callback) {
                  console.warn('journalEntry().balance() is deprecated and should not be used.');
                  ajax.get(url + '/balance', callback);
                };


                /**
                 * Get Subledger Book Journal-Entry Progress by calling "/orgs/{org_id}/books/{book_id}/journal_entries/{journal_entry_id}/progress" with GET HTTP method
                 * @summary Get Subledger Book Journal-Entry Progress
                 * @param {Function} callback
                 * @example
                 * //Get a book journal-entry progress
                 * subledger.organization('myOrganizationId').book('myBookId').journalEntry('myJournalEntryId').progress(function (error, response) {...});
                 * @returns {*} Return the API Response
                 */
                journalEntry.progress = function (callback) {
                  ajax.get(url + '/progress', callback);
                };


                /**
                 * subledger.organization('myOrganizationId').book('myBookId').journalEntry('myJournalEntryId').line('myLineId')
                 * @param {String} [line_id]
                 * @returns {Object} Return Subledger Book Journal-Entry Line Methods
                 */
                journalEntry.line = function (line_id) {
                  var line = {};


                  /**
                   * Get Subledger Book Journal-Entry Line by calling "/orgs/{org_id}/books/{book_id}/journal_entries/{journal_entry_id}/lines/{line_id}" with GET HTTP method or get Subledger Book Journal-Entry Lines by calling "/orgs/{org_id}/books/{book_id}/journal_entries/{journal_entry_id}/lines" with GET HTTP method
                   * @summary Get Subledger Book Journal-Entry Line(s)
                   * @param {Object} [param]
                   * @param {String} [param.state=posted]
                   * @param {String} [param.action=starting]
                   * @param {Function} callback
                   * @example
                   * //Get a book journal-entry line
                   * subledger.organization('myOrganizationId').book('myBookId').journalEntry('myJournalEntryId').line('myLineId').get(function (error, response) {...});
                   * //Get book journal-entry lines in the order they were inserted
                   * subledger.organization('myOrganizationId').book('myBookId').journalEntry('myJournalEntryId').line().get({function (error, response) {...});
                   * @returns {*} Return the API Response
                   */
                  line.get = function (param, callback) {
                    if (helpers.isFunction(param)) {
                      callback = param;
                      param = {};
                    }

                    if (!line_id) {
                      param.state = (param.state || 'posted');
                      param.action = (param.action || 'starting');

                      url = url + '/lines?' + helpers.encodeQueryObj(param);
                    }

                    ajax.get(url, callback);
                  };


                  /**
                   * Create Subledger Book Journal-Entry Line by calling "/orgs/{org_id}/books/{book_id}/journal_entries/{journal_entry_id}/create_line" with POST HTTP method
                   * @summary Create Subledger Book Journal-Entry Line
                   * @param {Object} data
                   * @param {Function} callback
                   * @example
                   * //Create a book journal-entry line
                   * subledger.organization('myOrganizationId').book('myBookId').journalEntry('myJournalEntryId').line().create({...},function (error, response) {...});
                   * @returns {*} Return the API Response
                   */
                  // *********************************************
                  // **** DEPRECATED as of v1.1.1 - 2015-08-09 ***
                  // *********************************************
                  line.create = function (data, callback) {
                    console.warn('journalEntry().line().create() is deprecated and should not be used.');
                    ajax.post(url + '/create_line', data, callback);
                  };

                  if (line_id) {
                    url = url + '/lines/' + line_id;


                    /**
                     * Update Subledger Book Journal-Entry Line by calling "/orgs/{org_id}/books/{book_id}/journal_entries/{journal_entry_id}/lines/{line_id}" with PATCH HTTP method
                     * @summary Update Subledger Book Journal-Entry Line
                     * @param {Object} data
                     * @param {Function} callback
                     * @example
                     * //Update a book journal-entry line
                     * subledger.organization('myOrganizationId').book('myBookId').journalEntry('myJournalEntryId').line('myLineId').update({...},function (error, response) {...});
                     * @returns {*} Return the API Response
                     */
                    // *********************************************
                    // **** DEPRECATED as of v1.1.1 - 2015-08-09 ***
                    // *********************************************
                    line.update = function (data, callback) {
                      console.warn('journalEntry().line().update() is deprecated and should not be used.');
                      ajax.patch(url, data, callback);
                    };


                    /**
                     * Activate Subledger Book Journal-Entry Line by calling "/orgs/{org_id}/books/{book_id}/journal_entries/{journal_entry_id}/lines/{line_id}/activate" with POST HTTP method
                     * @summary Activate Subledger Book Journal-Entry Line
                     * @param {Function} callback
                     * @example
                     * //Activate a book journal-entry line
                     * subledger.organization('myOrganizationId').book('myBookId').journalEntry('myJournalEntryId').line('myLineId').activate(function (error, response) {...});
                     * @returns {*} Return the API Response
                     */
                    // *********************************************
                    // **** DEPRECATED as of v1.1.1 - 2015-08-09 ***
                    // *********************************************
                    line.activate = function (callback) {
                      console.warn('journalEntry().line().activate() is deprecated and should not be used.');
                      ajax.post(url + '/activate', callback);
                    };


                    /**
                     * Archive Subledger Book Journal-Entry Line by calling "/orgs/{org_id}/books/{book_id}/journal_entries/{journal_entry_id}/lines/{line_id}/archive" with POST HTTP method
                     * @summary Archive Subledger Book Journal-Entry Line
                     * @param {Function} callback
                     * @example
                     * //Archive a book journal-entry line
                     * subledger.organization('myOrganizationId').book('myBookId').journalEntry('myJournalEntryId').line('myLineId').archive(function (error, response) {...});
                     * @returns {*} Return the API Response
                     */
                    // *********************************************
                    // **** DEPRECATED as of v1.1.1 - 2015-08-09 ***
                    // *********************************************
                    line.archive = function (callback) {
                      console.warn('journalEntry().line().archive() is deprecated and should not be used.');
                      ajax.post(url + '/archive', callback);
                    };
                  }
                  return line;
                };
              }

              return journalEntry;
            };

            /**
             * subledger.organization('myOrganizationId').book('myBookId').category('myCategoryId')
             * @param {String} [category_id]
             * @returns {Object} Return Subledger Book Category Methods
             */
            book.category = function (category_id) {
              var category = {};
              url = url + "/categories";

              /**
               * Get Subledger Book Category by calling "/orgs/{org_id}/books/{book_id}/categories/{category_id}" with GET HTTP method or get Subledger Book Categories by calling "/orgs/{org_id}/books/{book_id}/categories" with GET HTTP method
               * @summary Get Subledger Book Category(ies)
               * @param {Object} [param]
               * @param {String} [param.state=active]
               * @param {String} [param.action=ending]
               * @param {String} [param.description=0xFF]
               * @param {Function} callback
               * @example
               * //Get a category
               * subledger.organization('myOrganizationId').book('myBookId').category('categoryId').get(function (error, response) {...});
               * //Get active book categories
               * subledger.organization('myOrganizationId').book('myBookId').category().get({'state':'active'},function (error, response) {...});
               * @returns {*} Return the API Response
               */
              category.get = function (param, callback) {
                if (helpers.isFunction(param)) {
                  callback = param;
                  param = {};
                }

                if (!category_id) {
                  param.state = (param.state || 'active');
                  param.action = (param.action || 'ending');

                  if ((param.action === 'ending' || param.action === 'before') && !param.description) {
                    param.description = 0xFF;

                  } else if ((param.action === 'starting' || param.action === 'after') && !param.description) {
                    param.description = 0x00;
                  }

                  url = url + '?' + helpers.encodeQueryObj(param);
                }

                ajax.get(url, callback);
              };

              /**
               * Create Subledger Book Category by calling "/orgs/{org_id}/books/{book_id}/categories" with POST HTTP method
               * @summary Create Subledger Book Category
               * @param {Object} data
               * @param {Function} callback
               * @example
               * //Create a book category
               * subledger.organization('myOrganizationId').book('myBookId').category().create({...},function (error, response) {...});
               * @returns {*} Return the API Response
               */
              category.create = function (data, callback) {
                ajax.post(url, data, callback);
              };

              if (category_id) {
                url = url + '/' + category_id;

                /**
                 * Update Subledger Book Category by calling "/orgs/{org_id}/books/{book_id}/categories/{category_id}" with PATCH HTTP method
                 * @summary Update Subledger Book Category
                 * @param {Object} data
                 * @param {Function} callback
                 * @example
                 * //Update a book category
                 * subledger.organization('myOrganizationId').book('myBookId').category('categoryId').create({...},function (error, response) {...});
                 * @returns {*} Return the API Response
                 */
                category.update = function (data, callback) {
                  ajax.patch(url, data, callback);
                };

                /**
                 * Attach Subledger Book Category to an Account by calling "/orgs/{org_id}/books/{book_id}/categories/{category_id}/attach" with POST HTTP method
                 * @summary Attach Subledger Book Category to an Account
                 * @param {Object} data
                 * @param {Function} callback
                 * @example
                 * //Attach a book category to an account
                 * subledger.organization('myOrganizationId').book('myBookId').category('categoryId').attach({account: 'accountId'},function (error, response) {...});
                 * @returns {*} Return the API Response
                 */
                category.attach = function (data, callback) {
                  ajax.post(url + '/attach', data, callback);
                };

                /**
                 * Detach Subledger Book Category from an Account by calling "/orgs/{org_id}/books/{book_id}/categories/{category_id}/detach" with POST HTTP method
                 * @summary Detach Subledger Book Category from an Account
                 * @param {Object} data
                 * @param {Function} callback
                 * @example
                 * //Detach a book category from an account
                 * subledger.organization('myOrganizationId').book('myBookId').category('categoryId').detach({account: 'accountId'},function (error, response) {...});
                 * @returns {*} Return the API Response
                 */
                category.detach = function (data, callback) {
                  ajax.post(url + '/detach', data, callback);
                };

                /**
                 * Archive Subledger Book Category by calling "/orgs/{org_id}/books/{book_id}/categories/{category_id}/archive" with POST HTTP method
                 * @summary Archive Subledger Book Category
                 * @param {Function} callback
                 * @example
                 * //Archive a book category
                 * subledger.organization('myOrganizationId').book('myBookId').category('categoryId').archive(function (error, response) {...});
                 * @returns {*} Return the API Response
                 */
                category.archive = function (callback) {
                  ajax.post(url + '/archive', callback);
                };

                /**
                 * Activate Subledger Book Category by calling "/orgs/{org_id}/books/{book_id}/categories/{category_id}/activate" with POST HTTP method
                 * @summary Activate Subledger Book Category
                 * @param {Function} callback
                 * @example
                 * //Activate a book category
                 * subledger.organization('myOrganizationId').book('myBookId').category('categoryId').activate(function (error, response) {...});
                 * @returns {*} Return the API Response
                 */
                category.activate = function (callback) {
                  ajax.post(url + '/activate', callback);
                };
              }

              return category;
            };

            /**
             * subledger.organization('myOrganizationId').book('myBookId').report('reportId')
             * @param {String} [report_id]
             * @returns {Object} Return Subledger Book Report Methods
             */
            book.report = function (report_id) {
              var report = {};
              url = url + "/reports";

              /**
               * Get Subledger Book Report by calling "/orgs/{org_id}/books/{book_id}/reports/{report_id}" with GET HTTP method or get Subledger Book Reports by calling "/orgs/{org_id}/books/{book_id}/reports" with GET HTTP method
               * @summary Get Subledger Book Report(s)
               * @param {Object} [param]
               * @param {String} [param.state=active]
               * @param {String} [param.action=ending]
               * @param {String} [param.description=0xFF]
               * @param {Function} callback
               * @example
               * //Get a book report
               * subledger.organization('myOrganizationId').book('myBookId').report('reportId').get(function (error, response) {...});
               * //Get active book reports
               * subledger.organization('myOrganizationId').book('myBookId').report().get({'state':'active'},function (error, response) {...});
               * @returns {*} Return the API Response
               */
              report.get = function (param, callback) {
                if (helpers.isFunction(param)) {
                  callback = param;
                  param = {};
                }

                if (!report_id) {
                  param.state = (param.state || 'active');
                  param.action = (param.action || 'ending');

                  if ((param.action === 'ending' || param.action === 'before') && !param.description) {
                    param.description = 0xFF;

                  } else if ((param.action === 'starting' || param.action === 'after') && !param.description) {
                    param.description = 0x00;
                  }

                  url = url + '?' + helpers.encodeQueryObj(param);
                }

                ajax.get(url, callback);
              };

              /**
               * Create Subledger Book Report by calling "/orgs/{org_id}/books/{book_id}/reports" with POST HTTP method
               * @summary Create Subledger Book Report
               * @param {Object} data
               * @param {Function} callback
               * @example
               * //Create a book report
               * subledger.organization('myOrganizationId').book('myBookId').report().create({...},function (error, response) {...});
               * @returns {*} Return the API Response
               */
              report.create = function (data, callback) {
                ajax.post(url, data, callback);
              };

              if (report_id) {
                url = url + '/' + report_id;

                /**
                 * Update Subledger Book Report by calling "/orgs/{org_id}/books/{book_id}/reports/{report_id}" with PATCH HTTP method
                 * @summary Update Subledger Book Report
                 * @param {Object} data
                 * @param {Function} callback
                 * @example
                 * //Update a book report
                 * subledger.organization('myOrganizationId').book('myBookId').report('reportId').create({...},function (error, response) {...});
                 * @returns {*} Return the API Response
                 */
                report.update = function (data, callback) {
                  ajax.patch(url, data, callback);
                };

                /**
                 * Attach Subledger Book Report to a Category by calling "/orgs/{org_id}/books/{book_id}/reports/{report_id}/attach" with POST HTTP method
                 * @summary Attach Subledger Book Report to a Category
                 * @param {Object} data
                 * @param {Function} callback
                 * @example
                 * //Attach a book report to a category
                 * subledger.organization('myOrganizationId').book('myBookId').report('reportId').attach({category: 'categoryId'},function (error, response) {...});
                 * @returns {*} Return the API Response
                 */
                report.attach = function (data, callback) {
                  ajax.post(url + '/attach', data, callback);
                };

                /**
                 * Detach Subledger Book Report from a Category by calling "/orgs/{org_id}/books/{book_id}/reports/{report_id}/detach" with POST HTTP method
                 * @summary Detach Subledger Book Report from a Category
                 * @param {Object} data
                 * @param {Function} callback
                 * @example
                 * //Detach a book report from a category
                 * subledger.organization('myOrganizationId').book('myBookId').report('reportId').detach({category: 'categoryId'},function (error, response) {...});
                 * @returns {*} Return the API Response
                 */
                report.detach = function (data, callback) {
                  ajax.post(url + '/detach', data, callback);
                };

                /**
                 * Render Subledger Book Report by calling "/orgs/{org_id}/books/{book_id}/reports/{report_id}/render" with POST HTTP method
                 * @summary Render Subledger Book Report
                 * @param {Object} param
                 * @param {String} [param.at=new Date().toISOString()]
                 * @param {Function} callback
                 * @example
                 * //Render a book report
                 * subledger.organization('myOrganizationId').book('myBookId').report('reportId').render(function (error, response) {...});
                 * @returns {*} Return the API Response
                 */
                report.render = function (param, callback) {
                  if (helpers.isFunction(param)) {
                    callback = param;
                    param = {};
                  }

                  param.at = (param.at || new Date().toISOString());
                  ajax.post(url + '/render?' + helpers.encodeQueryObj(param), callback);
                };

                /**
                 * Archive Subledger Book Report by calling "/orgs/{org_id}/books/{book_id}/reports/{report_id}/archive" with POST HTTP method
                 * @summary Archive Subledger Book Report
                 * @param {Function} callback
                 * @example
                 * //Archive a book report
                 * subledger.organization('myOrganizationId').book('myBookId').report('reportId').archive(function (error, response) {...});
                 * @returns {*} Return the API Response
                 */
                report.archive = function (callback) {
                  ajax.post(url + '/archive', callback);
                };

                /**
                 * Activate Subledger Book Report by calling "/orgs/{org_id}/books/{book_id}/reports/{report_id}/activate" with POST HTTP method
                 * @summary Activate Subledger Book Report
                 * @param {Function} callback
                 * @example
                 * //Activate a book report
                 * subledger.organization('myOrganizationId').book('myBookId').report('reportId').activate(function (error, response) {...});
                 * @returns {*} Return the API Response
                 */
                report.activate = function (callback) {
                  ajax.post(url + '/activate', callback);
                };
              }

              return report;
            };

            /**
             * subledger.organization('myOrganizationId').book('myBookId').report_rendering('reportRenderingId')
             * @param {String} [report_rendering_id]
             * @returns {Object} Return Subledger Book Report Rendering Methods
             */
            book.report_rendering = function (report_rendering_id) {
              var report_rendering = {};
              url = url + "/report_renderings";

              /**
               * Get Subledger Book Report Rendering by calling "/orgs/{org_id}/books/{book_id}/report_rederings/{report_rendering_id}"
               * @summary Get Subledger Book Report
               * @param {Function} callback
               * @example
               * //Get a book report rendering
               * subledger.organization('myOrganizationId').book('myBookId').report_rendering('reportRenderingId').get(function (error, response) {...});
               * @returns {*} Return the API Response
               */
              report_rendering.get = function (callback) {
                ajax.get(url + '/' + report_rendering_id, callback);
              };

              return report_rendering;
            };
          }

          return book;
        };
      }
    }

    return organization;
  };


  /**
   * Helpers
   */
  helpers = {
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
      var k, query = [];
      for (k in obj) {
        if (obj.hasOwnProperty(k)) { query.push(encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])); }
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
  Ajax = function () {
    var _selfAjax = this;

    _selfAjax.oauth_consumer_key = null;
    _selfAjax.oauth_consumer_secret = null;

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
      var i;
      this.result = arguments;
      this._isdone = true;
      for (i = 0; i < this._callbacks.length; i = i + 1) {
        this._callbacks[i].apply(null, arguments);
      }
      this._callbacks = [];
    };

    /*
     * AJAX requests
     */

    function new_xhr() {
      var xhr, NodeXMLHttpRequest;

      if (typeof window === 'undefined') {
        NodeXMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
        xhr = new NodeXMLHttpRequest();

      } else {
        if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
          try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
          } catch (e) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
          }
        }
      }

      return xhr;
    }

    function make_base_auth(key, secret) {
      var token = key + ':' + secret;
      var hash  = Base64.encode(token);
      return "Basic " + hash;
    }

    function ajax(method, url, data, headers) {
      var p = new Promise();
      var xhr, payload, h;
      data = data || {};
      headers = headers || {};

      try {
        xhr = new_xhr();
      } catch (e) {
        p.done(promise.ENOXHR, "");
        return p;
      }

      payload = JSON.stringify(data);
      if (method === 'GET' && payload) {
        payload = null;
      }

      xhr.open(method, url);
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

      if (_selfAjax.oauth_consumer_key !== null && _selfAjax.oauth_consumer_secret !== null) {
        xhr.setRequestHeader("Authorization", make_base_auth(_selfAjax.oauth_consumer_key, _selfAjax.oauth_consumer_secret));
      }

      for (h in headers) {
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

      res.data = data !== '' ? JSON.parse(data) : {};
      res.err = err ? new Error(res.data.exception || '') : null;

      return res;
    }

    this.get = function (url, callback) {
      promise.get(url).then(function (err, data) {
        data = resHandling(err, data);
        return (callback(data.err, data.data));
      });
    };

    this.post = function (url, data, callback) {
      if (helpers.isFunction(data)) {
        callback = data;
        data = {};
      }
      promise.post(url, data).then(function (err, data) {
        data = resHandling(err, data);
        return (callback(data.err, data.data));
      });
    };

    this.put = function (url, data, callback) {
      if (helpers.isFunction(data)) {
        callback = data;
        data = {};
      }
      promise.put(url, data).then(function (err, data) {
        data = resHandling(err, data);
        return (callback(data.err, data.data));
      });
    };

    this.patch = function (url, data, callback) {
      if (helpers.isFunction(data)) {
        callback = data;
        data = {};
      }
      promise.patch(url, data).then(function (err, data) {
        data = resHandling(err, data);
        return (callback(data.err, data.data));
      });
    };

    this.del = function (url, callback) {
      promise.del(url).then(function (err, data) {
        data = resHandling(err, data);
        return (callback(data.err, data.data));
      });
    };

  };

  Ajax.prototype.setCredentials = function (key, secret) {
    var ajax = this;

    ajax.oauth_consumer_key = key;
    ajax.oauth_consumer_secret = secret;
  };


  /**
   * Base64 fast encode/decode
   */
  Base64 = (function() {

    function StringBuffer() {
      this.buffer = [];
    }

    StringBuffer.prototype.append = function append(string) {
      this.buffer.push(string);
      return this;
    };

    StringBuffer.prototype.toString = function toString() {
      return this.buffer.join("");
    };

    var Base64 = {
      codex : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      encode : function (input) {
        var output = new StringBuffer();

        var enumerator = new Utf8EncodeEnumerator(input);
        while (enumerator.moveNext()) {
          var chr1 = enumerator.current;

          enumerator.moveNext();
          var chr2 = enumerator.current;

          enumerator.moveNext();
          var chr3 = enumerator.current;

          var enc1 = chr1 >> 2;
          var enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          var enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          var enc4 = chr3 & 63;

          if (isNaN(chr2)) {
            enc3 = enc4 = 64;
          }
          else if (isNaN(chr3)) {
            enc4 = 64;
          }
          output.append(this.codex.charAt(enc1) + this.codex.charAt(enc2) + this.codex.charAt(enc3) + this.codex.charAt(enc4));
        }
        return output.toString();
      },
      decode : function (input) {
        var output = new StringBuffer();
        var charCode2 = false;

        var enumerator = new Base64DecodeEnumerator(input);
        while (enumerator.moveNext()) {
          var charCode = enumerator.current;

          if (charCode < 128) {
            output.append(String.fromCharCode(charCode));
          } else if ((charCode > 191) && (charCode < 224)) {
            enumerator.moveNext();
            charCode2 = enumerator.current;

            output.append(String.fromCharCode(((charCode & 31) << 6) | (charCode2 & 63)));
          } else {
            enumerator.moveNext();
            charCode2 = enumerator.current;

            enumerator.moveNext();
            var charCode3 = enumerator.current;

            output.append(String.fromCharCode(((charCode & 15) << 12) | ((charCode2 & 63) << 6) | (charCode3 & 63)));
          }
        }
        return output.toString();
      }
    };


    function Utf8EncodeEnumerator(input) {
      this._input = input;
      this._index = -1;
      this._buffer = [];
    }

    Utf8EncodeEnumerator.prototype = {
      current: Number.NaN,
      moveNext: function () {
        if (this._buffer.length > 0) {
          this.current = this._buffer.shift();
          return true;
        }
        else if (this._index >= (this._input.length - 1)) {
          this.current = Number.NaN;
          return false;
        }
        else {
          var charCode = this._input.charCodeAt(++this._index);

          if ((charCode === 13) && (this._input.charCodeAt(this._index + 1) === 10)) {
            charCode = 10;
            this._index += 2;
          }
          if (charCode < 128) {
            this.current = charCode;
          }
          else if ((charCode > 127) && (charCode < 2048)) {
            this.current = (charCode >> 6) | 192;
            this._buffer.push((charCode & 63) | 128);
          }
          else {
            this.current = (charCode >> 12) | 224;
            this._buffer.push(((charCode >> 6) & 63) | 128);
            this._buffer.push((charCode & 63) | 128);
          }
          return true;
        }
      }
    };

    function Base64DecodeEnumerator(input) {
      this._input = input;
      this._index = -1;
      this._buffer = [];
    }

    Base64DecodeEnumerator.prototype = {
      current: 64,
      moveNext: function () {
        if (this._buffer.length > 0) {
          this.current = this._buffer.shift();
          return true;
        }
        else if (this._index >= (this._input.length - 1)) {
          this.current = 64;
          return false;
        }
        else {
          var enc1 = Base64.codex.indexOf(this._input.charAt(++this._index));
          var enc2 = Base64.codex.indexOf(this._input.charAt(++this._index));
          var enc3 = Base64.codex.indexOf(this._input.charAt(++this._index));
          var enc4 = Base64.codex.indexOf(this._input.charAt(++this._index));

          var chr1 = (enc1 << 2) | (enc2 >> 4);
          var chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
          var chr3 = ((enc3 & 3) << 6) | enc4;

          this.current = chr1;

          if (enc3 !== 64) {
            this._buffer.push(chr2);
          }

          if (enc4 !== 64) {
            this._buffer.push(chr3);
          }

          return true;
        }
      }
    };

    return Base64;
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

  /**
   * Add JSON support for older browsers
   */
  if (typeof JSON !== 'object') {
    JSON = {};
  }

  (function () {
    'use strict';

    function f(n) {
      return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {
      Date.prototype.toJSON = function () {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null;
      };
      String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
        return this.valueOf();
      };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      gap,
      indent,
      meta = {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"': '\\"',
        '\\': '\\\\'
      },
      rep;

    function quote(string) {
      escapable.lastIndex = 0;
      return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
        var c = meta[a];
        return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
      }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {
      var i,
        k,
        v,
        length,
        mind = gap,
        partial,
        value = holder[key];

      if (value && typeof value === 'object' &&
        typeof value.toJSON === 'function') {
        value = value.toJSON(key);
      }

      if (typeof rep === 'function') {
        value = rep.call(holder, key, value);
      }

      switch (typeof value) {
        case 'string':
          return quote(value);
        case 'number':
          return isFinite(value) ? String(value) : 'null';
        case 'boolean':
        case 'null':
          return String(value);
        case 'object':
          if (!value) {
            return 'null';
          }
          gap += indent;
          partial = [];
          if (Object.prototype.toString.apply(value) === '[object Array]') {
            length = value.length;
            for (i = 0; i < length; i += 1) {
              partial[i] = str(i, value) || 'null';
            }
            v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
            gap = mind;
            return v;
          }
          if (rep && typeof rep === 'object') {
            length = rep.length;
            for (i = 0; i < length; i += 1) {
              if (typeof rep[i] === 'string') {
                k = rep[i];
                v = str(k, value);
                if (v) {
                  partial.push(quote(k) + (gap ? ': ' : ':') + v);
                }
              }
            }
          } else {
            for (k in value) {
              if (Object.prototype.hasOwnProperty.call(value, k)) {
                v = str(k, value);
                if (v) {
                  partial.push(quote(k) + (gap ? ': ' : ':') + v);
                }
              }
            }
          }
          v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
          gap = mind;
          return v;
      }
    }

    if (typeof JSON.stringify !== 'function') {
      JSON.stringify = function (value, replacer, space) {
        var i;
        gap = '';
        indent = '';
        if (typeof space === 'number') {
          for (i = 0; i < space; i += 1) {
            indent += ' ';
          }
        } else if (typeof space === 'string') {
          indent = space;
        }
        rep = replacer;
        if (replacer && typeof replacer !== 'function' &&
          (typeof replacer !== 'object' ||
            typeof replacer.length !== 'number')) {
          throw new Error('JSON.stringify');
        }
        return str('', {'': value});
      };
    }

    if (typeof JSON.parse !== 'function') {
      JSON.parse = function (text, reviver) {
        var j;
        function walk(holder, key) {
          var k, v, value = holder[key];
          if (value && typeof value === 'object') {
            for (k in value) {
              if (Object.prototype.hasOwnProperty.call(value, k)) {
                v = walk(value, k);
                if (v !== undefined) {
                  value[k] = v;
                } else {
                  delete value[k];
                }
              }
            }
          }
          return reviver.call(holder, key, value);
        }
        text = String(text);
        cx.lastIndex = 0;
        if (cx.test(text)) {
          text = text.replace(cx, function (a) {
            return '\\u' +
              ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
          });
        }
        if (/^[\],:{}\s]*$/
          .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
            .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
            .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

          j = eval('(' + text + ')');

          return typeof reviver === 'function' ? walk({'': j}, '') : j;
        }
        throw new SyntaxError('JSON.parse');
      };
    }
  }());

  exports.Subledger = Subledger;
})(this);
