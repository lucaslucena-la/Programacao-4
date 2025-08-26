// Store the first list item in a variable
let firstItem = document.getElementById('one');

// Get the content of the first list item

let itemContent = firstItem.innerHTML;

// Update the content of the first list item so it is a link
firstItem.innerHTML = '<a href=\"http://example.org\">' + itemContent + '</a>';
