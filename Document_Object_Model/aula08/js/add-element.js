// Create a new element and store it in a variable.
let newEl = document.createElement('li');

// Create a text node and store it in a variable.

let newText = document.createTextNode('pineapple');

// Attach the new text node to the new element.
newEl.appendChild(newText);

// Find the position where the new element should be added.
let position = document.getElementsByTagName('ul')[0];

// Insert the new element into its position.
position.appendChild(newEl);


/*function addToList(item) {
    let newEl = document.createElement('li');
    let newText = document.createTextNode(item);
    newEl.appendChild(newText);
    let position = document.getElementsByTagName('ul')[0];
    position.appendChild(newEl);
}

addToList('abacate');*/