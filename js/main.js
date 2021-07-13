/* global data */
/* exported data */

var $img = document.querySelector('div.column-half>img');

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
