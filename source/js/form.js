goog.provide('formManager');

/**
 * Form manager
 * @constructor
 * @export
 */
let formManager = () => {
    console.log('in the form');
  // Formbox endpoint
  // let key = '1c0e2e9771e811e58bd571b7f0b170cc';
  // this.url = 'https://services.google.com/fb/submissions/' + key + '/';

  // Dom elements
  this.firstName = document.getElementById('f-first-name');
  this.lastName = document.getElementById('f-last-name');
  this.email = document.getElementById('f-email');
  this.company = document.getElementById('f-company');
  this.country = document.getElementById('f-country');
  this.submitBtn = document.getElementById('submit');
  this.successText = document.getElementById('form-submit-successful');
  this.formError = document.getElementById('signup-form-error');

  // Submit listener
  // Uncomment out when el exists in project

  // this.submitBtn.addEventListener('click', (e =>vt) {
  //   evt.preventDefault();
  //   this.submitForm();
  // }.bind(this), false);
};

/**
 * Submit a form
 */
formManager.prototype.submitForm = () => {
  let self = this;
  let xhr = new XMLHttpRequest();
  let response;

  this.hideErrors();

  xhr.onreadystatechange = () => {
    if (xhr.readyState < 4) return;

    response = JSON.parse(xhr.responseText);

    if (response.result === 'invalid') {
      self.showErrors(response['errors']);
    } else {
      self.handleSuccess();
    }
  };

  xhr.open('POST', this.url, true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(this.getFormData());
};

/**
 * Handle a succesful form send
 */
formManager.prototype.handleSuccess = () => {
  this.successText.style.display = 'block';
  this.submitBtn.style.display = 'none';

  // tracking
  ga_tracker.pushCommand(['_trackEvent', 'sign up form submit', 'success']);
};

/**
 * Show errors
 * @param  {Object} errors The errors
 */
formManager.prototype.showErrors = (errors) => {
  this.formError.style.display = 'block';

  // tracking
  ga_tracker.pushCommand(['_trackEvent', 'sign up form submit', 'failed']);
};

/**
 * Hide Errors
 */
formManager.prototype.hideErrors = () => {
  this.formError.style.display = 'none';
};

/**
 * Get the form data
 * @return {String}
 */
formManager.prototype.getFormData = () => {
  // let isDeveloper = this.company.value !== '' ? 'Yes' : 'No';

  return 'first_name=' + this.firstName.value +
    '&last_name=' + this.lastName.value +
    '&email=' + this.email.value +
    '&company=' + this.company.value +
    '&country=' + this.country.value;
};


/**
 * Reset the form
 */
formManager.prototype.resetForm = () => {
  this.submitBtn.classList.remove('success');
  this.signUpAgain.classList.remove('success');
  this.signUpSubheader.classList.remove('success');
  this.successText.classList.remove('success');
  this.privacyPolicy.classList.remove('success');

  for (let i = 0; i < this.signUpEls.length; i++) {
    this.signUpEls[i].classList.remove('success');
  }
};
