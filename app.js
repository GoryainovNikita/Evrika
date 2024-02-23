const
    users = require('./find'),
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser')

const app = express()

app.set('views', path.join(__dirname, 'view'))

app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: true }))

app.route('/').get((req, res) => {
    res.render('index')
})

app.route('/user').post((req, res) => {
    let name = req.body.name

    users((userName) => {
        res.render('users', {
            'value': userName.indexOf(name)
        })
    })
})

const server = app.listen(3000)