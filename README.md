# [Subledger](http://subledger.com) - JavaScript library for Subledger


Subledger is a JavaScript library that allows you to quickly build a front-end application using the Subledger powerful APIs.

## JavaScript Documentation

The callback always return **Error** (`error`) as first parameter and **API Response** (`response`) as second parameter.

If there is an error, `error` will be the returned exception message, and `response` will be the complete response sent by the API.
If there is no error, `error` will be null, and `response` will be the response sent by the API.

When asked by the method, **body** (`body`) refers to a well-formed object compliant with the API. Please, refer to the complete [API documentation](https://api.subledger.com) to know more about the compliant data and parameters for your API request.

Note than the Subledger JavaScript library doesn't manipulate the API Response and return it as received. Please, refer to the complete [API documentation](https://api.subledger.com) to know more about the returned API responses.

### Node.JS Support

To install subledger, run the following command:

```
npm install subledger
```

Lastly, you can require and use Subledger on your Node.JS environment like following:

```
// require Subledger module
var Subledger = require('subledger').Subledger;

// instantiate it
var subledger = new Subledger();
subledger.setCredentials('yourOAuthKey','yourOAuthSecret');
```

### Create a new Subledger connector

```javascript
var subledger = new Subledger();
subledger.setCredentials('yourOAuthKey','yourOAuthSecret');
```

### Identity

```javascript
// Create an identity and key (POST /identities)
subledger.identity().create({body}, function (error, response) { ... });

// Get an identity (GET /identities/{identity_id})
subledger.identity(identity_id).get(function (error, response) { ... });

// Update an identity (PATCH /identities/{identity_id})
subledger.identity(identity_id).update({body}, function (error, response) { ... });

// Create an identity key (POST /identities/{identity_id}/keys)
subledger.identity(identity_id).key().create(function (error, response) { ... });

// Get a key (GET /identities/{identity_id}/keys/{key_id})
subledger.identity(identity_id).key(key_id).get(function (error, response) { ... });

// Archive a key (POST /identities/{identity_id}/keys/{key_id}/archive)
subledger.identity(identity_id).key(key_id).archive(function (error, response) { ... });

// Activate a key (POST /identities/{identity_id}/keys/{key_id}/activate)
subledger.identity(identity_id).key(key_id).activate(function (error, response) { ... });
```

### Organization

```javascript
// Create an org (POST /orgs)
subledger.organization().create({body},function (error, response) { ... });

// Get an org (GET /orgs/{org_id})
subledger.organization(org_id).get(function (error, response) { ... });

// Update an org (PATCH /orgs/{org_id})
subledger.organization(org_id).update({body}, function (error, response) { ... });

// Archive an org (POST /orgs/{org_id}/archive)
subledger.organization(org_id).archive(function (error, response) { ... });

// Activate an org (POST /orgs/{org_id}/activate)
subledger.organization(org_id).activate(function (error, response) { ... });
```

### Book

```javascript
// Create a book (POST /orgs/{org_id}/books)
subledger.organization(org_id).book().create({body}, function (error, response) { ... });

// Get a collection of books
// *** NOTE: If body is not provided, all active books will be returned ***
subledger.organization(org_id).book().get([{body},] function (error, response) { ... });

// Get a book (GET /org/{org_id}/books/{book_id})
subledger.organization(org_id).book(book_id).get(function (error, response) { ... });

// Update a book (PATCH /orgs/{org_id}/books/{book_id})
subledger.organization(org_id).book(book_id).update({body}, function (error, response) { ... });

// Archive a book (POST /orgs/{org_id}/books/{book_id}/archive)
subledger.organization(org_id).book(book_id).archive(function (error, response){ ... });

// Activate a book (POST /orgs/{org_id}/books/{book_id}/activate)
subledger.organization(org_id).book(book_id).activate(function (error, response) { ... });
```

### Account

```javascript
// Create an account (POST /orgs/{org_id}/books/{book_id}/accounts)
subledger.organization(org_id).book(book_id).account().create({book},function (error, response) { ... });

// Get a collection of accounts (GET /orgs/{org_id}/books/{book_id}/accounts)
// *** NOTE: If body is not provided, all active accounts will be returned ***
subledger.organization(org_id).book(book_id).account().get([{body},] function (error, response) { ... });

// Get an account (GET /orgs/{org_id}/books/{book_id}/accounts/{account_id})
subledger.organization(org_id).book(book_id).account(account_id).get(function (error, response) { ... });

// Update an account (PATCH /orgs/{org_id}/books/{book_id}/accounts/{account_id})
subledger.organization(org_id).book(book_id).account(account_id).update({body}, function (error, response) { ... });

// Get an account's collection of lines (GET /orgs/{org_id}/books/{book_id}/accounts/{account_id}/lines)
// *** NOTE: If body is not provided, all posted lines in account before now will be returned ***
subledger.organization(org_id).book(book_id).account(account_id).line().get([{body},] function (error, response) { ... });

// Archive an account (POST /orgs/{org_id}/books/{book_id}/accounts/{account_id}/archive)
subledger.organization(org_id).book(book_id).account(account_id).archive(function (error, response) { ... });

// Activate an account (POST /orgs/{org_id}/books/{book_id}/accounts/{account_id}/activate)
subledger.organization(org_id).book(book_id).account(account_id).activate(function (error, response) { ... });

// Get an account's balance (GET /orgs/{org_id}/books/{book_id}/accounts/{account_id}/balance)
// *** NOTE: If body is not provided, current balance will be returned ***
subledger.organization(org_id).book(book_id).account(account_id).balance([{body},] function (error, response) { ... });

// Get an account's line (GET /orgs/{org_id}/books/{book_id}/accounts/{account_id}/lines/{line_id})
subledger.organization(org_id).book(book_id).account(account_id).line(line_id).get(function (error, response) { ... });

// Get the first and last posted lines in an account (GET /orgs/{org_id}/books/{book_id}/accounts/{account_id}/first_and_last_line)
subledger.organization(org_id).book(book_id).account(account_id).firstAndLastLine(function (error, response) { ... });
```

### Journal-Entry

```javascript
// Get a collection of journal entries (GET /orgs/{org_id}/books/{book_id}/journal_entries)
// *** NOTE: If body is not provided, all active journal entries before now will be returned ***
subledger.organization(org_id).book(book_id).journalEntry().get({body}, function (error, response) { ... });

// Create and post a journal entry (POST /orgs/{org_id}/books/{book_id}/journal_entries/create_and_post)
subledger.organization(org_id).book(book_id).journalEntry().createAndPost({body}, function (error, response) { ... });

// Accounting post a journal entry (POST /orgs/{org_id}/books/{book_id}/journal_entries/{journal_entry_id})
subledger.organization(org_id).book(book_id).journalEntry(journal_entry_id).post(function (error, response) { ... });

// Get a journal entry (GET /orgs/{org_id}/books/{book_id}/journal_entries/{journal_entry_id})
subledger.organization(org_id).book(book_id).journalEntry(journal_entry_id).get(function (error, response) { ... });

// Get a journal entry's collection of lines (GET /orgs/{org_id}/books/{book_id}/journal_entries/{journal_entry_id}/lines)
// *** NOTE: If body is not provided, all 'posted' from the journal entry will be returned ***
subledger.organization(org_id).book(book_id).journalEntry(journal_entry_id).line().get([{body},] function (error, response) { ... });

// Archive a journal entry (POST /orgs/{org_id}/books/{book_id}/journal_entries/{journal_entry_id}/archive)
subledger.organization(org_id).book(book_id).journalEntry(journal_entry_id).archive(function (error, response) { ... });

// Activate a journal entry (POST /orgs/{org_id}/books/{book_id}/journal_entries/{journal_entry_id}/activate)
subledger.organization(org_id).book(book_id).journalEntry(journal_entry_id).activate(function (error, response) { ... });

// Get a journal entry's posting progress (GET /orgs/{org_id}/books/{book_id}/journal_entries/{journal_entry_id}/progress)
subledger.organization(org_id).book(book_id).journalEntry(journal_entry_id).progress(function (error, response) { ... });

// Get a journal entry's line (GET /orgs/{org_id}/books/{book_id}/journal_entries/{journal_entry_id}/lines/{line_id})
subledger.organization(org_id).book(book_id).journalEntry(journal_entry_id).line(line_id).get(function (error, response) { ... });
```

### Category
```javascript
// Create a category (POST /orgs/{org_id}/books/{book_id}/categories)
subledger.organization(org_id).book(book_id).category().create({body}, function (error, response) { ... });

// Get a collection of categories (GET /orgs/{org_id}/books/{book_id}/categories)
// *** NOTE: If body is not provided, all active categories will be returned ***
subledger.organization(org_id).book(book_id).category().get([{body},] function (error, response) { ... });

// Get a category (GET /orgs/{org_id}/books/{book_id}/categories/{category_id})
subledger.organization(org_id).book(book_id).category(category_id).get(function (error, response) { ... });

// Update a category (PATCH /orgs/{org_id}/books/{book_id}/categories/{category_id})
subledger.organization(org_id).book(book_id).category(category_id).update({body}, function (error, response) { ... });

// Attach an account to a category (POST /orgs/{org_id}/books/{book_id}/categories/{category_id}/attach)
subledger.organization(org_id).book(book_id).category(category_id).attach({account: 'accountId'}, function (error, response) { ... });

// Detach an account from a category (POST /orgs/{org_id}/books/{book_id}/categories/{category_id}/detach)
subledger.organization(org_id).book(book_id).category(category_id).detach({account: 'accountId'}, function (error, response) { ... });

// Archive a category (POST /orgs/{org_id}/books/{book_id}/categories/{category_id}/archive)
subledger.organization(org_id).book(book_id).category(category_id).archive(function (error, response) { ... });

// Activate a category (POST /orgs/{org_id}/books/{book_id}/categories/{category_id}/activate)
subledger.organization(org_id).book(book_id).category(category_id).activate(function (error, response) { ... });
```

### Report
```javascript
// Create a report (GET /orgs/{org_id}/books/{book_id}/reports)
subledger.organization(org_id).book(book_id).report().create({body}, function (error, response) { ... });

// Get a collection of reports (GET /orgs/{org_id}/books/{book_id}/reports)
// *** NOTE: If body is not provided, all active reports will be returned ***
subledger.organization(org_id).book(book_id).report().get([{body},] function (error, response) { ... });

// Get a report (GET /orgs/{org_id}/books/{book_id}/reports/{report_id})
subledger.organization(org_id).book(book_id).report(report_id).get(function (error, response) { ... });

// Update a report (PATCH /orgs/{org_id}/books/{book_id}/reports/{report_id})
subledger.organization(org_id).book(book_id).report(report_id).update({body}, function (error, response) { ... });

// Attach a category to a report (POST /orgs/{org_id}/books/{book_id}/reports/{report_id}/attach)
subledger.organization(org_id).book(book_id).report(report_id).attach({category: 'categoryId'},function (error, response) { ... });

// Detach a category from a report (POST /orgs/{org_id}/books/{book_id}/reports/{report_id}/detach)
subledger.organization(org_id).book(book_id).report(report_id).detach({category: 'categoryId'},function (error, response) { ... });

// Render a report (POST /orgs/{org_id}/books/{book_id}/reports/{report_id}/render)
subledger.organization(org_id).book(book_id).report(report_id).render({at: new Date().toISOString()},function (error, response) { ... });

// Archive a report (POST /orgs/{org_id}/books/{book_id}/reports/{report_id}/archive)
subledger.organization(org_id).book(book_id).report(report_id).archive(function (error, response) { ... });

// Activate a report (POST /orgs/{org_id}/books/{book_id}/reports/{report_id}/activate)
subledger.organization(org_id).book(book_id).report(report_id).activate(function (error, response) { ... });
```

### Report Rendering
```javascript
// Get a report rendering (GET orgs/{org_id}/books/{book_id}/report_renderings/{report_rendering_id})
subledger.organization(org_id).book(book_id).report_rendering(report_rendering_id).get(function (error, response) { ... });
```

##Contributors

Contributors ordered by first contribution.

- Marc-André Arseneault <marc-andre@arsnl.ca>
- Alexandre Michetti Manduca <a.michetti@gmail.com>
- Philip Paquette <pcpaquette@gmail.com>


##License

Copyright 2015 Subledger
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
