const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const connectDB = require('./config/db')

const posts = require('./routes/posts')

const app = express()


app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: '.hbs'
}))
app.set('view engine', 'hbs')



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(methodOverride('_method'))


app.use(express.json())

connectDB()


app.get('/', (req, res) => res.render('index'))
app.get('/about', (req, res) => res.render('about'))

app.use('/posts', posts)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('Server starts at port $(PORT)'));