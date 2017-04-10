$(document).ready(function() {

  var $required;
  var $notRequired;
  var $edit;
  var $del;
  var contactObject;
  var contactIndex;
  var contactId;
  var sortedCollection;
  var nameArray;
  var $form = $('#contact-form');
  var $submit = $form.find('input[value=Submit]')
  var $validationInputs = $('#name,#email,#phone')
  var $contacts = $('#contact-list');
  var $contactContainer = $('#contact-container')
  var $cancel = $('.cancel');
  var $name = $('#name');
  var $phone = $('#phone');
  var $email = $('#email');
  var $tags = $('#tags');
  var $search = $('#search-bar');
  var $searchMessage = $('#search-message');
  var $noContactsMessage = $('#no-contact-message');
  var $nameMessage = $('#validate-name')
  var $phoneMessage = $('#validate-phone')
  var $emailMessage = $('#validate-email')
  var $add_new = $('.go-to-form');
  var source = $("#contact-template").html();
  var template = Handlebars.compile(source);

  var contactList = {
    getContactsFromStorage: function() {
      var data = JSON.parse(localStorage.getItem('contact-data'));
      this.collection = data;
      this.processContactPane();
      this.bindContactButtons();
    },
    deleteContactActions: function() {
      event.preventDefault();
      this.setContactVars(event.target);
      var result = window.confirm('Are you sure you want to delete the contact: ' + contactObject.fullname + '?');
      if (result) {
        this.processDeleteChoice()
      } else {
        $noContactsMessage.css('display', 'none');
        this.showContactsPane();
      }
      this.clearSearchBar();
    },
    processDeleteChoice: function() {
      this.removeFromCollection();
      this.setLocalStorage();
      this.getContactsFromStorage();
      if (localStorage.getItem('contact-data') == "[]") {
        $noContactsMessage.css('display', 'block');
        this.showContactsPane();
      } else {
      $noContactsMessage.css('display', 'none');
      this.showContactsPane();
      }
    },
    removeFromCollection: function() {
      for (var i = 0; i < this.collection.length; i += 1) {
        if (this.collection[i].id === contactId) {
          this.collection.splice(i, 1);
          break;
        }
      }
    },
    clearSearchBar: function() {
      $search.val("");
    },
    editContactActions: function() {
      event.preventDefault();
      this.switchPaneView();
      this.setContactVars(event.target);
      this.populateInputFields();
      this.validateEditContact.call(this);
    },
    populateInputFields: function() {
      $name.val(contactObject.fullname);
      $email.val(contactObject.email);
      $phone.val(contactObject.phone);
      $tags.val(contactObject.tags);
    },
    validateEditContact: function() {
      $cancel.off();
      $submit.off();
      $submit.on('click', function() {
        this.clearFieldErrors();
        if (this.fieldContentValid()) {
          $submit.off()
          this.processEdit.call(this, contactId);
          this.bindInitialEvents.call(this);
          this.clearSearchBar();
        } else {
          this.displayFieldErrors.call(this);
        }
      }.bind(this));

      $cancel.on('click', function() {
        $submit.off()
        this.bindInitialEvents.call(this);
        this.switchPaneView();
        this.clearContactsField();
      }.bind(this));
    },
    validateNewContact: function() {
      $submit.off();
      $submit.on('click', function() {
        this.clearFieldErrors();
        if (this.fieldContentValid()) {
          $submit.off();
          this.updateContacts(); // rename updateContacts?
          this.bindInitialEvents.call(this);
          this.clearSearchBar();
        } else {
          this.displayFieldErrors.call(this);
        }
      }.bind(this));

      $cancel.on('click', function() {
        $submit.off()
        this.bindInitialEvents.call(this);
        this.switchPaneView();
        this.clearContactsField();
      }.bind(this));
    },
    fieldContentValid: function() {
      if (this.allFieldsPopulated() && !(this.emailFormatIncorrect())) {
        return true;
      } else {
        return false;
      }
    },
    allFieldsPopulated: function() {
      if ($name.val().length === 0 || this.emailFormatIncorrect() || $phone.val().length === 0) {
        return false;
      } else {
        return true;
      }
    },
    emailFormatIncorrect: function() {
      return !($email.val().match(/.+@\w+\.\w+/));
    },
    clearFieldErrors: function() {
      $nameMessage.text("");
      $phoneMessage.text("");
      $emailMessage.text("");
    },
    displayFieldErrors: function() {
      if ($name.val().length === 0) {
        $nameMessage.text('Name must be greater than 0 chars!');
      }
      if ($phone.val().length === 0) {
        $phoneMessage.text('Phone must be greater than 0 chars!');
      }
      if (this.emailFormatIncorrect()) {
        $emailMessage.text('Email must contain @ and domain!');
      }
    },
    processEdit: function(id) {
      event.preventDefault();
      var contact = new Contact($name.val(), $email.val(), $phone.val(), $tags.val());
      contact.id = id;
      this.updateCollection(contact);
      this.setLocalStorage();
      $submit.off()
      $submit.on('click', this.updateContacts.bind(this));
      this.switchPaneView();
      this.getContactsFromStorage();
      this.clearContactsField();
    },
    updateCollection: function(contact) {
      for (var i = 0; i < this.collection.length; i += 1) {
        if (this.collection[i].id === contact.id) {
          this.collection[i] = contact;
          break;
        }
      }
    },
    createContactObject: function() {
      var contact =  new Contact($name.val(), $email.val(), $phone.val(), $tags.val());
      contact.id = this.collection.length + 1;
      return contact;
    },
    clearContactsField: function() {
      $name.val("");
      $email.val("");
      $phone.val("");
      $tags.val("");
    },
    updateContacts: function() {
      if (this.collection === undefined) {
        this.collection = [];
      }
      this.collection.push(this.createContactObject());
      this.setLocalStorage();
      $noContactsMessage.hide();
      this.switchPaneView();
      this.getContactsFromStorage();
    },
    setLocalStorage: function() {
      localStorage.setItem('contact-data', JSON.stringify(this.collection));
    },
    setContactVars: function(buttonElement) {
      contactIndex = $(buttonElement).closest('div.contact').index();
      contactObject = this.sortedCollection[contactIndex];
      contactId = this.sortedCollection[contactIndex].id;
    },
    searchBarActions: function(event) {
      this.showContactsPane();
      if ($search.val() === "") {
        $searchMessage.hide();
        $contactContainer .show();
        this.processContactPane();
      }
      this.processContactPane($search.val());
    },
    processContactPane: function(searchWord) {
      this.sortContacts();
      if (searchWord) {
        this.sortedCollection = this.refineCollection(searchWord);
      } else {
        this.sortedCollection = this.collection;
      }
      this.showSearchMessage.call(this, searchWord);
      this.bindContactButtons.call(this);
    },
    showSearchMessage: function (searchWord) {
      if (this.sortedCollection.length === 0 && this.collection.length > 0) {
        $searchMessage.show();
        $searchMessage.text(searchWord + ' not found!');
        $contactContainer .hide();
      } else {
        $contactContainer.html(template(this.sortedCollection));
      }
    },
    sortContacts: function() {
      sortedCollection = this.collection.sort(function(a,b) {
        return a.surname.localeCompare(b.surname);
      });
    },
    refineCollection: function(word) {
      return sortedCollection.map(function(contactObj) {
        var re = new RegExp('^' + word + '|(\\s' + word + ')\S*', 'i');
        if (contactObj.fullname.match(re) || contactObj.tags.match(re)) {
          return contactObj;
        }
      }).filter(function(x) {
        return typeof x !== 'undefined';
      });
    },
    readyBlankForm: function() {
      this.clearContactsField();
      this.switchPaneView();
    },
    bindInitialEvents: function() {
      $add_new.on('click', function() {
        this.readyBlankForm();
        this.validateNewContact();
      }.bind(this));
      $cancel.on('click', this.switchPaneView.bind(this));
      $search.on('input', this.searchBarActions.bind(this));
      this.bindContactButtons.bind(this);
    },
    bindContactButtons: function() {
      $edit = $('.edit');
      $edit.off();
      $edit.on('click', this.editContactActions.bind(this));
      $del = $('.delete');
      $del.off();
      $del.on('click', this.deleteContactActions.bind(this));
    },
    showContactsPane: function() {
      // hides form when search bar used
      if ($form.is(':visible')) {
        $form.hide();
      }
      $contacts.show();
    },
    switchPaneView: function() {
      if ($contacts.is(':visible')) {
        $required = $form;
        $notRequired = $contacts;
      } else {
        $required = $contacts;
        $notRequired = $form;
      }
      $notRequired.animate({
        height: 0,
      }, 400, function() {
        $notRequired.css('height', 'auto').hide();
        $required.show().slideDown();
      });
    },
    init: function() {
      this.collection;
      this.sortedCollection;
      this.showContactsPane();
      this.renderInitialView.call(this);
      this.bindInitialEvents();
    },
    renderInitialView: function() {
      if (localStorage.getItem('contact-data') === null || localStorage.getItem('contact-data') === "[]") {
        $noContactsMessage.show();
      } else {
        $noContactsMessage.hide();
        this.getContactsFromStorage();
      }
    },
  };

  var newList = Object.create(contactList).init();

  function Contact(fullname, email, phone, tags) {
    this.fullname = fullname;
    nameArray = fullname.split(" ");
    this.forenames = nameArray.splice(0, nameArray.length - 1).join(" ");
    this.surname = nameArray.join("");
    this.email = email;
    this.phone = phone;
    this.tags = "#";
  }
});