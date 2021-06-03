const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
const { request } = require('http')

const app = express()
const port = process.env.PORT || 3000

const publicdirpath = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)

app.use(express.static(publicdirpath))

app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Shubham Kotarwar'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Shubham Kotarwar'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        title: 'Help',
        name: 'Shubham Kotarwar'
    })
})

app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error:'Please provide a sutaible address'
        })
    }
    geocode(req.query.address,(error,{ lattitude, longitude, location} = {}) =>{
        if(error){
            return res.send({error})
        }
        forecast(longitude, lattitude, (error, forecastdata) =>{
            if(error){
               return res.send({error})
            }
            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
            })
        })
    })
    // res.send({
    //     location: 'khadki',
    //     temprature: 27,
    //     address : req.query.address
    // })
})

app.get('/help/*',(req, res) => {
    res.render('404',{
        error: 'help page not found'
    })
})

app.get('*',(req, res) => {
    res.render('404',{
        error: '404 Page not found'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' +port)
})