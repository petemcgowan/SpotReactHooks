const path = require('path');
const express = require('express');
// const exphbs = require('express-handlebars');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');
const Sequelize = require ('sequelize');

const db = require('./config/database');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const sequelize = ("postgres://postgres:123456@localhost/newlabelreleases",
  {
    dialect: 'postgres',
  }
);

const eraseDatabaseOnSync = true;
db.authenticate()
  .then(() => { console.log('Database connected...')
  } )
  .catch(err => console.log('Error: ' + err))


  // Handlebars
// app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// app.set('view engine', 'handlebars');

const recordCrates = require('./routes/recordCrates');
const users = require('./routes/users');
const auth = require('./routes/auth');


if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/recordCrates', recordCrates);
app.use('/users', users);
app.use('/auth', auth);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

