const express = require('express');
const app = express();
const port = 3000;
const nodemailer = require("nodemailer");
const multer = require('multer');
const path = require('path');
const fs = require('fs'); 



app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const uniqueFileName = Date.now() + '-' + path.extname(file.originalname);
    cb(null, uniqueFileName); 
  },
});

const upload = multer({ storage: storage })


const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  auth: {
    user: 'bartbikker@live.nl',
    pass: 'Flitsdehond1!'
  }
});

app.post('/offerte', upload.single('bestand'), async (req, res) => {
  try {
    const uploadedFile = req.file;

    console.log('Uploaded File:', uploadedFile);

    const formDataOfferte = {
      voornaam: req.body.fname,
      achternaam: req.body.lname,
      email: req.body.email,
      straatnaam: req.body.streetname,
      postcode: req.body.zipcode,
      stad: req.body.city,
      printtechniek: req.body.printtechniek,
      materiaal: req.body.materiaal,
      opmerkingen: req.body.opmerkingen,
      bestand: uploadedFile ? uploadedFile.buffer : null,
    };

    console.log(formDataOfferte);

    if (uploadedFile) {
      await offerteEmail(formDataOfferte, uploadedFile); // Send email
    }

    res.redirect('/success');
  } catch (error) {
    console.error('Error processing form data:', error);
    res.status(500).send('Error processing form data.');
  }
});

var mailList = [  
'bartbikker@live.nl',
'bikker44@gmail.com',
]

async function offerteEmail(formDataOfferte, uploadedFile) {
  try {
    const emailGegevens = await transporter.sendMail({
      from: 'bartbikker@live.nl',
      to: mailList,
      subject: 'Offerte Aanvraag',
      text: 'Nieuwe offerte aanvraag via de website gegevens:\n\n' +
        'Voornaam: ' + formDataOfferte.voornaam + '\n' +
        'Achternaam: ' + formDataOfferte.achternaam + '\n' +
        'Email: ' + formDataOfferte.email + '\n' +
        'Straatnaam: ' + formDataOfferte.straatnaam + '\n' +
        'Postcode: ' + formDataOfferte.postcode + '\n' +
        'Stad: ' + formDataOfferte.stad + '\n' +
        'Printtechniek: ' + formDataOfferte.kleur + '\n' +
        'Materiaal: ' + formDataOfferte.materiaal + '\n' +
        'Opmerkingen: ' + formDataOfferte.opmerkingen + '\n' +
        'Binnen 48 uur reageren',
      attachments: [
        {
          filename: uploadedFile.originalname,
          content: fs.createReadStream(uploadedFile.path), 
          contentType: uploadedFile.mimetype, 
        },
      ],
    });

    console.log('Message sent: %s', emailGegevens.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}


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
      to: mailList, 
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
res.redirect('/success');
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

app.get('/success', (req, res) => {
  res.sendFile(__dirname + "/public/success.html")
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})