const request = require("request")
const geocode = (address, callstack) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2h1YmhhbXNzc3MiLCJhIjoiY2twNnYyZTk0MDR1MjJ3bWpnZDIyMHFsdyJ9.MPzBXyIW8G6jjxpgCKdIDg'
    request({url : url , json : true},(error, {body}) => {
       if(error)
       {
          callstack('Sorry it looks like we are not able to find internet connection', undefined)
       }
       else if(body.features.length === 0)
       {
          callstack('No city found', undefined)
       }
       else{
          callstack(undefined, {
             longitude : body.features[0].center[0],
             lattitude : body.features[0].center[1],
             location : body.features[0].place_name
          })
       }
    })
 }
 module.exports= geocode