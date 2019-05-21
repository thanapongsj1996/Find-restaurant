const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios')
const ejs = require('ejs')


app.get('/', showIndex)
app.get('/search', searchPlace)

app.use(cors())
app.engine('html', ejs.renderFile)
app.listen(8081)
app.use(express.static('public'))

function showIndex(req, res) {
    res.render('index.html')
}

function searchPlace(req, res) {
    let { input } = req.query
    axios({
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?',
        params: {
            input: `${input} Thailand`,
            inputtype: 'textquery',
            fields: 'geometry',
            key: 'AIzaSyC1eRY8gOTMX97MLzHZuSrR5Dc8ZFTHBG4'
        },
        responseType: 'json'
    })
        .then(function (response) {
            let lat = response.data.candidates[0].geometry.location.lat
            let lng = response.data.candidates[0].geometry.location.lng
            console.log('lat :', lat)
            console.log('lng :', lng)
            axios({
                method: 'get',
                url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?',
                params: {
                    location: `${lat},${lng}`,
                    type: 'restaurant',
                    radius: '2000',
                    key: 'AIzaSyC1eRY8gOTMX97MLzHZuSrR5Dc8ZFTHBG4'
                },
                responseType: 'json'
            })
                .then(function (result) {
                    var finalData = result.data.results
                    //console.log(finalData)
                    res.json(finalData)
                })
        });
}