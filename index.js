const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const Hero = require('./models/Hero')

const port = 5000

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// routes
app.use('/api', require('./routes/heroes.routes'))

async function start() {
  try {
      mongoose.connect("mongodb+srv://cryalonebaby:nikita21@cluster0.tmk9pvv.mongodb.net/heros?retryWrites=true&w=majority", {
          useNewUrlParser: true,
          useUnifiedTopology: true
      })
      app.listen(port, () => console.log(`App started on port ${port}`))
  } catch (e) {
      console.log('Server Error', e.message);
      process.exit(1)
  }
}

start()