// Select the starting point and find its children.
let startItem = document.getElementsByTagName('ul')[0];
let firstItem = startItem.firstElementChild;

let lastItem = startItem.lastElementChild;

// Change the values of the children's class attributes.
firstItem.className = 'complete';

lastItem.className = 'cool';
