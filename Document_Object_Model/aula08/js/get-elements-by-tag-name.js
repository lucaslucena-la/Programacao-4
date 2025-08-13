let elements = document.getElementsByTagName('li'); // Find <li> elements

if (elements.length > 0) {  // If 1 or more are found

  let el = elements[3];     // Select the first one using array syntax
  el.className = 'cool';    // Change the value of the class attribute

}
