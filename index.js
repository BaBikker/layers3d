const express = require('express')
const app = express()
const port = 80


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