/* global data */
/* exported data */

var $img = document.querySelector('div.column-half>img');
var $form = document.querySelector('#journal-entry');
var $dataViewDivs = document.querySelectorAll('div[data-view]');
var ul = document.querySelector('ul.padding-left-0');
var entryFormHeader = document.querySelector('form#journal-entry>div.column-full>h1');
var deleteEntryButton = $form.querySelector('button[name="deleteEntryButton"]');
var cancelButton = document.querySelector('button.cancelButton');
var modalDiv = document.querySelector('.modal-row');
var confirmButton = document.querySelector('button.confirmButton');

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
  h2TitleDiv.className = 'entryTitle';
  var iconDiv = document.createElement('div');
  iconDiv.className = 'text-align-right icon';
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

function switchView(string) {
  for (var i = 0; i < $dataViewDivs.length; i++) {
    if ($dataViewDivs[i].getAttribute('data-view') !== string) {
      $dataViewDivs[i].className += ' ' + 'hidden';
    } else {
      $dataViewDivs[i].className = 'container';
    }
  }
  data.view = string;
  if (data.entries.length !== 0) {
    var noEntries = document.querySelector('div.justify-center');
    noEntries.className = 'row justify-center hidden';
  }
}

function newHeader(newTitle) {
  entryFormHeader.textContent = newTitle;
}

function resetImg() {
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
}

function imgURL(event) {
  if (event.target.getAttribute('name') !== 'imgURL') {
    return;
  }
  var newURL = event.target.value;
  $img.setAttribute('src', newURL);
  if (event.target.value === '') {
    resetImg();
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
  if (data.editing === null) {
    formInputs.entryId = data.nextEntryId;
    data.nextEntryId += 1;
    data.entries.unshift(formInputs);
    var newEntry = entryViewCreation(data.entries[0]);
    ul.prepend(newEntry);
  } else {
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === data.editing.entryId) {
        formInputs.entryId = data.editing.entryId;
        data.entries[i] = formInputs;
        var currentLi = ul.querySelector('li[data-entry-id="' + data.entries[i].entryId + '"]');
        var currentImg = currentLi.querySelector('img.img-container-view');
        var currentTitle = currentLi.querySelector('div.entryTitle>h2');
        var currentNotes = currentLi.querySelector('div>p');
        currentImg.setAttribute('src', data.entries[i].imgURL);
        currentTitle.textContent = data.entries[i].title;
        currentNotes.textContent = data.entries[i].notes;
        break;
      }
    }
  }
  resetImg();
  $form.reset();
  deleteEntryButton.className += ' ' + 'hidden';
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

document.addEventListener('click', function (event) {
  if (event.target.getAttribute('class') === 'entriesNav') {
    $form.reset();
    resetImg();
    data.editing = null;
    switchView('entries');
  } else if (event.target.getAttribute('name') === 'newButton') {
    switchView('entry-form');
    newHeader('New Entry');
    data.editing = null;
  }
});

ul.addEventListener('click', function (event) {
  var eventLiParent = event.target.closest('li');
  var parentId = eventLiParent.getAttribute('data-entry-id');
  if (event.target.className === 'fas fa-pen') {
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId + '' === parentId) {
        data.editing = data.entries[i];
        break;
      }
    }
    deleteEntryButton.className = 'delete-button-design';
    switchView('entry-form');
    newHeader('Edit Entry');

    $form.elements.title.value = data.editing.title;
    $form.elements.imgURL.value = data.editing.imgURL;
    $form.elements.notes.value = data.editing.notes;
    $img.setAttribute('src', $form.elements.imgURL.value);
  }
});

function modalPopUp(event) {
  if (event.target.getAttribute('name') !== 'deleteEntryButton') {
    return;
  }
  modalDiv.className = 'modal-row tint true-center position-fixed';
}

deleteEntryButton.addEventListener('click', modalPopUp);

function hideModal(event) {
  modalDiv.className = ' ' + 'hidden';
}

cancelButton.addEventListener('click', hideModal);

function deleteEntry(event) {
  event.preventDefault();
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === data.editing.entryId) {
      var ulCurrentChild = ul.querySelector('li[data-entry-id="' + data.entries[i].entryId + '"]');
      ul.removeChild(ulCurrentChild);
      data.entries.splice(i, 1);
      break;
    }
  }
  data.nextEntryId = 1;
  for (var d = data.entries.length - 1; d >= data.entries.length; d--) {
    data.entries[d].entryId = data.nextEntryId;
    data.nextEntryId++;
  }
  hideModal();
  deleteEntryButton.className += ' ' + 'hidden';
  switchView('entries');
  $form.elements.title.value = null;
  $form.elements.imgURL.value = null;
  $form.elements.notes.value = null;
  resetImg();
}

confirmButton.addEventListener('click', deleteEntry);
