// alert("high");
//  find every element on the web page that has "Coronavirus"
// loop through every element and its children and their children ect untill very el with  corono is found
replaceText(document.body);
function replaceText(element) {
  //are there children inside this element ?
  if (element.hasChildNodes()) {
    // if yes run the function again on the child nodes do this
    element.childNodes.forEach(replaceText);
  } else if (element.nodeType === Text.TEXT_NODE) {
    // replace the entire section of text that has coronavirus in it.
    if (element.textContent.match(/coronavirus/gi)) {
      // get the parent elements style and set the text color and background text black
      element.parentElement.style.color = "black";
      element.parentElement.style.backgroundColor = "black";
    }
  }
}
