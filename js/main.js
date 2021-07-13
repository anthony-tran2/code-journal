/* global data */
/* exported data */

function imgURL(event) {
  var $img = document.querySelector('img');
  var newURL = event.target.value;
  $img.setAttribute('src', newURL);
  if (event.target.value === '') {
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
}

document.addEventListener('input', imgURL);
