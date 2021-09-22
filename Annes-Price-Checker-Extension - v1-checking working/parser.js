const nightmare = require("nightmare")();
// id = "priceblock_ourprice";
//  url   https://www.amazon.com/Samsung-970-EVO-Plus-MZ-V7S1T0B/dp/B07MFZY2F2/ref=pd_lpo_1?pd_rd_i=B07MFZY2F2&psc=1
// remove tracking info from url
//  url   https://www.amazon.com/Samsung-970-EVO-Plus-MZ-V7S1T0B/dp/B07MFZY2F2

checkPrice();
async function checkPrice() {
  // nightmare go to this website
  const priceString = await nightmare
    .goto(
      "https://www.amazon.com/Samsung-970-EVO-Plus-MZ-V7S1T0B/dp/B07MFZY2F2"
    )
    //   wait untill something is rendered on page - this wait function allows nightmare to work with react, you can wait untill the js renders the page

    .wait("#priceblock_ourprice")
    // once loaded do this on the document-  can write JS as if on the front end of the application
    // find priceblock and get its innerText
    .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
    .end();
  // now parse the string into just the price remove $ and make it a num
  const priceNumber = parseFloat(priceString.replace("$", ""));
  if (priceNumber < 200) {
    console.log("it is cheap");
  } else {
    console.log("it is expensive ");
  }
}
