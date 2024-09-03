const request = require('request')

const url = ""

request({url: url, json: true}, (error, response) => {
    const data = JSON.parse(response.body)
})