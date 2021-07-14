/* global data */
/* exported data */

var $img = document.querySelector('div.column-half>img');
var $form = document.querySelector('#journal-entry');
var $nav = document.querySelector('nav');
var $divEntryForm = document.querySelector('div[data-view="entry-form"]');
var $divEntries = document.querySelector('div[data-view="entries"]');
var ul = document.querySelector('ul.padding-left-0');

function imgURL(event) {
  if (event.target.getAttribute('name') !== 'imgURL') {
    return;
  }
  var newURL = event.target.value;
  $img.setAttribute('src', newURL);
  if (event.target.value === '') {
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
}

document.addEventListener('input', imgURL);

function entryFormData(event) {
  event.preventDefault();
  if (event.target.elements.submitButton.getAttribute('name') !== 'submitButton') {
    return;
  }
  var formInputs = {
    title: $form.elements.title.value,
    imgURL: $form.elements.imgURL.value,
    notes: $form.elements.notes.value
  };
  formInputs.entryId = data.nextEntryId;
  data.nextEntryId += 1;
  data.entries.unshift(formInputs);
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();

  var li = document.createElement('li');
  li.setAttribute('class', 'row margin-bottom-li');

  var imgDiv = document.createElement('div');
  imgDiv.setAttribute('class', 'column-half');
  var imgView = document.createElement('img');
  imgView.setAttribute('class', 'cover img-container-view');
  imgView.setAttribute('src', data.entries[0].imgURL);
  imgView.setAttribute('alt', 'journal-entry-image');

  var textDiv = document.createElement('div');
  textDiv.setAttribute('class', 'column-half');
  var h2Title = document.createElement('h2');
  h2Title.textContent = data.entries[0].title;
  var pNotes = document.createElement('p');
  pNotes.textContent = data.entries[0].notes;

  imgDiv.appendChild(imgView);
  textDiv.appendChild(h2Title);
  textDiv.appendChild(pNotes);
  li.appendChild(imgDiv);
  li.appendChild(textDiv);
  ul.prepend(li);

  $divEntryForm.className += ' ' + 'hidden';
  $divEntries.className = 'container';
}

$form.addEventListener('submit', entryFormData);

function journalEntryView(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var li = document.createElement('li');
    li.setAttribute('class', 'row margin-bottom-li');

    var imgDiv = document.createElement('div');
    imgDiv.setAttribute('class', 'column-half');
    var imgView = document.createElement('img');
    imgView.setAttribute('class', 'cover img-container-view');
    imgView.setAttribute('src', data.entries[i].imgURL);
    imgView.setAttribute('alt', 'journal-entry-image');

    var textDiv = document.createElement('div');
    textDiv.setAttribute('class', 'column-half');
    var h2Title = document.createElement('h2');
    h2Title.textContent = data.entries[i].title;
    var pNotes = document.createElement('p');
    pNotes.textContent = data.entries[i].notes;

    imgDiv.appendChild(imgView);
    textDiv.appendChild(h2Title);
    textDiv.appendChild(pNotes);
    li.appendChild(imgDiv);
    li.appendChild(textDiv);
    ul.appendChild(li);
  }
}

window.addEventListener('DOMContentLoaded', journalEntryView);

function goToViewEntries(event) {
  if (event.target.textContent === 'Entries') {
    $divEntryForm.className += ' ' + 'hidden';
    $divEntries.className = 'container';
  }
}

$nav.addEventListener('click', goToViewEntries);

function goToCreateEntries(event) {
  if (event.target.getAttribute('name') === 'newButton') {
    $divEntries.className += ' ' + 'hidden';
    $divEntryForm.className = 'container';
  }
}

document.addEventListener('click', goToCreateEntries);
