const express = require('express')
const app = express()
const port = 3000
const nodemailer = require("nodemailer");
const { json } = require('stream/consumers');

app.use(express.urlencoded({ extended: true }));


const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  auth: {
    user: 'bartbikker@live.nl',
    pass: 'Flitsdehond1!'
  }
});

app.post('/offerte', (req, res) => {
  var formDataOfferte = {
    voornaam: req.body.fname,
    achternaam: req.body.lname,
    email: req.body.email,
    straatnaam: req.body.streetname,
    postcode: req.body.zipcode,
    stad: req.body.city,
    printtechniek: req.body.printtechniek,
    materiaal: req.body.materiaal,
    opmerkingen: req.body.opmerkingen,
    bestand: req.body.bestand
  }

  async function offerteEmail() {

    const emailGegevens = await transporter.sendMail({
      from: 'bartbikker@live.nl',
      to: "bartbikker@live.nl", 
      subject: "Offerte Aanvraag", 
      text:"Nieuwe offerte aanvraag via de website gegevens:" + "\n\n" +
           "Voornaam: " + formDataOfferte.voornaam + "\n" +
           "Achternaam: " + formDataOfferte.achternaam + "\n" +
           "Email: " + formDataOfferte.email + "\n" +
           "Straatnaam: " + formDataOfferte.straatnaam + "\n" +
           "Postcode: " + formDataOfferte.postcode + "\n" +
           "Stad: " + formDataOfferte.stad + "\n" +
           "Printtechniek: " + formDataOfferte.printtechniek + "\n" +
           "Materiaal: " + formDataOfferte.materiaal + "\n" +
           "Opmerkingen: " + req.body.opmerkingen + "\n" +
           "Binnen 48 uur reageren",
      attachments: [
        {
          filename:req.body.bestand ,
          content: req.body.bestand
        }
      ]     
    });
    console.log("Message sent: %s", emailGegevens.messageId);
  }
console.log(formDataOfferte);
offerteEmail();
});


app.post('/contact', (req, res) => {
  const formDataContact = {
    naam: req.body.fname,
    email: req.body.email,
    streetname: req.body.streetname,
    postcode: req.body.zipcode,
    stad: req.body.city,
    opmerkingen: req.body.opmerkingen,
  }
  console.log(formDataContact);
  async function contactEmail() {

    const emailGegevens = await transporter.sendMail({
      from: 'bartbikker@live.nl',
      to: "bartbikker@live.nl", 
      subject: "Contactformulier ingevuld", 
      text:"Contactformulier ingevuld, reageren" + "\n\n" +
           "Voornaam: " + formDataContact.naam + "\n" +
           "Email: " + formDataContact.email + "\n" +
           "Straatnaam: " + formDataContact.streetname + "\n" +
           "Postcode: " + formDataContact.postcode + "\n" +
           "Stad: " + formDataContact.stad + "\n" +
           "Opmerkingen: " + formDataContact.opmerkingen + "\n" +
           "Binnen 48 uur reageren",
      attachments: [
        {
          filename:req.body.bestand ,
          content: req.body.bestand
        }
      ]     
    });
    console.log("Message sent: %s", emailGegevens.messageId);
  }
console.log(formDataContact);
contactEmail();
});




app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
})

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + "/public/contact.html")
})

app.get('/3dprintservice', (req, res) => {
  res.sendFile(__dirname + "/public/3dprintservice.html")
})

app.get('/offerte', (req, res) => {
  res.sendFile(__dirname + "/public/offerte.html")
})

app.get('/prijzen', (req, res) => {
  res.sendFile(__dirname + "/public/prijzen.html")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})