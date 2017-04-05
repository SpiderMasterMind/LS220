$(document).ready(function() {

  var $required;
  var $notRequired;
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
  var $noContactsMessage = $('#no-contact-message');
  var $add_new = $('[id=go-to-form]');
  $form.hide();

  var source = $("#contact-template").html();
  var template = Handlebars.compile(source);
  
  var contactList = {
    deleteContactActions: function() {
      event.preventDefault();

      var contactIndex = $(event.target).closest('div.contact').index();
      contactIndex = contactIndex - 1;
      var contactObject = this.collection[contactIndex]
      var result = window.confirm('Are you sure you want to delete the contact: ' + contactObject.fullname + '?');
      if (result) {
        this.collection.splice(contactIndex, 1);
        localStorage.setItem('contact-data', JSON.stringify(this.collection));
        this.getContactsFromStorage();
        if (localStorage.getItem('contact-data') == "[]") {
          $('#no-contact-message').css('display', 'block');
          this.showContactsPane();
        }
      } else {
        $('#no-contact-message').css('display', 'none');
        this.showContactsPane();
      }
    },
    // cancel after edit doesnt rebind properly
    editContactActions: function() {
      event.preventDefault();
      this.switchPaneView();

      var contactIndex = $(event.target).closest('div.contact').index();
      contactIndex = contactIndex - 1;
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
        this.switchPaneView();
      }.bind(this));
    },
    submitEdit: function(idx) {
      event.preventDefault();
      this.collection[idx] = new Contact($name.val(), $email.val(), $phone.val(), $tags.val());
      localStorage.setItem('contact-data', JSON.stringify(this.collection));
      $('.submit').off()
      $submit.on('click', this.submitForm.bind(this));
      this.switchPaneView();
      this.getContactsFromStorage();
    },
    createContactObject: function() {
      return new Contact($name.val(), $email.val(), $phone.val(), $tags.val());
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
      $('#no-contact-message').css('display', 'none');
      this.switchPaneView();
      this.getContactsFromStorage();
    },
    getContactsFromStorage: function() {
      var data = JSON.parse(localStorage.getItem('contact-data'));
      this.collection = data;
      this.renderContactTemplates(); // how do I refactor without messing it Up?
      this.bindContactButtons();
    },
    renderContactTemplates: function() {
      $('#contact-list').html(template(this.collection)); // guard clause so we either append to the section or add to it?
    },
    bindEvents: function() {
      $submit.on('click', this.submitForm.bind(this));
      $add_new.on('click', this.switchPaneView.bind(this));
      $cancel.on('click', this.switchPaneView.bind(this));
      this.bindContactButtons.bind(this);
    },
    bindContactButtons: function() {
      $edit = $('.edit');
      $edit.on('click', this.editContactActions.bind(this));
      $del = $('.delete');
      $del.on('click', this.deleteContactActions.bind(this));
    },
    init: function() {
      this.collection;
      if (localStorage.getItem('contact-data') !== null) {
        $('#no-contact-message').css('display', 'none');
        this.getContactsFromStorage();
      } else {
        $('#no-contact-message').css('display', 'block');
      }
      this.showContactsPane();
      this.bindEvents();
    },
    showContactsPane: function() {
      $contacts.css('display', 'block');
    },
    switchPaneView: function() { // pass view in to this for refactor?
      if ($('#contact-list').is(':visible')) {
        $required = $form;
        $notRequired = $contacts;
      } else {
        $required = $contacts;
        $notRequired = $form;
      }
      $notRequired.animate({
        height: 0,
      }, 700, function() {
        $notRequired.css('height', 'auto').css('display', 'none');
        $required.css('display', 'block').slideDown();
      });
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

