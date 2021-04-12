if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '.env' });
}

const express = require('express')
const app = express();
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

const mongoose = require('mongoose')
//mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true} )

 mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex: true
  }).then(()=>{
    console.log("conected to mongodb");
  }).catch(error => {
    console.log("mongo error",error);
  })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.error('connected to mongoose'))

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000);