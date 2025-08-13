let firstItem = document.getElementById('one'); // Find first list item
let showTextContent = firstItem.textContent;    // Get value of textContent
let showInnerText = firstItem.innerText;        // Get value of innerText

// Show the content of these two properties at the end of the list

let msg = '<p>textContent: ' + showTextContent + '</p>';
msg += '<p>innerText: ' + showInnerText + '</p>';


let el = document.getElementById('scriptResults');
el.innerHTML = msg;

firstItem.textContent = 'sourdough bread';       // Update the first list item
