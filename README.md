# [Subledger](http://subledger.com) - JavaScript library for Subledger


Subledger is a JavaScript library that allows you to quickly build a front-end application using the Subledger powerful APIs.

## JavaScript Documentation

The use of the Subledger JavaScript library is pretty easy! You just have to create an Subledger connector, use it to communicate with the API with easy chaining operations and then retrieve the callback results. Voilà!

### Callback result
The callback always return **Error** (`error`) as first parameter and **API Response** (`apiRes`) as second parameter.

#### Error
 * Error : `Error` object with the returned exception message
 * No error : `null`

#### API Response
 * Error : Complete Error object sent by the API
 * No error : Response sent by the API

Note than the Subledger JavaScript library doesn't manipulate the API Response and return it as received. Please, refer to the complete [API documentation](https://api.subledger.com) to know more about the returned API responses.

### Data and Parameters
When asked by the method, **Data** (`data`) and **Parameters** (`param`) refer to a well-formed object compliant with the API. Please, refer to the complete [API documentation](https://api.subledger.com) to know more about the compliant data and parameters for your API request.


### Create a new Subledger connector

```javascript
/**
 * Create a new Subledger connector
 * Subledger();
 */

var subledger = new Subledger();
```

### Set Subledger credentials

```javascript
/**
 * Set Subledger credentials
 * Subledger().setCredentials(OAuthKey, OAuthSecret);
 */

subledger.setCredentials('yourOAuthKey','yourOAuthSecret');
```

### Identity

#### Create
```javascript
/**
 * subledger.identity().create(data, callback);
 * @param {Object} data
 * @param {Function} callback
 */

subledger.identity().create({...},function (error,apiRes){
  ...
});
```

#### Get one
```javascript
/**
 * subledger.identity(identity_id).get(callback);
 * @param {Function} callback
 */

subledger.identity(identity_id).get(function (error,apiRes){
  ...
});
```

#### Update
```javascript
/**
 * subledger.identity(identity_id).update(data, callback);
 * @param {Object} data
 * @param {Function} callback
 */

subledger.identity(identity_id).update({...}, function (error,apiRes){
  ...
});
```

### Identity Key

#### Create
```javascript
/**
 * subledger.identity(identity_id).key().create(data, callback);
 * @param {Object} data
 * @param {Function} callback
 */

subledger.identity(identity_id).key().create({...},function (error,apiRes){
  ...
});
```

#### Get one
```javascript
/**
 * subledger.identity(identity_id).key(key_id).get(callback);
 * @param {Function} callback
 */

subledger.identity(identity_id).key(key_id).get(function (error,apiRes){
  ...
});
```

#### Update
```javascript
/**
 * subledger.identity(identity_id).key(key_id).update(data, callback);
 * @param {Object} data
 * @param {Function} callback
 */

subledger.identity(identity_id).key(key_id).update({...}, function (error,apiRes){
  ...
});
```

#### Activate
```javascript
/**
 * subledger.identity(identity_id).key(key_id).activate(callback);
 * @param {Function} callback
 */

subledger.identity(identity_id).key(key_id).activate(function (error,apiRes){
  ...
});
```

#### Archive
```javascript
/**
 * subledger.identity(identity_id).key(key_id).archive(callback);
 * @param {Function} callback
 */

subledger.identity(identity_id).key(key_id).archive(function (error,apiRes){
  ...
});
```

### Organization

#### Create
```javascript
/**
 * subledger.organization().create(data, callback);
 * @param {Object} data
 * @param {Function} callback
 */

subledger.organization().create({...},function (error,apiRes){
  ...
});
```

#### Get one
```javascript
/**
 * subledger.organization(org_id).get(callback);
 * @param {Function} callback
 */

subledger.organization(org_id).get(function (error,apiRes){
  ...
});
```

#### Update
```javascript
/**
 * subledger.organization(org_id).update(data, callback);
 * @param {Object} data
 * @param {Function} callback
 */

subledger.organization(org_id).update({...}, function (error,apiRes){
  ...
});
```

#### Activate
```javascript
/**
 * subledger.organization(org_id).activate(callback);
 * @param {Function} callback
 */

subledger.organization(org_id).activate(function (error,apiRes){
  ...
});
```

#### Archive
```javascript
/**
 * subledger.organization(org_id).archive(callback);
 * @param {Function} callback
 */

subledger.organization(org_id).archive(function (error,apiRes){
  ...
});
```


### Book

#### Get one
```javascript
/**
 * subledger.organization(org_id).book(book_id).get(callback);
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).get(function (error,apiRes){
 ...
});
```

#### Get list
```javascript
/**
 * subledger.organization(org_id).book().get(param,callback);
 * @param {Object} [param]
 * @param {String} [param.state=active]
 * @param {String} [param.action=before]
 * @param {Function} callback
 */

//With parameters
subledger.organization(org_id).book().get({...},function (error,apiRes){
 ...
});

//Without parameters
subledger.organization(org_id).book().get(function (error,apiRes){
 ...
});
```

#### Create
```javascript
/**
 * subledger.organization(org_id).book().create(data,callback);
 * @param {Object} data
 * @param {Function} callback
 */

subledger.organization(org_id).book().create({...},function (error,apiRes){
  ...
});
```

#### Update
```javascript
/**
 * subledger.organization(org_id).book(book_id).update(data,callback);
 * @param {Object} data
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).update({...},function (error,apiRes){
  ...
});
```

#### Activate
```javascript
/**
 * subledger.organization(org_id).book(book_id).activate(callback);
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).activate(function (error,apiRes){
  ...
});
```

#### Archive
```javascript
/**
 * subledger.organization(org_id).book(book_id).archive(callback);
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).archive(function (error,apiRes){
  ...
});
```

### Account

#### Get one
```javascript
/**
 * subledger.organization(org_id).book(book_id).account(account_id).get(callback);
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).account(account_id).get(function (error,apiRes){
  ...
});
```

#### Get list
```javascript
/**
 * subledger.organization(org_id).book(book_id).account().get(param,callback);
 * @param {Object} [param]
 * @param {String} [param.state=active]
 * @param {String} [param.action=before]
 * @param {Function} callback
 */

//With parameters
subledger.organization(org_id).book(book_id).account().get({...},function (error,apiRes){
  ...
});

//Without parameters
subledger.organization(org_id).book(book_id).account().get(function (error,apiRes){
  ...
});
```

#### Create
```javascript
/**
 * subledger.organization(org_id).book(book_id).account().create(data,callback);
 * @param {Object} data
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).account().create({...},function (error,apiRes){
  ...
});
```

#### Update
```javascript
/**
 * subledger.organization(org_id).book(book_id).account(account_id).update(data,callback);
 * @param {Object} data
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).account(account_id).update({...},function (error,apiRes){
  ...
});
```

#### Activate
```javascript
/**
 * subledger.organization(org_id).book(book_id).account(account_id).activate(callback);
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).account(account_id).activate(function (error,apiRes){
  ...
});
```

#### Archive
```javascript
/**
 * subledger.organization(org_id).book(book_id).account(account_id).archive(callback);
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).account(account_id).archive(function (error,apiRes){
  ...
});
```

#### Balance
```javascript
/**
 * subledger.organization(org_id).book(book_id).account(account_id).balance(param,callback);
 * @param {Object} [param]
 * @param {String} [param.at=new Date().toISOString()]
 * @param {Function} callback
 */

//With parameters
subledger.organization(org_id).book(book_id).account(account_id).balance({...},function (error,apiRes){
  ...
});

//Without parameters
subledger.organization(org_id).book(book_id).account(account_id).balance(function (error,apiRes){
  ...
});
```

### Account Line

#### Get one
```javascript
/**
 * subledger.organization(org_id).book(book_id).account(account_id).line(line_id).get(callback);
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).account(account_id).line(line_id).get(function (error,apiRes){
  ...
});
```

#### Get list
```javascript
/**
 * subledger.organization(org_id).book(book_id).account(account_id).line().get(param,callback);
 * @param {Object} [param]
 * @param {String} [param.action=before]
 * @param {String} [param.effective_at=new Date().toISOString()]
 * @param {Function} callback
 */

//With parameters
subledger.organization(org_id).book(book_id).account(account_id).line().get({...},function (error,apiRes){
  ...
});

//Without parameters
subledger.organization(org_id).book(book_id).account(account_id).line().get(function (error,apiRes){
  ...
});
```

### Journal-Entry

#### Get one
```javascript
/**
 * subledger.organization(org_id).book(book_id).journalEntry(journal_entry_id).get(callback);
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).journalEntry(journal_entry_id).get(function (error,apiRes){
  ...
});
```

#### Get list
```javascript
/**
 * subledger.organization(org_id).book(book_id).journalEntry().get(param,callback);
 * @param {Object} [param]
 * @param {String} [param.state=active]
 * @param {String} [param.action=before]
 * @param {String} [param.effective_at=new Date().toISOString()]
 * @param {Function} callback
 */

//With parameters
subledger.organization(org_id).book(book_id).journalEntry().get({...},function (error,apiRes){
  ...
});

//Without parameters
subledger.organization(org_id).book(book_id).journalEntry().get(function (error,apiRes){
  ...
});
```

#### Create
```javascript
/**
 * subledger.organization(org_id).book(book_id).journalEntry().create(data,callback);
 * @param {Object} data
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).journalEntry().create({...},function (error,apiRes){
  ...
});
```

#### Post
```javascript
/**
 * subledger.organization(org_id).book(book_id).journalEntry(journal_entry_id).post(callback);
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).journalEntry(journal_entry_id).post(function (error,apiRes){
  ...
});
```

#### Create and post
```javascript
/**
 * subledger.organization(org_id).book(book_id).journalEntry().createAndPost(data,callback);
 * @param {Object} data
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).journalEntry().createAndPost({...},function (error,apiRes){
  ...
});
```

#### Update
```javascript
/**
 * subledger.organization(org_id).book(book_id).journalEntry(journal_entry_id).update(data,callback);
 * @param {Object} data
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).journalEntry(journal_entry_id).update(...},function (error,apiRes){
  ...
});
```

#### Archive
```javascript
/**
 * subledger.organization(org_id).book(book_id).journalEntry(journal_entry_id).archive(callback);
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).journalEntry(journal_entry_id).archive(function (error,apiRes){
  ...
});
```

#### Activate
```javascript
/**
 * subledger.organization(org_id).book(book_id).journalEntry(journal_entry_id).activate(callback);
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).journalEntry(journal_entry_id).activate(function (error,apiRes){
  ...
});
```

#### Balance
```javascript
/**
 * subledger.organization(org_id).book(book_id).journalEntry(journal_entry_id).balance(callback);
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).journalEntry(journal_entry_id).balance(function (error,apiRes){
  ...
});
```

#### Progress
```javascript
/**
 * subledger.organization(org_id).book(book_id).journalEntry(journal_entry_id).progress(callback);
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).journalEntry(journal_entry_id).progress(function (error,apiRes){
  ...
});
```

### Journal-Entry Line

#### Get one
```javascript
/**
 * subledger.organization(org_id).book(book_id).journalEntry(journal_entry_id).line(line_id).get(callback);
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).journalEntry(journal_entry_id).line(line_id).get(function (error,apiRes){
  ...
});
```

#### Get list
```javascript
/**
 * subledger.organization(org_id).book(book_id).journalEntry(journal_entry_id).line().get(param,callback);
 * @param {Object} [param]
 * @param {String} [param.state=active]
 * @param {String} [param.action=before]
 * @param {Function} callback
 */

//With parameters
subledger.organization(org_id).book(book_id).journalEntry(journal_entry_id).line().get({...},function (error,apiRes){
  ...
});

//Without parameters
subledger.organization(org_id).book(book_id).journalEntry(journal_entry_id).line().get(function (error,apiRes){
  ...
});
```

#### Create
```javascript
/**
 * subledger.organization(org_id).book(book_id).journalEntry(journal_entry_id).line().create(data,callback);
 * @param {Object} data
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).journalEntry(journal_entry_id).line().create({...},function (error,apiRes){
  ...
});
```

#### Update
```javascript
/**
 * subledger.organization(org_id).book(book_id).journalEntry(journal_entry_id).line(line_id).update(data,callback);
 * @param {Object} data
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).journalEntry(journal_entry_id).line(line_id).update({...},function (error,apiRes){
  ...
});
```

#### Activate
```javascript
/**
 * subledger.organization(org_id).book(book_id).journalEntry(journal_entry_id).line(line_id).activate(callback);
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).journalEntry(journal_entry_id).line(line_id).activate(function (error,apiRes){
  ...
});
```

#### Archive
```javascript
/**
 * subledger.organization(org_id).book(book_id).journalEntry(journal_entry_id).line(line_id).archive(callback);
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).journalEntry(journal_entry_id).line(line_id).archive(function (error,apiRes){
  ...
});
```

### Category

#### Get one
```javascript
/**
 * subledger.organization(org_id).book(book_id).category(category_id).get(callback);
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).category(category_id).get(function (error,apiRes){
  ...
});
```

#### Get list
```javascript
/**
 * subledger.organization(org_id).book(book_id).category().get(param,callback);
 * @param {Object} [param]
 * @param {String} [param.state=active]
 * @param {String} [param.action=before]
 * @param {Function} callback
 */

//With parameters
subledger.organization(org_id).book(book_id).category().get({...},function (error,apiRes){
  ...
});

//Without parameters
subledger.organization(org_id).book(book_id).category().get(function (error,apiRes){
  ...
});
```

#### Create
```javascript
/**
 * subledger.organization(org_id).book(book_id).category().create(data,callback);
 * @param {Object} data
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).category().create({...},function (error,apiRes){
  ...
});
```

#### Update
```javascript
/**
 * subledger.organization(org_id).book(book_id).category(category_id).update(data,callback);
 * @param {Object} data
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).category(category_id).update({...},function (error,apiRes){
  ...
});
```

#### Attach
```javascript
/**
 * subledger.organization(org_id).book(book_id).category(category_id).attach(data,callback);
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).category(category_id).attach({account: 'accountId'},function (error,apiRes){
  ...
});
```

#### Detach
```javascript
/**
 * subledger.organization(org_id).book(book_id).category(category_id).detach(data,callback);
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).category(category_id).detach({account: 'accountId'},function (error,apiRes){
  ...
});
```

#### Archive
```javascript
/**
 * subledger.organization(org_id).book(book_id).category(category_id).archive(callback);
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).category(category_id).archive(function (error,apiRes){
  ...
});
```

#### Activate
```javascript
/**
 * subledger.organization(org_id).book(book_id).category(category_id).activate(callback);
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).category(category_id).activate(function (error,apiRes){
  ...
});
```

### Report

#### Get one
```javascript
/**
 * subledger.organization(org_id).book(book_id).report(report_id).get(callback);
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).report(report_id).get(function (error,apiRes){
  ...
});
```

#### Get list
```javascript
/**
 * subledger.organization(org_id).book(book_id).report().get(param,callback);
 * @param {Object} [param]
 * @param {String} [param.state=active]
 * @param {String} [param.action=before]
 * @param {Function} callback
 */

//With parameters
subledger.organization(org_id).book(book_id).report().get({...},function (error,apiRes){
  ...
});

//Without parameters
subledger.organization(org_id).book(book_id).report().get(function (error,apiRes){
  ...
});
```

#### Create
```javascript
/**
 * subledger.organization(org_id).book(book_id).report().create(data,callback);
 * @param {Object} data
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).report().create({...},function (error,apiRes){
  ...
});
```

#### Update
```javascript
/**
 * subledger.organization(org_id).book(book_id).report(report_id).update(data,callback);
 * @param {Object} data
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).report(report_id).update({...},function (error,apiRes){
  ...
});
```

#### Attach
```javascript
/**
 * subledger.organization(org_id).book(book_id).report(report_id).attach(data,callback);
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).report(report_id).attach({account: 'accountId'},function (error,apiRes){
  ...
});
```

#### Detach
```javascript
/**
 * subledger.organization(org_id).book(book_id).report(report_id).detach(data,callback);
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).report(report_id).detach({account: 'accountId'},function (error,apiRes){
  ...
});
```

#### Render
```javascript
/**
 * subledger.organization(org_id).book(book_id).report(report_id).render(param,callback);
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).report(report_id).render({at: new Date().toISOString()},function (error,apiRes){
  ...
});
```

#### Archive
```javascript
/**
 * subledger.organization(org_id).book(book_id).report(report_id).archive(callback);
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).report(report_id).archive(function (error,apiRes){
  ...
});
```

#### Activate
```javascript
/**
 * subledger.organization(org_id).book(book_id).report(report_id).activate(callback);
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).report(report_id).activate(function (error,apiRes){
  ...
});
```

### Report Rendering

#### Get one
```javascript
/**
 * subledger.organization(org_id).book(book_id).report_rendering(report_rendering_id).get(callback);
 * @param {Function} callback
 */

subledger.organization(org_id).book(book_id).report_rendering(report_rendering_id).get(function (error,apiRes){
  ...
});
```




## What you need to build your own Subledger


In order to build Subledger, you need to have Node.js/npm latest and git 1.7 or later.
(Earlier versions might work OK, but are not tested.)

**Windows users** have two options:

1. Install [msysgit](https://code.google.com/p/msysgit/) (Full installer for official Git) and a
   [binary version of Node.js](http://nodejs.org). Make sure all two packages are installed to the same
   location (by default, this is C:\Program Files\Git).
2. Install [Cygwin](http://cygwin.com/) (make sure you install the git and which packages), and
   a [binary version of Node.js](http://nodejs.org/).

**Mac OS users** should install Xcode (comes on your Mac OS install DVD, or downloadable from
[Apple's Xcode site](http://developer.apple.com/technologies/xcode.html)) and
[Homebrew](http://mxcl.github.com/homebrew/). Once Homebrew is installed, run `brew install git` to install git,
and `brew install node` to install Node.js.

**Linux/BSD users** should use their appropriate package managers to install git and Node.js, or build from source
if you swing that way. Easy-peasy.


## How to build your own Subledger

First, clone a copy of the main Subledger git repo by running:

```bash
git clone https://github.com/boocx2/Subledger_JS_Library.git
```

Install the [grunt-cli](http://gruntjs.com/getting-started#installing-the-cli) package if you haven't before. It should be done as global install:

```bash
npm install -g grunt-cli
```

Make sure you have `grunt` installed by testing:

```bash
grunt -version
```

Enter the Subledger directory and install the Node dependencies, this time *without* specifying a global(-g) install:

```bash
cd Subledger && npm install
```

###Regular Build
To get a minified (w/ Uglify.js), linted (w/ JSHint) version of Subledger, type the following:

```bash
grunt
```

The built version of Subledger will be put in the `build/` subdirectory.

###Complete Build
To get a complete, minified (w/ Uglify.js), linted (w/ JSHint) version of Subledger with updated root files (`AUTHORS.txt`,`LICENSE.txt`,`README.txt`) and Web files (`build/web`), type the following:

```bash
grunt build
```

###Regular Auto-Build
Then, to get a auto-build Subledger as you work, start `grunt watch` :

```bash
cd Subledger && grunt watch
```

##Running tests in the browser

Subledger has been successfully tested in the following browsers : **IE6+**, **Chrome PC/Mac**, **Safari PC/Mac**, **Opera PC/Mac** and **Firefox PC/Mac**.

To running tests in the browser, open `build/web/test.html` into the browser you want to test. That's it!


##[NodeUnit](https://github.com/caolan/nodeunit) Reference

The Subledger JavaScript library use [NodeUnit](https://github.com/caolan/nodeunit) as unit testing tool.

###Usage

Here is an example unit test module:

    exports.testSomething = function(test){
        test.expect(1);
        test.ok(true, "this assertion should pass");
        test.done();
    };

    exports.testSomethingElse = function(test){
        test.ok(false, "this assertion should fail");
        test.done();
    };

###API Documentation


Nodeunit uses the functions available in the node.js [assert module](http://nodejs.org/docs/v0.4.2/api/assert.html):

* __ok(value, [message])__ - Tests if value is a true value.
* __equal(actual, expected, [message])__ - Tests shallow, coercive equality with the equal comparison operator ( == ).
* __notEqual(actual, expected, [message])__ - Tests shallow, coercive non-equality with the not equal comparison operator ( != ).
* __deepEqual(actual, expected, [message])__ - Tests for deep equality.
* __notDeepEqual(actual, expected, [message])__ - Tests for any deep inequality.
* __strictEqual(actual, expected, [message])__ - Tests strict equality, as determined by the strict equality operator ( === )
* __notStrictEqual(actual, expected, [message])__ - Tests strict non-equality, as determined by the strict not equal operator ( !== )
* __throws(block, [error], [message])__ - Expects block to throw an error.
* __doesNotThrow(block, [error], [message])__ - Expects block not to throw an error.
* __ifError(value)__ - Tests if value is not a false value, throws if it is a true value. Useful when testing the first argument, error in callbacks.

Nodeunit also provides the following functions within tests:

* __expect(amount)__ - Specify how many assertions are expected to run within a test. Very useful for ensuring that all your callbacks and assertions are run.
* __done()__ - Finish the current test function, and move on to the next. ALL tests should call this!


##Contributors

Contributors ordered by first contribution.

Marc-André Arseneault <marc-andre@arsnl.ca>


##License

Copyright 2013 Subledger
http://subledger.com

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
