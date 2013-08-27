var subledger,identity,identityKey,organization,book,account,journalEntry,journalEntryToPost,journalEntryLine;

exports['var subledger = new Subledger()'] = {
  'Create Subledger connection' : function (test) {
    subledger = new Subledger();
    test.equal(subledger.url,'https://api.subledger.com/v1');
    test.equal(subledger.oauth_consumer_key,null);
    test.equal(subledger.oauth_consumer_secret,null);
    test.done();
  }
};

exports['subledger.identity() without OAuth'] = {
  'Create Subledger identity' : function (test) {
    subledger.identity().create({'email': 'test@test.com','description': 'test', 'reference': 'http://www.test.com'},function(e,d){
      test.ifError(e);
      test.ok(d.active_identity !== undefined,'"active_identity" property exist');
      test.ok(d.active_identity.id !== undefined,'"active_identity.id" property exist');
      test.deepEqual(d.active_identity.description,'test','"active_identity.description" property equal "test"');
      test.ok(d.active_key !== undefined,'"active_key" property exist');
      test.ok(d.active_key.id !== undefined,'"active_key.id" property exist');
      identity = d;
      test.done();
    });
  }
};

exports['subledger.setCredentials()'] = {
  'Set Subledger consumer identity' : function (test) {
    subledger.setCredentials(identity.active_key.id, identity.active_key.secret);
    test.equal(subledger.oauth_consumer_key,identity.active_key.id);
    test.equal(subledger.oauth_consumer_secret,identity.active_key.secret);
    test.done();
  }
};

exports['subledger.identity() with OAuth'] = {
  'Get Subledger identity' : function (test) {
    subledger.identity(identity.active_identity.id).get(function(e,d){
      test.ifError(e);
      test.ok(d.active_identity !== undefined,'"active_identity" property exist');
      test.ok(d.active_identity.id !== undefined,'"active_identity.id" property exist');
      test.deepEqual(d.active_identity.description,'test','"active_identity.description" property equal "test"');
      test.done();
    });
  },
  'Update Subledger identity' : function (test) {
    var update = {
      "email":identity.active_identity.email,
      "description":"test2",
      "reference":identity.active_identity.reference,
      "version": identity.active_identity.version + 1
    };

    subledger.identity(identity.active_identity.id).update(update,function(e,d){
      test.ifError(e);
      test.ok(d.active_identity !== undefined,'"active_identity" property exist');
      test.ok(d.active_identity.id !== undefined,'"active_identity.id" property exist');
      test.deepEqual(d.active_identity.description,'test2','"active_identity.description" property equal "test2"');
      test.done();
    });
  }
};

exports['subledger.identity().key()'] = {
  'Create Subledger identity key' : function (test) {
    subledger.identity(identity.active_identity.id).key().create({'identity_id':identity.active_identity.id},function(e,d){
      test.ifError(e);
      test.ok(d.active_key !== undefined,'"active_key" property exist');
      test.ok(d.active_key.id !== undefined,'"active_key.id" property exist');
      identityKey = d;
      test.done();
    });
  },
  'Get Subledger identity key' : function (test) {
    subledger.identity(identity.active_identity.id).key(identityKey.active_key.id).get(function(e,d){
      test.ifError(e);
      test.ok(d.active_key !== undefined,'"active_key" property exist');
      test.ok(d.active_key.id !== undefined,'"active_key.id" property exist');
      test.done();
    });
  },
  'Archive Subledger identity key' : function (test) {
    subledger.identity(identity.active_identity.id).key(identityKey.active_key.id).archive(function(e,d){
      test.ifError(e);
      test.ok(d.archived_key !== undefined,'"archived_key" property exist');
      test.ok(d.archived_key.id !== undefined,'"archived_key.id" property exist');
      test.done();
    });
  },
  'Activate Subledger identity key' : function (test) {
    subledger.identity(identity.active_identity.id).key(identityKey.active_key.id).activate(function(e,d){
      test.ifError(e);
      test.ok(d.active_key !== undefined,'"active_key" property exist');
      test.ok(d.active_key.id !== undefined,'"active_key.id" property exist');
      test.done();
    });
  }
};

exports['subledger.organization()'] = {
  'Create Subledger organization' : function (test) {
    subledger.organization().create({'description': 'test', 'reference': 'http://www.test.com'},function(e,d){
      test.ifError(e);
      test.ok(d.active_org !== undefined,'"active_org" property exist');
      test.ok(d.active_org.id !== undefined,'"active_org.id" property exist');
      test.deepEqual(d.active_org.description,'test','"active_org.description" property equal "test"');
      organization = d;
      test.done();
    });
  },
  'Get Subledger organization' : function (test) {
    subledger.organization(organization.active_org.id).get(function(e,d){
      test.ifError(e);
      test.ok(d.active_org !== undefined,'"active_org" property exist');
      test.ok(d.active_org.id !== undefined,'"active_org.id" property exist');
      test.done();
    });
  },
  'Update Subledger organization' : function (test) {
    var update = {
      'description': 'test2',
      'reference': organization.active_org.reference,
      'version': organization.active_org.version + 1
    };

    subledger.organization(organization.active_org.id).update(update,function(e,d){
      test.ifError(e);
      test.ok(d.active_org !== undefined,'"active_org" property exist');
      test.ok(d.active_org.id !== undefined,'"active_org.id" property exist');
      test.deepEqual(d.active_org.description,'test2','"active_org.description" property equal "test2"');
      test.done();
    });
  },
  'Archive Subledger organization' : function (test) {
    subledger.organization(organization.active_org.id).archive(function(e,d){
      test.ifError(e);
      test.ok(d.archived_org !== undefined,'"archived_org" property exist');
      test.ok(d.archived_org.id !== undefined,'"archived_org.id" property exist');
      test.done();
    });
  },
  'Activate Subledger organization' : function (test) {
    subledger.organization(organization.active_org.id).activate(function(e,d){
      test.ifError(e);
      test.ok(d.active_org !== undefined,'"active_org" property exist');
      test.ok(d.active_org.id !== undefined,'"active_org.id" property exist');
      test.done();
    });
  }
};

exports['subledger.organization().book()'] = {
  'Get Subledger Books without parameter' : function (test) {
    subledger.organization(organization.active_org.id).book().get(function(e,d){
      test.ifError(e);
      test.ok(d.active_books !== undefined,'"active_books" property exist');
      test.deepEqual(_.isArray(d.active_books),true,'"active_books" property contain array');
      test.done();
    });
  },
  'Get Subledger Books with parameter' : function (test) {
    subledger.organization(organization.active_org.id).book().get({'state':'archived'},function(e,d){
      test.ifError(e);
      test.ok(d.archived_books !== undefined,'"archived_books" property exist');
      test.deepEqual(_.isArray(d.archived_books),true,'"archived_books" property contain array');
      test.done();
    });
  },
  'Create Subledger Book' : function (test) {
    subledger.organization(organization.active_org.id).book().create({'description': 'foo','reference': 'http://www.bar.com'},function(e,d){
      test.ifError(e);
      test.ok(d.active_book !== undefined,'"active_book" property exist');
      test.ok(d.active_book.id !== undefined,'"active_book.id" property exist');
      test.deepEqual(d.active_book.description,'foo','"active_book.description" property equal "foo"')
      book = d;
      test.done();
    });
  },
  'Get Subledger Book' : function (test) {
    subledger.organization(organization.active_org.id).book(book.active_book.id).get(function(e,d){
      test.ifError(e);
      test.ok(d.active_book !== undefined,'"active_book" property exist');
      test.deepEqual(d.active_book.id,book.active_book.id,'"active_books.id" property is the same');
      test.done();
    });
  },
  'Update Subledger Book' : function (test) {
    var update = {
      "description": 'baz',
      "reference": book.active_book.reference,
      "version": book.active_book.version + 1
    };

    subledger.organization(organization.active_org.id).book(book.active_book.id).update(update,function(e,d){
      test.ifError(e);
      test.ok(d.active_book !== undefined,'"active_book" property exist');
      test.ok(d.active_book.id !== undefined,'"active_book.id" property exist');
      test.deepEqual(d.active_book.description,'baz','"active_book.description" property equal "baz"')
      book = d;
      test.done();
    });
  },
  'Archive Subledger Book' : function (test) {
    subledger.organization(organization.active_org.id).book(book.active_book.id).archive(function(e,d){
      test.ifError(e);
      test.ok(d.archived_book !== undefined,'"archived_book" property exist');
      test.ok(d.archived_book.id !== undefined,'"archived_book.id" property exist');
      book = d;
      test.done();
    });
  },
  'Activate Subledger Book' : function (test) {
    subledger.organization(organization.active_org.id).book(book.archived_book.id).activate(function(e,d){
      test.ifError(e);
      test.ok(d.active_book !== undefined,'"active_book" property exist');
      test.ok(d.active_book.id !== undefined,'"active_book.id" property exist');
      book = d;
      test.done();
    });
  }
};

exports['subledger.organization().book().account()'] = {
  'Get Subledger Book Accounts without parameter' : function (test) {
    subledger.organization(organization.active_org.id).book(book.active_book.id).account().get(function(e,d){
      test.ifError(e);
      test.ok(d.active_accounts !== undefined,'"active_accounts" property exist');
      test.deepEqual(_.isArray(d.active_accounts),true,'"active_accounts" property contain array');
      test.done();
    });
  },
  'Get Subledger Book Accounts with parameter' : function (test) {
    subledger.organization(organization.active_org.id).book(book.active_book.id).account().get({'state':'archived'},function(e,d){
      test.ifError(e);
      test.ok(d.archived_accounts !== undefined,'"archived_accounts" property exist');
      test.deepEqual(_.isArray(d.archived_accounts),true,'"archived_accounts" property contain array');
      test.done();
    });
  },
  'Create Subledger Book Account' : function (test) {
    subledger.organization(organization.active_org.id).book(book.active_book.id).account().create({'description': 'foo','reference': 'http://www.bar.com','normal_balance':'debit'},function(e,d){
      test.ifError(e);
      test.ok(d.active_account !== undefined,'"active_account" property exist');
      test.ok(d.active_account.id !== undefined,'"active_account.id" property exist');
      test.deepEqual(d.active_account.description,'foo','"active_account.description" property equal "foo"')
      account = d;
      test.done();
    });
  },
  'Get Subledger Book Account' : function (test) {
    subledger.organization(organization.active_org.id).book(book.active_book.id).account(account.active_account.id).get(function(e,d){
      test.ifError(e);
      test.ok(d.active_account !== undefined,'"active_account" property exist');
      test.deepEqual(d.active_account.id,account.active_account.id,'"active_account.id" property is the same');
      test.done();
    });
  },
  'Update Subledger Book Account' : function (test) {
    var update = {
      "description": "baz",
      "reference": account.active_account.reference,
      "normal_balance": account.active_account.normal_balance,
      "version": account.active_account.version + 1
    };

    subledger.organization(organization.active_org.id).book(book.active_book.id).account(account.active_account.id).update(update,function(e,d){
      test.ifError(e);
      test.ok(d.active_account !== undefined,'"active_account" property exist');
      test.ok(d.active_account.id !== undefined,'"active_account.id" property exist');
      test.deepEqual(d.active_account.description,'baz','"active_account.description" property equal "baz"')
      account = d;
      test.done();
    });
  },
  'Get Subledger Book Account Balance without parameter' : function (test) {
    subledger.organization(organization.active_org.id).book(book.active_book.id).account(account.active_account.id).balance(function(e,d){
      test.ifError(e);
      test.ok(d.balance !== undefined,'"balance" property exist');
      test.ok(d.balance.debit_value !== undefined,'"balance.debit_value" property exist');
      test.done();
    });
  },
  'Get Subledger Book Account Balance with parameter' : function (test) {
    subledger.organization(organization.active_org.id).book(book.active_book.id).account(account.active_account.id).balance({'at':20200101},function(e,d){
      test.ifError(e);
      test.ok(d.balance !== undefined,'"balance" property exist');
      test.ok(d.balance.debit_value !== undefined,'"balance.debit_value" property exist');
      test.done();
    });
  },
  'Archive Subledger Book Account' : function (test) {
    subledger.organization(organization.active_org.id).book(book.active_book.id).account(account.active_account.id).archive(function(e,d){
      test.ifError(e);
      test.ok(d.archived_account !== undefined,'"archived_account" property exist');
      test.ok(d.archived_account.id !== undefined,'"archived_account.id" property exist');
      account = d;
      test.done();
    });
  },
  'Activate Subledger Book Account' : function (test) {
    subledger.organization(organization.active_org.id).book(book.active_book.id).account(account.archived_account.id).activate(function(e,d){
      test.ifError(e);
      test.ok(d.active_account !== undefined,'"active_account" property exist');
      test.ok(d.active_account.id !== undefined,'"active_account.id" property exist');
      account = d;
      test.done();
    });
  }
};

exports['subledger.organization().book().account().line()'] = {
  'Get Subledger Book Account Lines without parameter' : function (test) {
    subledger.organization(organization.active_org.id).book(book.active_book.id).account(account.active_account.id).line().get(function(e,d){
      test.ifError(e);
      test.ok(d.posted_lines !== undefined,'"posted_lines" property exist');
      test.deepEqual(_.isArray(d.posted_lines),true,'"posted_lines" property contain array');
      test.done();
    });
  },
  'Get Subledger Book Account Lines with parameter' : function (test) {
    subledger.organization(organization.active_org.id).book(book.active_book.id).account(account.active_account.id).line().get({'before':20200101},function(e,d){
      test.ifError(e);
      test.ok(d.posted_lines !== undefined,'"posted_lines" property exist');
      test.deepEqual(_.isArray(d.posted_lines),true,'"posted_lines" property contain array');
      test.done();
    });
  }
};

exports['subledger.organization().book().journalEntry()'] = {
  'Get Subledger Book Journal Entries without parameter' : function (test) {
    subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry().get(function(e,d){
      test.ifError(e);
      test.ok(d.active_journal_entries !== undefined,'"active_journal_entries" property exist');
      test.deepEqual(_.isArray(d.active_journal_entries),true,'"active_journal_entries" property contain array');
      test.done();
    });
  },
  'Get Subledger Book Journal Entries with parameter' : function (test) {
    subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry().get({'state':'archived','before':new Date().toISOString()},function(e,d){
      test.ifError(e);
      test.ok(d.archived_journal_entries !== undefined,'"archived_journal_entries" property exist');
      test.deepEqual(_.isArray(d.archived_journal_entries),true,'"archived_journal_entries" property contain array');
      test.done();
    });
  },
  'Create Subledger Book Journal Entry' : function (test) {
    subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry().create({"effective_at": new Date().toISOString(),"description": "foo","reference": "http://www.bar.com"},function(e,d){
      test.ifError(e);
      test.ok(d.active_journal_entry !== undefined,'"active_journal_entry" property exist');
      test.ok(d.active_journal_entry.id !== undefined,'"active_journal_entry.id" property exist');
      test.deepEqual(d.active_journal_entry.description,'foo','"active_account.description" property equal "foo"')
      journalEntry = d;
      test.done();
    });
  },
  'Create Subledger Book Journal Entry to be posted' : function (test) {
    subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry().create({"effective_at": new Date().toISOString(),"description": "foo","reference": "http://www.bar.com"},function(e,d){
      test.ifError(e);
      test.ok(d.active_journal_entry !== undefined,'"active_journal_entry" property exist');
      test.ok(d.active_journal_entry.id !== undefined,'"active_journal_entry.id" property exist');
      test.deepEqual(d.active_journal_entry.description,'foo','"active_account.description" property equal "foo"')
      journalEntryToPost = d;
      test.done();
    });
  },
  'Create and Post Subledger Book Journal Entry' : function (test) {
    var data = {
      "effective_at": new Date().toISOString(),
      "description": "foo",
      "reference": "http://www.bar.com",
      "lines": [
        {
          "account": account.active_account.id,
          "description": "foo",
          "reference": "http://www.bar.com",
          "value": {
            "type":"zero",
            "amount":"0"
          },
          "order": "1"
        }
      ]
    };

    subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry().createAndPost(data,function(e,d){
      test.ifError(e);
      test.ok(d.posting_journal_entry !== undefined,'"posting_journal_entry" property exist');
      test.ok(d.posting_journal_entry.id !== undefined,'"posting_journal_entry.id" property exist');
      test.deepEqual(d.posting_journal_entry.description,'foo','"posting_journal_entry.description" property equal "foo"')
      test.done();
    });
  },
  'Get Subledger Book Journal Entry' : function (test) {
    subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).get(function(e,d){
      test.ifError(e);
      test.ok(d.active_journal_entry !== undefined,'"active_journal_entry" property exist');
      test.ok(d.active_journal_entry.id !== undefined,'"active_journal_entry.id" property exist');
      test.deepEqual(d.active_journal_entry.id,journalEntry.active_journal_entry.id,'"active_journal_entry.id" property is the same');
      test.done();
    });
  },
  'Update Subledger Book Journal Entry' : function (test) {
    var update = {
      "effective_at": journalEntry.active_journal_entry.effective_at,
      "description": "baz",
      "reference": journalEntry.active_journal_entry.reference,
      "version": journalEntry.active_journal_entry.version + 1
    };
    subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).update(update,function(e,d){
      test.ifError(e);
      test.ok(d.active_journal_entry !== undefined,'"active_account" property exist');
      test.ok(d.active_journal_entry.id !== undefined,'"active_account.id" property exist');
      test.deepEqual(d.active_journal_entry.description,'baz','"active_account.description" property equal "baz"')
      journalEntry = d;
      test.done();
    });
  },
  'Get Subledger Book Journal Entry Balance' : function (test) {
    subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).balance(function(e,d){
      test.ifError(e);
      test.ok(d.balance !== undefined,'"balance" property exist');
      test.ok(d.balance.debit_value !== undefined,'"balance.debit_value" property exist');
      test.done();
    });
  },
  'Get Subledger Book Journal Entry Progress' : function (test) {
    subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).progress(function(e,d){
      test.ifError(e);
      test.ok(d.progress !== undefined,'"progress" property exist');
      test.ok(d.progress.percentage !== undefined,'"progress.percentage" property exist');
      test.done();
    });
  },
  'Archive Subledger Book Journal Entry' : function (test) {
    subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).archive(function(e,d){
      test.ifError(e);
      test.ok(d.archived_journal_entry !== undefined,'"archived_journal_entry" property exist');
      test.ok(d.archived_journal_entry.id !== undefined,'"archived_journal_entry.id" property exist');
      journalEntry = d;
      test.done();
    });
  },
  'Activate Subledger Book Journal Entry' : function (test) {
    subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry(journalEntry.archived_journal_entry.id).activate(function(e,d){
      test.ifError(e);
      test.ok(d.active_journal_entry !== undefined,'"active_journal_entry" property exist');
      test.ok(d.active_journal_entry.id !== undefined,'"active_journal_entry.id" property exist');
      journalEntry = d;
      test.done();
    });
  }
};

exports['subledger.organization().book().journalEntry().line()'] = {
  'Get Subledger Book Journal Entry Lines without parameter' : function (test) {
    subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).line().get(function(e,d){
      test.ifError(e);
      test.ok(d.active_lines !== undefined,'"active_lines" property exist');
      test.deepEqual(_.isArray(d.active_lines),true,'"active_lines" property contain array');
      test.done();
    });
  },
  'Get Subledger Book Journal Entry Lines with parameter' : function (test) {
    subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).line().get({'state':'archived'},function(e,d){
      test.ifError(e);
      test.ok(d.archived_lines !== undefined,'"archived_lines" property exist');
      test.deepEqual(_.isArray(d.archived_lines),true,'"archived_lines" property contain array');
      test.done();
    });
  },
  'Create Subledger Book Journal Entry Line' : function (test) {
    var data = {
      "account": account.active_account.id,
      "description": "foo",
      "reference": "http://www.bar.com",
      "value": {
        "type":"zero",
        "amount":"0"
      },
      "order": "1"
    };
    subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).line().create(data,function(e,d){
      test.ifError(e);
      test.ok(d.active_line !== undefined,'"active_line" property exist');
      test.ok(d.active_line.id !== undefined,'"active_line.id" property exist');
      test.deepEqual(d.active_line.description,'foo','"active_line.description" property equal "foo"');
      journalEntryLine = d;
      test.done();
    });
  },
  'Create Subledger Book Journal Entry Line in other journal entry' : function (test) {
    var data = {
      "account": account.active_account.id,
      "description": "foo",
      "reference": "http://www.bar.com",
      "value": {
        "type":"zero",
        "amount":"0"
      },
      "order": "1"
    };
    subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry(journalEntryToPost.active_journal_entry.id).line().create(data,function(e,d){
      test.ifError(e);
      test.ok(d.active_line !== undefined,'"active_line" property exist');
      test.ok(d.active_line.id !== undefined,'"active_line.id" property exist');
      test.deepEqual(d.active_line.description,'foo','"active_line.description" property equal "foo"');
      test.done();
    });
  },
  'Post Subledger Book Journal Entry' : function (test) {
    subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry(journalEntryToPost.active_journal_entry.id).post(function(e,d){
      test.ifError(e);
      test.ok(d.posting_journal_entry !== undefined,'"posting_journal_entry" property exist');
      test.ok(d.posting_journal_entry.id !== undefined,'"posting_journal_entry.id" property exist');
      journalEntryToPost = d;
      test.done();
    });
  },
  'Get Subledger Book Journal Entry Line' : function (test) {
    subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).line(journalEntryLine.active_line.id).get(function(e,d){
      test.ifError(e);
      test.ok(d.active_line !== undefined,'"active_line" property exist');
      test.ok(d.active_line.id !== undefined,'"active_line.id" property exist');
      test.done();
    });
  },
  'Update Subledger Book Journal Entry Line' : function (test) {
    var data = {
      "account": journalEntryLine.active_line.account,
      "description": "baz",
      "reference": journalEntryLine.active_line.reference,
      "value": journalEntryLine.active_line.value,
      "order": journalEntryLine.active_line.order,
      "version": journalEntryLine.active_line.version + 1
    };

    subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).line(journalEntryLine.active_line.id).update(data,function(e,d){
      test.ifError(e);
      test.ok(d.active_line !== undefined,'"active_line" property exist');
      test.ok(d.active_line.id !== undefined,'"active_line.id" property exist');
      test.deepEqual(d.active_line.description,'baz','"active_line.description" property equal "baz"');
      journalEntryLine = d;
      test.done();
    });
  },
  'Archive Subledger Book Journal Entry Line' : function (test) {
    subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).line(journalEntryLine.active_line.id).archive(function(e,d){
      test.ifError(e);
      test.ok(d.archived_line !== undefined,'"archived_line" property exist');
      test.ok(d.archived_line.id !== undefined,'"archived_line.id" property exist');
      journalEntryLine = d;
      test.done();
    });
  },
  'Activate Subledger Book Journal Entry Line' : function (test) {
    subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).line(journalEntryLine.archived_line.id).activate(function(e,d){
      test.ifError(e);
      test.ok(d.active_line !== undefined,'"active_line" property exist');
      test.ok(d.active_line.id !== undefined,'"active_line.id" property exist');
      journalEntryLine = d;
      test.done();
    });
  }
};