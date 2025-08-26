// querySelector only returns the first match.

let el = document.querySelector('li.hot');
el.className = 'cool';

// querySelectorAll returns a NodeList.
// The third li element is then selected and changed.
let els = document.querySelectorAll('li.hot');
els[1].className = 'cool';
