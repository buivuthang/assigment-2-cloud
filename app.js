const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const connectDB = require('./config/db')
    //import routes 
const posts = require('./routes/posts')
    //khoi dong app
const app = express()
    //khoi dong express
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//khoi dong body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
    //khoi dong method override
app.use(methodOverride('_method'))

//khoi dong middleware
app.use(express.json())
    //ket noi co so du lieu
connectDB()

//mot so route co ban, co the dua vao file rieng trong thu muc routes
app.get('/', (req, res) => res.render('index'))
app.get('/about', (req, res) => res.render('about'))

//import routes 
app.use('/posts', posts)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('Server khoi dong tai port $(PORT)'));