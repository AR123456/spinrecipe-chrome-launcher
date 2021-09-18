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
    //  just black out the word coronavirus
    // replace with  a new element
    // $1 captures everyting inthe parens in the regex
    if (element.textContent.match(/coronavirus/gi)) {
      // const newElement = document.createElement("span");
      // newElement.innerHTML = element.textContent.replace(
      //   /(coronavirus)/gi,
      //   '<span style="background-color: black; color: black";>$1</span>'
      // );
      // element.replaceWith(newElement);
      // just remove the parent entierly
      element.parentElement.remove();
    }
  }
}
