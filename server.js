require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 2030;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.use(express.json());


mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log(`Mongodb connected with server: ${data.connection.host}`);
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/address', require('./routes/address'));
app.use('/auth', require('./routes/auth'));
app.use('/search', require('./routes/search'))
app.listen(PORT, () => console.log(`Server is working on port: ${PORT}`));
