// Select the starting point and find its siblings.
let startItem = document.getElementById('two');
let prevItem = startItem.previousElementSibling;
let nextItem = startItem.nextElementSibling;


// Change the values of the siblings' class attributes.
prevItem.className = 'toohot';
nextItem.className = 'cool';
