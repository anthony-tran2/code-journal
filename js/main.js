/* global data */
/* exported data */

var $img = document.querySelector('div.column-half>img');
var $form = document.querySelector('#journal-entry');

function imgURL(event) {
  if (event.target.getAttribute('name') !== 'imgURL') {
    return;
  }
  var newURL = event.target.value;
  $img.setAttribute('src', newURL);
  if (event.target.value !== '') {
    return;
  }
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
}

document.addEventListener('input', imgURL);

function EntryFormData(event) {
  event.preventDefault();
  if (event.target.elements.submitButton.getAttribute('name') !== 'submitButton') {
    return;
  }
  var formInputs = {
    name: $form.elements.title.value,
    imgURL: $form.elements.imgURL.value,
    notes: $form.elements.notes.value
  };
  formInputs.nextEntryId = data.nextEntryId;
  data.entries.prepend(formInputs);
  $form.reset();
}

$form.addEventListener('submit', EntryFormData);
