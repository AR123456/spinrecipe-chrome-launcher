// inport env
require("dotenv").config();
// hook up sendgrid
const sgMail = require("@sendgrid/mail");
// pass sendgrid the api key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// env in the process.env
// process.env.SENDGRID_API_KEY;
const nightmare = require("nightmare")();

// id = "priceblock_ourprice";
//  url   https://www.amazon.com/Samsung-970-EVO-Plus-MZ-V7S1T0B/dp/B07MFZY2F2/ref=pd_lpo_1?pd_rd_i=B07MFZY2F2&psc=1
// remove tracking info from url
//  url   https://www.amazon.com/Samsung-970-EVO-Plus-MZ-V7S1T0B/dp/B07MFZY2F2
// process.argv.slice(2) get the 3rd element , the url of the input when calling node parser
// node parser.js url
const args = process.argv.slice(2);
const url = args[0];
const minPrice = args[1];
checkPrice();
async function checkPrice() {
  //  putting the whole thing into a try catch so that I can be emailed if there is an error
  try {
    // nightmare go to this website
    const priceString = await nightmare
      .goto(url)
      //   wait untill something is rendered on page - this wait function allows nightmare to work with react, you can wait untill the js renders the page

      .wait("#priceblock_ourprice")
      // once loaded do this on the document-  can write JS as if on the front end of the application
      // find priceblock and get its innerText
      .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
      .end();
    // now parse the string into just the price remove $ and make it a num
    const priceNumber = parseFloat(priceString.replace("$", ""));
    if (priceNumber < minPrice) {
      await sendEmail(
        "Price is low",
        `The price on ${url} has dropped below ${minPrice}`
      );
      console.log("it is cheap");
    }
  } catch (e) {
    await sendEmail("Amazon Price checker error ", e.message);
    throw e;
  }
}

// function to send email
function sendEmail(subject, body) {
  const email = {
    // object of email feilds
    to: "rejejo2745@u461.com",
    from: "testing-amazon-price-checker@example.com",
    subject: subject,
    text: body,
    html: body,
  };
  // this is async so be sure to await in code
  return sgMail.send(email);
}
