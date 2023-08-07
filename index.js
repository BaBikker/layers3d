const express = require('express')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }));

app.post('/offerte', (req, res) => {
  const formDataOfferte = {
    voornaam: req.body.fname,
    achternaam: req.body.lname,
    email: req.body.email,
    streetname: req.body.streetname,
    postcode: req.body.zipcode,
    stad: req.body.city,
    printtechniek: req.body.printtechniek,
    materiaal: req.body.materiaal,
    opmerkingen: req.body.opmerkingen,
    bestand: req.body.bestand
  }
console.log(formDataOfferte);
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