const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios')
const ejs = require('ejs')


app.get('/', showIndex)
app.get('/search', search)

app.use(cors())
app.engine('html', ejs.renderFile)
app.listen(8081)
app.use(express.static('public'))

function showIndex(req, res) {
    res.render('index.html')
}

function search(req, res) {
    axios({
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?',
        params: {
            input: 'lapoon tea house Thailand',
            inputtype: 'textquery',
            fields: 'formatted_address,name,rating,geometry',
            key: 'AIzaSyC1eRY8gOTMX97MLzHZuSrR5Dc8ZFTHBG4'
        },
        responseType: 'json'
    })
        .then(function (response) {
            console.log(response.data)
            res.json(response.data)
        });
}