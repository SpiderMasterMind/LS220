$(document).ready(function() {

  var $form = $('#contact-form');
  var $submit = $form.find('input[value=Submit]')
  var $contacts = $('#contact-list');
  var $cancel = $('.cancel');
  var $name = $('#name');
  var $phone = $('#phone');
  var $email = $('#email');
  var $tags = $('#tags');
  var $edit;
  var $del;
  var $add_new = $('[id=go-to-form]');
  $form.hide();

  var source = $("#contact-template").html();
  var template = Handlebars.compile(source);
  
  var contactList = {
    bindEvents: function() {
      $submit.on('click', this.submitForm.bind(this));
      $add_new.on('click', this.showFormPane.bind(this));
      $cancel.on('click', this.showContactsPane);
      this.bindContactButtons.bind(this);
    },
    bindContactButtons: function() {
      $edit = $('.edit');
      $edit.on('click', this.editContactActions.bind(this));
      $del = $('.delete');
      $del.on('click', this.deleteContactActions.bind(this));
    },
    deleteContactActions: function() {
      event.preventDefault();

      var contactIndex = $(event.target).closest('div.contact').index();
      var contactObject = this.collection[contactIndex]
      var result = window.confirm('Are you sure you want to delete the contact: ' + contactObject.fullname + '?');
      if (result) {
        this.collection.splice(contactIndex,1);
        localStorage.setItem('contact-data', JSON.stringify(this.collection));
        this.showContactsPane();
        // function to possibly display no contacts message required!
        // cancel after edit doesnt rebind properly
        this.getContactsFromStorage();
      } else {
        this.showContactsPane();
      }
    },
    editContactActions: function() {
      event.preventDefault();
      this.showFormPane();

      var contactIndex = $(event.target).closest('div.contact').index();
      var contactObject = this.collection[contactIndex]
      $name.val(contactObject.fullname);
      $email.val(contactObject.email);
      $phone.val(contactObject.phone);
      $tags.val(contactObject.tags);

      $('.submit').off()
      $('.submit').on('click', function() {
        this.submitEdit(contactIndex)
      }.bind(this));

      $cancel.off();
      $cancel.on('click', function() {
        $submit.on('click', this.submitForm);
        this.showContactsPane();
      }.bind(this));
    },
    submitEdit: function(idx) {
      event.preventDefault();
      this.collection[idx] = new Contact($name.val(), $email.val(), $phone.val(), $tags.val());
      localStorage.setItem('contact-data', JSON.stringify(this.collection));
      $('.submit').off()
      $submit.on('click', this.submitForm.bind(this));
      this.showContactsPane();
      this.getContactsFromStorage();
    },
    showFormPane: function() {
      this.clearContactsField();
      $contacts.animate({
        height: 0,
      }, 700, function() {
        $contacts.css('height', 'auto').css('display', 'none');
        $form.css('display', 'block').slideDown();
      });
    },
    showContactsPane: function() {
      $form.animate({
        height: 0,
      }, 450, function() {
        $form.css('height', 'auto').css('display', 'none');
        $contacts.css('display', 'block').slideDown();
      });
    },
    createContactObject: function() {
      var contact = new Contact($name.val(), $email.val(), $phone.val(), $tags.val());
      return contact;
    },
    clearContactsField: function() {
      $name.val("");
      $email.val("");
      $phone.val("");
      $tags.val("");
    },
    submitForm: function(event) {
      event.preventDefault();
      if (this.collection === undefined) {
        this.collection = [];
      }
      this.collection.push(this.createContactObject());
      localStorage.setItem('contact-data', JSON.stringify(this.collection));
      this.showContactsPane();
      this.getContactsFromStorage();

    },
    getContactsFromStorage: function() {
      var data = JSON.parse(localStorage.getItem('contact-data'));
      this.collection = data;
      this.renderContactTemplates(); // how do I refactor without messing it Up?
      this.bindContactButtons();
    },
    renderContactTemplates: function() {
      $contacts.html(template(this.collection));
    },
    init: function() {
      this.collection;
      if (localStorage.getItem('contact-data') !== null) {
        $('#no-contact-message').hide()
        this.getContactsFromStorage();
      } else {
        $('#no-contact-message').show()
      }
      this.showContactsPane();
      this.bindEvents();
    },
  };

  var newList = Object.create(contactList).init();
  function Contact(fullname, email, phone, tags) {
    this.fullname = fullname;
    this.email = email;
    this.phone = phone;
    this.tags = tags;
  }
});