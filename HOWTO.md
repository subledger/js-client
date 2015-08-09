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
git clone https://github.com/subledger/js-client.git
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