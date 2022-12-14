const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const User = require('./models/user')
const noticias = require('./routes/noticias')
const restrito = require('./routes/restrito')

const mongo =  process.env.MONGODB || 'mongodb://localhost/noticias'


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use('/restrito', (req, res, next) => {
    if('user' in req.session){
        next()
    }
    res.send('Precisa logar')
})

app.use('/noticias', noticias)
app.use('/restrito', restrito)

const createInitialUser = async () => {
    const total = await User.count({ username: 'daniella' })
    if(total === 0) {
        const user = new User({
            username: 'neil',
            password: 'abc123'
        }) 
        await user.save()
        console.log('User saved successfully')
    } else {
        console.log('User creation skipped')
    }
}

app.get('/', (req, res) => res.render('index'))
mongoose
    .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        createInitialUser()
        app.listen(port, () => console.log('listening...'))
    })
    .catch( e => console.log(e))



