The use of the Subledger JavaScript library is pretty easy! You just have to create an Subledger connector, use it to communicate with the API with easy chaining operations and then retrieve the callback results. Voilà!

### Callback result
The callback always return **Error** (`error`) as first parameter and **API Response** (`apiRes`) as second parameter.

#### Error
 * Error : `Error` object with the returned exception message
 * No error : `null`

#### API Response
 * Error : Complete Error object sent by the API
 * No error : Response sent by the API

Note than the Subledger JavaScript library doesn't manipulate the API Response and return it as received. Please, refer to the complete [API documentation](https://fakt.api.boocx.com/docs/#!) to know more about the returned API responses.

### Data and Parameters
When asked by the method, **Data** (`data`) and **Parameters** (`param`) refer to a well-formed object compliant with the API. Please, refer to the complete [API documentation](https://fakt.api.boocx.com/docs/#!) to know more about the compliant data and parameters for your API request.


### Create a new Subledger connection

```javascript
/**
 * Create a new Subledger connection
 * Subledger(url);
 * @param {String} url The account URL to connect to the Subledger API
 */

var subledger = new Subledger('https://mySubledgerAccount.api.boocx.com/v1');
```
### Book

#### Get one
```javascript
/**
 * subledger.book(book_id).get(callback);
 * @param {Function} callback
 */

subledger.book(book_id).get(function (error,apiRes){
 ...
});
```

#### Get list
```javascript
/**
 * subledger.book(book_id).get(param,callback);
 * @param {Object} [param]
 * @param {String} [param.state=active]
 * @param {Number} [param.starting=0]
 * @param {Function} callback
 */

//With parameters
subledger.book().get({...},function (error,apiRes){
 ...
});

//Without parameters
subledger.book().get(function (error,apiRes){
 ...
});
```

#### Create
```javascript
/**
 * subledger.book().create(data,callback);
 * @param {Object} data
 * @param {Function} callback
 */

subledger.book().create({...},function (error,apiRes){
  ...
});
```

#### Update
```javascript
/**
 * subledger.book(book_id).update(data,callback);
 * @param {Object} data
 * @param {Function} callback
 */

subledger.book(book_id).update({...},function (error,apiRes){
  ...
});
```

#### Activate
```javascript
/**
 * subledger.book(book_id).activate(callback);
 * @param {Function} callback
 */

subledger.book(book_id).activate(function (error,apiRes){
  ...
});
```

#### Archive
```javascript
/**
 * subledger.book(book_id).archive(callback);
 * @param {Function} callback
 */

subledger.book(book_id).archive(function (error,apiRes){
  ...
});
```

### Account

#### Get one
```javascript
/**
 * subledger.book(book_id).account(account_id).get(callback);
 * @param {Function} callback
 */

subledger.book(book_id).account(account_id).get(function (error,apiRes){
  ...
});
```

#### Get list
```javascript
/**
 * subledger.book(book_id).account().get(param,callback);
 * @param {Object} [param]
 * @param {String} [param.state=active]
 * @param {Number} [param.starting=0]
 * @param {Function} callback
 */

//With parameters
subledger.book(book_id).account().get({...},function (error,apiRes){
  ...
});

//Without parameters
subledger.book(book_id).account().get(function (error,apiRes){
  ...
});
```

#### Create
```javascript
/**
 * subledger.book(book_id).account().create(data,callback);
 * @param {Object} data
 * @param {Function} callback
 */

subledger.book(book_id).account().create({...},function (error,apiRes){
  ...
});
```

#### Update
```javascript
/**
 * subledger.book(book_id).account(account_id).update(data,callback);
 * @param {Object} data
 * @param {Function} callback
 */

subledger.book(book_id).account(account_id).create({...},function (error,apiRes){
  ...
});
```

#### Activate
```javascript
/**
 * subledger.book(book_id).account(account_id).activate(callback);
 * @param {Function} callback
 */

subledger.book(book_id).account(account_id).activate(function (error,apiRes){
  ...
});
```

#### Archive
```javascript
/**
 * subledger.book(book_id).account(account_id).archive(callback);
 * @param {Function} callback
 */

subledger.book(book_id).account(account_id).archive(function (error,apiRes){
  ...
});
```

#### Balance
```javascript
/**
 * subledger.book(book_id).account(account_id).balance(param,callback);
 * @param {Object} [param]
 * @param {String} [param.at=new Date().toISOString()]
 * @param {Function} callback
 */

//With parameters
subledger.book(book_id).account(account_id).balance({...},function (error,apiRes){
  ...
});

//Without parameters
subledger.book(book_id).account(account_id).balance(function (error,apiRes){
  ...
});
```

### Account Line

#### Get one
```javascript
/**
 * subledger.book(book_id).account(account_id).line(line_id).get(callback);
 * @param {Function} callback
 */

subledger.book(book_id).account(account_id).line(line_id).get(function (error,apiRes){
  ...
});
```

#### Get list
```javascript
/**
 * subledger.book(book_id).account(account_id).line().get(param,callback);
 * @param {Object} [param]
 * @param {Number} [param.starting=0]
 * @param {Function} callback
 */

//With parameters
subledger.book(book_id).account(account_id).line().get({...},function (error,apiRes){
  ...
});

//Without parameters
subledger.book(book_id).account(account_id).line().get(function (error,apiRes){
  ...
});
```

### Journal-Entry

#### Get one
```javascript
/**
 * subledger.book(book_id).journalEntry(journal_entry_id).get(callback);
 * @param {Function} callback
 */

subledger.book(book_id).journalEntry(journal_entry_id).get(function (error,apiRes){
  ...
});
```

#### Get list
```javascript
/**
 * subledger.book(book_id).journalEntry().get(param,callback);
 * @param {Object} [param]
 * @param {String} [param.before=new Date().toISOString()]
 * @param {String} [param.state=active]
 * @param {Function} callback
 */

//With parameters
subledger.book(book_id).journalEntry().get({...},function (error,apiRes){
  ...
});

//Without parameters
subledger.book(book_id).journalEntry().get(function (error,apiRes){
  ...
});
```

#### Create
```javascript
/**
 * subledger.book(book_id).journalEntry().create(data,callback);
 * @param {Object} data
 * @param {Function} callback
 */

subledger.book(book_id).journalEntry().create({...},function (error,apiRes){
  ...
});
```

#### Post
```javascript
/**
 * subledger.book(book_id).journalEntry(journal_entry_id).post(callback);
 * @param {Function} callback
 */

subledger.book(book_id).journalEntry(journal_entry_id).post(function (error,apiRes){
  ...
});
```

#### Create and post
```javascript
/**
 * subledger.book(book_id).journalEntry(journal_entry_id).createAndPost(data,callback);
 * @param {Object} data
 * @param {Function} callback
 */

subledger.book(book_id).journalEntry().createAndPost({...},function (error,apiRes){
  ...
});
```

#### Update
```javascript
/**
 * subledger.book(book_id).journalEntry(journal_entry_id).update(data,callback);
 * @param {Object} data
 * @param {Function} callback
 */

subledger.book(book_id).journalEntry(journal_entry_id).update(...},function (error,apiRes){
  ...
});
```

#### Archive
```javascript
/**
 * subledger.book(book_id).journalEntry(journal_entry_id).archive(callback);
 * @param {Function} callback
 */

subledger.book(book_id).journalEntry(journal_entry_id).archive(function (error,apiRes){
  ...
});
```

#### Activate
```javascript
/**
 * subledger.book(book_id).journalEntry(journal_entry_id).activate(callback);
 * @param {Function} callback
 */

subledger.book(book_id).journalEntry(journal_entry_id).activate(function (error,apiRes){
  ...
});
```

#### Balance
```javascript
/**
 * subledger.book(book_id).journalEntry(journal_entry_id).balance(callback);
 * @param {Function} callback
 */

subledger.book(book_id).journalEntry(journal_entry_id).balance(function (error,apiRes){
  ...
});
```

#### Progress
```javascript
/**
 * subledger.book(book_id).journalEntry(journal_entry_id).progress(callback);
 * @param {Function} callback
 */

subledger.book(book_id).journalEntry(journal_entry_id).progress(function (error,apiRes){
  ...
});
```

### Journal-Entry Line

#### Get one
```javascript
/**
 * subledger.book(book_id).journalEntry(journal_entry_id).line(line_id).get(callback);
 * @param {Function} callback
 */

subledger.book(book_id).journalEntry(journal_entry_id).line(line_id).get(function (error,apiRes){
  ...
});
```

#### Get list
```javascript
/**
 * subledger.book(book_id).journalEntry(journal_entry_id).line().get(param,callback);
 * @param {Object} [param]
 * @param {Number} [param.starting=0]
 * @param {String} [param.state=active]
 * @param {Function} callback
 */

//With parameters
subledger.book(book_id).journalEntry(journal_entry_id).line().get({...},function (error,apiRes){
  ...
});

//Without parameters
subledger.book(book_id).journalEntry(journal_entry_id).line().get(function (error,apiRes){
  ...
});
```

#### Create
```javascript
/**
 * subledger.book(book_id).journalEntry(journal_entry_id).line().create(data,callback);
 * @param {Object} data
 * @param {Function} callback
 */

subledger.book(book_id).journalEntry(journal_entry_id).line().create({...},function (error,apiRes){
  ...
});
```

#### Update
```javascript
/**
 * subledger.book(book_id).journalEntry(journal_entry_id).line(line_id).update(data,callback);
 * @param {Object} data
 * @param {Function} callback
 */

subledger.book(book_id).journalEntry(journal_entry_id).line(line_id).update({...},function (error,apiRes){
  ...
});
```

#### Activate
```javascript
/**
 * subledger.book(book_id).journalEntry(journal_entry_id).line(line_id).activate(callback);
 * @param {Function} callback
 */

subledger.book(book_id).journalEntry(journal_entry_id).line(line_id).activate(function (error,apiRes){
  ...
});
```

#### Archive
```javascript
/**
 * subledger.book(book_id).journalEntry(journal_entry_id).line(line_id).archive(callback);
 * @param {Function} callback
 */

subledger.book(book_id).journalEntry(journal_entry_id).line(line_id).archive(function (error,apiRes){
  ...
});
```