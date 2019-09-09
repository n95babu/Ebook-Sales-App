/* eslint-disable no-console */
const express = require('express');
const keys = require('./config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');


const app = express();

// HANDLEBARS MIDDLEWARE
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// =====================MIDDLEWARE======================

// BODY-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set Static Folder
app.use(express.static(`${__dirname}/public`));

// INDEX ROUTE
app.get('/', (req, res) => {
  res.render('index', {
    stripePublishableKey: keys.stripePublishableKey,
  });
});

// Charge Route
app.post('/charge', (req, res) => {
  const amount = 10000;
  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken,
  })
    .then(customer => stripe.charges.create({
      amount,
      description: 'T-shirt design by HSA Inc.',
      currency: 'usd',
      customer: customer.id,
    }))
    .then(charge => res.render('success'));
});

const port = process.env.PORT || 3005;

// =============================L==========================
app.listen(port, () => {
  console.log(`server is online on port ${port}`);
});