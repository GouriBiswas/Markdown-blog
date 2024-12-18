const express = require('express')
const mongoose = require('mongoose')
const Article =  require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()
require("dotenv").config();

// mongoose.connect('mongodb://localhost/blog',)

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };

  try {
    console.log("Attempting to connect to database.....");
    mongoose.connect(process.env.MONGO_URI,{connectTimeoutMS: 10000 });
    console.log("Connected to database.....");
  } catch (error) {
    console.log("Failed to connect to database.....", error.message);
    process.exit(1);
  }

app.set('view engine' , 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))


app.get('/', async (req, res) => {
     const articles = await Article.find().sort({ createdAt: 'desc'})
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(process.env.PORT || 5000)