/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

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
