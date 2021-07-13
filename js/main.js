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
  data.nextEntryId += 1;
  data.entries.unshift(formInputs);
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}

$form.addEventListener('submit', EntryFormData);

var previousDataJSON = localStorage.getItem('code-journal-local-storage');
if (previousDataJSON !== null) {
  var oldData = JSON.parse(previousDataJSON);
  data.entries = oldData.entries;
  data.nextEntryId = oldData.nextEntryId;
}

function storeData(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('code-journal-local-storage', dataJSON);
}

window.addEventListener('beforeunload', storeData);
