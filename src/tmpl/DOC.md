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

### Node.JS Support
To work on Node environment, this lib depends on [xmlhttprequest](https://github.com/driverdan/node-XMLHttpRequest) module.

It can be installed with the following command:
```
npm install xmlhttprequest
```

Then you can require and use Subledger on your Node.JS environment like following:
```
// require Subledger module
var Subledger = require('./subledger').Subledger;

// instantiate it
var subledger = new Subledger();
```

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

