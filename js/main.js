/* global data */
/* exported data */

var $img = document.querySelector('div.column-half>img');
var $form = document.querySelector('#journal-entry');
var $dataViewDivs = document.querySelectorAll('div[data-view]');
var ul = document.querySelector('ul.padding-left-0');

function entryViewCreation(entry) {
  var li = document.createElement('li');
  li.setAttribute('class', 'row margin-bottom-li');
  li.setAttribute('data-entry-id', entry.entryId);

  var imgDiv = document.createElement('div');
  imgDiv.setAttribute('class', 'column-half');
  var imgView = document.createElement('img');
  imgView.setAttribute('class', 'cover img-container-view');
  imgView.setAttribute('src', entry.imgURL);
  imgView.setAttribute('alt', 'journal-entry-image');

  var textDiv = document.createElement('div');
  textDiv.setAttribute('class', 'column-half');
  var titleRowDiv = document.createElement('div');
  titleRowDiv.className = 'row';
  var h2TitleDiv = document.createElement('div');
  h2TitleDiv.className = 'column-half entryTitle';
  var iconDiv = document.createElement('div');
  iconDiv.className = 'column-half text-align-right icon';
  var icon = document.createElement('i');
  icon.className = 'fas fa-pen';
  var h2Title = document.createElement('h2');
  h2Title.textContent = entry.title;
  var pNotes = document.createElement('p');
  pNotes.textContent = entry.notes;

  imgDiv.appendChild(imgView);
  iconDiv.appendChild(icon);
  h2TitleDiv.appendChild(h2Title);
  titleRowDiv.appendChild(h2TitleDiv);
  titleRowDiv.appendChild(iconDiv);
  textDiv.appendChild(titleRowDiv);
  textDiv.appendChild(pNotes);
  li.appendChild(imgDiv);
  li.appendChild(textDiv);
  return li;
}

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
  var newEntry = entryViewCreation(data.entries[0]);
  ul.prepend(newEntry);
  switchView('entries');
}

$form.addEventListener('submit', entryFormData);

function journalEntryView(event) {
  switchView(data.view);
  if (data.entries.length === 0) {
    var noEntries = document.querySelector('div.justify-center');
    noEntries.className = 'row justify-center';
  }
  for (var i = 0; i < data.entries.length; i++) {
    var displayEntries = entryViewCreation(data.entries[i]);
    ul.appendChild(displayEntries);
  }
}

window.addEventListener('DOMContentLoaded', journalEntryView);

function switchView(string) {
  for (var i = 0; i < $dataViewDivs.length; i++) {
    if ($dataViewDivs[i].getAttribute('data-view') !== string) {
      $dataViewDivs[i].className += ' ' + 'hidden';
    } else {
      $dataViewDivs[i].className = 'container';
    }
  }
  data.view = string;
}

document.addEventListener('click', function (event) {
  if (event.target.getAttribute('class') === 'entriesNav') {
    switchView('entries');
  } else if (event.target.getAttribute('name') === 'newButton') {
    switchView('entry-form');
  }
});
