/* eslint-disable no-console */
const express = require('express');
const stripe = require('stripe')('sk_test_tfyNadXe3eYXYKUYKYJ1IHcr00OvwjBoRR');
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
  res.render('index');
});


const port = process.env.PORT || 3005;



// =============================L==========================
app.listen(port, () => {
  console.log(`server is online on port ${port}`);
});