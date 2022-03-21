var first = require('express')
var second = require('fs')
var third = require('body-parser')
var main = first()
main.use(third.urlencoded({extended: true}));

main.get('/', function (req, res) {
    res.sendFile(__dirname + "/api.html")
})

main.post("/adduser", function (req, res) {
    var username = req.body.username // calling in htmlfile
    var dob = req.body.dob
    var profession = req.body.profession
    var obj = {} // empty obj
    var key = req.body.userid
    var newuser = { // json
        "name": username,
        'dob': dob,
        'profession': profession
    }
    obj[key] = newuser
    second.readFile("users.json", "utf8", function (err, data) {
        data = JSON.parse(data) // string/text to object
        data[key] = obj[key] // insert new user
        console.log(data) // object to string/text
        var updateuser = JSON.stringify(data)
        second.writeFile('users.json', updateuser, function (err) {
            res.end(JSON.stringify(data))
        })
    })
})


// find user
main.post('/particularuser', function (req, res) {
    second.readFile("users.json", "utf8", function (err, data) {
        var users = JSON.parse(data)
        var user = users[req.body.urid]
        console.log(user)
        res.end(JSON.stringify(user))
    })
})
// delete user
main.post('/deleteuser', function (req, res) {
    second.readFile('users.json', "utf8", function (err, data) {
        data = JSON.parse(data)
        delete data[req.body.delid]
        console.log(data)
        var updateuser = JSON.stringify(data)

        second.writeFile('users.json', updateuser, function (err) {
            res.end(JSON.stringify(data))
        })

    })
})

// show all
main.get('/showAll', function (req, res) {
    second.readFile('users.json', "utf8", function (err, data) {
        console.log(data)
        res.end(data)
    })
})
main.listen(3000, function () {
    console.log('successfully run port 3000')
})
