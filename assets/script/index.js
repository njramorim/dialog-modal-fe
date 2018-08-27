
var newsLetterDialog = {
  init: function() {
    var dialog = document.getElementById('dialog'); 
    var dialogHash = '#dialog';
    var formUrl = '/api/newsletter';
    var hasDialogHash = function () { return window.location.hash === dialogHash };
    
    $.mockjax({url: formUrl, type: 'post', responseText: { 'status': 'Email cadastrado com sucesso' }});
    dialogPolyfill.registerDialog(dialog);    
    newsLetterDialog.handleHashOnClose(dialog);
    newsLetterDialog.handleCloseField(dialog);
    newsLetterDialog.handleNavigation(dialog, hasDialogHash);
    newsLetterDialog.handleFormSubmit(dialog, formUrl);
    newsLetterDialog.onPageLoad(dialog, hasDialogHash);
  },

  handleNavigation: function(dialog, hasDialogHash) {
    window.onhashchange = function () { 
      return hasDialogHash() ? dialog.showModal() : dialog.close()
    };
  },

  handleHashOnClose: function(dialog) {
    dialog.addEventListener('close', function(e) {
      return window.location = '#'
    });
  },

  handleCloseField: function(dialog) {
    var dialogCloseField = dialog.querySelector('.Dialog__closeField');
    dialogCloseField.onclick = function() {
      dialog.close();
    }
  },

  handleFormSubmit: function(dialog, formUrl) {
    var form = document.getElementById('newsletter');
    var formButton = document.getElementById('newsletterSubmit');

    formButton.addEventListener('click', function(e) {
      var isValid = form.checkValidity();
      if (isValid) {
        e.preventDefault();
        return newsLetterDialog.submitForm(dialog, form, formUrl)
      }
    })
  },

  submitForm: function(dialog, form, formUrl) {
    $.post(formUrl).done(function( data ) {
      console.log('status: ' + data.status );
      dialog.close();
      form.reset();
    });
  },

  onPageLoad: function(dialog, hasDialogHash) {
    return hasDialogHash() && dialog.showModal();
  }
};

$(document).ready(newsLetterDialog.init);