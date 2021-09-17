// alert("high");
//  find every element on the web page that has "Coronavirus"
// loop through every element and its children and their children ect untill very el wiht corono is found
replaceText(document.body);
function replaceText(element) {
  //are there children inside this element ?
  if (element.hasChildNodes()) {
    // if yes run the function again on the child nodes do this
    element.childNodes.forEach(replaceText);
  } else if (element.nodeType === Text.Text_NODE) {
    //   this is a text element so can modify the text inside it
    element.textContent = element.textContent.replace(/(coronavirus)/gi, "   ");
  }
}
