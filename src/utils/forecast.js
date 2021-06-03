const request = require("request")
const forecast = (longitude,lattitude, callstack) =>{
    const url = 'http://api.weatherstack.com/current?access_key=b272ab49ff5efc13598e7a7985f30d42&query='+encodeURIComponent(lattitude) +','+ encodeURIComponent(longitude)+''
    request({url , json : true},(error, {body}) => {
       if(error)
       {
          callstack('Sorry it looks like we are not able to find internet connection', undefined)
       }
       else if(body.error)
       {
          callstack('Wrong co-ordinates', undefined)
       }
       else{
          callstack(undefined,'The tempreture is '+ body.current.temperature+' degrees and it feels like '+body.current.feelslike+' degrees and '+body.current.weather_descriptions[0])
       }
    })
 }
 module.exports= forecast