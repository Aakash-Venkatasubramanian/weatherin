const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWFrYXNoLXZlbmthdCIsImEiOiJjazhhZWdsdnIwMWQyM3BxdG55ZXF3b2FtIn0.vU4VeXTZ2TC6rAbvaj720Q&limit=1'
    request({url:url, json:true}, (error, response) => {
        if(error) {
            callback('Unable to connect to internet', undefined)
        } else if(response.body.features.length === 0) {
            callback('Place not found', undefined)
        } else {
            const longitude = response.body.features[0].center[0]
            const latitude = response.body.features[0].center[1]
            const location = response.body.features[0].place_name
            callback(undefined, {
                latitude:latitude,
                longitude:longitude,
                location:location
            })
        }
    })
}

module.exports = geocode